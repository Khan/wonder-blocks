import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {expect, waitFor, within} from "storybook/test";
import {StyleSheet} from "aphrodite";
import {Floating} from "@khanacademy/wonder-blocks-floating";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ScenariosLayout} from "../components/scenarios-layout";
import {longText} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {ScrollableView} from "@khanacademy/wonder-blocks-layout";
import {Heading} from "@khanacademy/wonder-blocks-typography";

import {
    Portal as PortalStory,
    InitialFocus as InitialFocusStory,
    CustomStyles as CustomStylesStory,
    Placements as PlacementsStory,
} from "./floating.stories";
import {allModes} from "../../.storybook/modes";

const styles = StyleSheet.create({
    layout: {
        gap: sizing.size_160,
    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
    },
    // Content that scrolls (inside a `ScrollableView`) when the floating
    // element is constrained by the `size` middleware.
    scrollableContent: {
        padding: sizing.size_080,
        // Keep the content at its natural size so it overflows (and scrolls)
        // instead of being squashed.
        flexShrink: 0,
    },
    reference: {
        display: "inline-flex",
        background: semanticColor.action.primary.progressive.default.background,
        color: semanticColor.action.primary.progressive.default.foreground,
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
        // Also portal is set to false to ensure that the floating element
        // boundaries are set to the scrolling container.
        portal: false,
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
    args: {
        // all middlewares disabled
        hide: false,
        flip: false,
        shift: false,
        constrainSize: false,
        offset: 0,
    },
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
                name: "constrainSize enabled",
                props: {
                    floating: {
                        constrainSize: true,
                        placement: "bottom",
                        content: (
                            <ScrollableView aria-label="Long content (constrainSize enabled)">
                                <View style={styles.scrollableContent}>
                                    {longText}
                                </View>
                            </ScrollableView>
                        ),
                        testId: "floating-size-enabled",
                        // Constrain it to the scrolling container only, so
                        // the result doesn't depend on the viewport size.
                        rootBoundary: "document",
                    },
                },
            },
            {
                name: "constrainSize disabled",
                props: {
                    floating: {
                        placement: "bottom",
                        content: (
                            <ScrollableView aria-label="Long content (constrainSize disabled)">
                                <View style={styles.scrollableContent}>
                                    {longText}
                                </View>
                            </ScrollableView>
                        ),
                        testId: "floating-size-disabled",
                        rootBoundary: "document",
                    },
                },
            },
            {
                // With `shift`, the floating element moves to stay in view
                // when the reference element is near the edge (instead of
                // shrinking on both sides to stay centered on it).
                name: "constrainSize and shift enabled",
                props: {
                    scrollable: {
                        x: 80,
                    },
                    floating: {
                        constrainSize: true,
                        shift: true,
                        placement: "bottom",
                        content: (
                            <ScrollableView aria-label="Long content (constrainSize and shift enabled)">
                                <View style={styles.scrollableContent}>
                                    {longText}
                                </View>
                            </ScrollableView>
                        ),
                        testId: "floating-size-and-shift-enabled",
                        rootBoundary: "document",
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
            {
                name: "Custom styles",
                props: {
                    floating: {...CustomStylesStory.args, placement: "top"},
                },
            },
        ];
        return (
            <View style={styles.layout}>
                <Heading>Scenarios</Heading>
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
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // NOTE: We query the elements on every check (instead of keeping
        // references to them) because the story can re-mount right after the
        // first render (e.g. when the theme decorator applies the theme).

        // The `size` middleware constrains the floating element to the
        // available space within the scrolling container.
        await waitFor(() =>
            expect(
                parseFloat(
                    canvas.getByTestId("floating-size-enabled").style
                        .maxBlockSize,
                ),
            ).toBeGreaterThan(0),
        );

        // So its content scrolls, and the `ScrollableView` becomes focusable
        // (on the next frame). Waiting for it also ensures that the a11y
        // checks audit the final state.
        await waitFor(() =>
            expect(
                within(canvas.getByTestId("floating-size-enabled")).getByRole(
                    "region",
                    {name: "Long content (constrainSize enabled)"},
                ),
            ).toHaveAttribute("tabindex", "0"),
        );

        // Without it, the floating element isn't constrained.
        await expect(
            canvas.getByTestId("floating-size-disabled").style.maxBlockSize,
        ).toBe("");

        // So the constrained floating element is shorter than its content.
        await expect(
            canvas.getByTestId("floating-size-enabled").offsetHeight,
        ).toBeLessThan(
            canvas.getByTestId("floating-size-disabled").offsetHeight,
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
        // NOTE: Disabling focus manager to avoid a11y false positives.
        focusManagerEnabled: false,
        initialFocusRef: undefined,
    },
};

export const InitialFocus: Story = {
    ...InitialFocusStory,
    args: {
        ...InitialFocusStory.args,
        open: true,
        // NOTE: Disabling portal to avoid a11y false positives.
        portal: false,
    },
};

export const Placements: Story = {
    ...PlacementsStory,
    args: {
        ...PlacementsStory.args,
        open: true,
    },
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                "default rtl": allModes["themeDefault rtl"],
            },
        },
    },
};
