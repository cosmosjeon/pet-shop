# Health Dog Website Build

## TL;DR
> Summary:      Replace `pet-clone-site/` in place with a Health Dog static website that keeps the modern BB PUPPY-like rhythm while using Health Dog logo, real pet/review assets, six branch cards, representative phone CTA, and image-led Korean graphic modules.
> Deliverables:
> - Health Dog branded `pet-clone-site/index.html`, `styles.css`, `app.js`
> - Optimized local Health Dog logo, pet, review, and generated graphic assets under `pet-clone-site/assets/healthdog/`
> - Updated structure tests under `pet-clone-site/tests/site-structure.test.mjs`
> - Browser QA evidence for desktop, mobile, filter behavior, CTA links, and branch map links
> Effort:       Large
> Risk:         Medium - visual quality depends on asset selection, generated Korean text legibility, and branch link verification.

## Scope
### Must have
- Modify `pet-clone-site/` in place. Do not create a separate app unless the existing static surface becomes unusable.
- Replace all BB PUPPY identity with Health Dog identity.
- Use the official Health Dog logo source/preview from `client-research/healthdog-new-input/logo/`.
- Use real pet photos from `client-research/healthdog-new-input/pets/` for hero collage and available-pet cards.
- Use real review/proof photos from `client-research/healthdog-new-input/petreviews/` in the proof section.
- Build around this source of truth:
  - Company: `헬스독`
  - Main phone: `1600-4533`
  - Branches:
    - `창원헬스독`: `경남 창원시 의창구 서상동 676-1`
    - `부산헬스독`: `부산 부산진구 부암동 96-8`
    - `송파헬스독`: `서울 송파구 잠실동 188-12`
    - `수원헬스독`: `경기도 수원시 이의동 1266-5`
    - `평택헬스독`: display as `경기도 평택시 평택동 164-2`; source user text was `경기도 평택동 164-2`
    - `인천헬스독`: `인천 서구 당하동 1098-5`
- Keep the site static: plain HTML/CSS/JS, no new framework.
- Include sections in this order:
  1. Header with logo, nav, `1600-4533`
  2. Hero with Health Dog headline, real pet collage, phone CTA, branch CTA, trust strip
  3. Quick service icon/graphic grid
  4. Branch finder with six Naver Map/Place buttons
  5. Available pets grid with real photos and filter chips
  6. Generated Korean care promise poster
  7. Large promise banner with real circular photos and/or generated background
  8. Review proof wall using real `무료분양인증` photos
  9. Visit flow and footer
  10. Sticky CTA: desktop side rail and mobile bottom bar
