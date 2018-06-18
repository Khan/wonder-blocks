// @flow
// A menu that consists of action items

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

// import ActionItem from "./action-item.js";
// import SelectItem from "./select-item.js";
// import SeparatorItem from "./separator-item.js";
//
// type MenuItem = ActionItem | SelectItem | SeparatorItem;

type DropdownCoreProps = {
    /**
     * Items for the menu.
     */
    items: Array<React.Node>,
    /**
     * Whether the menu is open or not.
     */
    open: boolean,
    /**
     * The component that opens the menu.
     */
    opener: React.Node,
    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    // TODO: make this work
    alignment?: "left" | "right",
    /**
     * Optional styling to add.
     */
    style?: any,
};

export default class DropdownCore extends React.Component<DropdownCoreProps> {
    static defaultProps = {
        alignment: "left",
    };

    render() {
        const {
            // alignment,
            items,
            open,
            opener,
            style,
        } = this.props;

        return (
            <View style={style}>
                {opener}
                {open &&
                    items && <View style={[styles.dropdown]}>{items}</View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdown: {
        borderRadius: 4,
        marginTop: Spacing.xxxSmall,
        marginBottom: Spacing.xxxSmall,
        paddingTop: Spacing.xxxSmall,
        paddingBottom: Spacing.xxxSmall,
        border: `solid 1px ${Color.offBlack16}`,
        boxShadow: `0px 8px 8px 0px ${Color.offBlack10}`,
    },
});
