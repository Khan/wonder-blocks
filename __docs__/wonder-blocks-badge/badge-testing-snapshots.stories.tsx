import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {commonStates, StateSheet} from "../components/state-sheet";

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
export default {
    title: "Packages / Badge / Testing / Snapshots",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof Badge>;

type StoryComponentType = StoryObj<typeof Badge>;

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: () => {
        const rows = [
            ...["info", "success", "warning", "critical"].map((kind) => ({
                name: kind,
                props: {
                    kind,
                },
            })),
        ];
        const columns = [
            {
                name: "Label only",
                props: {
                    label: "Badge",
                },
            },
            {
                name: "Label with icon",
                props: {
                    label: "Badge",
                    icon: <PhosphorIcon icon={IconMappings.cookie} />,
                },
            },
            {
                name: "Icon only",
                props: {
                    icon: (
                        <PhosphorIcon
                            icon={IconMappings.cookie}
                            aria-label="Cookie"
                        />
                    ),
                },
            },
        ];
        return (
            <StateSheet
                rows={rows}
                columns={columns}
                states={[commonStates.rest]}
            >
                {({props}) => <Badge {...props} />}
            </StateSheet>
        );
    },
};
