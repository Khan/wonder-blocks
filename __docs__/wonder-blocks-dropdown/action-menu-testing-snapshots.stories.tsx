import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {ScenariosLayout} from "../components/scenarios-layout";
import {themeModes} from "../../.storybook/modes";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Dropdown / Testing / Snapshots / ActionMenu",
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof ActionMenu>;

const ControlledActionMenu = (
    props: React.ComponentProps<typeof ActionMenu>,
) => {
    const [opened, setOpened] = React.useState(false);
    React.useEffect(() => {
        if (props.opened !== undefined) {
            setOpened(props.opened);
        }
    }, [props.opened]);
    return <ActionMenu {...props} opened={opened} onToggle={setOpened} />;
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Long menuText",
                props: {
                    menuText: longText,
                    children: [
                        <ActionItem label="item 1" key="1" />,
                        <ActionItem label="item 2" key="2" />,
                        <ActionItem label="item 3" key="3" />,
                    ],
                },
            },
            {
                name: "Long menuText with no word break",
                props: {
                    menuText: longTextWithNoWordBreak,
                    children: [
                        <ActionItem label="item 1" key="1" />,
                        <ActionItem label="item 2" key="2" />,
                        <ActionItem label="item 3" key="3" />,
                    ],
                },
            },
            {
                name: "Long action item label",
                props: {
                    menuText: "Action Menu",
                    children: [
                        <ActionItem label={longText} key="1" />,
                        <ActionItem label={longTextWithNoWordBreak} key="2" />,
                    ],
                    opened: true,
                    style: {paddingBlockEnd: sizing.size_480},
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <ControlledActionMenu {...props} aria-label={name} />
                )}
            </ScenariosLayout>
        );
    },
    globals: {
        viewport: {
            value: "small",
        },
    },
};
