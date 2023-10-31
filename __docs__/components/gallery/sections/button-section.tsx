import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Button
            </HeadingLarge>
            <ComponentTile name="Button" href="/?path=/docs/button--docs">
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
        </>
    );
}

const localStyles = StyleSheet.create({
    button: {
        marginBottom: tokens.spacing.small_12,
    },
});
