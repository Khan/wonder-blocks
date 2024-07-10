import * as React from "react";
import {render, screen} from "@testing-library/react";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {userEvent} from "@testing-library/user-event";
import TextArea from "../text-area";

const defaultOptions = {
    wrapper: RenderStateRoot,
};
describe("TextArea", () => {
    describe("Attributes", () => {
        it("should use the id prop for the textarea", async () => {
            // Arrange
            const testId = "test-id";
            // Act
            render(
                <TextArea id={testId} value="" onChange={() => {}} />,
                defaultOptions,
            );

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("id", testId);
        });

        it("should use an auto-generated id for the textarea when id prop is not set", async () => {
            // Arrange

            // Act
            render(<TextArea value="" onChange={() => {}} />, defaultOptions);

            // Assert
            // Since the generated id is unique, we cannot know what it will be. We
            // only test if the id attribute starts with "uid-", then followed by
            // "text-field-" as the scope assigned to IDProvider.
            const textArea = await screen.findByRole("textbox");
            expect(textArea.getAttribute("id")).toMatch(/uid-text-area-.*$/);
        });

        it("should use the testId prop for the textarea element", async () => {
            // Arrange
            const testId = "test-id";
            render(
                <TextArea value="Text" onChange={() => {}} testId={testId} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("data-testid", testId);
        });

        it("should set the placeholder when the prop when provided", async () => {
            // Arrange
            const placeholder = "Test placeholder";
            render(
                <TextArea
                    placeholder={placeholder}
                    value="Text"
                    onChange={() => {}}
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("placeholder", placeholder);
        });

        it("should set the disabled attribute when the disabled prop is true", async () => {
            // Arrange
            render(
                <TextArea disabled={true} value="Text" onChange={() => {}} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toBeDisabled();
        });

        it("should set the readonly attribute when the readOnly prop is provided", async () => {
            // Arrange
            render(
                <TextArea value="Text" onChange={() => {}} readOnly={true} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("readonly");
        });

        it("should set the autocomplete attribute when the autoComplete prop is provided", async () => {
            // Arrange
            render(
                <TextArea
                    value="Text"
                    onChange={() => {}}
                    autoComplete="name"
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("autocomplete", "name");
        });

        it("should set the name attribute when the name prop is provided", async () => {
            // Arrange
            const name = "Test name";
            render(
                <TextArea value="Text" onChange={() => {}} name={name} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("name", name);
        });

        it("should set the class when the className prop is provided", async () => {
            // Arrange
            const className = "Test class name";
            render(
                <TextArea
                    value="Text"
                    onChange={() => {}}
                    className={className}
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("class", className);
        });
    });

    it("should use the value prop", async () => {
        // Arrange
        const testValue = "test value";
        render(
            <TextArea value={testValue} onChange={() => {}} />,
            defaultOptions,
        );

        // Act

        // Assert
        const textArea = await screen.findByRole("textbox");
        expect(textArea).toHaveValue(testValue);
    });

    describe("Event Handlers", () => {
        it("should call the onChange prop when the textArea value changes", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <TextArea value="" onChange={onChangeMock} />,
                defaultOptions,
            );

            // Act
            // Type one letter
            const letterToType = "X";
            await userEvent.type(
                await screen.findByRole("textbox"),
                letterToType,
            );

            // Assert
            expect(onChangeMock).toHaveBeenCalledOnceWith(letterToType);
        });
    });

    describe("Accessibility", () => {
        describe("Focus", () => {
            it("should focus on the textarea by default when the autoFocus prop is provided", async () => {
                // Arrange
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        autoFocus={true}
                    />,
                    defaultOptions,
                );

                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveFocus();
            });
        });
    });
});
