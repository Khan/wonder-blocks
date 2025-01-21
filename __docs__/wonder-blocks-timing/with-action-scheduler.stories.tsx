import * as React from "react";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";

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

export const IncorrectUsage = () => {
    const id = React.useId();
    return (
        <View>
            <Unmounter>
                <MyNaughtyComponent targetId={id} />
            </Unmounter>
            <View id={id} />
        </View>
    );
};

export const CorrectUsage = () => {
    const id = React.useId();
    return (
        <View>
            <Unmounter>
                <MyGoodComponentWithScheduler targetId={id} />
            </Unmounter>
            <View id={id} />
        </View>
    );
};
