# ULW Analysis Notepad

Objective: Analyze almost all source code under `/Users/cosmos/Documents/pet` as a first step toward recreating pages with a near-identical design feel.

Skills used:
- `omo:ulw-loop`: requested by the user via `ulw`; used for evidence-bound decomposition and durable notes.
- `browser:control-in-app-browser`: relevant if a local static page surface can be served and visually inspected.
- `omo:frontend-ui-ux`: relevant for extracting visual system, spacing, motion, and interaction patterns from source and screenshots.

Scope notes:
- No `AGENTS.md` was found in `/`, `/Users`, `/Users/cosmos`, `/Users/cosmos/Documents`, or `/Users/cosmos/Documents/pet`.
- `omo ulw-loop help` failed because `omo` is not on PATH in this shell, so this notepad is used as local fallback evidence.
- The workspace currently contains untracked static-site captures: `pet-ss/` and `pet-ss2/`, plus `.DS_Store`.

Success criteria:
- SC1 repository inventory: classify source roots, page counts, asset counts, first-party vs vendor code. Evidence: `.omo/ulw-loop/evidence/repo-inventory.txt`.
- SC2 design/source extraction: read representative first-party HTML/CSS/JS and summarize layout, colors, typography, nav, cards, mobile behavior, and dynamic page patterns. Evidence: final report plus command evidence.
- SC3 runnable-surface proof: serve the static captures locally if feasible and capture HTTP/screenshot evidence for desktop and mobile representative pages. Evidence: `.omo/ulw-loop/evidence/http-*.txt` and `.omo/ulw-loop/evidence/*.png`.

TDD note:
- This is a read-only analysis task with no production-code change requested. The RED-GREEN test requirement is not applicable unless source code is modified.
