// @flow
import * as React from "react";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "@khanacademy/wonder-blocks-timing";

export function Unmounter(props: {|children: React.Node|}): React.Node {
    const [mountKids, setMountKids] = React.useState(true);

    const maybeRenderKids = () => {
        if (!mountKids) {
            return "Children unmounted";
        }

        return (
            <>
                <Button
                    onClick={() => {
                        setMountKids(false);
                    }}
                >
                    Unmount
                </Button>
                {props.children}
            </>
        );
    };

    return <View>{maybeRenderKids()}</View>;
}

export class MyNaughtyComponent extends React.Component<{|targetId: string|}> {
    componentDidMount() {
        const {targetId} = this.props;
        let counter = 0;
        const domElement: HTMLElement = (document.getElementById(
            targetId,
        ): any);

        setInterval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render(): React.Node {
        return <View>NaughtyComponent here</View>;
    }
}

type Props = {|
    ...WithActionSchedulerProps,
    targetId: string,
|};

export class MyGoodComponent extends React.Component<Props> {
    componentDidMount() {
        const {targetId, schedule} = this.props;
        let counter = 0;
        const domElement: HTMLElement = (document.getElementById(
            targetId,
        ): any);

        schedule.interval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render(): React.Node {
        return <View>GoodComponent here</View>;
    }
}

export const MyGoodComponentWithScheduler: React.AbstractComponent<
    WithoutActionScheduler<React.ElementConfig<typeof MyGoodComponent>>,
    MyGoodComponent,
> = withActionScheduler(MyGoodComponent);