- Generated Korean poster/banner images are allowed. Keep exact source copy and prompts next to generated assets.
- Visually verify generated Korean text at real desktop and mobile display sizes.
- Use Naver Map search fallback URLs if exact Place IDs are ambiguous.
- Keep pricing out of the site unless later confirmed by the user.
- Keep `무료분양인증` as review/proof emphasis, not hero headline.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not generate fake available-pet inventory, fake customer faces, fake reviews, or fake branch/store evidence.
- Do not recreate the Health Dog logo generatively. Use the official logo asset only.
- Do not use BB PUPPY, 비비퍼피, puppybebe, dogmaru, minipet, Imweb, or source-reference branding in runtime files.
- Do not expose mirrored reference-site secrets, tokens, original phone numbers, original map links, or original social links.
- Do not add ecommerce checkout/cart/price UX. The conversion goal is consultation, phone, branch visit, and map navigation.
- Do not use a one-note purple/blue gradient theme. Use Health Dog purple/navy as accents with warm white, beige, mint/teal, and restrained dark green.
- Do not place Korean copy only in images when the text is required for navigation, legal, contact, or accessibility.
- Do not declare complete from tests alone; the page must be driven in the browser.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + Node `node:test`. Update `pet-clone-site/tests/site-structure.test.mjs` after replacing structure.
- QA policy: every todo has agent-executed scenarios. Final completion requires automated tests plus browser screenshots/click checks.
- Evidence: `.omo/evidence/task-<N>-<slug>.<ext>`
- Metis note: external Metis subagent review was not run because the current session tool policy only permits subagents after an explicit subagent request. Use the local self-review checklist in Todo 11 and final verification wave instead.

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. < 3 per wave (except the final) = under-splitting.
Wave 1 (no deps): Todo 1 asset working set, Todo 2 brand/content data, Todo 3 generated graphic prompts.
Wave 2 (after 1): Todo 4 HTML rebuild, Todo 5 CSS visual system, Todo 6 JS interactions.
Wave 3 (after 2): Todo 7 tests, Todo 8 branch link verification, Todo 9 browser visual QA.
Wave 4 (after 3): Todo 10 polish/performance/accessibility, Todo 11 final self-review and commit.
Critical path: Todo 1 -> Todo 4 -> Todo 5 -> Todo 7 -> Todo 9 -> Todo 11.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | None | 4, 5, 7, 9 | 2, 3 |
| 2 | None | 4, 6, 7, 8 | 1, 3 |
| 3 | None | 4, 5, 9 | 1, 2 |
| 4 | 1, 2, 3 | 5, 6, 7, 9 | None |
| 5 | 1, 3, 4 | 7, 9, 10 | 6 |
| 6 | 2, 4 | 7, 8, 9 | 5 |
| 7 | 4, 5, 6 | 9, 11 | 8 |
| 8 | 2, 6 | 9, 11 | 7 |
| 9 | 4, 5, 6, 7, 8 | 10, 11 | None |
| 10 | 9 | 11 | None |
| 11 | 7, 8, 9, 10 | Final verification | None |

## Todos
> Implementation + Test = ONE todo. Never separate.
- [x] 1. Normalize Health Dog asset working set
  What to do / Must NOT do
  - Create `pet-clone-site/assets/healthdog/` with subfolders `logo/`, `pets/`, `reviews/`, `generated/`, and `prompts/`.
  - Copy official logo preview from `client-research/healthdog-new-input/logo/healthdog-logo-preview.png` to `pet-clone-site/assets/healthdog/logo/healthdog-logo.png`.
  - Copy or convert 12-18 real pet photos from `client-research/healthdog-new-input/pets/` into optimized web files under `pet-clone-site/assets/healthdog/pets/`.
  - Copy or convert 8-12 review/proof photos from `client-research/healthdog-new-input/petreviews/` into optimized web files under `pet-clone-site/assets/healthdog/reviews/`.
  - Preserve visual variety: white fluffy, brown poodle, black/tan, close-up, indoor, outdoor, hand/desk context.
  - Must NOT move/delete original research assets.
  - Must NOT include `.DS_Store`, logs, or unused giant source folders inside `pet-clone-site/assets/healthdog/`.
  Parallelization: Can parallel Y | Wave 1 | Blocks 4, 5, 7, 9
  References (executor has NO interview context - be exhaustive):
  - `client-research/healthdog-new-input/updated-build-plan.md:15`
  - `client-research/healthdog-new-input/updated-build-plan.md:21`
  - `client-research/healthdog-new-input/updated-build-plan.md:24`
  - `client-research/healthdog-new-input/image-asset-strategy.md:7`
  - `client-research/healthdog-new-input/image-asset-strategy.md:61`
  - `client-research/healthdog-new-input/pets-board.jpg`
  - `client-research/healthdog-new-input/reviews-board.jpg`
  Acceptance criteria (agent-executable):
  - `test -f pet-clone-site/assets/healthdog/logo/healthdog-logo.png`
  - `find pet-clone-site/assets/healthdog/pets -type f | wc -l | awk '$1 >= 12 {exit 0} {exit 1}'`
  - `find pet-clone-site/assets/healthdog/reviews -type f | wc -l | awk '$1 >= 8 {exit 0} {exit 1}'`
  - `find pet-clone-site/assets/healthdog -type f -size +5M -print | wc -l | awk '$1 == 0 {exit 0} {exit 1}'`
  QA scenarios (name the exact tool + invocation):
  - Shell evidence: `find pet-clone-site/assets/healthdog -maxdepth 3 -type f | sort > .omo/evidence/task-1-assets-list.txt`
  - Image evidence: create a contact sheet of selected pet/review/logo assets at `.omo/evidence/task-1-asset-board.jpg` with ImageMagick `montage` or equivalent.
  Commit: Y | `chore(assets): prepare healthdog asset set` | Files under `pet-clone-site/assets/healthdog/`

