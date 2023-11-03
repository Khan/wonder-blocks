import * as React from "react";

import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    const [checked, setChecked] = React.useState<boolean>(false);
    return (
        <RenderStateRoot>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Switch
            </HeadingLarge>
            <ComponentTile name="Switch" href="/?path=/docs/switch--docs">
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
