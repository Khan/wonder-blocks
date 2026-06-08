import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {Body} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";
import {modalPositionerStyle} from "../../../wonder-blocks-modal/modal-story-utils";

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

const mobile = "@media (max-width: 1023px)";

const localStyles = StyleSheet.create({
    modalPositioner: modalPositionerStyle,
    previewSizer: {
        minBlockSize: 500,
        width: "100%",

        [mobile]: {
            overflowX: "scroll",
        },
    },
    footer: {
        justifyContent: "end",
    },
});
