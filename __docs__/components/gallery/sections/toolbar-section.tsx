import * as React from "react";
import xIcon from "@phosphor-icons/core/regular/x.svg";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function ToolbarSection() {
    return (
        <>
            <HeadingLarge id="toolbar" tag="h3" style={styles.sectionLabel}>
                Toolbar
            </HeadingLarge>

            <ComponentTile
                name="Toolbar"
                href="/?path=/docs/packages-toolbar--docs"
                description={`A generic toolbar wrapper that exposes
                    customization options, including a title and left/right
                    content.`}
            >
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
