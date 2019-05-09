// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {
    MediaLayout,
    MediaLayoutContext,
    MEDIA_MODAL_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {MediaLayoutContextValue} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = {|
    /**
     * The dialog content
     */
    children: React.Node,

    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     */
    above?: React.Node,

    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     */
    below?: React.Node,

    /**
     * Custom styles
     */
    style?: StyleType,
|};

export default class ModalDialog extends React.Component<Props> {
    render() {
        const {above, below, style, children} = this.props;
        const contextValue: MediaLayoutContextValue = {
            ssrSize: "large",
            mediaSpec: MEDIA_MODAL_SPEC,
        };
        return (
            <MediaLayoutContext.Provider value={contextValue}>
                <MediaLayout styleSheets={styleSheets}>
                    {({styles}) => (
                        <View style={[styles.wrapper, style]}>
                            {below && <View style={styles.below}>{below}</View>}
                            <View
                                role="dialog"
                                aria-labelledby="wb-modal-title"
                                style={styles.dialog}
                            >
                                {children}
                            </View>
                            {above && <View style={styles.above}>{above}</View>}
                        </View>
                    )}
                </MediaLayout>
            </MediaLayoutContext.Provider>
        );
    }
}

const styleSheets = {
    all: StyleSheet.create({
        wrapper: {
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            width: "100%",
            height: "100%",
            position: "relative",
        },

        /**
         * Ensures the dialog container uses the container size
         */
        dialog: {
            width: "100%",
            height: "100%",
            borderRadius: 4,
            overflow: "hidden",
        },

        above: {
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
        },

        below: {
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
        },
    }),

    small: StyleSheet.create({
        wrapper: {
            padding: Spacing.medium,
            flexDirection: "column",
        },
    }),
};
