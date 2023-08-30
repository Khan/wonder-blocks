import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import packageConfig from "../../packages/wonder-blocks-core/package.json";

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
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
} as Meta<typeof UniqueIDProvider>;

const Template = (args: any) => {
    const [count, setCount] = React.useState(0);
    const renders = React.useRef<Array<string>>([]);
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
                    renders.current.push(ids.get("my-unique-id"));

                    return renders.current.map((value, index) => (
                        <View key={index}>
                            Render {index}: {value}
                        </View>
                    ));
                }}
            </UniqueIDProvider>
        </View>
    );
};

type StoryComponentType = StoryObj<typeof UniqueIDProvider>;

export const Default: StoryComponentType = {
    render: Template,
};

Default.parameters = {
    docs: {
        description: {
            story: "By default, `mockOnFirstRender` is `false`. The `children` prop is only called after the initial render. Each call provides the same identifier factory, meaning the same identifier gets returned. Try it below.",
        },
    },
};

export const WithMockOnFirstRender: StoryComponentType = {
    render: Template,
    args: {
        mockOnFirstRender: true,
    },
    name: "With mockOnFirstRender",
};

WithMockOnFirstRender.parameters = {
    docs: {
        description: {
            story: "When specifying `mockOnFirstRender` to be `true`, the first render will use a mock identifier factory that doesn't guarantee identifier uniqueness. Mock mode can help things appear on the screen during the initial render, but is not the default, because it is not always safe (e.g., we need actual IDs for some SVG constructs).",
        },
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
        description: {
            story: "`UniqueIDProvider` ensures every identifier factory is unique using a unique number for each one. However, this isn't very readable when wanting to differentiate the types of things using unique identifiers. If we want to, we can provide a `scope` prop that adds some text to each identifier provided. This can be useful for providing some quick at-a-glance component identification to identifiers when there are multiple providers.",
        },
    },
};
