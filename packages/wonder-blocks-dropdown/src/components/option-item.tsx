import * as React from "react";
import {StyleSheet} from "aphrodite";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {semanticColor, border, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {
    AriaProps,
    PropsFor,
    StyleType,
    View,
} from "@khanacademy/wonder-blocks-core";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import Check from "./check";
import Checkbox from "./checkbox";
import {CellProps, OptionLabel} from "../util/types";
import theme from "../theme";

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

type OptionItemInnerProps = OptionProps & {
    /**
     * The ref passed to `OptionItem`, forwarded to the root DOM element of
     * the item (the `DetailCell`).
     */
    forwardedRef?: React.Ref<HTMLElement>;
};

/**
 * The class implementation of `OptionItem`. It's wrapped by the exported
 * `OptionItem` so that refs are forwarded to the root DOM element.
 */
class OptionItemInner extends React.Component<OptionItemInnerProps> {
    static defaultProps: DefaultProps = {
        disabled: false,
        focused: false,
        horizontalRule: "none",
        onToggle: () => void 0,
        role: "option",
        selected: false,
    };

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
            forwardedRef,
            ...sharedProps
        } = this.props;

        const CheckComponent = this.getCheckComponent();

        const defaultStyle = [
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
                ref={forwardedRef}
            />
        );
    }
}

type OptionItemProps = Omit<PropsFor<typeof OptionItemInner>, "forwardedRef">;

/**
 * Check whether the given element is an `OptionItem` element.
 *
 * @param instance The element to check.
 * @returns `true` if the element's type is `OptionItem`.
 */
const isClassOf = (instance: React.ReactElement<unknown>): boolean => {
    const type: unknown = instance?.type;
    return (
        typeof type === "object" &&
        type !== null &&
        "__IS_OPTION_ITEM__" in type &&
        type.__IS_OPTION_ITEM__ === true
    );
};

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in SingleSelect or
 * MultiSelect.
 *
 * The ref is forwarded to the root DOM element of the item.
 */
const OptionItem = Object.assign(
    React.forwardRef(function OptionItem(
        props: OptionItemProps,
        ref: React.ForwardedRef<HTMLElement>,
    ): React.ReactElement {
        return <OptionItemInner {...props} forwardedRef={ref} />;
    }),
    {
        isClassOf,
        __IS_OPTION_ITEM__: true as const,
    },
);

export default OptionItem;

const focusedStyle = {
    // Override the default focus state for the cell element, so that it
    // can be added programmatically to the button element.
    borderRadius: theme.item.border.radius.default,
    outline: focusStyles.focus[":focus-visible"].outline,
    outlineOffset: `calc(${border.width.medium} * -1)`,
    // We need to use a thicker box-shadow to ensure that the inner ring
    // is visible when the cell is focused.
    boxShadow: `inset 0 0 0 calc(${border.width.medium}*2) ${semanticColor.focus.inner}`,
};

const resetFocusStyle = {
    // Reset the focus style for the cell element, so that it doesn't interfere
    // with the button element's focus state.
    outline: "none",
    boxShadow: "none",
};

const styles = StyleSheet.create({
    optionItem: {
        paddingBlock: theme.item.layout.padding.block,
        paddingInlineStart: theme.item.layout.padding.inlineStart,
        paddingInlineEnd: theme.item.layout.padding.inlineEnd,
        whiteSpace: "nowrap",
        // Make sure that the item is always at least as tall as 40px.
        minBlockSize: sizing.size_400,

        /**
         * States
         */
        ":active": {
            borderRadius: theme.item.border.radius.press,
        },

        [":is([aria-disabled=true])" as any]: {
            ":focus": resetFocusStyle,
        },
    },
    // Specific styles for Listbox and Combobox
    listboxOptionItem: {
        // This does not apply here as we use visual focus (instead of real DOM
        // focus).
        // @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant
        ":focus-visible": resetFocusStyle,
    },
    listboxOptionItemFocused: {
        ...focusedStyle,
        ":focus-visible": focusedStyle,
    },
    // Specific styles for MultiSelect and SingleSelect
    selectOptionItem: {
        // Allows programmatic focus to be applied to the item
        ":focus": focusedStyle,
    },

    label: {
        fontWeight: theme.item.font.weight,
        lineHeight: sizing.size_200,
        whiteSpace: "nowrap",
        userSelect: "none",
        // added to truncate strings that are longer than expected
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    hide: {
        visibility: "hidden",
    },
});
