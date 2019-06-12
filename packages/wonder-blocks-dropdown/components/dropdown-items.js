//@flow
import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import type {Item, DropdownItem} from "../util/types.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";

type DropdownItemProps = {|
    children?: Array<Item> | Item,
    actionItemHandler: () => void,
    optionItemHandler: () => void,
|};

type State = {|dItems?: Array<DropdownItem>|};

export default class DropdownItems extends React.Component<
    DropdownItemProps,
    State,
> {
    Items: Array<DropdownItem>;
    _mapChildrenToItems(): Array<DropdownItem> {
        const selectedValues = [];
        return React.Children.toArray(this.props.children())
            .filter(Boolean)
            .map((item) => {
                const {disabled, value} = item.props;
                if (ActionItem.isClassOf(item)) {
                    return {
                        component: item,
                        focusable: !disabled,
                        populatedProps: {
                            indent: true,
                            onClick: this.actionItemHandler,
                        },
                    };
                } else if (OptionItem.isClassOf(item)) {
                    return {
                        component: item,
                        focusable: !disabled,
                        populatedProps: {
                            onToggle: this.optionItemHandler,
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

    render = () => {
        this.setState({dItems: this._mapChildrenToItems()});
        return <span />;
    };
}
