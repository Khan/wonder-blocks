// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";

/**
 * Expands to fill space between sibling components.
 *
 * Assumes parent is a View.
 */
export default class Spring extends React.Component<{||}> {
    render(): React.Node {
        return <View aria-hidden="true" style={styles.grow} />;
    }
}

const styles = StyleSheet.create({
    grow: {
        flexGrow: 1,
    },
});
