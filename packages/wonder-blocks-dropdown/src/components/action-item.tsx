import * as React from "react";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import type {CellProps} from "../util/types";

import styles from "./action-item.module.css";

type ActionProps = {
    /**
     * Display text of the action item.
     */
    label: string | CellProps["title"];
    /**
     * Whether this action item is disabled.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
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
    horizontalRule?: CellProps["horizontalRule"];

    /**
     * Optional left accessory to display in the `ActionItem` element.
     */
    leftAccessory?: CellProps["leftAccessory"];

    /**
     * Optional right accessory to display in the `ActionItem` element.
     */
    rightAccessory?: CellProps["rightAccessory"];

    /**
     * Optional subtitle to display before the label.
     */
    subtitle1?: CellProps["subtitle1"];

    /**
     * Optional subtitle to display after the label.
     */
    subtitle2?: CellProps["subtitle2"];

    /**
     * Optional; applies aria-current to the cell.
     */
    active?: CellProps["active"];

    /**
     * Optional aria-label for the action item.
     */
    "aria-label"?: string;
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
            subtitle1,
            subtitle2,
            testId,
            active,
            "aria-label": ariaLabel,
        } = this.props;

        const defaultStyle = [
            styles.root,
            styles.actionItem,
            // pass optional styles from react-window (if applies)
            style,
        ];

        const labelComponent =
            typeof label === "string" ? (
                <BodyText tag="div" lang={lang} style={styles.label}>
                    {label}
                </BodyText>
            ) : typeof label.type === "string" ? (
                // A host element (e.g. `<span>`) only accepts a style
                // object in `style`, so the label class goes on `className`
                // instead, alongside any class the label already has.
                React.cloneElement(label, {
                    lang,
                    ...label.props,
                    className: [styles.label, label.props.className]
                        .filter(Boolean)
                        .join(" "),
                })
            ) : (
                React.cloneElement(label, {
                    lang,
                    style: styles.label,
                    ...label.props,
                })
            );

        return (
            <DetailCell
                disabled={disabled}
                horizontalRule={horizontalRule}
                leftAccessory={leftAccessory}
                rightAccessory={rightAccessory}
                styles={{
                    root: [
                        defaultStyle,
                        styles.shared,
                        indent && styles.indent,
                    ],
                }}
                role={role}
                testId={testId}
                subtitle1={subtitle1}
                title={labelComponent}
                subtitle2={subtitle2}
                href={href}
                target={target}
                onClick={onClick}
                active={active}
                aria-label={ariaLabel}
            />
        );
    }
}
