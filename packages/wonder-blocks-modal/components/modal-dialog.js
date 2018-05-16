// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Grid, GRID_MODAL_SPEC} from "wonder-blocks-grid";

type Props = {
    children: React.Node,
    style?: any,
};

export default class ModalDialog extends React.Component<Props> {
    render() {
        const {style, children} = this.props;
        return (
            <Grid
                spec={GRID_MODAL_SPEC}
                style={[
                    styles.wrapper,
                    (gridSize) => gridSize === "small" && styles.small,
                    style,
                ]}
                role="dialog"
                aria-labelledby="wb-modal-title"
            >
                {children}
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",

        borderRadius: 4,
        overflow: "hidden",
    },

    // On small viewports, we consume the full screen size.
    small: {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        flexDirection: "column",
    },
});