- [x] 2. Create authoritative Health Dog content/data contract
  What to do / Must NOT do
  - Add `pet-clone-site/content.js` or a small data section in `app.js` for branches, filters, CTAs, and labels. Prefer `content.js` if data grows beyond branch/filter arrays.
  - Include exact branch names, display addresses, Naver fallback URLs, and phone `1600-4533`.
  - Use fallback Naver Map URLs from `updated-build-plan.md` unless verified direct Place URLs are found.
  - Normalize 평택 display address to `경기도 평택시 평택동 164-2`; keep no hidden ambiguity in UI.
  - Write branch data once and render/derive repeated UI from it where feasible.
  - Must NOT leave original BB PUPPY phone `010-7699-0531`.
  Parallelization: Can parallel Y | Wave 1 | Blocks 4, 6, 7, 8
  References:
  - `client-research/healthdog-new-input/updated-build-plan.md:3`
  - `client-research/healthdog-new-input/updated-build-plan.md:5`
  - `client-research/healthdog-new-input/updated-build-plan.md:7`
  - `client-research/healthdog-new-input/updated-build-plan.md:110`
  - `client-research/healthdog-new-input/updated-build-plan.md:120`
  - `client-research/healthdog-new-input/updated-build-plan.md:156`
  - `pet-clone-site/index.html:25`
  - `pet-clone-site/index.html:260`
  Acceptance criteria:
  - `rg "1600-4533|헬스독|창원헬스독|부산헬스독|송파헬스독|수원헬스독|평택헬스독|인천헬스독" pet-clone-site`
  - `sh -c 'if rg "010-7699-0531|BB PUPPY|비비퍼피|bbpuppy|puppybebe" pet-clone-site/index.html pet-clone-site/app.js pet-clone-site/styles.css pet-clone-site/tests/site-structure.test.mjs; then exit 1; fi'`
  - `rg "map.naver.com/p/search" pet-clone-site`
  QA scenarios:
  - Shell evidence: `rg -n "1600-4533|map.naver.com|헬스독|BB PUPPY|010-7699-0531" pet-clone-site > .omo/evidence/task-2-content-scan.txt`
  Commit: Y | `feat(content): define healthdog branch and cta data` | `pet-clone-site/app.js`, optional `pet-clone-site/content.js`, tests

