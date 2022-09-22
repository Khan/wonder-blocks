// @flow
import * as React from "react";
import type {StoryComponentType} from "@storybook/react";
import {entries} from "@khanacademy/wonder-stuff-core";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Icon / Icon",
    component: Icon,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    argTypes: {
        icon: {
            options: icons,
        },
        size: {
            options: ["small", "medium", "large", "xlarge"],
        },
    },
};

export const Default: StoryComponentType = (args) => {
    return <Icon {...args} />;
};

Default.args = {icon: icons.search, size: "small"};

export const Basic: StoryComponentType = () => {
    return <Icon icon={icons.search} />;
};

Basic.parameters = {
    docs: {
        storyDescription: `Minimal icon usage. This is a search icon.
            Icons are size \`"small"\` by default.`,
    },
};

export const Sizes: StoryComponentType = () => {
    return (
        <table>
            <tr>
                <td>
                    <LabelMedium>{"small"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="small" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"medium"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="medium" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"large"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="large" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"xlarge"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="xlarge" />
                </td>
            </tr>
        </table>
    );
};

Sizes.parameters = {
    docs: {
        storyDescription: `The size of an icon is determined by the \`Icon\`'s
            \`size\` prop. While we don't currently have assets for sizes
            larger than medium, we can still render any icon at any size
            in a pinch. The available sizes are \`"small"\`, \`"medium"\`,
            \`"large"\`, and \`"xlarge"\`. `,
    },
};

export const Variants: StoryComponentType = () => {
    const iconsWithLabels = entries(icons).map(([name, icon]) => {
        return (
            <tr>
                <td>
                    <Icon icon={icon} />
                </td>
                <td>
                    <LabelMedium>{name}</LabelMedium>
                </td>
            </tr>
        );
    });

    return <table>{iconsWithLabels}</table>;
};

Variants.parameters = {
    docs: {
        storyDescription: `The actual icon is determined by the \`Icon\`'s
            \`icon\` prop. Here are the icons that are already defined in
            Wonder Blocks and ready to use. Just import \`{icons}\` from
            \`"@khanacademy/wonder-blocks-icon"\`.`,
    },
};

export const WithColor: StoryComponentType = () => {
    return <Icon size="small" icon={icons.info} color={Color.red} />;
};

WithColor.parameters = {
    docs: {
        storyDescription:
            "The color of an icon can be specified through its `color` prop.",
    },
};

export const Inline: StoryComponentType = () => {
    return (
        <View>
            Here is an icon
            <Icon size="small" icon={icons.info} style={{margin: 2}} />
            when it is inline.
        </View>
    );
};

Inline.parameters = {
    docs: {
        storyDescription: "Icons have `display: inline-block` by default.",
    },
};
