import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {commonStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";

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

export const Scenarios: StoryComponentType = {
    render: () => {
        const textScenarios = [
            {
                name: "Long label",
                props: {
                    label: longText,
                },
            },
            {
                name: "Long label with icon",
                props: {
                    label: longText,
                    icon: <PhosphorIcon icon={IconMappings.cookie} />,
                },
            },
            {
                name: "Long label with no word break",
                props: {
                    label: longTextWithNoWordBreak,
                },
            },
            {
                name: "Long label with no word break with icon",
                props: {
                    label: longTextWithNoWordBreak,
                    icon: <PhosphorIcon icon={IconMappings.cookie} />,
                },
            },
        ];
        const scenarios = [
            {
                name: "Custom svg icon with label",
                props: {
                    label: "Badge",
                    icon: singleColoredIcon,
                },
            },
            {
                name: "Custom svg icon",
                props: {
                    icon: singleColoredIcon,
                },
            },
            {
                name: "Custom multi-colored svg icon with label",
                props: {
                    label: "Badge",
                    icon: multiColoredIcon,
                },
            },
            {
                name: "Custom multi-colored svg icon",
                props: {
                    icon: multiColoredIcon,
                },
            },
            {
                name: "Custom img tag icon",
                props: {
                    icon: (
                        <img
                            src={"./logo.svg"}
                            alt="Wonder Blocks"
                            style={{height: "100%", width: "100%"}}
                        />
                    ),
                },
            },
            {
                name: "Custom img tag icon with label",
                props: {
                    label: "Badge",
                    icon: (
                        <img
                            src={"./logo.svg"}
                            alt="Wonder Blocks"
                            style={{height: "100%", width: "100%"}}
                        />
                    ),
                },
            },
            {
                name: "No label and no icon",
                props: {},
            },
        ];
        return (
            <View style={{gap: sizing.size_080}}>
                <View
                    style={{
                        width: "200px",
                        border: `${border.width.thin} dashed ${semanticColor.border.primary}`,
                    }}
                >
                    <ScenariosLayout scenarios={textScenarios}>
                        {(props) => <Badge {...props} />}
                    </ScenariosLayout>
                </View>
                <ScenariosLayout scenarios={scenarios}>
                    {(props) => <Badge {...props} />}
                </ScenariosLayout>
            </View>
        );
    },
};