- [x] 3. Generate and source-track Korean graphic modules
  What to do / Must NOT do
  - Generate or compose these priority graphics:
    - `service-guide-grid`: 2x2 or 3x2 icon-guide graphic with Korean labels for 헬스독 소개, 분양 상담, 건강 케어, 지점 위치, 실제 후기, 빠른 상담.
    - `care-promise-poster`: poster-style image titled `헬스독 평생 케어 약속`.
    - `promise-banner`: wide three-column Health Dog promise banner with real circular photos or generated dark emerald/navy texture.
  - Store generated outputs under `pet-clone-site/assets/healthdog/generated/`.
  - Store source copy and prompts under `pet-clone-site/assets/healthdog/prompts/`.
  - Generated Korean text is allowed, but must be visually inspected at real desktop/mobile display sizes.
  - Use exact safe copy:
    - `헬스독 평생 케어 약속`
    - `분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.`
    - `건강 체크 안내`
    - `초보 보호자 케어`
    - `사후 상담`
    - `지점 방문 상담`
    - `처음부터 건강하게`
    - `실제 후기와 투명한 상담`
    - `가까운 6개 지점`
  - Must NOT include unconfirmed medical discount, surgery, 24-hour pickup, or guaranteed treatment claims.
  - Must NOT put generated people/customer faces in proof imagery.
  Parallelization: Can parallel Y | Wave 1 | Blocks 4, 5, 9
  References:
  - `client-research/healthdog-new-input/image-asset-strategy.md:75`
  - `client-research/healthdog-new-input/image-asset-strategy.md:83`
  - `client-research/healthdog-new-input/image-asset-strategy.md:91`
  - `client-research/healthdog-new-input/image-asset-strategy.md:123`
  - `client-research/healthdog-new-input/image-asset-strategy.md:159`
  - `client-research/healthdog-new-input/image-asset-strategy.md:154`
  Acceptance criteria:
  - `test -f pet-clone-site/assets/healthdog/prompts/service-guide-grid.md`
  - `test -f pet-clone-site/assets/healthdog/prompts/care-promise-poster.md`
  - `test -f pet-clone-site/assets/healthdog/prompts/promise-banner.md`
  - `find pet-clone-site/assets/healthdog/generated -type f | wc -l | awk '$1 >= 3 {exit 0} {exit 1}'`
  - Visual text inspection notes exist at `.omo/evidence/task-3-generated-korean-review.md`.
  QA scenarios:
  - Browser/image evidence: place generated images in a temporary local preview page or final page, screenshot desktop and mobile crop to `.omo/evidence/task-3-generated-desktop.png` and `.omo/evidence/task-3-generated-mobile.png`.
  - Manual visual assertion by agent: write pass/fail notes for Korean text legibility to `.omo/evidence/task-3-generated-korean-review.md`.
  Commit: Y | `feat(assets): add generated healthdog graphic modules` | `pet-clone-site/assets/healthdog/generated/`, `pet-clone-site/assets/healthdog/prompts/`

- [x] 4. Rebuild `index.html` as the Health Dog page
  What to do / Must NOT do
  - Replace the current BB PUPPY DOM with Health Dog sections while preserving useful static structure.
  - Use the exact hero:
    - H1: `건강하게 자란 반려가족을 만나는 곳, 헬스독`
    - Supporting copy: `전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.`
  - Header nav labels: `분양중 아이들`, `헬스독 케어`, `후기`, `지점안내`, `상담문의`.
  - Primary CTA: `전화 상담 1600-4533` with `tel:1600-4533`.
  - Secondary CTA: `가까운 지점 찾기` to `#branches`.
  - Add trust strip: `대표번호 1600-4533`, `전국 6개 지점`, `실제 보호자 후기`, `네이버 플레이스 연결`.
  - Add branch finder section with id `branches`.
  - Add available pets section with id `puppies` and at least 12 real pet cards.
  - Add care section with id `care` using generated poster and/or service guide graphic.
  - Add review proof section with id `reviews` and real review images.
  - Add contact/footer section with id `contact`.
  - Must NOT leave any runtime BB PUPPY copy.
  Parallelization: Can parallel N | Wave 2 | Blocks 5, 6, 7, 9
  References:
  - `pet-clone-site/index.html:1`
  - `pet-clone-site/index.html:12`
  - `pet-clone-site/index.html:46`
  - `pet-clone-site/index.html:63`
  - `pet-clone-site/index.html:197`
  - `pet-clone-site/index.html:226`
  - `pet-clone-site/index.html:250`
  - `client-research/healthdog-new-input/updated-build-plan.md:43`
  - `client-research/healthdog-new-input/updated-build-plan.md:59`
  - `client-research/healthdog-new-input/image-asset-strategy.md:238`
  Acceptance criteria:
  - `rg -n "건강하게 자란 반려가족을 만나는 곳, 헬스독|전국 6개 지점|1600-4533|id=\"branches\"|id=\"care\"|id=\"reviews\"" pet-clone-site/index.html`
  - `sh -c 'if rg "BB PUPPY|비비퍼피|010-7699-0531" pet-clone-site/index.html; then exit 1; fi'`
  - `node --test pet-clone-site/tests/site-structure.test.mjs` passes after Todo 7 updates.
  QA scenarios:
  - Browser evidence: run `python3 -m http.server 8790 --directory pet-clone-site`, navigate in in-app browser to `http://127.0.0.1:8790/index.html`, save full-page screenshot `.omo/evidence/task-4-html-desktop.png`.
  Commit: Y | `feat(site): rebuild healthdog page structure` | `pet-clone-site/index.html`

