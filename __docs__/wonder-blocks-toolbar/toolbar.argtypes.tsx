import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";
import lightbulb from "@phosphor-icons/core/regular/lightbulb.svg";
import magnifyingGlassPlus from "@phosphor-icons/core/regular/magnifying-glass-plus.svg";
import magnifyingGlassMinus from "@phosphor-icons/core/regular/magnifying-glass-minus.svg";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {actionStyles} from "@khanacademy/wonder-blocks-styles";

const mobile = "@media (max-width: 1023px)";

const styles = StyleSheet.create({
    fillContent: {
        marginLeft: spacing.small_12,
        [mobile]: {
            marginLeft: 0,
            width: "100%",
        },
    },
    onlyDesktop: {
        [mobile]: {
            display: "none",
        },
    },
});

type Mappings = {
    [key: string]: React.ReactNode;
};

export const leftContentMappings: Mappings = {
    none: null,
    dismissButton: (
        <IconButton
            aria-label="Dismiss"
            icon={xIcon}
            kind="tertiary"
            actionType="neutral"
        />
    ),
    hintButton: (
        <IconButton aria-label="Hint" icon={lightbulb} kind="tertiary" />
    ),
    multipleContent: (
        <>
            <IconButton
                aria-label="Zoom out"
                icon={magnifyingGlassMinus}
                kind="tertiary"
            />
            <Strut size={spacing.medium_16} />
            <IconButton
                aria-label="Zoom in"
                icon={magnifyingGlassPlus}
                kind="tertiary"
            />
        </>
    ),
    exitWithTitle: (
        <View
            style={{
                flexDirection: "row",
                gap: spacing.medium_16,
                placeItems: "center",
            }}
        >
            <Button startIcon={xIcon} kind="tertiary">
                Exit
            </Button>
            |
            <LabelLarge>
                Algebra Test<sup>BETA</sup>
            </LabelLarge>
        </View>
    ),
};

const buttonStyle = {width: 160} as const;

export const rightContentMappings: Mappings = {
    none: null,
    primaryButton: <Button>Submit</Button>,
    tertiaryButton: <Button kind="tertiary">Import...</Button>,
    nextVideoButton: <Button>Next Video</Button>,
    lightButton: (
        <Button kind="secondary" style={actionStyles.inverse}>
            Go to Article
        </Button>
    ),
    link: (
        <Link href="#exercise">
            <LabelLarge>Go to exercise</LabelLarge>
        </Link>
    ),
    multipleContent: (
        <>
            <LabelLarge>7 questions</LabelLarge>
            <Strut size={spacing.medium_16} />
            <Button style={buttonStyle} kind="secondary">
                Try again
            </Button>
            <Strut size={spacing.medium_16} />
            <Button style={buttonStyle}>Next exercise</Button>
        </>
    ),
    responsive: (
        <>
            <Button style={styles.onlyDesktop} kind="secondary">
                Continue
            </Button>
            <Button style={styles.fillContent}>Up next: video</Button>
        </>
    ),
};

export default {
    leftContent: {
        control: {type: "select"},
        options: Object.keys(leftContentMappings) as Array<string>,
        mapping: leftContentMappings,
    },
    rightContent: {
        control: {type: "select"},
        options: Object.keys(rightContentMappings) as Array<string>,
        mapping: rightContentMappings,
    },
};
