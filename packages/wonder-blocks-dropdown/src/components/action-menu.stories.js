// @flow
import * as React from "react";

import type {StoryComponentType} from "@storybook/react";
import ActionMenu from "./action-menu.js";
import ActionItem from "./action-item.js";

export default {
    title: "Dropdown / ActionMenu",
    component: ActionMenu,
};

export const ActionMenuWithLang: StoryComponentType = () => (
    <ActionMenu menuText="Locales">
        {locales.map((locale) => (
            <ActionItem
                key={locale.locale}
                label={locale.localName}
                lang={locale.locale}
                testId={"language_picker_" + locale.locale}
            />
        ))}
    </ActionMenu>
);

ActionMenuWithLang.storyName = "Using the ActionMenu with the lang attribute";

ActionMenuWithLang.parameters = {
    docs: {
        storyDescription:
            "You can use the `lang` attribute to specify the language of the action item(s). This is useful if you want to avoid issues with Screen Readers trying to read the proper language for the rendered text.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

const locales = [
    {id: "az", locale: "az", localName: "Azərbaycanca"},
    {id: "id", locale: "id", localName: "Bahasa Indonesia"},
    {id: "cs", locale: "cs", localName: "čeština"},
    {id: "da", locale: "da", localName: "dansk"},
    {id: "de", locale: "de", localName: "Deutsch"},
    {id: "en", locale: "en", localName: "English"},
    {id: "es", locale: "es", localName: "español"},
    {id: "fr", locale: "fr", localName: "français"},
    {id: "it", locale: "it", localName: "italiano"},
];