- [x] 5. Rework CSS visual system and responsive layout
  What to do / Must NOT do
  - Update `styles.css` to Health Dog tokens:
    - `--ink`: deep charcoal/navy
    - `--health-purple`: from logo
    - `--health-navy`: from logo
    - `--mint`: mint/teal accent for graphic modules
    - `--warm`: warm off-white/beige base
  - Preserve a `max-width: 1280px` design rhythm.
  - Build polished desktop layouts:
    - sticky header
    - hero with asymmetric real photo collage
    - service graphic block
    - 3x2 branch grid
    - 3 or 4 column pet grid
    - proof/review wall
    - desktop side CTA
  - Build mobile layouts:
    - compact header/menu
    - hero does not overflow
    - branch cards stack or horizontal-scroll cleanly
    - pet cards remain stable
    - bottom CTA fixed without covering footer content
  - Ensure generated Korean poster/banner images are sharp and not over-cropped.
  - Must NOT use negative letter spacing or viewport-scaled font sizes.
  - Must NOT make cards inside cards or decorative gradient orbs.
  Parallelization: Can parallel Y | Wave 2 | Blocks 7, 9, 10
  References:
  - `pet-clone-site/styles.css:1`
  - `pet-clone-site/styles.css:58`
  - `pet-clone-site/styles.css:65`
  - `pet-clone-site/styles.css:159`
  - `pet-clone-site/styles.css:164`
  - `client-research/healthdog-new-input/image-asset-strategy.md:16`
  - `client-research/healthdog-new-input/image-asset-strategy.md:75`
  - `client-research/healthdog-new-input/image-asset-strategy.md:123`
  Acceptance criteria:
  - `rg -n -- "--health-purple|--health-navy|--mint|--warm|#363636|1280px|@media" pet-clone-site/styles.css`
  - `sh -c 'if rg "letter-spacing:\\s*-" pet-clone-site/styles.css; then exit 1; fi'`
  - Browser screenshot at 1440x1400 and 390x844 shows no overlapping major text or CTA.
  QA scenarios:
  - Browser evidence: desktop screenshot `.omo/evidence/task-5-desktop.png`; mobile screenshot `.omo/evidence/task-5-mobile.png`.
  - Shell evidence: `rg -n "letter-spacing|font-size|@media|position: fixed" pet-clone-site/styles.css > .omo/evidence/task-5-css-scan.txt`.
  Commit: Y | `style(site): apply healthdog visual system` | `pet-clone-site/styles.css`

- [x] 6. Update JavaScript interactions for Health Dog filters, menu, and CTAs
  What to do / Must NOT do
  - Keep or refactor existing mobile menu and category filtering in `app.js`.
  - Support filter chips: `전체`, `말티푸`, `포메라니안`, `푸들`, `비숑`, `소형견`, `중대형견`.
  - Ensure filter empty state remains accessible and accurate.
  - Add robust behavior for branch/contact buttons only if needed; native anchor links are preferred.
  - Add defensive null checks for optional elements so deleted/reworked DOM does not cause runtime errors.
  - Must NOT rely on external scripts or remote APIs.
  Parallelization: Can parallel Y | Wave 2 | Blocks 7, 8, 9
  References:
  - `pet-clone-site/app.js:1`
  - `pet-clone-site/app.js:7`
  - `pet-clone-site/app.js:32`
  - `pet-clone-site/app.js:40`
  - `pet-clone-site/tests/site-structure.test.mjs:55`
  - `client-research/healthdog-new-input/updated-build-plan.md:78`
  Acceptance criteria:
  - `node --test pet-clone-site/tests/site-structure.test.mjs` passes after tests are updated.
  - `node --check pet-clone-site/app.js`
  - Source review evidence confirms every `addEventListener` target is either guaranteed by `index.html` or protected by a null guard.
  - Browser click test: all filter buttons show/hide cards and empty state only appears for empty filters if any.
  QA scenarios:
  - Browser evidence: click each filter in in-app browser, screenshot active `포메라니안` or equivalent to `.omo/evidence/task-6-filter.png`.
  - Console evidence: list browser console messages after interaction; save no-error result to `.omo/evidence/task-6-console.txt`.
  Commit: Y | `feat(site): wire healthdog interactions` | `pet-clone-site/app.js`, optional `pet-clone-site/content.js`, tests

