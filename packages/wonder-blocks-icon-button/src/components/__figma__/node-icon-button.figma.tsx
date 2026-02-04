import * as React from "react";
import {figma} from "@figma/code-connect";
import {NodeIconButton} from "../node-icon-button";

const ICON = <React.Fragment />;
const ARIA_LABEL = "aria-label";

figma.connect(
    NodeIconButton,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9599%3A6411",
    {
        props: {},
        example: () => <NodeIconButton aria-label={ARIA_LABEL} icon={ICON} />,
    },
);
