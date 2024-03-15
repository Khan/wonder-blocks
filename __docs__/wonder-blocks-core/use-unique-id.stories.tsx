import * as React from "react";

import {Meta} from "@storybook/react";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    useUniqueIdWithoutMock,
    useUniqueIdWithMock,
    RenderStateRoot,
} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

export default {
    title: "Core/useUniqueId*",

    // Disable global decorator for this story since we are testing this component
    parameters: {
        enableRenderStateRootDecorator: false,

        chromatic: {
            disableSnapshot: true,
        },
    },

    decorators: [
        (Story): React.ReactElement => (
            <RenderStateRoot>
                <Story />
            </RenderStateRoot>
        ),
    ],
} as Meta;

export const WithoutMockExample = () => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef<Array<string>>([]);
    const ids = useUniqueIdWithoutMock();
    const handleClick = () => {
        setCount(count + 1);
    };
    if (ids) {
        renders.current.push(ids.get("my-unique-id"));
    } else {
        renders.current.push("null");
    }
    return (
        <View>
            <Button onClick={handleClick} style={{width: 200}}>
                Re-render
            </Button>
            <br />
            renders:
            {renders.current.map((value, index) => (
                <View key={index}>
                    Render {index}: {value}
                </View>
            ))}
        </View>
    );
};

export const WithMockExample = () => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef<Array<string>>([]);
    const ids = useUniqueIdWithMock();
    const handleClick = () => {
        setCount(count + 1);
    };
    if (ids) {
        renders.current.push(ids.get("my-unique-id"));
    } else {
        renders.current.push("null");
    }
    return (
        <View>
            <Button onClick={handleClick} style={{width: 200}}>
                Re-render
            </Button>
            <br />
            renders:
            {renders.current.map((value, index) => (
                <View key={index}>
                    Render {index}: {value}
                </View>
            ))}
        </View>
    );
};

export const ScopedExample = () => {
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
