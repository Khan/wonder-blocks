import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function MultiSelectTile() {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    return (
        <ComponentTile
            name="MultiSelect"
            href="/?path=/docs/packages-dropdown-multiselect--docs"
            description={`A dropdown menu that allows multiple
                        options to be selected.`}
        >
            <View style={styles.centerContent}>
                <MultiSelect
                    id=""
                    onChange={(values) => setSelectedValues(values)}
                    onToggle={() => {}}
                    selectedValues={selectedValues}
                    testId=""
                >
                    <OptionItem label="Mercury" value="1" key={1} />
                    <OptionItem label="Venus" value="2" key={2} />
                    <OptionItem label="Earth" value="3" disabled key={3} />
                    <OptionItem label="Mars" value="4" key={4} />
                    <OptionItem label="Jupiter" value="5" key={5} />
                    <OptionItem label="Saturn" value="6" key={6} />
                    <OptionItem label="Neptune" value="7" key={7} />
                    <OptionItem label="Uranus" value="8" key={8} />
                </MultiSelect>
            </View>
        </ComponentTile>
    );
}
