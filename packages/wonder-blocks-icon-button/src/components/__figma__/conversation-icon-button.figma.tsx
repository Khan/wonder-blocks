import * as React from "react";
import {figma} from "@figma/code-connect";
import {ConversationIconButton} from "../conversation-icon-button";

const ICON = <React.Fragment />;
const ACTION_TYPE = figma.enum("Action Type", {
    Progressive: "progressive",
    Neutral: "neutral",
});
const ARIA_LABEL = "aria-label";

figma.connect(
    ConversationIconButton,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6160%3A1174",
    {
        props: {
            kind: figma.enum("Kind", {
                Primary: "primary",
                Secondary: "secondary",
            }),
        },
        example: (props: any) => (
            <ConversationIconButton
                actionType={ACTION_TYPE} /* Infer actionType by button color */
                icon={ICON}
                aria-label={ARIA_LABEL} /* Infer aria-label by context */
            />
        ),
    },
);
