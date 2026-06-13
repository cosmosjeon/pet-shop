import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";

const SITE_ROOT = resolve(import.meta.dirname, "..");
const INDEX_PATH = join(SITE_ROOT, "index.html");
const STYLES_PATH = join(SITE_ROOT, "styles.css");
const SCRIPT_PATH = join(SITE_ROOT, "app.js");
const CONTENT_PATH = join(SITE_ROOT, "content.js");
const RUNTIME_SOURCE_PATHS = [INDEX_PATH, STYLES_PATH, SCRIPT_PATH, CONTENT_PATH];
const BRANCH_NAMES = [
  "창원헬스독",
  "부산헬스독",
  "송파헬스독",
  "수원헬스독",
  "평택헬스독",
  "인천헬스독",
];
const REQUIRED_SECTION_IDS = ["branches", "care", "puppies", "reviews", "contact"];
const FORBIDDEN_RUNTIME_STRINGS = [
  "010-7699-0531",
  "BB PUPPY",
  "비비퍼피",
  "bbpuppy",
  "puppybebe.com",
  "instagram_access_token",
  "access_token",
  "imweb.me",
];

function readRequiredFile(path) {
  assert.ok(existsSync(path), `expected file to exist: ${path}`);
  return readFileSync(path, "utf8");
}

function extractReferences(html) {
  return [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)].map((match) => match[1]);
}

function isLocalReference(value) {
  return (
    !value.startsWith("#") &&
    !value.startsWith("//") &&
    !/^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

function extractLocalAssetPaths(html) {
  return extractReferences(html)
    .filter(isLocalReference)
    .map((value) => value.split(/[?#]/)[0])
    .filter(Boolean);
}

function extractExternalUrls(html) {
  return extractReferences(html).filter((value) => /^https?:\/\//i.test(value));
}

function readRuntimeSources() {
  return RUNTIME_SOURCE_PATHS.map((path) => readRequiredFile(path)).join("\n");
}

test("healthdog-brand-branches-and-sections", () => {
  const html = readRequiredFile(INDEX_PATH);
  const combined = readRuntimeSources();

  assert.match(html, /<title>헬스독 \| 건강하게 자란 반려가족 상담<\/title>/);
  assert.match(html, /<img[^>]+class="brand-logo"[^>]+alt="헬스독 로고"/);
  assert.match(html, /건강하게 자란 반려가족을 만나는 곳, 헬스독/);
  assert.match(combined, /1600-4533/);
  assert.equal(combined.includes("010-7699-0531"), false, "old BB PUPPY phone leaked");

  for (const branchName of BRANCH_NAMES) {
    assert.match(html, new RegExp(branchName), `missing branch name: ${branchName}`);
  }
  for (const sectionId of REQUIRED_SECTION_IDS) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`), `missing #${sectionId}`);
  }

  const puppyCards = [...html.matchAll(/class=["'][^"']*\bpuppy-card\b/g)];
  assert.ok(puppyCards.length >= 12, "expected at least twelve puppy cards");
});

test("proof-and-generated-assets-exist", () => {
  const html = readRequiredFile(INDEX_PATH);
  const localAssetPaths = extractLocalAssetPaths(html);
  const reviewProofPaths = localAssetPaths.filter((assetPath) =>
    assetPath.startsWith("assets/healthdog/reviews/"),
  );
  const generatedAssetPaths = localAssetPaths.filter((assetPath) =>
    assetPath.startsWith("assets/healthdog/generated/"),
  );

  assert.ok(reviewProofPaths.length >= 6, "expected review proof images in the HTML");
  assert.ok(
    [
      "assets/healthdog/generated/care-promise-poster.svg",
      "assets/healthdog/generated/promise-banner.svg",
      "assets/healthdog/generated/service-guide-grid.svg",
    ].every((assetPath) => generatedAssetPaths.includes(assetPath)),
    "expected all generated Health Dog assets to be referenced",
  );

  for (const localPath of [...reviewProofPaths, ...generatedAssetPaths]) {
    const target = join(dirname(INDEX_PATH), localPath);
    assert.ok(existsSync(target), `referenced Health Dog asset is missing: ${localPath}`);
  }
});

test("runtime-sources-have-no-forbidden-strings-and-local-assets-exist", () => {
  const html = readRequiredFile(INDEX_PATH);
  const combined = readRuntimeSources();
  const localAssetPaths = extractLocalAssetPaths(html);
  const externalUrls = extractExternalUrls(html);
  const naverMapUrls = externalUrls.filter((url) => url.startsWith("https://map.naver.com/"));

  for (const value of FORBIDDEN_RUNTIME_STRINGS) {
    assert.equal(combined.includes(value), false, `forbidden leak found: ${value}`);
  }

  assert.ok(localAssetPaths.includes("styles.css"), "expected stylesheet reference");
  assert.ok(localAssetPaths.includes("content.js"), "expected content script reference");
  assert.ok(localAssetPaths.includes("app.js"), "expected script reference");
  assert.ok(naverMapUrls.length >= BRANCH_NAMES.length, "expected Naver map links for branches");
  assert.equal(
    localAssetPaths.some((localPath) => /^https?:\/\//i.test(localPath)),
    false,
    "local asset validation must ignore external URLs",
  );

  for (const localPath of localAssetPaths) {
    const target = join(dirname(INDEX_PATH), localPath);
    assert.ok(existsSync(target), `referenced local asset is missing: ${localPath}`);
  }
});
