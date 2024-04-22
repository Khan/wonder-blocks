import * as React from "react";
import {PropsFor, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {color} from "@khanacademy/wonder-blocks-tokens";
import OptionItem from "./option-item";
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

    /**
     * The id of the listbox element.
     */
    id?: string;
};

export default function Listbox({
    children,
    disabled,
    id,
    value,
    tabIndex = 0,
}: Props) {
    const {
        focusedIndex,
        isFocused,
        renderList,
        handleKeyDown,
        handleKeyUp,
        handleFocus,
        handleBlur,
    } = useListboxState(children, disabled, value);

    let childrenOutput = children;

    const getExtraProps = () => {
        const attributes: Record<string, any> = {};

        // Add event handlers when the listbox is used directly (not as a combobox)
        if (tabIndex === 0) {
            attributes.onKeyDown = handleKeyDown;
            attributes.onKeyUp = handleKeyUp;
            attributes.onFocus = handleFocus;
            attributes.onBlur = handleBlur;
            // TODO(juan): Use unique id
            const focusedItem = renderList[focusedIndex] as OptionItemComponent;
            attributes["aria-activedescendant"] = isFocused
                ? focusedItem.props.id
                : undefined;
            childrenOutput = renderList;
        }
        return attributes;
    };

    return (
        <View
            role="listbox"
            aria-disabled={disabled}
            id={id}
            style={[styles.listbox, disabled && styles.disabled]}
            tabIndex={tabIndex}
            {...getExtraProps()}
        >
            {childrenOutput}
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