- [x] 7. Replace structure tests with Health Dog assertions
  What to do / Must NOT do
  - Update `pet-clone-site/tests/site-structure.test.mjs` from BB PUPPY assertions to Health Dog assertions.
  - Tests must assert:
    - Health Dog title/brand present
    - `1600-4533` present and old `010-7699-0531` absent
    - six branch names present
    - `id="branches"`, `id="care"`, `id="puppies"`, `id="reviews"`, `id="contact"` present
    - at least 12 puppy cards
    - review proof images exist
    - generated assets referenced by HTML exist
    - forbidden strings absent: `BB PUPPY`, `비비퍼피`, `bbpuppy`, `puppybebe.com`, `instagram_access_token`, `access_token`, `imweb.me`
  - Keep local asset existence validation.
  - Must NOT weaken sensitive-string checks.
  Parallelization: Can parallel Y | Wave 3 | Blocks 9, 11
  References:
  - `pet-clone-site/tests/site-structure.test.mjs:26`
  - `pet-clone-site/tests/site-structure.test.mjs:55`
  - `pet-clone-site/tests/site-structure.test.mjs:78`
  - `client-research/healthdog-new-input/updated-build-plan.md:59`
  - `client-research/healthdog-new-input/updated-build-plan.md:127`
  Acceptance criteria:
  - `node --test pet-clone-site/tests/site-structure.test.mjs`
  - `rg -n "헬스독|1600-4533|창원헬스독|부산헬스독|송파헬스독|수원헬스독|평택헬스독|인천헬스독|BB PUPPY" pet-clone-site/tests/site-structure.test.mjs`
  QA scenarios:
  - Shell evidence: `node --test pet-clone-site/tests/site-structure.test.mjs > .omo/evidence/task-7-node-test.txt`.
  Commit: Y | `test(site): assert healthdog structure` | `pet-clone-site/tests/site-structure.test.mjs`

- [x] 8. Verify and wire branch map links
  What to do / Must NOT do
  - Attempt to verify direct Naver Place links for all six branches using browser or web lookup.
  - If exact direct Place ID is ambiguous, use the fallback Naver Map search URL from `updated-build-plan.md`.
  - In `index.html`, every branch card must include:
    - branch name
    - address
    - visible Naver button text such as `네이버 플레이스 보기`
    - `target="_blank"` and `rel="noopener"` for external map links
  - Record final links in a small comment-free data block or `content.js`, not duplicated manually across multiple sections.
  - Must NOT use fake generated map screenshots.
  Parallelization: Can parallel Y | Wave 3 | Blocks 9, 11
  References:
  - `client-research/healthdog-new-input/updated-build-plan.md:110`
  - `client-research/healthdog-new-input/updated-build-plan.md:120`
  - `client-research/healthdog-new-input/image-asset-strategy.md:261`
  Acceptance criteria:
  - `rg -n "창원헬스독|부산헬스독|송파헬스독|수원헬스독|평택헬스독|인천헬스독|네이버 플레이스|map.naver.com" pet-clone-site`
  - Browser click test confirms every branch link opens a Naver map/search/place page.
  QA scenarios:
  - Browser evidence: click each branch link from local page and record opened URL list to `.omo/evidence/task-8-branch-link-check.md`.
  - Shell evidence: `rg -n "map.naver.com" pet-clone-site > .omo/evidence/task-8-map-links.txt`.
  Commit: Y | `feat(site): add healthdog branch map links` | `pet-clone-site/index.html`, `pet-clone-site/app.js` or `content.js`, tests

