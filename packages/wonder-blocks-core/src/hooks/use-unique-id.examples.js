// @flow
/**
 * These are used exclusively in use-unique-id.stories.mdx
 */
import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {useUniqueIdWithoutMock, useUniqueIdWithMock} from "./use-unique-id.js";

export const WithoutMockExample = (): React.Node => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef([]);
    const ids = useUniqueIdWithoutMock();

    const handleClick = () => {
        setCount(count + 1);
    };

    if (ids) {
        renders.current.push(ids.get("my-unique-id"));
    }

    return (
        <View>
            <Button onClick={handleClick} style={{width: 200}}>
                Re-render
            </Button>
            <br />
            renders:
            {renders.current.map((value, index) => (
                <View>
                    Render {index}: {value}
                </View>
            ))}
        </View>
    );
};

export const WithMockExample = (): React.Node => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef([]);
    const ids = useUniqueIdWithMock();

    const handleClick = () => {
        setCount(count + 1);
    };

    if (ids) {
        renders.current.push(ids.get("my-unique-id"));
    }

    return (
        <View>
            <Button onClick={handleClick} style={{width: 200}}>
                Re-render
            </Button>
            <br />
            renders:
            {renders.current.map((value, index) => (
                <View>
                    Render {index}: {value}
                </View>
            ))}
        </View>
    );
};

export const ScopedExample = (): React.Node => {
    const firstIdFactory = useUniqueIdWithoutMock("first");
    const secondIdFactory = useUniqueIdWithoutMock("second");

    return (
        <View>
            <HeadingSmall>First Provider with scope: first</HeadingSmall>
            {firstIdFactory && (
                <View>
                    <Body>
                        The id returned for my-identifier:{" "}
                        {firstIdFactory.get("my-identifier")}
                    </Body>
                </View>
            )}
            <HeadingSmall>Second Provider with scope: second</HeadingSmall>
            {secondIdFactory && (
                <View>
                    <Body>
                        The id returned for my-identifier:{" "}
                        {secondIdFactory.get("my-identifier")}
                    </Body>
                </View>
            )}
        </View>
    );
};
