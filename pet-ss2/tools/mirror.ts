// Site mirror crawler for bbpuppy.co.kr (owner source recovery).
// Crawls internal HTML pages, downloads all referenced assets (css/js/img/fonts),
// recursively resolves CSS url()/@import, and rewrites URLs to local relative paths.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = new URL("https://bbpuppy.co.kr/");
const HOST = ROOT.host;
const OUT = new URL("../site/", import.meta.url).pathname;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Seed pages (path part of bbpuppy.co.kr). Query-string pages handled separately.
const PAGE_PATHS = [
  "/",
  "/home",
  "/about",
  "/babies",
  "/reviews",
  "/contact",
  "/19", "/20", "/21", "/22", "/23", "/24", "/25", "/26", "/27",
  "/?mode=policy",
  "/?mode=privacy",
];

type Asset = { url: string; local: string };

const visitedPages = new Set<string>();
const assetMap = new Map<string, string>(); // absolute url -> local path (relative to site/)
const pageMap = new Map<string, string>(); // absolute page url -> local html file (relative to site/)
const cssToProcess: { url: string; localAbs: string }[] = [];
const downloaded = new Set<string>();
let assetCounter = 0;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchBuf(url: string, tries = 3): Promise<{ buf: Buffer; ct: string } | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Referer: ROOT.href } });
      if (!res.ok) {
        if (res.status === 404) return null;
        await sleep(400 * (i + 1));
        continue;
      }
      const ct = res.headers.get("content-type") || "";
      const buf = Buffer.from(await res.arrayBuffer());
      return { buf, ct };
    } catch {
      await sleep(400 * (i + 1));
    }
  }
  return null;
}

