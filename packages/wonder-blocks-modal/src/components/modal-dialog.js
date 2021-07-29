// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {
    MediaLayout,
    MediaLayoutContext,
    MEDIA_MODAL_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {MediaLayoutContextValue} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = {|
    ...AriaProps,
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
     * When set, overrides the default role value. Default role is "dialog"
     * Roles other than dialog and alertdialog aren't appropriate for this
     * component
     */
    role?: "dialog" | "alertdialog",

    /**
     * Custom styles
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type DefaultProps = {|
    role: $PropertyType<Props, "role">,
|};

/**
 * `ModalDialog` is a component that contains these elements:
 * - The visual dialog element itself (`<div role="dialog"/>`)
 * - The custom contents below and/or above the Dialog itself (e.g. decorative graphics).
 *
 * **Accessibility notes:**
 * - By default (e.g. using `OnePaneDialog`), `aria-labelledby` is populated automatically using the dialog title `id`.
 * - If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the dialog element doesn’t have to have
 * the `aria-labelledby` attribute however this is recommended. It should match the `id` of the dialog title.
 */
export default class ModalDialog extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        role: "dialog",
    };

    render(): React.Node {
        const {
            above,
            below,
            role,
            style,
            children,
            testId,
            "aria-labelledby": ariaLabelledBy,
        } = this.props;

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
                                role={role}
                                aria-modal="true"
                                aria-labelledby={ariaLabelledBy}
                                style={styles.dialog}
                                testId={testId}
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
            padding: Spacing.medium_16,
            flexDirection: "column",
        },
    }),
};
