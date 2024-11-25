import * as React from "react";

import {Checkbox} from "@khanacademy/wonder-blocks-form";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function CheckboxTile(props: CommonTileProps) {
    const [checked, setChecked] = React.useState<boolean>(false);

    return (
        <ComponentTile
            name="Checkbox"
            href="/?path=/docs/packages-form-checkbox--docs"
            description="A selection that can be checked or unchecked."
            {...props}
        >
            <Checkbox
                label={"Checkbox label"}
                checked={checked}
                disabled={false}
                onChange={() => setChecked(!checked)}
            />
        </ComponentTile>
    );
}
