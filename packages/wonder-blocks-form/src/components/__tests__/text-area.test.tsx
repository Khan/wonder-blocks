/* eslint-disable max-lines */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import {PropsFor, RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {userEvent} from "@testing-library/user-event";
import TextArea from "../text-area";

const defaultOptions = {
    wrapper: RenderStateRoot,
};

const wrapOptions: Array<"soft" | "hard" | "off"> = ["soft", "hard", "off"];

const ControlledTextArea = (props: Partial<PropsFor<typeof TextArea>>) => {
    const [value, setValue] = React.useState(props.value || "");
    return <TextArea {...props} value={value} onChange={setValue} />;
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

        it("should set the aria-disabled attribute when the disabled prop is true", async () => {
            // Arrange
            render(
                <TextArea disabled={true} value="Text" onChange={() => {}} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("aria-disabled", "true");
        });

        it("should set the aria-disabled attribute when the disabled prop is false", async () => {
            // Arrange
            render(
                <TextArea disabled={false} value="Text" onChange={() => {}} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("aria-disabled", "false");
        });

        it("should not set the aria-disabled attribute if the disabled prop is not provided", async () => {
            // Arrange
            render(
                <TextArea value="Text" onChange={() => {}} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).not.toHaveAttribute("aria-disabled");
        });

        it("should not set the disabled attribute when the disabled prop is true", async () => {
            // Arrange
            render(
                <TextArea disabled={true} value="Text" onChange={() => {}} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).not.toHaveAttribute("disabled");
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

        it("should set the readonly attribute if the disabled prop is true", async () => {
            // Arrange
            render(
                <TextArea value="Text" onChange={() => {}} disabled={true} />,
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
                <TextArea value="Text" onChange={() => {}} autoComplete="on" />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("autocomplete", "on");
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
            expect(textArea).toHaveClass(className);
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

        it("should set the required attribute when the required prop is used", async () => {
            // Arrange
            render(
                <TextArea value="Text" onChange={() => {}} required={true} />,
                defaultOptions,
            );

            // Act

            // Assert
            const textArea = await screen.findByRole("textbox");
            expect(textArea).toHaveAttribute("required");
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

    it("should forward the ref to the textarea element", async () => {
        // Arrange
        const ref = React.createRef<HTMLTextAreaElement>();
        render(
            <TextArea value="Text" onChange={() => {}} ref={ref} />,
            defaultOptions,
        );

        // Act

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        expect(await screen.findByRole("textbox")).toBe(ref.current);
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
            expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(letterToType);
        });

        it("should not call the onChange prop when the textarea value changes and it is disabled", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <TextArea value="" onChange={onChangeMock} disabled={true} />,
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
            expect(onChangeMock).not.toHaveBeenCalled();
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

        it("should not call the onClick prop when the textarea is clicked and it is disabled", async () => {
            // Arrange
            const onClickMock = jest.fn();
            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onClick={onClickMock}
                    disabled={true}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.click(await screen.findByRole("textbox"));

            // Assert
            expect(onClickMock).not.toHaveBeenCalled();
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

        it("should not call the onKeyDown prop when a key is typed in the textarea and it is disabled", async () => {
            // Arrange
            const handleOnKeyDown = jest.fn();

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onKeyDown={handleOnKeyDown}
                    disabled={true}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "{enter}");

            // Assert
            expect(handleOnKeyDown).not.toHaveBeenCalled();
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

        it("should not call the onKeyUp prop when a key is typed in the textarea and it is disabled", async () => {
            // Arrange
            const handleOnKeyUp = jest.fn();

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onKeyUp={handleOnKeyUp}
                    disabled={true}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "{enter}");

            // Assert
            expect(handleOnKeyUp).not.toHaveBeenCalled();
        });

        it("should call the onFocus prop when the textarea is focused", async () => {
            // Arrange
            const handleOnFocus = jest.fn();

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onFocus={handleOnFocus}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(handleOnFocus).toHaveBeenCalledOnce();
        });

        it("should continue to call the onFocus prop when the textarea is focused and it is disabled", async () => {
            // Arrange
            const handleOnFocus = jest.fn();

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onFocus={handleOnFocus}
                    disabled={true}
                />,
                defaultOptions,
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(handleOnFocus).toHaveBeenCalledOnce();
        });

        it("should call the onBlur prop when the textarea is blurred", async () => {
            // Arrange
            const handleOnBlur = jest.fn();

            render(
                <TextArea value="" onChange={() => {}} onBlur={handleOnBlur} />,
                defaultOptions,
            );
            // Tab to focus on textarea
            await userEvent.tab();

            // Act
            // Tab to move focus away
            await userEvent.tab();

            // Assert
            expect(handleOnBlur).toHaveBeenCalledOnce();
        });

        it("should continue to call the onBlur prop when the textarea is blurred and it is disabled", async () => {
            // Arrange
            const handleOnBlur = jest.fn();

            render(
                <TextArea
                    value=""
                    onChange={() => {}}
                    onBlur={handleOnBlur}
                    disabled={true}
                />,
                defaultOptions,
            );
            // Tab to focus on textarea
            await userEvent.tab();

            // Act
            // Tab to move focus away
            await userEvent.tab();

            // Assert
            expect(handleOnBlur).toHaveBeenCalledOnce();
        });
    });

    describe("Accessibility", () => {
        describe("Axe", () => {
            test("has no accessibility violations", async () => {
                // Arrange
                // Use with label to demonstrate how it should be used with the
                // TextArea component
                const {container} = render(
                    <>
                        <label htmlFor="text-area">Test label</label>
                        <TextArea
                            value="Text"
                            onChange={() => {}}
                            id="text-area"
                        />
                    </>,
                    defaultOptions,
                );
                // Act

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
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

            it("should be focusable", async () => {
                // Arrange
                render(
                    <TextArea value="Text" onChange={() => {}} />,
                    defaultOptions,
                );

                // Act
                await userEvent.tab();

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveFocus();
            });

            it("should be focusable if it is disabled", async () => {
                // Arrange
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        disabled={true}
                    />,
                    defaultOptions,
                );

                // Act
                await userEvent.tab();

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

            it("should set the aria-details attribute when provided", async () => {
                // Arrange
                const ariaDetails = "details-id";

                // Act
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        aria-details={ariaDetails}
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute(
                    "aria-details",
                    `${ariaDetails}`,
                );
            });

            it("should set aria-invalid to true if the validate prop returns an error message", async () => {
                // Arrange
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        // If the validate function returns a string or true,
                        // then the text area is in an error state. For this
                        // test, we always return a string upon validation
                        // to trigger the error state. Since the textarea is
                        // being mounted with a non-empty value, it is validated
                        // on initial render. Because the text area is in
                        // an error state, it will have aria-invalid=true
                        validate={() => "Error"}
                    />,
                    defaultOptions,
                );

                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "true");
            });
            it("should set aria-invalid to true if the validate prop returns an error message", async () => {
                // Arrange
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={() => null}
                    />,
                    defaultOptions,
                );

                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should set aria-invalid to true if the error prop is true", async () => {
                // Arrange
                render(
                    <TextArea value="text" onChange={() => {}} error={true} />,
                    defaultOptions,
                );

                // Act

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "true");
            });

            it("should set aria-invalid to false if the error prop is false", async () => {
                // Arrange
                // Act
                render(
                    <TextArea value="text" onChange={() => {}} error={false} />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should set aria-invalid to false if the error prop is not provided", async () => {
                // Arrange
                // Act
                render(
                    <TextArea value="text" onChange={() => {}} />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            describe("aria-required", () => {
                it.each([
                    {
                        required: true,
                        ariaRequired: "true",
                    },
                    {
                        required: false,
                        ariaRequired: "false",
                    },
                    {
                        required: undefined,
                        ariaRequired: "false",
                    },
                    {
                        required: "Custom required message",
                        ariaRequired: "true",
                    },
                ])(
                    "should set the aria-required attribute to $ariaRequired if required prop is $required",
                    ({required, ariaRequired}) => {
                        // Arrange
                        // Act
                        render(
                            <TextArea
                                value=""
                                onChange={() => {}}
                                required={required}
                            />,
                        );

                        // Assert
                        expect(screen.getByRole("textbox")).toHaveAttribute(
                            "aria-required",
                            ariaRequired,
                        );
                    },
                );
            });
        });
    });

    describe("Validation", () => {
        describe("validate prop", () => {
            it("should be in an error state if the initial value is not empty and not valid", async () => {
                // Arrange
                // Act
                render(
                    <TextArea
                        value="tooShort"
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "true");
            });

            it("should not be in an error state if the initial value is empty and not valid", async () => {
                // Arrange
                // Act
                render(
                    <TextArea
                        value=""
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should not be in an error state if the initial value is valid", async () => {
                // Arrange
                // Act
                render(
                    <TextArea
                        value="LongerThan10"
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should be able to change from a valid state to an error state", async () => {
                // Arrange
                const Controlled = () => {
                    const [value, setValue] = React.useState("text");
                    return (
                        <TextArea
                            value={value}
                            onChange={setValue}
                            validate={(value) => {
                                if (value.length > 4) {
                                    return "Error";
                                }
                            }}
                        />
                    );
                };
                render(<Controlled />, defaultOptions);

                // Act
                // Add a character to make it longer than the validation limit
                await userEvent.type(await screen.findByRole("textbox"), "s");

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "true");
            });

            it("should be able to change from an error state to a valid state", async () => {
                // Arrange
                const Controlled = () => {
                    const [value, setValue] = React.useState("texts");
                    return (
                        <TextArea
                            value={value}
                            onChange={setValue}
                            validate={(value) => {
                                if (value.length > 4) {
                                    return "Error";
                                }
                            }}
                        />
                    );
                };
                render(<Controlled />, defaultOptions);

                // Act
                // Remove a character to make it within the validation limit
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should call the validate function twice when it is first rendered (once on initialization, once after mount)", async () => {
                // Arrange
                const validate = jest.fn();

                // Act
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={validate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(validate.mock.calls).toStrictEqual([["text"], ["text"]]);
            });

            it("should call the onValidate function only once when it is first rendered (once after mount)", async () => {
                // Arrange
                const onValidate = jest.fn();
                const errorMessage = "Error message";

                // Act
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={() => errorMessage}
                        onValidate={onValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    errorMessage,
                );
            });

            it("should not call the validate function when it is first rendered if it is disabled and value is not empty", async () => {
                // Arrange
                const validate = jest.fn();

                // Act
                render(
                    <TextArea
                        value="text"
                        disabled={true}
                        onChange={() => {}}
                        validate={validate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should not call the validate function when it is first rendered if the value is empty", async () => {
                // Arrange
                const validate = jest.fn();

                // Act
                render(
                    <TextArea
                        value=""
                        onChange={() => {}}
                        validate={validate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should call the validate function when the value is updated", async () => {
                // Arrange
                const validate = jest.fn();
                const Controlled = () => {
                    const [value, setValue] = React.useState("text");
                    return (
                        <TextArea
                            value={value}
                            onChange={setValue}
                            validate={validate}
                        />
                    );
                };
                render(<Controlled />, defaultOptions);
                // Reset mock after initial render
                validate.mockReset();

                // Act
                // Update value
                await userEvent.type(await screen.findByRole("textbox"), "s");

                // Assert
                expect(validate).toHaveBeenCalledExactlyOnceWith("texts");
            });

            it("should call the validate function when the value is updated to an empty string", async () => {
                // Arrange
                const validate = jest.fn();
                const Controlled = () => {
                    const [value, setValue] = React.useState("t");
                    return (
                        <TextArea
                            value={value}
                            onChange={setValue}
                            validate={validate}
                        />
                    );
                };
                render(<Controlled />, defaultOptions);
                // Reset mock after initial render
                validate.mockReset();

                // Act
                // Erase value
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                expect(validate).toHaveBeenCalledExactlyOnceWith("");
            });
        });
        describe("onValidate prop", () => {
            it("should call the onValidate prop with the error message when the textarea is validated", () => {
                // Arrange
                const handleValidate = jest.fn();
                const errorMsg = "error message";

                // Act
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={() => errorMsg}
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                    errorMsg,
                );
            });

            it("should call the onValidate prop with null if the validate prop returns null", () => {
                // Arrange
                const handleValidate = jest.fn();

                // Act
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={() => null}
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should call the onValidate prop with null if the validate prop is a void function", () => {
                // Arrange
                const handleValidate = jest.fn();

                // Act
                render(
                    <TextArea
                        value="text"
                        onChange={() => {}}
                        validate={() => {}}
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(null);
            });
        });

        describe("required prop", () => {
            it("should initially render with no error if it is required and the value is empty", async () => {
                // Arrange
                // Act
                render(
                    <TextArea
                        value=""
                        onChange={() => {}}
                        required="Required"
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should initially render with no error if it is required and the value is not empty", async () => {
                // Arrange
                // Act
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        required="Required"
                    />,
                    defaultOptions,
                );

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("should not be in an error state if it is required, the field is empty, and a user tabs through the field", async () => {
                // Arrange
                render(
                    <TextArea
                        value=""
                        onChange={() => {}}
                        required="Required"
                    />,
                    defaultOptions,
                );

                // Act
                // Tab into field
                await userEvent.tab();
                // Tab out of field
                await userEvent.tab();

                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "false");
            });

            it("shound update with error if it is required and the value changes to an empty string", async () => {
                // Arrange
                render(
                    <TextArea
                        value="T"
                        onChange={() => {}}
                        required="Required"
                    />,
                    defaultOptions,
                );

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );
                // Assert
                const textArea = await screen.findByRole("textbox");
                expect(textArea).toHaveAttribute("aria-invalid", "true");
            });

            it("should not call onValidate on first render if the value is empty and required prop is used", async () => {
                // Arrange
                // Act
                const handleValidate = jest.fn();
                render(
                    <TextArea
                        value=""
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(handleValidate).not.toHaveBeenCalled();
            });

            it("should call onValidate with no error message on first render if the value is not empty and required prop is used", async () => {
                // Arrange
                // Act
                const handleValidate = jest.fn();
                render(
                    <TextArea
                        value="Text"
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should call onValidate when the value is cleared", async () => {
                // Arrange
                const handleValidate = jest.fn();
                render(
                    <TextArea
                        value="T"
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );
                // Reset mock after initial render
                handleValidate.mockReset();

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledOnce();
            });

            it("should call onValidate with the custom error message from the required prop when it is a string", async () => {
                // Arrange
                const requiredErrorMsg = "Custom required error message";
                const handleValidate = jest.fn();
                render(
                    <TextArea
                        value="T"
                        onChange={() => {}}
                        required={requiredErrorMsg}
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );
                // Reset mock after initial render
                handleValidate.mockReset();

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                    requiredErrorMsg,
                );
            });

            it("should call onValidate with a default error message if required is not a string", async () => {
                // Arrange
                const handleValidate = jest.fn();
                render(
                    <TextArea
                        value="T"
                        onChange={() => {}}
                        required={true}
                        onValidate={handleValidate}
                    />,
                    defaultOptions,
                );
                // Reset mock after initial render
                handleValidate.mockReset();

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                    "This field is required.",
                );
            });

            it("should prioritize validate prop over required prop if both are provided", async () => {
                // Arrange
                const handleValidate = jest.fn();
                const requiredErrorMessage = "Error because it is required";
                const validateErrorMessage = "Error because of validation";
                render(
                    <TextArea
                        value="T"
                        onChange={() => {}}
                        required={requiredErrorMessage}
                        onValidate={handleValidate}
                        validate={() => validateErrorMessage}
                    />,
                    defaultOptions,
                );
                // Reset mock after initial render
                handleValidate.mockReset();

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                    validateErrorMessage,
                );
            });
        });

        describe("instantValidation prop", () => {
            it("should call validate each time the value changes if the instantValidation prop is not provided", async () => {
                // Arrange
                const validate = jest.fn();
                render(
                    <ControlledTextArea validate={validate} />,
                    defaultOptions,
                );

                // Act
                const field = screen.getByRole("textbox");
                await userEvent.type(field, "test");
                await userEvent.tab();

                // Assert
                expect(validate.mock.calls).toStrictEqual([
                    ["t"],
                    ["te"],
                    ["tes"],
                    ["test"],
                ]);
            });

            describe("instantValidation=true", () => {
                it("should call validate each time the value changes", async () => {
                    // Arrange
                    const validate = jest.fn();
                    render(
                        <ControlledTextArea
                            validate={validate}
                            instantValidation={true}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    await userEvent.tab();

                    // Assert
                    expect(validate.mock.calls).toStrictEqual([
                        ["t"],
                        ["te"],
                        ["tes"],
                        ["test"],
                    ]);
                });

                it("should call onValidate with the error message each time the value changes", async () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const errorMessage = "Error";
                    render(
                        <ControlledTextArea
                            validate={() => errorMessage}
                            onValidate={onValidate}
                            instantValidation={true}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    await userEvent.tab();

                    // Assert
                    expect(onValidate.mock.calls).toStrictEqual([
                        [errorMessage],
                        [errorMessage],
                        [errorMessage],
                        [errorMessage],
                    ]);
                });

                it("should have the textarea in an error state after validation fails without waiting for the user to tab away", async () => {
                    // Arrange
                    render(
                        <ControlledTextArea
                            instantValidation={true}
                            validate={() => "Error message"}
                        />,
                        defaultOptions,
                    );
                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");

                    // Assert
                    expect(field).toHaveAttribute("aria-invalid", "true");
                });
            });
            describe("instantValidation=false", () => {
                it("should call validate once the user leaves the field", async () => {
                    // Arrange
                    const validate = jest.fn();
                    render(
                        <ControlledTextArea
                            validate={validate}
                            instantValidation={false}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    await userEvent.tab();

                    // Assert
                    expect(validate).toHaveBeenCalledExactlyOnceWith("test");
                });

                it("should call onValidate once the user leaves the field", async () => {
                    // Arrange
                    const handleValidate = jest.fn();
                    const errorMsg = "error message";
                    render(
                        <ControlledTextArea
                            validate={() => errorMsg}
                            onValidate={handleValidate}
                            instantValidation={false}
                        />,
                        defaultOptions,
                    );
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    handleValidate.mockReset(); // Reset mock before leaving the field

                    // Act
                    await userEvent.tab();

                    // Assert
                    expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                        errorMsg,
                    );
                });

                it("should not have the textarea in an error state before the field is blurred", async () => {
                    // Arrange
                    render(
                        <ControlledTextArea
                            instantValidation={false}
                            validate={() => "Error message"}
                        />,
                        defaultOptions,
                    );
                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");

                    // Assert
                    expect(field).toHaveAttribute("aria-invalid", "false");
                });

                it("should have the textarea in an error state after validation fails and the field is blurred", async () => {
                    // Arrange
                    render(
                        <ControlledTextArea
                            instantValidation={false}
                            validate={() => "Error message"}
                        />,
                        defaultOptions,
                    );
                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    await userEvent.tab();

                    // Assert
                    expect(field).toHaveAttribute("aria-invalid", "true");
                });

                it("should not be in an error state after a user updates the value after there was an error", async () => {
                    // Arrange
                    render(
                        <ControlledTextArea
                            validate={() => "Error message"}
                            instantValidation={false}
                        />,
                        defaultOptions,
                    );
                    // Act
                    const field = await screen.findByRole("textbox");
                    await userEvent.type(field, "t");
                    // Trigger blur so error is shown
                    await userEvent.tab();
                    // Updating the value should clear the error
                    await userEvent.type(field, "te");

                    // Assert
                    expect(field).toHaveAttribute("aria-invalid", "false");
                });

                it("should call onValidate with null when the user changes the value after there was an error", async () => {
                    // Arrange
                    const handleValidate = jest.fn();
                    const errorMsg = "error message";
                    render(
                        <ControlledTextArea
                            validate={() => errorMsg}
                            onValidate={handleValidate}
                            instantValidation={false}
                        />,
                        defaultOptions,
                    );
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    // Blur will trigger error to be shown
                    await userEvent.tab();
                    handleValidate.mockReset(); // Reset mock before changing the value

                    // Act
                    // Updating the value should clear the error using the onValidate prop
                    await userEvent.type(field, "t");

                    // Assert
                    expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                        null,
                    );
                });

                it("should not call the validate prop on blur if it is disabled", async () => {
                    // Arrange
                    const validate = jest.fn();
                    render(
                        <ControlledTextArea
                            value="test"
                            validate={validate}
                            disabled={true}
                            instantValidation={false}
                        />,
                        defaultOptions,
                    );
                    // Act
                    await userEvent.tab();
                    await userEvent.tab();

                    // Assert
                    expect(validate).not.toHaveBeenCalled();
                });

                describe("required", () => {
                    it("shound be in error state if it is required, the value changes to an empty string, and the user tabs away", async () => {
                        // Arrange
                        render(
                            <ControlledTextArea
                                value="T"
                                required="Required"
                                instantValidation={false}
                            />,
                            defaultOptions,
                        );

                        // Act
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");
                        await userEvent.tab();

                        // Assert
                        const textArea = await screen.findByRole("textbox");
                        expect(textArea).toHaveAttribute(
                            "aria-invalid",
                            "true",
                        );
                    });

                    it("shound not be in error state if it is required, the value changes to an empty string, and the user has not tabbed away", async () => {
                        // Arrange
                        render(
                            <ControlledTextArea
                                value="T"
                                required="Required"
                                instantValidation={false}
                            />,
                            defaultOptions,
                        );

                        // Act
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");

                        // Assert
                        const textArea = await screen.findByRole("textbox");
                        expect(textArea).toHaveAttribute(
                            "aria-invalid",
                            "false",
                        );
                    });

                    it("shound call onValidate with the required message if it is required, the value changes to an empty string, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        const requiredMessage = "Required";
                        render(
                            <ControlledTextArea
                                value="T"
                                required={requiredMessage}
                                instantValidation={false}
                                onValidate={onValidate}
                            />,
                            defaultOptions,
                        );
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");
                        onValidate.mockReset(); // Reset mock before leaving the field

                        // Act
                        await userEvent.tab();

                        // Assert
                        expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                            requiredMessage,
                        );
                    });

                    it("shound be in error state if it is required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        render(
                            <ControlledTextArea
                                required="Required"
                                instantValidation={false}
                            />,
                            defaultOptions,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        const textArea = await screen.findByRole("textbox");
                        expect(textArea).toHaveAttribute(
                            "aria-invalid",
                            "true",
                        );
                    });

                    it("shound call onValidate with the required message if it is required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        const requiredMessage = "Required";
                        render(
                            <ControlledTextArea
                                required={requiredMessage}
                                onValidate={onValidate}
                                instantValidation={false}
                            />,
                            defaultOptions,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                            requiredMessage,
                        );
                    });

                    it("should not be in error state if it is not required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        render(
                            <ControlledTextArea
                                required={undefined}
                                instantValidation={false}
                            />,
                            defaultOptions,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        const textArea = await screen.findByRole("textbox");
                        expect(textArea).toHaveAttribute(
                            "aria-invalid",
                            "false",
                        );
                    });

                    it("should not call onValidate if it is not required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        render(
                            <ControlledTextArea
                                required={undefined}
                                instantValidation={false}
                                onValidate={onValidate}
                            />,
                            defaultOptions,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        expect(onValidate).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
