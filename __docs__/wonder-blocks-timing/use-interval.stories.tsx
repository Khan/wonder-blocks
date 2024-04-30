import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {useInterval} from "@khanacademy/wonder-blocks-timing";

export default {
    title: "Packages / Timing / useInterval",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const BasicUsage = () => {
    const [callCount, setCallCount] = React.useState(0);
    const [active, setActive] = React.useState(false);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    useInterval(callback, 1000, active);
    return (
        <View>
            <View>callCount = {callCount}</View>
            <View>active = {active.toString()}</View>
            <Button onClick={() => setActive(!active)} style={{width: 200}}>
                Toggle active
            </Button>
        </View>
    );
};