- [ ] 9. Run browser visual QA across desktop and mobile
  What to do / Must NOT do
  - Start local static server: `python3 -m http.server 8790 --directory pet-clone-site`.
  - Open `http://127.0.0.1:8790/index.html` in the in-app browser.
  - Capture and inspect:
    - desktop 1440x1400 full-page
    - mobile 390x844 full-page
    - filter interaction state
    - branch section and CTA area
    - generated Korean poster/banner close crop
  - Verify no major overlap, clipped Korean, broken image, blank generated asset, invisible CTA, or inaccessible mobile nav.
  - Verify first viewport gives strong Health Dog signal.
  - Must NOT mark QA complete if the browser was not actually driven.
  Parallelization: Can parallel N | Wave 3 | Blocks 10, 11
  References:
  - `pet-clone-site/index.html:45`
  - `pet-clone-site/styles.css:159`
  - `pet-clone-site/app.js:40`
  - `client-research/healthdog-new-input/image-asset-strategy.md:83`
  - `client-research/healthdog-new-input/image-asset-strategy.md:179`
  Acceptance criteria:
  - Evidence screenshots exist:
    - `.omo/evidence/task-9-desktop-fullpage.png`
    - `.omo/evidence/task-9-mobile-fullpage.png`
    - `.omo/evidence/task-9-filter-state.png`
    - `.omo/evidence/task-9-generated-korean-crop.png`
  - QA notes exist at `.omo/evidence/task-9-visual-qa.md`.
  QA scenarios:
  - In-app browser: navigate, resize desktop/mobile, screenshot, click filters, click mobile nav, click sticky CTAs, click branch map links.
  Commit: N | Verification only | Evidence files

- [ ] 10. Polish performance, accessibility, and local hygiene
  What to do / Must NOT do
  - Add meaningful `alt` text for logo, pet photos, review photos, generated poster/banner.
  - Ensure phone CTAs use `tel:1600-4533`.
  - Ensure external links use `rel="noopener"`.
  - Compress any local image over 1.5MB unless preserving it is explicitly needed.
  - Ensure mobile sticky CTA does not cover footer content.
  - Ensure generated poster/banner has nearby accessible text summary if the full Korean message is baked into the image.
  - Run `git status --short`, `find pet-clone-site -type f -size +5M -print`, and sensitive-string scan.
  - Must NOT delete reference folders or user-provided source assets.
  Parallelization: Can parallel N | Wave 4 | Blocks 11
  References:
  - `pet-clone-site/index.html:1`
  - `pet-clone-site/tests/site-structure.test.mjs:16`
  - `client-research/healthdog-new-input/image-asset-strategy.md:83`
  - `client-research/healthdog-new-input/image-asset-strategy.md:143`
  Acceptance criteria:
  - `node --test pet-clone-site/tests/site-structure.test.mjs`
  - `sh -c 'if rg "BB PUPPY|비비퍼피|010-7699-0531|instagram_access_token|access_token|imweb.me|puppybebe.com" pet-clone-site; then exit 1; fi'`
  - `find pet-clone-site -type f -size +5M -print | wc -l | awk '$1 == 0 {exit 0} {exit 1}'`
  QA scenarios:
  - Shell evidence: save command outputs to `.omo/evidence/task-10-polish-checks.txt`.
  - Browser evidence: mobile footer/sticky CTA screenshot `.omo/evidence/task-10-mobile-footer.png`.
  Commit: Y | `fix(site): polish healthdog qa details` | Any touched `pet-clone-site/` files

