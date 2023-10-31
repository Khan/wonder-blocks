import * as React from "react";
import xIcon from "@phosphor-icons/core/regular/x.svg";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function ToolbarSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Toolbar
            </HeadingLarge>
            <ComponentTile name="Toolbar" href="/?path=/docs/toolbar--docs">
                <View>
                    <Toolbar
                        title="Counting with small numbers"
                        leftContent={
                            <IconButton icon={xIcon} kind="tertiary" />
                        }
                        rightContent={
                            <Button kind="tertiary">Import...</Button>
                        }
                    />
                </View>
            </ComponentTile>
        </>
    );
}
