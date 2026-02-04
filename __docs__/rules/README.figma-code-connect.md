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
