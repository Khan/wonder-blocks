---
description: Jest testing best practices and patterns for unit tests
applyTo: "**/*.test.ts,**/*.test.tsx"
---

# Wonder Blocks - Jest Testing Best Practices

This guide covers testing patterns and best practices for Jest and React Testing Library in the Wonder Blocks codebase.

## Core Testing Principles

### Critical Setup Rules

**Test Workflow Priority:**
- **Always fix failing tests before fixing linting errors**
- **Focus on underlying errors, not `Unhandled console.error call` messages**
- When tests fail with `Unhandled console.error call`, look for the **root cause error** (e.g., `ReferenceError: window is not defined`)

**File Structure:**
- Name test files with `.test.ts` or `.test.tsx` suffix
- Place in `__tests__/` directory OR colocate with source files

**Test Framework Setup:**
- Additional matchers from RTL and `jest-extended` are available
- Use `describe`/`it` pattern for test organization
- Use `globalThis` prefix when accessing global objects
- **Prioritize testing non-trivial business logic** over trivial implementations

### Arrange-Act-Assert Pattern

**Always use this three-section structure:**

```typescript
describe("Calculator", () => {
    it("should add two numbers correctly", () => {
        // Arrange
        const a = 5;
        const b = 3;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(8);
    });
});
```

**Rules:**
- **Always divide tests** into Arrange, Act, Assert sections with comments
- **Always use separate comments** for each section
- **Never combine sections** (don't write `// Act & Assert`)
- **Never use multiple Act or Assert sections** in a single test
- **Never remove Arrange, Act, Assert comments**

**Exception - Testing Thrown Errors:**

```typescript
it("should throw an error when input is invalid", () => {
    // Arrange
    const invalidInput = "invalid";

    // Act
    const underTest = () => {
        processInput(invalidInput);
    };

    // Assert
    expect(underTest).toThrow("Invalid input");
});
```

### What to Test

**DO Test:**
- Non-trivial business logic - Complex calculations, data transformations, validation
- User interactions - Click handlers, form submissions, keyboard navigation
- Accessibility - ARIA attributes, keyboard support, focus management
- Edge cases and error conditions - Null values, empty states, error handling
- Integration points - API calls, event callbacks, state changes
- Bug fixes - Add tests that reproduce bugs to prevent regressions

**DON'T Test:**
- Trivial implementations - Simple getters/setters, pass-through functions
- Style-only props - Visual appearance covered by Storybook visual regression
- Third-party libraries - Test your usage of them, not the libraries
- Implementation details - Internal state that doesn't affect output/behavior
- Additional logic in tests - Use existing utility functions instead

```typescript
// ❌ DON'T: Testing style-only props
it("should apply primary color when kind is primary", () => {
    render(<Button kind="primary" />);
    expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "blue" });
});

// ✅ DO: Test meaningful behavior
it("should call onClick when clicked", async () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    await userEvent.click(screen.getByRole("button"));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Key Principles

- Test behavior, not implementation
- Prioritize critical paths
- Keep tests simple and readable
- Don't add logic to tests
- Use visual regression tests for styling
- Balance coverage with maintainability

### Assertions

**Best Practices:**
- Use specific matchers (`toBe`, `toEqual`, `toHaveBeenCalledWith`)
- Prefer explicit assertions
- Use RTL semantic matchers: `toBeInTheDocument()`, `toBeVisible()`, `toHaveAttribute()`
- **Avoid Jest snapshots** (`.toMatchSnapshot()`) - use Chromatic + Storybook
- **Avoid direct node access** - Don't use `.parentElement`, `.children`, etc.; use RTL queries

### One Expect Per Test

Prefer a single assertion per test when possible. If assertions test different behaviors, split into separate tests.

### Parameterized Tests with `it.each`

Use for testing same logic with multiple input/output combinations:

```typescript
describe("Calculator", () => {
    it.each([
        [2, 3, 5],
        [0, 0, 0],
        [-1, 1, 0],
        [10, -5, 5],
    ])("should add %i and %i to equal %i", (a, b, expected) => {
        // Arrange & Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(expected);
    });
});
```

**Benefits:**
- Reduces duplication
- Clear test names with specific values
- Easy to extend with new cases
- Essential for testing all prop combinations

## Mocking and Spying

### Critical Rules - Always Follow

1. **Never mock `console.error`** - Hides real implementation issues
2. **Always use `jest.spyOn()` to create spies** - Never treat original function as spy
3. **Store spy return values only when asserting on them** - Avoids unused variable errors
4. **Never mock outside of tests** - Keep mocks inside test cases

### Method Spying - Correct Pattern

**✅ Use jest.spyOn and store result when asserting:**

```typescript
import * as SomeFile from "./some-file.ts";

describe("MyComponent", () => {
    it("should call someMethod with correct args", () => {
        // Arrange
        const spy = jest.spyOn(SomeFile, "someMethod").mockReturnValue(mockValue);

        // Act
        myFunction();

        // Assert
        expect(spy).toHaveBeenCalledWith(expectedArgs);
    });
});
```

**❌ Wrong - treating original as spy without jest.spyOn():**

```typescript
// ❌ This will fail - someMethod is not a spy
expect(SomeFile.someMethod).toHaveBeenCalled();
```

### When to Store Spies in Variables

Spies serve two purposes:
1. **Mocking behavior** - Replace implementation or return value
2. **Verification** - Assert function was called with correct arguments

**Mocking only (no variable needed):**

```typescript
it("should process user data", () => {
    // Arrange
    jest.spyOn(API, "fetchUser").mockResolvedValue(mockUserData);

    // Act
    const result = processUserProfile();

    // Assert
    expect(result.displayName).toBe("John Doe");
});
```

**Mocking AND verification (store in variable):**

```typescript
it("should call analytics when button is clicked", () => {
    // Arrange
    const trackEventSpy = jest
        .spyOn(Analytics, "trackEvent")
        .mockReturnValue(undefined);

    // Act
    userEvent.click(screen.getByRole("button"));

    // Assert
    expect(trackEventSpy).toHaveBeenCalledWith("button_click", {
        buttonId: "submit",
    });
});
```

### Common Spy Patterns

```typescript
// Mock only (no variable)
jest.spyOn(module, "functionName").mockReturnValue(mockValue);
jest.spyOn(module, "asyncFunction").mockResolvedValue(mockValue);
jest.spyOn(module, "asyncFunction").mockRejectedValue(new Error("Test error"));

// Mock and verify (store in variable)
const spy = jest.spyOn(module, "functionName").mockReturnValue(mockValue);
expect(spy).toHaveBeenCalledWith(expectedArgs);

// Spy with mock implementation
const spy = jest.spyOn(module, "functionName").mockImplementation((arg) => {
    return processedValue;
});
```

### Mocking Guidelines

**DO:**
- Use `jest.spyOn()` for mocking and tracking calls
- Store spy return values only when asserting on them
- Chain `.mockReturnValue()` directly when only mocking behavior
- Keep mocks inside test cases when possible
- Use mocking to isolate code under test
- Clean up spies after tests

**DON'T:**
- Never mock `console.error`
- Never treat original functions as spies
- Never store spies if not asserting on them
- Avoid mocking outside of tests

### Hook Testing

Use `renderHook`:

```typescript
import {renderHook} from "@testing-library/react";

const {result} = renderHook(() => useMyHook(params));
```

### User Interactions

**Always use `userEvent`:**

```typescript
import userEvent from "@testing-library/user-event";

// ✅ DO: Use userEvent (realistic, includes focus/blur/typing)
await userEvent.click(screen.getByRole("button"));
await userEvent.type(screen.getByRole("textbox"), "hello");

// ❌ DON'T: Use fireEvent (low-level, less realistic)
fireEvent.click(button);
```

### Browser Behavior and jsdom Limitations

jsdom does not fully implement all browser behaviors. Common limitations: `getBoundingClientRect()`, scroll positions, `offsetWidth`/`offsetHeight`, clipboard API, CSS animations, Intersection/Resize Observers.

**Mock browser APIs in unit tests:**

```typescript
// Mock scrollIntoView
const scrollIntoViewMock = jest.fn();
Element.prototype.scrollIntoView = scrollIntoViewMock;

// Mock getBoundingClientRect
jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: 100, left: 100, bottom: 200, right: 200,
    width: 100, height: 100, x: 100, y: 100, toJSON: () => {},
});
```

Use Storybook interaction tests for behavior difficult to mock accurately.

### Element Selection

**Query priority:**

1. **Semantic queries** (best): `getByRole`, `getByLabelText`, `getByText`
2. **Test IDs** (fallback): `getByTestId` with `data-testid`
3. **Never use**: CSS classes, IDs, structural selectors

```typescript
// ✅ DO: Semantic queries
screen.getByRole("button", {name: /submit/i});
screen.getByLabelText("Email address");
screen.findByText("Welcome back");

