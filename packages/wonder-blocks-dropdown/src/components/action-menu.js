// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import DropdownOpener from "./dropdown-opener.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import DropdownCore from "./dropdown-core.js";

import ActionMenuOpenerCore from "./action-menu-opener-core.js";
import type {Item, DropdownItem, OpenerProps} from "../util/types.js";

type Props = {|
    ...AriaProps,

    /**
     * The items in this dropdown.
     */
    children?: Array<Item> | Item,

    /**
     * Text for the opener of this menu.
     */
    menuText: string,

    /**
     * Can be used to override the state of the ActionMenu by parent elements
     */
    opened?: boolean,

    /**
     * In controlled mode, use this prop in case the parent needs to be notified
     * when the menu opens/closes.
     */
    onToggle?: (opened: boolean) => mixed,

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
    alignment: "left" | "right",

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Styling specific to the dropdown component that isn't part of the opener,
     * passed by the specific implementation of the dropdown menu,
     */
    dropdownStyle?: StyleType,

    /**
     * Optional styling for the entire dropdown component.
     */
    style?: StyleType,

    /**
     * Optional CSS classes for the entire dropdown component.
     */
    className?: string,

    /**
     * The child function that returns the anchor the ActionMenu will be
     * activated by. This function takes eventState, which allows the opener
     * element to access pointer event state.
     */
    opener?: (openerProps: OpenerProps) => React.Element<any>,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    opened: boolean,
|};

type DefaultProps = {|
    alignment: $PropertyType<Props, "alignment">,
    disabled: $PropertyType<Props, "disabled">,
|};

/**
 * A menu that consists of various types of items.
 */
export default class ActionMenu extends React.Component<Props, State> {
    openerElement: ?HTMLElement;

    static defaultProps: DefaultProps = {
        alignment: "left",
        disabled: false,
    };

    state: State = {
        opened: false,
    };

    /**
     * Used to sync the `opened` state when this component acts as a controlled
     * component
     */
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): ?Partial<State> {
        return {
            opened:
                typeof props.opened === "boolean" ? props.opened : state.opened,
        };
    }

    handleItemSelected: () => void = () => {
        // close menu
        this.handleOpenChanged(false);

        // Bring focus back to the opener element.
        if (this.openerElement) {
            this.openerElement.focus();
        }
    };

    handleOpenChanged: (opened: boolean) => void = (opened) => {
        this.setState({
            opened,
        });

        if (this.props.onToggle) {
            this.props.onToggle(opened);
        }
    };

    handleOptionSelected: (selectedValue: string) => void = (selectedValue) => {
        const {onChange, selectedValues} = this.props;

        // If either of these are not defined, return.
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

    getMenuItems(): Array<DropdownItem> {
        const {children, selectedValues} = this.props;
        const allChildren = React.Children.toArray(children).filter(Boolean);

        // verify if there's at least one OptionItem element to indent the
        // possible Action items
        const isOptionItemIncluded = allChildren.some((item) =>
            OptionItem.isClassOf(item),
        );

        return allChildren.map((item) => {
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
                        indent: isOptionItemIncluded,
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
    }

    handleOpenerRef: (node: any) => void = (node) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    handleClick: (e: SyntheticEvent<>) => void = (e) => {
        this.handleOpenChanged(!this.state.opened);
    };

    renderOpener(numItems: number): React.Element<typeof DropdownOpener> {
        const {disabled, menuText, opened, opener, testId} = this.props;

        return (
            <DropdownOpener
                onClick={this.handleClick}
                disabled={numItems === 0 || disabled}
                text={menuText}
                ref={this.handleOpenerRef}
                testId={opener ? undefined : testId}
            >
                {opener
                    ? opener
                    : (openerProps) => {
                          const {
                              // eslint-disable-next-line no-unused-vars
                              text,
                              ...eventState
                          } = openerProps;
                          return (
                              <ActionMenuOpenerCore
                                  {...eventState}
                                  disabled={disabled}
                                  opened={!!opened}
                                  testId={testId}
                              >
                                  {menuText}
                              </ActionMenuOpenerCore>
                          );
                      }}
            </DropdownOpener>
        );
    }

    render(): React.Node {
        const {alignment, dropdownStyle, style, className} = this.props;

        const items = this.getMenuItems();
        const dropdownOpener = this.renderOpener(items.length);

        return (
            <DropdownCore
                role="menu"
                style={style}
                className={className}
                opener={dropdownOpener}
                alignment={alignment}
                open={this.state.opened}
                items={items}
                openerElement={this.openerElement}
                onOpenChanged={this.handleOpenChanged}
                dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
            />
        );
    }
}

const styles = StyleSheet.create({
    caret: {
        marginLeft: 4,
    },
    // The design calls for additional offset around the opener.
    opener: {
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    // This is to adjust the space between the menu and the opener.
    menuTopSpace: {
        top: -4,
    },
});
