import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import vm from "node:vm";

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
const PLANNING_DOC_SECTION_IDS = [
  "about",
  "branches",
  "puppies",
  "reviews",
  "trust",
  "stories",
  "contact",
];
const PLANNING_DOC_REQUIRED_COPY = [
  "건강한 만남을 준비하는 안심분양 브랜드, 헬스독",
  "6개의 지점, 하나의 안심 기준",
  "우리 가족에게 맞는 아이를 함께 찾아드립니다",
  "헬스독은 건강한 만남을 먼저 생각합니다",
  "가까운 헬스독 지점을 찾아보세요",
  "헬스독에서 기다리는 아이들",
  "헬스독을 통해 가족이 된 이야기",
  "헬스독이 신중하게 만남을 준비하는 방법",
  "헬스독의 더 많은 이야기를 확인해보세요",
  "어떤 아이가 우리 가족에게 맞을지 고민된다면",
];
const PLANNING_DOC_FILTERS = [
  "all",
  "dog",
  "cat",
  "changwon",
  "suwon",
  "busan",
  "pyeongtaek",
  "incheon",
  "songpa",
  "free",
  "responsibility",
];
const REQUIRED_RETAINED_HEALTHDOG_ASSETS = [
  "assets/healthdog/pets/pet-13-basket-panda.webp",
  "assets/healthdog/pets/pet-14-gray-basket.webp",
  "assets/healthdog/pets/pet-15-black-handheld.webp",
  "assets/healthdog/pets/pet-16-brown-closeup.webp",
  "assets/healthdog/pets/pet-17-white-lounge.webp",
  "assets/healthdog/pets/pet-18-tricolor-closeup.webp",
  "assets/healthdog/reviews/review-04-vertical-sign.webp",
  "assets/healthdog/reviews/review-07-lobby-proof.webp",
  "assets/healthdog/reviews/review-08-pair-proof.webp",
  "assets/healthdog/reviews/review-10-social-card.webp",
  "assets/healthdog/reviews/review-11-text-proof.webp",
  "assets/healthdog/reviews/review-12-text-proof.webp",
];
const joinParts = (...parts) => parts.join("");
const OLD_PUPPY_PHONE = joinParts("010", "-", "7699", "-", "0531");
const FORBIDDEN_RUNTIME_STRINGS = [
  OLD_PUPPY_PHONE,
  joinParts("BB", " ", "PUPPY"),
  joinParts("비비", "퍼피"),
  joinParts("bb", "puppy"),
  joinParts("puppy", "bebe", ".", "com"),
  joinParts("instagram", "_", "access", "_", "token"),
  joinParts("access", "_", "token"),
  joinParts("imweb", ".", "me"),
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

function extractAttributeValues(html, attributeName) {
  const attributePattern = new RegExp(`\\b${attributeName}=["']([^"']+)["']`, "g");
  return [...html.matchAll(attributePattern)].map((match) => match[1]);
}

function parseHealthDogContent() {
  const source = readRequiredFile(CONTENT_PATH);
  const sandbox = {
    module: { exports: {} },
  };

  vm.runInNewContext(source, sandbox, { filename: CONTENT_PATH });
  assert.ok(sandbox.module.exports?.filters?.pet, "expected content.js to export pet filters");
  return sandbox.module.exports;
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
  assert.equal(combined.includes(OLD_PUPPY_PHONE), false, "old puppy phone leaked");

  for (const branchName of BRANCH_NAMES) {
    assert.match(html, new RegExp(branchName), `missing branch name: ${branchName}`);
  }
  for (const sectionId of REQUIRED_SECTION_IDS) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`), `missing #${sectionId}`);
  }

  const puppyCards = [...html.matchAll(/class=["'][^"']*\bpuppy-card\b/g)];
  assert.ok(puppyCards.length >= 18, "expected at least eighteen puppy cards");
});

test("planning-doc-homepage-scope-is-rendered", () => {
  const html = readRequiredFile(INDEX_PATH);
  const content = parseHealthDogContent();

  for (const sectionId of PLANNING_DOC_SECTION_IDS) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`), `missing planning section #${sectionId}`);
  }

  for (const copy of PLANNING_DOC_REQUIRED_COPY) {
    assert.ok(html.includes(copy), `missing planning-doc copy: ${copy}`);
  }

  for (const filter of PLANNING_DOC_FILTERS) {
    assert.ok(
      html.includes(`data-filter="${filter}"`) || html.includes(`value="${filter}"`),
      `missing planning-doc filter: ${filter}`,
    );
  }

  assert.ok(content.heroSlides?.length >= 3, "expected three planning-doc hero slides");
  assert.ok(content.branches?.every((branch) => branch.phone), "expected every branch to expose a phone");
  assert.ok(content.branches?.every((branch) => branch.instagramUrl), "expected every branch to expose Instagram");
  assert.ok(content.availablePets?.items?.length >= 12, "expected named pet items");
  assert.ok(content.reviews?.items?.length >= 6, "expected sourced review items");
  assert.ok(content.contentHub?.items?.length >= 5, "expected Instagram/blog content hub cards");
});

test("content-pet-filters-match-rendered-filter-and-card-category-values", () => {
  const html = readRequiredFile(INDEX_PATH);
  const content = parseHealthDogContent();
  const contentFilterValues = Array.from(content.filters.pet, (filter) =>
    String(filter.value),
  ).sort();
  const renderedFilterValues = extractAttributeValues(html, "data-filter").sort();
  const cardCategoryTokens = new Set(
    extractAttributeValues(html, "data-category").flatMap((value) =>
      value.split(/\s+/).filter((token) => token && token !== "all"),
    ),
  );

  assert.deepEqual(
    contentFilterValues,
    renderedFilterValues,
    "content.js pet filter values must exactly match rendered data-filter values",
  );

  for (const token of cardCategoryTokens) {
    assert.ok(
      contentFilterValues.includes(token),
      `card category token must exist in rendered/content filter values: ${token}`,
    );
  }
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

  for (const retainedAssetPath of REQUIRED_RETAINED_HEALTHDOG_ASSETS) {
    assert.ok(
      localAssetPaths.includes(retainedAssetPath),
      `expected retained Health Dog asset to be referenced: ${retainedAssetPath}`,
    );
  }

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
