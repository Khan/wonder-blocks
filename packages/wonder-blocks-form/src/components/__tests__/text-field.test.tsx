import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextField from "../text-field";

describe("TextField", () => {
    it("textfield is focused", () => {
        // Arrange
        render(<TextField id="tf-1" value="" onChange={() => {}} />);

        // Act
        userEvent.tab();

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("onFocus is called after textfield is focused", () => {
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
        userEvent.tab();

        // Assert
        expect(handleOnFocus).toHaveBeenCalled();
    });

    it("textfield is blurred", async () => {
        // Arrange
        render(<TextField id="tf-1" value="" onChange={() => {}} />);

        // focus
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
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
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

        // Assert
        expect(handleOnBlur).toHaveBeenCalled();
    });

    it("id prop is passed to the input element", () => {
        // Arrange
        const id: string = "tf-1";

        // Act
        render(<TextField id={id} value="" onChange={() => {}} />);

        // Assert
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("id", id);
    });

    it("type prop is passed to the input element", () => {
        // Arrange
        const type = "number";

        // Act
        render(
            <TextField id={"tf-1"} type={type} value="" onChange={() => {}} />,
        );

        // Assert
        // NOTE: The implicit role for input[type=number] is "spinbutton".
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("type", type);
    });

    it("value prop is passed to the input element", () => {
        // Arrange
        const value = "Text";

        // Act
        render(<TextField id={"tf-1"} value={value} onChange={() => {}} />);

        // Assert
        const input = screen.getByDisplayValue(value);
        expect(input).toBeInTheDocument();
    });

    it("disabled prop disables the input element", () => {
        // Arrange
        render(
            <TextField
                id="tf-1"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );
        const input = screen.getByRole("textbox");

        // Act

        // Assert
        expect(input).toBeDisabled();
    });

    it("onChange is called when value changes", () => {
        // Arrange
        const handleOnChange = jest.fn();

        render(
            <TextField id={"tf-1"} value="Text" onChange={handleOnChange} />,
        );

        // Act
        const newValue = "Test2";
        const input = screen.getByRole("textbox");
        // @see https://testing-library.com/docs/react-testing-library/faq
        // How do I test input onChange handlers?
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(handleOnChange).toHaveBeenCalledWith(newValue);
    });

    it("validate is called when value changes", () => {
        // Arrange
        // @ts-expect-error [FEI-5019] - TS2355 - A function whose declared type is neither 'void' nor 'any' must return a value.
        const handleValidate = jest.fn(
            (value: string): string | null | undefined => {},
        );

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
        userEvent.type(screen.getByRole("textbox"), `{selectall}${newValue}`);

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(newValue);
    });

    it("validate is given a valid input", () => {
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
        userEvent.type(screen.getByRole("textbox"), `{selectall}${newValue}`);

        // Assert
        expect(handleValidate).toHaveReturnedWith(undefined);
    });

    it("validate is given an invalid input", () => {
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
        userEvent.type(screen.getByRole("textbox"), `{selectall}${newValue}`);

        // Assert
        expect(handleValidate).toHaveReturnedWith(errorMessage);
    });

    it("onValidate is called after input validate", () => {
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
        userEvent.type(screen.getByRole("textbox"), `{selectall}${newValue}`);

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onValidate is called on input's initial value", () => {
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

    it("onKeyDown is called after keyboard key press", () => {
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
        userEvent.type(screen.getByRole("textbox"), "{enter}");

        // Assert
        expect(handleOnKeyDown).toHaveReturnedWith("Enter");
    });

    it("placeholder prop is passed to the input element", () => {
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
        const input = screen.getByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
    });

    it("testId is passed to the input element", () => {
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("data-test-id", testId);
    });

    it("aria props are passed to the input element", () => {
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
        const input = screen.getByRole("textbox");
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
        const input = screen.getByRole("textbox");
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("autoComplete", autoComplete);
    });
});
