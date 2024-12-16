import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";

import {useId} from "react";
import {useListbox} from "../hooks/use-listbox";
import {MaybeValueOrValues, OptionItemComponent} from "../util/types";

type Props = {
    /**
     * The list of items to display in the listbox.
     */
    children: Array<OptionItemComponent>;

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
    value?: MaybeValueOrValues;

    /**
     * Callback for when the selection changes. The value passed as an argument
     * is an updated array of the selected value(s).
     */
    onChange?: (value: MaybeValueOrValues) => void;

    /**
     * Provides a label for the listbox.
     */
    "aria-label"?: string;

    /**
     * A reference to the element that describes the listbox.
     */
    "aria-labelledby"?: string;

    /**
     * Whether the listbox is disabled.
     *
     * A disabled combobox does not support interaction, but it supports focus
     * for a11y reasons. It internally maps to`aria-disabled`. Defaults to
     * false.
     */
    disabled?: boolean;

    /**
     * The unique identifier of the listbox element.
     */
    id?: string;

    /**
     * TODO(WB-1678): Add async support to the listbox.
     *
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

/**
 * A standalone version of the `Listbox` component that can be inserted directly
 * into the DOM (it doesn't require a parent component like combobox or select).
 */
function StandaloneListbox(props: Props) {
    const {
        children,
        disabled,
        id,
        onChange,
        selectionType = "single",
        style,
        tabIndex = 0,
        testId,
        value,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
    } = props;

    const generatedUniqueId = useId();
    const uniqueId = id ?? generatedUniqueId;

    const {
        focusedIndex,
        isListboxFocused,
        renderList,
        selected,
        // event handlers
        handleKeyDown,
        handleKeyUp,
        handleFocus,
        handleBlur,
    } = useListbox({children, disabled, id: uniqueId, selectionType, value});

    React.useEffect(() => {
        // If the value changes, update the parent component.
        if (selected && selected !== value) {
            onChange?.(selected);
        }
    }, [onChange, selected, value]);

    return (
        <View
            role="listbox"
            id={uniqueId}
            style={[styles.listbox, style, disabled && styles.disabled]}
            tabIndex={tabIndex}
            testId={testId}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-multiselectable={selectionType === "multiple"}
            // The following props are specific to the standalone version of the
            // listbox.
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // This is used to inform assistive technology users of the
            // currently active element when focused.
            // NOTE: This uses visual focus, not actual DOM focus.
            // @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_vs_selection
            aria-activedescendant={
                isListboxFocused ? renderList[focusedIndex].props.id : undefined
            }
        >
            {renderList}
        </View>
    );
}

/**
 * A `Listbox` component presents a list of options and allows a user to select
 * one or more of them. A listbox that allows a single option to be chosen is a
 * single-select listbox; one that allows multiple options to be selected is a
 * multi-select listbox.
 *
 * ### Usage
 *
 * ```tsx
 * import {Listbox} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <Listbox>
 *  <OptionItem label="Apple" value="apple" />
 *  <OptionItem disabled label="Strawberry" value="strawberry" />
 *  <OptionItem label="Pear" value="pear" />
 * </Listbox>
 * ```
 */
export default function Listbox(props: Props) {
    const {
        children,
        disabled,
        id,
        selectionType = "single",
        style,
        tabIndex = 0,
        testId,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
    } = props;

    // This version is inlined. The standalone version is used when the listbox
    // is directly rendered in the DOM.
    if (tabIndex === 0) {
        return <StandaloneListbox {...props} />;
    }

    // This listbox is opened by a separate widget, like a combobox.
    return (
        <View
            role="listbox"
            id={id}
            style={[styles.listbox, style, disabled && styles.disabled]}
            tabIndex={tabIndex}
            testId={testId}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-multiselectable={selectionType === "multiple"}
        >
            {children}
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
