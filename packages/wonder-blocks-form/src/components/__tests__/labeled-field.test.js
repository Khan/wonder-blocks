//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {StyleSheet} from "aphrodite";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {
    MultiSelect,
    OptionItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import LabeledField from "../labeled-field.js";

describe("LabeledField", () => {
    it("LabeledField becomes focused", () => {
        // Arrange
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );
        const field = screen.getByRole("textbox");

        // Act
        userEvent.tab();

        // Assert
        expect(field).toHaveFocus();
    });

    it("LabeledField becomes blurred", () => {
        // Arrange
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // focus
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });

    // TODO(juan): id should be optional
    it.skip("id prop is passed to input", () => {
        // Arrange
        const id = "exampleid";

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    id={id}
                    label="Label"
                    field={
                        <TextField
                            id={id}
                            value=""
                            onChange={() => {}}
                            disabled={true}
                        />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("id", `${id}-field`);
    });

    // TODO(juan): id should be optional
    it.skip("auto-generated id is passed to input when id prop is not set", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        // Since the generated id is unique, we cannot know what it will be.
        // We only test if the id attribute starts with "uid-" and ends with "-field".
        const input = screen.getByRole("textbox");
        expect(input.getAttribute("id")).toMatch(/uid-.*-field/);
    });

    it("label prop is rendered", () => {
        // Arrange
        const label = "Label";

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label={label}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("description prop is rendered", () => {
        // Arrange
        const description = "Description";

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    description={description}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("ariaDescribedby prop sets aria-describedby", () => {
        // Arrange
        const ariaDescription = "aria description";

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    ariaDescribedby={ariaDescription}
                    field={
                        <TextField id="tf-id" value="" onChange={jest.fn()} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        const input = screen.getByRole("textbox");
        expect(input.getAttribute("aria-describedby")).toEqual(ariaDescription);
    });

    it("auto-generates a unique error when ariaDescribedby is not passed in", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    // ariaDescribedby is not passed in
                    field={
                        <TextField id="tf-id" value="" onChange={jest.fn()} />
                    }
                />
            </RenderStateRoot>,
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
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validate}
                    field={
                        <TextField id="tf-id" value="" onChange={jest.fn()} />
                    }
                />
            </RenderStateRoot>,
        );

        // Act
        const newValue = "New Value";
        const input = screen.getByRole("textbox");
        userEvent.paste(input, newValue);

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
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validate}
                    onValidate={handleValidate}
                    field={
                        <TextField
                            id="tf-id"
                            value="LongerThan8Chars"
                            onChange={jest.fn()}
                        />
                    }
                />
                ,
            </RenderStateRoot>,
        );

        // Act
        // Select all text and replace it with the new value.
        userEvent.type(screen.getByRole("textbox"), `{selectall}Short`);

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("original onFocus prop is called when field is focused", () => {
        // Arrange
        const handleFocus = jest.fn(() => {});
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    instantValidation={false}
                    required={true}
                    field={
                        <TextField
                            id="tf-id"
                            value="LongerThan8Chars"
                            onChange={jest.fn()}
                            onFocus={handleFocus}
                        />
                    }
                />
            </RenderStateRoot>,
        );

        // Act
        userEvent.tab();

        // Assert
        expect(handleFocus).toHaveBeenCalled();
    });

    it("original onBlur prop is called when field is blurred", () => {
        // Arrange
        const handleBlur = jest.fn(() => {});
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    instantValidation={false}
                    required={true}
                    field={
                        <TextField
                            id="tf-id"
                            value="LongerThan8Chars"
                            onChange={jest.fn()}
                            onBlur={handleBlur}
                        />
                    }
                />
            </RenderStateRoot>,
        );

        // focus
        userEvent.tab();

        // Act
        // blur
        userEvent.tab();

        // Assert
        expect(handleBlur).toHaveBeenCalled();
    });

    it("style prop is passed to fieldheading", () => {
        // Arrange
        const styles = StyleSheet.create({
            style1: {
                minWidth: 250,
                background: "blue",
            },
        });

        // Act
        const {container} = render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    style={styles.style1}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        const fieldHeading = container.childNodes[0];
        expect(fieldHeading).toHaveStyle("min-width: 250px");
    });

    it("testId prop is passed to textfield", () => {
        // Arrange
        const testId = "example-testid";

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    testId={testId}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("data-test-id", `${testId}-field`);
    });
});

