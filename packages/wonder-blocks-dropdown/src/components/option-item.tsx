import * as React from "react";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {AriaProps, StyleType, View} from "@khanacademy/wonder-blocks-core";

import Check from "./check";
import Checkbox from "./checkbox";
import {CellProps, OptionLabel} from "../util/types";

import styles from "./option-item.module.css";

type OptionProps = AriaProps & {
    /**
     * Display text of the option item.
     */
    label: OptionLabel;

    /**
     * Optional text to use as the label. If not provided, label will be used.
     * This is useful for cases where the label is a complex component and you
     * want to display a simpler string in the menu.
     */
    labelAsText?: string;

    /**
     * Value of the item, used as a key of sorts for the parent to manage its
     * items, because label/display text may be identical for some selects. This
     * is the value passed back when the item is selected.
     */
    value: string;
    /**
     * Whether this option item is disabled.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
     */
    disabled: boolean;
    /**
     * Optional user-supplied callback when this item is called.
     */
    onClick?: () => unknown;
    /**
     * Callback for when this item is pressed to change its selection state.
     * Passes value of the item. Auto-populated by menu or select.
     * @ignore
     */
    onToggle: (value: string) => unknown;
    /**
     * Whether this item is selected. Auto-populated by menu or select.
     * @ignore
     */
    selected: boolean;
    /**
     * Whether this item is focused. Auto-populated by listbox in combination of
     * aria-activedescendant.
     * @ignore
     */
    focused: boolean;

    /**
     * Aria role to use, defaults to "option".
     */
    role: "menuitem" | "option" | "menuitemcheckbox";
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Whether the item should show a check or checkbox to indicate selection
     * state. Auto-populated by menu or select.
     * @ignore
     */
    variant?: "check" | "checkbox";
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;
    /**
     * Injected by the parent component to determine how we are going to handle
     * the component states (hovered, focused, selected, etc.)
     * Defaults to "dropdown".
     * @ignore
     */
    parentComponent?: "dropdown" | "listbox";

    /**
     * The unique identifier of the option item.
     *
     * This is used to identify the option item in the listbox so that it can be
     * focused programmatically (e.g. when the user presses the arrow keys).
     */
    id?: string;

    /**
     * Inherited from WB Cell.
     */

    /**
     * Adds a horizontal rule at the bottom of the cell that can be used to
     * separate items within ActionMenu instances. Defaults to `none`.
     */
    horizontalRule: CellProps["horizontalRule"];

    /**
     * Optional left accessory to display in the `OptionItem` element.
     */
    leftAccessory?: CellProps["leftAccessory"];

    /**
     * Optional right accessory to display in the `OptionItem` element.
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
};

type DefaultProps = {
    disabled: OptionProps["disabled"];
    focused: OptionProps["focused"];
    horizontalRule: OptionProps["horizontalRule"];
    onToggle: OptionProps["onToggle"];
    role: OptionProps["role"];
    selected: OptionProps["selected"];
};

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in SingleSelect or
 * MultiSelect.
 */
export default class OptionItem extends React.Component<OptionProps> {
    static isClassOf(instance: React.ReactElement<any>): boolean {
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__IS_OPTION_ITEM__' does not exist on type 'string | JSXElementConstructor<any>'.
        return instance && instance.type && instance.type.__IS_OPTION_ITEM__;
    }
    static defaultProps: DefaultProps = {
        disabled: false,
        focused: false,
        horizontalRule: "none",
        onToggle: () => void 0,
        role: "option",
        selected: false,
    };
    static __IS_OPTION_ITEM__ = true;

    getCheckComponent(): typeof Check | typeof Checkbox {
        if (this.props.variant === "check") {
            return Check;
        } else {
            return Checkbox;
        }
    }

    handleClick: () => void = () => {
        const {onClick, onToggle, value} = this.props;
        onToggle(value);
        if (onClick) {
            onClick();
        }
    };

    render(): React.ReactNode {
        const {
            disabled,
            focused,
            label,
            selected,
            testId,
            leftAccessory,
            horizontalRule,
            parentComponent,
            rightAccessory,
            style,
            subtitle1,
            subtitle2,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            value,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            onClick,
            onToggle,
            variant,
            role,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...sharedProps
        } = this.props;

        const CheckComponent = this.getCheckComponent();

        const defaultStyle = [
            styles.root,
            styles.optionItem,
            // pass optional styles from react-window (if applies)
            style,
        ];

        const listboxStyles = [
            styles.listboxOptionItem,
            focused && styles.listboxOptionItemFocused,
        ];

        const selectStyles = [styles.selectOptionItem];

        return (
            <DetailCell
                disabled={disabled}
                horizontalRule={horizontalRule}
                styles={{
                    root: [
                        defaultStyle,
                        parentComponent === "listbox"
                            ? listboxStyles
                            : selectStyles,
                    ],
                }}
                aria-selected={selected ? "true" : "false"}
                role={role}
                testId={testId}
                leftAccessory={
                    <>
                        {leftAccessory ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: sizing.size_080,
                                }}
                            >
                                <CheckComponent
                                    disabled={disabled}
                                    selected={selected}
                                />
                                {leftAccessory}
                            </View>
                        ) : (
                            <CheckComponent
                                disabled={disabled}
                                selected={selected}
                            />
                        )}
                    </>
                }
                rightAccessory={rightAccessory}
                subtitle1={subtitle1}
                title={
                    <BodyText tag="div" style={styles.label}>
                        {label}
                    </BodyText>
                }
                subtitle2={subtitle2}
                onClick={this.handleClick}
                tabIndex={parentComponent === "listbox" ? -1 : undefined}
                {...sharedProps}
            />
        );
    }
}
