/* eslint-disable max-lines */
import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import TextField from "../text-field";

const ControlledTextField = (props: Partial<PropsFor<typeof TextField>>) => {
    const [value, setValue] = React.useState(props.value || "");
    return <TextField {...props} value={value} onChange={setValue} />;
};

describe("TextField", () => {
    it("id prop is passed to input", async () => {
        // Arrange

        // Act
        render(<TextField id="custom-id" value="" onChange={() => {}} />);

        // Assert
        expect(await screen.findByRole("textbox")).toHaveAttribute(
            "id",
            "custom-id",
        );
    });

    it("auto-generated id is passed to input when id prop is not set", async () => {
        // Arrange

        // Act
        render(<TextField value="" onChange={() => {}} />);
        const input = await screen.findByRole("textbox");
        const result = input.getAttribute("id");

        // Assert
        // Since the generated id is unique, we cannot know what it will be. We
        // only test if the id attribute exists.
        expect(result).toBeString();
    });

    it("textfield is focused", async () => {
        // Arrange
        render(<TextField id="tf-1" value="" onChange={() => {}} />);

        // Act
        await userEvent.tab();

        // Assert
        expect(await screen.findByRole("textbox")).toHaveFocus();
    });

    it("onFocus is called after textfield is focused", async () => {
        // Arrange
        const handleOnFocus = jest.fn(() => {});

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onFocus={handleOnFocus}
            />,
        );

        // Act
        await userEvent.tab();

        // Assert
        expect(handleOnFocus).toHaveBeenCalled();
    });

    it("textfield is blurred", async () => {
        // Arrange
        render(<TextField id="tf-1" value="" onChange={() => {}} />);

        // focus
        await userEvent.tab();

        // Act
        // blur
        await userEvent.tab();

        // Assert
        expect(await screen.findByRole("textbox")).not.toHaveFocus();
    });

    it("onBlur is called after textfield is blurred", async () => {
        // Arrange
        const handleOnBlur = jest.fn(() => {});

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onBlur={handleOnBlur}
            />,
        );

        // focus
        await userEvent.tab();

        // Act
        // blur
        await userEvent.tab();

        // Assert
        expect(handleOnBlur).toHaveBeenCalled();
    });

    it("id prop is passed to the input element", async () => {
        // Arrange
        const id = "tf-1";

        // Act
        render(<TextField id={id} value="" onChange={() => {}} />);

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("id", id);
    });

    it("type prop is passed to the input element", async () => {
        // Arrange
        const type = "number";

        // Act
        render(
            <TextField id={"tf-1"} type={type} value="" onChange={() => {}} />,
        );

        // Assert
        // NOTE: The implicit role for input[type=number] is "spinbutton".
        const input = await screen.findByRole("spinbutton");
        expect(input).toHaveAttribute("type", type);
    });

    it("name prop is passed to the input element", async () => {
        // Arrange
        const name = "some-name";

        // Act
        render(
            <TextField id={"tf-1"} name={name} value="" onChange={() => {}} />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("name", name);
    });

    it("value prop is passed to the input element", async () => {
        // Arrange
        const value = "Text";

        // Act
        render(<TextField id={"tf-1"} value={value} onChange={() => {}} />);

        // Assert
        const input = await screen.findByDisplayValue(value);
        expect(input).toBeInTheDocument();
    });

    it("onChange is called when value changes", async () => {
        // Arrange
        const handleOnChange = jest.fn();

        render(
            <TextField id={"tf-1"} value="Text" onChange={handleOnChange} />,
        );

        // Act
        const newValue = "Test2";
        const input = await screen.findByRole("textbox");
        // @see https://testing-library.com/docs/react-testing-library/faq
        // How do I test input onChange handlers?
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(handleOnChange).toHaveBeenCalledWith(newValue);
    });

    it("validate is called when value changes", async () => {
        // Arrange
        const handleValidate = jest.fn((value: string) => {});

        render(
            <TextField
                id={"tf-1"}
                value="Text"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text2";
        // Select all text and replace it with the new value.
        await userEvent.type(
            await screen.findByRole("textbox"),
            `{selectall}${newValue}`,
        );

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(newValue);
    });

    it("validate is given a valid input", async () => {
        // Arrange
        const handleValidate = jest.fn(
            (value: string): string | null | undefined => {
                if (value.length < 8) {
                    return "Value is too short";
                }
            },
        );

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLong"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "TextIsLongerThan8";
        // Select all text and replace it with the new value.
        await userEvent.type(
            await screen.findByRole("textbox"),
            `{selectall}${newValue}`,
        );

        // Assert
        expect(handleValidate).toHaveReturnedWith(undefined);
    });

    it("validate is given an invalid input", async () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn(
            (value: string): string | null | undefined => {
                if (value.length < 8) {
                    return errorMessage;
                }
            },
        );

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        // Select all text and replace it with the new value.
        const textbox = await screen.findByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.clear(textbox);
        await userEvent.paste(newValue);

        // Assert
        expect(handleValidate).toHaveReturnedWith(errorMessage);
    });

    it("aria-invalid is set true if given an invalid input", async () => {
        // Arrange
        const handleValidate = jest.fn(
            (value: string): string | null | undefined => {
                if (value.length < 8) {
                    return "Value is too short";
                }
            },
        );

        render(
            <TextField
                id={"tf-1"}
                value="short"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const textbox = await screen.findByRole("textbox");

        // Assert
        expect(textbox).toHaveAttribute("aria-invalid", "true");
    });

    it("aria-invalid is set false if given a valid input", async () => {
        // Arrange
        const handleValidate = jest.fn(
            (value: string): string | null | undefined => {
                if (value.length < 8) {
                    return "Value is too short";
                }
            },
        );

        render(
            <TextField
                id={"tf-1"}
                value="long enough"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const textbox = await screen.findByRole("textbox");

        // Assert
        expect(textbox).toHaveAttribute("aria-invalid", "false");
    });

    it("onValidate is called after input validate", async () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn((errorMessage?: string | null) => {});
        const validate = jest.fn((value: string): string | null | undefined => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validate={validate}
                onValidate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        // Select all text and replace it with the new value.
        const textbox = await screen.findByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.clear(textbox);
        await userEvent.paste(newValue);

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onValidate is called on input's initial value", async () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn((errorMessage?: string | null) => {});
        const validate = jest.fn((value: string): string | null | undefined => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        // Act
        render(
            <TextField
                id={"tf-1"}
                value="Short"
                validate={validate}
                onValidate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onKeyDown is called after keyboard key press", async () => {
        // Arrange
        const handleOnKeyDown = jest.fn(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                return event.key;
            },
        );

        render(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onKeyDown={handleOnKeyDown}
            />,
        );

        // Act
        await userEvent.type(await screen.findByRole("textbox"), "{enter}");

        // Assert
        expect(handleOnKeyDown).toHaveReturnedWith("Enter");
    });

    it("placeholder prop is passed to the input element", async () => {
        // Arrange
        const placeholder = "Placeholder";

        // Act
        render(
            <TextField
                id={"tf-1"}
                value="Text"
                placeholder={placeholder}
                onChange={() => {}}
            />,
        );

        // Assert
        const input = await screen.findByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
    });

    it("testId is passed to the input element", async () => {
        // Arrange
        const testId = "some-test-id";
        render(
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={() => {}}
                testId={testId}
            />,
        );

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("data-testid", testId);
    });

    it("aria props are passed to the input element", async () => {
        // Arrange
        const ariaLabel = "example-text-field";
        render(
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={() => {}}
                aria-label={ariaLabel}
            />,
        );

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-label", ariaLabel);
    });

    it("readOnly prop is passed to the input element", async () => {
        // Arrange

        // Act
        render(
            <TextField
                id={"tf-1"}
                value={"Text"}
                onChange={() => {}}
                readOnly={true}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("readOnly");
    });

    it("autoComplete prop is passed to the input element", async () => {
        // Arrange
        const autoComplete = "name";

        // Act
        render(
            <TextField
                id={"tf-1"}
                value={"Text"}
                onChange={() => {}}
                autoComplete={autoComplete}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("autoComplete", autoComplete);
    });

    test("has focus if autoFocus is true", async () => {
        // Arrange
        render(
            <View>
                <Button onClick={() => {}}>
                    Some other focusable element.
                </Button>
                <TextField
                    id="tf-auto-focus-true"
                    autoFocus
                    testId="search-field-test"
                    onChange={() => {}}
                    value=""
                />
                ,
            </View>,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("does not have focus if autoFocus is undefined", async () => {
        // Arrange
        render(
            <View>
                <Button onClick={() => {}}>
                    Some other focusable element.
                </Button>
                <TextField
                    id="tf-auto-focus-undefined"
                    testId="search-field-test"
                    onChange={() => {}}
                    value=""
                />
                ,
            </View>,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField).not.toHaveFocus();
    });

    describe("Disabled state", () => {
        it("disabled prop sets the aria-disabled attribute on the input element", async () => {
            // Arrange
            render(
                <TextField
                    id="tf-1"
                    value=""
                    onChange={() => {}}
                    disabled={true}
                />,
            );
            const input = await screen.findByRole("textbox");

            // Act

            // Assert
            expect(input).toHaveAttribute("aria-disabled", "true");
        });

        it("should set the aria-disabled attribute when the disabled prop is false", async () => {
            // Arrange
            render(
                <TextField disabled={false} value="Text" onChange={() => {}} />,
            );

            // Act

            // Assert
            const input = await screen.findByRole("textbox");
            expect(input).toHaveAttribute("aria-disabled", "false");
        });

        it("should set the aria-disabled attribute to false if the disabled prop is not provided", async () => {
            // Arrange
            render(<TextField value="Text" onChange={() => {}} />);

            // Act

            // Assert
            const input = await screen.findByRole("textbox");
            expect(input).toHaveAttribute("aria-disabled", "false");
        });

        it("should not set the disabled attribute when the disabled prop is true", async () => {
            // Arrange
            render(
                <TextField disabled={true} value="Text" onChange={() => {}} />,
            );

            // Act

            // Assert
            const input = await screen.findByRole("textbox");
            expect(input).not.toHaveAttribute("disabled");
        });

        it("should set the readonly attribute if the disabled prop is true", async () => {
            // Arrange
            render(
                <TextField value="Text" onChange={() => {}} disabled={true} />,
            );

            // Act

            // Assert
            const input = await screen.findByRole("textbox");
            expect(input).toHaveAttribute("readonly");
        });

        it("should not call the onChange prop when the input value changes and it is disabled", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <TextField value="" onChange={onChangeMock} disabled={true} />,
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

        it("should not call the onKeyDown prop when a key is typed in the input and it is disabled", async () => {
            // Arrange
            const handleOnKeyDown = jest.fn();

            render(
                <TextField
                    value=""
                    onChange={() => {}}
                    onKeyDown={handleOnKeyDown}
                    disabled={true}
                />,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "{enter}");

            // Assert
            expect(handleOnKeyDown).not.toHaveBeenCalled();
        });

        it("should continue to call the onFocus prop when the input is focused and it is disabled", async () => {
            // Arrange
            const handleOnFocus = jest.fn();

            render(
                <TextField
                    value=""
                    onChange={() => {}}
                    onFocus={handleOnFocus}
                    disabled={true}
                />,
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(handleOnFocus).toHaveBeenCalledTimes(1);
        });

        it("should continue to call the onBlur prop when the input is blurred and it is disabled", async () => {
            // Arrange
            const handleOnBlur = jest.fn();

            render(
                <TextField
                    value=""
                    onChange={() => {}}
                    onBlur={handleOnBlur}
                    disabled={true}
                />,
            );
            // Tab to focus on input
            await userEvent.tab();

            // Act
            // Tab to move focus away
            await userEvent.tab();

            // Assert
            expect(handleOnBlur).toHaveBeenCalledTimes(1);
        });

        it("should be focusable if it is disabled", async () => {
            // Arrange
            render(
                <TextField value="Text" onChange={() => {}} disabled={true} />,
            );

            // Act
            await userEvent.tab();

            // Assert
            const input = await screen.findByRole("textbox");
            expect(input).toHaveFocus();
        });
    });

    it("should set aria-invalid to true if the error prop is true", async () => {
        // Arrange
        render(<TextField value="text" onChange={() => {}} error={true} />);

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("should set aria-invalid to false if the error prop is false", async () => {
        // Arrange
        render(<TextField value="text" onChange={() => {}} error={false} />);

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("should set aria-invalid to false if the error prop is not provided", async () => {
        // Arrange
        render(<TextField value="text" onChange={() => {}} />);

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "false");
    });

    describe("Validation", () => {
        describe("validate prop", () => {
            it("should be in an error state if the initial value is not empty and not valid", async () => {
                // Arrange
                // Act
                render(
                    <TextField
                        value="tooShort"
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "true");
            });

            it("should not be in an error state if the initial value is empty and not valid", async () => {
                // Arrange
                // Act
                render(
                    <TextField
                        value=""
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("should not be in an error state if the initial value is valid", async () => {
                // Arrange
                // Act
                render(
                    <TextField
                        value="LongerThan10"
                        onChange={() => {}}
                        validate={(value) => {
                            if (value.length < 10) {
                                return "Error: value should be >= 10";
                            }
                        }}
                    />,
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("should be able to change from a valid state to an error state", async () => {
                // Arrange
                const Controlled = () => {
                    const [value, setValue] = React.useState("text");
                    return (
                        <TextField
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
                render(<Controlled />);

                // Act
                // Add a character to make it longer than the validation limit
                await userEvent.type(await screen.findByRole("textbox"), "s");

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "true");
            });

            it("should be able to change from an error state to a valid state", async () => {
                // Arrange
                const Controlled = () => {
                    const [value, setValue] = React.useState("texts");
                    return (
                        <TextField
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
                render(<Controlled />);

                // Act
                // Remove a character to make it within the validation limit
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("should call the validate function twice when it is first rendered (once on initialization, once after mount)", async () => {
                // Arrange
                const validate = jest.fn();

                // Act
                render(
                    <TextField
                        value="text"
                        onChange={() => {}}
                        validate={validate}
                    />,
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
                    <TextField
                        value="text"
                        onChange={() => {}}
                        validate={() => errorMessage}
                        onValidate={onValidate}
                    />,
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
                    <TextField
                        value="text"
                        disabled={true}
                        onChange={() => {}}
                        validate={validate}
                    />,
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should not call the validate function when it is first rendered if the value is empty", async () => {
                // Arrange
                const validate = jest.fn();

                // Act
                render(
                    <TextField
                        value=""
                        onChange={() => {}}
                        validate={validate}
                    />,
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
                        <TextField
                            value={value}
                            onChange={setValue}
                            validate={validate}
                        />
                    );
                };
                render(<Controlled />);
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
                        <TextField
                            value={value}
                            onChange={setValue}
                            validate={validate}
                        />
                    );
                };
                render(<Controlled />);
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
            it("should call the onValidate prop with the error message when the input is validated", () => {
                // Arrange
                const handleValidate = jest.fn();
                const errorMsg = "error message";

                // Act
                render(
                    <TextField
                        value="text"
                        onChange={() => {}}
                        validate={() => errorMsg}
                        onValidate={handleValidate}
                    />,
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
                    <TextField
                        value="text"
                        onChange={() => {}}
                        validate={() => null}
                        onValidate={handleValidate}
                    />,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should call the onValidate prop with null if the validate prop is a void function", () => {
                // Arrange
                const handleValidate = jest.fn();

                // Act
                render(
                    <TextField
                        value="text"
                        onChange={() => {}}
                        validate={() => {}}
                        onValidate={handleValidate}
                    />,
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
                    <TextField
                        value=""
                        onChange={() => {}}
                        required="Required"
                    />,
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("should initially render with no error if it is required and the value is not empty", async () => {
                // Arrange
                // Act
                render(
                    <TextField
                        value="Text"
                        onChange={() => {}}
                        required="Required"
                    />,
                );

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("should not be in an error state if it is required, the field is empty, and a user tabs through the field", async () => {
                // Arrange
                render(
                    <TextField
                        value=""
                        onChange={() => {}}
                        required="Required"
                    />,
                );

                // Act
                // Tab into field
                await userEvent.tab();
                // Tab out of field
                await userEvent.tab();

                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "false");
            });

            it("shound update with error if it is required and the value changes to an empty string", async () => {
                // Arrange
                render(
                    <TextField
                        value="T"
                        onChange={() => {}}
                        required="Required"
                    />,
                );

                // Act
                await userEvent.type(
                    await screen.findByRole("textbox"),
                    "{backspace}",
                );
                // Assert
                const field = await screen.findByRole("textbox");
                expect(field).toHaveAttribute("aria-invalid", "true");
            });

            it("should not call onValidate on first render if the value is empty and required prop is used", async () => {
                // Arrange
                const handleValidate = jest.fn();

                // Act
                render(
                    <TextField
                        value=""
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
                );

                // Assert
                expect(handleValidate).not.toHaveBeenCalled();
            });

            it("should call onValidate with no error message on first render if the value is not empty and required prop is used", async () => {
                // Arrange
                const handleValidate = jest.fn();

                // Act
                render(
                    <TextField
                        value="Text"
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
                );

                // Assert
                expect(handleValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should call onValidate when the value is cleared", async () => {
                // Arrange
                const handleValidate = jest.fn();
                render(
                    <TextField
                        value="T"
                        onChange={() => {}}
                        required="Required"
                        onValidate={handleValidate}
                    />,
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
                    <TextField
                        value="T"
                        onChange={() => {}}
                        required={requiredErrorMsg}
                        onValidate={handleValidate}
                    />,
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
                    <TextField
                        value="T"
                        onChange={() => {}}
                        required={true}
                        onValidate={handleValidate}
                    />,
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
                    <TextField
                        value="T"
                        onChange={() => {}}
                        required={requiredErrorMessage}
                        onValidate={handleValidate}
                        validate={() => validateErrorMessage}
                    />,
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
                render(<ControlledTextField validate={validate} />);

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
                        <ControlledTextField
                            validate={validate}
                            instantValidation={true}
                        />,
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
                        <ControlledTextField
                            validate={() => errorMessage}
                            onValidate={onValidate}
                            instantValidation={true}
                        />,
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

                it("should have the input in an error state after validation fails without waiting for the user to tab away", async () => {
                    // Arrange
                    render(
                        <ControlledTextField
                            instantValidation={true}
                            validate={() => "Error message"}
                        />,
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
                        <ControlledTextField
                            validate={validate}
                            instantValidation={false}
                        />,
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
                        <ControlledTextField
                            validate={() => errorMsg}
                            onValidate={handleValidate}
                            instantValidation={false}
                        />,
                    );

                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    await userEvent.tab();

                    // Assert
                    expect(handleValidate).toHaveBeenCalledExactlyOnceWith(
                        errorMsg,
                    );
                });

                it("should not have the input in an error state before the field is blurred", async () => {
                    // Arrange
                    render(
                        <ControlledTextField
                            instantValidation={false}
                            validate={() => "Error message"}
                        />,
                    );
                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");

                    // Assert
                    expect(field).toHaveAttribute("aria-invalid", "false");
                });

                it("should have the input in an error state after validation fails and the field is blurred", async () => {
                    // Arrange
                    render(
                        <ControlledTextField
                            instantValidation={false}
                            validate={() => "Error message"}
                        />,
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
                        <ControlledTextField
                            validate={() => "Error message"}
                            instantValidation={false}
                        />,
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
                        <ControlledTextField
                            validate={() => errorMsg}
                            onValidate={handleValidate}
                            instantValidation={false}
                        />,
                    );

                    // Act
                    const field = screen.getByRole("textbox");
                    await userEvent.type(field, "test");
                    // Blur will trigger error to be shown
                    await userEvent.tab();
                    // Updating the value should clear the error using the onValidate prop
                    await userEvent.type(field, "tests");

                    // Assert
                    expect(handleValidate.mock.calls).toStrictEqual([
                        [errorMsg],
                        [null],
                    ]);
                });

                it("should not call the validate prop on blur if it is disabled", async () => {
                    // Arrange
                    const validate = jest.fn();
                    render(
                        <ControlledTextField
                            value="test"
                            validate={validate}
                            disabled={true}
                            instantValidation={false}
                        />,
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
                            <ControlledTextField
                                value="T"
                                required="Required"
                                instantValidation={false}
                            />,
                        );

                        // Act
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");
                        await userEvent.tab();

                        // Assert
                        expect(field).toHaveAttribute("aria-invalid", "true");
                    });

                    it("shound not be in error state if it is required, the value changes to an empty string, and the user has not tabbed away", async () => {
                        // Arrange
                        render(
                            <ControlledTextField
                                value="T"
                                required="Required"
                                instantValidation={false}
                            />,
                        );

                        // Act
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");

                        // Assert
                        expect(field).toHaveAttribute("aria-invalid", "false");
                    });

                    it("shound call onValidate with the required message if it is required, the value changes to an empty string, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        const requiredMessage = "Required";
                        render(
                            <ControlledTextField
                                value="T"
                                required={requiredMessage}
                                instantValidation={false}
                                onValidate={onValidate}
                            />,
                        );

                        // Act
                        const field = await screen.findByRole("textbox");
                        await userEvent.type(field, "{backspace}");
                        await userEvent.tab();

                        // Assert
                        expect(onValidate.mock.calls).toStrictEqual([
                            [null],
                            [requiredMessage],
                        ]);
                    });

                    it("shound be in error state if it is required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        render(
                            <ControlledTextField
                                required="Required"
                                instantValidation={false}
                            />,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        const field = await screen.findByRole("textbox");
                        expect(field).toHaveAttribute("aria-invalid", "true");
                    });

                    it("shound call onValidate with the required message if it is required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        const requiredMessage = "Required";
                        render(
                            <ControlledTextField
                                required={requiredMessage}
                                onValidate={onValidate}
                                instantValidation={false}
                            />,
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
                            <ControlledTextField
                                required={undefined}
                                instantValidation={false}
                            />,
                        );

                        // Act
                        // Tab into field
                        await userEvent.tab();
                        // Tab out of field
                        await userEvent.tab();

                        // Assert
                        const field = await screen.findByRole("textbox");
                        expect(field).toHaveAttribute("aria-invalid", "false");
                    });

                    it("should not call onValidate if it is not required, the value is empty, and the user tabs away", async () => {
                        // Arrange
                        const onValidate = jest.fn();
                        render(
                            <ControlledTextField
                                required={undefined}
                                instantValidation={false}
                                onValidate={onValidate}
                            />,
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
