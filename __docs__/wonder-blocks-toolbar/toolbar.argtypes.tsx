import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";
import lightbulb from "@phosphor-icons/core/regular/lightbulb.svg";
import magnifyingGlassPlus from "@phosphor-icons/core/regular/magnifying-glass-plus.svg";
import magnifyingGlassMinus from "@phosphor-icons/core/regular/magnifying-glass-minus.svg";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

const mobile = "@media (max-width: 1023px)";

const styles = StyleSheet.create({
    fillContent: {
        marginLeft: Spacing.small_12,
        [mobile]: {
            width: "100vw",
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
    dismissButton: <IconButton icon={xIcon} kind="tertiary" />,
    lightButton: <IconButton icon={xIcon} light={true} />,
    hintButton: <IconButton icon={lightbulb} kind="primary" />,
    multipleContent: (
        <>
            <IconButton icon={magnifyingGlassMinus} kind="primary" />
            <Strut size={Spacing.medium_16} />
            <IconButton icon={magnifyingGlassPlus} kind="primary" />
        </>
    ),
};

const buttonStyle = {width: 160} as const;

export const rightContentMappings: Mappings = {
    none: null,
    primaryButton: <Button>Submit</Button>,
    tertiaryButton: <Button kind="tertiary">Import...</Button>,
    nextVideoButton: <Button>Next Video</Button>,
    lightButton: (
        <Button kind="secondary" light={true}>
            Go to Article
        </Button>
    ),
    link: (
        <Link href="#">
            <LabelLarge>Go to exercise</LabelLarge>
        </Link>
    ),
    multipleContent: (
        <>
            <LabelLarge>7 questions</LabelLarge>
            <Strut size={Spacing.medium_16} />
            <Button style={buttonStyle} kind="secondary">
                Try again
            </Button>
            <Strut size={Spacing.medium_16} />
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
