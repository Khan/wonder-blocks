import * as React from "react";

import {Meta} from "@storybook/react-vite";
import {View, Id} from "@khanacademy/wonder-blocks-core";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";

export default {
    tags: ["!manifest"],
    title: "Packages / Core / Id",

    parameters: {
        chromatic: {
            // We don't need a snapshot for this.
            disableSnapshot: true,
        },
    },
} as Meta;

export const GeneratedIdExample = () => (
    <View>
        <Id>
            {(id) => (
                <View style={{flexDirection: "row"}}>
                    <BodyText>Generated identifier: </BodyText>
                    <Strut size={8} />
                    <BodyMonospace>{id}</BodyMonospace>
                </View>
            )}
        </Id>
    </View>
);

export const PassedThroughIdExample = () => (
    <View>
        <Id id="my-identifier">
            {(id) => (
                <View style={{flexDirection: "row"}}>
                    <BodyText>Passed through identifier: </BodyText>
                    <Strut size={8} />
                    <BodyMonospace>{id}</BodyMonospace>
                </View>
            )}
        </Id>
    </View>
);
