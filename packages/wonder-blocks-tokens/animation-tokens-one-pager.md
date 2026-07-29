# Semantic Motion Design Tokens Proposal

**Author:** Jonah Goldsaito
**Package:** `@khanacademy/wonder-blocks-tokens`
**Change type:** Minor (additive, backward-compatible)

---

## TL;DR

Wonder Blocks has color, spacing, typography, border, and shadow tokens — but **no motion tokens**. Every animation is hand-rolled inline, with inconsistent units, duplicated easing curves, and per-component magic numbers for *how much* things change (e.g. scaling 0->1 or 0.9-1.0). This proposal adds a two-tier motion token system (**primitives + semantic archetypes**) that is **implementation-agnostic**: one canonical source of truth that serves Aphrodite/CSS, the `motion` React library (used in `frontend`), and WAAPI — without locking us into a proprietary JS runtime. Semantic presets **own the complete opinion** of a motion (timing *and* the from/to states that say how far it slides, whether it fades, how much it scales) as plain data, so a component consumes one preset instead of inventing distances. The shape is aligned with the now-stable W3C Design Tokens spec.

---

## Problem

Motion in our products is **untokenized and inconsistent**, and the inconsistency spans `wonder-blocks` and `frontend` (and potentially `perseus` one day) that express motion in fundamentally different "languages":

### `wonder-blocks` hard-codes timing inline 

- **Durations** vary between seconds and ms (`0.12s` vs. `120ms`)
- **Easings are** limited to the base CSS `ease`, `ease-out`, `ease-in-out`, `linear`
- **Magnitudes** are varied (e.g. Drawer slides 100% width, Modals can move fixed fixed amounts or not at all

We give our makers no opinionated knobs to tune holistically.

### `frontend` has `motion` React library, CSS/Aphrodite, WAAPI

Motion expresses the same concepts differently

- **Duration** in seconds (number)
- **Easing** as a **`[a, b, c, d]` bézier array** or named string
- It has accumulated a sprawl of one-off `cubic-bezier()` curves with

WAAPI (`element.animate`) has entirely different needs. What a joy :)

### No system

This makes it very hard to reason about, review, and update Motion as a system.

---

## Goal

A single, canonical motion vocabulary with primitives that are combined into "semantic presets" that are ultimately what end users should be employing:

Ultimately we want a taxonomy that:

1. **Is defined once** and consumed everywhere — CSS/Aphrodite, the `motion` library, and WAAPI
   all read from the same source of truth (DRY: no duration, curve, or distance value is written twice).
2. **Is named by reusable pattern**, not by component, so the same token applies wherever the
   same *kind* of motion happens.
3. **Bakes in the whole opinion** — best-practice motion (fade-while-sliding, exit-quicker-than-enter,
   settle-from-scale) is encoded in the token, so an engineer or designer with no motion background
   gets a good result by applying it.
4. **Aligns with industry + independent-body standards** so it ages well and interoperates with
   design and AI tooling (Figma variables, Style Dictionary, etc.).
5. **Ships additively** — a minor version bump, no consumer is forced to change anything.

---

## Constraints & considerations

### 1. Two motion "dialects" must be served from one definition

The token can't be a CSS string (JS libraries can't consume `"cubic-bezier(...)"` as an array),
and it can't be a seconds-number-plus-array (CSS needs `ms` + a `cubic-bezier()` string). So the
**canonical form is the raw, neutral one** — durations as **millisecond numbers**, easings as
**`[a, b, c, d]` control-point arrays**, and the preset states as plain `{opacity, offset, scale}` —
and thin adapters format for each target:

| Target | Duration | Easing | Full preset |
|---|---|---|---|
| CSS / Aphrodite | `"300ms"` (via `cssDuration`) | `"cubic-bezier(0.4, 0, 0.2, 1)"` (via `cssEasing`) | keyframe object (via `cssPreset`) |
| `motion` library | `0.3` seconds (via `motionTransition`) | `[0.4, 0, 0.2, 1]` array (consumed directly) | `{initial, animate, transition}` (via `motionPreset`) |
| WAAPI | `300` (ms number, used as-is) | `cssEasing(...)` string | `[keyframes, options]` (via `waapiPreset`) |

### 2. The token owns the *whole preset*; the component owns *element-binding + direction*

