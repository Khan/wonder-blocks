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

type Props = {|
    /**
     * The dialog content
     */
    children: React.Node,

    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
     */
    above?: React.Node,

    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
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
                        <React.Fragment>
                            {below && <View style={styles.below}>{below}</View>}
                            <View
                                style={[styles.wrapper, style]}
                                role="dialog"
                                aria-labelledby="wb-modal-title"
                            >
                                {children}
                            </View>
                            {above && <View style={styles.above}>{above}</View>}
                        </React.Fragment>
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
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
        },
        above: {
            pointerEvents: "none",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
        },
        below: {
            pointerEvents: "none",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
        },
    }),

    small: StyleSheet.create({
        // On small viewports, we consume the full screen size.
        wrapper: {
            width: "100%",
            height: "100%",
            borderRadius: 0,
            flexDirection: "column",
        },
    }),
};
