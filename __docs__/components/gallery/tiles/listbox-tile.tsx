import * as React from "react";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "../component-tile";
import {Listbox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {CommonTileProps} from "../types";

type MaybeString = string | null | undefined;
type MaybeValueOrValues = MaybeString | Array<MaybeString>;

export default function ListboxTile(props: CommonTileProps) {
    const [currentValue, setCurrentValue] =
        React.useState<MaybeValueOrValues>("");

    return (
        <RenderStateRoot>
            <ComponentTile
                name="Listbox"
                href="/?path=/docs/packages-dropdown-listbox--docs"
                description={`A Listbox component presents a list of
                    options and allows a user to select one or more of them.`}
                {...props}
            >
                <View>
                    <Listbox
                        value={currentValue}
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
                    </Listbox>
                </View>
            </ComponentTile>
        </RenderStateRoot>
    );
}
