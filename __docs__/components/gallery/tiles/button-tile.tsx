import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function ButtonTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="Button"
            href="/?path=/docs/packages-button--docs"
            description="Standard button. Triggers an action."
            {...props}
        >
            <Button
                kind="primary"
                onClick={() => {}}
                style={localStyles.button}
            >
                Button
            </Button>
            <Button
                kind="secondary"
                onClick={() => {}}
                style={localStyles.button}
            >
                Button
            </Button>
            <Button kind="tertiary" onClick={() => {}}>
                Button
            </Button>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    button: {
        marginBottom: spacing.small_12,
    },
});
