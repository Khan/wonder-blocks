import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {keys} from "@khanacademy/wonder-blocks-core";

import SelectOpener from "../select-opener";

describe("SelectOpener", () => {
    const children = "text";
    describe("onOpenChanged", () => {
        it("should trigger using the mouse", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={false}
                    error={false}
                    isPlaceholder={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            await userEvent.click(await screen.findByRole("combobox"));

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
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("combobox");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: keys.space,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                key: keys.space,
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
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("combobox");
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

        it("should not trigger using the mouse if it is disabled", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={true}
                    error={false}
                    isPlaceholder={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            await userEvent.click(await screen.findByRole("combobox"));

            // Assert
            expect(onOpenMock).toHaveBeenCalledTimes(0);
        });

        it("should not trigger by pressing {Space} if it is disabled", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={true}
                    error={false}
                    isPlaceholder={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("combobox");
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
            expect(onOpenMock).toHaveBeenCalledTimes(0);
        });

        it("should not trigger by pressing {Enter} if it is disabled", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <SelectOpener
                    onOpenChanged={onOpenMock}
                    disabled={true}
                    error={false}
                    isPlaceholder={false}
                    open={false}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("combobox");
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
            expect(onOpenMock).toHaveBeenCalledTimes(0);
        });
    });

    describe("error prop", () => {
        it.each([
            {ariaInvalid: "true", error: true},
            {ariaInvalid: "false", error: false},
            {ariaInvalid: "false", error: undefined},
        ])(
            "should set aria-invalid to $ariaInvalid if error is $error",
            ({ariaInvalid, error}) => {
                // Arrange
                // Act
                render(
                    <SelectOpener
                        error={error}
                        onOpenChanged={jest.fn()}
                        open={false}
                    >
                        {children}
                    </SelectOpener>,
                );
                // Assert
                expect(screen.getByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    ariaInvalid,
                );
            },
        );
    });

    it("should call onBlur when it is blurred", async () => {
        // Arrange
        const onBlur = jest.fn();
        render(
            <SelectOpener
                onBlur={onBlur}
                open={false}
                onOpenChanged={jest.fn()}
            >
                {children}
            </SelectOpener>,
        );
        await userEvent.tab(); // focus on the opener
        // Act
        await userEvent.tab(); // blur the opener

        // Assert
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    describe("readOnly prop", () => {
        it("should set aria-disabled to true if readOnly is true", () => {
            // Arrange
            // Act
            render(
                <SelectOpener
                    readOnly={true}
                    open={false}
                    onOpenChanged={jest.fn()}
                >
                    {children}
                </SelectOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-disabled",
                "true",
            );
        });

        it("should not set aria-disabled if readOnly is false", () => {
            // Arrange
            // Act
            render(
                <SelectOpener
                    readOnly={false}
                    open={false}
                    onOpenChanged={jest.fn()}
                >
                    {children}
                </SelectOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).not.toHaveAttribute(
                "aria-disabled",
            );
        });

        it("should not set aria-disabled if readOnly is not provided", () => {
            // Arrange
            // Act
            render(
                <SelectOpener open={false} onOpenChanged={jest.fn()}>
                    {children}
                </SelectOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).not.toHaveAttribute(
                "aria-disabled",
            );
        });

        it("should not call onOpenChanged if readOnly is true and the opener is clicked", async () => {
            // Arrange
            const onOpenChanged = jest.fn();
            render(
                <SelectOpener
                    readOnly={true}
                    open={false}
                    onOpenChanged={onOpenChanged}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            await userEvent.click(screen.getByRole("combobox"));

            // Assert
            expect(onOpenChanged).not.toHaveBeenCalled();
        });

        it("should not call onOpenChanged if readOnly is true and the opener is pressed using the enter key", async () => {
            // Arrange
            const onOpenChanged = jest.fn();
            render(
                <SelectOpener
                    readOnly={true}
                    open={false}
                    onOpenChanged={onOpenChanged}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            await userEvent.keyboard("{Tab}");
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(onOpenChanged).not.toHaveBeenCalled();
        });

        it("should not call onOpenChanged if readOnly is true and the opener is pressed using the space key", async () => {
            // Arrange
            const onOpenChanged = jest.fn();
            render(
                <SelectOpener
                    readOnly={true}
                    open={false}
                    onOpenChanged={onOpenChanged}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            await userEvent.tab();
            await userEvent.keyboard(" ");

            // Assert
            expect(onOpenChanged).not.toHaveBeenCalled();
        });

        it("should be focusable if readOnly is true", async () => {
            // Arrange
            render(
                <SelectOpener
                    readOnly={true}
                    open={false}
                    onOpenChanged={jest.fn()}
                >
                    {children}
                </SelectOpener>,
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(screen.getByRole("combobox")).toHaveFocus();
        });
    });
});
