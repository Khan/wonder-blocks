import * as React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-clickable";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";

import type {OpenerProps, OptionLabel} from "../util/types";

type Props = Partial<Omit<AriaProps, "aria-disabled">> & {
    /**
     * The child function that returns the anchor the Dropdown will be activated
     * by. This function takes two arguments:
     *
     * - `eventState`: allows the opener element to access pointer event state.
     * - `text`: Passes the menu's text/label defined in the parent component.
     */
    children: (openerProps: OpenerProps) => React.ReactElement<any>;
    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled?: boolean;
    /**
     * Specifies if the dropdown is read-only. Defaults to false.
     */
    readOnly?: boolean;
    /**
     * Callback for when the opener is pressed.
     */
    onClick: (e: React.SyntheticEvent) => unknown;
    /**
     * Callback for when the opener is blurred.
     */
    onBlur?: (e: React.SyntheticEvent) => unknown;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Content for the opener that can be passed to the child as an argument.
     */
    text: OptionLabel;
    /**
     * Whether the dropdown is opened.
     */
    opened: boolean;
    /**
     * The unique identifier for the opener.
     */
    id?: string;
    /**
     * If the dropdown has an error.
     */
    error?: boolean;
    /**
     * The role of the opener.
     */
    role: "combobox" | "button";
};

const DropdownOpener = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const {
        disabled = false,
        readOnly = false,
        testId,
        text,
        opened,
        "aria-controls": ariaControls,
        "aria-haspopup": ariaHasPopUp,
        "aria-required": ariaRequired,
        "aria-label": ariaLabel,
        id,
        role,
        onBlur,
        onClick,
        children,
        error,
    } = props;

    const renderAnchorChildren = (
        eventState: ClickableState,
        clickableChildrenProps: ChildrenProps,
    ): React.ReactElement => {
        const renderedChildren = children({
            ...eventState,
            text,
            opened,
        });
        const childrenProps = renderedChildren.props;
        const childrenTestId =
            childrenProps?.testId || childrenProps?.["data-testid"];

        // If custom opener has `aria-label`, prioritize that.
        // If parent component has `aria-label`, fall back to that next.
        const renderedAriaLabel = childrenProps["aria-label"] ?? ariaLabel;

        return React.cloneElement(renderedChildren, {
            ...clickableChildrenProps,
            ref,
            "aria-label": renderedAriaLabel ?? undefined,
            "aria-invalid": error,
            disabled,
            "aria-controls": ariaControls,
            role,
            id,
            "aria-expanded": opened ? "true" : "false",
            "aria-haspopup": ariaHasPopUp,
            "aria-required": ariaRequired,
            // Set aria-disabled based on readOnly or disabled state. If none are true, set to undefined so attribute isn't set
            "aria-disabled": readOnly || disabled || undefined,
            onClick: childrenProps.onClick
                ? (e: React.MouseEvent) => {
                      // This is done to avoid overriding a
                      // custom onClick handler inside the
                      // children node
                      childrenProps.onClick(e);
                      clickableChildrenProps.onClick(e);
                  }
                : clickableChildrenProps.onClick,
            // try to get the testId from the child element
            // If it's not set, try to fallback to the parent's testId
            "data-testid": childrenTestId || testId,
            onBlur: onBlur
                ? (e: React.FocusEvent) => {
                      // This is done to avoid overriding a custom onBlur
                      // handler inside the children node
                      onBlur(e);
                      clickableChildrenProps.onBlur(e);
                  }
                : clickableChildrenProps.onBlur,
        });
    };

    return (
        <ClickableBehavior
            onClick={onClick}
            // If readOnly is true, clickable behaviour should be disabled to
            // prevent interactions. Note: DropdownOpener is responsible for
            // adding attributes to the opener
            disabled={disabled || readOnly}
            // Allows the opener to be focused with the keyboard, which ends
            // up triggering onFocus/onBlur events needed to re-render the
            // dropdown opener.
            tabIndex={0}
        >
            {(eventState, handlers) =>
                renderAnchorChildren(eventState, handlers)
            }
        </ClickableBehavior>
    );
});

DropdownOpener.displayName = "DropdownOpener";

export default DropdownOpener;
