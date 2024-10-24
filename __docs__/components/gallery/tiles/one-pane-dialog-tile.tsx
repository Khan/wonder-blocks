import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {Body} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function OnePaneDialogTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="OnePaneDialog"
            href="/?path=/docs/packages-modal-onepanedialog--docs"
            description={`Standard layout for most straightforward
                        modal experiences. Modals display in front of the
                        current view and prevent interaction background until
                        they are dismissed.`}
            {...props}
        >
            <View style={localStyles.previewSizer}>
                <View style={localStyles.modalPositioner}>
                    <OnePaneDialog
                        title="Dialog title"
                        content={
                            <Body>
                                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.`}
                            </Body>
                        }
                        footer={
                            <View style={localStyles.footer}>
                                <Button>Next</Button>
                            </View>
                        }
                    />
                </View>
            </View>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    modalPositioner: {
        // Checkerboard background
        backgroundImage:
            "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    previewSizer: {
        minHeight: 500,
        width: "100%",
    },
    footer: {
        justifyContent: "end",
    },
});
