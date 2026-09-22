import * as React from "react";
import {render, screen} from "@testing-library/react";

import {WonderBlocksConfigProvider} from "../wonder-blocks-config-provider";
import {
    useWonderBlocksI18n,
    WonderBlocksI18nContext,
} from "../../context/i18n-context";
import {defaultStringsEn} from "../../strings";

import type {I18nConfig} from "../../context/i18n-context";

const stringsEs = {iconAltOpensNewTab: "(se abre en una pestaña nueva)"};
const stringsFr = {iconAltOpensNewTab: "(s'ouvre dans un nouvel onglet)"};

const StringsProbe = () => (
    <div>{useWonderBlocksI18n().strings.iconAltOpensNewTab}</div>
);

const LocaleProbe = () => <div>{useWonderBlocksI18n().locale}</div>;

describe("WonderBlocksConfigProvider", () => {
    describe("i18n", () => {
        it("provides the strings it is given to the components beneath it", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{strings: stringsEs, locale: "es"}}
                >
                    <StringsProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText(stringsEs.iconAltOpensNewTab);

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("provides the locale it is given to the components beneath it", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{strings: stringsEs, locale: "es"}}
                >
                    <LocaleProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const locale = screen.getByText("es");

            // Assert
            expect(locale).toBeInTheDocument();
        });
    });

    describe("nesting", () => {
        it("uses the nested provider's strings over the enclosing provider's", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{strings: stringsFr, locale: "fr"}}
                >
                    <WonderBlocksConfigProvider
                        i18n={{strings: stringsEs, locale: "es"}}
                    >
                        <StringsProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText(stringsEs.iconAltOpensNewTab);

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("uses the nested provider's locale over the enclosing provider's", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{strings: stringsFr, locale: "fr"}}
                >
                    <WonderBlocksConfigProvider
                        i18n={{strings: stringsEs, locale: "es"}}
                    >
                        <LocaleProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const locale = screen.getByText("es");

            // Assert
            expect(locale).toBeInTheDocument();
        });
    });

    describe("context value identity", () => {
        // Guards the memoization behind this provider: without it, a re-render
        // of whatever holds the provider re-renders every Wonder Blocks
        // component below it.
        it("keeps the same context value across a re-render with unchanged props", () => {
            // Arrange
            const values: Array<I18nConfig> = [];
            const i18n = {strings: defaultStringsEn, locale: "en"};
            const ContextProbe = () => {
                values.push(React.useContext(WonderBlocksI18nContext));
                return null;
            };
            const renderTree = () => (
                <WonderBlocksConfigProvider i18n={i18n}>
                    <ContextProbe />
                </WonderBlocksConfigProvider>
            );
            const {rerender} = render(renderTree());

            // Act
            rerender(renderTree());

            // Assert
            expect(values[1]).toBe(values[0]);
        });
    });
});
