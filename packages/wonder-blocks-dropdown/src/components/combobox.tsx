import * as React from "react";
import {PropsFor, StyleType} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import OptionItem from "./option-item";
import Listbox from "./listbox";
import useListboxState from "./use-listbox-state";

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
     * Whether the combobox is disabled.
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
     * Custom styles to add to the combobox element (input).
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
export default function Combobox({
    children,
    disabled,
    value,
    tabIndex = 0,
}: Props) {
    const [internalValue, setValue] = React.useState<string>(
        (value as string) || "",
    );
    const {
        focusedIndex,
        setFocusedIndex,
        selected,
        handleKeyDown,
        // handleKeyUp,
        handleFocus,
        handleBlur,
        renderList,
    } = useListboxState(children, disabled, value, true, (selectedValue) => {
        setValue(selectedValue as string);
    });

    const [open, setOpen] = React.useState<boolean>(false);

    const focusOnFilteredItem = () => {
        const lowercasedSearchText = internalValue.toLowerCase();
        const itemIndex = children.findIndex(
            (item) =>
                !item.props.disabled &&
                item.props.value.toLowerCase().startsWith(lowercasedSearchText),
        );

        if (itemIndex) {
            setFocusedIndex(itemIndex);
        }
        // const filteredItems = children.filter(
        //     (item) => !item.props.disabled,
        // ) as ChildrenAsOptionItem;
        // const item = filteredItems[index];
        // if (item) {
        //     setSelected(item.props.value);
        // }
    };

    return (
        <>
            <TextField
                id="tf-1"
                value={internalValue}
                onChange={(value: string) => {
                    setValue(value);
                    focusOnFilteredItem();
                }}
                onFocus={() => {
                    console.log("onFocus");
                    setOpen(true);
                    // setIsFocused(true);
                    handleFocus();
                }}
                autoComplete="off"
                onBlur={() => {
                    setOpen(false);
                    // setIsFocused(false);
                    handleBlur();
                }}
                aria-controls={open ? "listbox-1" : undefined}
                onKeyDown={(e: React.KeyboardEvent) => {
                    handleKeyDown(e);

                    // if one alphanumeric character is pressed, open the listbox
                    if (e.key.length === 1) {
                        setOpen(true);
                    }

                    if (e.key === "Escape") {
                        setOpen(false);
                    }
                }}
                // onKeyUp={handleKeyUp}
                aria-activedescendant={
                    open ? focusedIndex.toString() : undefined
                }
            />
            {open && (
                <Listbox
                    id="listbox-1"
                    value={internalValue}
                    onChange={setValue}
                    tabIndex={-1}
                >
                    {renderList}
                </Listbox>
            )}
        </>
    );
}
