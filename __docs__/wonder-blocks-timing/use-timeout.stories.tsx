import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import {useTimeout} from "@khanacademy/wonder-blocks-timing";

export default {
    title: "Packages / Timing / useTimeout",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const BasicUsage = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    useTimeout(callback, 1000);
    return (
        <View>
            <View>callCount = {callCount}</View>
        </View>
    );
};
