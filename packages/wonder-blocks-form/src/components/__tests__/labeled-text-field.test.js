//@flow
import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {StyleSheet} from "aphrodite";
import LabeledTextField from "../labeled-text-field.js";
import text from "../../../../wonder-blocks-core/src/components/text";

describe("LabeledTextField", () => {
    it("labeledtextfield becomes focused", () => {
        // Arrange
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);
        const field = screen.getByRole("textbox");

        // Act
        userEvent.tab();

        // Assert
        expect(field).toHaveFocus();
    });

    it("labeledtextfield becomes blurred", async () => {
        // Arrange
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);
        const field = screen.getByRole("textbox");

        // focus
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });

    it("id prop is passed to input", () => {
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("id", `${id}-field`);
    });

    it("auto-generated id is passed to input when id prop is not set", () => {
        // Arrange

        // Act
        render(<LabeledTextField label="Label" value="" onChange={() => {}} />);

        // Assert
        // Since the generated id is unique, we cannot know what it will be.
        // We only test if the id attribute starts with "uid-" and ends with "-field".
        const input = screen.getByRole("textbox");
        expect(input.getAttribute("id")).toMatch(/uid-.*-field/);
    });

    it("type prop is passed to input", () => {
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("type", type);
    });

    it("label prop is rendered", () => {
        // Arrange
        const label = "Label";

        // Act
        render(<LabeledTextField label={label} value="" onChange={() => {}} />);

        // Assert
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("description prop is rendered", () => {
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
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("value prop is set on mount", () => {
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
        const input = screen.getByRole("textbox");
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("value", newValue);
    });

    it("disabled prop disables the input", () => {
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
        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();
    });

    it("ariaDescribedby prop sets aria-describedby", () => {
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
        const input = screen.getByRole("textbox");
        expect(input.getAttribute("aria-describedby")).toEqual(ariaDescription);
    });

    it("auto-generates a unique error when ariaDescribedby is not passed in", () => {
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

        // Assert
        // Since the generated aria-describedby is unique,
        // we cannot know what it will be.
        // We only test if the aria-describedby attribute starts with
        // "uid-" and ends with "-error".
        const input = screen.getByRole("textbox");
        expect(input.getAttribute("aria-describedby")).toMatch(
            /^uid-.*-error$/,
        );
    });

    it("validate prop is called when input changes", () => {
        // Arrange
        const validate = jest.fn((value: string): ?string => {});
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
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(validate).toHaveBeenCalledWith(newValue);
    });

    it("onValidate prop is called on new validated input", () => {
        // Arrange
        const handleValidate = jest.fn((errorMessage: ?string) => {});
        const errorMessage = "Password must be at least 8 characters long";

        const validate = (value: string): ?string => {
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
        const input = screen.getByRole("textbox");
        // Select all text and replace it with the new value.
        userEvent.type(screen.getByRole("textbox"), `{selectall}Short`);

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onChange prop is called on input change", () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        render(
            <LabeledTextField label="Label" value="" onChange={handleChange} />,
        );

        // Act
        const newValue = "new value";
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: newValue}});

        // Assert
        expect(handleChange).toHaveBeenCalledWith(newValue);
    });

    it("onKeyDown prop is called on keyboard keypress", () => {
        // Arrange
        const handleKeyDown = jest.fn(
            (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
        userEvent.type(screen.getByRole("textbox"), "{enter}");

        // Assert
        expect(handleKeyDown).toHaveReturnedWith("Enter");
    });

    it("onFocus prop is called when field is focused", () => {
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
        const field = screen.getByRole("textbox");
        field.focus();

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
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

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
        const input = screen.getByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
    });

    it("light prop is passed to textfield", async () => {
        // Arrange

        // Act
        render(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                light={true}
            />,
        );

        const textField = screen.getByRole("textbox");
        textField.focus();

        // Assert
        expect(textField.getAttribute("class")).toMatch(/light/i);
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("data-test-id", `${testId}-field`);
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
        const input = screen.getByRole("textbox");
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
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("autoComplete", autoComplete);
    });
});

describe("Required LabeledTextField", () => {
    test("has * when `required` prop is true", () => {
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
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    test("does not have * when `required` prop is false", () => {
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

    test("aria-required is true when `required` prop is true", () => {
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

        const textField = screen.getByTestId("foo-labeled-text-field-field");

        // Assert
        expect(textField).toHaveAttribute("aria-required", "true");
    });

    test("aria-required is false when `required` prop is false", () => {
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

        const textField = screen.getByTestId("foo-labeled-text-field-field");

        // Assert
        expect(textField).toHaveAttribute("aria-required", "false");
    });

    test("displays the default message when the `required` prop is `true`", () => {
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

        const textField = screen.getByTestId("test-labeled-text-field-field");
        textField.focus();
        userEvent.paste(textField, "a");
        userEvent.clear(textField);

        // Act
        textField.blur();

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(
            "This field is required.",
        );
    });

    test("displays the string passed into `required`", () => {
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

        const textField = screen.getByTestId("test-labeled-text-field-field");
        textField.focus();
        userEvent.paste(textField, "a");
        userEvent.clear(textField);

        // Act
        textField.blur();

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });
});
