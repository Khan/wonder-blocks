import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    useActionScheduler,
    type IInterval,
} from "@khanacademy/wonder-blocks-timing";
import {Body} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Timing / useActionScheduler",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const Default = () => {
    const [log, setLog] = React.useState<Array<string>>([]);
    const schedule = useActionScheduler();
    const intervalRef = React.useRef<IInterval | null>(null);

    const appendLog = (msg: string) => {
        setLog((prev) => [...prev, `${new Date().toISOString()}: ${msg}`]);
    };

    return (
        <View>
            <Body>
                Schedule timeouts, intervals, and animation frames from a single
                hook. All pending actions are cleared automatically on unmount.
            </Body>
            <View style={{flexDirection: "row", gap: 8}}>
                <Button
                    onClick={() =>
                        schedule.timeout(() => appendLog("Timeout fired"), 1000)
                    }
                >
                    Schedule timeout (1s)
                </Button>
                <Button
                    onClick={() => {
                        intervalRef.current?.clear();
                        intervalRef.current = schedule.interval(
                            () => appendLog("Interval fired"),
                            1000,
                        );
                    }}
                >
                    Schedule interval (1s)
                </Button>
                <Button
                    onClick={() =>
                        schedule.animationFrame(() =>
                            appendLog("Animation frame fired"),
                        )
                    }
                >
                    Schedule animation frame
                </Button>
                <Button onClick={() => schedule.clearAll()}>Clear all</Button>
            </View>
            <View>
                {log.map((entry, i) => (
                    <Body key={i}>{entry}</Body>
                ))}
            </View>
        </View>
    );
};
