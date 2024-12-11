import * as React from "react";

import {Meta} from "@storybook/react";
import {View, Id} from "@khanacademy/wonder-blocks-core";
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Core / Id",

    parameters: {
        chromatic: {
            // We don't need a snapshot for this.
            disableSnapshot: true,
        },
    },
} as Meta;

export const BasicExample = () => (
    <View>
        <Id>
            {(id) => (
                <View style={{flexDirection: "row"}}>
                    <Body>Generated identifier: </Body>
                    <Strut size={spacing.xSmall_8} />
                    <BodyMonospace>{id}</BodyMonospace>
                </View>
            )}
        </Id>
    </View>
);
