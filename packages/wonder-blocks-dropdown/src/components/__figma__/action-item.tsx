import * as React from "react";
import figma from "@figma/code-connect";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import gear from "@phosphor-icons/core/regular/gear.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import ActionItem from "../action-item";

// Used as examples so the "example" function can be valid JSX. The values will never be read by the agent!
const ITEM_SUBTITLE = "detail";
const START_ACCESSORY = <PhosphorIcon icon={gear} />;
const END_ACCESSORY = <PhosphorIcon icon={caretRight} />;
const ROLE = "menuitem";

figma.connect(
    ActionItem,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6422%3A3571",
    {
        props: {
            hasEyebrow: figma.boolean("Eyebrow"),
            hasSubtitle: figma.boolean("Subtitle"),
            startAccessory: figma.boolean("Start Accessory"),
            endAccessory: figma.boolean("End Accessory"),
            writingDirection: figma.boolean("🔄 Writing Direction"),
            label: figma.text("Text"),
        },
        example: (props: any) => (
            <ActionItem
                label={props.label}
                subtitle2={ITEM_SUBTITLE} // Only include if hasSubtitle===true
                leftAccessory={START_ACCESSORY} // Only include if startAccessory===true
                rightAccessory={END_ACCESSORY} // Only include if endAccessory===true
                role={ROLE} // (ARIA) Default: "menuitem"–Use "option" if within a listbox
            />
        ),
    },
);
