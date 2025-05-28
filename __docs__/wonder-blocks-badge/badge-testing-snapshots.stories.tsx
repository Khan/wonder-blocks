import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {
    Badge,
    GemBadge,
    StatusBadge,
    StreakBadge,
    DueBadge,
} from "@khanacademy/wonder-blocks-badge";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    commonStates,
    defaultPseudoStates,
    StateSheet,
} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Heading, HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import singleColoredIcon from "../components/single-colored-icon.svg";
import {multiColoredIcon} from "../components/icons-for-testing";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";

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

const statusKinds = ["info", "success", "warning", "critical"] as const;

const states = [
    commonStates.rest,
    // Include snapshots for focus states to ensure focus styles are applied
    // correctly. The Badge is not interactive by default, but becomes interactive
    // when used with another component like `Tooltip`.
    commonStates.focus,
];
export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: () => {
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
        const rows = [
            {
                name: "Default",
                props: {},
            },
        ];

        const statusRows = [
            ...statusKinds.map((kind) => ({
                name: kind,
                props: {kind},
            })),
        ];

        const columnsWithShowIconProp = [
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
                    showIcon: true,
                },
            },
            {
                name: "Icon only",
                props: {
                    showIcon: true,
                },
            },
        ];

        return (
            <View style={{gap: sizing.size_080}}>
                <HeadingLarge>Badge</HeadingLarge>
                <StateSheet rows={rows} columns={columns} states={states}>
                    {({props}) => <Badge {...props} />}
                </StateSheet>
                <HeadingLarge>Status Badge</HeadingLarge>
                <StateSheet rows={statusRows} columns={columns} states={states}>
                    {({props}) => <StatusBadge {...props} />}
                </StateSheet>
                <HeadingLarge>Gem Badge</HeadingLarge>
                <StateSheet
                    rows={rows}
                    columns={columnsWithShowIconProp}
                    states={states}
                >
                    {({props}) => <GemBadge {...props} />}
                </StateSheet>
                <HeadingLarge>Streak Badge</HeadingLarge>
                <StateSheet
                    rows={rows}
                    columns={columnsWithShowIconProp}
                    states={states}
                >
                    {({props}) => <StreakBadge {...props} />}
                </StateSheet>
                <HeadingLarge>Due Badge</HeadingLarge>
                <StateSheet rows={rows} columns={columns} states={states}>
                    {({props}) => <DueBadge {...props} />}
                </StateSheet>
            </View>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
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
                name: "Custom svg icon using PhosphorIcon with label",
                props: {
                    label: "Badge",
                    icon: <PhosphorIcon icon={singleColoredIcon} />,
                },
            },
            {
                name: "Custom svg icon using PhosphorIcon",
                props: {
                    icon: <PhosphorIcon icon={singleColoredIcon} />,
                },
            },
            {
                name: "Custom img element with svg src with label",
                props: {
                    label: "Badge",
                    icon: (
                        <Icon>
                            <img src={"/logo.svg"} alt="Wonder Blocks" />
                        </Icon>
                    ),
                },
            },
            {
                name: "Custom img element with svg src",
                props: {
                    icon: (
                        <Icon>
                            <img src={"/logo.svg"} alt="Wonder Blocks" />
                        </Icon>
                    ),
                },
            },
            {
                name: "Custom img element with png src with label",
                props: {
                    label: "Badge",
                    icon: (
                        <Icon>
                            <img src={"/avatar.png"} alt="Example avatar" />
                        </Icon>
                    ),
                },
            },
            {
                name: "Custom img element with png src",
                props: {
                    icon: (
                        <Icon>
                            <img src={"/avatar.png"} alt="Example avatar" />
                        </Icon>
                    ),
                },
            },
            {
                name: "Custom multi-colored inline svg using the Icon component with label",
                props: {
                    label: "Badge",
                    icon: <Icon>{multiColoredIcon}</Icon>,
                },
            },
            {
                name: "Custom multi-colored inline svg using the Icon component",
                props: {
                    icon: <Icon>{multiColoredIcon}</Icon>,
                },
            },

            {
                name: "Empty label and no icon",
                props: {
                    label: "",
                    icon: undefined,
                },
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

export const AllBadgesScenarios: StoryComponentType = {
    render: () => {
        const badgesWithIcon = [
            <Badge label="Badge" />,
            ...statusKinds.map((kind) => (
                <StatusBadge label="Badge" kind={kind} />
            )),
            <DueBadge label="Badge" />,
        ].map((component) =>
            React.cloneElement(component, {
                icon: <PhosphorIcon icon={IconMappings.cookie} />,
            }),
        );

        const badgesWithShowIcon = [
            <GemBadge label="Badge" />,
            <StreakBadge label="Badge" />,
        ].map((component) =>
            React.cloneElement(component, {
                showIcon: true,
            }),
        );

        const badges = [...badgesWithIcon, ...badgesWithShowIcon];

        return (
            <View
                style={{
                    gap: sizing.size_240,
                    // Include end padding to ensure tooltips are included in the
                    // snapshot
                    paddingBlockEnd: sizing.size_880,
                }}
            >
                <Heading>Badges</Heading>
                <View style={styles.badgesContainer}>
                    {badges.map((badge, index) => (
                        <View key={index}>{badge}</View>
                    ))}
                </View>
                <Heading>Badges with Tooltip</Heading>
                <View style={styles.badgesContainer}>
                    {badges.map((badge, index) => (
                        <Tooltip
                            content="Tooltip"
                            opened={true}
                            key={index}
                            placement="bottom"
                        >
                            {React.cloneElement(badge, {role: "button"})}
                        </Tooltip>
                    ))}
                </View>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    badgesContainer: {
        gap: sizing.size_240,
        flexDirection: "row",
    },
});
