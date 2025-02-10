import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {CommonTileProps} from "../types";

export default function SwitchTile(props: CommonTileProps) {
    const [checked, setChecked] = React.useState<boolean>(false);
    return (
        <ComponentTile
            name="Switch"
            href="/?path=/docs/packages-switch--docs"
            description={`An input that allows users to toggle
                    between two states (typically "on" and "off").`}
            {...props}
        >
            <View style={styles.centerContent}>
                <Switch
                    aria-label="Toggle state"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </View>
        </ComponentTile>
    );
}
