import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

import CloseButton from "../close-button";
import PopoverContext from "../popover-context";

describe("CloseButton", () => {
    it("should use the default aria-label", async () => {
        // Arrange

        // Act
        render(<CloseButton />);

        // Assert
        expect(
            await screen.findByRole("button", {name: "Close Popover"}),
        ).toBeInTheDocument();
    });

    it("should use the default aria-label when aria-label is an empty string", async () => {
        // Arrange

        // Act
        render(<CloseButton aria-label="" />);

        // Assert
        expect(
            await screen.findByRole("button", {name: "Close Popover"}),
        ).toBeInTheDocument();
    });

    it("should use a custom aria-label", async () => {
        // Arrange

        // Act
        render(<CloseButton aria-label="Dismiss" />);

        // Assert
        expect(
            await screen.findByRole("button", {name: "Dismiss"}),
        ).toBeInTheDocument();
    });

    it("should use the aria-label from the config provider", async () => {
        // Arrange

        // Act
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
                <CloseButton />
            </WonderBlocksConfigProvider>,
        );

        // Assert
        expect(
            await screen.findByRole("button", {name: "translated text"}),
        ).toBeInTheDocument();
    });

    it("should prefer the aria-label prop over the config provider", async () => {
        // Arrange

        // Act
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
                <CloseButton aria-label="overriding label" />
            </WonderBlocksConfigProvider>,
        );

        // Assert
        expect(
            await screen.findByRole("button", {name: "overriding label"}),
        ).toBeInTheDocument();
    });

    it("should set the testId on the button", async () => {
        // Arrange

        // Act
        render(<CloseButton testId="close-button-test-id" />);

        // Assert
        expect(await screen.findByRole("button")).toHaveAttribute(
            "data-testid",
            "close-button-test-id",
        );
    });

    it("should call close from the popover context when clicked", async () => {
        // Arrange
        const closeMock = jest.fn();
        render(
            <PopoverContext.Provider value={{close: closeMock}}>
                <CloseButton />
            </PopoverContext.Provider>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});
