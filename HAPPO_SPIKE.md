# Spike: Happo for visual regression testing

> **DO NOT MERGE.** This is input for ADR #998 (Replace Chromatic with Argos CI
> for visual regression testing), which compares Chromatic, Argos, Happo and
> Percy. It mirrors the Argos spike (#3281, WB-2480, and #3324).
>
> **Status:** the setup is done and checked locally. The Happo account and the
> `HAPPO_API_KEY` / `HAPPO_API_SECRET` secrets don't exist yet, so the
> numbers marked **TBD** need a real run.

## Setup

| File | What it does |
|---|---|
| `.github/workflows/happo-spike.yml` | New `Happo (spike)` workflow, one job. Runs on PRs, on pushes to `main` (baselines) and on this branch. Skips with a warning when the secrets aren't set. Chromatic and Argos workflows are unchanged. |
| `happo.config.ts` | Storybook integration and the Chrome targets. Keys come from env vars only. |
| `.storybook/happo-targets.ts` | One Chrome target per viewport. `chrome` is 1200×900 (Chromatic's default). There are also `small` 320×568, `medium` 768×1024, `large` 1024×768, `chromebook` 1366×768, `wide` 1700×900 and `zoom400`. |
| `.storybook/happo.tsx` | Maps `parameters.chromatic` to `parameters.happo` centrally, so no story files were edited. |
| `.storybook/preview.tsx` | Turns the mapping on only when `isHappoRun()` is true. Normal Storybook, Vitest and Chromatic runs are unaffected. |

Happo renders the screenshots in its own cloud. CI builds the Storybook package (the `happo` CLI runs `storybook build`), uploads it, and waits for the report and comparison. No browsers or shards run on our runners.

### How `chromatic.*` maps to Happo

| Chromatic | Happo | How |
|---|---|---|
| `disableSnapshot: true` | `happo: false` | central |
| `delay` | `happo.delay` | central |
| `modes` with `theme` / `direction` / `backgrounds` | Happo "themes" (one per mode, named after the mode, e.g. `Sizes [sylDark]`) | central. A theme switcher sets the Storybook globals, then remounts the story so `play` functions re-run under the new globals, as Chromatic does. |
| `modes` with `viewport` (`small`, `medium`, `large`, `chromebook`, `zoom400`) | Happo targets | central. Each story is sent only to the targets its modes need. |
| Mixed modes, e.g. `{...allThemeModes, small}` | themes in `chrome` plus a `small` snapshot in `chrome-small`, with no cross product | central |
| No modes | 1 snapshot in `chrome` at 1200×900 | central |
| Full-page capture | A Happo-only decorator makes the story at least as tall as the viewport. Taller and wider content still grows (e.g. Button `Sizes` comes out 3018px wide). | central |

**How it works:** Happo has no hook for computing parameters. The mapping is a Storybook `argTypesEnhancer`, which gets each story's merged `parameters` while the story is prepared and adds `parameters.happo` to it. Happo doesn't tell the page which target it's rendering for, so the code works it out from `window.innerWidth`/`innerHeight`. That's why every target has a unique viewport.

**What doesn't map 1:1:**
- `zoom400` is 320×256, below Happo's 300×300 minimum, so its target is 320×300. Only `vh`-based and fixed-position content can differ.
- Happo has no per-story viewport, so each viewport needs its own target. That's cheap: snapshots are billed per rendered story, and a target with nothing to render costs nothing.
- Happo freezes CSS animations on the last frame and defaults to `prefers-reduced-motion: reduce`. Chromatic does neither by default.
- Inline modes with a non-named viewport (`viewport: 1200` or `{width, height}`) aren't supported. None exist today, and the code warns if one appears.

### Checked locally (no Happo account needed)

I injected Happo's Storybook runtime into a local build, the same way the CLI does, and ran its own `happo.init()` / `nextExample()` loop in Chromium for each target:

- **561 snapshots**: 505 in `chrome`, 32 in `chrome-small`, 20 in `chrome-large`, 3 in `chrome-zoom400` and 1 in `chrome-medium`. That's identical to Argos's 561, against Chromatic's 552–554. No story failed to load.
- All 505 `chrome` examples rendered. Every themed variant had the right `data-wb-theme` and `dir`. State sheets showed their pseudo-states (hover/press/focus) in `syl-dark`.
- Two Combobox `play` functions logged assertion errors (a listbox not found, and an announcement text mismatch). Their snapshots still rendered. Compare them against the real report.

## Results

| | Chromatic | Argos (spike) | Happo (spike) |
|---|---|---|---|
| Wall-clock to PR result | ~7 min | ~5 min | **TBD** (CI checkout → build → upload → Happo render → comparison) |
| Snapshots per build | 552–554 | 561 | **561** (local count) |
| Identical re-run | — | 2 non-deterministic | **TBD** |
| One-line change to Button `Sizes` | — | exactly 1 diff | **TBD** |
| PR status / approval | Chromatic UI build | Argos check + approval | **TBD**. Needs the Happo GitHub App: a failing status on diffs, "Accept" in the Happo report turns it green. |
| Baselines on `main` | auto | auto-approved `main` builds | `push: main` runs. PRs compare against the report for their merge base. |
| Partial run (`--only`) | TurboSnap (automatic) | — | **TBD** quota used vs 561 |

## Cost

Billed per snapshot: one story in one target. An accessibility target snapshot counts as 1; an animated snapshot counts as 3. Pro is **$599/month for 300k snapshots**, then **$2 per 1,000**.

| | Snapshots | Cost |
|---|---|---|
| Per full build | 561 | ~$1.12 at the overage rate. Inside the plan it's ~$2.30–$2.70 per build ($599 ÷ 220–260 builds). |
| Per month, full builds only (220–260 builds) | 123k–146k | **$599** (41–49% of the Pro quota) |
| + Firefox target (all modes) | +561/build → 247k–292k | $599, close to the cap |
| + Firefox + Safari | 1,683/build → 370k–438k | ~$740–$875 |
| + accessibility target | +561/build | same as one more browser |
| Partial runs on PRs | only fresh renders count | lower. Depends on how good the change detection is. |

These figures assume one snapshot per mode and no animated snapshots.

## Partial runs and change detection

- The workflow supports `--only`. On PRs with the `happo-partial` label, it builds the list from story files changed in the PR (`git diff` against the merge base). It can also take a manual JSON filter through `workflow_dispatch`, but that only works once the workflow is on `main`.
- Happo carries every other story over from the baseline report, and only fresh renders count against quota.
- **Limit:** the naive `git diff` filter misses component and token changes that don't touch a story file. A real script needs:
  1. The changed files.
  2. An import graph, e.g. `dependency-cruiser` over `packages/` and `__docs__/`, reversed to find the story files that import a changed file (through `@khanacademy/wonder-blocks-*` aliases).
  3. "Run everything" fallbacks for global changes: `.storybook/*`, tokens, `package.json`/lockfile, `happo.config.ts`.

  That's roughly 1–2 days of work. TurboSnap does this automatically, and Happo doesn't.

## Vendor Intake notes

- **Data Happo receives:**
  - The built Storybook preview package: compiled JS/CSS for our components and stories, static assets and fonts.
  - Git metadata: SHAs, branch, PR link, commit message and author email.
  - The screenshots it renders, which it stores.

  No secrets or user data, as long as stories don't embed any. With `previewOnly` (the default), the manager UI isn't uploaded.
- **GitHub:** the Happo GitHub App posts commit statuses. The alternative is `--githubToken ${{ secrets.GITHUB_TOKEN }}`, which posts a PR comment and needs no App. **Access control:** anyone who signs in with a GitHub account that has access to an integrated repo gets user access to the Happo account automatically. Review that.
- **SSO:** SAML (Okta, Entra, Google, etc.), but Happo has to unlock it for the account first. Roles are User and Admin.
- **Compliance:** https://happo.io/security lists no SOC 2 report. Happo wasn't contacted.
- **Network:** the `Secure Network` step allows `registry.npmjs.org` and `happo.io`. Any other upload host, like Argos's presigned S3 bucket, will show up as a blocked host on the first run and has to be added.

## Gaps and risks

- **Snapshot cropping:** Happo crops to the rendered content. The full-page decorator only works if Happo measures from our wrapper, so confirm it on the first report. Portaled content (popovers, modals) also needs a check.
- **Fragile mapping hooks:** the mapping depends on Storybook calling `argTypesEnhancers` with a mutable `parameters` object, and on Happo reading `prepared.parameters`. Both are internals that could change in an upgrade.
- **No automatic change detection** (see above). Without it, every PR spends the full 561.
- **No Storybook hosting:** Happo doesn't host a browsable Storybook like Chromatic or Argos deployments do, so we'd need another host for PR Storybooks.
- **Extra renders per themed snapshot:** Happo applies themes after the first render, so each themed snapshot is rendered twice (render, then switch and remount). That adds render time but not quota.

## Recommendation

**Provisional; to be finalized after the TBD numbers.**

On fit, Happo is viable. It needs no story edits, gives the same 561 snapshots as Argos, renders in Happo's cloud with no runner sharding, and is cheap at one target ($599/month at under half the quota).

Against Argos it's weaker on:
- no Storybook hosting
- a more fragile mapping layer (Storybook internals and viewport-sniffing)
- no SOC 2 for Vendor Intake
- no automatic change detection

Its main advantage is real cross-browser targets, at about one extra build's worth of snapshots per browser. Unless cross-browser coverage is a requirement, the recommendation stays **Argos**, with Happo as the fallback if cross-browser VRT becomes a must.

## To finish the spike

1. Create a Happo account (14-day free calibration period) and add the `HAPPO_API_KEY` and `HAPPO_API_SECRET` repository secrets.
2. Install the Happo GitHub App on `Khan/wonder-blocks` and activate the repo at happo.io/github-integration.
3. Re-run the workflow on this branch: the `push` trigger produces a full report, which gives the wall-clock time and the server-side snapshot count. Re-run it once more for the stability check.
4. `main` has no Happo reports, so a PR against `main` has no baseline. As with the Argos review-flow PR (#3324), open a DO-NOT-MERGE PR **stacked on this branch** with the one-line Button `Sizes` change. That PR measures exactly-1-diff, the PR status and the approval flow. Then add the `happo-partial` label to it to measure the quota saved.
