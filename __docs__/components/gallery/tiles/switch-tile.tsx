import * as React from "react";

import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function SwitchTile() {
    const [checked, setChecked] = React.useState<boolean>(false);
    return (
        <RenderStateRoot>
            <ComponentTile
                name="Switch"
                href="/?path=/docs/packages-switch--docs"
                description={`An input that allows users to toggle
                    between two states (typically "on" and "off").`}
            >
                <View style={styles.centerContent}>
                    <Switch
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                </View>
            </ComponentTile>
        </RenderStateRoot>
    );
}
