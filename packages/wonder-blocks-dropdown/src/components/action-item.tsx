import * as React from "react";
import {StyleSheet} from "aphrodite";

import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import type {PropsFor, StyleType} from "@khanacademy/wonder-blocks-core";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";
import theme from "../theme";

type CompactCellProps = PropsFor<typeof CompactCell>;

type ActionProps = {
    /**
     * Display text of the action item.
     */
    label: string | CompactCellProps["title"];
    /**
     * Whether this action item is disabled.
     */
    disabled: boolean;
    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string;
    /**
     * Optional attribute to indicate to the Screen Reader which language the
     * item text is in.
     */
    lang?: string;
    /**
     * A target destination window for a link to open in.
     *
     * TODO(WB-1262): only allow this prop when `href` is also set.
     */
    target?: "_blank";
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: () => unknown;
    /**
     * Whether this item should be indented to have menu items left-align in
     * text when an ActionItem is used in the same menu as items that have
     * checks or checkboxes. Auto-populated by menu.
     * @ignore
     */
    indent: boolean;
    /**
     * Aria role to use, defaults to "menuitem".
     */
    role: "menuitem" | "option";
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;

    /**
     * Inherited from WB Cell.
     */

    /**
     * Adds a horizontal rule at the bottom of the cell that can be used to
     * separate items within ActionMenu instances. Defaults to `none`.
     */
    horizontalRule?: CompactCellProps["horizontalRule"];

    /**
     * Optional left accessory to display in the `ActionItem` element.
     */
    leftAccessory?: CompactCellProps["leftAccessory"];

    /**
     * Optional right accessory to display in the `ActionItem` element.
     */
    rightAccessory?: CompactCellProps["rightAccessory"];

    /**
     * Optional; applies aria-current to the cell.
     */
    active?: CompactCellProps["active"];
};

type DefaultProps = {
    disabled: ActionProps["disabled"];
    horizontalRule: ActionProps["horizontalRule"];
    indent: ActionProps["indent"];
    role: ActionProps["role"];
};

/**
 * The action item trigger actions, such as navigating to a different page or
 * opening a modal. Supply the href and/or onClick props. Used as a child of
 * ActionMenu.
 */
export default class ActionItem extends React.Component<ActionProps> {
    static isClassOf(instance: React.ReactElement<any>): boolean {
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__IS_ACTION_ITEM__' does not exist on type 'string | JSXElementConstructor<any>'.
        return instance && instance.type && instance.type.__IS_ACTION_ITEM__;
    }
    static defaultProps: DefaultProps = {
        disabled: false,
        horizontalRule: "none",
        indent: false,
        role: "menuitem",
    };
    static __IS_ACTION_ITEM__ = true;

    render(): React.ReactNode {
        const {
            disabled,
            horizontalRule,
            href,
            target,
            indent,
            label,
            lang,
            leftAccessory,
            rightAccessory,
            onClick,
            role,
            style,
            testId,
            active,
        } = this.props;

        const defaultStyle = [
            styles.wrapper,
            // pass optional styles from react-window (if applies)
            style,
        ];

        const labelComponent =
            typeof label === "string" ? (
                <BodyText tag="div" lang={lang} style={styles.label}>
                    {label}
                </BodyText>
            ) : (
                React.cloneElement(label, {
                    lang,
                    style: styles.label,
                    ...label.props,
                })
            );

        return (
            <CompactCell
                disabled={disabled}
                horizontalRule={horizontalRule}
                leftAccessory={leftAccessory}
                rightAccessory={rightAccessory}
                style={[defaultStyle, styles.shared, indent && styles.indent]}
                role={role}
                testId={testId}
                title={labelComponent}
                href={href}
                target={target}
                onClick={onClick}
                active={active}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: DROPDOWN_ITEM_HEIGHT,
        // This removes the 300ms click delay on mobile browsers by indicating
        // that "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",

        /**
         * States
         */
        ":focus": {
            // Override the default focus state for the cell element, so that it
            // can be added programmatically to the button element.
            borderRadius: theme.item.border.radius.default,
            outline: focusStyles.focus[":focus-visible"].outline,
            outlineOffset: `calc(${border.width.medium} * -1)`,
            // We need to use a thicker box-shadow to ensure that the inner ring
            // is visible when the cell is focused.
            boxShadow: `inset 0 0 0 calc(${border.width.medium}*2) ${semanticColor.focus.inner}`,
            // Hide the left bar indicator when focused, so the focus ring
            // doesn't overlap with it.
            // @see cell-core.tsx
            [":after" as any]: {
                content: "unset",
            },
        },
    },
    shared: {
        minHeight: DROPDOWN_ITEM_HEIGHT,
        // Make sure that the item is always at least as tall as 40px.
        paddingBlock: theme.item.layout.padding.block,
    },

    label: {
        fontWeight: theme.item.font.weight,
        lineHeight: sizing.size_200,
        whiteSpace: "nowrap",
        userSelect: "none",
    },

    indent: {
        // Cell's internal padding + checkbox width + checkbox margin
        paddingInlineStart: sizing.size_320,
    },
});
