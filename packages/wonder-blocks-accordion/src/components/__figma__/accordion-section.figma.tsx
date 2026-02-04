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
