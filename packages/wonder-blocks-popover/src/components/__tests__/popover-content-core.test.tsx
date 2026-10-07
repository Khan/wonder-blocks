import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

import PopoverContentCore from "../popover-content-core";

describe("PopoverContentCore", () => {
    describe("closeButtonLabel", () => {
        it("should use the close button label from the config provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{
                        strings: {
                            ...defaultStringsEn,
                            iconAltClosePopover: "translated text",
                        },
                        locale: "es",
                    }}
                >
                    <PopoverContentCore closeButtonVisible={true}>
                        Content
                    </PopoverContentCore>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const closeButton = screen.getByRole("button");

            // Assert
            expect(closeButton).toHaveAccessibleName("translated text");
        });

        it("should prefer the closeButtonLabel prop over the config provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{
                        strings: {
                            ...defaultStringsEn,
                            iconAltClosePopover: "translated text",
                        },
                        locale: "es",
                    }}
                >
                    <PopoverContentCore
                        closeButtonVisible={true}
                        closeButtonLabel="overriding label"
                    >
                        Content
                    </PopoverContentCore>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const closeButton = screen.getByRole("button");

            // Assert
            expect(closeButton).toHaveAccessibleName("overriding label");
        });
    });
});
