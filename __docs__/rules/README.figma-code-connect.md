# Figma Code Connect rules

The goal is to map the Wonder Blocks component to the accompanying Figma component using `/__figma__/[component-name].figma.tsx` files.

These files tell the Figma MCP how to extract the vital data from Figma file markup, and then uses that to create an "example" React component string that the coding agent uses for guidance. The `example (props) => {}` function is never executed, and comments within can be used in place of interpreted code.

## Steps

1. Look at the WB component's API / props
2. Discover Figma component props by using the Figma MCP with the figma.com URL specified in the figma.conect() function. If none exists, ALWAYS ask the developer for it
3. Map the WB component props to Figma component props
4. If there aren't clear mappings, first check if there are `nestedProps` that can map or can be translated via the figma API to map
5. In the example function, outputted component props that are conditional should be shown with a comment for the conditional logic to include / exclude
6. Consider if we need multiple variants defined if one Figma component maps to multiple WB components e.g. the Figma "Utility Button" component maps to both  the WB Button and the IconButton. Proper syntax is in the Reference docs below.

## Prop Mapping Reference

Use this table to choose the right `figma.*` method when mapping a Figma component's content areas:

| Method | Use when… |
|---|---|
| `figma.slot("Name")` | The Figma component has a freeform slot — a child frame that accepts any content (text, layers, components). Use this over `figma.children()` when the layer is defined as a slot property on the Figma component. |
| `figma.children("Name")` | Mapping a specific named child layer within the component |
| `figma.instance("Name")` | The Figma component has an instance swap property (maps a specific swappable component instance) |
| `figma.nestedProps("Name", {...})` | Grouping related properties from a nested Figma frame into a single prop namespace |

### `figma.slot()` notes

- Currently in open beta — requires the latest Code Connect CLI
- Code Connect does **not** traverse slot children to generate code; it only renders a clickable label referencing the slot in Dev Mode
- The return value is a standard JSX child and can be placed anywhere in the `example` function

```tsx
figma.connect(Card, "https://...", {
    props: {
        title: figma.string("Title"),
        content: figma.slot("Content"), // "Content" is the slot property name in Figma
    },
    example: (props: any) => (
        <Card title={props.title}>
            {props.content}
        </Card>
    ),
});
```

## Example

``` tsx
// packages/wonder-blocks-accordion/src/components/__figma__/accordion-section.figma.tsx

import * as React from "react";
import {figma} from "@figma/code-connect";
import AccordionSection from "../accordion-section";

figma.connect(
    AccordionSection,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=10108%3A12032",
    {
        props: {
            expanded: figma.boolean("Expanded"),
            content: figma.children("Panel Content"),
            headerProps: figma.nestedProps("Header Style", {
                header: figma.enum("Content Type", {
                    Text: figma.textContent("Text"),
                    Custom: figma.children("Header Content"),
                }),
                caretPosition: figma.enum("Caret Position", {
                    End: "end",
                    Start: "start",
                }),
            }),
            cornerKind: figma.enum("Corner Style", {
                Default: "square",
                "All Round": "rounded",
                "Top Round": "rounded-per-section",
                "Bottom Round": "rounded-per-section",
            }),
        },
        example: (props: any) => (
            // When multiple Figma "Accordion Components are grouped with autolayout, use WB "Accordion" grouping to wrap multiple "AccordionSection"s
            <AccordionSection
                header={props.headerProps.header} // If the value is a simple string, pass the string only. Do not wrap in another component (Typography, etc.)
                caretPosition={props.headerProps.caretPosition}
                expanded={props.expanded}
                cornerKind={props.cornerKind}
            >
                {props.content}
            </AccordionSection>
        ),
    },
);
```

## Reference docs

You can find the full Figma Code Connect API for properly mapping components here:
<https://developers.figma.com/docs/code-connect/react>
