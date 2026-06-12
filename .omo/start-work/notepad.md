# Health Dog Start-Work Notepad

## Bootstrap
- Session: `codex:019eb65e-5875-75f0-8855-403d984a4410`
- Plan: `.omo/plans/healthdog-website-build.md`
- Worktree: main workspace `/Users/cosmos/Documents/pet`
- Boulder work id: `healthdog-website-build`
- ULW loop state: `.omo/ulw-loop/019eb65e-5875-75f0-8855-403d984a4410/`

## Skills
- `omo:start-work`: required by user; governs plan execution, Boulder state, delegation, evidence, and checkbox completion.
- `omo:ulw-loop`: required by user; governs durable goal/evidence loop and manual-QA evidence discipline.
- `omo:git-master`: applicable because final delivery includes commit/push already requested by the user.

## Tier
HEAVY. The work is a full browser-facing static site rebuild with new assets, generated graphics, HTML/CSS/JS, tests, browser QA, independent review, commits, and push.

## Success Criteria
- C001 browser happy path: desktop/mobile screenshots show a Health Dog site with first-viewport brand signal, `1600-4533`, real pet imagery, branch CTA, and no major layout break.
- C002 regression/guardrail commands: structure tests pass, required Health Dog strings are present, and forbidden stale/secret/commerce/unconfirmed medical claim strings are absent or documented as source-only false positives.
- C003 final delivery: independent review and debugging gate pass, git state is clean except intentional state, and verified commit is pushed to `origin/main` as previously requested.

## Wave 1 Dispatch
- Todo 1 owns `pet-clone-site/assets/healthdog/logo/`, `pets/`, `reviews/`, and task-1 evidence.
- Todo 2 owns `pet-clone-site/content.js` and task-2 evidence. It must not edit `index.html`, `styles.css`, `app.js`, or tests in Wave 1.
- Todo 3 owns `pet-clone-site/assets/healthdog/generated/`, `prompts/`, and task-3 evidence.
- Root orchestrator does not edit product files or run implementation QA directly.
