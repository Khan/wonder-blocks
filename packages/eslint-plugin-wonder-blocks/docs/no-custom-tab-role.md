# no-custom-tab-role

Disallow `role="tab"` in favor of the `ResponsiveTabs` component.

## Rule Details

Custom tab implementations using `role="tab"` should be replaced with the
`ResponsiveTabs` component from `@khanacademy/wonder-blocks-tabs`. This ensures
consistent behavior, accessibility, keyboard navigation, and responsive support
across the codebase.

Examples of **incorrect** code:

```tsx
<ul role="tablist">
    <li role="tab">Tab 1</li>
    <li role="tab">Tab 2</li>
</ul>
```

```tsx
<div role="tab">Tab</div>
<button role="tab">Tab</button>
<a role="tab">Tab</a>
```

```tsx
<View role="tab">Tab</View>
<Button role="tab">Tab</Button>
<Clickable role="tab">Tab</Clickable>
<Link role="tab">Tab</Link>
```

```tsx
<StyledButton role="tab">Tab</StyledButton>
<StyledLink role="tab">Tab</StyledLink>
<StyledDiv role="tab">Tab</StyledDiv>
```

Examples of **correct** code:

```tsx
import * as React from "react";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";

function MyTabs() {
    const [selectedTabId, setSelectedTabId] = React.useState("tab-1");

    return (
        <ResponsiveTabs
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
            tabs={[
                {id: "tab-1", label: "Tab 1", panel: <div>Content 1</div>},
                {id: "tab-2", label: "Tab 2", panel: <div>Content 2</div>},
            ]}
            aria-label="My tabs"
        />
    );
}
```
