// @flow
import * as React from "react";

import DropdownCore from "./dropdown-core.js";

type Item = {
    label: string,
    value: any,
};

type Props = {
    onClose: () => void,
    onOpen: () => void,
    onChange: (item: Item, index: number) => void,
    show: boolean,
    selection: ?any,
    items: Array<Item>,
    style?: any,
};

type State = {
    show: boolean,
    selection: ?any,
};

export default class Dropdown extends React.Component<Props, State> {
    static defaultProps = {
        onClose: () => {},
        onOpen: () => {},
        onChange: (item: Item, index: number) => {},
        show: false,
        controlled: true,
        selection: null,
    };

    constructor(props: Props) {
        super(props);

        // Note: props can be used to prime state.  This is a useful way of
        // providing some customization out of the box, by allowing devs to
        // set at least the initial state without having to use the uncontrolled
        // version of the component.  There is one gotcha, updating props will
        // not affect what the component renders.
        this.state = {
            show: props.show,
            selection: props.selection,
        };
    }

    setState(props: any, callback?: any) {
        super.setState(props, callback);
    }

    handleHeaderClick = () => {
        const show = !this.state.show;
        this.setState({show});

        if (show) {
            this.props.onOpen();
        } else {
            this.props.onClose();
        }
    };

    handleItemClick = (item: Item, index: number) => {
        this.setState({selection: index});
        this.props.onChange(item, index);
    };

    render() {
        const {show, selection} = this.state;
        const {items, style} = this.props;

        return (
            <DropdownCore
                show={show}
                selection={selection}
                items={items}
                onHeaderClick={this.handleHeaderClick}
                onItemClick={this.handleItemClick}
                style={style}
            />
        );
    }
}
