import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {Floating} from "@khanacademy/wonder-blocks-floating";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ScenariosLayout} from "../components/scenarios-layout";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";

import {Portal as PortalStory} from "./floating.stories";

const styles = StyleSheet.create({
    layout: {
        gap: sizing.size_160,
    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
    },
    reference: {
        display: "inline-flex",
        background: semanticColor.core.background.instructive.default,
        color: semanticColor.core.foreground.knockout.default,
        padding: sizing.size_160,
        placeSelf: "center",
    },
});

/**
 * The following stories are used to generate the pseudo states for the
 * ActivityButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Floating / Testing / Snapshots / Floating",
    tags: ["!autodocs"],
    args: {
        children: <View style={styles.reference}>Ref</View>,
        content: (
            <View style={{padding: sizing.size_080}}>Floating content</View>
        ),
        open: true,
        // NOTE: The strategy is set to absolute to ensure that the floating
        // element applies middlewares correctly within the scrolling container.
        strategy: "absolute",
        // all middlewares disabled
        hide: false,
        flip: false,
        shift: false,
        offset: 0,
    },
} as Meta;

type Story = StoryObj<typeof Floating>;

function ScrollingContainer({
    children,
    width = 360,
    height = 360,
    x = 0,
    y = 0,
}: {
    children: React.ReactNode;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}) {
    const scrollableRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTo({left: x, top: y});
        }
    }, [x, y]);

    return (
        <div
            ref={scrollableRef}
            style={{
                border: `${border.width.medium} dashed ${semanticColor.core.border.neutral.default}`,
                height: 200,
                width: 200,
                overflow: "scroll",
                // Makes it a boundary for the floating element
                position: "relative",
                placeItems: "center",
            }}
            // See https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
        >
            <div
                style={{
                    display: "flex",
                    marginInline: -80,
                    marginBlock: -80,
                    justifyContent: "center",
                    height: height,
                    width: width,
                }}
            >
                {children}
            </div>
        </div>
    );
}
/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render(args) {
        const scenarios = [
            {
                name: "shift enabled",
                props: {
                    scrollable: {
                        x: 200,
                    },
                    floating: {
                        shift: true,
                    },
                },
            },
            {
                name: "flip enabled",
                props: {
                    scrollable: {
                        y: 200,
                    },
                    floating: {
                        flip: true,
                    },
                },
            },
            {
                name: "offset enabled",
                props: {
                    floating: {
                        offset: 20,
                    },
                },
            },
            {
                name: "hide enabled",
                props: {
                    floating: {
                        hide: true,
                        placement: "bottom",
                    },
                    scrollable: {
                        y: 400,
                        height: 600,
                    },
                },
            },
            {
                name: "showArrow disabled",
                props: {
                    floating: {
                        showArrow: false,
                    },
                },
            },
        ];
        return (
            <View style={styles.layout}>
                <Heading>Middlewares</Heading>
                <ScenariosLayout
                    scenarios={scenarios}
                    styles={{
                        root: styles.container,
                    }}
                >
                    {({floating, scrollable}) => (
                        <ScrollingContainer {...scrollable}>
                            <Floating {...args} {...floating} />
                        </ScrollingContainer>
                    )}
                </ScenariosLayout>
            </View>
        );
    },
};

// This story is reused to test that portal works correctly when the modal
// dialog is opened.
export const Portal: Story = {
    ...PortalStory,
    args: {
        ...PortalStory.args,
        open: true,
    },
};
