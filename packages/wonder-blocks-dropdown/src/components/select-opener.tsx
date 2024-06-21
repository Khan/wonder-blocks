import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import {mix} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";
import {OptionLabel} from "../util/types";

const StyledButton = addStyle("button");

type SelectOpenerProps = AriaProps & {
    /**
     * Display text in the SelectOpener.
     */
    children: OptionLabel;
    /**
     * Whether the SelectOpener is disabled. If disabled, disallows interaction.
     * Default false.
     */
    disabled: boolean;
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
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean;
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
};

type DefaultProps = {
    disabled: SelectOpenerProps["disabled"];
    error: SelectOpenerProps["error"];
    light: SelectOpenerProps["light"];
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
        error: false,
        light: false,
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
        const keyCode = e.key;
        // Prevent default behavior for Enter key. Without this, the select
        // is only open while the Enter key is pressed.
        // Prevent default behavior for Space key. Without this, Safari stays in
        // active state visually
        if (keyCode === "Enter" || keyCode === " ") {
            this.setState({pressed: true});
            e.preventDefault();
        }
    };

    handleKeyUp: (e: React.KeyboardEvent) => void = (e) => {
        const keyCode = e.key;
        // On key up for Enter and Space, trigger the click handler
        if (keyCode === "Enter" || keyCode === " ") {
            this.setState({pressed: false});
            this.handleClick(e);
        }
    };

    render(): React.ReactNode {
        const {
            children,
            disabled,
            error,
            id,
            isPlaceholder,
            light,
            open,
            testId,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onOpenChanged,
            ...sharedProps
        } = this.props;

        const stateStyles = _generateStyles(light, isPlaceholder, error);

        // The icon colors are kind of fickle. This is just logic
        // based on the zeplin design.
        const iconColor = light
            ? disabled || error
                ? "currentColor"
                : tokens.color.white
            : disabled
            ? tokens.color.offBlack32
            : tokens.color.offBlack64;

        const style = [
            styles.shared,
            stateStyles.default,
            disabled && stateStyles.disabled,
            !disabled && this.state.pressed && stateStyles.pressed,
        ];

        return (
            <StyledButton
                {...sharedProps}
                aria-disabled={disabled}
                aria-expanded={open ? "true" : "false"}
                aria-haspopup="listbox"
                data-testid={testId}
                id={id}
                style={style}
                type="button"
                onClick={!disabled ? this.handleClick : undefined}
                onKeyDown={!disabled ? this.handleKeyDown : undefined}
                onKeyUp={!disabled ? this.handleKeyUp : undefined}
            >
                <LabelMedium style={styles.text}>
                    {/* Note(tamarab): Prevents unwanted vertical
                                shift for empty selection */}
                    {children || "\u00A0"}
                </LabelMedium>
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

const styles = StyleSheet.create({
    // TODO: Dedupe with Button styles
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: tokens.color.offBlack,
        height: DROPDOWN_ITEM_HEIGHT,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingLeft: tokens.spacing.medium_16,
        paddingRight: tokens.spacing.small_12,
        borderWidth: 0,
        borderRadius: tokens.border.radius.medium_4,
        borderStyle: "solid",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },

    text: {
        marginRight: tokens.spacing.xSmall_8,
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caret: {
        minWidth: 16,
    },
});

// These values are default padding (16 and 12) minus 1, because
// changing the borderWidth to 2 messes up the button width
// and causes it to move a couple pixels. This fixes that.
const adjustedPaddingLeft = tokens.spacing.medium_16 - 1;
const adjustedPaddingRight = tokens.spacing.small_12 - 1;

const stateStyles: Record<string, any> = {};

const _generateStyles = (
    light: boolean,
    placeholder: boolean,
    error: boolean,
) => {
    // "hash" the parameters
    const styleKey = `${light}-${placeholder}-${error}`;
    if (stateStyles[styleKey]) {
        return stateStyles[styleKey];
    }

    let newStyles: Record<string, any> = {};
    if (light) {
        const focusHoverStyling = {
            borderColor: error ? tokens.color.red : tokens.color.white,
            borderWidth: tokens.spacing.xxxxSmall_2,
            paddingLeft: adjustedPaddingLeft,
            paddingRight: adjustedPaddingRight,
        };
        const activePressedStyling = {
            paddingLeft: adjustedPaddingLeft,
            paddingRight: adjustedPaddingRight,
            borderColor: error ? tokens.color.red : tokens.color.fadedBlue,
            borderWidth: tokens.border.width.thin,
            color: error
                ? tokens.color.offBlack64
                : placeholder
                ? mix(tokens.color.white32, tokens.color.blue)
                : tokens.color.fadedBlue,
            backgroundColor: error
                ? tokens.color.fadedRed
                : tokens.color.activeBlue,
        };
        newStyles = {
            default: {
                background: error ? tokens.color.fadedRed8 : "transparent",
                color: error
                    ? tokens.color.offBlack64
                    : placeholder
                    ? tokens.color.white50
                    : tokens.color.white,
                borderColor: error ? tokens.color.red : tokens.color.white50,
                borderWidth: tokens.border.width.hairline,
                ":hover:not([aria-disabled=true])": focusHoverStyling,
                // Allow hover styles on non-touch devices only. This prevents an
                // issue with hover being sticky on touch devices (e.g. mobile).
                ["@media not (hover: hover)"]: {
                    ":hover:not([aria-disabled=true])": {
                        borderColor: error
                            ? tokens.color.red
                            : tokens.color.white50,
                        borderWidth: tokens.border.width.hairline,
                        paddingLeft: tokens.spacing.medium_16,
                        paddingRight: tokens.spacing.small_12,
                    },
                },
                ":focus-visible:not([aria-disabled=true])": focusHoverStyling,
                ":active:not([aria-disabled=true])": activePressedStyling,
            },
            disabled: {
                background: "transparent",
                borderColor: mix(tokens.color.white32, tokens.color.blue),
                color: mix(tokens.color.white32, tokens.color.blue),
                cursor: "not-allowed",
                ":focus-visible": {
                    boxShadow: `0 0 0 1px ${tokens.color.offBlack32}, 0 0 0 3px ${tokens.color.fadedBlue}`,
                },
            },
            pressed: activePressedStyling,
        };
    } else {
        const focusHoverStyling = {
            borderColor: error ? tokens.color.red : tokens.color.blue,
            borderWidth: tokens.border.width.thin,
            paddingLeft: adjustedPaddingLeft,
            paddingRight: adjustedPaddingRight,
        };
        const activePressedStyling = {
            background: error ? tokens.color.fadedRed : tokens.color.fadedBlue,
            borderColor: error ? tokens.color.red : tokens.color.activeBlue,
            borderWidth: tokens.border.width.thin,
            paddingLeft: adjustedPaddingLeft,
            paddingRight: adjustedPaddingRight,
        };
        newStyles = {
            default: {
                background: error ? tokens.color.fadedRed8 : tokens.color.white,
                borderColor: error ? tokens.color.red : tokens.color.offBlack50,
                borderWidth: tokens.border.width.hairline,
                color: placeholder
                    ? tokens.color.offBlack64
                    : tokens.color.offBlack,
                ":hover:not([aria-disabled=true])": focusHoverStyling,
                // Allow hover styles on non-touch devices only. This prevents an
                // issue with hover being sticky on touch devices (e.g. mobile).
                ["@media not (hover: hover)"]: {
                    ":hover:not([aria-disabled=true])": {
                        borderColor: error
                            ? tokens.color.red
                            : tokens.color.offBlack50,
                        borderWidth: tokens.border.width.hairline,
                        paddingLeft: tokens.spacing.medium_16,
                        paddingRight: tokens.spacing.small_12,
                    },
                },
                ":focus-visible:not([aria-disabled=true])": focusHoverStyling,
                ":active:not([aria-disabled=true])": activePressedStyling,
            },
            disabled: {
                background: tokens.color.offWhite,
                borderColor: tokens.color.offBlack16,
                color: tokens.color.offBlack64,
                cursor: "not-allowed",
                ":focus-visible": {
                    boxShadow: `0 0 0 1px ${tokens.color.white}, 0 0 0 3px ${tokens.color.offBlack32}`,
                },
            },
            pressed: activePressedStyling,
        };
    }

    stateStyles[styleKey] = StyleSheet.create(newStyles);
    return stateStyles[styleKey];
};
