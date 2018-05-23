// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

type Item = {
    label: string,
    value: any,
};

type Props = {
    show: boolean,
    selection: ?any,
    items: Array<Item>,
    onHeaderClick: () => void,
    onItemClick: (item: Item, index: number) => void,
    style?: any,
};

export default class DropdownCore extends React.Component<Props> {
    render() {
        const {
            items,
            show,
            selection,
            onHeaderClick,
            onItemClick,
            style,
        } = this.props;

        return (
            <View style={style}>
                <View style={styles.header} onClick={() => onHeaderClick()}>
                    {typeof selection === "number"
                        ? items[selection] && items[selection].label
                        : "Click Me!"}
                </View>
                {show &&
                    items && (
                        <View style={styles.dropdown}>
                            {items.map((item, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.item,
                                        selection === i && styles.selected,
                                    ]}
                                    onClick={() => onItemClick(item, i)}
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
    dropdown: {
        border: "solid 1px blue",
        width: 300,
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
