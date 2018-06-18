// @flow
// A menu that consists of action items

import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";

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

type ActionItemProps = {
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Callback to perform the action. */
    onClick: () => void,
    // TODO:incorporate
    selected?: boolean,
};

type ActionMenuProps = {
    /**
     * The items in this menu.
     */
    items: Array<ActionItemProps>,

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
     * TODO. Defaults to false.
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
};

export default class ActionMenu extends React.Component<
    ActionMenuProps,
    State,
> {
    static defaultProps = {
        alignment: "left",
        containsSelectionOptions: false,
        disabled: false,
    };

    constructor(props: ActionMenuProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    render() {
        const {
            items,
            menuText,
            alignment,
            containsSelectionOptions,
            disabled,
            style,
        } = this.props;

        const opener = (
            <ActionMenuOpener
                disabled={disabled}
                onClick={() => this.toggleMenu()}
            >
                {menuText}
            </ActionMenuOpener>
        );

        const menuItems = items.map((item, index) => {
            return (
                <ActionItem
                    disabled={item.disabled}
                    key={item.label}
                    indent={containsSelectionOptions}
                    label={item.label}
                    onClick={item.onClick}
                />
            );
        });

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                open={this.state.open}
                opener={opener}
                style={style}
            />
        );
    }
}
