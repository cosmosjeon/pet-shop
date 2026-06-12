import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";

const SITE_ROOT = resolve(import.meta.dirname, "..");
const INDEX_PATH = join(SITE_ROOT, "index.html");
const STYLES_PATH = join(SITE_ROOT, "styles.css");
const SCRIPT_PATH = join(SITE_ROOT, "app.js");

function readRequiredFile(path) {
  assert.ok(existsSync(path), `expected file to exist: ${path}`);
  return readFileSync(path, "utf8");
}

function extractLocalAssetPaths(html) {
  const matches = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)];
  return matches
    .map((match) => match[1])
    .filter((value) => !value.startsWith("#"))
    .filter((value) => !value.startsWith("tel:"))
    .filter((value) => !value.startsWith("mailto:"))
    .filter((value) => !value.startsWith("javascript:"));
}

test("desktop-source-heavy-layout", () => {
  // Given: a static page intended to feel like the pet-ss2/pet-ss references.
  const html = readRequiredFile(INDEX_PATH);
  const css = readRequiredFile(STYLES_PATH);

  // When: the source is inspected for the desktop visual contract.
  const productCards = [...html.matchAll(/class="puppy-card\b/g)];
  const sectionIds = ["about", "puppies", "reviews", "contact"];

  // Then: the same family markers are present as real DOM, not a flat screenshot.
  assert.match(html, /<header class="site-header"/);
  assert.match(html, /<img[^>]+class="brand-logo"/);
  assert.match(html, /매장소개/);
  assert.match(html, /강아지분양/);
  assert.match(html, /입양후기/);
  assert.match(html, /오시는 길/);
  assert.match(html, /사랑으로 시작되는 평생의 인연/);
  assert.match(html, /BB PUPPY\s*[-–]\s*PUPPIES/);
  assert.ok(productCards.length >= 8, "expected at least eight puppy cards");
  for (const sectionId of sectionIds) {
    assert.match(html, new RegExp(`id="${sectionId}"`), `missing #${sectionId}`);
  }
  assert.match(html, /class="floating-cta"/);
  assert.match(css, /--brand:\s*#363636/);
  assert.match(css, /--accent:\s*#bfb49c/);
  assert.match(css, /--soft:\s*#fcf9f5/);
  assert.match(css, /max-width:\s*1280px/);
});

test("mobile-filter-and-empty-state", () => {
  // Given: the mobile surface should stay usable and support category filtering.
  const html = readRequiredFile(INDEX_PATH);
  const css = readRequiredFile(STYLES_PATH);
  const js = readRequiredFile(SCRIPT_PATH);

  // When: the source is inspected for responsive and filter behavior.
  const filterButtons = [...html.matchAll(/data-filter="([^"]+)"/g)].map((match) => match[1]);
  const pomeranianCards = [...html.matchAll(/data-category="[^"]*pomeranian[^"]*"/g)];

  // Then: mobile navigation, filter targets, and empty state behavior are implemented.
  assert.match(html, /class="mobile-menu-toggle"/);
  assert.ok(filterButtons.includes("all"), "missing all filter");
  assert.ok(filterButtons.includes("pomeranian"), "missing pomeranian filter");
  assert.ok(pomeranianCards.length >= 2, "expected at least two pomeranian cards");
  assert.match(html, /id="empty-state"/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /\.floating-cta/);
  assert.match(js, /querySelectorAll\('\[data-filter\]'\)/);
  assert.match(js, /toggleAttribute\("hidden"/);
  assert.match(js, /category\.includes\(selectedFilter\)/);
});

test("no-sensitive-or-remote-runtime-leaks", () => {
  // Given: source mirrors contain absolute URLs and token-like runtime values.
  const files = [INDEX_PATH, STYLES_PATH, SCRIPT_PATH];
  const contents = files.map((path) => readRequiredFile(path));
  const html = contents[0];
  const combined = contents.join("\n");

  // When: the new site source and asset references are inspected.
  const forbidden = [
    "instagram_access_token",
    "access_token",
    "puppybebe.com",
    "bbpuppy.co.kr",
    "imweb.me",
    "pet-ss",
    "pet-ss2",
    "source-reference",
    "http://",
    "https://",
  ];
  const localAssetPaths = extractLocalAssetPaths(html);

  // Then: the runtime is self-contained and all referenced local files exist.
  for (const value of forbidden) {
    assert.equal(combined.includes(value), false, `forbidden leak found: ${value}`);
  }
  assert.ok(localAssetPaths.includes("styles.css"), "expected stylesheet reference");
  assert.ok(localAssetPaths.includes("app.js"), "expected script reference");
  for (const localPath of localAssetPaths) {
    const target = join(dirname(INDEX_PATH), localPath);
    assert.ok(existsSync(target), `referenced local asset is missing: ${localPath}`);
  }
});