- **The token carries the complete preset as data** — a timing clock (`{duration, easing, delay}`)
  plus optional `from`/`to` visual states (`{opacity, offset, scale}`). This bakes in the entire
  opinion: *that* it fades, *how far* it slides, *how much* it scales.
- **The component supplies only** which element it binds to and the direction via an `origin` option
  (`top`/`bottom`/`left`/`right`). The token's `offset` is **axis-neutral**, so one
  `docked.enter` serves a drawer entering from any edge with no token explosion.

Not every archetype needs states. Timing-only archetypes (`control.press`, `disclosure.*`,
`fade.*`, `indicator.move`, `loop.spin`) are just a clock; the `floating` and `docked` archetypes
are full presets.

### 3. *Time* must not scale with font size; *displacement* deliberately does

Following the `border.ts` pattern, durations use **fixed `ms` units, never `rem`** — timing should be consistent regardless of root font size. Displacement is different: a preset's `offset` is a **spatial** quantity, so it references `sizing` tokens (rem) and *does* scale with root font size, the same as padding or margin.

### 4. Single clock per preset in v1

All properties in a preset animate on one `{duration, easing, delay}`; sequencing is done via
`delay`. No per-property sub-tracks yet (e.g. preset cannot have a fade that's shorter than its translation duration). This level of complexity didn't seem justified, at least for now.

### 5. Namespace: `animation`, not `motion` (avoids the library collision)

The tokens export under the `animation` namespace (`animation`, `animationValue`, `--wb-animation-*`) rather than `motion` despite the ubiquitous usage of the term "Motion" as KA. In `frontend`, essentially every file that uses the `motion` React library (`import {motion} from "motion/react"`) will *also* use these tokens, so a `motion` export would always collide and force an alias everywhere. 

As a bonus, the adapters that target the `react-motion` library keep the `motion` prefix (`motionTransition`, `motionPreset`), so "motion" now unambiguously means "the library" and "animation" means "our tokens."

---

## Industry & standards alignment

- **W3C Design Tokens Community Group spec (stable, Oct 2025)** validates the timing shape: `duration` (`{value, unit}`) and `cubicBezier` (`[a, b, c, d]`) types. It then has a composite `transition` (`{duration, delay, timingFunction}`) layered on top. Our timing clock mirrors the DTCG `transition` composite. The `from`/`to` preset states extend beyond what DTCG standardizes today, but as plain data they remain tool-friendly (exportable as Figma variables / Style Dictionary values).
- **Material Design** motion system: our primitive easings map directly onto its standard / decelerate / accelerate / emphasized curves — a well-researched, accessible baseline.
- **Anti-pattern we explicitly avoid — Atlassian:** their tokens bake *compiled* keyframes and a CSS shorthand string into opaque tokens tied to a proprietary JS runtime. The lesson isn't "don't encode magnitude" — it's "don't ship opaqueness and a runtime." We encode the full preset as transparent from/to data + adapters, so the same token works in CSS, `motion`, and WAAPI with no runtime lock-in.
- **Naming by archetype, not component** avoids the per-component combinatorial explosion
(`buttonHoverDuration`, `modalEnterDuration`, …) that plagues many systems. Direction is a runtime soption (`origin`), not a family of tokens.

---

## Proposed solution

**Two tiers, one source of truth, three consumers.** Raw values are authored exactly once in
`primitive/animation.ts` + `semantic/animation.ts`; the exported trees are *derived* from that source.

```
primitive/animation.ts + semantic/animation.ts          ← SINGLE SOURCE OF TRUTH (raw)
   duration.long = 300   easing.standard = [0.4,0,0.2,1]   overlay.enter.from = {opacity:0, offset, scale}
        │
        ├── exported as-is ─────────────────────────►  animationValue  (raw ms + arrays + from/to, for JS)
        │
        └── toCssTree() (timing only; from/to excluded) → { long: "300ms", … }
                 └── registered in default.ts → CSS-var build ─────►  animation  (var-refs, for CSS)
```

Two exported trees, plus adapter helpers:

- **`animation`** — CSS-variable-reference tree (`var(--wb-animation-…)`) for Aphrodite/CSS. Registering
  the derived string form in `default.ts` triggers the existing pipeline to emit `--wb-animation-*`.
  It is **timing-only**: `from`/`to` states are excluded (they aren't CSS variables — they're
  consumed by the preset adapters).
- **`animationValue`** — the raw canonical tree (ms numbers + bézier arrays + `from`/`to` states) for
  JS animation libs. It is a **superset** of `animation`: same timing shape, plus the preset states.
  A structure test enforces the timing shapes stay in sync.
- **Adapters** (`src/util/animation-utils.ts`):
  - *Timing:* `cssDuration`, `cssEasing`, `motionTransition`, `toCssTree`.
  - *Full preset:* `cssPreset`, `motionPreset`, `waapiPreset` — each takes a preset + `{origin}`
    and returns that target's keyframe/variant/WAAPI form.

### Token vocabulary

**Primitive `duration` (ms), grounded in real WB + `frontend` usage**

| key | ms | maps to today |
|---|---|---|
| `none` | 0 | disabled / reduced |
| `xShort` | 100 | button/icon micro-feedback (`control.press`) |
| `short` | 150 | switch thumb, tab fade (absorbs stray 120) |
| `medium` | 200 | general default (common in `frontend`); `floating`/`docked` exit |
| `long` | 300 | accordion expand, tab indicator |
| `xLong` | 400 | `floating`/`docked` (modal/drawer) entrance |
| `xxLong` | 1100 | spinner loop |

**Primitive `easing` (bézier arrays)**

| key | value | replaces |
|---|---|---|
| `linear` | `[0, 0, 1, 1]` | `linear` |
| `standard` | `[0.4, 0, 0.2, 1]` | `ease`, `ease-in-out` |
| `decelerate` | `[0, 0, 0.2, 1]` | `ease-out` (entrances) |
| `accelerate` | `[0.4, 0, 1, 1]` | `ease-in` (exits) |
| `emphasizedDecelerate` | `[0.05, 0.7, 0.1, 1]` | pronounced entrance |
| `emphasizedAccelerate` | `[0.3, 0, 0.8, 0.15]` | pronounced exit |

**Preset states** are composed from existing tokens, not a new primitive scale: `offset`
references `sizing` (e.g. `size_160` = 1.6rem, `size_960` = 9.6rem), `scale` is a unitless factor,
`opacity` is 0–1.

**Easing conventions.** Anything that *moves position on screen* uses the weighted ease-in-out
`standard` (short ease-in, long/gradual ease-out). Exits use `decelerate` (ease-out) — **never
`linear`**. Fades use `linear`. Continuous loops (spinner) use `linear`.

**Semantic archetypes**

*Timing-only clocks* (`{duration, easing, delay}`):
- `control.press` → `xShort` (100ms) · `standard`. Micro-feedback for buttons & icon buttons
  (kept snappy at 100ms to match today's controls).
- `disclosure.expand` / `disclosure.collapse` → accordions
- `indicator.move` → tab underline
- `fade.in` / `fade.out` → generic opacity (`linear`)
- `loop.spin` → spinner (component owns `iteration: infinite`)

*Full gestures* (clock + `from`/`to`) — split by **character**, not just size:
- `floating.enter` → `xLong` (400ms) · `standard` · fade `0→1` · rise `1.6rem→0` · settle
  `scale 0.99→1`. For **in-place** surfaces (modal/dialog, popover, menu) that appear where they are.
- `floating.exit` → `medium` (200ms) · `decelerate` · fade `1→0` · drift `0→0.8rem` · `scale 1→0.99`.
- `docked.enter` → `xLong` (400ms) · `standard` · fade `0→1` · slide `9.6rem→0`, **no scale**. For
  **edge-docked** surfaces (drawer / side & bottom sheets) that travel in from an edge (larger,
  directional, still a bounded "suggestion").
- `docked.exit` → `medium` (200ms) · `decelerate` · fade `1→0` · drift `0→3.2rem`, no scale.

Enter-longer / exit-quicker is a deliberate asymmetry baked into each archetype. `floating` scales
and stays small; `docked` slides farther and doesn't scale (scaling a sliding sheet looks wrong).

### How each consumer uses it

```ts
// Aphrodite / CSS — full preset; component supplies only the docked edge.
// Pass `fillMode: "forwards"` on exits so the element holds its hidden state.
import {animationValue, cssPreset} from "@khanacademy/wonder-blocks-tokens";
StyleSheet.create({
  drawerEnter: cssPreset(animationValue.docked.enter, {origin: "right"}),
  drawerExit: cssPreset(animationValue.docked.exit, {origin: "right", fillMode: "forwards"}),
});
// A timing-only archetype via the `cssTransition` helper (or CSS-var refs):
expandRow: cssTransition("grid-template-rows", animationValue.disclosure.expand),
```
```tsx
// motion library — full preset as initial/animate/transition
<motion.div {...motionPreset(animationValue.floating.enter, {origin: "bottom"})} />
```
```ts
// WAAPI — [keyframes, options] tuple
el.animate(...waapiPreset(animationValue.floating.enter, {origin: "bottom"}));
```

---

## Trade-offs

**Pros**
- One source of truth; zero duplication of timing *or* magnitude across CSS and JS.
- Best-practice motion is baked in — consumers get fade-while-sliding, exit-quicker-than-enter, and
  scale-settle without knowing motion design; they pick only element + direction.
- Works today in all three animation surfaces we actually use — no runtime lock-in.
- Standards-aligned (DTCG timing), interoperates with Figma variables / Style Dictionary, ages well.
- Archetype naming + `origin` option keep the token set small; avoids per-component/per-direction explosion.
- Themeable and reviewable — motion becomes a first-class, tunable part of the system.

**Cons / accepted limitations**
- **Two exported trees** (`animation` + `animationValue`) that are no longer identical: `animationValue` is a
  superset carrying `from`/`to`, which the CSS-var tree omits. A structure test enforces the timing
  shapes stay in sync.
- **`animation`/`motion` naming split** — our tokens are `animation`; the library-target adapters keep the `motion` prefix (`motionTransition`, `motionPreset`). Two words, but each has one clear meaning (tokens vs. library).
- **Single clock only** — no per-property tracks in v1 (sequencing via `delay` covers current needs).
- **Adapters, not automatic** — consumers call `cssPreset` / `motionPreset` / `waapiPreset` rather
  than spreading a token directly. Deliberate: it's what keeps the canonical form neutral.
- **Layout-relative travel is out of scope** — a preset's `offset` is a bounded, sizing-based
  magnitude. Even `docked` (the larger, drawer-oriented archetype) supplies a bounded 9.6rem
  "suggestion," not a full measured slide of the surface's own width. A surface that genuinely must
  travel a runtime-measured distance still does that itself.

---

## Followups & flags to review

Raised by applying the tokens to real components; deliberately **not** resolved in the token layer:

1. **`animated`-prop pattern for new surfaces.** Turning on entrance/exit motion for surfaces that
   don't animate today (standard modal, popover, tooltip, dropdown) needs a gating decision. A new
   `animated` prop defaulting **`true`** breaks existing patterns (synchronous close becomes async;
   everything animates where it didn't); defaulting **`false`** is safe but still causes broad
   `frontend` churn to opt in everywhere. This is a **cross-repo decision** — the first application
   pass prototypes the motion without changing any shipped public API/default.
2. **Popover & tooltip are a fast-follow.** They're class components with a permanently-mounted
   opacity toggle owned by their parent controllers, so adding motion needs class→function
   conversion + parent coordination — larger than a straight tokenization.
3. **Reduced motion.** WB has no `prefers-reduced-motion` handling today; motion is gated only by
   the `animated` prop where it exists. `switch` animates a *movement* unconditionally (no prop, no
   media-query fallback). Whether to centralize reduced-motion in WB is a team decision; until then,
   `switch` specifically warrants an explicit a11y sign-off (WCAG 2.3.3).
4. **Entrance easing.** Entrances use `standard` (weighted ease-in-out) per the "movement =
   ease-in-out" convention; an earlier draft used `emphasizedDecelerate`. `emphasized*` curves
   remain available as primitives if a more pronounced entrance is wanted — tune by eye.
5. **`docked` slide magnitude.** 9.6rem is a *suggestion*, so a full-width drawer no longer slides
   entirely from the edge (it rises/drifts + fades). This is a visible change to the highest-traffic
   existing animation — confirm with design.
6. **No dedicated backdrop-fade preset.** Backdrops currently reuse the panel's `floating`/`docked`
   duration (fade only); `fade.*` (150ms) is too quick to match a 400ms panel. A future
   backdrop-specific preset could formalize this.
