# Health Dog Homepage From Planning Document

## TL;DR
> Summary:      Rebuild the static `pet-clone-site` homepage so the rendered page matches `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md` while staying dependency-free, static, and scoped to the existing files. Use `content.js` as the canonical content contract, make `index.html`, `styles.css`, `app.js`, and `tests/site-structure.test.mjs` agree with it, then prove ULW C001-C003 with CLI checks and real Chrome browser evidence.
> Deliverables:
> - `pet-clone-site/index.html` renders the full homepage sequence: 3-message hero, intro, 6 branch cards, named pet gallery, reviews, trust/care, content hub, final consultation CTA.
> - `pet-clone-site/styles.css` supports desktop 1440px and mobile 390px layouts with clean Korean line wrapping, no nested cards, and 8px-or-less cards.
> - `pet-clone-site/app.js` drives hero slide controls, pet filters, content-hub tabs, mobile nav, branch selector, and branch action URLs.
> - `pet-clone-site/content.js` contains the static, local source of truth for branch, pet, review, trust, content hub, and consultation data.
> - `pet-clone-site/tests/site-structure.test.mjs` encodes C001-C003 CLI regressions.
> - Evidence artifacts under `.omo/evidence/task-<N>-healthdog-homepage-from-planning-doc.*`.
> Effort:       Large
> Risk:         Medium - the work is broad frontend/static wiring with visual fidelity and shared-file coordination risk, but no auth, DB, payment, or external runtime integration.

## Scope
### Must have
- Keep the implementation inside `/Users/cosmos/Documents/pet/pet-clone-site` and the existing static files: `index.html`, `styles.css`, `app.js`, `content.js`, `tests/site-structure.test.mjs`.
- Preserve the dependency-free static-site model: no build step, no runtime API calls, no package-managed app framework.
- Use local Health Dog assets under `pet-clone-site/assets/healthdog`, especially logo, `pets/`, `reviews/`, and existing generated SVG assets; generated SVGs under `assets/healthdog/generated` count as approved local assets.
- Render the homepage in this order from the planning document: 3-message main banner, Health Dog intro, six branch cards, current pets, reviews, trust/care cards, blog/Instagram content hub, consultation CTA.
- Implement a single-page homepage MVP with section anchors only; the planning document's separate intro/pets/reviews/branches/consultation/detail pages are deferred.
- Keep `content.js` as the static data contract and require explicit parity checks between `content.js` and manually rendered `index.html`; runtime rendering from `content.js` is optional, but drift is not allowed.
- Make the main banner show three messages: brand trust, six branches, pet exploration/consultation conversion.
- Include intro copy headed `헬스독은 건강한 만남을 먼저 생각합니다`.
- Include six branch cards for 창원, 수원, 부산, 평택, 인천, 송파 with address, data-confidence note, representative or confirmed phone label, channel/actions, `이 지점 아이들 보기`, Naver Place, and call actions.
- Include pet cards with name, breed/species, sex, age, branch, health/status copy, small sale-type/status tags, and actions.
- Include filters for `all`, `dog`, `cat`, six branch ids, `free`, `responsibility`, and breed/species tokens used by cards.
- Include 6-9 review/source cards with local image, short summary-only copy, branch, source, and `원문 보기` linking to a real external source/channel URL; `#branches` and other placeholder anchors are not acceptable review source URLs.
- Include trust/care cards covering health check, 3 disease kit guidance, worming/hygiene management, 1:1 consultation, branch direct consultation, and post-adoption guidance.
- Include a blog/Instagram content hub with manual static cards and original links; no automatic feed integration.
- Include a final consultation CTA with representative phone, branch selector, branch-specific consultation/action links, and a static non-submitting form surface.
- Satisfy ULW C001: desktop `1440x1200` and mobile `390x1100` screenshots show required sections and no broken layout.
- Satisfy ULW C002: branch/type/status filters, consultation branch selector, mobile nav, and branch-specific 상담/네이버/인스타/블로그 actions work in browser.
- Satisfy ULW C003: `node --test tests/site-structure.test.mjs`, `node --check app.js`, `node --check content.js`, forbidden-copy scans, local asset existence, and six Naver links pass.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not create additional product pages, routes, backend services, auth, DB, payments, admin UI, Google Sheets integration, or external runtime crawlers/API calls.
- Do not create the planning document's separate branch detail pages, SEO guide pages, animal detail pages, admin editing screens, or persistent form submission flow in this pass.
- Do not fetch Instagram, Naver, Kakao, or blog content at runtime; link to static URLs already known in `content.js`.
- Do not add Instagram embeds, Naver embeds, Kakao SDKs, scraping, feed widgets, or automatic latest-post/review collection.
- Do not add package dependencies, bundlers, CSS frameworks, icon font/CDN dependencies, or third-party client scripts.
- Do not put price, discount, `무료분양`, or hard-sell copy in the hero/main banner.
- Do not expose exact prices in pet cards; use tags such as `무료분양 상담 가능`, `책임분양 상담 가능`, `분양 조건 지점 문의`, `가족을 만났어요`.
- Do not use forbidden hard-sell or guarantee phrases as visible selling copy: `최저가`, `무조건`, `완벽 보장`, `100% 보장`, `당일 데려가세요`, `질병 없음 보장`, `병원급 관리 보장`, `5만원부터`, `10만원부터`, `최대 80% 할인`.
- Do not write medical guarantees; use `확인`, `안내`, `관리` language only.
- Do not use non-Health-Dog legacy visuals such as `assets/story/promise.jpg` unless the executor records a specific reason and the asset remains local; prefer `assets/healthdog/**` for every visible image.
- Do not use recognizable human-face review/proof photos unless consent is documented in the planning/evidence notes; if consent is not documented, crop/choose local images so faces are not the focal proof.
- Do not copy verbatim review/blog text from external sources; use summary-only copy and source/channel links.
- Do not introduce nested cards or cards with border radius above 8px.
- Do not overwrite unrelated dirty worktree changes. Based on exploration, `git status --short` showed existing modifications in `pet-clone-site/app.js`, `pet-clone-site/content.js`, and `pet-clone-site/tests/site-structure.test.mjs`; inspect and preserve them before editing.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: TDD + Node built-in test runner for static structure and source integrity; real Chrome browser QA for rendered layout/interactions.
- QA policy: every task has agent-executed scenarios.
- Evidence: `.omo/evidence/task-<N>-healthdog-homepage-from-planning-doc.<ext>`
- Canonical CLI commands from `/Users/cosmos/Documents/pet/pet-clone-site`:
  - `node --test tests/site-structure.test.mjs`
  - `node --check app.js`
  - `node --check content.js`
  - `rg -n "BB PUPPY|비비퍼피|010-7699-0531|instagram_access_token|access_token|imweb\\.me|puppybebe\\.com|최저가|무조건|완벽 보장|100% 보장|당일 데려가세요|질병 없음 보장|병원급 관리 보장|5만원부터|10만원부터|최대 80% 할인" index.html styles.css app.js content.js tests/site-structure.test.mjs`
- Required static test coverage: valid anchor targets, six real Naver links, no review `원문 보기` placeholders, branch data-confidence labels, selector coverage for every rendered class family, and `data-filter` extracted only from actual filter controls.
- Browser QA server command:
  - `cd /Users/cosmos/Documents/pet/pet-clone-site && python3 -m http.server 4173 --bind 127.0.0.1`
- Browser QA uses real Chrome via Chrome DevTools MCP against `http://127.0.0.1:4173/index.html`; if Chrome is unavailable, download and use `agent-browser` from `https://github.com/vercel-labs/agent-browser` and capture equivalent screenshots/action logs.

## Execution strategy
### Parallel execution waves
> Target 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks to maximize parallelism.

Wave 1 (no dependencies):
- Task 1: Baseline evidence and dirty-worktree guard
- Task 2: Finalize `content.js` as the static source of truth
- Task 9: Encode C001-C003 in CLI regression tests

Wave 2 (after Wave 1):
- Task 3: depends [1, 2, 9] - rebuild header, 3-message hero, and intro
- Task 4: depends [1, 2, 9] - rebuild six branch cards and branch action surfaces
- Task 5: depends [1, 2, 9] - rebuild named pet gallery and filters
- Task 6: depends [1, 2, 9] - rebuild reviews, trust/care, content hub, and consultation CTA

