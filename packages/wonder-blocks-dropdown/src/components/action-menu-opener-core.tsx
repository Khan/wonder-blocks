import * as React from "react";
import {StyleSheet} from "aphrodite";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";

import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";

type Props = Partial<Omit<AriaProps, "aria-disabled">> &
    ClickableState & {
        /**
         * Display text for the opener.
         */
        children: string;
        /**
         * Whether the opener is disabled. If disabled, disallows interaction.
         */
        disabled?: boolean;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * Whether the dropdown is open.
         */
        opened: boolean;
    };

const StyledButton = addStyle("button");

/**
 * Although this component shares a lot with ButtonCore there are a couple
 * of differences:
 * - the down caret icon appears on the right instead of the left
 * - the down caret icon is smaller that the one that would be used by ButtonCore
 */
export default class ActionMenuOpenerCore extends React.Component<Props> {
    render(): React.ReactNode {
        const {
            children,
            disabled: disabledProp,
            focused,
            hovered,
            pressed,
            waiting: _,
            testId,
            opened,
            "aria-label": ariaLabel,
            ...restProps
        } = this.props;

        const disabled = disabledProp;

        const defaultStyle = [
            sharedStyles.shared,
            sharedStyles.default,
            disabled && sharedStyles.disabled,
            !disabled && pressed && sharedStyles.press,
        ];

        const label = (
            <LabelLarge style={sharedStyles.text}>{children}</LabelLarge>
        );

        return (
            <StyledButton
                aria-expanded={opened ? "true" : "false"}
                aria-haspopup="menu"
                aria-label={ariaLabel}
                disabled={disabled}
                style={defaultStyle}
                type="button"
                {...restProps}
                data-testid={testId}
            >
                <View
                    style={
                        !disabled && (hovered || focused) && sharedStyles.focus
                    }
                >
                    {label}
                </View>
                <Strut size={spacing.xxxSmall_4} />
                <PhosphorIcon
                    size="small"
                    color="currentColor"
                    icon={caretDownIcon}
                    aria-hidden="true"
                />
            </StyledButton>
        );
    }
}

// TODO(WB-1868): Move this to a shared theme file.
const theme = {
    actionMenuOpener: {
        color: {
            default: {
                background: "none",
                foreground:
                    semanticColor.action.outlined.progressive.default
                        .foreground,
            },
            disabled: {
                // TODO(WB-1889): Use the new disabled color tokens.
                foreground: semanticColor.action.disabled.default,
            },
            press: {
                foreground:
                    semanticColor.action.outlined.progressive.press.foreground,
            },
        },
    },
};

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: DROPDOWN_ITEM_HEIGHT,
        border: "none",
        borderRadius: spacing.xxxSmall_4,
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
    default: {
        background: theme.actionMenuOpener.color.default.background,
        color: theme.actionMenuOpener.color.default.foreground,
    },
    disabled: {
        color: theme.actionMenuOpener.color.disabled.foreground,
        cursor: "not-allowed",
    },
    small: {
        height: spacing.xLarge_32,
    },
    text: {
        textAlign: "left",
        display: "inline-block",
        alignItems: "center",
        fontWeight: "bold",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    },
    focus: {
        ":after": {
            content: "''",
            position: "absolute",
            height: 2,
            left: 0,
            right: 0,
            bottom: -1,
            background: "currentColor",
            borderRadius: border.radius.xSmall_2,
        },
    },
    press: {
        color: theme.actionMenuOpener.color.press.foreground,
    },
});
