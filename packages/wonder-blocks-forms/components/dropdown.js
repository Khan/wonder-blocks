// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

type Props = {
    onClose: () => void,
    onOpen: () => void,
    onChange: (e: SyntheticEvent<>, value: string) => void,
    show: boolean,
    selection: ?any,
    controlled: boolean,
    items?: Array<{
        label: string,
        value: any,
    }>,
};

type State = {
    show: boolean,
    selection: ?any,
};

export default class Dropdown extends React.Component<Props, State> {
    static defaultProps = {
        onClose: () => {},
        onOpen: () => {},
        onChange: (e: SyntheticEvent<>, value: string) => {},
        show: false,
        controlled: true,
        selection: null,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            show: props.show,
            selection: null,
        };
    }

    setState(props: any, callback?: any) {
        if (this.props.controlled) {
            super.setState(props, callback);
        }
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

    handleChange = (e: SyntheticEvent<>, value: any) => {
        this.setState({selection: value});
        // $FlowFixMe
        this.props.onChange(e, value);
    };

    render() {
        const show = this.props.controlled ? this.state.show : this.props.show;
        const selection = this.props.controlled
            ? this.state.selection
            : this.props.selection;
        const items = this.props.items;

        return (
            <View>
                <View style={styles.header} onClick={this.handleHeaderClick}>
                    {selection ? selection : "Click Me!"}
                </View>
                {show &&
                    items && (
                        <View>
                            {items.map((item, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.item,
                                        selection === item.value &&
                                            styles.selected,
                                    ]}
                                    onClick={(e) =>
                                        this.handleChange(e, item.value)
                                    }
                                >
                                    {item.label}
                                </View>
                            ))}
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: 200,
        border: "solid 1px blue",
        borderRadius: 4,
        fontSize: 20,
        padding: 4,
    },
    item: {
        fontSize: 20,
        ":hover": {
            background: "blue",
            color: "white",
        },
    },
    selected: {
        background: "lightblue",
        color: "black",
    },
});