// ✅ DO: Test IDs when semantic queries don't work
screen.getByTestId("custom-widget");

// ❌ DON'T: CSS selectors or implementation details
container.querySelector(".my-class");
container.querySelector("#my-id");
```

## Wonder Blocks Component Testing

### Test Organization

Group related tests using `describe` blocks:

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

**Base Tests:**
- ref is forwarded

**Props:**
- Expected behavior when props are set
- **Exclude tests for style-only props** (use visual regression)
- Expected behavior with default prop values
- Use `it.each` for multiple prop combinations

**Event Handlers:**
- Handlers triggered by expected conditions
- Callbacks called with correct arguments

**Accessibility:**
- Roles, semantics, aria attributes correctly set
- Use `.toHaveNoA11yViolations` matcher
- Keyboard interactions and navigation
- Focus management
- Accessible names
- Check for `aria-disabled="true"` (not `disabled` attribute)

## Tools and Commands

### Terminal Commands

```bash
# Run all tests
pnpm jest

# Run tests in watch mode
pnpm jest --watch

# Update snapshots
pnpm jest -u

# Run tests with coverage
pnpm jest --coverage

# Run specific test file
pnpm jest path/to/test-file.test.ts

# Debug with verbose output
pnpm jest --verbose --runInBand
```

### Debugging Priority

- Add `console.log` statements for debugging
- Use `--verbose` flag for detailed output
- Use `--runInBand` for sequential execution
- Use Node debugger with `debugger` statements

## Best Practices Summary

1. **Structure**: Use Arrange-Act-Assert pattern with comments
2. **Focus**: Test behavior, not implementation details
3. **Queries**: Use semantic queries (`getByRole`, `getByLabelText`) over test IDs
4. **Interactions**: Use `userEvent` instead of `fireEvent`
5. **Spies**: Use `jest.spyOn()` and only store in variables when asserting
6. **Accessibility**: Include `toHaveNoA11yViolations` tests
7. **Organization**: Group related tests with `describe` blocks
8. **Assertions**: One expect per test when possible
9. **Parameterized**: Use `it.each` for multiple input/output combinations
10. **Browser APIs**: Mock jsdom limitations properly, or use Storybook interaction tests
11. **Bug Fixes**: Add tests that reproduce bugs to prevent regressions
12. **Avoid**: Testing style-only props, mocking `console.error`, over-testing trivial code
