# Todo 9 Visual QA

Date: 2026-06-13
Status: recaptured after verifier REVISE and CSS crop fix

## Browser Surface

- Server: `python3 -m http.server 8790 --directory pet-clone-site`
- URL: `http://127.0.0.1:8790/index.html`
- Browser tooling: Chrome DevTools against the local page, with desktop `1440x1400x1` and mobile emulation `390x844x2,mobile,touch`.

## REVISE Resolution

- Previous visual QA found the mobile generated-poster evidence insufficient because the care poster was cropped at the top.
- Product fix applied in `pet-clone-site/styles.css`: `.promise-grid img` now uses `height: auto`, `aspect-ratio: 3 / 4`, and `object-fit: contain`.
- Updated element screenshot `.omo/evidence/task-9-generated-korean-crop.png` captures the full care poster; headline `헬스독 평생 케어 약속` is visible and not clipped.

## Required Screenshots

| Artifact | Dimensions | Notes |
| --- | ---: | --- |
| `.omo/evidence/task-9-desktop-fullpage.png` | 1440 x 7159 | Desktop full-page capture after CSS fix. |
| `.omo/evidence/task-9-mobile-fullpage.png` | 780 x 27516 | Mobile full-page capture at 390 x 844 DPR 2 after CSS fix. |
| `.omo/evidence/task-9-filter-state.png` | 780 x 1688 | Mobile `포메라니안` filter state after clicking `button[data-filter="pomeranian"]`; menu closed. |
| `.omo/evidence/task-9-generated-korean-crop.png` | 712 x 950 | Element screenshot of generated Korean care poster; full poster visible. |
| `.omo/evidence/task-9-branch-cta.png` | 780 x 1688 | Supplemental branch/CTA viewport capture; menu closed. |
| `.omo/evidence/task-9-browser-metrics.json` | JSON | DOM metrics for overflow, image natural sizes, filter state, branch links, and CTA links. |
| `.omo/evidence/task-9-image-diff.json` | JSON | Self-baseline screenshot integrity check for the generated poster crop; used only to confirm dimensions/alpha, not as visual acceptance by itself. |

## DOM Checks

- First viewport signal: `건강하게 자란 반려가족을 만나는 곳, 헬스독`
- Phone signal: `1600-4533` present.
- Branch signal: `전국 6개 지점` present.
- Broken images: `0 / 25`.
- Desktop horizontal overflow: `false`.
- Mobile horizontal overflow at 390 x 844: `false`.
- Mobile menu: closed in final target captures, `#mobile-nav.hidden=true`, `aria-expanded="false"`, `body.nav-open=false`.
- Mobile sticky CTA: visible at viewport bottom with `TEL`, `REV`, `MAP`, `ASK` links.
- Filter state: active `포메라니안`, total cards `12`, visible `2`, hidden `10`, visible categories `all small pomeranian`, `all medium pomeranian`.
- Branch links: six `네이버 플레이스 보기` links present with `target="_blank"` and `rel="noopener"`.
- Generated graphics: three generated SVGs loaded with natural sizes:
  - `service-guide-grid.svg` natural `1200 x 820`
  - `care-promise-poster.svg` natural `900 x 1200`, rendered mobile `356 x 474.66`, `object-fit: contain`, `aspect-ratio: 3 / 4`
  - `promise-banner.svg` natural `1600 x 620`, rendered mobile `356 x 260`
- Console messages: none found.

## Visual Pass Notes

- No broken image placeholders were detected by DOM natural-size checks.
- No document-level horizontal overflow was detected on desktop or mobile.
- Desktop first viewport clearly presents the Health Dog brand, phone, pet imagery, and branch trust signal.
- Mobile first viewport wraps the Korean H1 across multiple lines without clipping or single-character orphaning in the measured viewport.
- Generated Korean poster and banner assets are nonblank and rendered at stable dimensions in mobile view.
- The care poster is no longer top-cropped; the full poster headline, support copy, four service rows, and footer pill are visible in the element screenshot.
- Branch section and bottom CTA were inspected in mobile viewport; CTA links are visible and do not cover the active branch controls in the captured branch area.
- Filter state screenshot shows the menu closed, `포메라니안` highlighted, and matching cards beginning below the filter stack.
- Independent design-system/function pass: `VERDICT: PASS`, high confidence; no blocking findings.
- Independent focused CJK/pixel pass: `VERDICT: PASS`, high confidence; prior poster crop and mobile-menu obstruction blockers resolved.

## Cleanup

- Browser mobile emulation was limited to the DevTools QA session; final evidence is file-backed under `.omo/evidence/`.
- Local server cleanup receipt: `lsof -nP -iTCP:8790 -sTCP:LISTEN` returned no listener after capture/review.
- Subagent cleanup receipt: focused CJK verifier `019ec180-a20c-73d0-bdc9-8e0f028000a5` closed after PASS.
