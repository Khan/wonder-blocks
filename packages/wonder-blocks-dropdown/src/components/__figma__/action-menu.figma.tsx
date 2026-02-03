import * as React from "react";
import figma from "@figma/code-connect";
import ActionMenu from "../action-menu";
import ActionItem from "../action-item";

const ITEM_SUBTITLE = "detail";
const ITEM_LABEL = "thing2";
const MENU_TEXT = "Menu";
const ALIGNMENT = "left";
const DISABLED = false;

figma.connect(
    ActionMenu,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6422%3A3571",
    {
        props: {
            cellType: figma.enum("Cell Type", {
                Compact: "compact",
                Detail: "detail",
            }),
        },
        example: (props: any) => (
            <ActionMenu
                menuText={MENU_TEXT} // Text of opener
                alignment={ALIGNMENT} // Default: "left" (Any valid Popper placement)
                disabled={DISABLED} // Only include prop if disabled===true
            >
                <ActionItem
                    label={ITEM_LABEL}
                    subtitle2={ITEM_SUBTITLE} // Only include if props.cellType is "detail"
                />
            </ActionMenu>
        ),
    },
);
