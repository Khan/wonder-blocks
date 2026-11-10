---
name: component-spec
description: >
  Takes a new Wonder Blocks component (or a large change to one) from a Jira
  ticket and Figma designs to an implementation spec, then to a stack of
  reviewed PRs. Use when the user asks to spec, plan, design the API of, or
  build a new WB component or package; mentions an implementation spec, the
  "Writing implementation specs" template, or the Tabs implementation spec; or
  asks to turn an approved spec into PRs. Covers research, the spec doc,
  review rounds, the implementation plan, the PR stack and driving it to
  merge. Do NOT trigger for small fixes to an existing component, for writing
  stories or tests alone (use `storybook` / `unit-tests`), or for using WB in
  an app (use `wonder-blocks`).
---

# Component spec → implementation

New components go through two stages: an **implementation spec** that the
team reviews and agrees on, then a **stack of small PRs** that build it. The
spec is the source of truth during implementation. When review changes a
decision, update the spec in the same round as the code.

Each phase below ends with something the user reviews. Don't start the next
phase until they've signed off, unless they asked you to keep going.

## Phase 1: Research

Gather everything before writing. Ask the user for links you can't find.

- **Ticket**: the Jira issue (and epic). Read the description and comments.
- **Designs**: the Figma component page. Get the variants, states (rest,
  hover, press, focus, selected, disabled), sizes, spacing and color
  variables. Map every value to a WB token; list any value with no token.
- **Template**: the Confluence pages "Writing implementation specs" and
  "Tabs Implementation Spec" (WB space). Follow their section structure.
- **Prior art**: existing WB components with similar behavior (props, naming,
  keyboard handling), and the matching ARIA APG pattern.
- **Current usages**: search the frontend repo for the hand-rolled versions
  this component will replace. These become the migration list, and they show
  which props consumers actually need. Note any that load data
  asynchronously, render inside other widgets, or need RTL.

## Phase 2: Write the spec

Write it as a Claude Doc (load the docs skill) so reviewers can comment in
place. Use the section outline in
[references/spec-template.md](references/spec-template.md).

What makes a spec reviewable:

- **Decide, don't survey.** Pick the semantics (e.g. radio group vs tabs vs
  toolbar) and say why in one or two sentences. Put the rejected options in
  a "When to use" table, not in prose.
- **Every prop gets a rationale.** The props table has a Rationale column;
  a prop nobody can justify gets cut.
- **Show the rendered HTML** for the main example, with roles, ids and ARIA
  attributes. Reviewers catch semantic bugs there.
- **Spell out edge cases**: empty options, a value that matches nothing,
  duplicate values, long labels, labels without spaces, RTL, many options.
- **Keyboard table**: every key, what it does, and what it deliberately
  doesn't do (and why, e.g. "not part of APG").
- **Open questions table** with an owner per question (design, a11y, eng).
  Don't guess design answers; ask.

## Phase 3: Review rounds

- Draft a Slack message to share the doc (draft only; the user sends it).
  Draft separate messages for questions aimed at specific people.
- Doc comments sent to Claude are answered in their own thread. When a
  comment asks for an edit, make it and reply there.
- When a decision removes content (a row, a prop, a limit), record the
  decision somewhere in the doc before deleting it. If a delete is refused
  because a comment thread is anchored on it, reword the block instead.
- Fold answers into the spec as they arrive, and keep the open questions
  table current (answered → move the answer into the relevant section).
- When review changes the API, also update any PRs already open.

## Phase 4: Plan the implementation

Add an **Implementation plan** section to the spec:

- **Phase 1, the component**: a PR stack, one reviewable concern per PR.
  The default stack for a new package:
  1. **Package setup**: `packages/wonder-blocks-<name>`, public, version
     `0.0.0`, a minor changeset ("Add new package"), root `package.json` and
     `tsconfig-build.json` wiring, empty `index.ts` export.
  2. **Behavior and semantics**: the component unstyled, with full unit
     tests (roles, names, ids, keyboard, mouse, edge cases, ref forwarding).
  3. **Styles**: tokens, states, and the Chromatic state sheet story
     (`*-testing-snapshots.stories.tsx`) with RTL.
  4. **Docs**: stories, an accessibility `.mdx` page, `argTypes`, a Scenarios
     snapshot story, and a row in the `wonder-blocks` skill's package table.
