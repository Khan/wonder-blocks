import * as React from "react";
import {PropsFor, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {color} from "@khanacademy/wonder-blocks-tokens";
import OptionItem from "./option-item";

type OptionItemComponent = React.ReactElement<PropsFor<typeof OptionItem>>;
type ChildrenAsOptionItem = Array<OptionItemComponent>;

type Props = {
    /**
     * The list of items to display in the listbox.
     */
    children: ChildrenAsOptionItem;

    /**
     * Whether the use can select more than one option item. Defaults to
     * `single`.
     *
     * If `multiple` is selected, `aria-multiselectable={true}` is set
     * internally in the listbox element.
     */
    selectionType: "single" | "multiple";

    /**
     * The value of the currently selected items.
     */
    value: string | Array<string>;

    /**
     * Callback for when the selection changes. The value passed as an argument
     * is an updated array of the selected value(s).
     */
    onChange: (value: string | Array<string>) => void;

    /**
     * A reference to the element that describes the listbox.
     */
    "aria-labelledby"?: string;

    /**
     * Takes as its value the id of the currently focused element within the
     * option items collection.
     *
     * Instead of the screen reader moving focus between owned elements,
     * aria-activedescendant is used to refer to the currently active element,
     * informing assistive technology users of the currently active element when
     * focused.
     */
    "aria-activedescendant"?: string;

    /**
     * Whether the listbox is disabled.
     *
     * A disabled combobox does not support interaction, but it supports focus
     * for a11y reasons. It internally maps to`aria-disabled`. Defaults to
     * false.
     */
    disabled?: boolean;

    /**
     * Whether to display the light version of this component.
     *
     * For use when the component is used on a dark background. Defaults to
     * false.
     */
    light?: boolean;

    /**
     * Whether to display the loading state to let the user know that the
     * results are being loaded asynchronously. Defaults to false.
     */
    loading?: boolean;

    /**
     * Optional custom styles applied to the listbox container.
     */
    style?: StyleType;

    /**
     * Includes the listbox in the page tab sequence.
     */
    tabIndex?: number;

    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

export default function Listbox({
    children,
    disabled,
    value,
    tabIndex = 0,
}: Props) {
    const [selected, setSelected] = React.useState<string | Array<string>>(
        value || "",
    );
    // find the index of the first selected Item
    const selectedValueIndex = React.useMemo(() => {
        const firstValue = Array.isArray(value) ? value[0] : value;
        if (firstValue === "" || firstValue === undefined) {
            // Focus on the first item if no value is selected
            return 0;
        }
        return children.findIndex((item) => item.props.value === firstValue);
    }, [children, value]);

    const [focusedIndex, setFocusedIndex] = React.useState(selectedValueIndex);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleClick = React.useCallback(
        (value: string) => {
            const index = children.findIndex(
                (item) => item.props.value === value,
            );

            const component = children[index] as OptionItemComponent;

            if (component.props.disabled) {
                return;
            }

            setFocusedIndex(index);
            setSelected(component.props.value);
        },
        [children],
    );

    const renderList = React.useMemo(() => {
        const childrenList = React.Children.toArray(children);
        // if we don't need to virtualize, we can render the list directly
        return childrenList.map((item, index) => {
            // if (SeparatorItem.isClassOf(item.component)) {
            //     return item.component;
            // }
            const component = item as OptionItemComponent;

            const isSelected = selected.includes(component.props.value);
            // Render OptionItem and/or ActionItem elements.
            return React.cloneElement(component, {
                key: index,
                focused: isFocused && index === focusedIndex,
                disabled: component.props.disabled || disabled || false,
                selected: isSelected,
                variant: "check",
                parentComponent: "listbox",
                id: `option-` + index.toString(),
                onClick: () => {
                    handleClick(component.props.value);
                },
                role: "option",
            });
        });
    }, [children, disabled, focusedIndex, isFocused, selected, handleClick]);

    const focusPreviousItem = () => {
        if (focusedIndex === 0) {
            setFocusedIndex(children.length - 1);
        } else {
            setFocusedIndex(focusedIndex - 1);
        }
    };

    const focusNextItem = () => {
        if (focusedIndex === children.length - 1) {
            setFocusedIndex(0);
        } else {
            setFocusedIndex(focusedIndex + 1);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const {key} = event;
        switch (key) {
            case "ArrowUp":
                event.preventDefault();
                focusPreviousItem();
                return;
            case "ArrowDown":
                event.preventDefault();
                focusNextItem();
                return;
            case "Home":
                event.preventDefault();
                setFocusedIndex(0);
                return;
            case "End":
                event.preventDefault();
                setFocusedIndex(children.length - 1);
                return;
            case "Enter":
            case " ":
                // Only handle space if the listbox is focused
                if (key === " " && tabIndex !== 0) {
                    return;
                }
                // Prevent form submission
                event.preventDefault();

                const optionItem = children[
                    focusedIndex
                ] as OptionItemComponent;

                if (optionItem.props.disabled) {
                    return;
                }

                setSelected(optionItem.props.value);
                // this.handleItemClick(focusedIndex, children[focusedIndex]);
                return;
        }
    };

    // Some keys should be handled during the keyup event instead.
    const handleKeyUp = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case " ":
            case "Enter":
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case "Escape":
                // Close only the dropdown, not other elements that are
                // listening for an escape press
                // if (open) {
                // event.stopPropagation();
                // this.restoreTabOrder();
                // onOpenChanged(false);
                // }
                return;
        }
    };

    return (
        <View
            role="listbox"
            aria-disabled={disabled}
            // TODO(juan): Use unique id
            aria-activedescendant={focusedIndex.toString()}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => !disabled && setIsFocused(false)}
            style={[styles.listbox, disabled && styles.disabled]}
            tabIndex={tabIndex}
        >
            {renderList}
        </View>
    );
}

const styles = StyleSheet.create({
    listbox: {
        outline: "none",
    },
    disabled: {
        color: color.offBlack64,
    },
});
