# @khanacademy/wonder-blocks-tabs

## 0.3.4

### Patch Changes

- Updated dependencies [dd76e7c]
- Updated dependencies [dd76e7c]
    - @khanacademy/wonder-blocks-typography@4.0.0
    - @khanacademy/wonder-blocks-tokens@10.3.0
    - @khanacademy/wonder-blocks-core@12.3.0

## 0.3.3

### Patch Changes

- Updated dependencies [1338494]
    - @khanacademy/wonder-blocks-tokens@10.2.1
    - @khanacademy/wonder-blocks-typography@3.2.4

## 0.3.2

### Patch Changes

- Updated dependencies [c7d95bf]
- Updated dependencies [668093b]
    - @khanacademy/wonder-blocks-tokens@10.2.0
    - @khanacademy/wonder-blocks-core@12.3.0
    - @khanacademy/wonder-blocks-typography@3.2.3

## 0.3.1

### Patch Changes

- Updated dependencies [a1be4c5]
- Updated dependencies [d00a6f1]
- Updated dependencies [abf5496]
- Updated dependencies [812c167]
    - @khanacademy/wonder-blocks-tokens@10.1.0
    - @khanacademy/wonder-blocks-typography@3.2.2

## 0.3.0

### Minor Changes

- 28fa0c0: Tabs: Add keyboard navigation support and `activationMode` prop.
- 282fcee: Tabs:

    - Add styling
    - Add support for `styles` prop
    - Add `animated` prop for enabling transition animations for the selected tab

    NavigationTabs:

    - Refactored current tab indicator logic to work with Tabs

- 26afba7: Tabs: Add `mountAllPanels` prop. Defaults to `false` so tab panels are only rendered if they are visited
- 6327e23: Adds Tabs component
- e44197b: Tabs

    - Added `id` and `testId` props
    - Cache previously visited tab panels. This is so tabs are only mounted when
      they are selected the first time. Re-visiting a tab doesn't re-mount the panel
    - Support ARIA props in items in the `tabs` prop
    - Support a render function for a tab's label in the `tabs` prop

### Patch Changes

- 5acef63: Tabs: Update border token usage
- 3be8b60: Tabs: Allow keydown events to pass when `Enter` or `Space` is pressed. This is so that a tab could trigger a Popover to open
- db0c716: Tabs: Fix keyboard navigation for right-to-left
- 5acef63: Tabs and NavigationTabs: Use inline styles for tab indicator
- 5acef63: NavigationTabs: Make sure the current tab styles don't change when interacted with
- Updated dependencies [28fa0c0]
- Updated dependencies [28fa0c0]
    - @khanacademy/wonder-blocks-core@12.3.0
    - @khanacademy/wonder-blocks-typography@3.2.1

## 0.2.7

### Patch Changes

- Updated dependencies [b9e4946]
- Updated dependencies [b9e4946]
    - @khanacademy/wonder-blocks-tokens@10.0.0
    - @khanacademy/wonder-blocks-typography@3.2.0
    - @khanacademy/wonder-blocks-core@12.2.1

## 0.2.6

### Patch Changes

- Updated dependencies [2656fd4]
- Updated dependencies [6018552]
- Updated dependencies [7bbf311]
- Updated dependencies [7f79943]
    - @khanacademy/wonder-blocks-tokens@9.0.0

## 0.2.5

### Patch Changes

- Updated dependencies [e63adea]
    - @khanacademy/wonder-blocks-tokens@8.0.0

## 0.2.4

### Patch Changes

- e8ccf60: Update `borderRadius` styles to use new `border.radius` tokens
- Updated dependencies [e8ccf60]
    - @khanacademy/wonder-blocks-tokens@7.0.0

## 0.2.3

### Patch Changes

- 24bf12f: Update sizing tokens used internally to Base 10 to handle browser minimum size issues
- Updated dependencies [24bf12f]
    - @khanacademy/wonder-blocks-tokens@6.0.0

## 0.2.2

### Patch Changes

- 4846e9c: Fix pseudo-states to account for aria-disabled
- Updated dependencies [3dc5dac]
    - @khanacademy/wonder-blocks-tokens@5.2.0

## 0.2.1

### Patch Changes

- 86e1901: Override border on different states (focus-visible, hover, press) to account for the `IconButton` change from `outline` to `border` + `boxShadow`.

## 0.2.0

### Minor Changes

- 27f6298: `NavigationTabs`: Add `animated` prop to enable transition animation. Defaults to false.

## 0.1.1

### Patch Changes

- 70fbe23: Update ts config

## 0.1.0

### Minor Changes

- dcd7532: Add props for NavigationTabs and NavigationTabItem
- 2e2262d: Set up NavigationTabs and NavigationTabItem components
- d343506: NavigationTabs: Update styles to handle different scenarios
