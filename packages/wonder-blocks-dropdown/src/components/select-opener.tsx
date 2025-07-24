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

        const stateStyles = _generateStyles(isPlaceholder, error);

        const iconColor = disabled
            ? semanticColor.core.foreground.disabled.default
            : theme.opener.color.icon;

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

    // The color is based on the action color.
    const actionType = error ? "destructive" : "progressive";
    // NOTE: We are using the secondary action type for all the non-resting
    // states as the opener is a bit different from a regular button in its
    // resting/default state.
    // TODO(WB-2007): Adopt design specs
    const action = semanticColor.action.secondary[actionType];

    const hoverStyling = {
        borderColor: action.hover.border,
        boxShadow: `inset 0 0 0 ${border.width.thin} ${action.hover.border}`,
    };
    const pressStyling = {
        background: action.press.background,
        color: placeholder
            ? error
                ? semanticColor.input.default.placeholder
                : semanticColor.core.foreground.instructive.default
            : semanticColor.input.default.foreground,
        borderColor: action.press.border,
        boxShadow: `inset 0 0 0 ${border.width.thin} ${action.press.border}`,
        borderRadius: theme.opener.border.radius.press,
    };

    const currentState = error
        ? semanticColor.input.error
        : semanticColor.input.default;

    const disabledStatesStyles = {
        background: semanticColor.input.disabled.background,
        borderColor: semanticColor.input.disabled.border,
        borderWidth: border.width.thin,
        borderRadius: theme.opener.border.radius.rest,
        color: semanticColor.input.disabled.placeholder,
    };

    const newStyles = {
        default: {
            background: currentState.background,
            borderColor: currentState.border,
            borderWidth: error
                ? theme.opener.border.width.error
                : border.width.thin,
            color: placeholder
                ? semanticColor.core.foreground.neutral.subtle
                : currentState.foreground,
            cursor: "pointer",
            ":hover": hoverStyling,
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover": {
                    borderColor: currentState.border,
                    borderWidth: border.width.thin,
                    paddingInlineStart: theme.opener.layout.padding.inlineStart,
                    paddingInlineEnd: theme.opener.layout.padding.inlineEnd,
                },
            },
            ":active": pressStyling,
            // :focus-visible -> Provide focus styles for keyboard users only.
            ...focusStyles.focus,
        },
        disabled: {
            ...disabledStatesStyles,
            cursor: "not-allowed",
            ":hover": {
                ...disabledStatesStyles,
                outline: "none",
                boxShadow: "none",
            },
            ":active": {
                ...disabledStatesStyles,
                outline: "none",
                boxShadow: "none",
            },
            ":focus-visible": disabledStatesStyles,
        },
        press: pressStyling,
    };

    stateStyles[styleKey] = StyleSheet.create(newStyles);
    return stateStyles[styleKey];
};
