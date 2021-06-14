// @flow
import * as React from "react";

import FieldHeading from "./field-heading.js";
import TextField from "./text-field.js";

export default class LabeledTextField extends React.Component<{||}> {
    render(): React.Node {
        return (
            <FieldHeading
                field={
                    <TextField
                        id="tf-1"
                        value="Value"
                        placeholder="Placeholder"
                        onChange={() => {}}
                    />
                }
                label="Label"
                description="Description"
                error="Error"
            />
        );
    }
}
