import * as React from "react";
import {figma} from "@figma/code-connect";
import {ActivityIconButton} from "../activity-icon-button";

const FILL_ME = <React.Fragment />;

figma.connect(
    ActivityIconButton,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6072%3A1968",
    {
        props: {
            kind: figma.enum("Kind", {
                Primary: "primary",
                Tertiary: "tertiary",
                Secondary: "secondary",
            }),
            visibleLabel: figma.boolean("Visible Label"),
            label: figma.textContent("Label"),
        },
        example: (props: any) => (
            <ActivityIconButton
                kind={props.kind}
                icon={FILL_ME}
                label={props.label} /* Only include if a visibleLable==true */
            />
        ),
    },
);
