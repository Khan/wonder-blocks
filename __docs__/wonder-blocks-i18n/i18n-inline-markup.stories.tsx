import * as React from "react";

import type {ComponentStory, ComponentMeta} from "@storybook/react";
import Color from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import * as i18n from "@khanacademy/wonder-blocks-i18n";

import {I18nInlineMarkup} from "../../packages/wonder-blocks-i18n/src/components/i18n-inline-markup";

export default {
    title: "Translations/I18nInlineMarkup",
    component: I18nInlineMarkup,
    parameters: {
        // We don't really care what the output looks for these stories.
        chromatic: {
            disableSnapshot: true,
        },
    },
} as ComponentMeta<typeof I18nInlineMarkup>;

type StoryComponentType = ComponentStory<typeof I18nInlineMarkup>;

export const SingleShallowSubstitution: StoryComponentType = () => {
    return (
        // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
        <I18nInlineMarkup
            u={(t) => (
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
};

export const MultipleShallowSubstitution: StoryComponentType = () => {
    return (
        // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
        <I18nInlineMarkup
            u={(t) => (
                <React.Fragment>
                    __<u>{t}</u>__
                </React.Fragment>
            )}
            i={(t) => (
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
};

export const ElementWrapper: StoryComponentType = () => {
    return (
        // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
        <I18nInlineMarkup
            elementWrapper={(t) => (
                <span style={{background: "yellow"}}>{t}</span>
            )}
            u={(t) => (
                <span style={{background: "red"}}>
                    __<u>{t}</u>__
                </span>
            )}
            i={(t) => (
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
};

export const HandlingTranslationErrors: StoryComponentType = () => {
    return (
        // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
        <I18nInlineMarkup
            settings={(label) => (
                // @ts-expect-error(FEI-5000): No overload matches this call.
                <LabelMedium href="/settings#child-accounts">
                    {label}
                </LabelMedium>
            )}
            onError={(error) => (
                <Tooltip
                    content={
                        <TooltipContent>
                            <LabelMedium style={{color: Color.red}}>
                                {error.message}
                            </LabelMedium>
                        </TooltipContent>
                    }
                >
                    <Icon
                        size="small"
                        icon={icons.incorrect}
                        color={Color.red}
                    />
                </Tooltip>
            )}
        >
            {i18n._(
                "This HTML is broken \u003cinvalid\u003einvalid\u003e innner \u003c/invalid\u003e, but here is fine.",
            )}
        </I18nInlineMarkup>
    );
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
