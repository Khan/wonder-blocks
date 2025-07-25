import * as React from "react";
import {StyleSheet} from "aphrodite";

import {keys, type AriaProps} from "@khanacademy/wonder-blocks-core";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";
import {OptionLabel} from "../util/types";
import theme from "../theme";

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
            : theme.opener.color.icon;

        const style = [
            styles.shared,
            styles.default,
            disabled && styles.disabled,
            error && styles.error,
            isPlaceholder && styles.placeholder,
            !disabled && this.state.pressed && styles.press,
        ];

        return (
            <StyledButton
                {...sharedProps}
                aria-disabled={disabled}
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
                onClick={!disabled ? this.handleClick : undefined}
                onKeyDown={!disabled ? this.handleKeyDown : undefined}
                onKeyUp={!disabled ? this.handleKeyUp : undefined}
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

// Use box shadow to make the border in the press state look thicker without
// changing the border
const PRESS_SHADOW = `0 0 0 ${border.width.thin} ${semanticColor.input.default.border}`;

const styles = StyleSheet.create({
    // TODO: Dedupe with Button styles
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: semanticColor.core.foreground.neutral.strong,
        height: DROPDOWN_ITEM_HEIGHT,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingInlineStart: theme.opener.layout.padding.inlineStart,
        paddingInlineEnd: theme.opener.layout.padding.inlineEnd,
        borderWidth: 0,
        borderRadius: theme.opener.border.radius.rest,
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
        marginInlineEnd: sizing.size_080,
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caret: {
        minWidth: sizing.size_160,
    },
    /**
     * Theming
     */
    default: {
        background: semanticColor.input.default.background,
        border: `${border.width.thin} solid ${semanticColor.input.default.border}`,
        color: semanticColor.input.default.foreground,
        "::placeholder": {
            color: semanticColor.input.default.placeholder,
        },
        cursor: "pointer",
        // :focus-visible -> Provide focus styles for keyboard users only.
        ...focusStyles.focus,
        ":active": {
            boxShadow: PRESS_SHADOW,
        },
    },
    error: {
        background: semanticColor.input.error.background,
        border: `${theme.opener.border.width.error} solid ${semanticColor.input.error.border}`,
        color: semanticColor.input.error.foreground,
        "::placeholder": {
            color: semanticColor.input.default.placeholder,
        },
    },
    disabled: {
        background: semanticColor.input.disabled.background,
        border: `${border.width.thin} solid ${semanticColor.input.disabled.border}`,
        color: semanticColor.input.disabled.foreground,
        cursor: "not-allowed",
        "::placeholder": {
            color: semanticColor.input.disabled.placeholder,
        },
        ":active": {
            boxShadow: "none",
        },
    },
    press: {
        boxShadow: PRESS_SHADOW,
        ":focus-visible": {
            // We merge the focus styles with the press styles so that the focus
            // ring is visible when the button is pressed.
            boxShadow: `${PRESS_SHADOW}, ${focusStyles.focus[":focus-visible"].boxShadow}`,
        },
    },
    placeholder: {
        color: semanticColor.input.default.placeholder,
    },
});
