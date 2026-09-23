import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {
    useWonderBlocksI18n,
    WonderBlocksConfigProvider,
} from "@khanacademy/wonder-blocks-config";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import packageConfig from "../../packages/wonder-blocks-config/package.json";

import ComponentInfo from "../components/component-info";
import WonderBlocksConfigProviderArgTypes from "./wonder-blocks-config-provider.argtypes";

import type {I18nConfig} from "@khanacademy/wonder-blocks-config";

const i18nEs: I18nConfig = {
    strings: {iconAltOpensNewTab: "(se abre en una pestaña nueva)"},
    locale: "es",
};

const i18nFr: I18nConfig = {
    strings: {iconAltOpensNewTab: "(s'ouvre dans un nouvel onglet)"},
    locale: "fr",
};

/**
 * Renders the i18n config that Wonder Blocks components beneath a
 * `WonderBlocksConfigProvider` read, so the stories can show which values are
 * in effect.
 */
const I18nConfigPreview = ({title}: {title: string}) => {
    const {strings, locale} = useWonderBlocksI18n();

    return (
        <View style={styles.preview}>
            <BodyText weight="bold">{title}</BodyText>
            <BodyText>
                <code>locale</code>: {locale}
            </BodyText>
            <BodyText>
                <code>strings.iconAltOpensNewTab</code>:{" "}
                {strings.iconAltOpensNewTab}
            </BodyText>
        </View>
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
        docs: {
            description: {
                component: `\`WonderBlocksConfigProvider\` configures the Wonder Blocks components rendered beneath it. Render it once near the root of your app.

Right now it provides i18n: the translated strings that Wonder Blocks components render (for example, the accessible name of the icon on a link that opens in a new tab) and the locale they are translated into. Components rendered outside of a provider fall back to the default English strings.

\`\`\`tsx
import {WonderBlocksConfigProvider} from "@khanacademy/wonder-blocks-config";

<WonderBlocksConfigProvider i18n={{strings: translatedStrings, locale}}>
    <App />
</WonderBlocksConfigProvider>
\`\`\``,
            },
        },
        chromatic: {
            // The provider has no visuals of its own; these stories only
            // demonstrate which values are provided.
            disableSnapshot: true,
        },
    },
    argTypes: WonderBlocksConfigProviderArgTypes,
} as Meta<typeof WonderBlocksConfigProvider>;

type StoryComponentType = StoryObj<typeof WonderBlocksConfigProvider>;

/**
 * Wonder Blocks components beneath the provider use the `strings` and `locale`
 * passed in through the `i18n` prop. Try changing them using the controls.
 */
export const Default: StoryComponentType = {
    args: {
        i18n: i18nEs,
    },
    render: function Render(args) {
        return (
            <WonderBlocksConfigProvider {...args}>
                <I18nConfigPreview title="Beneath the provider" />
            </WonderBlocksConfigProvider>
        );
    },
};

/**
 * When there is no `WonderBlocksConfigProvider` above them, Wonder Blocks
 * components use the default English strings and the `en` locale.
 */
export const WithoutProvider: StoryComponentType = {
    render: function Render() {
        return <I18nConfigPreview title="Without a provider" />;
    },
};

/**
 * Providers can be nested. Components use the config from the closest provider
 * above them, so a nested provider overrides the enclosing one for everything
 * beneath it.
 */
export const Nested: StoryComponentType = {
    render: function Render() {
        return (
            <WonderBlocksConfigProvider i18n={i18nEs}>
                <View style={styles.container}>
                    <I18nConfigPreview title="Outer provider" />
                    <WonderBlocksConfigProvider i18n={i18nFr}>
                        <I18nConfigPreview title="Inner provider" />
                    </WonderBlocksConfigProvider>
                </View>
            </WonderBlocksConfigProvider>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_160,
    },
    preview: {
        gap: sizing.size_080,
        padding: sizing.size_160,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_080,
    },
});
