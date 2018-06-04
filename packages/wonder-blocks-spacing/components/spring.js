// @flow
/**
 * Expands to fill space between sibling components.
 *
 * Assumes parent is a View.
 */
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

export default class Spring extends React.Component<{}> {
    render() {
        return <View style={styles.grow} />;
    }
}

const styles = StyleSheet.create({
    grow: {
        flexGrow: 1,
    },
});