- [ ] 11. Final self-review, repository state, and push
  What to do / Must NOT do
  - Review the full diff against `origin/main`.
  - Confirm all commits are atomic enough and messages describe actual work.
  - Run final commands:
    - `node --test pet-clone-site/tests/site-structure.test.mjs`
    - `git status --short --branch`
    - `git diff --stat origin/main...HEAD`
    - `rg -n "BB PUPPY|비비퍼피|010-7699-0531|instagram_access_token|access_token|imweb.me|puppybebe.com" pet-clone-site || true`
  - Push the branch to `origin/main` only if user asked to push during execution, or create a branch/PR if that is the chosen execution mode then.
  - Surface `git diff --cached --check` only if files are staged. If it flags mirrored reference files outside the touched work scope, report rather than rewrite them.
  Parallelization: Can parallel N | Wave 4 | Blocks final verification
  References:
  - `pet-clone-site/tests/site-structure.test.mjs:78`
  - `.omo/drafts/healthdog-website-plan-gate.md`
  - `client-research/healthdog-new-input/image-asset-strategy.md`
  Acceptance criteria:
  - Final test passes.
  - Working tree state is explicitly reported.
  - Final pushed commit hash or branch is reported if push happens.
  QA scenarios:
  - Shell evidence: `.omo/evidence/task-11-final-commands.txt`.
  - Browser evidence from Todo 9 is linked in final report.
  Commit: Y | `chore(site): finalize healthdog build evidence` | `.omo/evidence/`, any final touched files

## Final verification wave
After ALL todos.
> Runs in parallel where tooling allows. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
  - Verify each Must Have is visible in runtime or data files.
  - Command evidence: `rg -n "헬스독|1600-4533|창원헬스독|부산헬스독|송파헬스독|수원헬스독|평택헬스독|인천헬스독|무료분양인증" pet-clone-site`
- [ ] F2. Code quality review
  - Inspect `index.html`, `styles.css`, `app.js`, and tests for stale names, brittle selectors, missing null guards, and huge assets.
  - Command evidence: `node --test pet-clone-site/tests/site-structure.test.mjs`
- [ ] F3. Real manual QA
  - Drive the local site through the in-app browser on desktop and mobile.
  - Required evidence: desktop/mobile screenshots, filter interaction, generated Korean crop, branch link URLs.
- [ ] F4. Scope fidelity
  - Confirm no ecommerce checkout, fake pricing, fake generated inventory, or unconfirmed medical claims were introduced.
  - Command evidence: `rg -n "가격|무료|수술|할인|보장|장바구니|결제|checkout|cart" pet-clone-site`

## Commit strategy
- Prefer small commits by task:
  1. assets
  2. content/data
  3. generated graphic modules
  4. HTML structure
  5. CSS visual system
  6. JS interactions
  7. tests
  8. QA/polish
- If execution happens in one sitting and the user wants a simple push, a single final commit is acceptable only if intermediate commits would slow delivery. Still report touched files and verification clearly.
- Never commit `.DS_Store`, logs, `node_modules`, or nested `.git` directories.
- The current repository is already initialized and pushed to `https://github.com/cosmosjeon/pet-shop.git` on `main`.

## Success criteria
- Local page at `http://127.0.0.1:8790/index.html` clearly reads as a Health Dog website in the first viewport.
- All runtime BB PUPPY/비비퍼피 identity is gone from `pet-clone-site/`.
- Header, hero, branch finder, available pets, care promise, generated graphic modules, review proof, visit flow, footer, and sticky CTA are present.
- Six branch cards have Naver Map/Place links and `1600-4533` is the only phone CTA.
- Real Health Dog pet/review assets are used for proof and inventory-like sections.
- Generated Korean poster/banner assets are legible at desktop and mobile sizes and source prompts/copy are stored.
- `node --test pet-clone-site/tests/site-structure.test.mjs` passes.
- Browser QA evidence exists and shows no major layout overlap, broken images, blank generated graphics, clipped Korean, or unusable mobile sticky CTA.
- Final response reports what changed, tests/QA evidence, any known residual risk, and final git state.
