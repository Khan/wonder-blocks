import React from "react";
import figma from "@figma/code-connect";
import {NeutralBadge} from "../neutral-badge";

const HAS_ICON = true;
const ICON_ARIA_LABEL = "";
const ICON_ELEMENT = <React.Fragment />;

figma.connect(
    NeutralBadge,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9817%3A7328",
    {
        props: {
            label: figma.textContent("Badge"),
            showBorder: figma.boolean("Border"),
            icon: figma.instance("Instance"),
        },
        example: (props) => (
            <NeutralBadge
                showBorder={props.showBorder} // Only include attr if props.showBorder==false (default is true)
                label={props.label} // DON'T include attr if icon==="icon-only"
                showIcon={HAS_ICON} // include attr if icon==="start" or "icon-only"
                icon={ICON_ELEMENT} // include attr if icon==="start" or "icon-only" - look for Phosphor icon in props.icon
                iconAriaLabel={ICON_ARIA_LABEL} // include attr if icon=="icon-only" and look for a11y annotation for value
            />
        ),
    },
);