Wave 3 (after Wave 2):
- Task 7: depends [3, 4, 5, 6] - responsive CSS and visual polish
- Task 8: depends [3, 4, 5, 6] - interaction wiring
- Task 10: depends [7, 8, 9] - selector, anchor, and source-link integrity audit

Wave 4 (after Wave 3):
- Task 11: depends [10] - final C001-C003 browser/CLI verification and fixes

Critical path: Task 1 -> Task 2 -> Task 9 -> Task 3 -> Task 7 -> Task 8 -> Task 10 -> Task 11

### Dependency matrix
| Task | Depends on | Blocks | Can parallelize with |
|------|------------|--------|----------------------|
| 1    | none       | 3, 4, 5, 6, 10 | 2, 9 |
| 2    | none       | 3, 4, 5, 6, 8, 9, 10 | 1 |
| 3    | 1, 2, 9    | 7, 8, 10 | 4, 5, 6 only with section-level merge coordination in `index.html` |
| 4    | 1, 2, 9    | 7, 8, 10 | 3, 5, 6 only with section-level merge coordination in `index.html` |
| 5    | 1, 2, 9    | 7, 8, 10 | 3, 4, 6 only with section-level merge coordination in `index.html` |
| 6    | 1, 2, 9    | 7, 8, 10 | 3, 4, 5 only with section-level merge coordination in `index.html` |
| 7    | 3, 4, 5, 6 | 10, 11 | 8, 10 |
| 8    | 3, 4, 5, 6 | 10, 11 | 7, 10 |
| 9    | 1, 2       | 3, 4, 5, 6, 10, 11 | none after Task 2 because it owns `tests/site-structure.test.mjs` |
| 10   | 7, 8, 9    | 11 | 7, 8 after their file edits settle |
| 11   | 10         | final verification | none |

## Todos
> Implementation + Test = ONE task. Never separate.
> Every task MUST have: References + Acceptance Criteria + QA Scenarios + Commit.

- [ ] 1. Baseline evidence and dirty-worktree guard

  What to do: Capture the current repository state and failing-first evidence before product edits. Record existing dirty files, current static test output, syntax checks, and current rendered/structural gaps. Do not modify product files in this task. If the dirty files contain user edits, preserve them and base later edits on the current file contents.
  Must NOT do: Do not reset, checkout, stash, delete, or overwrite existing changes. Do not edit `index.html`, `styles.css`, `app.js`, `content.js`, or `tests/site-structure.test.mjs`.

  Parallelization: Can parallel: YES | Wave 1 | Blocks: [3, 4, 5, 6, 10] | Blocked by: []

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:1` - existing page is a static HTML document.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:8-10` - CSS and scripts are loaded directly with no build step.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:7-12` - current test file defines exact runtime source paths.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:131-177` - current planning-doc scope assertions likely expose the baseline gap.
  - Evidence: `/Users/cosmos/Documents/pet/.omo/evidence` - existing evidence root already used by previous work.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet`, run `git status --short | tee .omo/evidence/task-1-healthdog-homepage-from-planning-doc-status.txt`; output includes any pre-existing dirty files and no destructive command is used.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test tests/site-structure.test.mjs > ../.omo/evidence/task-1-healthdog-homepage-from-planning-doc-red-node-test.txt 2>&1; test $? -ne 0`; this captures failing-first CLI evidence before implementation.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --check app.js > ../.omo/evidence/task-1-healthdog-homepage-from-planning-doc-app-check.txt 2>&1 && node --check content.js > ../.omo/evidence/task-1-healthdog-homepage-from-planning-doc-content-check.txt 2>&1`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Baseline structural gap is captured
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --test tests/site-structure.test.mjs > ../.omo/evidence/task-1-healthdog-homepage-from-planning-doc-red-node-test.txt 2>&1; status=$?; test "$status" -ne 0; rg -n "not ok|missing planning section|missing planning-doc copy|missing planning-doc filter" ../.omo/evidence/task-1-healthdog-homepage-from-planning-doc-red-node-test.txt
    Expected: Command exits 0 because the test run failed as expected and the evidence names at least one planning-doc homepage gap.
    Evidence: .omo/evidence/task-1-healthdog-homepage-from-planning-doc-red-node-test.txt

  Scenario: Existing dirty worktree is preserved
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet && git status --short | tee .omo/evidence/task-1-healthdog-homepage-from-planning-doc-status.txt && test -s .omo/evidence/task-1-healthdog-homepage-from-planning-doc-status.txt
    Expected: Status evidence exists; no reset/checkout/stash command appears in shell history or task transcript.
    Evidence: .omo/evidence/task-1-healthdog-homepage-from-planning-doc-status.txt
  ```

  Commit: NO | Message: `n/a` | Files: [.omo/evidence/task-1-healthdog-homepage-from-planning-doc-status.txt, .omo/evidence/task-1-healthdog-homepage-from-planning-doc-red-node-test.txt, .omo/evidence/task-1-healthdog-homepage-from-planning-doc-app-check.txt, .omo/evidence/task-1-healthdog-homepage-from-planning-doc-content-check.txt]

