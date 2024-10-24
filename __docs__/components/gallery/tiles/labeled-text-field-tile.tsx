import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

import ComponentTile from "../component-tile";

export default function LabeledTextFieldTile() {
    const [labeledTextFieldValue, setLabeledTextFieldValue] =
        React.useState<string>("");

    return (
        <ComponentTile
            name="LabeledTextField"
            href="/?path=/docs/packages-form-labeledtextfield--docs"
            description={`Used to accept a single line of text
                        from the user paired with a label, description,
                        and error field elements.`}
        >
            <LabeledTextField
                label="Name (Label)"
                description="Please enter your name"
                value={labeledTextFieldValue}
                onChange={(newValue) => setLabeledTextFieldValue(newValue)}
                placeholder="Name"
            />
        </ComponentTile>
    );
}
