import * as React from "react";

import {CheckboxGroup, Choice} from "@khanacademy/wonder-blocks-form";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function CheckboxGroupTile(props: CommonTileProps) {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    return (
        <ComponentTile
            name="CheckboxGroup"
            href="/?path=/docs/packages-form-checkboxgroup--docs"
            description="Allows multiple selections."
            {...props}
        >
            <CheckboxGroup
                groupName="toppings"
                selectedValues={selectedValues}
                onChange={(values) => setSelectedValues(values)}
            >
                <Choice label="Pepperoni" value="pepperoni-1" />
                <Choice
                    label="Sausage"
                    value="sausage-1"
                    description="Imported from Italy"
                />
                <Choice label="Extra cheese" value="cheese-1" />
                <Choice label="Green pepper" value="pepper-1" />
                <Choice label="Mushroom" value="mushroom-1" />
            </CheckboxGroup>
        </ComponentTile>
    );
}