describe("Required LabeledField", () => {
    test("has * when `required` prop is true", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    required={true}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    test("does not have * when `required` prop is false", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    required={false}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    test("aria-required is true when `required` prop is true", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    testId="foo-labeled-text-field"
                    required={true}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
        );

        const textField = screen.getByTestId("foo-labeled-text-field-field");

        // Assert
        expect(textField).toHaveAttribute("aria-required", "true");
    });

    test("aria-required is false when `required` prop is false", () => {
        // Arrange

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    testId="foo-labeled-text-field"
                    required={false}
                    field={
                        <TextField id="tf-id" value="" onChange={() => {}} />
                    }
                />
            </RenderStateRoot>,
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
                <LabeledField
                    label="Label"
                    required={true}
                    testId="test-labeled-text-field"
                    field={
                        <TextField
                            id="tf-id"
                            value={value}
                            onChange={setValue}
                        />
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <TextFieldWrapper />
            </RenderStateRoot>,
        );

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
                <LabeledField
                    label="Label"
                    required={errorMessage}
                    testId="test-labeled-text-field"
                    field={
                        <TextField
                            id="tf-id"
                            value={value}
                            onChange={setValue}
                        />
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <TextFieldWrapper />
            </RenderStateRoot>,
        );

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

describe("instantValidation", () => {
    it("error is displayed immediatly", () => {
        // Arrange
        const errorMessage = "This is an example error message.";

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("initial value");
            return (
                <LabeledField
                    label="Label"
                    validate={(value: string): ?string => {
                        if (value === "") {
                            return errorMessage;
                        }
                    }}
                    instantValidation={true}
                    field={
                        <TextField
                            id="tf-id"
                            value={value}
                            onChange={setValue}
                        />
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <TextFieldWrapper />
            </RenderStateRoot>,
        );

        // Focus the field
        userEvent.tab();
        const textField = screen.getByRole("textbox");

        // Act
        userEvent.clear(textField);

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });

    it("error is displayed only after blurring the TextField", () => {
        // Arrange
        const errorMessage = "This is an example error message.";

        const TextFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <LabeledField
                    label="Label"
                    validate={(value: string): ?string => {
                        if (value === "error") {
                            return errorMessage;
                        }
                    }}
                    instantValidation={false}
                    field={
                        <TextField
                            id="tf-id"
                            value={value}
                            onChange={setValue}
                        />
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <TextFieldWrapper />
            </RenderStateRoot>,
        );

        // Focus the field
        userEvent.tab();
        const textField = screen.getByRole("textbox");
        userEvent.type(textField, "error");

        // Act
        // Blur the field
        userEvent.tab();

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });

    it("error is displayed after selecting an invalid SingleSelect option", () => {
        // Arrange
        const errorMessage = "Please select at least 1 item";

        const validateField = (value: string) => {
            if (value) {
                return;
            }

            return errorMessage;
        };

        const ControlledSingleSelect = () => {
            const [selectedValue, setSelectedValue] = React.useState(null);
            return (
                <LabeledField
                    label="Label"
                    validate={validateField}
                    instantValidation={true}
                    field={
                        <SingleSelect
                            onChange={setSelectedValue}
                            placeholder="Choose a drink"
                            selectedValue={selectedValue}
                        >
                            <OptionItem label="Empty option" value="" />
                            <OptionItem
                                label="Regular milk tea with boba"
                                value="regular"
                            />
                            <OptionItem
                                label="Wintermelon milk tea with boba"
                                value="wintermelon"
                            />
                            <OptionItem
                                label="Taro milk tea, half sugar"
                                value="taro"
                            />
                        </SingleSelect>
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <ControlledSingleSelect />
            </RenderStateRoot>,
        );

        // Open the dropdown
        const selectOpener = screen.getByRole("button");
        selectOpener.click();

        // Act
        // Select an option
        screen.getByRole("option", {name: "Empty option"}).click();

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });

    it("error is displayed only after closing the MultiSelect dropdown", () => {
        // Arrange
        const errorMessage = "Please select at least 1 item";

        const validateField = (values: Array<string>) => {
            if (values.length > 1) {
                return;
            }

            return errorMessage;
        };

        const ControlledMultiSelect = () => {
            const [selectedValues, setSelectedValues] = React.useState([]);
            return (
                <LabeledField
                    label="Label"
                    validate={validateField}
                    instantValidation={false}
                    field={
                        <MultiSelect
                            selectedValues={selectedValues}
                            onChange={setSelectedValues}
                            onToggle={() => {}}
                        >
                            <OptionItem label="Empty option" value="" />
                            <OptionItem
                                label="Regular milk tea with boba"
                                value="regular"
                            />
                            <OptionItem
                                label="Wintermelon milk tea with boba"
                                value="wintermelon"
                            />
                            <OptionItem
                                label="Taro milk tea, half sugar"
                                value="taro"
                            />
                        </MultiSelect>
                    }
                />
            );
        };

        render(
            <RenderStateRoot>
                <ControlledMultiSelect />
            </RenderStateRoot>,
        );

        // Open the dropdown
        const selectOpener = screen.getByRole("button");
        selectOpener.click();

        // Select an option
        screen.getByRole("option", {name: "Empty option"}).click();

        // Act
        // Close the dropdown
        selectOpener.click();

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });
});

describe("initial value error is displayed on mount", () => {
    it("TextField validation fails", () => {
        // Arrange
        const errorMessage = "Please enter a valid value";
        const invalidValue = "invalid";
        const validate = (value: string) => {
            if (value === invalidValue) {
                return errorMessage;
            }
        };

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validate}
                    field={
                        <TextField
                            id="tf-id"
                            value={invalidValue}
                            onChange={jest.fn()}
                        />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });

    it("SingleSelect validation fails", () => {
        // Arrange
        const errorMessage = "Please select a valid drink";

        const validateField = (value: string) => {
            if (value === "invalid") {
                return errorMessage;
            }
        };

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validateField}
                    field={
                        <SingleSelect
                            onChange={jest.fn()}
                            placeholder="Choose a drink"
                            selectedValue="invalid"
                        >
                            <OptionItem label="Invalid" value="invalid" />
                            <OptionItem
                                label="Regular milk tea with boba"
                                value="regular"
                            />
                            <OptionItem
                                label="Wintermelon milk tea with boba"
                                value="wintermelon"
                            />
                            <OptionItem
                                label="Taro milk tea, half sugar"
                                value="taro"
                            />
                        </SingleSelect>
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });

    it("MultiSelect validation fails", () => {
        // Arrange
        const errorMessage = "Please select more than 1 drink";

        const validateField = (values: Array<string>) => {
            if (values.length > 1) {
                return;
            }

            return errorMessage;
        };

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validateField}
                    field={
                        <MultiSelect
                            onChange={jest.fn()}
                            selectedValues={["regular"]}
                        >
                            <OptionItem label="Invalid" value="invalid" />
                            <OptionItem
                                label="Regular milk tea with boba"
                                value="regular"
                            />
                            <OptionItem
                                label="Wintermelon milk tea with boba"
                                value="wintermelon"
                            />
                            <OptionItem
                                label="Taro milk tea, half sugar"
                                value="taro"
                            />
                        </MultiSelect>
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });
});

describe("Async validation", () => {
    it("TexField is validated asynchronously", async () => {
        // Arrange
        const errorMessage = "Please enter a valid value";
        const invalidValue = "invalid";

        const validate = (value: string) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (value === invalidValue) {
                        resolve(errorMessage);
                    }
                }, 100);
            });
        };

        // Act
        render(
            <RenderStateRoot>
                <LabeledField
                    label="Label"
                    validate={validate}
                    field={
                        <TextField
                            id="tf-id"
                            value={invalidValue}
                            onChange={jest.fn()}
                        />
                    }
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(await screen.findByRole("alert")).toHaveTextContent(
            errorMessage,
        );
    });
});
