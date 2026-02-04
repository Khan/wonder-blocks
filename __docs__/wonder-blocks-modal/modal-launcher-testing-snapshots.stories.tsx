import * as React from "react";
import {Meta} from "@storybook/react-vite";
import {
    FlexibleDialog,
    ModalLauncher,
    OnePaneDialog,
} from "@khanacademy/wonder-blocks-modal";
import {allModes} from "../../.storybook/modes";
import Button from "@khanacademy/wonder-blocks-button";
import {reallyLongText} from "../components/text-for-testing";

export default {
    title: "Packages / Modal / Testing / Snapshots / ModalLauncher",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                "default rtl": allModes["themeDefault rtl"],
                small: allModes.small,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} as Meta;

export const WithOnePaneDialog = {
    render: function Render() {
        return (
            <ModalLauncher
                modal={
                    <OnePaneDialog
                        title="Modal"
                        content={<div>{reallyLongText}</div>}
                    />
                }
                opened={true}
            >
                {({openModal}) => <Button onClick={openModal}>Open</Button>}
            </ModalLauncher>
        );
    },
};

export const WithFlexibleDialog = {
    render: function Render() {
        return (
            <ModalLauncher
                modal={
                    <FlexibleDialog
                        title="Modal"
                        content={<div>{reallyLongText}</div>}
                    />
                }
                opened={true}
            >
                {({openModal}) => <Button onClick={openModal}>Open</Button>}
            </ModalLauncher>
        );
    },
};
