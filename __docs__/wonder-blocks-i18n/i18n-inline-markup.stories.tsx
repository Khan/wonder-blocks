import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import * as i18n from "@khanacademy/wonder-blocks-i18n";

import {I18nInlineMarkup} from "../../packages/wonder-blocks-i18n/src/components/i18n-inline-markup";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Translations / I18nInlineMarkup",
    component: I18nInlineMarkup,
    parameters: {
        // We don't really care what the output looks for these stories.
        chromatic: {
            disableSnapshot: true,
        },
    },
} as Meta<typeof I18nInlineMarkup>;

type StoryComponentType = StoryObj<typeof I18nInlineMarkup>;

export const SingleShallowSubstitution: StoryComponentType = {
    render: () => {
        return (
            <I18nInlineMarkup
                u={(t: string) => (
                    <React.Fragment>
                        [Underline:<u>{t}</u>]
                    </React.Fragment>
                )}
            >
                {i18n._(
                    "-6\u00b0C, Sunny, Fells like: <u>-12</u>, Wind: VR 5 km/h",
                )}
            </I18nInlineMarkup>
        );
    },
};

export const MultipleShallowSubstitution: StoryComponentType = {
    render: () => {
        return (
            <I18nInlineMarkup
                u={(t: string) => (
                    <React.Fragment>
                        __<u>{t}</u>__
                    </React.Fragment>
                )}
                i={(t: string) => (
                    <span style={{background: "lightblue"}}>
                        *<i style={{fontStyle: "italic"}}>{t}</i>*
                    </span>
                )}
            >
                {i18n._(
                    "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
                )}
            </I18nInlineMarkup>
        );
    },
};

export const ElementWrapper: StoryComponentType = {
    render: () => {
        return (
            <I18nInlineMarkup
                elementWrapper={(elem) => (
                    <span style={{background: "yellow"}}>{elem}</span>
                )}
                u={(t: string) => (
                    <span style={{background: "red"}}>
                        __<u>{t}</u>__
                    </span>
                )}
                i={(t: string) => (
                    <span style={{background: "lightblue"}}>
                        *<i style={{fontStyle: "italic"}}>{t}</i>*
                    </span>
                )}
            >
                {i18n._(
                    "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
                )}
            </I18nInlineMarkup>
        );
    },
};

export const HandlingTranslationErrors: StoryComponentType = {
    render: () => {
        return (
            <I18nInlineMarkup
                settings={(label: string) => (
                    // @ts-expect-error(FEI-5000): No overload matches this call.
                    <LabelMedium href="/settings#child-accounts">
                        {label}
                    </LabelMedium>
                )}
                onError={(error) => (
                    <Tooltip
                        content={
                            <TooltipContent>
                                <LabelMedium style={{color: color.red}}>
                                    {error.message}
                                </LabelMedium>
                            </TooltipContent>
                        }
                    >
                        <PhosphorIcon
                            size="small"
                            icon={IconMappings.xCircleBold}
                            color={color.red}
                        />
                    </Tooltip>
                )}
            >
                {i18n._(
                    "This HTML is broken \u003cinvalid\u003einvalid\u003e innner \u003c/invalid\u003e, but here is fine.",
                )}
            </I18nInlineMarkup>
        );
    },
};

HandlingTranslationErrors.parameters = {
    docs: {
        description: {
            story:
                `This story shows how to handle translation errors. The ` +
                `\`onError\` prop is called when there is an error parsing ` +
                `the translation. In this example, we're using a tooltip ` +
                `to show the error message.`,
        },
    },
};
