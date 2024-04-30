import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge id="button" tag="h3" style={styles.sectionLabel}>
                Button
            </HeadingLarge>
            <ComponentTile
                name="Button"
                href="/?path=/docs/packages-button--docs"
                description="Standard button. Triggers an action."
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
        </>
    );
}

const localStyles = StyleSheet.create({
    button: {
        marginBottom: spacing.small_12,
    },
});
