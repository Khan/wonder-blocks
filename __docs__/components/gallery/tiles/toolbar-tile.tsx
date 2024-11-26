import * as React from "react";
import xIcon from "@phosphor-icons/core/regular/x.svg";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function ToolbarTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="Toolbar"
            href="/?path=/docs/packages-toolbar--docs"
            description={`A generic toolbar wrapper that exposes
                    customization options, including a title and left/right
                    content.`}
            {...props}
        >
            <View>
                <Toolbar
                    title="Counting with small numbers"
                    leftContent={<IconButton icon={xIcon} kind="tertiary" />}
                    rightContent={<Button kind="tertiary">Import...</Button>}
                />
            </View>
        </ComponentTile>
    );
}
