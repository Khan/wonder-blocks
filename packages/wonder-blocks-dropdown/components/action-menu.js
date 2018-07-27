// @flow
// A menu that consists of action items

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import SelectItem from "./select-item.js";
import SeparatorItem from "./separator-item.js";

import type {
    ActionItemProps,
    SelectItemProps,
    SeparatorProps,
} from "../util/types.js";

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

    /**
     * Style to apply to the opener.
     */
    style?: any,
|};

class ActionMenuOpener extends React.Component<OpenerProps> {
    static defaultProps = {
        disabled: false,
    };

    render() {
        const {children, disabled, onClick} = this.props;

        return (
            // $FlowFixMe: button doesn't allow 'role' yet
            <Button
                role="menu"
                color="default"
                disabled={disabled}
                kind="tertiary"
                light={false}
                onClick={onClick}
                style={[styles.opener]}
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

type ItemProps = ActionItemProps | SelectItemProps | SeparatorProps;

type MenuProps = {|
    /**
     * The items in this menu.
     */
    items: Array<ItemProps>,

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
     * Whether this menu is disabled. A disabled menu may not be opened and
     * does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Optional styling to add.
     */
    style?: any,
|};

type State = {|
    /**
     * Whether or not menu is open.
     */
    open: boolean,
|};

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

    handleSelected(selectedValue: string, oldSelectionState: boolean) {
        const {onChange, selectedValues} = this.props;

        // If either of these are not defined, return.
        if (!onChange || !selectedValues) {
            return;
        }

        if (oldSelectionState) {
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

    render() {
        const {
            alignment,
            disabled,
            items,
            menuText,
            selectedValues,
            style,
        } = this.props;

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
                style={style}
            >
                {menuText}
            </ActionMenuOpener>
        );

        const containsSelectItems = Array.isArray(selectedValues);

        const menuItems = items.map((item, index) => {
            if (item.type === "action") {
                return (
                    <ActionItem
                        key={index}
                        disabled={item.disabled}
                        indent={containsSelectItems}
                        label={item.label}
                        href={item.href}
                        clientNav={item.clientNav}
                        /* eslint-disable-next-line react/jsx-handler-names */
                        onClick={item.onClick}
                    />
                );
            } else if (item.type === "select") {
                return (
                    <SelectItem
                        key={index}
                        disabled={item.disabled}
                        label={item.label}
                        /* eslint-disable-next-line react/jsx-handler-names */
                        onClick={item.onClick}
                        onToggle={(value, state) =>
                            this.handleSelected(value, state)
                        }
                        selected={
                            selectedValues
                                ? selectedValues.includes(item.value)
                                : false
                        }
                        value={item.value}
                        variant="check"
                    />
                );
            } else {
                // Remaining possibility is type = "separator"
                return <SeparatorItem key={index} />;
            }
        });

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                light={false}
                onOpenChanged={(open) => this.handleOpenChanged(open)}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={[styles.menuTopSpace, style]}
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
        paddingLeft: 8,
        paddingRight: 8,
        whiteSpace: "nowrap",
    },

    // This is to adjust the space between the menu and the opener.
    menuTopSpace: {
        top: -4,
    },
});
