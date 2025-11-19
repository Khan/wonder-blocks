import type {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";

import {View, type PropsFor} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import DatePickerOverlay from "../date-picker-overlay.tsx";

type Props = PropsFor<typeof DatePickerOverlay>;

const TestWrapper: React.FC<Props> = (props) => {
    const [showOverlay, setShowOverlay] = React.useState(false);
    const ref = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        // Ensure the ref is set after mount
        setShowOverlay(true);
    }, []);

    return (
        <View>
            <button ref={ref}>Reference element</button>
            {showOverlay && (
                <DatePickerOverlay {...props} referenceElement={ref.current} />
            )}
            <button>next</button>
        </View>
    );
};

/**
 * DatePickerOverlay component for displaying content in a floating overlay
 */
const meta: Meta<typeof DatePickerOverlay> = {
    component: DatePickerOverlay,
    title: "DatePickerOverlay",
};

export default meta;

type Story = StoryObj<typeof DatePickerOverlay>;

/**
 * Renders the container inside the Overlay component
 */
export const BasicOverlay: Story = {
    render: (args) => <TestWrapper {...args} />,
    args: {
        children: (
            <View style={{padding: spacing.medium_16}}>
                <HeadingLarge>I'm a container inside Popper.</HeadingLarge>
            </View>
        ),
        referenceElement: null,
        onClose: () => {},
    },
};

/**
 * Renders the overlay using a custom style
 */
export const CustomStyleOverlay: Story = {
    render: (args) => <TestWrapper {...args} />,
    args: {
        children: (
            <View style={{padding: spacing.medium_16}}>
                <HeadingLarge>
                    I'm a container with custom styles inside Popper.
                </HeadingLarge>
            </View>
        ),
        referenceElement: null,
        onClose: () => {},
        style: {
            backgroundColor: semanticColor.core.background.instructive.strong,
            color: semanticColor.core.foreground.knockout.default,
        },
    },
};
