// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import DropdownCore from "./dropdown-core.js";
import SelectOpener from "./select-opener.js";
import {selectDropdownStyle} from "../util/constants.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem} from "../util/types.js";

type Props = {|
    ...AriaProps,

    /**
     * The items in this select.
     */
    children?: Array<React.Element<OptionItem>>,

    /**
     * Callback for when the selection. Parameter is the value of the newly
     * selected item.
     */
    onChange: (selectedValue: string) => mixed,

    /**
     * Unique identifier attached to the field control. If used, we need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<button>` elements for screenreaders.
     */
    id?: string,

    /**
     * Placeholder for the opening component when there are no items selected.
     */
    placeholder: string,

    /**
     * Value of the currently selected item.
     */
    selectedValue?: string,

    /**
     * Whether this dropdown should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light: boolean,

    /**
     * Optional styling to add to the opener component wrapper.
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
    /**
     * Whether or not last open state change was triggered by a keyboard click.
     */
    keyboard?: boolean,
|};

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the
 * same item is selected, there is no callback.
 */
export default class SingleSelect extends React.Component<Props, State> {
    openerElement: ?HTMLElement;
    selectedIndex: number;

    static defaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);

        this.selectedIndex = 0;

        this.state = {
            open: false,
        };
    }

    handleOpenChanged = (open: boolean, keyboard?: boolean) => {
        this.setState({
            open,
            keyboard,
        });
    };

    handleToggle = (selectedValue: string) => {
        // Call callback if selection changed.
        if (selectedValue !== this.props.selectedValue) {
            this.props.onChange(selectedValue);
        }

        // Bring focus back to the opener element.
        if (open && this.openerElement) {
            this.openerElement.focus();
        }

        this.setState({
            open: false, // close the menu upon selection
        });
    };

    getMenuItems(): Array<DropdownItem> {
        const {children, selectedValue} = this.props;
        // Figure out which index should receive focus when this select opens
        // Needs to exclude counting items that are disabled
        let indexCounter = 0;
        this.selectedIndex = 0;

        return React.Children.toArray(children)
            .filter(Boolean)
            .map((option) => {
                const {disabled, value} = option.props;
                const selected = selectedValue === value;
                if (selected) {
                    this.selectedIndex = indexCounter;
                }
                if (!disabled) {
                    indexCounter += 1;
                }
                return {
                    component: option,
                    focusable: !disabled,
                    populatedProps: {
                        onToggle: this.handleToggle,
                        selected: selected,
                        variant: "check",
                    },
                };
            });
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const {
            alignment,
            children,
            disabled,
            dropdownStyle,
            id,
            light,
            placeholder,
            selectedValue,
            style,
            testId,
            // eslint-disable-next-line no-unused-vars
            onChange,
            ...sharedProps
        } = this.props;
        const {open} = this.state;

        const selectedItem = React.Children.toArray(children).find(
            (option) => option.props.value === selectedValue,
        );
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem ? selectedItem.props.label : placeholder;

        const items = this.getMenuItems();

        const opener = (
            <SelectOpener
                {...sharedProps}
                disabled={items.length === 0 || disabled}
                id={id}
                isPlaceholder={!selectedItem}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                ref={this.handleOpenerRef}
                testId={testId}
            >
                {menuText}
            </SelectOpener>
        );

        return (
            <DropdownCore
                role="listbox"
                alignment={alignment}
                dropdownStyle={[selectDropdownStyle, dropdownStyle]}
                initialFocusedIndex={this.selectedIndex}
                items={items}
                keyboard={this.state.keyboard}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
            />
        );
    }
}
