import * as React from "react";

import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {TextArea} from "@khanacademy/wonder-blocks-form";

export default function TextAreaTile() {
    const [value, setValue] = React.useState("");

    return (
        <RenderStateRoot>
            <ComponentTile
                name="TextArea"
                href="/?path=/docs/packages-form-textarea--docs"
                description="A TextArea is a larger element used to accept
                    text from the user."
            >
                <View style={styles.centerContent}>
                    <TextArea value={value} onChange={setValue} />
                </View>
            </ComponentTile>
        </RenderStateRoot>
    );
}
