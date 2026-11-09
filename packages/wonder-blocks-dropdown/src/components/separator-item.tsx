// Separator item in a dropdown, used to denote a semantic break.
// Actualized as a horizontal line with surrounding whitespace. -----

import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * A separator used in a dropdown menu.
 */
export default class SeparatorItem extends React.Component<{
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;
}> {
    /**
     * Check whether the given value is a `SeparatorItem` element.
     *
     * @param instance The value to check, e.g. a child of a dropdown.
     * @returns `true` if the value is an element whose type is `SeparatorItem`.
     */
    static isComponentOf(instance: unknown): boolean {
        if (typeof instance !== "object" || instance === null) {
            return false;
        }
        const type: unknown = "type" in instance ? instance.type : undefined;
        return (
            typeof type === "function" &&
            "__IS_SEPARATOR_ITEM__" in type &&
            type.__IS_SEPARATOR_ITEM__ === true
        );
    }

    static __IS_SEPARATOR_ITEM__ = true;

    render(): React.ReactNode {
        return (
            // pass optional styles from react-window (if applies)
            <View
                style={[styles.separator, this.props.style]}
                aria-hidden="true"
            />
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        height: 1,
        minBlockSize: 1,
        marginBlock: sizing.size_040,
    },
});
