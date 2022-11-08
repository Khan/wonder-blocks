// @flow
import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

type Mappings = {[key: string]: React.Node};

export const leftContentMappings: Mappings = {
    none: null,
    dismissButton: <IconButton icon={icons.dismiss} kind="tertiary" />,
    lightButton: <IconButton icon={icons.dismiss} light={true} />,
    hintButton: <IconButton icon={icons.hint} kind="primary" />,
    multipleContent: (
        <>
            <IconButton icon={icons.zoomOut} kind="primary" />
            <Strut size={Spacing.medium_16} />
            <IconButton icon={icons.zoomIn} kind="primary" />
        </>
    ),
};

const buttonStyle = {width: 160};

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
};

export default {
    leftContent: {
        control: {type: "select"},
        options: leftContentMappings,
    },
    rightContent: {
        control: {type: "select"},
        options: rightContentMappings,
    },
};
