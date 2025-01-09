import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {StyleSheet} from "aphrodite";
import LabeledTextField from "../labeled-text-field";

describe("LabeledTextField", () => {
    it("labeledtextfield becomes focused", async () => {
        // Arrange
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);
        const field = await screen.findByRole("textbox");

        // Act
        await userEvent.tab();

        // Assert
        expect(field).toHaveFocus();
    });

    it("labeledtextfield becomes blurred", async () => {
        // Arrange
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);

        // focus
        await userEvent.tab();

        // Act
        // blur
        await userEvent.tab();

        // Assert
        expect(await screen.findByRole("textbox")).not.toHaveFocus();
    });

    it("id prop is passed to input", async () => {
        // Arrange
        const id = "exampleid";

        // Act
        render(
            <LabeledTextField
                id={id}
                label="Label"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("id", `${id}-field`);
    });

    it("auto-generated id is passed to input when id prop is not set", async () => {
        // Arrange

        // Act
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);
        const input = await screen.findByRole("textbox");
        const result = input.getAttribute("id");

        // Assert
        // Since the generated id is unique, we cannot know what it will be. We
        // only that it ends with "-field".
        expect(result).toMatch(/.*-field/);
    });

    it("type prop is passed to input", async () => {
        // Arrange
        const type = "email";

        // Act
        render(
            <LabeledTextField
                type={type}
                label="Label"
                value=""
                onChange={() => {}}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("type", type);
    });

    it("label prop is rendered", async () => {
        // Arrange
        const label = "Label";

        // Act
        render(<LabeledTextField label={label} value="" onChange={() => {}} />);

        // Assert
        expect(await screen.findByText(label)).toBeInTheDocument();
    });

    it("description prop is rendered", async () => {
        // Arrange
        const description = "Description";

        // Act
        render(
            <LabeledTextField
                label="Label"
                description={description}
                value=""
                onChange={() => {}}
            />,
        );

        // Assert
        expect(await screen.findByText(description)).toBeInTheDocument();
    });

    it("value prop is set on mount", async () => {
        // Arrange
        const value = "Value";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value={value}
                onChange={() => {}}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("value", value);
    });

    it("value prop change from parent reflects on input value", async () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        const {rerender} = render(
            <LabeledTextField label="Label" value="" onChange={handleChange} />,
        );

        // Act
        const newValue = "new value";
        rerender(
            <LabeledTextField
                label="Label"
                value={newValue}
                onChange={handleChange}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("value", newValue);
    });

    it("disabled prop disables the input", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-disabled", "true");
    });

    it("ariaDescribedby prop sets aria-describedby", async () => {
        // Arrange
        const ariaDescription = "aria description";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                ariaDescribedby={ariaDescription}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input.getAttribute("aria-describedby")).toEqual(ariaDescription);
    });

    it("auto-generates a unique error when ariaDescribedby is not passed in", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                // ariaDescribedby is not passed in
            />,
        );
        const input = await screen.findByRole("textbox");
        const result = input.getAttribute("aria-describedby");

        // Assert
        // Since the generated aria-describedby is unique,
        // we cannot know what it will be.
        // We only test if the aria-describedby attribute ends with "-error".
        expect(result).toMatch(/^.*-error$/);
    });

    it("validate prop is called when input changes", async () => {
        // Arrange
        const validate = jest.fn((value: string): any => {});
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                validate={validate}
            />,
        );

        // Act
        const newValue = "New Value";
        const input = await screen.findByRole("textbox");
        // @see https://testing-library.com/docs/react-testing-library/faq
        // How do I test input onChange handlers?
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(validate).toHaveBeenCalledWith(newValue);
    });

    it("onValidate prop is called on new validated input", async () => {
        // Arrange
        const handleValidate = jest.fn((errorMessage?: string | null) => {});
        const errorMessage = "Password must be at least 8 characters long";

        const validate = (value: string): string | null | undefined => {
            if (value.length < 8) {
                return errorMessage;
            }
        };

        render(
            <LabeledTextField
                label="Label"
                value="LongerThan8Chars"
                onChange={() => {}}
                validate={validate}
                onValidate={handleValidate}
            />,
        );

        // Act
        // Select all text and replace it with the new value.
        const textbox = await screen.findByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.clear(textbox);
        await userEvent.paste("Short");

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onChange prop is called on input change", async () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        render(
            <LabeledTextField label="Label" value="" onChange={handleChange} />,
        );

        // Act
        const newValue = "new value";
        const input = await screen.findByRole("textbox");
        // @see https://testing-library.com/docs/react-testing-library/faq
        // How do I test input onChange handlers?
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(handleChange).toHaveBeenCalledWith(newValue);
    });

    it("onKeyDown prop is called on keyboard keypress", async () => {
        // Arrange
        const handleKeyDown = jest.fn(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                return event.key;
            },
        );

        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onKeyDown={handleKeyDown}
            />,
        );

        // Act
        await userEvent.type(await screen.findByRole("textbox"), "{enter}");

        // Assert
        expect(handleKeyDown).toHaveReturnedWith("Enter");
    });

    it("onFocus prop is called when field is focused", async () => {
        // Arrange
        const handleFocus = jest.fn(() => {});
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onFocus={handleFocus}
            />,
        );

        // Act
        const field = await screen.findByRole("textbox");
        await userEvent.click(field);

        // Assert
        expect(handleFocus).toHaveBeenCalled();
    });

    it("onBlur prop is called when field is blurred", async () => {
        // Arrange
        const handleBlur = jest.fn(() => {});
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onBlur={handleBlur}
            />,
        );

        // focus
        await userEvent.tab();

        // Act
        // blur
        await userEvent.tab();

        // Assert
        expect(handleBlur).toHaveBeenCalled();
    });

    it("placeholder prop is passed to input", async () => {
        // Arrange
        const placeholder = "Placeholder";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                placeholder={placeholder}
            />,
        );

        // Assert
        const input = await screen.findByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
    });

    it("name prop is passed to input", async () => {
        // Arrange
        const name = "test-name";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                name={name}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("name", name);
    });

    it("style prop is passed to fieldheading", async () => {
        // Arrange
        const styles = StyleSheet.create({
            style1: {
                minWidth: 250,
                background: "blue",
            },
        });

        // Act
        const {container} = render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                style={styles.style1}
            />,
        );

        // Assert
        const fieldHeading = container.childNodes[0];
        expect(fieldHeading).toHaveStyle("min-width: 250px");
    });

    it("testId prop is passed to textfield", async () => {
        // Arrange
        const testId = "example-testid";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                testId={testId}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("data-testid", `${testId}-field`);
    });

    it("readOnly prop is passed to textfield", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                readOnly={true}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("readOnly");
    });

    it("autoComplete prop is passed to textfield", async () => {
        // Arrange
        const autoComplete = "name";

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                autoComplete={autoComplete}
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("autoComplete", autoComplete);
    });

    it("aria-invalid is set true if given an invalid input", async () => {
        // Arrange
        const handleValidate = jest.fn((errorMessage?: string | null) => {});

        const validate = (value: string): string | null | undefined => {
            if (value.length < 8) {
                return "Password must be at least 8 characters long";
            }
        };

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("LongerThan8Chars");

            return (
                <LabeledTextField
                    label="Label"
                    value={value}
                    onChange={setValue}
                    validate={validate}
                    onValidate={handleValidate}
                />
            );
        };

        render(<TextFieldWrapper />);

        // Act
        // Select all text and replace it with the new value.
        const textbox = await screen.findByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.clear(textbox);
        await userEvent.paste("Short");

        // Assert
        expect(textbox).toHaveAttribute("aria-invalid", "true");
    });

    it("aria-invalid is set false if given a valid input", async () => {
        // Arrange
        const handleValidate = jest.fn((errorMessage?: string | null) => {});

        const validate = (value: string): string | null | undefined => {
            if (value.length < 8) {
                return "Password must be at least 8 characters long";
            }
        };

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("Short");

            return (
                <LabeledTextField
                    label="Label"
                    value={value}
                    onChange={setValue}
                    validate={validate}
                    onValidate={handleValidate}
                />
            );
        };

        render(<TextFieldWrapper />);

        // Act
        // Select all text and replace it with the new value.
        const textbox = await screen.findByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.clear(textbox);
        await userEvent.paste("LongerThan8Chars");
        const shortTextbox = await screen.findByRole("textbox");

        // Assert
        expect(shortTextbox).toHaveAttribute("aria-invalid", "false");
    });
});

