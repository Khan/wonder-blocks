# Wonder Blocks Design System

This file provides instructions for Claude when working on the Wonder Blocks design system codebase.

## Technology Stack

- **Language**: TypeScript (Strict mode enforced)
- **Framework**: React (Functional Components and Hooks)
- **Styling**: Aphrodite (`aphrodite`) for CSS-in-JS with Wonder Blocks tokens (`@khanacademy/wonder-blocks-tokens`)
- **State Management**: Local state (`useState`) and React Context API (`useContext`)
- **Data Fetching**: There should be no data fetching in the design system UI components
- **Routing**: Design system components with link functionality should also support React-Router routes
- **Testing**: Jest, React Testing Library (RTL), `@testing-library/user-event`, Storybook
- **Package Manager**: pnpm

## Coding Conventions

### File & Export Naming

- Use kebab-case for files and directories (e.g., `activity-button.tsx`, `utils.ts`)
- Test files: `*.test.ts(x)`
- Storybook files: `*.stories.tsx`
- PascalCase for React components and types (e.g., `Button`, `type ButtonProps`)
- camelCase for functions, variables, hooks (e.g., `getButtonProps`, `useButtonFunctionality`)

### TypeScript

- Use `strict` mode
- Define clear interfaces/types. Use `type` for props and state, `interface` for shared structures where appropriate
- Use utility types (`Partial`, `Omit`, `Pick`, `Readonly`, etc.)
- Use the `satisfies` operator for type-safe object literals
- Prefer type-only imports: `import type {...}` for types
- **Avoid `any`**; use `unknown` or specific types instead

### React

