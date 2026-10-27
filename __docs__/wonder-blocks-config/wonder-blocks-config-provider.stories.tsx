import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {useArgs} from "storybook/preview-api";

import {
    useWonderBlocksI18n,
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import packageConfig from "../../packages/wonder-blocks-config/package.json";

import ComponentInfo from "../components/component-info";
import WonderBlocksConfigProviderArgTypes from "./wonder-blocks-config-provider.argtypes";

import type {I18nConfig} from "@khanacademy/wonder-blocks-config";
import {Card} from "@khanacademy/wonder-blocks-card";

const i18nExamples: Record<string, {label: string; i18n: I18nConfig}> = {
    en: {
        label: "English",
        i18n: {strings: defaultStringsEn, locale: "en"},
    },
    fr: {
        label: "French",
        i18n: {
            strings: {
                ...defaultStringsEn,
                // Only show one string translated to French for demonstration purposes.
                iconAltOpensNewTab: "(ouvre dans un nouvel onglet)",
            },
            locale: "fr",
        },
    },
};

const I18nConfigPreview = ({title}: {title: string}) => {
    const {strings, locale} = useWonderBlocksI18n();

    return (
        <Card styles={{root: styles.preview}}>
            <BodyText weight="bold">{title}</BodyText>
            <BodyText>
                <code>locale</code>: {locale}
            </BodyText>
            <BodyText>
                <code>strings.iconAltOpensNewTab</code>:{" "}
                {strings.iconAltOpensNewTab}
            </BodyText>
        </Card>
    );
};

export default {
    title: "Packages / Config / WonderBlocksConfigProvider",
    component: WonderBlocksConfigProvider,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // The provider has no visuals of its own; these stories only
            // demonstrate which values are provided.
            disableSnapshot: true,
        },
    },
    argTypes: WonderBlocksConfigProviderArgTypes,
    // Hide stories in the sidebar. Only show Docs.
    tags: ["!dev"],
} as Meta<typeof WonderBlocksConfigProvider>;

type StoryComponentType = StoryObj<typeof WonderBlocksConfigProvider>;

/**
 * Wonder Blocks components within the provider use the `strings` and `locale`
 * passed in through the `i18n` prop. Try changing the locale to see the strings
 * the components within the provider would render.
 *
 * Note: This story is only for demonstration purposes. Applications using
 * Wonder Blocks will provide their own i18n config to the provider.
 */
export const Default: StoryComponentType = {
    args: {
        i18n: i18nExamples.en.i18n,
    },
    render: function Render(args) {
        const [, updateArgs] = useArgs();

        const handleLocaleChange = (locale: string) => {
            updateArgs({i18n: i18nExamples[locale].i18n});
        };

        return (
            <View style={styles.container}>
                <LabeledField
                    label="Locale"
                    field={
                        <SingleSelect
                            selectedValue={args.i18n.locale}
                            onChange={handleLocaleChange}
                            placeholder="Choose a locale"
                        >
                            {Object.entries(i18nExamples).map(
                                ([value, {label}]) => (
                                    <OptionItem
                                        key={value}
                                        label={`${label} (${value})`}
                                        value={value}
                                    />
                                ),
                            )}
                        </SingleSelect>
                    }
                />
                <WonderBlocksConfigProvider {...args}>
                    <I18nConfigPreview title="Strings within the provider" />
                </WonderBlocksConfigProvider>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_160,
    },
    preview: {
        gap: sizing.size_080,
    },
});
