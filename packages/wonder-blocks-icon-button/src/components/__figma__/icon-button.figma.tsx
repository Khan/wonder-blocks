import * as React from "react";
import {figma} from "@figma/code-connect";
import {IconButton} from "../icon-button";

const ICON = <React.Fragment />;
const ARIA_LABEL = "aria-label";
const DISABLED = false;

figma.connect(
    IconButton,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5028-166&t=wQ6ve65zEErmoFPI-4",
    {
        props: {
            kind: figma.enum("Kind", {
                Primary: "primary",
                Secondary: "secondary",
                Tertiary: "tertiary",
            }),
        },
        example: (props: any) => (
            <IconButton
                kind={props.kind}
                icon={ICON}
                aria-label={ARIA_LABEL} // Aria labels SHOULD be included via annotation (if not notify developer!)
                disabled={DISABLED} // Only add prop if "Action" mode is "disabled"
            />
        ),
    },
);
