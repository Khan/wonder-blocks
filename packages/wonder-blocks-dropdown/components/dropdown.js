// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import type {
    AriaProps,
    StyleType,
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import DropdownCore from "./dropdown-core.js";
import DropdownAnchor from "./dropdown-anchor.js";
import type {Item, DropdownItem} from "../util/types.js";

type SelectType = "single" | "multi";
type Props = {|
    ...AriaProps,

    /**
     * The child function, that takes in state the state of the element and
     * returns an Element which will become the opener element for the dropdown.
     */
    children: (eventState: ClickableState) => React.Element<any>,

    /**
     * Can be used to override the state of the Dropdown by parent elements
     */
    opened?: boolean,

    /**
     * In controlled mode, use this prop in case the parent needs to be notified
     * when the menu opens/closes.
     */
    onToggle?: (opened: boolean) => mixed,

    /**
     * The items present in the Dropdown
     */
    menuItems: Array<?(Item | false)> | Item,

    /**
     * Closes the Dropdown when an OptionItem is selected, use this
     * prop if you want single-select OptionItems
     */
    selectionType?: SelectType,

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

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled?: boolean,
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
        selectionType: "multi",
    };

    state = {
        opened: false,
        keyboard: false,
    };

    /**
     * Used to sync the `opened` state when this component acts as a controlled
     * component
     */
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            opened:
                typeof props.opened === "boolean" ? props.opened : state.opened,
        };
    }

    handleItemSelected = () => {
        // close menu
        this.handleOpenChanged(false);

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

        if (this.props.onToggle) {
            this.props.onToggle(opened);
        }
    };

    handleOptionSelected = (selectedValue: string) => {
        const {onChange, selectedValues, selectionType} = this.props;
        const singleSelect = selectionType === "single";
        if (!onChange || !selectedValues) {
            return;
        }

        if (selectedValues.includes(selectedValue)) {
            const index = selectedValues.indexOf(selectedValue);
            const updatedSelection = [
                ...selectedValues.slice(0, index),
                ...selectedValues.slice(index + 1),
            ];
            onChange(singleSelect ? [selectedValue] : updatedSelection);
        } else {
            // Item was newly selected
            onChange(
                singleSelect
                    ? [selectedValue]
                    : [...selectedValues, selectedValue],
            );
        }

        singleSelect
            ? this.handleOpenChanged(false)
            : this.handleItemSelected();
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

    renderAnchorChildren(
        eventState: ClickableState,
        handlers: ClickableHandlers,
    ) {
        const renderedChildren = this.props.children(eventState);

        return React.cloneElement(renderedChildren, {
            ...handlers,
            "data-test-id": this.props.testId,
            onClick: renderedChildren.props.onClick
                ? (e: SyntheticMouseEvent<>) => {
                      // This is done to avoid overriding a
                      // custom onClick handler inside the
                      // children node
                      renderedChildren.props.onClick(e);
                      handlers.onClick(e);
                  }
                : handlers.onClick,
        });
    }

    render() {
        const {
            style,
            alignment,
            dropdownStyle,
            /* eslint-disable no-unused-vars */
            onChange,
            selectedValues,
            "aria-disabled": ariaDisabled,
        } = this.props;

        const ClickableBehavior = getClickableBehavior();
        const opener = (
            <ClickableBehavior
                onClick={this.handleClick}
                disabled={this.props.disabled}
            >
                {(eventState, handlers) => (
                    <DropdownAnchor
                        anchorRef={(ref) =>
                            (this.openerElement = ((ReactDOM.findDOMNode(
                                ref,
                            ): any): ?HTMLElement))
                        }
                    >
                        {this.renderAnchorChildren(eventState, handlers)}
                    </DropdownAnchor>
                )}
            </ClickableBehavior>
        );

        return (
            <DropdownCore
                role="menu"
                style={style}
                opener={opener}
                alignment={alignment}
                open={this.state.opened}
                items={this._getMenuItems()}
                keyboard={this.state.keyboard}
                openerElement={this.openerElement}
                onOpenChanged={this.handleOpenChanged}
                dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
            />
        );
    }
}

const styles = StyleSheet.create({
    menuTopSpace: {
        top: 0,
    },
});
