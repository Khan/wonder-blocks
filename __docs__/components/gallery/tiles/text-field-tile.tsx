import * as React from "react";

import {TextField} from "@khanacademy/wonder-blocks-form";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function TextFieldTile(props: CommonTileProps) {
    const [textValue, setTextValue] = React.useState<string>("");

    return (
        <ComponentTile
            name="TextField"
            href="/?path=/docs/packages-form-textfield--docs"
            description={`Standard text input field. This is
                        used to accept a single line of text from
                        the user.`}
            {...props}
        >
            <TextField
                id="text-field"
                type="text"
                value={textValue}
                placeholder="Text"
                onChange={(value) => setTextValue(value)}
            />
        </ComponentTile>
    );
}
