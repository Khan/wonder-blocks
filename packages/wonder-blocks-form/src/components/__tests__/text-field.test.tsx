import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import TextField from "../text-field";

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

        // Assert
        // Since the generated id is unique, we cannot know what it will be. We
        // only test if the id attribute starts with "uid-", then followed by
        // "text-field-" as the scope assigned to IDProvider.
        const input = await screen.findByRole("textbox");
        expect(input.getAttribute("id")).toMatch(/uid-text-field-.*$/);
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

        it("should call the onFocus prop when the input is focused and it is disabled", async () => {
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

        it("should call the onBlur prop when the input is blurred and it is disabled", async () => {
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
    });
});
