# Wonder Blocks - Storybook Best Practices

This guide covers conventions and best practices for creating Storybook stories (`.stories.tsx` or `.stories.ts`) in the Wonder Blocks design system.

## TypeScript Types

Define story types consistently (avoid `any`):

```tsx
type StoryComponentType = StoryObj<typeof Component>;

export const Default: StoryComponentType = {
    args: {
        // props here
    },
};
```

## Default Export Configuration

### Meta Configuration

Include all relevant meta properties:

```tsx
export default {
    title: "Packages / ComponentName / SubComponent",
    component: ComponentName,
    subcomponents: {SubComponent1, SubComponent2}, // If applicable
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: false, // or true with reason
        },
    },
    argTypes: ComponentArgTypes,
    args: {
        // Default args for all stories
    },
    decorators: [
        // Optional decorators
    ],
} as Meta<typeof ComponentName>;
```

**Key properties:**
- **`title`**: Hierarchical path in Storybook sidebar
- **`component`**: The main component being documented
- **`subcomponents`**: Related components shown in docs
- **`parameters`**: Meta-level configuration (Chromatic, a11y, etc.)
- **`argTypes`**: Control definitions (usually imported from separate file)
- **`args`**: Default values applied to all stories
- **`decorators`**: Layout wrappers applied to all stories

### Title Naming Convention

Follow the hierarchy (avoid flat titles):

```tsx
title: "Packages / Button / Button"
title: "Packages / Dropdown / SingleSelect"
title: "Packages / Button / Testing / Snapshots / ActivityButton"
```

## Story Patterns

### General Tips

- The Default story should be interactive and work with Storybook controls
- Write stories for all possible prop combinations/states
- Disable Chromatic for stories that don't need visual regression tests (limited monthly snapshots)
- Avoid specific background colors in Stories; let users control via Storybook toolbar

### Basic Story Structure

Export stories with descriptive JSDoc comments:

```tsx
/**
 * This is the default state of the button showing standard usage.
 * It demonstrates the basic props and expected behavior.
 */
export const Default: StoryComponentType = {
    args: {
        children: "Click me",
        onClick: () => {},
    },
};
```

### Interactive Stories with State

Use render functions for stateful stories:

```tsx
export const WithState: StoryComponentType = {
    render: function Render(args) {
        const [value, setValue] = React.useState(args.value || "");

        return (
            <Component
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        // initial args
    },
};
```

**Important: Use function declarations, not arrow functions:**

```tsx
// ✅ Good - Named function for better debugging
render: function Render(args) {
    // ...
}

// ❌ Avoid - Arrow functions don't have clear names
render: (args) => {
    // ...
}
```

### Variant Stories

Show different variants in a single story:

```tsx
/**
 * Buttons have three kinds: `primary` (default), `secondary`, and `tertiary`.
 */
export const Kinds: StoryComponentType = {
    render: () => (
        <View style={{gap: spacing.medium_16}}>
            <Button onClick={() => {}}>Primary</Button>
            <Button kind="secondary" onClick={() => {}}>Secondary</Button>
            <Button kind="tertiary" onClick={() => {}}>Tertiary</Button>
        </View>
    ),
};
```

## JSDoc Documentation

### Story Comments

Include comprehensive JSDoc comments:

```tsx
/**
 * This example demonstrates how SingleSelect behaves with an initial value.
 * The screen reader will not announce the initial value on mount, but will
 * announce when the value changes through user interaction.
 */
export const WithInitialValue: StoryComponentType = {
    // story configuration
};
```

### Prop Documentation

- Props table on autodocs page is extracted from JSDoc comments on component props
- Override auto-generated types in an `argTypes.ts` file when not helpful
- Group props into categories: `Visual style`, `Events`, `Accessibility`

### ArgTypes Files

Create an argTypes file for your component:

```tsx
// __docs__/wonder-blocks-button/button.argtypes.ts
import type {ArgTypes} from "@storybook/react-vite";

export default {
    // Override type display for union types
    kind: {
        control: {type: "select"},
        options: ["primary", "secondary", "tertiary"],
        table: {
            category: "Visual style",
            type: {summary: `"primary" | "secondary" | "tertiary"`},
            defaultValue: {summary: `"primary"`},
        },
    },
    // Group related props
    size: {
        control: {type: "select"},
        table: {
            category: "Layout",
            type: {summary: `"medium" | "small" | "large"`},
        },
    },
    // Improve descriptions for complex props
    style: {
        table: {
            category: "Layout",
            type: {summary: "StyleType"},
        },
    },
} satisfies ArgTypes;
```

Use argTypes in your story's meta:

```tsx
import ComponentArgTypes from "./component.argtypes";

export default {
    title: "Packages / Component",
    component: Component,
    argTypes: ComponentArgTypes,
} as Meta<typeof Component>;
```

**Common argTypes configurations:**

| Property | Purpose |
|----------|---------|
| `control.type` | Control widget (`"select"`, `"boolean"`, `"text"`, etc.) |
| `options` | Available options for select controls |
| `table.category` | Group props in the docs table |
| `table.type.summary` | Override the displayed type |
| `table.defaultValue.summary` | Show default value in docs |
| `mapping` | Map control values to actual prop values |

### Accessibility Guidelines Documentation

- Document what's been implemented for accessibility
- Create separate pages to describe accessibility for a component
- Examples: Accordion Accessibility, Combobox Accessibility, TextArea Accessibility

## Parameters Configuration

### Chromatic Configuration

Disable snapshots with clear reasoning:

```tsx
export const Interactive: StoryComponentType = {
    render: () => {/* ... */},
    parameters: {
        chromatic: {
            // Disabling because this is for manual testing purposes
            disableSnapshot: true,
        },
    },
};
```

Configure snapshot timing when needed:

