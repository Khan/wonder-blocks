import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

export default {
    title: "Icon / Icon",
    component: Icon,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: {
        icon: {
            options: icons,
        },
        size: {
            options: ["small", "medium", "large", "xlarge"],
        },
    },
} as Meta<typeof Icon>;

type StoryComponentType = StoryObj<typeof Icon>;

export const Default: StoryComponentType = {
    args: {icon: icons.search, size: "small"},
};

export const Basic: StoryComponentType = () => {
    return <Icon icon={icons.search} />;
};

Basic.parameters = {
    docs: {
        description: {
            story: `Minimal icon usage. This is a search icon.
            Icons are size \`"small"\` by default.`,
        },
    },
};

export const Sizes: StoryComponentType = () => {
    return (
        <table>
            <tr>
                <td>
                    <LabelMedium>{"xsmall"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="xsmall" />
                </td>
            </tr>
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
        description: {
            story: `The size of an icon is determined by the \`Icon\`'s
            \`size\` prop. While we don't currently have assets for sizes
            larger than medium, we can still render any icon at any size
            in a pinch. The available sizes are \`"xsmall"\`, \`"small"\`, \`"medium"\`,
            \`"large"\`, and \`"xlarge"\`. `,
        },
    },
};

export const Variants: StoryComponentType = () => {
    const iconsWithLabels = Object.entries(icons).map(([name, icon]) => {
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
        description: {
            story: `The actual icon is determined by the \`Icon\`'s
            \`icon\` prop. Here are the icons that are already defined in
            Wonder Blocks and ready to use. Just import \`{icons}\` from
            \`"@khanacademy/wonder-blocks-icon"\`.`,
        },
    },
};

export const WithColor: StoryComponentType = () => {
    return <Icon size="small" icon={icons.info} color={Color.red} />;
};

WithColor.parameters = {
    docs: {
        description: {
            story: "The color of an icon can be specified through its `color` prop.",
        },
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
        description: {
            story: "Icons have `display: inline-block` by default.",
        },
    },
};

export const CustomIcon: StoryComponentType = () => {
    const share: IconAsset = {
        medium: "M12.5 4.25C12.5 3.14543 13.3954 2.25 14.5 2.25C15.6046 2.25 16.5 3.14543 16.5 4.25C16.5 5.35457 15.6046 6.25 14.5 6.25C13.8117 6.25 13.2046 5.90228 12.8447 5.37291C12.8367 5.3589 12.8282 5.34502 12.8194 5.33126C12.8102 5.31696 12.8007 5.30297 12.7909 5.28929C12.6063 4.98641 12.5 4.63062 12.5 4.25ZM14.5 8.25C13.4511 8.25 12.4966 7.8463 11.7832 7.18581L7.79943 9.7458C7.92958 10.1403 8 10.5619 8 11C8 11.4381 7.92958 11.8597 7.79943 12.2542L11.7832 14.8142C12.4966 14.1537 13.4511 13.75 14.5 13.75C16.7091 13.75 18.5 15.5409 18.5 17.75C18.5 19.9591 16.7091 21.75 14.5 21.75C12.2909 21.75 10.5 19.9591 10.5 17.75C10.5 17.3119 10.5704 16.8903 10.7006 16.4958L6.71681 13.9358C6.00342 14.5963 5.04885 15 4 15C1.79086 15 0 13.2091 0 11C0 8.79086 1.79086 7 4 7C5.04885 7 6.00342 7.40369 6.71681 8.06417L10.7006 5.50416C10.5704 5.10969 10.5 4.68807 10.5 4.25C10.5 2.04086 12.2909 0.25 14.5 0.25C16.7091 0.25 18.5 2.04086 18.5 4.25C18.5 6.45914 16.7091 8.25 14.5 8.25ZM5.70939 12.0388C5.69949 12.0526 5.68988 12.0668 5.68058 12.0813C5.67164 12.0952 5.6631 12.1092 5.65493 12.1234C5.29508 12.6525 4.68812 13 4 13C2.89543 13 2 12.1046 2 11C2 9.8954 2.89543 9 4 9C4.68812 9 5.29507 9.3475 5.65493 9.8766C5.66309 9.8908 5.67164 9.9048 5.68058 9.9187C5.68988 9.9332 5.69949 9.9474 5.7094 9.9612C5.89379 10.264 6 10.6196 6 11C6 11.3804 5.89379 11.736 5.70939 12.0388ZM12.7909 16.7107C12.6063 17.0136 12.5 17.3694 12.5 17.75C12.5 18.8546 13.3954 19.75 14.5 19.75C15.6046 19.75 16.5 18.8546 16.5 17.75C16.5 16.6454 15.6046 15.75 14.5 15.75C13.8117 15.75 13.2046 16.0977 12.8447 16.6271C12.8367 16.6411 12.8282 16.655 12.8194 16.6687C12.8102 16.683 12.8007 16.697 12.7909 16.7107Z",
    };

    return (
        <Icon
            icon={share}
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
            }}
        />
    );
};

CustomIcon.parameters = {
    docs: {
        description: {
            story:
                "Icons can be customized by passing in a custom icon." +
                "The icon should be an object with a size-related property (`small | medium | large | xlarge`) that is a string containing the path data for the icon.\n\n" +
                "NOTE: Sometimes the icon will need some custom SVG attributes to render correctly. For example, the `fillRule` and `clipRule` attributes are needed for the share icon. This can be set using the `style` prop.",
        },
    },
};
