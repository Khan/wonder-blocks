import * as React from "react";
import {StyleSheet} from "aphrodite";
import xIcon from "@phosphor-icons/core/bold/x-bold.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    /** Optional click handler */
    onClick?: () => unknown;
    /** Screen reader label for close button */
    "aria-label"?: string;
    /** Optional custom styles. */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     *
     * In this case, this component is internal, so `testId` is composed with
     * the `testId` passed down from the Dialog variant + a suffix to scope it
     * to this component.
     *
     * @example
     * For testId="some-random-id"
     * The result will be: `some-random-id-modal-panel`
     */
    testId?: string;
};

export const CloseButton = (props: Props) => {
    const {onClick, style, testId} = props;
    return (
        <IconButton
            icon={xIcon}
            aria-label={props["aria-label"] || "Close"}
            onClick={onClick}
            kind="tertiary"
            actionType="neutral"
            style={[componentStyles.root, style]}
            testId={testId}
        />
    );
};

const componentStyles = StyleSheet.create({
    root: {
        position: "absolute",
        // insetInlineEnd supports both RTL and LTR layouts
        insetInlineEnd: sizing.size_080,
        top: sizing.size_080,
        // This is to allow the button to be tab-ordered before the component
        // content but still be above the content.
        zIndex: 1,

        // NOTE: IconButton uses :focus-visible, which is not supported for
        // programmatic focus. This is a workaround to make sure the focus
        // outline is visible when this control is focused.
        ":focus": focusStyles.focus[":focus-visible"],
    },
});
