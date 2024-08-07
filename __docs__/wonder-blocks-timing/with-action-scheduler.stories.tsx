import * as React from "react";
import {Meta} from "@storybook/react";
import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

import {
    Unmounter,
    MyGoodComponentWithScheduler,
    MyNaughtyComponent,
} from "./with-action-scheduler-examples";

export default {
    title: "Packages / Timing / withActionScheduler",

    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },

    decorators: [(Story) => <View>{Story()}</View>],
} as Meta;

export const IncorrectUsage = () => (
    <IDProvider id="incorrect" scope="example">
        {(id) => (
            <View>
                <Unmounter>
                    <MyNaughtyComponent targetId={id} />
                </Unmounter>
                <View id={id} />
            </View>
        )}
    </IDProvider>
);

export const CorrectUsage = () => (
    <IDProvider id="correct" scope="example">
        {(id) => (
            <View>
                <Unmounter>
                    <MyGoodComponentWithScheduler targetId={id} />
                </Unmounter>
                <View id={id} />
            </View>
        )}
    </IDProvider>
);
