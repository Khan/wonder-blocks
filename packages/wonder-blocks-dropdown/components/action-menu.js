// @flow
// A menu that consists of action items

import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import SelectItem from "./select-item.js";
import SeparatorItem from "./separator-item.js";

import type {
    ActionItemProps,
    SelectItemProps,
    SeparatorProps,
} from "../utils/types.js";

type OpenerProps = {
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
};

class ActionMenuOpener extends React.Component<OpenerProps> {
    static defaultProps = {
        disabled: false,
    };

    render() {
        const {children, disabled, onClick} = this.props;

        return (
            <Button
                role="menu"
                color={"default"}
                disabled={disabled}
                kind={"tertiary"}
                light={false}
                onClick={onClick}
            >
                {children}
            </Button>
        );
    }
}

type ItemProps = ActionItemProps | SelectItemProps | SeparatorProps;

type MenuProps = {
    /**
     * The items in this menu.
     */
    items: Array<ItemProps>,

    /**
     * Text for the opener of this menu.
     */
    menuText: string,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right",

    /**
     * If the menu contains an item that has selection state, we need to indent
     * all non-selected items to have the text labels left-aligned.
     * This is technically a function of whether at least one item is of type
     * ActionItemWithSelectionProps.
     */
    containsSelectionOptions?: boolean,

    /**
     * Whether this menu is disabled. A disabled menu may not be opened and
     * does not support interaction. Defaults to false.
     */
    disabled?: boolean,

    /**
     * Optional styling to add.
     */
    style?: any,
};

type State = {
    /**
     * Whether or not menu is open.
     */
    open: boolean,

    /**
     * Array of the values of the selected elements.
     */
    selected: Array<string>,
};

export default class ActionMenu extends React.Component<MenuProps, State> {
    static defaultProps = {
        alignment: "left",
        containsSelectionOptions: false,
        disabled: false,
    };

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            open: false,
            selected: props.items
                .filter((item) => item.type === "select" && item.selected)
                // item.type should always be "select" because we filter for it
                // checking again to satisfy flow
                .map((item) => (item.type === "select" ? item.value : "")),
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelectItem(selectedValue: string, newSelectedState: boolean) {
        const {selected} = this.state;

        const newValues = selected || [];

        if (newSelectedState) {
            newValues.push(selectedValue);
        } else {
            newValues.splice(newValues.indexOf(selectedValue), 1);
        }

        this.setState({
            selected: newValues,
        });
    }

    render() {
        const {
            items,
            containsSelectionOptions,
            menuText,
            alignment,
            disabled,
            style,
        } = this.props;

        const {open, selected} = this.state;

        const opener = (
            <ActionMenuOpener
                disabled={disabled}
                onClick={() => this.toggleMenu()}
            >
                {menuText}
            </ActionMenuOpener>
        );

        const menuItems = items.map((item, index) => {
            if (item.type === "separator") {
                return <SeparatorItem key={index} />;
            } else if (item.type === "select") {
                return (
                    <SelectItem
                        disabled={item.disabled}
                        key={index}
                        label={item.label}
                        onClick={item.onClick}
                        onToggle={(value, state) =>
                            this.handleSelectItem(value, state)
                        }
                        selected={selected.includes(item.label)}
                        value={item.label}
                        variant={"check"}
                    />
                );
            } else if (item.type === "action") {
                return (
                    <ActionItem
                        disabled={item.disabled}
                        key={index}
                        indent={containsSelectionOptions}
                        label={item.label}
                        onClick={item.onClick}
                    />
                );
            }
        });

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                open={open}
                opener={opener}
                style={style}
            />
        );
    }
}
