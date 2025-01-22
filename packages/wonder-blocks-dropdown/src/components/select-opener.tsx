import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
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
            open,
            testId,
            "aria-required": ariaRequired,
            onBlur,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onOpenChanged,
            ...sharedProps
        } = this.props;

        const stateStyles = _generateStyles(isPlaceholder, error);

        const iconColor = disabled
            ? semanticColor.action.disabled.default
            : semanticColor.icon.primary;

        const style = [
            styles.shared,
            stateStyles.default,
            disabled && stateStyles.disabled,
            !disabled && this.state.pressed && stateStyles.press,
        ];

        return (
            <StyledButton
                {...sharedProps}
                aria-disabled={disabled}
                aria-expanded={open ? "true" : "false"}
                aria-invalid={error}
                aria-required={ariaRequired}
                aria-haspopup="listbox"
                data-testid={testId}
                id={id}
                style={style}
                type="button"
                onClick={!disabled ? this.handleClick : undefined}
                onKeyDown={!disabled ? this.handleKeyDown : undefined}
                onKeyUp={!disabled ? this.handleKeyUp : undefined}
                onBlur={onBlur}
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
        color: semanticColor.text.primary,
        height: DROPDOWN_ITEM_HEIGHT,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingLeft: spacing.medium_16,
        paddingRight: spacing.small_12,
        borderWidth: 0,
        borderRadius: border.radius.medium_4,
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
        marginRight: spacing.xSmall_8,
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caret: {
        minWidth: 16,
    },
});

const stateStyles: Record<string, any> = {};

const _generateStyles = (placeholder: boolean, error: boolean) => {
    // "hash" the parameters
    const styleKey = `${placeholder}-${error}`;
    if (stateStyles[styleKey]) {
        return stateStyles[styleKey];
    }

    const focusHoverStyling = {
        outlineColor: error
            ? semanticColor.action.outlined.destructive.hover.border
            : semanticColor.action.outlined.progressive.hover.border,
        // Outline sits inside the border (inset)
        outlineOffset: -border.width.thin,
        outlineStyle: "solid",
        outlineWidth: border.width.thin,
    };
    const pressStyling = {
        background: error
            ? semanticColor.action.outlined.destructive.press.background
            : semanticColor.action.outlined.progressive.press.background,
        color: placeholder
            ? error
                ? semanticColor.text.secondary
                : semanticColor.action.outlined.progressive.press.foreground
            : semanticColor.text.primary,
        outlineColor: error
            ? semanticColor.action.outlined.destructive.press.border
            : semanticColor.action.outlined.progressive.press.border,
        // Outline sits inside the border (inset)
        outlineOffset: -border.width.thin,
        outlineStyle: "solid",
        outlineWidth: border.width.thin,
    };

    const newStyles = {
        default: {
            background: error
                ? semanticColor.status.critical.background
                : semanticColor.surface.primary,
            borderColor: error
                ? semanticColor.status.critical.foreground
                : semanticColor.border.strong,
            borderWidth: border.width.hairline,
            color: placeholder
                ? semanticColor.text.secondary
                : semanticColor.text.primary,
            ":hover:not([aria-disabled=true])": focusHoverStyling,
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover:not([aria-disabled=true])": {
                    borderColor: error
                        ? semanticColor.status.critical.foreground
                        : semanticColor.border.strong,
                    borderWidth: border.width.hairline,
                    paddingLeft: spacing.medium_16,
                    paddingRight: spacing.small_12,
                },
            },
            ":focus-visible:not([aria-disabled=true])": focusHoverStyling,
            ":active:not([aria-disabled=true])": pressStyling,
        },
        disabled: {
            background: semanticColor.action.disabled.secondary,
            borderColor: semanticColor.border.primary,
            color: semanticColor.text.secondary,
            cursor: "not-allowed",
            ":focus-visible": {
                outlineColor: semanticColor.action.disabled.default,
                outlineOffset: -border.width.thin,
                outlineStyle: "solid",
                outlineWidth: border.width.thin,
            },
        },
        press: pressStyling,
    };

    stateStyles[styleKey] = StyleSheet.create(newStyles);
    return stateStyles[styleKey];
};
