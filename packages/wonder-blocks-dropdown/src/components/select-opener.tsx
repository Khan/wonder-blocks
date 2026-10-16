/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// This file implements the SelectOpener button primitive used by WB dropdowns —
// it intentionally wraps addStyle("button") as its underlying DOM element.
import * as React from "react";
import {keys, type AriaProps} from "@khanacademy/wonder-blocks-core";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {OptionLabel} from "../util/types";

import styles from "./select-opener.module.css";

const StyledButton = addStyle("button");

type SelectOpenerProps = AriaProps & {
    /**
     * Display text in the SelectOpener.
     */
    children: OptionLabel;
    /**
     * Whether the SelectOpener is disabled. If disabled, disallows interaction.
     * Default false.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
     */
    disabled: boolean;
    /**
     * Specifies if the dropdown is read-only. Defaults to false.
     */
    readOnly?: boolean;
    /**
     * Whether or not the input is in an error state. Defaults to false.
     */
    error: boolean;
    /**
     * Auto-populated by parent. Used for accessibility purposes, where the label
     * id should match the field id.
     */
    id?: string;
    /**
     * Whether the displayed text is a placeholder, determined by the creator
     * of this component. A placeholder has more faded text colors and styles.
     */
    isPlaceholder: boolean;
    /**
     * A label to expose on the opener, in the absence of an associated label element or `aria-labelledby`.
     */
    ariaLabel?: string;
    /**
     * Callback for when the SelectOpener is pressed.
     */
    onOpenChanged: (open: boolean) => unknown;
    /**
     * Whether the dropdown is open.
     */
    open: boolean;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Called when it is blurred
     */
    onBlur?: (e: React.SyntheticEvent) => unknown;
};

type DefaultProps = {
    disabled: SelectOpenerProps["disabled"];
    readOnly: SelectOpenerProps["readOnly"];
    error: SelectOpenerProps["error"];
    isPlaceholder: SelectOpenerProps["isPlaceholder"];
};

type SelectOpenerState = {
    /**
     * We only keep track of the pressed state to apply styling for when the select
     * opener is pressed using Enter/Space. Other states (active, hover, focus)
     * are not tracked because we use css pseudo-classes to handle those styles
     * instead. Note: `:active` styling is only applied on clicks across browsers,
     * and not on keyboard interaction.
     */
    pressed: boolean;
};

/**
 * An opener that opens select boxes.
 */
export default class SelectOpener extends React.Component<
    SelectOpenerProps,
    SelectOpenerState
> {
    static defaultProps: DefaultProps = {
        disabled: false,
        readOnly: false,
        error: false,
        isPlaceholder: false,
    };

    constructor(props: SelectOpenerProps) {
        super(props);

        this.state = {
            pressed: false,
        };
    }

    handleClick: (e: React.SyntheticEvent) => void = (e) => {
        const {open} = this.props;
        this.props.onOpenChanged(!open);
    };

    handleKeyDown: (e: React.KeyboardEvent) => void = (e) => {
        const keyName = e.key;
        // Prevent default behavior for Enter key. Without this, the select
        // is only open while the Enter key is pressed.
        // Prevent default behavior for Space key. Without this, Safari stays in
        // active state visually
        if (keyName === keys.enter || keyName === keys.space) {
            this.setState({pressed: true});
            e.preventDefault();
        }
    };

    handleKeyUp: (e: React.KeyboardEvent) => void = (e) => {
        const keyName = e.key;
        // On key up for Enter and Space, trigger the click handler
        if (keyName === keys.enter || keyName === keys.space) {
            this.setState({pressed: false});
            this.handleClick(e);
        }
    };

    render(): React.ReactNode {
        const {
            children,
            disabled,
            readOnly,
            error,
            id,
            isPlaceholder,
            open,
            testId,
            "aria-label": ariaLabel,
            "aria-required": ariaRequired,
            "aria-controls": ariaControls,
            onBlur,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onOpenChanged,
            ...sharedProps
        } = this.props;

        const iconColor = disabled
            ? semanticColor.core.foreground.disabled.default
            : semanticColor.core.foreground.neutral.default;

        const style = [
            styles.opener,
            disabled && styles.disabled,
            error && styles.error,
            isPlaceholder && styles.placeholder,
            isPlaceholder && disabled && styles.disabledPlaceholder,
            !disabled && !readOnly && this.state.pressed && styles.press,
            // A read-only placeholder keeps the placeholder colour; see
            // `.readOnly.placeholder` in select-opener.module.css.
            readOnly && styles.readOnly,
        ];

        const allowInteraction = !disabled && !readOnly;

        return (
            <StyledButton
                {...sharedProps}
                // Set aria-disabled if readOnly or disabled state. If none are
                // true, set to undefined so attribute isn't set
                // Note: We set `aria-disabled` instead of `aria-readonly` due to
                // low browser + screen reader support for `aria-readonly` on comboboxes.
                aria-disabled={readOnly || disabled || undefined}
                aria-expanded={open ? "true" : "false"}
                aria-invalid={error}
                aria-label={ariaLabel ?? undefined}
                aria-required={ariaRequired}
                aria-haspopup="listbox"
                aria-controls={ariaControls}
                data-testid={testId}
                id={id}
                role="combobox"
                /* Note(marcysutton): type=button prevents form submits on click */
                type="button"
                style={style}
                onClick={allowInteraction ? this.handleClick : undefined}
                onKeyDown={allowInteraction ? this.handleKeyDown : undefined}
                onKeyUp={allowInteraction ? this.handleKeyUp : undefined}
                onBlur={onBlur}
            >
                <BodyText tag="span" style={styles.text}>
                    {/* Note(tamarab): Prevents unwanted vertical
                                shift for empty selection.
                        Note2(marcysutton): aria-hidden prevents "space"
                                from being read in VoiceOver. */}
                    {children || <span aria-hidden="true">&nbsp;</span>}
                </BodyText>
                <PhosphorIcon
                    icon={caretDownIcon}
                    color={iconColor}
                    size="small"
                    style={styles.caret}
                    aria-hidden="true"
                />
            </StyledButton>
        );
    }
}
