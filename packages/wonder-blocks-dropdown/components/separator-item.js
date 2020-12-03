// @flow
// Separator item in a dropdown, used to denote a semantic break.
// Actualized as a horizontal line with surrounding whitespace. -----

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * A separator used in a dropdown menu.
 */
export default class SeparatorItem extends React.Component<{|
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType,
|}> {
    static isClassOf(instance: React.Element<any>) {
        return instance && instance.type && instance.type.__IS_SEPARATOR_ITEM__;
    }

    static __IS_SEPARATOR_ITEM__ = true;

    render() {
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
        boxShadow: `0 -1px ${Color.offBlack16}`,
        height: 1,
        minHeight: 1,
        marginTop: Spacing.xxxSmall_4,
        marginBottom: Spacing.xxxSmall_4,
    },
});
