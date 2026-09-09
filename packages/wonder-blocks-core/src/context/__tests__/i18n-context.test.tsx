import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    useWonderBlocksI18n,
    WonderBlocksI18nContext,
    WonderBlocksI18nContextProvider,
} from "../i18n-context";
import {defaultStrings} from "../../strings";

import type {I18nContextType} from "../i18n-context";

const StringsProbe = () => (
    <div>{useWonderBlocksI18n().strings.iconExternalLink}</div>
);

const LocaleProbe = () => <div>{useWonderBlocksI18n().locale}</div>;

describe("WonderBlocksI18nContextProvider", () => {
    describe("strings", () => {
        test("returns the strings supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={{iconExternalLink: "Se abre en una ventana nueva"}}
                    locale="es"
                >
                    <StringsProbe />
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const label = screen.getByText("Se abre en una ventana nueva");

            // Assert
            expect(label).toBeInTheDocument();
        });

        test("returns English when no provider is mounted", () => {
            // Arrange
            render(<StringsProbe />);

            // Act
            const label = screen.getByText(defaultStrings.iconExternalLink);

            // Assert
            expect(label).toBeInTheDocument();
        });

        test("returns the strings from the nearest provider when nested", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={{iconExternalLink: "Outer"}}
                    locale="en"
                >
                    <WonderBlocksI18nContextProvider
                        strings={{iconExternalLink: "Inner"}}
                        locale="en"
                    >
                        <StringsProbe />
                    </WonderBlocksI18nContextProvider>
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const label = screen.getByText("Inner");

            // Assert
            expect(label).toBeInTheDocument();
        });
    });

    describe("locale", () => {
        test("returns the locale supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksI18nContextProvider
                    strings={defaultStrings}
                    locale="pt-PT"
                >
                    <LocaleProbe />
                </WonderBlocksI18nContextProvider>,
            );

            // Act
            const locale = screen.getByText("pt-PT");

            // Assert
            expect(locale).toBeInTheDocument();
        });

        test("returns `en` when no provider is mounted", () => {
            // Arrange
            render(<LocaleProbe />);

            // Act
            const locale = screen.getByText("en");

            // Assert
            expect(locale).toBeInTheDocument();
        });
    });

    describe("context value identity", () => {
        // The context value is memoized so that a re-render of whatever holds
        // the provider does not re-render every Wonder Blocks component below
        // it. Consumers still need to keep the `strings` object itself stable,
        // since a generated binding returns a new object per call.
        test("keeps the same context value across a re-render with unchanged props", () => {
            // Arrange
            const values: Array<I18nContextType> = [];
            const ContextProbe = () => {
                values.push(React.useContext(WonderBlocksI18nContext));
                return null;
            };
            const renderTree = () => (
                <WonderBlocksI18nContextProvider
                    strings={defaultStrings}
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
