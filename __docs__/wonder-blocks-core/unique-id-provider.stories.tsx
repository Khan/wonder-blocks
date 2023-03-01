import * as React from "react";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import {name, version} from "../../packages/wonder-blocks-core/package.json";

import type {IIdentifierFactory} from "../../packages/wonder-blocks-core/src/util/types";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Core / UniqueIDProvider",
    component: UniqueIDProvider,
    args: {
        scope: "field",
        mockOnFirstRender: false,
    },
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
} as ComponentMeta<typeof UniqueIDProvider>;

const Template = (args: any) => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef([]);
    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <View>
            <Button onClick={handleClick} style={{width: 200}}>
                Re-render
            </Button>
            <Strut size={16} />

            <HeadingSmall>The UniqueIDProvider:</HeadingSmall>

            <UniqueIDProvider {...args}>
                {(ids) => {
                    // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
                    renders.current.push(ids.get("my-unique-id"));

                    return renders.current.map((value, index) => (
                        <View>
                            Render {index}: {value}
                        </View>
                    ));
                }}
            </UniqueIDProvider>
        </View>
    );
};

type StoryComponentType = ComponentStory<typeof UniqueIDProvider>;

export const Default: StoryComponentType = Template.bind({});

Default.parameters = {
    docs: {
        storyDescription:
            "By default, `mockOnFirstRender` is `false`. The `children` prop is only called after the initial render. Each call provides the same identifier factory, meaning the same identifier gets returned. Try it below.",
    },
};

export const WithMockOnFirstRender: StoryComponentType = Template.bind({});

WithMockOnFirstRender.args = {
    mockOnFirstRender: true,
};

WithMockOnFirstRender.storyName = "With mockOnFirstRender";

WithMockOnFirstRender.parameters = {
    docs: {
        storyDescription:
            "When specifying `mockOnFirstRender` to be `true`, the first render will use a mock identifier factory that doesn't guarantee identifier uniqueness. Mock mode can help things appear on the screen during the initial render, but is not the default, because it is not always safe (e.g., we need actual IDs for some SVG constructs).",
    },
};

export const Scoped: StoryComponentType = () => {
    const children = (ids: IIdentifierFactory) => (
        <View>
            <Body>
                The id returned for my-identifier: {ids.get("my-identifier")}
            </Body>
        </View>
    );

    return (
        <View>
            <HeadingSmall>First Provider with scope: first</HeadingSmall>
            <UniqueIDProvider mockOnFirstRender={false} scope="first">
                {children}
            </UniqueIDProvider>
            <HeadingSmall>Second Provider with scope: second</HeadingSmall>
            <UniqueIDProvider mockOnFirstRender={false} scope="second">
                {children}
            </UniqueIDProvider>
        </View>
    );
};

Scoped.args = {
    mockOnFirstRender: true,
};

Scoped.parameters = {
    docs: {
        storyDescription:
            "`UniqueIDProvider` ensures every identifier factory is unique using a unique number for each one. However, this isn't very readable when wanting to differentiate the types of things using unique identifiers. If we want to, we can provide a `scope` prop that adds some text to each identifier provided. This can be useful for providing some quick at-a-glance component identification to identifiers when there are multiple providers.",
    },
};