- [ ] 2. Finalize `content.js` as the static source of truth

  What to do: Complete and normalize `HealthDogContent` so every rendered section can be generated or checked from one static data contract: brand/nav, 3 hero slides, intro cards, trust stats, six branches with channel URLs/actions, filters, named pets, review cards, trust/care cards, content hub cards, and visit/consultation flow. Keep all data local/static. Use existing known branch URLs from the current `content.js`; mark unknown URLs empty so UI can hide unavailable actions. Add a branch truth table through fields such as `phoneLabel`, `addressStatus`, and `dataNote`, so representative numbers and unconfirmed address/phone details are labeled instead of implied as final. Ensure branch ids and filter tokens are stable: `changwon`, `suwon`, `busan`, `pyeongtaek`, `incheon`, `songpa`, `dog`, `cat`, `free`, `responsibility`, breed tokens. Ensure review/source cards have real external source/channel URLs, not `#branches` placeholders.
  Must NOT do: Do not add runtime fetching, secret tokens, external API keys, generated fake reviews, exact price fields, or medical guarantee copy.

  Parallelization: Can parallel: YES | Wave 1 | Blocks: [3, 4, 5, 6, 8, 9, 10] | Blocked by: []

  References (executor has NO interview context - be exhaustive):
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:5-17` - existing `healthDogContent.meta` and guardrails contract.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:19-65` - existing brand/nav/hero slide structure.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:89-168` - branch objects with ids, names, regions, addresses, phones, Instagram, Naver, blog, Kakao URLs.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:170-230` - filters and named pet data with categories/status/health/source fields.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:233-255` - review item data shape.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:258-285` - trust cards, content hub, and visit flow data.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:345-403` - required 3 hero messages.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:451-471` - branch card required fields/actions.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1299-1337` - branch/contact details that still require confirmation and must be labeled carefully.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:522-535` - pet card required fields/actions.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:620-627` - review card count and original-link requirement.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:643-654` - review/proof image consent caution.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:688-692` - medical/guarantee copy guardrails.
  - External: `https://nodejs.org/api/test.html` - Node test runner can import/execute `content.js` through the existing VM pattern.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --check content.js`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import vm from 'node:vm'; import { readFileSync } from 'node:fs'; const sandbox={module:{exports:{}}}; vm.runInNewContext(readFileSync('content.js','utf8'), sandbox); const c=sandbox.module.exports; if(c.heroSlides.length!==3) throw new Error('heroSlides'); if(c.branches.length!==6) throw new Error('branches'); if(!c.branches.every(b=>b.phone&&b.phoneLabel&&b.address&&b.addressStatus&&b.dataNote&&b.naverMapUrl&&b.instagramUrl)) throw new Error('branch truth/actions'); if(c.heroSlides.some(s=>s.image&&!s.image.startsWith('assets/healthdog/'))) throw new Error('hero asset outside healthdog'); if(c.availablePets.items.length<18) throw new Error('pets'); if(c.reviews.items.length<6||c.reviews.items.length>9) throw new Error('reviews'); if(!c.reviews.items.every(r=>/^https?:\\/\\//.test(r.url))) throw new Error('review source urls'); if(c.contentHub.items.length<5) throw new Error('contentHub');"` and it exits 0.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `rg -n "instagram_access_token|access_token|최저가|무조건|100% 보장|당일 데려가세요|질병 없음 보장|병원급 관리 보장|5만원부터|10만원부터|최대 80% 할인" content.js` and it returns no matches.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Content contract has all required static data
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import vm from 'node:vm'; import { readFileSync } from 'node:fs'; const sandbox={module:{exports:{}}}; vm.runInNewContext(readFileSync('content.js','utf8'), sandbox); const c=sandbox.module.exports; const values=c.filters.pet.map(f=>f.value); for (const v of ['all','dog','cat','changwon','suwon','busan','pyeongtaek','incheon','songpa','free','responsibility']) if(!values.includes(v)) throw new Error('missing filter '+v); const missingBranchTruth=c.branches.filter(b=>!b.phoneLabel||!b.addressStatus||!b.dataNote).map(b=>b.id); if(missingBranchTruth.length) throw new Error('missing branch truth '+missingBranchTruth.join(',')); const badReviews=c.reviews.items.filter(r=>!/^https?:\\/\\//.test(r.url)).map(r=>r.branch); if(badReviews.length) throw new Error('bad review urls '+badReviews.join(',')); console.log(JSON.stringify({slides:c.heroSlides.length, branches:c.branches.length, branchTruth:c.branches.map(b=>[b.id,b.phoneLabel,b.addressStatus]), pets:c.availablePets.items.length, reviews:c.reviews.items.length, hub:c.contentHub.items.length}, null, 2));" | tee ../.omo/evidence/task-2-healthdog-homepage-from-planning-doc-content-contract.json
    Expected: JSON shows 3 slides, 6 branches with truth labels, at least 18 pets, 6-9 reviews with real external source URLs, and at least 5 content-hub cards.
    Evidence: .omo/evidence/task-2-healthdog-homepage-from-planning-doc-content-contract.json

  Scenario: Content contract rejects forbidden selling/guarantee copy
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && ! rg -n "instagram_access_token|access_token|최저가|무조건|100% 보장|당일 데려가세요|질병 없음 보장|병원급 관리 보장|5만원부터|10만원부터|최대 80% 할인" content.js | tee ../.omo/evidence/task-2-healthdog-homepage-from-planning-doc-copy-scan.txt
    Expected: Command exits 0 with an empty evidence file.
    Evidence: .omo/evidence/task-2-healthdog-homepage-from-planning-doc-copy-scan.txt
  ```

  Commit: YES | Message: `feat(content): define healthdog homepage data contract` | Files: [pet-clone-site/content.js, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 3. Rebuild header, 3-message hero, and Health Dog intro

  What to do: Update `index.html` so the first viewport contains the Health Dog brand signal and a 3-message hero slider/panel set matching the planning document: brand trust, six branches, and pet exploration/consultation conversion. Add hero controls with `data-hero-slide` and `data-hero-dot` so `app.js` can switch slides. Add the `#about` intro section immediately after the hero with the required title and three intro cards. Keep existing anchors (`#top`, `#branches`, `#puppies`, `#reviews`, `#contact`) and update nav labels to the planning-doc sequence. Ensure no price/free/ad copy appears inside hero slides.
  Must NOT do: Do not create separate pages or route links for non-existent pages. Do not use the existing single-slide hero copy as the final implementation. Do not put `무료분양`, price, discount, or hard-sell terms in hero text.

  Parallelization: Can parallel: CONDITIONAL | Wave 2 | Blocks: [7, 8, 10] | Blocked by: [1, 2, 9]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:13-45` - existing sticky header/nav/mobile menu structure to preserve.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:48-68` - current single hero to replace with 3-slide structure.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:37-65` - existing hero slide data contract.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:74-87` - intro card data contract.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:11-12` - existing selectors for hero slides/dots.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:66-78` - current `setHeroSlide` logic expects `data-hero-slide` and `data-hero-dot`.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:31-42` - planning-doc required hero/intro copy constants.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:300-335` - hero purpose, 3-slide count, image style, no hero price/free copy.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:345-429` - exact hero and intro copy.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test --test-name-pattern "planning-doc-homepage-scope-is-rendered|healthdog-brand-branches-and-sections" tests/site-structure.test.mjs`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const slides=[...html.matchAll(/data-hero-slide=/g)].length; const dots=[...html.matchAll(/data-hero-dot=/g)].length; if(slides!==3||dots!==3) throw new Error(JSON.stringify({slides,dots})); const hero=html.slice(html.indexOf('class=\"hero'), html.indexOf('id=\"about\"')); if(/무료분양|5만원부터|10만원부터|최대 80% 할인|최저가|무조건|100% 보장|당일 데려가세요/.test(hero)) throw new Error('forbidden hero copy');"`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Hero and intro render required copy
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); for (const text of ['건강한 만남을 준비하는 안심분양 브랜드, 헬스독','6개의 지점, 하나의 안심 기준','우리 가족에게 맞는 아이를 함께 찾아드립니다','헬스독은 건강한 만남을 먼저 생각합니다','건강 상태 확인','1:1 맞춤 상담','가까운 지점 연결']) if(!html.includes(text)) throw new Error(text); console.log('hero-intro-ok');" | tee ../.omo/evidence/task-3-healthdog-homepage-from-planning-doc-hero-intro.txt
    Expected: Output is `hero-intro-ok`.
    Evidence: .omo/evidence/task-3-healthdog-homepage-from-planning-doc-hero-intro.txt

  Scenario: Hero copy excludes prohibited price/free/hard-sell terms
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const hero=html.slice(html.indexOf('hero'), html.indexOf('id=\"about\"')); if(/무료분양|5만원부터|10만원부터|최대 80% 할인|최저가|무조건|100% 보장|당일 데려가세요/.test(hero)) throw new Error('forbidden hero text'); console.log('hero-copy-safe');" | tee ../.omo/evidence/task-3-healthdog-homepage-from-planning-doc-hero-copy-scan.txt
    Expected: Output is `hero-copy-safe`.
    Evidence: .omo/evidence/task-3-healthdog-homepage-from-planning-doc-hero-copy-scan.txt
  ```

  Commit: YES | Message: `feat(homepage): add healthdog hero and intro sections` | Files: [pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 4. Rebuild six branch cards and branch action surfaces

  What to do: Replace the current minimal branch cards with six full branch cards backed by `content.js`: local Health Dog visual, branch name, region keywords, address plus data-confidence note, representative/confirmed phone label, operating/consultation copy, channel badges/icons as text or accessible labels, and actions for `이 지점 아이들 보기`, Naver Place, Instagram, Blog when present, Kakao when present, and `전화하기`. Add data hooks such as `data-branch-card`, `data-branch-id`, and `data-branch-pet-filter`. Each `이 지점 아이들 보기` action must target `#puppies` and activate the matching pet filter through `data-branch-pet-filter`; do not use bare `#changwon` hashes unless a matching anchor exists.
  Must NOT do: Do not invent unknown phone numbers or channel URLs. Do not show unavailable actions as active links; hide or disable them accessibly. Do not replace the six Naver map links with non-Naver links. Do not put `data-filter` on branch links or any non-filter controls.

  Parallelization: Can parallel: CONDITIONAL | Wave 2 | Blocks: [7, 8, 10] | Blocked by: [1, 2, 9]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:93-134` - current minimal six branch cards and Naver links.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:89-168` - branch data source with ids, addresses, channel URLs, and descriptions.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:80-119` - branch lookup/action logic for branch-specific URLs.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:13-20` - required branch names.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:239-263` - existing Naver/local asset/link integrity checks.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:437-497` - branch section purpose, required card fields/actions, 2-3 column desktop and 1-column mobile direction.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1259-1266` - required telephone, Kakao, Naver, Instagram, and blog link actions.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1310-1315` - final address/phone/channel confirmation is unresolved, so rendered cards need confidence labels.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test --test-name-pattern "healthdog-brand-branches-and-sections|runtime-sources-have-no-forbidden-strings-and-local-assets-exist" tests/site-structure.test.mjs`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const cardCount=[...html.matchAll(/data-branch-card/g)].length; if(cardCount!==6) throw new Error('branch cards '+cardCount); const naver=[...html.matchAll(/https:\\/\\/map\\.naver\\.com\\//g)].length; if(naver<6) throw new Error('naver '+naver); for (const id of ['changwon','suwon','busan','pyeongtaek','incheon','songpa']) { if(!html.includes(\`data-branch-id=\"\${id}\"\`)) throw new Error(id); if(!html.includes(\`data-branch-pet-filter=\"\${id}\"\`)) throw new Error('branch pet filter '+id); } const branchSection=html.slice(html.indexOf('id=\"branches\"'), html.indexOf('id=\"puppies\"')); if(/data-filter=/.test(branchSection)) throw new Error('branch section must not use data-filter');"`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Six branch cards expose required actions
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); for (const id of ['changwon','suwon','busan','pyeongtaek','incheon','songpa']) { const start=html.indexOf('data-branch-id=\"'+id+'\"'); if(start<0) throw new Error('missing '+id); const card=html.slice(start, html.indexOf('</article>', start)); for (const needle of ['이 지점 아이들 보기','네이버 플레이스','전화','대표번호','확인']) if(!card.includes(needle)) throw new Error(id+' missing '+needle); if(!card.includes('href=\"#puppies\"')) throw new Error(id+' branch pet action must target #puppies'); if(!card.includes('data-branch-pet-filter=\"'+id+'\"')) throw new Error(id+' missing branch pet filter hook'); } console.log('branch-actions-ok');" | tee ../.omo/evidence/task-4-healthdog-homepage-from-planning-doc-branches.txt
    Expected: Output is `branch-actions-ok`.
    Evidence: .omo/evidence/task-4-healthdog-homepage-from-planning-doc-branches.txt

  Scenario: Branch Naver links are present and externally reachable enough for redirect response
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const urls=[...readFileSync('index.html','utf8').matchAll(/href=\"(https:\\/\\/map\\.naver\\.com\\/[^\"]+)\"/g)].map(m=>m[1]); if(urls.length<6) throw new Error('expected six naver links'); console.log(urls.slice(0,6).join('\\n'));" | while read -r url; do curl --head --location --max-time 10 --silent --show-error --output /dev/null --write-out "%{http_code}\t%{url_effective}\n" "$url"; done | tee ../.omo/evidence/task-4-healthdog-homepage-from-planning-doc-naver-links.txt
    Expected: Evidence contains six HTTP status lines with non-000 status codes.
    Evidence: .omo/evidence/task-4-healthdog-homepage-from-planning-doc-naver-links.txt
  ```

  Commit: YES | Message: `feat(homepage): add branch network cards` | Files: [pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 5. Rebuild named pet gallery and filters

  What to do: Replace generic `헬스독 아이 01` style cards with named pet cards from `content.js`. Each card must include image, name, breed/species, sex, age, branch label/tag, health copy, status, sale-type/status tag, and actions for details, consultation, and Instagram/source link. Render filters for all `content.filters.pet` values needed by C002: all, dog, cat, six branches, free, responsibility, and breed/species tokens. Reserve `data-filter` only for real filter controls inside the pet filter toolbar; use `data-category` only on pet cards; use `data-branch-pet-filter` or another separate hook for branch-card shortcuts. Keep pet card `data-category` tokens in exact parity with rendered pet filter values. Preserve `#empty-state` fallback.
  Must NOT do: Do not show exact prices. Do not make `무료분양` or `책임분양` the dominant card headline; keep them as small tags/filter labels. Do not invent animal/review facts beyond static `content.js` data.

  Parallelization: Can parallel: CONDITIONAL | Wave 2 | Blocks: [7, 8, 10] | Blocked by: [1, 2, 9]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:136-372` - current filter bar, 18 generic cards, and empty state.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:170-230` - canonical filter and pet data.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:1-54` - current filter implementation expects `data-filter`, `data-category`, `.is-active`, `.is-hidden`, `#empty-state`; update selectors if needed so non-filter hooks are not included.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:179-204` - filter parity assertion must be scoped to `.filter-bar [data-filter]` or equivalent actual filter controls.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:500-577` - pet section purpose, card fields, filters, and price display rules.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:579-594` - manual sourcing, source links, completed/archive/status rules, forbidden copy.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test --test-name-pattern "content-pet-filters-match-rendered-filter-and-card-category-values|planning-doc-homepage-scope-is-rendered" tests/site-structure.test.mjs`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const cards=[...html.matchAll(/class=\"[^\"]*pet-card|class=\"[^\"]*puppy-card/g)].length; if(cards<18) throw new Error('cards '+cards); for (const text of ['두부','모카','퐁실','설이','별이','단추','견종','성별','월령','건강','상담']) if(!html.includes(text)) throw new Error('missing '+text);"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const pets=readFileSync('index.html','utf8').slice(readFileSync('index.html','utf8').indexOf('id=\"puppies\"'), readFileSync('index.html','utf8').indexOf('id=\"reviews\"')); if(/5만원부터|10만원부터|최대 80% 할인|최저가|무조건|100% 보장|당일 데려가세요/.test(pets)) throw new Error('forbidden pet card copy');"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const outsideFilters=html.replace(/<[^>]+class=\"[^\"]*filter-(?:bar|button)[\\s\\S]*?<\\/div>/g,'').match(/data-filter=/g)||[]; if(outsideFilters.length) throw new Error('data-filter outside filter controls: '+outsideFilters.length);"` and it exits 0.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Pet filters and card tokens match
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --test --test-name-pattern "content-pet-filters-match-rendered-filter-and-card-category-values" tests/site-structure.test.mjs | tee ../.omo/evidence/task-5-healthdog-homepage-from-planning-doc-filter-parity.txt
    Expected: Test exits 0 and reports the filter parity test as passing.
    Evidence: .omo/evidence/task-5-healthdog-homepage-from-planning-doc-filter-parity.txt

  Scenario: Filter hooks are not reused by branch shortcuts
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const branches=html.slice(html.indexOf('id=\"branches\"'), html.indexOf('id=\"puppies\"')); if(/data-filter=/.test(branches)) throw new Error('branch shortcuts must not use data-filter'); if(!/data-branch-pet-filter=/.test(branches)) throw new Error('missing branch pet shortcut hook'); console.log('filter-hooks-ok');" | tee ../.omo/evidence/task-5-healthdog-homepage-from-planning-doc-filter-hooks.txt
    Expected: Output is `filter-hooks-ok`.
    Evidence: .omo/evidence/task-5-healthdog-homepage-from-planning-doc-filter-hooks.txt

  Scenario: Pet section omits exact-price and guarantee copy
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const pet=html.slice(html.indexOf('id=\"puppies\"'), html.indexOf('id=\"reviews\"')); if(/5만원부터|10만원부터|최대 80% 할인|최저가|무조건|100% 보장|당일 데려가세요|질병 없음 보장/.test(pet)) throw new Error('bad copy'); console.log('pet-copy-safe');" | tee ../.omo/evidence/task-5-healthdog-homepage-from-planning-doc-pet-copy-scan.txt
    Expected: Output is `pet-copy-safe`.
    Evidence: .omo/evidence/task-5-healthdog-homepage-from-planning-doc-pet-copy-scan.txt
  ```

  Commit: YES | Message: `feat(homepage): render named pet gallery filters` | Files: [pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 6. Rebuild reviews, trust/care, content hub, and consultation CTA

  What to do: Replace the proof-only reviews with 6-9 review/source cards containing image, summary-only copy, branch, source, and `원문 보기`. Every `원문 보기` must point to a real external source/channel URL from `content.js`; if an exact original review URL is unavailable, link to the relevant branch's Naver/Instagram/blog source channel and label it as source/channel access, not a verbatim original. Add the trust/care section headed `헬스독이 신중하게 만남을 준비하는 방법` with six trust cards. Add `#stories` content hub with Instagram and blog tabs/cards, original links, and branch/source labels. Rebuild final `#contact` CTA with representative phone, branch selector (`#branch-select`), branch contact display fields, branch action links (`data-branch-action="call|place|instagram|blog|kakao"`), static consultation form fields, and clear non-submitting guidance.
  Must NOT do: Do not invent verbatim reviews from external sources. Do not copy full blog posts. Do not submit form data anywhere. Do not expose unavailable branch actions as valid links. Do not use `href="#branches"` or any other placeholder as a review source/original link.

  Parallelization: Can parallel: CONDITIONAL | Wave 2 | Blocks: [7, 8, 10] | Blocked by: [1, 2, 9]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:376-402` - current care/promise sections to restructure.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:404-463` - current review proof grid to replace with sourced cards.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:465-487` - current contact section to expand.
  - API/Type: `/Users/cosmos/Documents/pet/pet-clone-site/content.js:233-285` - review, trust card, content hub, and visit flow data.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:6-10` - existing branch selector/action selectors.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:84-119` - `setBranchContact` updates branch name, address, phone, and action URLs.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:598-654` - review section requirements and consent/source guardrails.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:934-939` - review/photo reuse consent and summary/link recommendation.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:658-692` - trust/care card copy and prohibited guarantee wording.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:696-739` - Instagram/blog content hub requirements.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:742-767` - consultation CTA, branch selector, Kakao/Naver actions.
  - External: `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label` - explicit labels for form/select controls.
  - External: `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form` - native static form semantics.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test --test-name-pattern "planning-doc-homepage-scope-is-rendered|proof-and-generated-assets-exist" tests/site-structure.test.mjs`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); for (const id of ['reviews','trust','stories','contact']) if(!html.includes('id=\"'+id+'\"')) throw new Error(id); for (const text of ['원문 보기','헬스독이 신중하게 만남을 준비하는 방법','헬스독의 더 많은 이야기를 확인해보세요','어떤 아이가 우리 가족에게 맞을지 고민된다면','branch-select','data-branch-action=\"place\"','data-branch-action=\"instagram\"']) if(!html.includes(text)) throw new Error(text);"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const form=html.slice(html.indexOf('id=\"contact\"')); for (const field of ['name','phone','branch','message']) if(!new RegExp('(<label[^>]+for=\"[^\"]*'+field+'|id=\"[^\"]*'+field+')').test(form)) throw new Error('missing labeled field '+field);"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const review=html.slice(html.indexOf('id=\"reviews\"'), html.indexOf('id=\"trust\"')); const links=[...review.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>\\s*원문 보기/g)].map(m=>m[1]); if(links.length<6||links.length>9) throw new Error('review source link count '+links.length); const bad=links.filter(h=>!/^https?:\\/\\//.test(h)); if(bad.length) throw new Error('placeholder review links '+bad.join(','));"` and it exits 0.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Reviews, trust cards, stories, and CTA are structurally present
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const required=['원문 보기','네이버 리뷰','인스타 후기','블로그 후기','아이별 건강 체크','3대 질병 키트 검사 안내','원구충 및 위생 관리','인스타그램','블로그','지점 선택','상담 문의하기']; for (const text of required) if(!html.includes(text)) throw new Error(text); console.log('lower-homepage-ok');" | tee ../.omo/evidence/task-6-healthdog-homepage-from-planning-doc-lower-sections.txt
    Expected: Output is `lower-homepage-ok`.
    Evidence: .omo/evidence/task-6-healthdog-homepage-from-planning-doc-lower-sections.txt

  Scenario: Review original/source links are real external URLs
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const review=html.slice(html.indexOf('id=\"reviews\"'), html.indexOf('id=\"trust\"')); const links=[...review.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>\\s*원문 보기/g)].map(m=>m[1]); if(links.length<6||links.length>9) throw new Error('bad review source count '+links.length); const bad=links.filter(h=>!/^https?:\\/\\//.test(h)); if(bad.length) throw new Error('bad review hrefs '+bad.join(',')); console.log(JSON.stringify({reviewSourceLinks:links.length}, null, 2));" | tee ../.omo/evidence/task-6-healthdog-homepage-from-planning-doc-review-links.json
    Expected: JSON shows 6-9 review source links and no placeholder hashes.
    Evidence: .omo/evidence/task-6-healthdog-homepage-from-planning-doc-review-links.json

  Scenario: CTA form is static and cannot leak data to an external endpoint
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const contact=html.slice(html.indexOf('id=\"contact\"')); if(/<form[^>]+action=\"https?:/i.test(contact)) throw new Error('external form action'); if(!/type=\"button\"|action=\"\"|onsubmit=\"return false/.test(contact)) throw new Error('static form intent missing'); console.log('static-form-ok');" | tee ../.omo/evidence/task-6-healthdog-homepage-from-planning-doc-static-form.txt
    Expected: Output is `static-form-ok`.
    Evidence: .omo/evidence/task-6-healthdog-homepage-from-planning-doc-static-form.txt
  ```

  Commit: YES | Message: `feat(homepage): add proof trust stories and consultation sections` | Files: [pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 7. Responsive CSS and visual polish

  What to do: Update `styles.css` for the full rebuilt homepage. Preserve the existing static CSS approach and define responsive, stable dimensions for hero slides, branch cards, pet cards, review cards, trust cards, content hub cards, CTA form, floating CTA, and mobile nav. Ensure CJK line wrapping is clean with `word-break: keep-all`, `overflow-wrap`, and/or `line-break` where appropriate. Keep cards at radius 8px or less. Avoid nested card visuals. Avoid one-note palette dominance; use the existing Health Dog palette but balance neutral, mint/sage, navy/charcoal, and warm paper backgrounds.
  Must NOT do: Do not use viewport-width font sizing. Do not use negative letter spacing. Do not add decorative gradient orbs/blobs. Do not create a purple/blue-gradient dominated page. Do not let dynamic labels resize fixed-format controls.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [10] | Blocked by: [3, 4, 5, 6]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:1-68` - current CSS variables, global font/letter-spacing, container width.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:70-180` - current sticky header/mobile menu styling.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:182-329` - current hero sizing and image layout.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:366-494` - current filter and pet card grid.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:562-669` - current branch/review/contact grid styling.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:755-981` - current responsive breakpoints at 1080px, 760px, and 430px.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:491-497` - branch card desktop/mobile layout guidance.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1129-1163` - design tone, palette, mobile-first and easy consultation access.
  - External: `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-break` - CJK line-break behavior.
  - External: `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-wrap` - overflow handling for long tokens.
  - External: `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using` - responsive media queries.
  - External: `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img` - image width/height stability.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const css=readFileSync('styles.css','utf8'); if(/font-size:\\s*clamp\\([^;]*vw|font-size:\\s*[0-9.]+vw|letter-spacing:\\s*-/.test(css)) throw new Error('disallowed fluid font or negative tracking'); if(/border-radius:\\s*(9|[1-9][0-9])px/.test(css)) throw new Error('card radius above 8px'); for (const token of ['@media (max-width: 1080px)','@media (max-width: 760px)','@media (max-width: 430px)','word-break: keep-all']) if(!css.includes(token)) throw new Error(token);"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test tests/site-structure.test.mjs`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --check app.js && node --check content.js`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: CSS constraints protect responsive Korean layout
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const css=readFileSync('styles.css','utf8'); const required=['word-break: keep-all','overflow-wrap','@media (max-width: 1080px)','@media (max-width: 760px)','@media (max-width: 430px)']; for (const token of required) if(!css.includes(token)) throw new Error(token); if(/letter-spacing:\\s*-/.test(css)) throw new Error('negative letter spacing'); console.log('css-responsive-ok');" | tee ../.omo/evidence/task-7-healthdog-homepage-from-planning-doc-css-scan.txt
    Expected: Output is `css-responsive-ok`.
    Evidence: .omo/evidence/task-7-healthdog-homepage-from-planning-doc-css-scan.txt

  Scenario: Visual smoke screenshots show no horizontal overflow on desktop/mobile
    Tool:     Chrome DevTools MCP (real Chrome)
    Steps:    Start `cd /Users/cosmos/Documents/pet/pet-clone-site && python3 -m http.server 4173 --bind 127.0.0.1`; call `navigate_page({"type":"url","url":"http://127.0.0.1:4173/index.html"})`; call `resize_page({"width":1440,"height":1200})`; call `evaluate_script({"function":"() => ({scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth})"})`; call `take_screenshot({"filePath":"/Users/cosmos/Documents/pet/.omo/evidence/task-7-healthdog-homepage-from-planning-doc-desktop.png","fullPage":true})`; call `resize_page({"width":390,"height":1100})`; call `evaluate_script({"function":"() => ({scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth})"})`; call `take_screenshot({"filePath":"/Users/cosmos/Documents/pet/.omo/evidence/task-7-healthdog-homepage-from-planning-doc-mobile.png","fullPage":true})`.
    Expected: Both evaluations return `scrollWidth <= innerWidth`; screenshots exist and show no incoherent overlap.
    Evidence: .omo/evidence/task-7-healthdog-homepage-from-planning-doc-desktop.png and .omo/evidence/task-7-healthdog-homepage-from-planning-doc-mobile.png
  ```

  Commit: YES | Message: `feat(styles): polish responsive healthdog homepage` | Files: [pet-clone-site/styles.css, pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 8. Interaction wiring

  What to do: Update `app.js` to work with the final markup. Hero dots/buttons must toggle visible slides and `aria-pressed`/`hidden` correctly. Pet filters must support all content filter tokens, update active state, hide/show cards, update URL hash, and show the empty state for unmatched filters. Content hub tabs must switch Instagram/blog cards if implemented as tabs. Mobile nav must open/close and close on link click. Branch selector must update branch name/address/phone and show/hide branch-specific call, Naver, Instagram, blog, and Kakao actions. Branch card `이 지점 아이들 보기` actions using `data-branch-pet-filter` must scroll/link to `#puppies` and activate the matching pet filter on-page.
  Must NOT do: Do not use external libraries. Do not break the existing `hidden` and `aria-expanded` contracts. Do not make branch actions point to `#` when a real URL exists; hide missing actions instead.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [10] | Blocked by: [3, 4, 5, 6]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:1-15` - current selector constants and `HealthDogContent` access.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:16-54` - current filter behavior.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:56-64` - current mobile nav close behavior.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:66-78` - current hero slide behavior.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:80-119` - current branch selector/action behavior.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:121-160` - current event listener initialization.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:32-45` - mobile nav contract.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:144-152` - current filter button contract.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:372` - empty-state contract.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:545-560` - required pet filters.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:756-767` - final CTA branch selector/actions.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --check app.js`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test --test-name-pattern "content-pet-filters-match-rendered-filter-and-card-category-values|planning-doc-homepage-scope-is-rendered" tests/site-structure.test.mjs`.
  - [ ] Browser C002 mini-check: use Chrome DevTools MCP to click `[data-filter="cat"]`, assert visible card count is >0 and less than all cards; click `[data-branch-pet-filter="songpa"]`, assert the active filter becomes `songpa`; change `#branch-select` to `songpa`, assert `[data-branch-contact-name]` includes `송파`; click `.mobile-menu-toggle`, assert `#mobile-nav.hidden === false`, click a mobile nav link, assert `#mobile-nav.hidden === true`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Filter, branch selector, and mobile nav work in real Chrome
    Tool:     Chrome DevTools MCP (real Chrome)
    Steps:    Start `cd /Users/cosmos/Documents/pet/pet-clone-site && python3 -m http.server 4173 --bind 127.0.0.1`; call `navigate_page({"type":"url","url":"http://127.0.0.1:4173/index.html"})`; call `click({"uid":"<latest snapshot uid for [data-filter='cat']"})`; call `evaluate_script({"function":"() => ({visible:[...document.querySelectorAll('[data-category]')].filter(c=>!c.classList.contains('is-hidden')).length, total:document.querySelectorAll('[data-category]').length, active:document.querySelector('.filter-button.is-active')?.dataset.filter})"})`; call `click({"uid":"<latest snapshot uid for [data-branch-pet-filter='songpa']"})`; call `evaluate_script({"function":"() => ({active:document.querySelector('.filter-button.is-active')?.dataset.filter, hash:location.hash})"})`; call `fill({"uid":"<latest snapshot uid for #branch-select>","value":"songpa"})`; call `evaluate_script({"function":"() => ({name:document.querySelector('[data-branch-contact-name]')?.textContent, hrefs:[...document.querySelectorAll('[data-branch-action]:not([hidden])')].map(a=>a.href)})"})`; call `resize_page({"width":390,"height":1100})`; call `click({"uid":"<latest snapshot uid for .mobile-menu-toggle>"})`; call `evaluate_script({"function":"() => ({expanded:document.querySelector('.mobile-menu-toggle')?.getAttribute('aria-expanded'), hidden:document.querySelector('#mobile-nav')?.hidden})"})`.
    Expected: Filter active is `cat` after the cat click; visible count is >0 and < total; branch shortcut changes active filter to `songpa` and keeps/returns hash to `#puppies` or `#songpa` with a valid page state; branch contact name includes `송파`; branch action hrefs include Naver and Instagram URLs; mobile nav expanded is `true` and hidden is `false`.
    Evidence: .omo/evidence/task-8-healthdog-homepage-from-planning-doc-interactions.json

  Scenario: Unknown filter hash falls back gracefully
    Tool:     Chrome DevTools MCP (real Chrome)
    Steps:    Navigate to `http://127.0.0.1:4173/index.html#not-a-filter`; call `evaluate_script({"function":"() => ({active:document.querySelector('.filter-button.is-active')?.dataset.filter, visible:[...document.querySelectorAll('[data-category]')].filter(c=>!c.classList.contains('is-hidden')).length, emptyHidden:document.querySelector('#empty-state')?.hidden})"})`.
    Expected: Active filter is `all`; visible count equals total pet card count; empty state remains hidden.
    Evidence: .omo/evidence/task-8-healthdog-homepage-from-planning-doc-filter-fallback.json
  ```

  Commit: YES | Message: `feat(app): wire homepage interactions` | Files: [pet-clone-site/app.js, pet-clone-site/index.html, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 9. Encode C001-C003 in CLI regression tests

  What to do: Strengthen `tests/site-structure.test.mjs` so C001-C003 are enforceable without a browser. Keep the Node built-in test runner and dependency-free regex/static checks. Assertions must cover required sections/copy/order, 3 hero slides/dots, exact filter parity scoped to real filter controls, named pet card fields, six branch action sets, branch data-confidence labels, valid in-page anchors, `data-branch-pet-filter` shortcuts, review/source cards with external source URLs, trust/content hub/CTA presence, local asset references, six Naver links, selector/class coverage, no stale brand/secret leakage, and no forbidden hard-sell/medical guarantee copy in visible HTML. Add helper functions only inside the test file.
  Must NOT do: Do not make brittle tests that only count incidental class names if semantic `data-*` hooks are available. Do not skip, delete, or weaken existing assertions. Do not add npm/package dependencies.

  Parallelization: Can parallel: NO | Wave 1 | Blocks: [3, 4, 5, 6, 10] | Blocked by: [1, 2]

  References (executor has NO interview context - be exhaustive):
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:1-12` - existing built-in modules and source path constants.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:13-80` - current constants for branch names, section IDs, planning copy, filter values, assets, forbidden strings.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:83-129` - existing helper functions for source reads and extraction.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:131-177` - existing brand/sections/planning scope checks.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:179-204` - existing content/rendered filter parity check.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:206-263` - existing asset, forbidden string, and Naver map checks.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1372-1406` - final recommended main homepage structure and one-line objective.
  - External: `https://nodejs.org/api/cli.html#--test` - direct `node --test` CLI.
  - External: `https://nodejs.org/api/assert.html` - built-in strict assertions.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test tests/site-structure.test.mjs`; after all implementation tasks, it exits 0.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --check app.js && node --check content.js`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const t=readFileSync('tests/site-structure.test.mjs','utf8'); for (const term of ['data-hero-slide','data-hero-dot','data-branch-card','data-branch-pet-filter','원문 보기','data-branch-action','href=\"#puppies\"','FORBIDDEN','Naver','content-pet-filters','valid anchor','review source']) if(!t.includes(term)) throw new Error('test missing '+term);"` and it exits 0.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: CLI regression suite passes after implementation
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --test tests/site-structure.test.mjs | tee ../.omo/evidence/task-9-healthdog-homepage-from-planning-doc-node-test.txt
    Expected: Command exits 0 with all tests passing; output includes C001/C002/C003-relevant test names or assertions.
    Evidence: .omo/evidence/task-9-healthdog-homepage-from-planning-doc-node-test.txt

  Scenario: Forbidden brand, secret, hard-sell, and guarantee copy scan is clean
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && ! rg -n "BB PUPPY|비비퍼피|010-7699-0531|instagram_access_token|access_token|imweb\\.me|puppybebe\\.com|최저가|무조건|완벽 보장|100% 보장|당일 데려가세요|질병 없음 보장|병원급 관리 보장|5만원부터|10만원부터|최대 80% 할인" index.html styles.css app.js content.js tests/site-structure.test.mjs | tee ../.omo/evidence/task-9-healthdog-homepage-from-planning-doc-forbidden-scan.txt
    Expected: Command exits 0 with an empty evidence file.
    Evidence: .omo/evidence/task-9-healthdog-homepage-from-planning-doc-forbidden-scan.txt
  ```

  Commit: YES | Message: `test(homepage): enforce healthdog planning criteria` | Files: [pet-clone-site/tests/site-structure.test.mjs]

- [ ] 10. Selector, anchor, and source-link integrity audit

  What to do: Run a static integration audit after markup, styles, scripts, and tests have landed. Verify every class family rendered in `index.html` has corresponding styling or is intentionally JS-only, every in-page anchor target exists, every `data-*` hook used by `app.js` exists in the markup, every review/source link is external, every branch shortcut targets `#puppies` plus `data-branch-pet-filter`, and `data-filter` appears only on actual pet filter controls. Fix only scoped integration drift in `index.html`, `styles.css`, `app.js`, and `tests/site-structure.test.mjs`.
  Must NOT do: Do not add new design sections, new features, or extra pages. Do not broaden the audit into aesthetic redesign. Do not weaken tests to pass a broken selector.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [11] | Blocked by: [7, 8, 9]

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:13-45` - header/mobile nav classes and anchors.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:93-134` - existing branch section replaced by branch cards and action hooks.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/index.html:136-372` - pet filter/card section and `#empty-state`.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:1-15` - selectors used by interaction wiring.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:121-160` - event listener hooks that must have matching DOM nodes.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:1-981` - CSS selector surface to audit against final markup.
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:179-204` - filter parity assertion that must target actual filter controls only.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1372-1406` - final homepage IA order.

  Acceptance criteria (agent-executable only):
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const ids=new Set([...html.matchAll(/id=\"([^\"]+)\"/g)].map(m=>m[1])); const hrefs=[...html.matchAll(/href=\"#([^\"]+)\"/g)].map(m=>m[1]); const missing=hrefs.filter(h=>!ids.has(h)); if(missing.length) throw new Error('missing anchors '+missing.join(',')); const branch=html.slice(html.indexOf('id=\"branches\"'), html.indexOf('id=\"puppies\"')); if(/data-filter=/.test(branch)) throw new Error('branch data-filter leak'); const review=html.slice(html.indexOf('id=\"reviews\"'), html.indexOf('id=\"trust\"')); const bad=[...review.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>\\s*원문 보기/g)].map(m=>m[1]).filter(h=>!/^https?:\\/\\//.test(h)); if(bad.length) throw new Error('bad review href '+bad.join(',')); console.log('anchors-links-ok');"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const js=readFileSync('app.js','utf8'); for (const hook of ['data-hero-slide','data-hero-dot','data-category','data-filter','branch-select','data-branch-contact-name','data-branch-contact-address','data-branch-contact-phone','data-branch-action','data-branch-pet-filter']) if(!html.includes(hook)) throw new Error('missing hook '+hook); for (const selector of ['[data-filter]','[data-category]','#empty-state','.mobile-menu-toggle','#mobile-nav','#branch-select','[data-branch-action]']) if(!js.includes(selector.replace(/\"/g,'')) && !js.includes(selector)) throw new Error('js selector missing '+selector); console.log('hooks-ok');"`.
  - [ ] From `/Users/cosmos/Documents/pet/pet-clone-site`, run `node --test tests/site-structure.test.mjs && node --check app.js && node --check content.js`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: Static anchors, source links, and data hooks are coherent
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --input-type=module -e "import { readFileSync } from 'node:fs'; const html=readFileSync('index.html','utf8'); const ids=new Set([...html.matchAll(/id=\"([^\"]+)\"/g)].map(m=>m[1])); const missingAnchors=[...html.matchAll(/href=\"#([^\"]+)\"/g)].map(m=>m[1]).filter(h=>!ids.has(h)); const branch=html.slice(html.indexOf('id=\"branches\"'), html.indexOf('id=\"puppies\"')); const review=html.slice(html.indexOf('id=\"reviews\"'), html.indexOf('id=\"trust\"')); const badReviewLinks=[...review.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>\\s*원문 보기/g)].map(m=>m[1]).filter(h=>!/^https?:\\/\\//.test(h)); if(missingAnchors.length||/data-filter=/.test(branch)||badReviewLinks.length) throw new Error(JSON.stringify({missingAnchors,badReviewLinks,branchFilterLeak:/data-filter=/.test(branch)})); console.log(JSON.stringify({anchors:'ok', reviewLinks:'ok', branchFilterHooks:'ok'}, null, 2));" | tee ../.omo/evidence/task-10-healthdog-homepage-from-planning-doc-integrity.json
    Expected: JSON reports anchors, review links, and branch filter hooks as `ok`.
    Evidence: .omo/evidence/task-10-healthdog-homepage-from-planning-doc-integrity.json

  Scenario: Selector coverage survives final CSS/JS integration
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && node --test tests/site-structure.test.mjs && node --check app.js && node --check content.js > ../.omo/evidence/task-10-healthdog-homepage-from-planning-doc-selector-regression.txt 2>&1
    Expected: Node tests and syntax checks exit 0.
    Evidence: .omo/evidence/task-10-healthdog-homepage-from-planning-doc-selector-regression.txt
  ```

  Commit: YES | Message: `test(homepage): verify selector and source integrity` | Files: [pet-clone-site/index.html, pet-clone-site/styles.css, pet-clone-site/app.js, pet-clone-site/tests/site-structure.test.mjs]

- [ ] 11. Final C001-C003 browser/CLI verification and fixes

  What to do: Run the full final verification matrix. Start a local static server, drive real Chrome for desktop/mobile layout and interactions, capture screenshots/logs, run all CLI checks, fix any defects in the scoped files, and rerun the full matrix until clean. Tear down any server or browser state and record the cleanup receipt.
  Must NOT do: Do not declare completion from tests alone. Do not leave `python3 -m http.server`, tmux sessions, Chrome contexts, or temporary QA files running. Do not broaden scope beyond the five static site files except evidence artifacts.

  Parallelization: Can parallel: NO | Wave 4 | Blocks: [final verification] | Blocked by: [10]

  References (executor has NO interview context - be exhaustive):
  - Test:     `/Users/cosmos/Documents/pet/pet-clone-site/tests/site-structure.test.mjs:131-263` - CLI suite covers structure, content parity, assets, forbidden strings, and Naver links.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/app.js:121-160` - event initialization must run cleanly in browser.
  - Pattern:  `/Users/cosmos/Documents/pet/pet-clone-site/styles.css:755-981` - responsive breakpoints must support mobile screenshots.
  - Source:   `/Users/cosmos/Downloads/healthdog_homepage_planning (2).md:1372-1406` - final homepage sequence to verify visually.
  - ULW C001: desktop 1440x1200 and mobile 390x1100 screenshots show 3 hero messages/slides, intro, six branch cards/actions, named pets, reviews/sources, trust/care, content hub, final CTA, no broken layout.
  - ULW C002: branch/type/status filters and consultation branch selector work; mobile nav opens/closes; branch-specific 상담/네이버/인스타/블로그 actions reachable.
  - ULW C003: Node tests/checks, forbidden scan, local assets, six Naver links.

  Acceptance criteria (agent-executable only):
  - [ ] C001: Chrome screenshots exist at `.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-desktop.png` and `.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-mobile.png`; Chrome evaluation evidence confirms required sections and no horizontal overflow.
  - [ ] C002: Chrome interaction log exists at `.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c002-interactions.json`; it shows pass for dog/cat/status/branch filters, branch selector, mobile nav, and branch action hrefs.
  - [ ] C003: From `/Users/cosmos/Documents/pet/pet-clone-site`, `node --test tests/site-structure.test.mjs`, `node --check app.js`, `node --check content.js`, forbidden scan, asset existence checks, and six Naver link checks pass with evidence files.
  - [ ] Cleanup: command evidence proves the local static server was terminated after QA.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: C001 browser layout evidence at desktop and mobile
    Tool:     Chrome DevTools MCP (real Chrome)
    Steps:    Start `cd /Users/cosmos/Documents/pet/pet-clone-site && python3 -m http.server 4173 --bind 127.0.0.1`; call `navigate_page({"type":"url","url":"http://127.0.0.1:4173/index.html"})`; call `resize_page({"width":1440,"height":1200})`; call `evaluate_script({"function":"() => { const text=document.body.innerText; const required=['건강한 만남을 준비하는 안심분양 브랜드, 헬스독','6개의 지점, 하나의 안심 기준','우리 가족에게 맞는 아이를 함께 찾아드립니다','헬스독은 건강한 만남을 먼저 생각합니다','가까운 헬스독 지점을 찾아보세요','헬스독에서 기다리는 아이들','헬스독을 통해 가족이 된 이야기','헬스독이 신중하게 만남을 준비하는 방법','헬스독의 더 많은 이야기를 확인해보세요','어떤 아이가 우리 가족에게 맞을지 고민된다면']; return {missing:required.filter(v=>!text.includes(v)), branchCards:document.querySelectorAll('[data-branch-card]').length, petCards:document.querySelectorAll('[data-category]').length, overflow:document.documentElement.scrollWidth>window.innerWidth}; }"})`; call `take_screenshot({"filePath":"/Users/cosmos/Documents/pet/.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-desktop.png","fullPage":true})`; call `resize_page({"width":390,"height":1100})`; repeat the evaluation; call `take_screenshot({"filePath":"/Users/cosmos/Documents/pet/.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-mobile.png","fullPage":true})`; save evaluation JSON to `.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-layout.json`.
    Expected: Both evaluations have `missing: []`, `branchCards: 6`, `petCards >= 18`, and `overflow: false`; screenshots show no broken layout.
    Evidence: .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-desktop.png, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-mobile.png, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-layout.json

  Scenario: C002 browser interactions
    Tool:     Chrome DevTools MCP (real Chrome)
    Steps:    With the same server/page open, click filters `[data-filter="dog"]`, `[data-filter="cat"]`, `[data-filter="free"]`, `[data-filter="responsibility"]`, and `[data-filter="songpa"]`; after each click call `evaluate_script({"function":"() => ({active:document.querySelector('.filter-button.is-active')?.dataset.filter, visible:[...document.querySelectorAll('[data-category]')].filter(c=>!c.classList.contains('is-hidden')).map(c=>c.textContent.trim()).slice(0,5), count:[...document.querySelectorAll('[data-category]')].filter(c=>!c.classList.contains('is-hidden')).length})"})`; click one `[data-branch-pet-filter="suwon"]` branch shortcut and assert active filter becomes `suwon`; change `#branch-select` to `suwon` and `songpa`; call `evaluate_script({"function":"() => ({branch:document.querySelector('[data-branch-contact-name]')?.textContent, actions:[...document.querySelectorAll('[data-branch-action]:not([hidden])')].map(a=>({kind:a.dataset.branchAction, href:a.href}))})"})`; resize to 390x1100, click `.mobile-menu-toggle`, assert menu open, click a mobile nav link, assert menu closed; save the action/evaluation log to `.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c002-interactions.json`.
    Expected: Each filter changes active state and visible cards; branch selector updates branch name/action URLs; mobile nav opens and closes; Naver/Instagram/Blog actions are reachable when the selected branch has URLs.
    Evidence: .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c002-interactions.json

  Scenario: C003 CLI regression matrix
    Tool:     bash
    Steps:    cd /Users/cosmos/Documents/pet/pet-clone-site && { node --test tests/site-structure.test.mjs; node --check app.js; node --check content.js; ! rg -n "BB PUPPY|비비퍼피|010-7699-0531|instagram_access_token|access_token|imweb\\.me|puppybebe\\.com|최저가|무조건|완벽 보장|100% 보장|당일 데려가세요|질병 없음 보장|병원급 관리 보장|5만원부터|10만원부터|최대 80% 할인" index.html styles.css app.js content.js tests/site-structure.test.mjs; node --input-type=module -e "import { existsSync, readFileSync } from 'node:fs'; import { join } from 'node:path'; const html=readFileSync('index.html','utf8'); const assets=[...html.matchAll(/(?:src|href)=\"(assets\\/healthdog\\/[^\"]+)\"/g)].map(m=>m[1].split(/[?#]/)[0]); for (const asset of assets) if(!existsSync(join(process.cwd(), asset))) throw new Error(asset); const naver=[...html.matchAll(/href=\"(https:\\/\\/map\\.naver\\.com\\/[^\"]+)\"/g)].length; if(naver<6) throw new Error('naver links '+naver); const review=html.slice(html.indexOf('id=\"reviews\"'), html.indexOf('id=\"trust\"')); const badReviewLinks=[...review.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>\\s*원문 보기/g)].map(m=>m[1]).filter(h=>!/^https?:\\/\\//.test(h)); if(badReviewLinks.length) throw new Error('bad review links '+badReviewLinks.join(','));"; } > ../.omo/evidence/task-11-healthdog-homepage-from-planning-doc-c003-cli.txt 2>&1
    Expected: Command exits 0 and evidence includes passing Node test output plus no forbidden scan matches.
    Evidence: .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c003-cli.txt
  ```

  Commit: YES | Message: `fix(homepage): pass healthdog browser and cli verification` | Files: [pet-clone-site/index.html, pet-clone-site/styles.css, pet-clone-site/app.js, pet-clone-site/content.js, pet-clone-site/tests/site-structure.test.mjs, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-desktop.png, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-mobile.png, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c001-layout.json, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c002-interactions.json, .omo/evidence/task-11-healthdog-homepage-from-planning-doc-c003-cli.txt]

## Final verification wave (MANDATORY - after all implementation tasks)
> Runs in PARALLEL. ALL must APPROVE. Surface results to the caller and wait for an explicit "okay" before declaring complete.
- [ ] F1. Plan compliance audit - every task done, every acceptance criterion met; verify by reading `.omo/evidence/task-*-healthdog-homepage-from-planning-doc.*` and checking `git diff --stat` is scoped to the plan files.
- [ ] F2. Code quality review - diagnostics clean, idioms match, no dead code; run `cd /Users/cosmos/Documents/pet/pet-clone-site && node --check app.js && node --check content.js && node --test tests/site-structure.test.mjs`.
- [ ] F3. Real manual QA - every QA scenario executed with evidence captured; inspect Chrome screenshots and C002 JSON rather than accepting CLI tests alone.
- [ ] F4. Scope fidelity - nothing extra shipped beyond Must-Have, nothing Must-NOT-Have introduced; verify no package files, backend files, extra product pages, runtime API calls, or external scripts were added.

## Commit strategy
- One logical change per commit. Conventional Commits (`<type>(<scope>): <subject>` body + footer).
- Atomic: every commit builds and passes tests on its own.
- No "WIP" / "fix typo squash later" commits on the final branch - clean up before merge.
- Preserve pre-existing dirty user changes; do not reset or overwrite them.
- Do not auto-commit unless the active executor has user authorization to commit; otherwise stage logical changes and present commit messages.
- Reference the plan file path in the final commit footer: `Plan: .omo/plans/healthdog-homepage-from-planning-doc.md`.

## Success criteria
- All Must-Have shipped; all QA scenarios pass with captured evidence; F1-F4 approved; commit history clean.
- C001 passes with desktop and mobile screenshots plus layout JSON evidence.
- C002 passes with browser action/evaluation logs for filters, branch selector, mobile nav, and branch-specific actions.
- C003 passes with Node tests, syntax checks, forbidden-copy scan, local asset verification, and six Naver map links.
