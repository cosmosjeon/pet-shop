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
const EXACT_HERO_H1 = "건강하게 자란 반려가족을 만나는 곳, 헬스독";
const EXACT_HERO_COPY =
  "전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.";
const EXACT_NAV_LABELS = ["분양중 아이들", "헬스독 케어", "후기", "지점안내", "상담문의"];
const PLANNING_DOC_SECTION_IDS = [
  "about",
  "branches",
  "puppies",
  "care",
  "reviews",
  "contact",
];
const PLANNING_DOC_REQUIRED_COPY = [
  EXACT_HERO_H1,
  EXACT_HERO_COPY,
  "대표번호 1600-4533",
  "전국 6개 지점",
  "실제 보호자 후기",
  "네이버 플레이스 연결",
  "분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.",
  "사진보다 중요한 건 실제 보호자의 선택입니다.",
];
const PLANNING_DOC_FILTERS = [
  "all",
  "maltipoo",
  "pomeranian",
  "poodle",
  "bichon",
  "small",
  "medium",
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
const OLD_STORY_ASSET_DIR = joinParts("assets", "/", "story", "/");
const OLD_PROMISE_ASSET = joinParts("promise", ".", "jpg");
const FORBIDDEN_RUNTIME_STRINGS = [
  OLD_PUPPY_PHONE,
  joinParts("BB", " ", "PUPPY"),
  joinParts("비비", "퍼피"),
  joinParts("퍼피", "베베"),
  joinParts("PUPPY", "BEBE"),
  joinParts("bb", "puppy"),
  joinParts("puppy", "bebe", ".", "com"),
  joinParts("instagram", "_", "access", "_", "token"),
  joinParts("access", "_", "token"),
  joinParts("imweb", ".", "me"),
  joinParts("/Users", "/"),
  joinParts("/Downloads", "/"),
  OLD_STORY_ASSET_DIR,
  OLD_PROMISE_ASSET,
];
const ALLOWED_RUNTIME_EXTERNAL_URLS = [
  "https://map.naver.com/",
  "https://www.instagram.com/healthdog_suwon",
  "https://blog.naver.com/dallae0212",
  "https://pf.kakao.com/_dZqfn",
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

function extractContentAssetPaths(content) {
  return [
    ...(content.heroSlides || []).map((slide) => slide.image),
    ...(content.availablePets?.items || []).map((item) => item.image),
    ...(content.reviews?.items || []).map((item) => item.image),
    ...(content.care?.graphics || []).map((graphic) => graphic.image),
  ].filter(Boolean);
}

function extractExternalUrls(html) {
  return extractReferences(html).filter((value) => /^https?:\/\//i.test(value));
}

function extractAttributeValues(html, attributeName) {
  const attributePattern = new RegExp(`\\b${attributeName}=["']([^"']+)["']`, "g");
  return [...html.matchAll(attributePattern)].map((match) => match[1]);
}

function extractElementText(html, selectorClass) {
  const elementPattern = new RegExp(
    `<[^>]+class=["'][^"']*\\b${selectorClass}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`,
  );
  const match = html.match(elementPattern);
  return match ? match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
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
  const content = parseHealthDogContent();

  assert.match(html, /<title>헬스독 \| 건강하게 자란 반려가족 상담<\/title>/);
  assert.match(html, /<img[^>]+class="brand-logo"[^>]+alt="헬스독 로고"/);
  assert.match(html, new RegExp(`<h1>\\s*${EXACT_HERO_H1}\\s*<\\/h1>`));
  assert.ok(html.includes(EXACT_HERO_COPY), "missing exact approved hero support copy");
  assert.match(combined, /1600-4533/);
  assert.equal(combined.includes(OLD_PUPPY_PHONE), false, "old puppy phone leaked");

  for (const branchName of BRANCH_NAMES) {
    assert.match(combined, new RegExp(branchName), `missing branch name: ${branchName}`);
  }
  for (const sectionId of REQUIRED_SECTION_IDS) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`), `missing #${sectionId}`);
  }

  assert.ok(content.availablePets?.items?.length >= 18, "expected at least eighteen pet photo items");
});

test("approved-plan-semantics-do-not-drift", () => {
  const html = readRequiredFile(INDEX_PATH);
  const styles = readRequiredFile(STYLES_PATH);
  const content = parseHealthDogContent();
  const navLabels = (content.nav || []).map((item) => item.label);
  const sectionOrder = ["branches", "puppies", "care", "reviews", "contact"].map((sectionId) =>
    html.indexOf(`id="${sectionId}"`),
  );

  for (const navLabel of EXACT_NAV_LABELS) {
    assert.ok(navLabels.includes(navLabel), `missing approved nav label: ${navLabel}`);
  }
  assert.match(html, /전화 상담 1600-4533/);
  assert.match(html, /가까운 지점 찾기/);
  assert.ok(
    sectionOrder.every((index) => index >= 0) &&
      sectionOrder.every((index, position) => position === 0 || index > sectionOrder[position - 1]),
    "approved section order must be branches -> puppies -> care -> reviews -> contact",
  );
  assert.equal(/font-size\s*:[^;]*vw\b/.test(styles), false, "font-size must not use viewport units");
  assert.match(
    styles,
    /@media\s*\(max-width:\s*760px\)[\s\S]*\.floating-cta\s*{[\s\S]*position:\s*fixed[\s\S]*bottom:/,
    "mobile CTA must remain a fixed bottom bar",
  );
});

test("planning-doc-homepage-scope-is-rendered", () => {
  const html = readRequiredFile(INDEX_PATH);
  const combined = readRuntimeSources();
  const content = parseHealthDogContent();

  for (const sectionId of PLANNING_DOC_SECTION_IDS) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`), `missing planning section #${sectionId}`);
  }

  for (const copy of PLANNING_DOC_REQUIRED_COPY) {
    assert.ok(combined.includes(copy), `missing approved-plan copy: ${copy}`);
  }

  const contentFilterValues = Array.from(content.filters.pet, (filter) => String(filter.value));
  for (const filter of PLANNING_DOC_FILTERS) {
    assert.ok(contentFilterValues.includes(filter), `missing approved filter: ${filter}`);
  }

  assert.ok(content.heroSlides?.length >= 3, "expected three planning-doc hero slides");
  assert.ok(content.branches?.every((branch) => branch.phone), "expected every branch to expose a phone");
  assert.ok(content.availablePets?.items?.length >= 12, "expected pet photo proof items");
  assert.ok(content.reviews?.items?.length >= 6, "expected sourced review/proof image items");
  const suwonBranch = content.branches.find((branch) => branch.id === "suwon");
  assert.ok(suwonBranch?.instagramUrl, "expected user-provided Suwon Instagram link");
  assert.ok(suwonBranch?.blogUrl, "expected user-provided Suwon blog link");
  assert.ok(suwonBranch?.kakaoUrl, "expected user-provided Suwon Kakao link");
});

test("runtime-content-avoids-unsupported-claims", () => {
  const html = readRequiredFile(INDEX_PATH);
  const combined = readRuntimeSources();
  const content = parseHealthDogContent();
  const externalUrls = extractExternalUrls(html);

  assert.equal(/\/Users\/|\/Downloads\//.test(combined), false, "runtime must not expose local paths");
  assert.equal(
    [OLD_STORY_ASSET_DIR, OLD_PROMISE_ASSET].some((value) => combined.includes(value)),
    false,
    "runtime must not use source-reference assets",
  );

  for (const branch of content.branches) {
    const optionalUrls = [branch.instagramUrl, branch.blogUrl, branch.kakaoUrl].filter(Boolean);
    for (const url of optionalUrls) {
      assert.ok(
        ALLOWED_RUNTIME_EXTERNAL_URLS.some((allowedUrl) => url.startsWith(allowedUrl)),
        `unverified branch channel URL leaked: ${url}`,
      );
    }
  }

  for (const url of externalUrls) {
    assert.ok(
      ALLOWED_RUNTIME_EXTERNAL_URLS.some((allowedUrl) => url.startsWith(allowedUrl)),
      `unapproved external runtime URL: ${url}`,
    );
  }

  for (const item of content.availablePets.items) {
    assert.equal("name" in item, false, "pet photo item must not invent a pet name");
    assert.equal("sex" in item, false, "pet photo item must not invent sex");
    assert.equal("age" in item, false, "pet photo item must not invent age");
    assert.equal("status" in item, false, "pet photo item must not invent availability status");
  }

  for (const item of content.reviews.items) {
    assert.equal("summary" in item, false, "review proof item must not invent a review summary");
    assert.match(item.caption, /제공된|무료분양인증|후기 자료/);
  }

  assert.ok(
    html.includes("분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다."),
    "generated poster needs a text equivalent near the image",
  );
});

test("content-pet-filters-match-rendered-filter-and-card-category-values", () => {
  const content = parseHealthDogContent();
  const contentFilterValues = Array.from(content.filters.pet, (filter) =>
    String(filter.value),
  ).sort();
  const cardCategoryTokens = new Set(
    content.availablePets.items.flatMap((item) =>
      String(item.categories).split(/\s+/).filter((token) => token && token !== "all"),
    ),
  );

  assert.deepEqual(contentFilterValues, PLANNING_DOC_FILTERS.sort());

  for (const token of cardCategoryTokens) {
    assert.ok(
      contentFilterValues.includes(token),
      `card category token must exist in rendered/content filter values: ${token}`,
    );
  }

  for (const filter of contentFilterValues.filter((value) => value !== "all")) {
    assert.ok(
      content.availablePets.items.some((item) =>
        String(item.categories).split(/\s+/).includes(filter),
      ),
      `filter must show at least one pet photo item: ${filter}`,
    );
  }
});

test("proof-and-generated-assets-exist", () => {
  const html = readRequiredFile(INDEX_PATH);
  const content = parseHealthDogContent();
  const localAssetPaths = [...new Set([...extractLocalAssetPaths(html), ...extractContentAssetPaths(content)])];
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
  const content = parseHealthDogContent();
  const combined = readRuntimeSources();
  const localAssetPaths = [...new Set([...extractLocalAssetPaths(html), ...extractContentAssetPaths(content)])];
  const externalUrls = [
    ...extractExternalUrls(html),
    ...content.branches.flatMap((branch) =>
      [branch.naverMapUrl, branch.instagramUrl, branch.blogUrl, branch.kakaoUrl].filter(Boolean),
    ),
  ];
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
