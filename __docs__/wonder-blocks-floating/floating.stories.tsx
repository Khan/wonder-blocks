import type {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Floating} from "@khanacademy/wonder-blocks-floating";
import Switch from "@khanacademy/wonder-blocks-switch";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import packageConfig from "../../packages/wonder-blocks-floating/package.json";
import ComponentInfo from "../components/component-info";
import {longText} from "../components/text-for-testing";

type StoryComponentType = StoryObj<typeof Floating>;

export default {
    title: "Packages / Floating / Floating",
    component: Floating,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // See floating-testing-snapshots.stories.tsx for the snapshot
            // stories for the different middlewares.
            disableSnapshot: true,
        },
    },
    decorators: [
        (Story): React.ReactElement => (
            <View style={styles.storyCanvas}>{Story()}</View>
        ),
    ],
    args: {
        content: (
            <View style={{padding: sizing.size_080}}>Floating content</View>
        ),
    },
} as Meta<typeof Floating>;

/**
 * Dhis is the most minimal example for Floating. In this case, we use it to
 * launch a popup that is triggered when the button is clicked.
 */
export const Default: StoryComponentType = {
    render: function Render(args) {
        const [isOpen, setIsOpen] = React.useState(args.open ?? true);

        React.useEffect(() => {
            if (args.open !== undefined) {
                setIsOpen(args.open);
            }
        }, [args.open]);

        const buttonLabel = isOpen ? "Close" : "Open";

        return (
            <Floating {...args} open={isOpen} onOpenChange={setIsOpen}>
                <Button
                    kind="primary"
                    onClick={() => setIsOpen((state) => !state)}
                >
                    {buttonLabel}
                </Button>
            </Floating>
        );
    },
};

function SwitchWithLabel({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}) {
    const id = React.useId();
    return (
        <View style={styles.row}>
            <Switch checked={checked} onChange={onChange} id={id} />
            <BodyText tag="label" htmlFor={id}>
                {label}
            </BodyText>
        </View>
    );
}

/**
 * Floating relies on floating-ui's middlewares, which can be configured to
 * control the positioning and behavior of the floating element:
 *
 * - `shift`: Shift the floating element along the axis to keep it in view.
 * - `flip`: Flip the floating element to the opposite side if there's not enough space.
 * - `offset`: Offset the floating element from the reference element.
 * - `hide`: Hide the floating element when the reference element is hidden.
 * - `showArrow`: Show the arrow on the floating element.
 *
 * You can configure these middlewares to suit your needs. You'll need to scroll
 * the container to see the effect of the middlewares.
 */
export const Middlewares: StoryComponentType = {
    ...Default,
    render: function Render(args) {
        const [shift, setShift] = React.useState(true);
        const [flip, setFlip] = React.useState(true);
        const [offset, setOffset] = React.useState(20);
        const [hide, setHide] = React.useState(true);
        const [showArrow, setShowArrow] = React.useState(true);

        return (
            <View
                style={[
                    {
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: sizing.size_120,
                        gap: sizing.size_120,
                    },
                ]}
            >
                <View
                    style={styles.scrollableContainer}
                    // See https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                >
                    <View style={styles.scrollableContentArea}>
                        <BodyText>{longText}</BodyText>
                        <BodyText>{longText}</BodyText>
                        <div style={{textAlign: "center"}}>
                            <Floating
                                {...args}
                                shift={shift}
                                flip={flip}
                                offset={offset}
                                hide={hide}
                                showArrow={showArrow}
                                open
                            >
                                <View style={styles.reference}>Ref</View>
                            </Floating>
                        </div>

                        <BodyText>{longText}</BodyText>
                        <BodyText>{longText}</BodyText>
                        <BodyText>{longText}</BodyText>
                        <BodyText>{longText}</BodyText>
                        <BodyText>{longText}</BodyText>
                    </View>
                </View>
                <View style={{gap: sizing.size_160}}>
                    <SwitchWithLabel
                        checked={shift}
                        onChange={() => setShift(!shift)}
                        label="Shift"
                    />
                    <SwitchWithLabel
                        checked={flip}
                        onChange={() => setFlip(!flip)}
                        label="Flip"
                    />
                    <SwitchWithLabel
                        checked={hide}
                        onChange={() => setHide(!hide)}
                        label="Hide"
                    />
                    <SwitchWithLabel
                        checked={showArrow}
                        onChange={() => setShowArrow(!showArrow)}
                        label="Show Arrow"
                    />
                    <View style={styles.row}>
                        <input
                            id="offset"
                            type="range"
                            min={0}
                            max={100}
                            value={offset}
                            onChange={(e) =>
                                setOffset(parseInt(e.target.value))
                            }
                        />
                        <BodyText tag="label" htmlFor="offset">
                            Offset
                        </BodyText>
                    </View>
                </View>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    storyCanvas: {
        minHeight: 200,
        padding: sizing.size_640,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_160,
        alignItems: "center",
    },
    reference: {
        display: "inline-flex",
        background: semanticColor.core.background.instructive.default,
        color: semanticColor.core.foreground.knockout.default,
        height: sizing.size_440,
        padding: sizing.size_160,
    },
    scrollableContainer: {
        border: `${border.width.medium} dashed ${semanticColor.core.border.neutral.default}`,
        height: 300,
        width: 300,
        overflow: "scroll",
        // Makes it a boundary for the floating element
        position: "relative",
        padding: sizing.size_040,
    },
    scrollableContentArea: {
        gap: sizing.size_080,
        width: 500,
    },
});
