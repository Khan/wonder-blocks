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
    children: React.Node,
    style?: StyleType,
|};

export default class ModalDialog extends React.Component<Props> {
    render() {
        const {style, children} = this.props;
        const contextValue: MediaLayoutContextValue = {
            ssrSize: "large",
            mediaSpec: MEDIA_MODAL_SPEC,
        };
        return (
            <MediaLayoutContext.Provider value={contextValue}>
                <MediaLayout styleSheets={styleSheets}>
                    {({styles}) => (
                        <View
                            style={[styles.wrapper, style]}
                            role="dialog"
                            aria-labelledby="wb-modal-title"
                        >
                            {children}
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
            position: "relative",

            borderRadius: 4,
            overflow: "hidden",
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
