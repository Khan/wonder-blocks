// @flow
// Separator item in a dropdown, used to denote a semantic break.
// Actualized as a horizontal line with surrounding whitespace. -----

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

/**
 * A separator used in a dropdown menu.
 */
export default class SeparatorItem extends React.Component<{}> {
    render() {
        return <View style={styles.separator} />;
    }
}

const styles = StyleSheet.create({
    separator: {
        backgroundColor: Color.offBlack16,
        height: 1,
        minHeight: 1,
        marginTop: Spacing.xxxSmall,
        marginBottom: Spacing.xxxSmall,
    },
});
