import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    useWonderBlocksI18n,
    WonderBlocksI18nContext,
    WonderBlocksI18nContextProvider,
} from "../i18n-context";
import {defaultStringsEn} from "../../strings";

import type {I18nConfig} from "../i18n-context";

const stringsEs = {
    ...defaultStringsEn,
    iconAltOpensNewTab: "(se abre en una pestaña nueva)",
};

const StringsProbe = () => (
    <div>{useWonderBlocksI18n().strings.iconAltOpensNewTab}</div>
);

const LocaleProbe = () => <div>{useWonderBlocksI18n().locale}</div>;

describe("WonderBlocksI18nContextProvider", () => {
    describe("strings", () => {
        it("returns the strings supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={stringsEs}
                    locale="es"
                >
                    <StringsProbe />
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const label = screen.getByText(stringsEs.iconAltOpensNewTab);

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("returns English when no provider is mounted", () => {
            // Arrange
            render(<StringsProbe />);

            // Act
            const label = screen.getByText(defaultStringsEn.iconAltOpensNewTab);

            // Assert
            expect(label).toBeInTheDocument();
        });

        it("returns the strings from the nearest provider when nested", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={{
                        ...defaultStringsEn,
                        iconAltOpensNewTab: "Outer text",
                    }}
                    locale="en"
                >
                    <WonderBlocksI18nContextProvider
                        strings={{
                            ...defaultStringsEn,
                            iconAltOpensNewTab: "Inner text",
                        }}
                        locale="es"
                    >
                        <StringsProbe />
                    </WonderBlocksI18nContextProvider>
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const label = screen.getByText("Inner text");

            // Assert
            expect(label).toBeInTheDocument();
        });
    });

    describe("locale", () => {
        it("returns the locale supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={stringsEs}
                    locale="es"
                >
                    <LocaleProbe />
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const locale = screen.getByText("es");

            // Assert
            expect(locale).toBeInTheDocument();
        });

        it("returns `en` when no provider is mounted", () => {
            // Arrange
            render(<LocaleProbe />);

            // Act
            const locale = screen.getByText("en");

            // Assert
            expect(locale).toBeInTheDocument();
        });
    });

    describe("context value identity", () => {
        // Guards the memoization: without it, a re-render of whatever holds the
        // provider re-renders every Wonder Blocks component below it.
        it("keeps the same context value across a re-render with unchanged props", () => {
            // Arrange
            const values: Array<I18nConfig> = [];
            const ContextProbe = () => {
                values.push(React.useContext(WonderBlocksI18nContext));
                return null;
            };
            const renderTree = () => (
                <WonderBlocksI18nContextProvider
                    strings={defaultStringsEn}
                    locale="en"
                >
                    <ContextProbe />
                </WonderBlocksI18nContextProvider>
            );
            const {rerender} = render(renderTree());

            // Act
            rerender(renderTree());

            // Assert
            expect(values[1]).toBe(values[0]);
        });
    });
});
