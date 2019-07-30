// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import ModalContent from "./modal-content.js";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";
import CloseButton from "./close-button.js";

type Props = {|
    /**
     * The main contents of the ModalPanel. All other parts of the panel
     * are positioned around it.
     */
    content: React.Element<typeof ModalContent> | React.Node,

    /**
     * The modal header to show at the top of the panel.
     */
    header?: React.Element<typeof ModalHeader> | React.Node,

    /**
     * A footer to show beneath the contents.
     */
    footer?: React.Element<typeof ModalFooter> | React.Node,

    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible: boolean,

    /**
     * Should the contents of the panel become scrollable should they
     * become too tall?
     */
    scrollOverflow: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

    /**
     * Any optional styling to apply to the panel.
     */
    style?: StyleType,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you should not use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will throw an error.
     */
    onClose?: () => mixed,

    /**
     * Test ID used for e2e testing.
     *
     * In this case, this `testId` comes from the `testId` prop defined in the
     * Dialog variant (e.g. OnePaneDialog).
     */
    testId?: string,
|};

/**
 * ModalPanel is  the content container.
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to add this component inside the [ModalDialog](/#modaldialog).
 * - If needed, you can also add a [ModalHeader](/#modalheader) using the
 *   `header` prop. Same goes for [ModalFooter](/#modalfooter).
 * - If you need to create e2e tests, make sure to pass a `testId` prop. This
 *   will be passed down to this component using a sufix: e.g.
 *   `some-random-id-ModalPanel`. This scope will be propagated to the
 *   CloseButton element as well: e.g. `some-random-id-CloseButton`.
 *
 * ```js
 * <ModalDialog>
 *      <ModalPanel content={"custom content goes here"} />
 * </ModalDialog>
 * ```
 */
export default class ModalPanel extends React.Component<Props> {
    static defaultProps = {
        closeButtonVisible: true,
        scrollOverflow: true,
        light: true,
    };

    renderMainContent() {
        const {content, footer, scrollOverflow} = this.props;

        const mainContent = ModalContent.isClassOf(content) ? (
            ((content: any): React.Element<typeof ModalContent>)
        ) : (
            <ModalContent>{content}</ModalContent>
        );

        if (!mainContent) {
            return mainContent;
        }

        return React.cloneElement(mainContent, {
            // Pass the scrollOverflow and header in to the main content
            scrollOverflow,
            // We override the styling of the main content to help position
            // it if there is a footer or close button being
            // shown. We have to do this here as the ModalContent doesn't
            // know about things being positioned around it.
            style: [!!footer && styles.hasFooter, mainContent.props.style],
        });
    }

    render() {
        const {
            closeButtonVisible,
            footer,
            header,
            light,
            onClose,
            style,
            testId,
        } = this.props;

        const mainContent = this.renderMainContent();

        return (
            <View
                style={[styles.wrapper, !light && styles.dark, style]}
                testId={testId && `${testId}-ModalPanel`}
            >
                {closeButtonVisible && (
                    <CloseButton
                        light={!light}
                        onClick={onClose}
                        style={styles.closeButton}
                        testId={testId && `${testId}-CloseButton`}
                    />
                )}
                {header}
                {mainContent}
                {!footer || ModalFooter.isClassOf(footer) ? (
                    footer
                ) : (
                    <ModalFooter>{footer}</ModalFooter>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: "1 1 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "white",
        boxSizing: "border-box",
        overflow: "hidden",
        height: "100%",
        width: "100%",
    },

    closeButton: {
        position: "absolute",
        right: Spacing.medium,
        top: Spacing.medium,
        // This is to allow the button to be tab-ordered before the modal
        // content but still be above the header and content.
        zIndex: 1,
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },

    hasFooter: {
        paddingBottom: Spacing.xLarge,
    },
});