- **Imports**: Always use `import * as React from "react"` (required for JSX transformation)
- Use functional components and hooks (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`)
- Define explicit `Props` types with object destructuring. Pass complex objects/callbacks with stable references (`useCallback`, `useMemo`) if they are dependencies of effects or memoized children
- Keep component state minimal. Lift state up when necessary
- Provide stable `key` props for lists (use item IDs if available)
- Build complex UI by composing smaller Wonder Blocks when possible
- Use `React.forwardRef` when components need to expose DOM refs
- Extract reusable logic into custom hooks (e.g., `useFieldValidation`, `useIsMounted` from `@khanacademy/wonder-blocks-core`)
- Event Handlers: Internal handlers prefixed with `handle` (e.g., `handleClick`), callback props prefixed with `on` (e.g., `onClick`)
- **Don't use `React.FC<Props>`**, use `(props: Props) =>` instead
- **Avoid creating new class components**

**Class to Functional Migration**: When converting class components to functional components, if there is a `componentWillUnmount` method, the corresponding `useEffect` should either not have any dependencies or should call the `isMounted` function returned by `useIsMounted` from `@khanacademy/wonder-blocks-core`.

### Styling (Aphrodite)

- Define styles using `StyleSheet.create` from `aphrodite`. Colocate styles with the component
- Use `addStyle` from `@khanacademy/wonder-blocks-core` to create styled HTML elements
- Use semantic color tokens from `@khanacademy/wonder-blocks-tokens` (e.g., `semanticColor.core.background.base`)
- Use the `focusStyles` utility from `@khanacademy/wonder-blocks-styles` for focus indicators
- **Avoid using primitive `color` tokens**; use `semanticColor` tokens instead

### Wonder Blocks Usage

- Use `View` from `@khanacademy/wonder-blocks-core` for layout containers instead of plain divs
- Use React's `useId` hook to generate unique ids (not the deprecated `Id` component)
- Use `Heading` and `BodyText` from `@khanacademy/wonder-blocks-typography` for text
- Import Phosphor icons from `@phosphor-icons/core` (e.g., `import plusIcon from "@phosphor-icons/core/regular/plus.svg"`) and use `PhosphorIcon` from `@khanacademy/wonder-blocks-icon`
- **Avoid deprecated components** like `Strut`

### Imports

- Organize imports: React, third-party libs, internal absolute paths (`@khan/`, `@khanacademy/`), relative paths (`./`, `../`)
- Use absolute paths for cross-package imports

### Linting & Formatting

- Strictly adhere to ESLint and Prettier
- The project enforces import order: React, third-party libs, then internal imports
- JSDoc comments should be used for complex functions, but TypeScript types are preferred over JSDoc type annotations
- **Never remove existing comments** that are used to provide context
- Run `pnpm lint` before submitting changes

## Component Design

### Composition vs Configuration

- **Configuration (Preferred)**: Components accept props that control rendering
  - Example: `Button` has `startIcon` and `endIcon` props rather than children
  - Use when: Precise control over styling, positioning, or behavior of child elements
- **Composition**: Components accept other components as children
  - Example: `SingleSelect` with `OptionItem` components as children
  - Use when: Component contains many similar items or flexibility in structure is needed

### Controlled vs Uncontrolled

- **Controlled**: Parent passes `value` and `onChange` props (e.g., `TextField`, `TextArea`)
- **Uncontrolled**: State lives in the component itself (e.g., `Accordion`)
- **Both**: Support both by making `value` and `onChange` optional (e.g., `Modal`, `Popover`)

### Common Props Patterns

**General Props:**
- `id?: string` - Unique identifier (auto-generated with `useId` if not provided)
- `testId?: string` - Test ID for e2e testing
- `ref?: React.Ref<T>` - Reference to DOM element (use `React.forwardRef`)
- `kind?: string` - Variant type (e.g., `'primary' | 'secondary' | 'tertiary'`)
- `value?: T` - The value of the component (for form components)
- `disabled?: boolean` - Disabled state
- `autoFocus?: boolean` - Focus on page load
- `labels?: CustomLabelsType` - Custom labels for i18n
- `initialFocusRef?: Ref | null` - Element to receive initial focus (prefer refs over element ids)

**ARIA-related Props:**
- If a component supports ARIA props, include `AriaProps` type with component props
- `AriaProps` includes: `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, etc.
- Examples: `Breadcrumbs`, `TextField`

**Styling Props:**
- `style?: StyleType` - Custom styles for root element
- `styles?: {root?, icon?}` - Custom styles for multiple elements
- `size?: SizeUnion` - Component size (e.g., `'small' | 'medium' | 'large'`)
- `animated?: boolean` - Enable animations (defaults to `false`)
- `icon?: ReactElement` - Supports both PhosphorIcon and Icon components

**Event Handler Props:**
- `onChange?: (value: T) => void` - Value change (uses value, not event)
- `onClick`, `onKeyDown`, `onKeyUp`, `onFocus`, `onBlur` - Standard React event handlers with appropriate event types

**Validation Props (Form Components):**
- `validate?: (value: T) => string | null | void` - Returns error message or null
- `onValidate?: (errorMessage: string | null) => void` - Validation callback
- `error?: boolean` - Error state

### Component States

**Disabled State:**
- Use `aria-disabled` attribute instead of `disabled` to keep components focusable
- Apply `cursor: not-allowed` for disabled elements
- Allow disabled elements to receive focus and blur events
- **Don't use the `disabled` attribute** (it removes from focus order)

**Focused State:**
- Use `:focus-visible` instead of `:focus` for focus indicators
- Use `focusStyles` utility from `@khanacademy/wonder-blocks-styles`
- **Avoid using `box-shadow`** for focus indicators

**Other States:**
- **Hover**: Style appropriately; consider in combination with other states
- **Active/Pressed**: Use CSS `:active` pseudo-class instead of JavaScript state tracking
- **Readonly**: Prevent editing but allow focus and selection
- **Error/Invalid**: Provide clear visual indication of validation errors
- **Browser Inconsistencies**: Test across browsers; use CSS normalization where needed

Use CSS pseudo-classes (`:hover`, `:focus-visible`, `:active`) for state styling instead of JavaScript state tracking. This enables browser dev tools debugging and Storybook Pseudo States add-on for visual regression tests.

## Accessibility (a11y)

- Use semantic HTML or appropriate ARIA roles/attributes
- Ensure keyboard navigation and focus indicators work correctly
- Use `aria-disabled` instead of `disabled` attribute
- Prefer visual text for accessible names; use `aria-label` or `aria-labelledby` where necessary
- Animations disabled by default, enabled with `animated` prop
- Components must work with screen readers and keyboard navigation
- Use logical CSS properties for RTL support

**Reference patterns:**
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11Y Style Guide](https://a11y-style-guide.com/)
- [MagentaA11y](https://www.magentaa11y.com/)

## Documentation

We document Wonder Blocks components using Storybook. Documentation includes:

### Prop Documentation

- Document all public props using JSDoc comments (`/** ... */`)
- The props table on the autodocs page for Storybook should be extracted from the JSDoc comments on the props for a component
- Provide clear descriptions for each prop, especially for complex or non-obvious props
- Include default values and usage examples where helpful
- If the auto-generated type for a prop is not helpful (e.g., something generic like `"union"`), the type can be overridden in an `argTypes.ts` file
- Props in the table can be grouped into categories like `Visual style`, `Events`, `Accessibility`
- Main component should have a JSDoc comment describing its purpose and basic usage

### Examples in Stories

- The stories should showcase the different ways a component can be used
- The comment block before a story declaration can be used to document more about a specific prop or behavior highlighted in the example
- Snapshot stories should include scenarios and state sheets for showing the different variations and states of a component

### Accessibility Guidelines and Descriptions

- Document what's been implemented in the component for accessibility
- Create separate pages in Storybook to describe the accessibility for a component (examples: Accordion Accessibility, Combobox Accessibility, TextArea Accessibility)

## Package Structure

```
packages/wonder-blocks-*/
├── src/
│   ├── index.ts              # Package entry point (exports public API)
│   ├── components/
│   │   ├── component-name.tsx
│   │   └── __tests__/
│   │       └── component-name.test.tsx
│   └── util/
└── package.json
```

- Stories: `__docs__/*.stories.tsx` (root `__docs__` folder)
- Export components as **named exports** (not default exports)

---

# Storybook Best Practices

## Story Structure

```tsx
type StoryComponentType = StoryObj<typeof Component>;

export default {
    title: "Packages / ComponentName / SubComponent",
    component: ComponentName,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
    argTypes: ComponentArgTypes,
} as Meta<typeof ComponentName>;

/**
 * JSDoc comment describing this story.
 */
export const Default: StoryComponentType = {
    args: {
        children: "Click me",
        onClick: () => {},
    },
};
```

## Key Guidelines

- The Default story should be interactive and work with Storybook controls
- Write stories for all possible prop combinations/states
- Disable Chromatic for stories that don't need visual regression tests (limited monthly snapshots)
- Avoid specific background colors in Stories; let users control via Storybook toolbar

### Stateful Stories

Use function declarations for render functions:

```tsx
export const WithState: StoryComponentType = {
    render: function Render(args) {
        const [value, setValue] = React.useState(args.value || "");
        return <Component {...args} value={value} onChange={setValue} />;
    },
};
```

## Title Naming Convention

```tsx
title: "Packages / Button / Button"
title: "Packages / Dropdown / SingleSelect"
title: "Packages / Button / Testing / Snapshots / ActivityButton"
```

## Snapshot Stories for Visual Regression

**StateSheet** for pseudo-state testing:

```tsx
export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => (
        <StateSheet rows={kinds} columns={actionTypes} title="Kind / Action Type">
            {({props, className}) => (
                <Component {...args} {...props} className={className} />
            )}
        </StateSheet>
    ),
    parameters: {
        pseudo: defaultPseudoStates, // focus, hover, active states
    },
};
```

**ScenariosLayout** for edge cases:

```tsx
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {name: "Long label", props: {children: longText}},
            {name: "RTL", decorator: <div dir="rtl" />, props: {children: "یہ اردو میں"}},
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => props.children}
            </ScenariosLayout>
        );
    },
};
```

## Interaction Tests

Use `play` functions for browser-specific behavior that jsdom can't handle:

```tsx
import {expect, within} from "storybook/test";

export const BrowserBehaviorTest: StoryComponentType = {
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        // Test scroll, layout, clipboard, complex focus
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};
```

## Actions and Event Handlers

Use Storybook actions for event logging:

```tsx
import {action} from "storybook/actions";

export const Default: StoryComponentType = {
    args: {
        onClick: action("clicked"),
        onChange: action("changed"),
    },
};
```

For stateful stories, combine actions with state updates:
`action("onChange")(newValue); setValue(newValue);`

---

# Jest Testing Best Practices

## Core Principles

### Critical Setup Rules

**Test Workflow Priority:**
- Always fix failing tests before fixing linting errors
- Focus on underlying errors, not `Unhandled console.error call` messages
- When tests fail with `Unhandled console.error call`, look for the root cause error (e.g., `ReferenceError: window is not defined`)

### Arrange-Act-Assert Pattern

**Always use this structure with comments:**

```typescript
it("should add two numbers correctly", () => {
    // Arrange
    const a = 5;
    const b = 3;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(8);
});
```

- **Never combine sections** (don't write `// Act & Assert`)
- **Never use multiple Act or Assert sections** in a single test
- **Never remove Arrange, Act, Assert comments**

### Testing Thrown Errors

```typescript
it("should throw an error when input is invalid", () => {
    // Arrange
    const invalidInput = "invalid";

    // Act
    const underTest = () => processInput(invalidInput);

    // Assert
    expect(underTest).toThrow("Invalid input");
});
```

### What to Test

**DO Test:**
- Non-trivial business logic
- User interactions
- Accessibility (ARIA attributes, keyboard support, focus management)
- Edge cases and error conditions
- Bug fixes (add regression tests)

**DON'T Test:**
- Trivial implementations (simple getters/setters)
- Style-only props (use visual regression tests)
- Third-party libraries
- Implementation details

### Element Selection Priority

1. **Semantic queries** (best): `getByRole`, `getByLabelText`, `getByText`
2. **Test IDs** (fallback): `getByTestId`
3. **Never use**: CSS classes, IDs, structural selectors, direct node access (`.parentElement`, `.children`, etc.)

```typescript
// ✅ Good
screen.getByRole("button", {name: /submit/i});
screen.getByLabelText("Email address");

// ❌ Bad
container.querySelector(".my-class");
```

### User Interactions

**Always use `userEvent`** instead of `fireEvent`:

```typescript
import userEvent from "@testing-library/user-event";

await userEvent.click(screen.getByRole("button"));
await userEvent.type(screen.getByRole("textbox"), "hello");
```

## Mocking and Spying

### Critical Rules

1. **Never mock `console.error`** - hides real issues
2. **Always use `jest.spyOn()` to create spies** - never treat original functions as spies
3. **Store spy return values only when asserting on them** - avoids unused variable errors
4. **Never mock outside of tests** - keep mocks inside test cases

### Correct Patterns

```typescript
// ✅ Mock only (no variable needed when not asserting)
jest.spyOn(API, "fetchUser").mockResolvedValue(mockUserData);

// ✅ Mock AND verify (store when asserting)
const trackEventSpy = jest.spyOn(Analytics, "trackEvent").mockReturnValue(undefined);
expect(trackEventSpy).toHaveBeenCalledWith("button_click", {buttonId: "submit"});

// ❌ Wrong - treating original as spy without jest.spyOn()
expect(SomeFile.someMethod).toHaveBeenCalled(); // ERROR! Not a spy
```

### Mock Browser APIs

jsdom doesn't fully implement browser behaviors (scroll, layout, clipboard, Observers):

```typescript
// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getBoundingClientRect
jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: 100, left: 100, bottom: 200, right: 200,
    width: 100, height: 100, x: 100, y: 100, toJSON: () => {},
});
```

Use Storybook interaction tests for behavior that's difficult to mock accurately.

## Test Organization

```typescript
describe("MyComponent", () => {
    describe("Props", () => { /* prop tests */ });
    describe("Event Handlers", () => { /* onClick, onChange tests */ });
    describe("Accessibility", () => {
        describe("axe", () => { /* toHaveNoA11yViolations tests */ });
        describe("ARIA", () => { /* aria attribute tests */ });
        describe("Focus", () => { /* focus management tests */ });
        describe("Keyboard Interactions", () => { /* keyboard nav tests */ });
    });
});
```

### Test Coverage

Unit tests for a component should cover:

#### Base Tests
- ref is forwarded

#### Props
- Cover expected behaviour when certain props are set
- **Exclude tests for props that are related to styles only** - use visual regression tests instead
- Cover expected behaviour with default prop values
- Use `it.each` when there are multiple combinations of things you want to test together

#### Event Handlers
- Check that any event handlers are triggered by the expected conditions
- Verify callbacks are called with correct arguments

#### Accessibility
- Confirm that roles, semantics, and aria attributes are correctly set and wired together
- Use the `.toHaveNoA11yViolations` jest matcher to confirm that a component doesn't have accessibility warnings
- Confirm keyboard interactions and navigation
- Focus management
- Confirm accessible names
- Check for `aria-disabled="true"` for determining disabled state (not the `disabled` attribute)

## Parameterized Tests

Use `it.each` for data-driven tests:

```typescript
it.each([
    [2, 3, 5],
    [0, 0, 0],
    [-1, 1, 0],
])("should add %i and %i to equal %i", (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
});
```

## Assertions

- Use specific matchers: `toBe`, `toEqual`, `toHaveBeenCalledWith`
- Use RTL matchers: `toBeInTheDocument()`, `toBeVisible()`, `toHaveAttribute()`
- **Avoid Jest snapshots** (`.toMatchSnapshot()`) - use Chromatic + Storybook for visual regression
- Prefer one expect per test when possible

---

# Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start dev server (Storybook) |
| `pnpm install` | Install/update dependencies |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint check |
| `pnpm typecheck` | Type check |
| `pnpm test` | Run tests |
| `pnpm build:storybook` | Build Storybook |
| `pnpm test:storybook` | Run Storybook tests with a11y checks |
| `pnpm changeset` | Create a changeset |
| `pnpm changeset --empty` | Empty changeset (tests, stories, tooling changes) |

**Don't use `pnpx` or `npx` to run commands.**

---

# Versioning & Publishing

Wonder Blocks follows [Semantic Versioning 2.0.0](https://semver.org/):

| Version | When to Use | Example |
|---------|-------------|---------|
| **Major** (`X.0.0`) | Breaking changes | Renaming a prop from `enabled` to `disabled` |
| **Minor** (`0.X.0`) | New features (backward compatible) | Adding a new `error` prop |
| **Patch** (`0.0.X`) | Bug fixes, internal changes | Fixing border color, upgrading dependencies |

If consumers must change their code for Wonder Blocks to work, it should be a major change.

Don't hesitate to bump major or minor versions when appropriate—following semver correctly is more valuable than trying to minimize version number changes.

---

# Cross-Platform Rule Synchronization

**CRITICAL: Keep AI assistant rules in sync across platforms.**

This project maintains rules for multiple AI assistants. When updating this file, also update the corresponding files for other platforms:

| Claude File | Cursor File | Copilot File |
|-------------|-------------|--------------|
| `CLAUDE.md` | `.cursor/rules/general.mdc` | `.github/instructions/frontend-rules.instructions.md` |
| `CLAUDE.md` (Storybook section) | `.cursor/rules/storybook.mdc` | `.github/instructions/storybook.instructions.md` |
| `CLAUDE.md` (Jest section) | `.cursor/rules/unit-tests.mdc` | `.github/instructions/unit-tests.instructions.md` |

**When making rule changes:**

1. Make the change in this `CLAUDE.md` file
2. Apply the same change to the corresponding `.cursor/rules/*.mdc` file for Cursor
3. Apply the same change to the corresponding `.github/instructions/*.instructions.md` file for Copilot

**Keep content semantically equivalent:**

- The exact formatting may differ between platforms
- The core rules and guidance should remain consistent
- Cursor rules use YAML frontmatter with glob patterns
- Copilot instructions use standard Markdown in `.github/instructions/`
- This `CLAUDE.md` is a consolidated file with all major rules

**Never update only one platform's rules** - this causes inconsistent behavior between AI assistants.

---

# Best Practices Summary

1. **TypeScript**: Use strict mode, avoid `any`, prefer type-only imports
2. **React**: Use functional components and hooks, avoid `React.FC`
3. **Styling**: Use semantic color tokens and `StyleSheet.create` from Aphrodite
4. **Accessibility**: Use `aria-disabled` instead of `disabled`, ensure keyboard navigation works
5. **Components**: Small, single-responsibility, with proper TypeScript types
6. **Props**: Follow common patterns (`id`, `testId`, `disabled`, `onChange`, etc.)
7. **States**: Use CSS pseudo-classes for hover/focus/active styling
8. **Documentation**: JSDoc comments for props, Storybook stories for examples
9. **Testing**: Jest + RTL for behavior, Storybook for visual regression
10. **Tokens**: Use `semanticColor`, `font`, and `sizing` from `@khanacademy/wonder-blocks-tokens`
