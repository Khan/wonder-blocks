import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Switch from "@khanacademy/wonder-blocks-switch";
import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";

import SwitchArgtypes from "./switch.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

type StoryComponentType = StoryObj<typeof Switch>;

export default {
    title: "Packages / Switch / Best Practices",
    component: Switch,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: true,
        },
    },
    argTypes: SwitchArgtypes,
} as Meta<typeof Switch>;

export const WithLabel: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Switch
                id="switch-with-label"
                checked={checked}
                onChange={setChecked}
                aria-labelledby="label-for-switch-with-label"
            />
            <BodyText
                id="label-for-switch-with-label"
                htmlFor="switch-with-label"
                style={{marginInlineStart: sizing.size_080}}
                tag="label"
            >
                Superpowers
            </BodyText>
        </View>
    );
}) as StoryComponentType;

export const WithLabelAndDescription: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Switch
                id="switch-with-desc"
                checked={checked}
                onChange={setChecked}
                aria-labelledby="label-for-switch-with-desc"
                aria-describedby="desc-for-switch-with-desc"
            />
            <View style={{marginInlineStart: sizing.size_080}}>
                <BodyText
                    id="label-for-switch-with-desc"
                    htmlFor="switch-with-desc"
                    tag="label"
                >
                    Getting a Healthy Amount of Sleep
                </BodyText>
                <BodyText
                    size="small"
                    id="desc-for-switch-with-desc"
                    style={{
                        color: semanticColor.core.foreground.neutral.subtle,
                    }}
                >
                    Sleep is important for your health. The benefits of a good
                    night sleep include improved memory, longer life, and
                    increased creativity.
                </BodyText>
            </View>
        </View>
    );
}) as StoryComponentType;

export const WithLabelAndOnOff: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <BodyText
                id="label-for-switch-with-on-off"
                htmlFor="switch-with-on-off"
                style={{marginInlineEnd: sizing.size_080}}
                tag="label"
            >
                Gravity
            </BodyText>
            <Switch
                id="switch-with-on-off"
                checked={checked}
                onChange={setChecked}
                aria-labelledby="label-for-switch-with-on-off"
            />
            <BodyText
                size="small"
                style={{
                    marginInlineStart: sizing.size_080,
                    color: semanticColor.core.foreground.neutral.subtle,
                }}
                aria-hidden={true}
            >
                {checked ? "ON" : "OFF"}
            </BodyText>
        </View>
    );
}) as StoryComponentType;

export const WithTooltip: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);
    const tooltipContent = `Hints turned ${checked ? "ON" : "OFF"}`;

    return (
        <View>
            <Tooltip content={tooltipContent} placement="right">
                <Switch
                    aria-label="Tooltip example"
                    checked={checked}
                    onChange={setChecked}
                    icon={<PhosphorIcon icon={IconMappings.lightbulbBold} />}
                />
            </Tooltip>
        </View>
    );
}) as StoryComponentType;

export const InsideCell: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);

    return (
        <CompactCell
            title={
                <BodyText
                    id="label-for-switch-inside-cell"
                    htmlFor="switch-inside-cell"
                    tag="label"
                >
                    Click me!
                </BodyText>
            }
            rightAccessory={
                <Switch
                    id="switch-inside-cell"
                    aria-labelledby="label-for-switch-inside-cell"
                    checked={checked}
                    onChange={setChecked}
                />
            }
        />
    );
}) as StoryComponentType;

export const InsideDetailCell: StoryComponentType = (() => {
    const [checked, setChecked] = React.useState(false);

    return (
        <DetailCell
            title={
                <BodyText
                    id="label-for-switch-inside-detail-cell"
                    htmlFor="switch-inside-detail-cell"
                    tag="label"
                >
                    Click me! I will change the state of the switch.
                </BodyText>
            }
            subtitle2={
                <BodyText
                    size="small"
                    id="desc-for-switch-inside-detail-cell"
                    style={{
                        color: semanticColor.core.foreground.neutral.subtle,
                    }}
                >
                    I am a long description that does not change the state of
                    the switch. Click me all you want and nothing will change.
                </BodyText>
            }
            leftAccessory={<PhosphorIcon icon={IconMappings.infoBold} />}
            rightAccessory={
                <Switch
                    id="switch-inside-detail-cell"
                    aria-labelledby="label-for-switch-inside-detail-cell"
                    aria-describedby="desc-for-switch-inside-detail-cell"
                    checked={checked}
                    onChange={setChecked}
                />
            }
        />
    );
}) as StoryComponentType;
