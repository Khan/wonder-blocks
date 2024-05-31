import * as React from "react";
import {StyleSheet} from "aphrodite";
import {__RouterContext} from "react-router";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import {mix} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
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

/**
 * An opener that opens select boxes.
 */
export default class SelectOpener extends React.Component<SelectOpenerProps> {
    static defaultProps: DefaultProps = {
        disabled: false,
        error: false,
        light: false,
        isPlaceholder: false,
    };

    handleClick: (e: React.SyntheticEvent) => void = (e) => {
        const {open} = this.props;
        this.props.onOpenChanged(!open);
    };

    renderClickableBehavior(router: any): React.ReactNode {
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

        const ClickableBehavior = getClickableBehavior(router);

        return (
            <ClickableBehavior disabled={disabled} onClick={this.handleClick}>
                {(state, childrenProps) => {
                    const stateStyles = _generateStyles(
                        light,
                        isPlaceholder,
                        error,
                    );
                    const {hovered, focused, pressed} = state;

                    // The icon colors are kind of fickle. This is just logic
                    // based on the zeplin design.
                    const iconColor = light
                        ? disabled || pressed
                            ? "currentColor"
                            : tokens.color.white
                        : disabled
                        ? tokens.color.offBlack32
                        : tokens.color.offBlack64;

                    const style = [
                        styles.shared,
                        stateStyles.default,
                        disabled && stateStyles.disabled,
                        !disabled &&
                            (pressed
                                ? stateStyles.active
                                : (hovered || focused) && stateStyles.focus),
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
                            {...childrenProps}
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
                }}
            </ClickableBehavior>
        );
    }

    render(): React.ReactNode {
        return (
            <__RouterContext.Consumer>
                {(router) => this.renderClickableBehavior(router)}
            </__RouterContext.Consumer>
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
        newStyles = {
            default: {
                background: error ? tokens.color.fadedRed8 : "transparent",
                color: placeholder ? tokens.color.white50 : tokens.color.white,
                borderColor: error ? tokens.color.red : tokens.color.white50,
                borderWidth: tokens.border.width.hairline,
            },
            focus: {
                borderColor: error
                    ? tokens.color.fadedRed8
                    : tokens.color.white,
                borderWidth: tokens.spacing.xxxxSmall_2,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            active: {
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
                borderColor: error ? tokens.color.red : tokens.color.fadedBlue,
                borderWidth: tokens.border.width.thin,
                color: placeholder
                    ? mix(tokens.color.white32, tokens.color.blue)
                    : tokens.color.fadedBlue,
                backgroundColor: error
                    ? tokens.color.fadedRed
                    : tokens.color.activeBlue,
            },
            disabled: {
                background: "transparent",
                borderColor: mix(tokens.color.white32, tokens.color.blue),
                color: mix(tokens.color.white32, tokens.color.blue),
                cursor: "auto",
            },
        };
    } else {
        newStyles = {
            default: {
                background: error ? tokens.color.fadedRed8 : tokens.color.white,
                borderColor: error ? tokens.color.red : tokens.color.offBlack16,
                borderWidth: tokens.border.width.hairline,
                color: placeholder
                    ? tokens.color.offBlack64
                    : tokens.color.offBlack,
            },
            focus: {
                borderColor: error ? tokens.color.red : tokens.color.blue,
                borderWidth: tokens.border.width.thin,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            active: {
                background: error
                    ? tokens.color.fadedRed
                    : tokens.color.fadedBlue,
                borderColor: error ? tokens.color.red : tokens.color.activeBlue,
                borderWidth: tokens.border.width.thin,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            disabled: {
                background: tokens.color.offWhite,
                borderColor: tokens.color.offBlack16,
                color: tokens.color.offBlack64,
                cursor: "auto",
            },
        };
    }

    stateStyles[styleKey] = StyleSheet.create(newStyles);
    return stateStyles[styleKey];
};
