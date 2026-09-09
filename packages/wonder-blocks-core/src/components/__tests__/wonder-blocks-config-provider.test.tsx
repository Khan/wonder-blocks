import * as React from "react";
import {render, screen} from "@testing-library/react";

import {WonderBlocksConfigProvider} from "../wonder-blocks-config-provider";
import {ConfigContext} from "../config-context";
import {useWbLocale} from "../../hooks/use-wb-locale";
import {useWbStrings} from "../../hooks/use-wb-strings";
import {defaultStrings} from "../../strings";

import type {WonderBlocksConfig} from "../config-context";

const StringsProbe = () => <div>{useWbStrings().linkExternalIcon}</div>;

const LocaleProbe = () => <div>{useWbLocale()}</div>;

describe("WonderBlocksConfigProvider", () => {
    describe("useWbStrings", () => {
        test("returns the strings supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={{
                        ...defaultStrings,
                        linkExternalIcon: "Se abre en una ventana nueva",
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

        test("returns English when no provider is mounted", () => {
            // Arrange
            render(<StringsProbe />);

            // Act
            const label = screen.getByText(defaultStrings.linkExternalIcon);

            // Assert
            expect(label).toBeInTheDocument();
        });

        test("returns the strings from the nearest provider when nested", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={{
                        ...defaultStrings,
                        linkExternalIcon: "Outer",
                    }}
                    locale="en"
                >
                    <WonderBlocksConfigProvider
                        strings={{...defaultStrings, linkExternalIcon: "Inner"}}
                        locale="en"
                    >
                        <StringsProbe />
                    </WonderBlocksConfigProvider>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const label = screen.getByText("Inner");

            // Assert
            expect(label).toBeInTheDocument();
        });
    });

    describe("useWbLocale", () => {
        test("returns the locale supplied by the provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    strings={defaultStrings}
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
            const configs: Array<WonderBlocksConfig> = [];
            const ConfigProbe = () => {
                configs.push(React.useContext(ConfigContext));
                return null;
            };
            const renderTree = () => (
                <WonderBlocksConfigProvider
                    strings={defaultStrings}
                    locale="en"
                >
                    <ConfigProbe />
                </WonderBlocksConfigProvider>
            );
            const {rerender} = render(renderTree());

            // Act
            rerender(renderTree());

            // Assert
            expect(configs[1]).toBe(configs[0]);
        });
    });
});
