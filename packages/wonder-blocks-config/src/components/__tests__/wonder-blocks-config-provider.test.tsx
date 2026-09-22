import * as React from "react";
import {render, screen} from "@testing-library/react";

import {WonderBlocksConfigProvider} from "../wonder-blocks-config-provider";
import {
    useWonderBlocksI18n,
    WonderBlocksI18nContext,
} from "../../context/i18n-context";
import {defaultStringsEn} from "../../strings";

import type {I18nContextType} from "../../context/i18n-context";

const StringsProbe = () => (
    <div>{useWonderBlocksI18n().strings.iconAltOpensNewTab}</div>
);

const LocaleProbe = () => <div>{useWonderBlocksI18n().locale}</div>;

describe("WonderBlocksConfigProvider", () => {
    describe("strings", () => {
        it("provides the strings it is given to the components beneath it", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={{
                        iconAltOpensNewTab: "Se abre en una ventana nueva",
                    }}
                    locale="es"
                >
                    <StringsProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText("Se abre en una ventana nueva");

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("falls back to the default English strings when strings are not given", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider>
                    <StringsProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText(defaultStringsEn.iconAltOpensNewTab);

            // Assert
            expect(label).toBeInTheDocument();
        });
    });

    describe("locale", () => {
        it("provides the locale it is given to the components beneath it", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={defaultStringsEn}
                    locale="pt-PT"
                >
                    <LocaleProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const locale = screen.getByText("pt-PT");

            // Assert
            expect(locale).toBeInTheDocument();
        });

        it("falls back to `en` when a locale is not given", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider>
                    <LocaleProbe />
                </WonderBlocksConfigProvider>,
            );

            // Act
            const locale = screen.getByText("en");

            // Assert
            expect(locale).toBeInTheDocument();
        });
    });

    describe("nesting", () => {
        it("keeps the enclosing provider's strings when the nested one omits them", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={{iconAltOpensNewTab: "Outer strings"}}
                    locale="en"
                >
                    <WonderBlocksConfigProvider locale="es">
                        <StringsProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText("Outer strings");

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("keeps the enclosing provider's locale when the nested one omits it", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={defaultStringsEn}
                    locale="pt-PT"
                >
                    <WonderBlocksConfigProvider
                        strings={{iconAltOpensNewTab: "Inner strings"}}
                    >
                        <LocaleProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const locale = screen.getByText("pt-PT");

            // Assert
            expect(locale).toBeInTheDocument();
        });

        it("overrides the enclosing provider's strings when the nested one sets them", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={{iconAltOpensNewTab: "Outer strings"}}
                    locale="en"
                >
                    <WonderBlocksConfigProvider
                        strings={{iconAltOpensNewTab: "Inner strings"}}
                    >
                        <StringsProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText("Inner strings");

            // Assert
            expect(label).toBeInTheDocument();
        });
    });

    describe("context value identity", () => {
        // Guards the memoization behind this provider: without it, a re-render
        // of whatever holds the provider re-renders every Wonder Blocks
        // component below it.
        it("keeps the same context value across a re-render with unchanged props", () => {
            // Arrange
            const values: Array<I18nContextType> = [];
            const ContextProbe = () => {
                values.push(React.useContext(WonderBlocksI18nContext));
                return null;
            };
            const renderTree = () => (
                <WonderBlocksConfigProvider
                    strings={defaultStringsEn}
                    locale="en"
                >
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
