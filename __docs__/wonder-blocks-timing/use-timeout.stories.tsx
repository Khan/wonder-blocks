import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    ClearPolicy,
    SchedulePolicy,
} from "../../packages/wonder-blocks-timing/src/util/policies";
import {useTimeout} from "@khanacademy/wonder-blocks-timing";

export default {
    title: "Packages / Timing / useTimeout",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const Immediately = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const {isSet, set, clear} = useTimeout(callback, 1000);
    return (
        <View>
            <View>isSet = {isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={set}>Set timeout</Button>
                <Button
                    onClick={() => {
                        if (clear) {
                            clear();
                        }
                    }}
                >
                    Clear timeout
                </Button>
            </View>
        </View>
    );
};

export const OnDemandAndResolveOnClear = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("action called");
        setCallCount((callCount) => callCount + 1);
    }, []);
    const {isSet, set, clear} = useTimeout(callback, 1000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    return (
        <View>
            <View>isSet = {isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => set()}>Set timeout</Button>
                <Button onClick={() => clear()}>Clear timeout</Button>
            </View>
        </View>
    );
};
