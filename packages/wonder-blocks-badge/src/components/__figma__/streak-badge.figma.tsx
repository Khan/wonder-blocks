import React from "react";
import figma from "@figma/code-connect";
import {StreakBadge} from "../streak-badge";

figma.connect(
    StreakBadge,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6472%3A1027",
    {
        props: {
            icon: figma.enum("Icon", {
                Off: "off",
                Start: "start",
                "Icon Only": "icon-only",
            }),
            label: figma.textContent("Badge"),
        },

        example: (props) => (
            <StreakBadge
                label={props.label} // DON'T include label prop if icon==="icon-only"
                showIcon={HAS_ICON} // Only include showIcon prop if icon==="start" or "icon-only"
                iconAriaLabel={ICON_ARIA_LABEL} // show if icon=="icon-only" and look for a11y annotation for value
            />
        ),
    },
);
