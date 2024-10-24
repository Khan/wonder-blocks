import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function SingleSelectTile(props: {layout: "grid" | "list"}) {
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    return (
        <ComponentTile
            name="SingleSelect"
            href="/?path=/docs/packages-dropdown-singleselect--docs"
            description={`A dropdown menu that allows the
                        selection of one item.`}
            layout={props.layout}
        >
            <View style={styles.centerContent}>
                <SingleSelect
                    isFilterable
                    onChange={(value) => setSelectedValue(value)}
                    onToggle={() => {}}
                    placeholder="Choose a fruit"
                    selectedValue={selectedValue}
                >
                    <OptionItem label="Banana" value="banana" />
                    <OptionItem
                        disabled
                        label="Strawberry"
                        value="strawberry"
                    />
                    <OptionItem label="Pear" value="pear" />
                    <OptionItem label="Orange" value="orange" />
                    <OptionItem label="Watermelon" value="watermelon" />
                    <OptionItem label="Apple" value="apple" />
                    <OptionItem label="Grape" value="grape" />
                    <OptionItem label="Lemon" value="lemon" />
                    <OptionItem label="Mango" value="mango" />
                </SingleSelect>
            </View>
        </ComponentTile>
    );
}
