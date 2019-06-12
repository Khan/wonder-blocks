// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import Dropdown from "./dropdown.js";
import type {Item, DropdownItem} from "../util/types.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";

type Props = {|
    children: ({openDropdown: () => void}) => React.Element<any>,
    opened?: boolean,
    // dropdown: React.Element<Dropdown>,
    menuItems: Array<Item>,
|};

type State = {|
    open: boolean,
|};

export default class DropdownLauncher extends React.Component<Props, State> {
    openerElement: ?HTMLElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    _openDropdown = () => {
        this.setState({open: true});
    };

    handleOpenChanged = (open: boolean) => {
        this.setState({open});
    };

    getMenuItems(): Array<DropdownItem> {
        const selectedValues = [];
        const {children, menuItems} = this.props;
        return React.Children.toArray(menuItems)
            .filter(Boolean)
            .map((item) => {
                const {disabled, value} = item.props;
                if (ActionItem.isClassOf(item)) {
                    return {
                        component: item,
                        focusable: !disabled,
                        populatedProps: {
                            indent: true,
                            onClick: this.handleItemSelected,
                        },
                    };
                } else if (OptionItem.isClassOf(item)) {
                    return {
                        component: item,
                        focusable: !disabled,
                        populatedProps: {
                            onToggle: this.handleOptionSelected,
                            selected: selectedValues
                                ? selectedValues.includes(value)
                                : false,
                            variant: "check",
                        },
                    };
                } else {
                    return {
                        component: item,
                        focusable: false,
                        populatedProps: {},
                    };
                }
            });
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const {
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            children,
        } = this.props;

        const opener = (
            <span ref={this.handleOpenerRef}>
                {this.props.children({openDropdown: this._openDropdown})}
            </span>
        );
        return (
            <Dropdown
                items={this.getMenuItems()}
                keyboard={null}
                onOpenChanged={this.handleOpenChanged}
                open={this.state.open}
                opener={opener}
                openerElement={this.openerElement}
                role="menu"
            />
        );
    }
}
