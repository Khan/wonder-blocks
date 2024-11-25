import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {CommonTileProps} from "../types";

export default function TextAreaTile(props: CommonTileProps) {
    const [value, setValue] = React.useState("");

    return (
        <ComponentTile
            name="TextArea"
            href="/?path=/docs/packages-form-textarea--docs"
            description="A TextArea is a larger element used to accept
                    text from the user."
            {...props}
        >
            <View style={styles.centerContent}>
                <TextArea value={value} onChange={setValue} />
            </View>
        </ComponentTile>
    );
}
