import * as React from "react";
import {render, screen} from "@testing-library/react";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {userEvent} from "@testing-library/user-event";
import TextArea from "../text-area";

const defaultOptions = {
    wrapper: RenderStateRoot,
};

const wrapOptions: Array<"soft" | "hard" | "off"> = ["soft", "hard", "off"];

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

        it("should set the rows attribute when the rows prop is provided", async () => {
            // Arrange
            const rows = 10;
            render(
                <TextArea value="Text" onChange={() => {}} rows={rows} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("rows", `${rows}`);
        });

        it("should set the spellcheck attribute when spellCheck prop is set to true", async () => {
            // Arrange
            render(
                <TextArea value="Text" onChange={() => {}} spellCheck={true} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("spellcheck", "true");
        });

        it("should set the spellcheck attribute when spellCheck prop is set to false", async () => {
            // Arrange
            render(
                <TextArea
                    value="Text"
                    onChange={() => {}}
                    spellCheck={false}
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("spellcheck", "false");
        });

        it.each(wrapOptions)(
            "should set the wrap attribute when the spellCheck prop is set to '%s' ",
            async (wrap) => {
                // Arrange
                render(
                    <TextArea value="Text" onChange={() => {}} wrap={wrap} />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("wrap", wrap);
            },
        );

        it("should set the minlength attribute when the minLength prop is used", async () => {
            // Arrange
            const minLength = 3;
            render(
                <TextArea
                    value="Text"
                    onChange={() => {}}
                    minLength={minLength}
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("minlength", `${minLength}`);
        });

        it("should set the maxlength attribute when the maxLength prop is used", async () => {
            // Arrange
            const maxLength = 3;
            render(
                <TextArea
                    value="Text"
                    onChange={() => {}}
                    maxLength={maxLength}
                />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("maxlength", `${maxLength}`);
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
        it("should call the onChange prop when the textarea value changes", async () => {
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

        it("should call the onClick prop when the textarea is clicked", async () => {
            // Arrange
            const onClickMock = jest.fn();
            render(
                <TextArea value="" onChange={() => {}} onClick={onClickMock} />,
                defaultOptions,
            );

            // Act
            await userEvent.click(await screen.findByRole("textbox"));

            // Assert
            expect(onClickMock).toHaveBeenCalledOnce();
        });

        it("should call the onKeyDown prop when a key is typed in the textarea", async () => {
            // Arrange
            const handleOnKeyDown = jest.fn(
                (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    return event.key;
                },
            );

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onKeyDown={handleOnKeyDown}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "{enter}");

            // Assert
            expect(handleOnKeyDown).toHaveReturnedWith("Enter");
        });

        it("should call the onKeyUp prop when a key is typed in the textarea", async () => {
            // Arrange
            const handleOnKeyUp = jest.fn(
                (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    return event.key;
                },
            );

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onKeyUp={handleOnKeyUp}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "{enter}");

            // Assert
            expect(handleOnKeyUp).toHaveReturnedWith("Enter");
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

        describe("ARIA", () => {
            it("should set the aria-label attribute when provided", async () => {
                // Arrange
                const ariaLabel = "Test Aria Label";
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-label={ariaLabel}
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-label", ariaLabel);
            });

            it("should set the aria-labelledby attribute when provided", async () => {
                // Arrange
                const ariaLabelledBy = "test-label-id";
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-labelledby={ariaLabelledBy}
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute(
                    "aria-labelledby",
                    ariaLabelledBy,
                );
            });

            it("should set the aria-describedby attribute when provided", async () => {
                // Arrange
                const ariaDescribedBy = "test-label-id";
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-describedby={ariaDescribedBy}
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute(
                    "aria-describedby",
                    ariaDescribedBy,
                );
            });

            it("should set the aria-invalid attribute when provided", async () => {
                // Arrange
                const ariaInvalid = true;
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-invalid={ariaInvalid}
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute(
                    "aria-invalid",
                    `${ariaInvalid}`,
                );
            });

            it("should set the aria-details attribute when provided", async () => {
                // Arrange
                const ariaDetails = "details-id";
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-details={ariaDetails}
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute(
                    "aria-details",
                    `${ariaDetails}`,
                );
            });
        });
    });
});
