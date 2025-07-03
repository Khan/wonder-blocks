import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {View, InitialFallback} from "@khanacademy/wonder-blocks-core";
import packageConfig from "../../packages/wonder-blocks-core/package.json";

import ComponentInfo from "../components/component-info";

type StoryComponentType = StoryObj<typeof InitialFallback>;

export default {
    title: "Packages / Core / InitialFallback",
    component: InitialFallback,
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
        chromatic: {
            disableSnapshot: true,
        },
    },
    args: {
        fallback: (): React.ReactElement => (
            <View>
                This gets rendered on server, and also on the client for the
                very first render (the rehydration render)
            </View>
        ),
        children: (): React.ReactElement => (
            <View>
                This is rendered only by the client, for all renders after the
                rehydration render.
            </View>
        ),
    },
} as Meta<typeof InitialFallback>;

export const Default: StoryComponentType = {};

export const WithoutPlaceholder: StoryComponentType = () => (
    <InitialFallback fallback={null}>
        {() => (
            <View>
                This is rendered only by the client, while nothing was rendered
                on the server.
            </View>
        )}
    </InitialFallback>
);

WithoutPlaceholder.parameters = {
    docs: {
        description: {
            story: "This example shows how you can use a `null` placeholder to display nothing during server-side render.",
        },
    },
};

export const NestedComponent: StoryComponentType = (): React.ReactElement => {
    const trackingArray: Array<string> = [];
    const resultsId = "nossr-example-2-results";
    const newLi = (text: string) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(text));
        return li;
    };

    const addTrackedRender = (text: string) => {
        const el = document.getElementById(resultsId);
        if (el) {
            for (let i = 0; i < trackingArray.length; i++) {
                el.append(newLi(trackingArray[i]));
            }
            trackingArray.length = 0;
            el.append(newLi(text));
        } else {
            // We may not have rendered the results element yet, so if we haven't
            // use an array to keep track of the things until we have.
            trackingArray.push(text);
        }
    };

    const trackAndRender = (text: string) => {
        addTrackedRender(text);
        return text;
    };

    return (
        <View>
            <Body>
                The list below should have three render entries; root
                placeholder, root children render, and child children render. If
                there are two child renders that means that the second forced
                render is still occurring for nested InitialFallback components,
                which would be a bug.
            </Body>
            <ul id={resultsId} />
            <Body>
                And below this is the actual InitialFallback nesting, which
                should just show the child render.
            </Body>
            <InitialFallback
                fallback={() => (
                    <View>{trackAndRender("Root: placeholder")}</View>
                )}
            >
                {() => {
                    addTrackedRender("Root: render");
                    return (
                        <InitialFallback
                            fallback={() => (
                                <View>
                                    {trackAndRender(
                                        "Child: placeholder (should never see me)",
                                    )}
                                </View>
                            )}
                        >
                            {() => (
                                <View>{trackAndRender("Child: render")}</View>
                            )}
                        </InitialFallback>
                    );
                }}
            </InitialFallback>
        </View>
    );
};

NestedComponent.parameters = {
    docs: {
        description: {
            story: "Here, we nest two `InitialFallback` components and use an array to track rendering, so that we can see how only the top level `InitialFallback` component skips the initial render.",
        },
    },
};

export const SideBySide: StoryComponentType = (): React.ReactElement => {
    const trackingArray: Array<string> = [];
    const resultsId = "nossr-example-3-results";
    const newLi = (text: string) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(text));
        return li;
    };

    const addTrackedRender = (text: string) => {
        const el = document.getElementById(resultsId);
        if (el) {
            for (let i = 0; i < trackingArray.length; i++) {
                el.append(newLi(trackingArray[i]));
            }
            trackingArray.length = 0;
            el.append(newLi(text));
        } else {
            // We may not have rendered the results element yet, so if we haven't
            // use an array to keep track of the things until we have.
            trackingArray.push(text);
        }
    };

    const trackAndRender = (text: string) => {
        addTrackedRender(text);
        return text;
    };

    return (
        <View>
            <Body>
                The list below should have six render entries; 2 x root
                placeholder, 2 x root children render, and 2 x child children
                render.
            </Body>
            <ul id={resultsId} />
            <Body>
                And below this are the InitialFallback component trees, which
                should just show their child renders.
            </Body>
            <InitialFallback
                fallback={() => (
                    <View>{trackAndRender("Root 1: placeholder")}</View>
                )}
            >
                {() => {
                    addTrackedRender("Root 1: render");
                    return (
                        <InitialFallback
                            fallback={() => (
                                <View>
                                    {trackAndRender(
                                        "Child 1: placeholder (should never see me)",
                                    )}
                                </View>
                            )}
                        >
                            {() => (
                                <View>{trackAndRender("Child 1: render")}</View>
                            )}
                        </InitialFallback>
                    );
                }}
            </InitialFallback>
            <InitialFallback
                fallback={() => (
                    <View>{trackAndRender("Root 2: placeholder")}</View>
                )}
            >
                {() => {
                    addTrackedRender("Root 2: render");
                    return (
                        <InitialFallback
                            fallback={() => (
                                <View>
                                    {trackAndRender(
                                        "Child 2: placeholder (should never see me)",
                                    )}
                                </View>
                            )}
                        >
                            {() => (
                                <View>{trackAndRender("Child 2: render")}</View>
                            )}
                        </InitialFallback>
                    );
                }}
            </InitialFallback>
        </View>
    );
};

SideBySide.parameters = {
    docs: {
        description: {
            story: "In this example, we have side-by-side `InitialFallback` components. This demonstrates how component non-nested `InitialFallback` components independently track the first render.",
        },
    },
};
