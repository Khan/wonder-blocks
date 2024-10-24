import * as React from "react";

import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";

import ComponentTile from "../component-tile";

export default function RadioGroupTile() {
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    return (
        <ComponentTile
            name="RadioGroup"
            href="/?path=/docs/packages-form-radiogroup--docs"
            description="Allows only a single selection."
        >
            <RadioGroup
                groupName="pokemon"
                selectedValue={selectedValue}
                onChange={(value) => setSelectedValue(value)}
            >
                <Choice label="Bulbasaur" value="bulbasaur-1" />
                <Choice
                    label="Charmander"
                    value="charmander-1"
                    description="Oops, we ran out of Charmanders"
                    disabled
                />
                <Choice label="Squirtle" value="squirtle-1" />
                <Choice label="Pikachu" value="pikachu-1" />
            </RadioGroup>
        </ComponentTile>
    );
}
