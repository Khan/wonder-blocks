import * as React from "react";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import type {PropsFor, StyleType} from "@khanacademy/wonder-blocks-core";

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

type ActionItemInnerProps = ActionProps & {
    /**
     * The ref passed to `ActionItem`, forwarded to the root DOM element of
     * the item (the `DetailCell`).
     */
    forwardedRef?: React.Ref<HTMLElement>;
};

/**
 * The class implementation of `ActionItem`. It's wrapped by the exported
 * `ActionItem` so that refs are forwarded to the root DOM element.
 */
class ActionItemInner extends React.Component<ActionItemInnerProps> {
    static defaultProps: DefaultProps = {
        disabled: false,
        horizontalRule: "none",
        indent: false,
        role: "menuitem",
    };

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
            forwardedRef,
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
                ref={forwardedRef}
            />
        );
    }
}

type ActionItemProps = Omit<PropsFor<typeof ActionItemInner>, "forwardedRef">;

/**
 * Check whether the given element is an `ActionItem` element.
 *
 * @param instance The value to check, e.g. a child of a dropdown.
 * @returns `true` if the element's type is `ActionItem`.
 */
const isComponentOf = (instance: unknown): boolean => {
    if (typeof instance !== "object" || instance === null) {
        return false;
    }
    const type: unknown = "type" in instance ? instance.type : undefined;
    return (
        typeof type === "object" &&
        type !== null &&
        "__IS_ACTION_ITEM__" in type &&
        type.__IS_ACTION_ITEM__ === true
    );
};

/**
 * The type of `ActionItem`: a ref-forwarding component plus the statics that
 * parents use to recognise its elements.
 */
type ActionItemComponent = React.ForwardRefExoticComponent<
    ActionItemProps & React.RefAttributes<HTMLElement>
> & {
    isComponentOf: typeof isComponentOf;
    __IS_ACTION_ITEM__: true;
};

/**
 * The action item trigger actions, such as navigating to a different page or
 * opening a modal. Supply the href and/or onClick props. Used as a child of
 * ActionMenu.
 *
 * The ref is forwarded to the root DOM element of the item (an `<a>` when
 * `href` is set, otherwise a `<button>`).
 */
const ActionItem = React.forwardRef(function ActionItem(
    props: ActionItemProps,
    ref: React.ForwardedRef<HTMLElement>,
): React.ReactElement {
    return <ActionItemInner {...props} forwardedRef={ref} />;
}) as ActionItemComponent;

ActionItem.isComponentOf = isComponentOf;
ActionItem.__IS_ACTION_ITEM__ = true;

export default ActionItem;
