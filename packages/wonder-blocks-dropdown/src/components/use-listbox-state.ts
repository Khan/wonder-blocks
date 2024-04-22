import {PropsFor} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

type OptionItemComponent = React.ReactElement<PropsFor<typeof OptionItem>>;
type ChildrenAsOptionItem = Array<OptionItemComponent>;

export default function useListboxState(
    options: ChildrenAsOptionItem,
    disabled: boolean | undefined,
    value: string | Array<string>,
    disableSpaceSelection = false,
    onSelectedChange: (value: string | Array<string>) => void,
) {
    // find the index of the first selected Item
    const selectedValueIndex = React.useMemo(() => {
        const firstValue = Array.isArray(value) ? value[0] : value;
        if (firstValue === "" || firstValue === undefined) {
            // Focus on the first item if no value is selected
            return 0;
        }
        return options.findIndex((item) => item.props.value === firstValue);
    }, [options, value]);

    const [focusedIndex, setFocusedIndex] = React.useState(selectedValueIndex);
    const [isFocused, setIsFocused] = React.useState(false);

    const [selected, setSelected] = React.useState<string | Array<string>>(
        value || "",
    );

    const focusItem = (index: number) => {
        setFocusedIndex(index);

        // Update the aria-activedescendant attribute
    };

    const focusPreviousItem = () => {
        if (focusedIndex === 0) {
            focusItem(options.length - 1);
        } else {
            focusItem(focusedIndex - 1);
        }
    };

    const focusNextItem = () => {
        if (focusedIndex === options.length - 1) {
            focusItem(0);
        } else {
            focusItem(focusedIndex + 1);
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
                focusItem(0);
                return;
            case "End":
                event.preventDefault();
                focusItem(options.length - 1);
                return;
            case "Enter":
            case " ":
                // Only handle space if the listbox is focused
                if (key === " " && disableSpaceSelection) {
                    return;
                }
                // Prevent form submission
                event.preventDefault();

                const optionItem = options[focusedIndex] as OptionItemComponent;

                if (optionItem.props.disabled) {
                    return;
                }

                setSelected(optionItem.props.value);
                onSelectedChange(optionItem.props.value);
                // this.handleItemClick(focusedIndex, children[focusedIndex]);
                return;
        }
    };

    // Some keys should be handled during the keyup event instead.
    const handleKeyUp = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case " ":
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

    const handleFocus = () => {
        if (!disabled) {
            setIsFocused(true);
        }
    };

    const handleBlur = () => {
        if (!disabled) {
            setIsFocused(false);
        }
    };

    const handleClick = React.useCallback(
        (value: string) => {
            const index = options.findIndex(
                (item) => item.props.value === value,
            );

            const component = options[index] as OptionItemComponent;

            if (component.props.disabled) {
                return;
            }

            focusItem(index);
            setSelected(component.props.value);
        },
        [options],
    );

    const renderList = React.useMemo(() => {
        const childrenList = React.Children.toArray(options);
        // if we don't need to virtualize, we can render the list directly
        return childrenList.map((item, index) => {
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
    }, [options, disabled, focusedIndex, isFocused, selected, handleClick]);

    return {
        focusedIndex,
        setFocusedIndex,
        isFocused,
        renderList,
        selected,
        // handlers
        handleKeyDown,
        handleKeyUp,
        handleFocus,
        handleBlur,
    };
}