describe("Required LabeledTextField", () => {
    test("has * when `required` prop is true", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                required={true}
            />,
        );

        // Assert
        expect(await screen.findByText("*")).toBeInTheDocument();
    });

    test("does not have * when `required` prop is false", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                required={false}
            />,
        );

        // Assert
        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    test("aria-required is true when `required` prop is true", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                testId="foo-labeled-text-field"
                required={true}
            />,
        );

        const textField = await screen.findByTestId(
            "foo-labeled-text-field-field",
        );

        // Assert
        expect(textField).toHaveAttribute("aria-required", "true");
    });

    test("aria-required is false when `required` prop is false", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                testId="foo-labeled-text-field"
                required={false}
            />,
        );

        const textField = await screen.findByTestId(
            "foo-labeled-text-field-field",
        );

        // Assert
        expect(textField).toHaveAttribute("aria-required", "false");
    });

    test("displays the default message when the `required` prop is `true`", async () => {
        // Arrange
        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <LabeledTextField
                    label="Label"
                    value={value}
                    onChange={setValue}
                    required={true}
                    testId="test-labeled-text-field"
                />
            );
        };

        render(<TextFieldWrapper />);

        const textField = await screen.findByTestId(
            "test-labeled-text-field-field",
        );
        textField.focus();
        await userEvent.type(textField, "a");
        await userEvent.clear(textField);

        // Act
        textField.blur();

        // Assert
        expect(await screen.findByRole("alert")).toHaveTextContent(
            "This field is required.",
        );
    });

    test("displays the string passed into `required`", async () => {
        // Arrange
        const errorMessage = "This is an example error message.";

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <LabeledTextField
                    label="Label"
                    value={value}
                    onChange={setValue}
                    required={errorMessage}
                    testId="test-labeled-text-field"
                />
            );
        };

        render(<TextFieldWrapper />);

        const textField = await screen.findByTestId(
            "test-labeled-text-field-field",
        );
        textField.focus();
        await userEvent.type(textField, "a");
        await userEvent.clear(textField);

        // Act
        textField.blur();

        // Assert
        expect(await screen.findByRole("alert")).toHaveTextContent(
            errorMessage,
        );
    });

    test("displays an error even when onValidate is set", async () => {
        // Arrange
        const errorMessage = "Empty string!";

        const validate = (value: string): string | null | undefined => {
            if (value === "initials") {
                return errorMessage;
            }
        };

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("initial");
            return (
                <LabeledTextField
                    label="Label"
                    value={value}
                    onChange={setValue}
                    validate={validate}
                    onValidate={jest.fn()}
                    testId="test-labeled-text-field"
                />
            );
        };

        render(<TextFieldWrapper />);

        const textField = await screen.findByTestId(
            "test-labeled-text-field-field",
        );
        textField.focus();
        await userEvent.type(textField, "s");

        // Act
        await textField.blur();

        // Assert
        expect(await screen.findByRole("alert")).toHaveTextContent(
            errorMessage,
        );
    });
});
