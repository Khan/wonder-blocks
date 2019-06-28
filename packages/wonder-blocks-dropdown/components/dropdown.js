// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import type {
    AriaProps,
    StyleType,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import DropdownCore from "./dropdown-core.js";
import type {Item, DropdownItem} from "../util/types.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import DropdownAnchor from "./dropdown-anchor.js";

type Props = {|
    ...AriaProps,

    /**
     * The child function, that takes in state the state of the element and
     * returns an Element which will become the opener element for the dropdown.
     */
    children: (eventState: ClickableState) => React.Element<any>,

    /**
     * Can be used to override the state of the Dropdown by parent elemnents
     */
    opened?: boolean,

    /**
     * The items present in the Dropdown
     */
    menuItems: Array<Item> | Item,

    /**
     * A callback that returns items that are newly selected. Use only if this
     * menu contains select items (and make sure selectedValues is defined).
     */
    onChange?: (selectedItems: Array<string>) => mixed,

    /**
     * The values of the items that are currently selected. Use only if this
     * menu contains select items (and make sure onChange is defined).
     */
    selectedValues?: Array<string>,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right",

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Optional styling that can be passed to DropdownCore.
     */
    style?: StyleType,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,
|};

type State = {|
    /**
     * Whether or not the dropdown is currently open.
     */
    opened: boolean,

    /**
     * Whether or not last open state change was triggered by a keyboard click.
     */
    keyboard?: boolean,
|};

export default class Dropdown extends React.Component<Props, State> {
    openerElement: ?HTMLElement;

    static defaultProps = {
        alignment: "left",
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            opened: false,
            keyboard: false,
        };
    }

    handleItemSelected = () => {
        // Bring focus back to the opener element.
        if (this.openerElement) {
            this.openerElement.focus();
        }
    };

    handleOpenChanged = (opened: boolean, keyboard?: boolean) => {
        this.setState({
            opened,
            keyboard,
        });
    };

    handleOptionSelected = (selectedValue: string) => {
        const {onChange, selectedValues} = this.props;

        if (!onChange || !selectedValues) {
            return;
        }

        if (selectedValues.includes(selectedValue)) {
            const index = selectedValues.indexOf(selectedValue);
            const updatedSelection = [
                ...selectedValues.slice(0, index),
                ...selectedValues.slice(index + 1),
            ];
            onChange(updatedSelection);
        } else {
            // Item was newly selected
            onChange([...selectedValues, selectedValue]);
        }
        this.handleItemSelected();
    };

    handleClick = (e: SyntheticEvent<>) => {
        return this.handleOpenChanged(!this.state.opened, e.type === "keyup");
    };

    _getMenuItems = (): Array<DropdownItem> => {
        const {selectedValues} = this.props;
        return React.Children.toArray(this.props.menuItems)
            .filter(Boolean)
            .map((item) => {
                const {value, disabled} = item.props;
                const itemObject = {
                    component: item,
                    focusable:
                        ActionItem.isClassOf(item) || OptionItem.isClassOf(item)
                            ? !disabled
                            : false,
                    populatedProps: {},
                };
                if (ActionItem.isClassOf(item)) {
                    return {
                        ...itemObject,
                        populatedProps: {
                            indent: true,
                            onClick: this.handleItemSelected,
                        },
                    };
                } else if (OptionItem.isClassOf(item)) {
                    return {
                        ...itemObject,
                        populatedProps: {
                            onToggle: this.handleOptionSelected,
                            selected: selectedValues
                                ? selectedValues.includes(value)
                                : false,
                            variant: "check",
                        },
                    };
                } else {
                    return itemObject;
                }
            });
    };

    render() {
        const {
            children,
            alignment,
            dropdownStyle,
            /* eslint-disable no-unused-vars */
            onChange,
            selectedValues,
            "aria-disabled": ariaDisabled,
            ...sharedProps
        } = this.props;

        const ClickableBehavior = getClickableBehavior();
        const opener = (
            <ClickableBehavior onClick={this.handleClick}>
                {(eventState, handlers) => (
                    <DropdownAnchor
                        anchorRef={(ref) =>
                            (this.openerElement = ((ReactDOM.findDOMNode(
                                ref,
                            ): any): ?HTMLElement))
                        }
                    >
                        {React.cloneElement(children(eventState), handlers)}
                    </DropdownAnchor>
                )}
            </ClickableBehavior>
        );

        return (
            <DropdownCore
                alignment={alignment}
                items={this._getMenuItems()}
                keyboard={this.state.keyboard}
                style={this.props.style}
                dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
                onOpenChanged={this.handleOpenChanged}
                open={this.state.opened}
                opener={opener}
                openerElement={this.openerElement}
                role="menu"
            />
        );
    }
}

const styles = StyleSheet.create({
    menuTopSpace: {
        top: 0,
    },
});
