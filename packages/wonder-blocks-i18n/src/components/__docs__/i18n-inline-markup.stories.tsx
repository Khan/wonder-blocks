import * as React from "react";

import Color from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import * as i18n from "../../functions/i18n";

import {I18nInlineMarkup} from "../i18n-inline-markup";

export default {
    title: "Translations/I18nInlineMarkup",
    component: I18nInlineMarkup,
    parameters: {
        // We don't really care what the output looks for these stories.
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const SingleShallowSubstitution = (): React.ReactElement => {
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

export const MultipleShallowSubstitution = (): React.ReactElement => {
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

export const ElementWrapper = (): React.ReactElement => {
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

export const HandlingTranslationErrors: StoryComponentType = (): React.Node => {
    return (
        <I18nInlineMarkup
            settings={(label) => (
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
