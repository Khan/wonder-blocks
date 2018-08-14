// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import Dropdown from "./dropdown.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";

type OpenerProps = {|
    /**
     * Display text for the opener.
     */
    children: string,
    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled?: boolean,
    /**
     * Callback for when the opener is pressed.
     */
    onClick: () => void,
|};

class ActionMenuOpener extends React.Component<OpenerProps> {
    static defaultProps = {
        disabled: false,
    };

    render() {
        const {children, disabled, onClick} = this.props;

        return (
            // $FlowFixMe: button doesn't allow 'role' prop or Icon as children
            <Button
                role="menu"
                color="default"
                disabled={disabled}
                kind="tertiary"
                light={false}
                onClick={onClick}
                style={styles.opener}
            >
                {children}
                <Icon
                    icon={icons.caretDown}
                    size="small"
                    style={styles.caret}
                />
            </Button>
        );
    }
}

type MenuProps = {|
    /**
     * The items in this dropdown.
     */
    children: Array<
        React.Element<
            typeof ActionItem | typeof OptionItem | typeof SeparatorItem,
        >,
    >,

    /**
     * Text for the opener of this menu.
     */
    menuText: string,

    /**
     * A callback that returns items that are newly selected. Use only if this
     * menu contains select items (and make sure selectedValues is defined).
     */
    onChange?: (selectedItems: Array<string>) => void,

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
     * Optional styling to add to the opener component wrapper.
     */
    style?: any,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
|};

/**
 * A menu that consists of various types of items.
 */
export default class ActionMenu extends React.Component<MenuProps, State> {
    openerElement: ?Element;

    static defaultProps = {
        alignment: "left",
        disabled: false,
    };

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleOpenChanged(open: boolean) {
        this.setState({
            open: open,
        });
    }

    handleSelected(selectedValue: string) {
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
    }

    getMenuItems(): Array<
        React.Element<
            typeof ActionItem | typeof OptionItem | typeof SeparatorItem,
        >,
    > {
        const {children, selectedValues} = this.props;
        const containsOptionItems = Array.isArray(selectedValues);

        return React.Children.map(children, (item, index) => {
            if (item.type === ActionItem) {
                return React.cloneElement(item, {
                    indent: containsOptionItems,
                });
            } else if (item.type === OptionItem) {
                return React.cloneElement(item, {
                    onToggle: (value) => this.handleSelected(value),
                    selected: selectedValues
                        ? selectedValues.includes(item.props.value)
                        : false,
                    variant: "check",
                });
            } else {
                return item;
            }
        });
    }

    render() {
        const {alignment, disabled, menuText, style} = this.props;

        const {open} = this.state;

        const opener = (
            <ActionMenuOpener
                disabled={disabled}
                onClick={() => this.handleOpenChanged(!open)}
                ref={(node) =>
                    (this.openerElement = ((ReactDOM.findDOMNode(
                        node,
                    ): any): Element))
                }
            >
                {menuText}
            </ActionMenuOpener>
        );

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={styles.menuTopSpace}
                light={false}
                onOpenChanged={(open) => this.handleOpenChanged(open)}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
            >
                {this.getMenuItems()}
            </Dropdown>
        );
    }
}

const styles = StyleSheet.create({
    caret: {
        marginLeft: 4,
    },

    // The design calls for additional offset around the opener.
    opener: {
        paddingLeft: 8,
        paddingRight: 8,
        whiteSpace: "nowrap",
    },

    // This is to adjust the space between the menu and the opener.
    menuTopSpace: {
        top: -4,
    },
});