- **Phase 2, migrations**: one row per usage found in Phase 1, in order,
  each with its own Jira sub-task. Ask the user before creating tickets.
- **Phase 3, follow-ups**: anything deferred (dev warnings, open design
  questions, a later styling migration).

## Phase 5: Build the PR stack

Load the `unit-tests`, `storybook` and `wonder-blocks` skills before writing
code. Follow `CLAUDE.md` for conventions.

### Stacking

- Branch each PR off the previous one (`<ticket>-<package>`,
  `<ticket>-<component>-behavior`, …) and set each PR's base to the previous
  branch.
- Each PR gets its own changeset. Write the file by hand:
  `pnpm changeset` commits on its own. Docs-only PRs get an empty changeset.
- When a lower PR changes, merge its branch into the next one and push.
  Never rebase or force-push a stacked branch.
- A new public package can't publish npm snapshots until it exists on npm
  (trusted publishing). Tell the user after PR 1 opens; they set it up, then
  re-run the failed snapshot jobs.

### Before every push

Run these, not just the first two:

```sh
pnpm lint            # or eslint on the changed paths
pnpm typecheck
pnpm build:types     # also compiles the tests; catches missing tsconfig references
pnpm exec jest --config config/jest/test.config.js --ci --runInBand \
  --selectProjects packages --reporters default --forceExit -- packages/wonder-blocks-<name>
```

`--forceExit` and `--reporters default` avoid Jest hanging on exit in remote
containers. For anything visual, start Storybook
(`pnpm exec storybook dev -p 6061 --ci --no-open`) and check the story in a
browser (Playwright screenshots work), including the docs page, not just the
single story view.

### Lessons from past components

These all came up in review on `ExclusiveCategoryFilter`; check for them
before a reviewer does.

- **Typography styles** from `@khanacademy/wonder-blocks-typography`
  (`styles.BodyTextMediumSemiWeight`) are Aphrodite entries. Put them in the
  `style` array; spreading them into `StyleSheet.create` emits no CSS.
- **Full pill radius** is `border.radius.radius_240` (`radius_full` is 50%).
- **Long words**: add `overflowWrap: "anywhere"` to labels and options, and
  test text without spaces (`longTextWithNoWordBreak`).
- **State-dependent borders** shouldn't reflow the row: take the extra
  border width off the padding instead of growing the element.
- **Ids**: build element ids from a namespaced segment
  (`${id}-option-${index}`), never from raw consumer values (they can
  collide with other ids or contain spaces), and let items override their id.
- **RTL**: read direction from the nearest `[dir]` ancestor
  (`closest("[dir]")`), not `closest("[dir=rtl]")`.
- **Controlled components**: compare against the prop, not the derived
  state, when deciding whether to call `onChange`, so a value that matches
  nothing can still be corrected by user input.
- **Lint disables**: use `// eslint-disable-next-line <rule> -- <reason>` on
  the line that needs it, never a file-wide disable.
- **Icon props**: accept a `React.ReactElement` (`PhosphorIcon` / `Icon`)
  and render it as passed, so consumers can add an `aria-label`. Don't also
  accept a bare asset.
- **Test-only package imports** need the package's tsconfig reference even
  when it isn't a dependency; otherwise `build:types` fails in CI.
- **Stories with `useArgs`** only re-render the first story on the docs
  page, and `useArgs` can't be mixed with React hooks. Keep the selection in
  `React.useState`, synced from the arg with `useEffect`.
- **Snapshots**: stories that add no visual coverage set
  `chromatic: {disableSnapshot: true}`. Edge cases go in a `Scenarios` story
  with `ScenariosLayout`, in a narrow container so wrapping actually shows.

### Driving the stack to merge

- Assign every PR to the user and subscribe to PR activity.
- Reply on every review thread, push small fixes, and resolve what you
  addressed. API or design changes go to the user before you push.
- Fix CI failures from their logs; don't re-run blindly.
- Chromatic's bot comment can say "0 visual changes" while the **UI Tests**
  status still waits on baselines. Read the commit status, and tell the user
  which builds need accepting.
- Merge bottom-up. Remind the user that baselines and approvals are theirs.

## After merge

Update the spec's status and version history, then start Phase 2
migrations only when the user asks (they usually wait for a release).
