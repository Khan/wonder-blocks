import * as React from "react";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "../component-tile";
import {Combobox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {CommonTileProps} from "../types";

type MaybeString = string | null | undefined;
type MaybeValueOrValues = MaybeString | Array<MaybeString>;

export default function ComboboxTile(props: CommonTileProps) {
    const [currentValue, setCurrentValue] =
        React.useState<MaybeValueOrValues>("");

    return (
        <RenderStateRoot>
            <ComponentTile
                name="Combobox"
                href="/?path=/docs/packages-dropdown-combobox--docs"
                description={`A Combobox is an input widget that has an
                    associated listbox. This listbox enables users to
                    choose one or more values for the input from a
                    collection of option items.`}
                {...props}
            >
                <View>
                    <Combobox
                        value={currentValue}
                        placeholder="Select an item"
                        selectionType="single"
                        onChange={(newValue: MaybeValueOrValues) => {
                            setCurrentValue(newValue);
                        }}
                    >
                        <OptionItem label="Banana" value="banana" key={0} />
                        <OptionItem
                            label="Strawberry"
                            value="strawberry"
                            disabled
                            key={1}
                        />

                        <OptionItem label="Pear" value="pear" key={2} />
                        <OptionItem
                            label="Pineapple"
                            value="pineapple"
                            key={3}
                        />

                        <OptionItem label="Orange" value="orange" key={4} />
                        <OptionItem
                            label="Watermelon"
                            value="watermelon"
                            key={5}
                        />

                        <OptionItem label="Apple" value="apple" key={6} />
                        <OptionItem label="Grape" value="grape" key={7} />
                        <OptionItem label="Lemon" value="lemon" key={8} />
                        <OptionItem label="Mango" value="mango" key={9} />
                    </Combobox>
                </View>
            </ComponentTile>
        </RenderStateRoot>
    );
}
