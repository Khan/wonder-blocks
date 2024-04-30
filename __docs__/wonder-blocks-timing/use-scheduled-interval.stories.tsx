import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    useScheduledInterval,
    ClearPolicy,
    SchedulePolicy,
} from "@khanacademy/wonder-blocks-timing";

export default {
    title: "Packages / Timing / useScheduledInterval",

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
    const interval = useScheduledInterval(callback, 1000);
    return (
        <View>
            <View>isSet = {interval.isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
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
    const interval = useScheduledInterval(callback, 1000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    return (
        <View>
            <View>isSet = {interval.isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
            </View>
        </View>
    );
};