// Map an asset URL to a deterministic local path under assets/<host>/<path>
function assetLocalPath(abs: URL): string {
  let p = abs.pathname;
  if (p.endsWith("/")) p += "index";
  // attach a short hash of the query so distinct query assets don't collide
  let name = `assets/${abs.host}${p}`;
  if (abs.search) {
    const q = abs.search.replace(/^\?/, "");
    // imweb uses ?<timestamp> cache-busters; keep file extension
    const m = name.match(/\.[a-zA-Z0-9]+$/);
    const ext = m ? m[0] : "";
    const base = ext ? name.slice(0, -ext.length) : name;
    const hash = Buffer.from(q).toString("hex").slice(0, 10);
    name = `${base}.${hash}${ext}`;
  }
  // sanitize
  name = name.replace(/[?*:<>|"]/g, "_");
  return name;
}

function pageLocalPath(abs: URL): string {
  let p = abs.pathname;
  if (p === "/" || p === "") {
    if (abs.search) {
      const q = abs.searchParams.get("mode");
      return q ? `${q}.html` : "index.html";
    }
    return "index.html";
  }
  p = p.replace(/^\//, "");
  if (abs.search) {
    const q = abs.search.replace(/^\?/, "").replace(/[=&]/g, "_");
    return `${p}__${q}.html`;
  }
  // ensure .html
  if (!/\.[a-zA-Z0-9]+$/.test(p)) return `${p}.html`;
  return p;
}

// Compute relative path from one local file to another local file
function rel(fromFile: string, toFile: string): string {
  const fromParts = fromFile.split("/").slice(0, -1);
  const toParts = toFile.split("/");
  let i = 0;
  while (i < fromParts.length && i < toParts.length - 1 && fromParts[i] === toParts[i]) i++;
  const up = fromParts.slice(i).map(() => "..");
  const down = toParts.slice(i);
  const r = [...up, ...down].join("/");
  return r || toFile.split("/").pop()!;
}

async function save(localPath: string, buf: Buffer) {
  const full = join(OUT, localPath);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, buf);
}

// Resolve and register an asset; returns local path (relative to site/)
function registerAsset(rawUrl: string, base: string): string | null {
  if (!rawUrl) return null;
  const t = rawUrl.trim().replace(/^['"]|['"]$/g, "");
  if (!t || t.startsWith("data:") || t.startsWith("#") || t.startsWith("javascript:") ||
      t.startsWith("mailto:") || t.startsWith("tel:") || t.startsWith("about:")) return null;
  let abs: URL;
  try {
    abs = new URL(t, base);
  } catch {
    return null;
  }
  if (abs.protocol !== "http:" && abs.protocol !== "https:") return null;
  const key = abs.href;
  if (assetMap.has(key)) return assetMap.get(key)!;
  const local = assetLocalPath(abs);
  assetMap.set(key, local);
  return local;
}

const isCss = (urlOrCt: string) => /\.css(\?|$)/i.test(urlOrCt) || /text\/css/.test(urlOrCt);

// Rewrite url(...) and @import in CSS, register nested assets, return rewritten css
function processCss(css: string, cssUrl: string, cssLocal: string): string {
  // url(...)
  css = css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (m, q, u) => {
    const local = registerAsset(u, cssUrl);
    if (!local) return m;
    // if nested css? css url() rarely points to css; still queue if css
    const abs = new URL(u, cssUrl).href;
    queueAsset(abs, local);
    return `url(${rel(cssLocal, local)})`;
  });
  // @import "..."  or @import url(...)
  css = css.replace(/@import\s+(?:url\(\s*)?(['"])([^'"]+)\1\s*\)?/gi, (m, q, u) => {
    const local = registerAsset(u, cssUrl);
    if (!local) return m;
    const abs = new URL(u, cssUrl).href;
    cssToProcess.push({ url: abs, localAbs: local });
    queueAsset(abs, local, true);
    return `@import "${rel(cssLocal, local)}"`;
  });
  return css;
}

const assetQueue: { url: string; local: string; isCssImport?: boolean }[] = [];
function queueAsset(url: string, local: string, isCssImport = false) {
  if (downloaded.has(url)) return;
  if (assetQueue.find((a) => a.url === url)) return;
  assetQueue.push({ url, local, isCssImport });
}

async function downloadAssets() {
  while (assetQueue.length) {
    const a = assetQueue.shift()!;
    if (downloaded.has(a.url)) continue;
    downloaded.add(a.url);
    const r = await fetchBuf(a.url);
    if (!r) {
      console.log(`  [miss] ${a.url}`);
      continue;
    }
    if (isCss(a.url) || isCss(r.ct)) {
      const css = processCss(r.buf.toString("utf8"), a.url, a.local);
      await save(a.local, Buffer.from(css, "utf8"));
    } else {
      await save(a.local, r.buf);
    }
    assetCounter++;
    if (assetCounter % 20 === 0) console.log(`  ...${assetCounter} assets`);
  }
}

// Extract & rewrite assets in an HTML document. Returns rewritten html.
function processHtml(html: string, pageUrl: string, pageLocal: string, foundPages: Set<string>): string {
  // collect internal page links
  const hrefRe = /href\s*=\s*(['"])(.*?)\1/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(html))) {
    const h = m[2];
    if (!h || h.startsWith("#") || h.startsWith("javascript:") || h.startsWith("mailto:") || h.startsWith("tel:")) continue;
    let abs: URL;
    try { abs = new URL(h, pageUrl); } catch { continue; }
    if (abs.host !== HOST) continue;
    if (/\.(css|js|png|jpe?g|gif|svg|ico|webp|woff2?|ttf|eot|otf|mp4|pdf)(\?|$)/i.test(abs.pathname)) continue;
    // skip auth/cart-ish dynamic
    if (/logout|login|cart|order|member|join/i.test(abs.pathname)) continue;
    foundPages.add(abs.href);
  }

  // rewrite asset attributes: src, href(css/icon), srcset, data-src, poster
  const attrRe = /\b(src|href|data-src|data-original|poster|data-background-image)\s*=\s*(['"])(.*?)\2/gi;
  html = html.replace(attrRe, (full, attr, q, val) => {
    if (!val || val.startsWith("data:") || val.startsWith("#") || val.startsWith("javascript:") ||
        val.startsWith("mailto:") || val.startsWith("tel:")) return full;
    let abs: URL;
    try { abs = new URL(val, pageUrl); } catch { return full; }
    if (abs.protocol !== "http:" && abs.protocol !== "https:") return full;
    // For href on <a> to internal pages -> rewrite to local html
    if (attr.toLowerCase() === "href") {
      if (abs.host === HOST && !/\.(css|js|png|jpe?g|gif|svg|ico|webp|woff2?|ttf|eot|otf|mp4|pdf)(\?|$)/i.test(abs.pathname)
          && !/logout|login|cart|order|member|join/i.test(abs.pathname)) {
        const pl = pageLocalPath(abs);
        return `${attr}=${q}${rel(pageLocal, pl)}${q}`;
      }
      // css/icon stylesheet or asset href
      if (/\.(css|ico|png|svg|webp)(\?|$)/i.test(abs.pathname) || /stylesheet|icon/i.test(full)) {
        const local = registerAsset(val, pageUrl);
        if (local) { queueAsset(abs.href, local, isCss(abs.pathname)); return `${attr}=${q}${rel(pageLocal, local)}${q}`; }
      }
      return full;
    }
    // other attrs => asset
    const local = registerAsset(val, pageUrl);
    if (!local) return full;
    queueAsset(abs.href, local, isCss(abs.pathname));
    return `${attr}=${q}${rel(pageLocal, local)}${q}`;
  });

  // srcset
  html = html.replace(/\bsrcset\s*=\s*(['"])(.*?)\1/gi, (full, q, val) => {
    const parts = val.split(",").map((seg: string) => {
      const s = seg.trim();
      const sp = s.split(/\s+/);
      const u = sp[0];
      const desc = sp.slice(1).join(" ");
      const local = registerAsset(u, pageUrl);
      if (!local) return s;
      try { queueAsset(new URL(u, pageUrl).href, local, false); } catch {}
      return `${rel(pageLocal, local)}${desc ? " " + desc : ""}`;
    });
    return `srcset=${q}${parts.join(", ")}${q}`;
  });

  // inline <style> url(...) and CSS in style="" attributes
  html = html.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (m2, q, u) => {
    if (u.startsWith("data:")) return m2;
    const local = registerAsset(u, pageUrl);
    if (!local) return m2;
    try { queueAsset(new URL(u, pageUrl).href, local, isCss(u)); } catch {}
    return `url(${rel(pageLocal, local)})`;
  });

  return html;
}

async function crawl() {
  const pageQueue: string[] = PAGE_PATHS.map((p) => new URL(p, ROOT).href);
  const allFoundPages = new Set<string>();

  while (pageQueue.length) {
    const purl = pageQueue.shift()!;
    if (visitedPages.has(purl)) continue;
    visitedPages.add(purl);
    const abs = new URL(purl);
    const pl = pageLocalPath(abs);
    pageMap.set(purl, pl);
    console.log(`[page] ${purl} -> ${pl}`);
    const r = await fetchBuf(purl);
    if (!r) { console.log(`  [miss page] ${purl}`); continue; }
    const found = new Set<string>();
    const html = processHtml(r.buf.toString("utf8"), purl, pl, found);
    await save(pl, Buffer.from(html, "utf8"));
    for (const f of found) {
      allFoundPages.add(f);
      if (!visitedPages.has(f) && !pageQueue.includes(f)) {
        // limit dynamic detail pages count to keep it bounded but complete-ish
        pageQueue.push(f);
      }
    }
  }

  console.log(`\nPages: ${visitedPages.size}. Downloading ${assetQueue.length} queued assets...`);
  await downloadAssets();
  // second pass: any css imports discovered late already queued
  await downloadAssets();
  console.log(`\nDone. Pages=${visitedPages.size} Assets=${assetCounter}`);
}

await crawl();
