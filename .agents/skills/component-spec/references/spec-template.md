# Implementation spec outline

Follows the WB Confluence template "Writing implementation specs" and the
Tabs implementation spec. Keep the headings in this order so reviewers can
find things across specs.

## Header

- Title: `<ComponentName> Implementation Spec`
- Date and author
- Table: status (Draft / In review / Approved / Implemented), Jira ticket and
  epic, Figma link, package name, owners (eng, design, a11y)

## Summary

Two or three sentences: what the component is, what problem it solves, and
which existing code it replaces.

### Version history

Table: date, change, author. Add a row whenever a review round changes a
decision.

### Dependencies

WB packages the component builds on, and anything it doesn't use on purpose
(e.g. "doesn't use `Pill`, because …").

### When to use

One paragraph, then a table comparing this component with its nearest
alternatives (other WB components, native elements): when to pick each.
Note who owns the guidance (design or eng).

## API Spec

One subsection per exported component, tagged **PUBLIC** or **INTERNAL**.
Start with one sentence on the semantics it follows (link the APG pattern).

### Props

Table with columns: **Prop**, **Type**, **Description**, **Rationale**.
Mark required props. Defaults go in the description.

After the table, list props deliberately left out and why (e.g. "No
`activationMode`: …").

#### TS types

A table or code block for every non-trivial prop type (e.g. the shape of an
option), with the same four columns for its fields.

## Usage

Numbered examples, each with a sentence of context and a `tsx` block:

1. The basic case, followed by the **rendered HTML** with roles, ids and
   ARIA attributes.
2. Each optional feature (icons, labels, counts, …).
3. Accessibility-relevant usage (labeling, announcing results).
4. Edge cases a consumer must handle (unknown values, empty lists).

## Notes

### Implementation

Bullets on the non-obvious mechanics: state handling, id generation, focus
management, edge-case behavior, what's left to follow-ups.

### Design

- **Figma designs**: links to the component page and variants.
- **Tokens**: the spacing, radius and typography tokens, then a table of
  color tokens per state (rest, hover, press, selected, focus, disabled).
- **Styling considerations**: layout behavior (wrapping, widths, heights
  across breakpoints), RTL, states design hasn't defined yet.
- **Related context**: other specs or discussions.

### Accessibility

- The pattern and why it fits.
- **Keyboard interactions**: table of key → behavior, including keys that
  deliberately do nothing. Note RTL behavior for arrow keys.
- **Focus management**: where focus goes on load, on change, after removal.
- **Contrast**: table of foreground/background pairs per state with ratios,
  and any that need a design decision.
- **To test**: screen readers and browsers to verify with.

### Open questions

Table: **#**, **Question**, **Owner**, **Answer / status**. When a
question is answered, move the answer into the relevant section and keep the
row with a short resolution.

### Implementation plan

- **Phase 1, component**: table of PRs (number, scope, ticket, status).
- **Phase 2, migrations**: table of usages to migrate, in order, with the
  file, what changes, risks, and the Jira sub-task.
- **Not migrating**: usages that stay as they are, and why.
- **Phase 3, follow-ups**: deferred work.

### Resources

Links: ticket, Figma, Confluence template, APG pattern, Slack threads,
related PRs.

## DACI

Table: Driver, Approver, Contributors, Informed.
