import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import Switch from "@khanacademy/wonder-blocks-switch";
import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../../.storybook/components/component-info";

import SwitchArgtypes from "./switch.argtypes";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

type StoryComponentType = StoryObj<typeof Switch>;

export default {
    title: "Switch / Best Practices",
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
            <LabelMedium
                id="label-for-switch-with-label"
                htmlFor="switch-with-label"
                style={{marginLeft: Spacing.xSmall_8}}
                tag="label"
            >
                Superpowers
            </LabelMedium>
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
            <View style={{marginLeft: Spacing.xSmall_8}}>
                <LabelMedium
                    id="label-for-switch-with-desc"
                    htmlFor="switch-with-desc"
                    tag="label"
                >
                    Getting a Healthy Amount of Sleep
                </LabelMedium>
                <LabelSmall
                    id="desc-for-switch-with-desc"
                    style={{color: Color.offBlack64}}
                >
                    Sleep is important for your health. The benefits of a good
                    night sleep include improved memory, longer life, and
                    increased creativity.
                </LabelSmall>
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
            <LabelMedium
                id="label-for-switch-with-on-off"
                htmlFor="switch-with-on-off"
                style={{marginRight: Spacing.xSmall_8}}
                tag="label"
            >
                Gravity
            </LabelMedium>
            <Switch
                id="switch-with-on-off"
                checked={checked}
                onChange={setChecked}
                aria-labelledby="label-for-switch-with-on-off"
            />
            <LabelSmall
                style={{marginLeft: Spacing.xSmall_8, color: Color.offBlack64}}
                aria-hidden={true}
            >
                {checked ? "ON" : "OFF"}
            </LabelSmall>
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
                    checked={checked}
                    onChange={setChecked}
                    icon={<Icon icon={icons.hint} />}
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
                <LabelMedium
                    id="label-for-switch-inside-cell"
                    htmlFor="switch-inside-cell"
                    tag="label"
                >
                    Click me!
                </LabelMedium>
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
                <LabelMedium
                    id="label-for-switch-inside-detail-cell"
                    htmlFor="switch-inside-detail-cell"
                    tag="label"
                >
                    Click me! I will change the state of the switch.
                </LabelMedium>
            }
            subtitle2={
                <LabelSmall
                    id="desc-for-switch-inside-detail-cell"
                    style={{color: Color.offBlack64}}
                >
                    I am a long description that does not change the state of
                    the switch. Click me all you want and nothing will change.
                </LabelSmall>
            }
            leftAccessory={<Icon icon={icons.info} />}
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