```tsx
export const ControlledOpened: StoryComponentType = {
    render: (args) => <Component {...args} />,
    parameters: {
        // Added to ensure that the dropdown menu is rendered using PopperJS.
        chromatic: {delay: 500},
    },
};
```

Enable snapshots for important visual states:

```tsx
export const WithIcon: StoryComponentType = {
    render: () => <IconExample />,
    parameters: {
        chromatic: {
            modes: themeModes, // Test in multiple themes
        },
    },
};
```

### Theme Modes Configuration

Theme modes allow Chromatic to capture snapshots in multiple themes:

```tsx
import {themeModes} from "../../.storybook/modes";

export default {
    title: "Packages / Component / Testing / Snapshots",
    parameters: {
        chromatic: {
            modes: themeModes, // Captures snapshots in all themes
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof Component>;
```

**Use theme modes sparingly** - Each mode multiplies Chromatic snapshots. Only add to snapshot stories testing theming or visual appearance.

## Testing-Specific Stories

### Snapshot Stories

Create dedicated snapshot stories:

```tsx
/**
 * The following stories are used to generate the pseudo states for the
 * ActivityButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Button / Testing / Snapshots / ActivityButton",
    tags: ["!autodocs"], // Exclude from auto-generated docs
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
} as Meta;
```

### StateSheet for Pseudo-State Testing

Use StateSheet for Chromatic visual regression:

```tsx
const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
    {name: "Disabled", props: {disabled: true}},
];

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
        pseudo: defaultPseudoStates, // Includes focus, hover, active states
    },
};
```

StateSheet stories should cover: focus (`:focus-visible`), hover, active, disabled states, and relevant prop combinations.

### Scenario Stories

Test edge cases with ScenariosLayout:

```tsx
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {name: "Long label", props: {children: <Component>{longText}</Component>}},
            {name: "RTL", decorator: <div dir="rtl" />, props: {children: <Component>یہ اردو میں لکھا ہے۔</Component>}},
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => props.children}
            </ScenariosLayout>
        );
    },
};
```

Scenario stories should include: RTL layouts, custom style overrides, edge cases (long text, overflow, truncation, empty states).

### Playtesting Stories

Create playtesting stories for specific behaviors:

```tsx
export default {
    title: "Packages / Component / Testing / Component - Playtesting",
    parameters: {
        chromatic: {disableSnapshot: true}, // For testing purposes only
    },
} as Meta<typeof Component>;

/**
 * Describe the scenario and what to test manually.
 * Example: "When selecting a tab with Space/Enter, the page should not scroll."
 */
export const ScrollBehavior: Story = {
    render: (args) => (
        // Set up the scenario for manual testing
    ),
};
```

**Good candidates for playtesting:**
- Scroll behavior difficult to assert programmatically
- Complex keyboard interactions across multiple components
- Browser-specific edge cases
- Scenarios requiring visual confirmation by a human

Playtesting stories should: disable Chromatic, include clear JSDoc explaining what to test, use `Testing / Component - Playtesting` title pattern.

## Story Naming Conventions

Use clear, descriptive names:

```tsx
// ✅ Good - Clear and descriptive
export const Default: StoryComponentType = {/* ... */};
export const WithIcon: StoryComponentType = {/* ... */};
export const Disabled: StoryComponentType = {/* ... */};
export const LongOptionLabels: StoryComponentType = {/* ... */};
export const ErrorFromValidation: StoryComponentType = {/* ... */};
```

Override story names when needed:

```tsx
export const WithRouter: StoryComponentType = {
    name: "Navigation with React Router", // Overrides story name in UI
    render: () => {/* ... */},
};
```

## Actions and Event Handlers

Use storybook actions for event logging:

```tsx
import {action} from "storybook/actions";

export const Default: StoryComponentType = {
    args: {
        onClick: action("clicked"),
        onChange: action("changed"),
    },
};
```

For stateful stories, combine actions with state updates.

## Interaction Tests for Browser-Specific Behavior

Use Storybook interaction tests for behaviors relying on real browser APIs not available in jsdom (scroll, layout/geometry, clipboard, complex focus management).

**Don't test styling in interaction tests** - visual appearance is covered by Chromatic snapshot tests.

Use the `play` function:

```tsx
import {expect, within} from "storybook/test";

export const BrowserBehaviorTest: StoryComponentType = {
    render: (args) => (
        // Set up the DOM structure needed to test the behavior
    ),
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Interact with the component (if needed)

        // Assert things based on browser-specific behavior
        // (e.g., ResizeObserver, getBoundingClientRect, scrollIntoView)
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};
```

## Common Pitfalls to Avoid

- ❌ **Don't mix testing snapshots with documentation stories** - Use `title: "Packages / Button / Testing / Snapshots"` with `tags: ["!autodocs"]`
- ❌ **Don't forget to disable snapshots** - Add `chromatic: {disableSnapshot: true}` for interaction tests and playtesting
- ❌ **Don't use `React.FC`** - Use `(props: Props) =>` instead

## Best Practices Summary

1. **Structure**: Follow consistent import order and file organization
2. **Types**: Use TypeScript types for story definitions
3. **Documentation**: Include comprehensive JSDoc comments with usage examples
4. **Variants**: Show all important component variants
5. **Accessibility**: Test and document a11y considerations
6. **Visual Testing**: Configure Chromatic appropriately
7. **State Management**: Use proper patterns for stateful stories
8. **Naming**: Use clear, descriptive names for stories
9. **Tokens**: Use Wonder Blocks tokens instead of hard-coded values
10. **Testing**: Separate documentation, snapshot, interaction, and playtesting stories
11. **Interaction Tests**: Use `play` functions for browser-specific behavior
12. **Playtesting**: Create manual testing stories for behaviors difficult to automate
