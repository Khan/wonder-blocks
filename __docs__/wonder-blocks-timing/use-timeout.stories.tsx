import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    ClearPolicy,
    SchedulePolicy,
} from "../../packages/wonder-blocks-timing/src/util/policies";
import {useTimeout, useInterval} from "@khanacademy/wonder-blocks-timing";
import {Body} from "@khanacademy/wonder-blocks-typography";

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
    const [timeoutSet, setTimeoutSet] = React.useState(false);
    const callback = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("action called");
        setCallCount((callCount) => callCount + 1);
    }, []);
    const timeout = useTimeout(callback, 5000);
    useInterval(() => {
        // Need to update on an interval as the returned `isSet` value is not
        // driven by React state.
        setTimeoutSet(timeout.isSet);
    }, 100);
    return (
        <View>
            <Body>
                Timeout should fire in 5 seconds unless set again or cleared
            </Body>
            <View>isSet = {String(timeoutSet)}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => timeout.set()}>Set timeout</Button>
                <Button
                    onClick={() => {
                        timeout.clear();
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
    const [timeoutSet, setTimeoutSet] = React.useState(false);
    const callback = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("action called");
        setCallCount((callCount) => callCount + 1);
    }, []);
    const timeout = useTimeout(callback, 5000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    useInterval(() => {
        // Need to update on an interval as the returned `isSet` value is not
        // driven by React state.
        setTimeoutSet(timeout.isSet);
    }, 100);
    return (
        <View>
            <Body>
                Timeout should fire in 5 seconds or when cleared unless set
                again
            </Body>
            <View>isSet = {String(timeoutSet)}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => timeout.set()}>Set timeout</Button>
                <Button onClick={() => timeout.clear()}>Clear timeout</Button>
            </View>
        </View>
    );
};
