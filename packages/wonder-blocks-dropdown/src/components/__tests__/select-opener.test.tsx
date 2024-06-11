import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import SelectOpener from "../select-opener";

describe("SelectOpener", () => {
    describe("onClick", () => {
        const children = "text";
        it("should trigger using the mouse", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={false}
                    error={false}
                    isPlaceholder={false}
                    light={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            await userEvent.click(await screen.findByRole("button"));

            // Assert
            expect(onOpenMock).toHaveBeenCalledTimes(1);
        });

        it("should trigger by pressing {Space}", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={false}
                    error={false}
                    isPlaceholder={false}
                    light={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("button");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: " ",
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                key: " ",
            });

            // Assert
            expect(onOpenMock).toHaveBeenCalledTimes(1);
        });

        it("should trigger by pressing {Enter}", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={false}
                    error={false}
                    isPlaceholder={false}
                    light={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("button");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: "Enter",
            });
            // NOTE: We need to trigger multiple events to simulate the browser
            // behavior of pressing Enter on a button. By default, browsers will
            // trigger a click event on keyDown, but we need to trigger it on
            // keyUp.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: "Enter",
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                key: "Enter",
            });

            // Assert
            expect(onOpenMock).toHaveBeenCalledTimes(1);
        });
    });
});
