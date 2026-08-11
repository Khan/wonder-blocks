# no-rtl-icon-swap

Disallow RTL ternaries that swap Phosphor icons on the `PhosphorIcon` mirroring whitelist. Those swaps double-flip once auto-mirroring is enabled.

## Rule Details

`PhosphorIcon` automatically mirrors directional icons in RTL using a central whitelist (`mirrored-icon-names.ts` in `@khanacademy/wonder-blocks-icon`). Call sites should always pass the LTR glyph.

If code still does `isRTL ? caretLeftIcon : caretRightIcon` (or the same pattern for any whitelist icon: arrows, carets, `sign-in` / `sign-out`, `text-indent` / `text-outdent`, etc.), the icon is flipped once by the ternary and again by `PhosphorIcon` — a double flip.

This rule flags conditional expressions whose test refers to RTL (`isRTL`, `RequestInfo.isRTL`, `dir === "rtl"`, …) and whose consequent or alternate is an identifier (or simple member access) that maps to a whitelist icon name.

Custom `*RTL` assets and icons that are intentionally excluded from mirroring (media controls, launch/pop-out arrows, expand/collapse carets that swap with up/down, etc.) are not flagged.

### Examples of **incorrect** code

```tsx
const icon = isRTL ? caretLeftIcon : caretRightIcon;
const startIcon = RequestInfo.isRTL ? arrowLeft : arrowRight;
const action = direction === "rtl" ? signInIcon : signOutIcon;

<PhosphorIcon icon={isRTL ? caretLeftIcon : caretRightIcon} />
```

### Examples of **correct** code

```tsx
// Pass the LTR glyph; PhosphorIcon mirrors it in RTL.
const icon = caretRightIcon;
<PhosphorIcon icon={caretRightIcon} />

// Non-whitelist directional swaps (e.g. expand/collapse) are fine.
const icon = isExpanded ? caretDownIcon : caretRightIcon;

// Custom RTL-specific assets are fine.
const icon = isRTL ? finishIconRTL : finishIcon;
```

## When to change the whitelist

If an icon should (or should not) mirror, update:

1. `packages/wonder-blocks-icon/src/util/mirrored-icon-names.ts`
2. `packages/eslint-plugin-wonder-blocks/src/data/mirrored-icon-names.ts` (keep in sync — CI tests equality)

Do not add a call-site override; the whitelist is the only control.
