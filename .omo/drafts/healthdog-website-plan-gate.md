# Health Dog Website Plan Gate

## User Question

사용자 질문: "어, 그러면 이제 다 한 건가? 계획 다 세운 건가?"

## ulw-plan Status

Answer:

- Direction planning is effectively complete.
- The final execution plan file under `.omo/plans/` has not been written yet because `omo:ulw-plan` requires an explicit approval gate before final plan generation.
- No product code should be edited in this planning turn.

## Skill Survey

- `omo:ulw-plan`: Required because the user invoked it and the work is a multi-step website redesign/build plan with external assets and branch/location requirements.
- `product-design:get-context`: Already satisfied in spirit through prior design-brief grounding; the user provided product, visual sources, and desired interactivity context.
- Browser/Chrome inspection: Already used earlier to inspect public references and brand channels.
- Sparkshell: Used for read-only repo/file inspection per project instruction.

## Tier

HEAVY.

Justification: The eventual build has 5+ steps, multiple asset sources, external branch links, visual design decisions, and user explicitly asked for planning. This turn remains planner-only.

## Evidence Grounding

- Prior planning note: `/Users/cosmos/Documents/pet/client-research/healthdog-suwon/planning-notes.md`
- Updated build plan draft: `/Users/cosmos/Documents/pet/client-research/healthdog-new-input/updated-build-plan.md`
- Logo preview: `/Users/cosmos/Documents/pet/client-research/healthdog-new-input/logo/healthdog-logo-preview.png`
- Pet image board: `/Users/cosmos/Documents/pet/client-research/healthdog-new-input/pets-board.jpg`
- Review image board: `/Users/cosmos/Documents/pet/client-research/healthdog-new-input/reviews-board.jpg`
- Source assets extracted under: `/Users/cosmos/Documents/pet/client-research/healthdog-new-input/`
- Existing prototype/source target from prior work: `/Users/cosmos/Documents/pet/pet-clone-site`

## Locked Decisions

- Company: 헬스독.
- Brand shape: 전국 6개 지점을 가진 안심 반려가족 분양 브랜드.
- No representative branch; all 6 branches are shown evenly.
- Main phone CTA: `1600-4533`.
- First-view emphasis: logo, real pet photos, 6-branch trust, phone CTA, branch finder CTA.
- `무료분양인증` photos: use strongly in the review/proof section, not as the first hero message.
- Pricing: do not expose unconfirmed average price. Use 상담 안내 copy instead.
- Customer/review photos: use as review proof, not as hero imagery.
- Naver Place: verify direct Place IDs first; fallback to Naver Map search URLs when ambiguous.

## Remaining Ambiguities

No blocking product/design ambiguity remains for the plan.

Recorded implementation assumptions:

- Normalize `경기도 평택동 164-2` to `경기도 평택시 평택동 164-2` during implementation unless evidence shows otherwise.
- Treat provided review photos as client-provided homepage assets; place them in a review/proof section with a respectful layout.

## Approval Brief

Approach to plan:

Build a decision-complete execution plan for replacing the current BB PUPPY-style prototype with a Health Dog site using the provided logo, pet photos, review photos, six-branch cards, representative phone number, and Naver Place/search links. The plan will include asset normalization, layout/content replacement, branch link verification, desktop/mobile QA, and final visual/browser evidence.

Question for user:

May I now write the final `.omo/plans/healthdog-website-build.md` execution plan from this approach?

## 2026-06-12 Planning Continuation

User resumed planning after pushing the repository to `cosmosjeon/pet-shop`.

Additional confirmed/contextual facts:

- Current repository root is pushed to `origin/main`.
- Current implementation surface is `pet-clone-site/`, a static HTML/CSS/JS site with a Node test file.
- Existing prototype still carries BB PUPPY identity and should be replaced with Health Dog identity.
- `pet-clone-site/tests/site-structure.test.mjs` is the existing cheap automated verification surface.
- User corrected the image strategy: modern generative image tools can produce Korean text well enough, so generated poster/banner graphics may include Korean text.
- Updated image strategy allows full generated Korean poster/banner images, with visual review for typos, spacing, broken glyphs, and hierarchy.

Recommended execution defaults for the final plan:

- Implementation target: replace `pet-clone-site/` in place rather than create a new app folder.
- Build type: keep static HTML/CSS/JS for speed and easy browser QA.
- Visual direction: BB PUPPY-like modern pet-shop rhythm, but with Health Dog logo, actual client pet/review assets, six-branch trust, and image-led infographic modules.
- Asset strategy: use real pet/review/logo assets for proof, plus generated Korean graphic modules for service grid, care promise poster, and promise banner.
- Test strategy recommendation: tests-after plus mandatory browser visual QA. Update `site-structure.test.mjs` after the page structure is replaced, then drive the local page in the in-app browser across desktop/mobile.

Remaining approval questions before final plan generation:

1. Should the final plan modify `pet-clone-site/` in place?
   - Recommended: yes, because it already has the static site structure and tests.
   - Alternative: create a new `healthdog-site/` folder and leave `pet-clone-site/` as historical prototype.

2. Should the plan include Korean text baked into generated poster/banner images?
   - Recommended: yes, for the icon guide, promise poster, and large promise banner.
   - Guardrail: keep source copy/prompts and visually verify generated Korean at real display size.

3. Test strategy:
   - Recommended: tests-after plus browser visual QA.
   - Alternative: TDD first for structure tests, then visual QA.
   - Not recommended: no automated tests, browser QA only.
