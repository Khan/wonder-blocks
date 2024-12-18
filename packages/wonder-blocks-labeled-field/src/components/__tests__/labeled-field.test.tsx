import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import {StyleSheet} from "aphrodite";

import {TextField} from "@khanacademy/wonder-blocks-form";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import LabeledField from "../labeled-field";

const defaultOptions = {
    wrapper: RenderStateRoot,
};

describe("LabeledField", () => {
    const id = "example-id";
    const label = "Label";
    const description = "Description of the field";
    const errorMessage = "Error message";
    const testId = "test-id";

    const getLabel = () => screen.getByText(label);
    const getDescription = () => screen.getByText(description);
    const getField = () => screen.getByRole("textbox");
    const getError = () => screen.getByTestId("test-id-error");

    it("LabeledField renders the label text", () => {
        // Arrange
        const label = "Label";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={label}
            />,
            defaultOptions,
        );

        // Assert
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("LabeledField renders the description text", () => {
        // Arrange
        const description = "Description";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description={description}
            />,
            defaultOptions,
        );

        // Assert
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("LabeledField renders the error text", () => {
        // Arrange
        const errorMessage = "Error";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                errorMessage={errorMessage}
            />,
            defaultOptions,
        );

        // Assert
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("LabeledField adds testId to label", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const label = screen.getByTestId(`${testId}-label`);
        expect(label).toBeInTheDocument();
    });

    it("LabeledField adds testId to description", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description="Description"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const description = screen.getByTestId(`${testId}-description`);
        expect(description).toBeInTheDocument();
    });

    it("LabeledField adds testId to error", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                errorMessage="Error"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const error = screen.getByTestId(`${testId}-error`);
        expect(error).toBeInTheDocument();
    });

    it("stype prop applies to the LabeledField container", () => {
        // Arrange
        const styles = StyleSheet.create({
            style1: {
                flexGrow: 1,
                background: "blue",
            },
        });

        // Act
        const {container} = render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                errorMessage="Error"
                style={styles.style1}
            />,
            defaultOptions,
        );

        // Assert
        const labeledField = container.childNodes[0];
        expect(labeledField).toHaveStyle("background: blue");
    });

    describe("Labels prop", () => {
        it("should use the errorIconAriaLabel for the error icon aria label", () => {
            // Arrange
            const errorIconAriaLabel = "Placeholder for translated aria label";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    errorMessage="Error message"
                    labels={{errorIconAriaLabel}}
                />,
                defaultOptions,
            );

            // Act
            const errorIcon = screen.getByRole("img");

            // Assert
            expect(errorIcon).toHaveAttribute("aria-label", errorIconAriaLabel);
        });

        it("should use a default aria-label on the error icon if the errorIconAriaLabel is not provided", () => {
            // Arrange
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    errorMessage="Error message"
                    testId="labeled-field"
                />,
                defaultOptions,
            );

            // Act
            // Get the icon within the error section
            const error = screen.getByTestId("labeled-field-error");
            const errorIcon = within(error).getByRole("img");

            // Assert
            expect(errorIcon).toHaveAttribute("aria-label", "Error:");
        });
    });

    describe("Attributes", () => {
        describe("id", () => {
            it.each([
                ["label", `${id}-label`, getLabel],
                ["description", `${id}-description`, getDescription],
                ["field", `${id}-field`, getField],
                ["error", `${id}-error`, getError],
            ])(
                "should have the id for the %s element set to %s",
                (
                    _elementType: string, // unused directly but is used for the test name using %s
                    expectedId: string,
                    getElement: () => HTMLElement,
                ) => {
                    // Arrange
                    render(
                        <LabeledField
                            field={<TextField value="" onChange={() => {}} />}
                            id={id}
                            label={label}
                            description={description}
                            errorMessage={errorMessage}
                            testId={testId}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const el = getElement();

                    // Assert
                    expect(el.id).toBe(expectedId);
                },
            );

            it.each([
                ["label", "-label", getLabel],
                ["description", "-description", getDescription],
                ["field", "-field", getField],
                ["error", "-error", getError],
            ])(
                "should have an auto-generated id for the %s element that ends with %s",
                (
                    _elementType: string, // unused directly but is used for the test name using %s
                    expectedPostfix: string,
                    getElement: () => HTMLElement,
                ) => {
                    // Arrange
                    render(
                        <LabeledField
                            field={<TextField value="" onChange={() => {}} />}
                            label={label}
                            description={description}
                            errorMessage={errorMessage}
                            testId={testId}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const el = getElement();

                    // Assert
                    expect(el.id).toEndWith(expectedPostfix);
                },
            );
        });

        describe("testId", () => {
            it.each([
                ["label", `${testId}-label`, getLabel],
                ["description", `${testId}-description`, getDescription],
                ["field", `${testId}-field`, getField],
                ["error", `${testId}-error`, getError],
            ])(
                "should use the testId prop to set the %s element's data-testid attribute to %s",
                (
                    _elementType: string, // unused directly but is used for the test name using %s
                    expectedTestId: string,
                    getElement: () => HTMLElement,
                ) => {
                    // Arrange
                    render(
                        <LabeledField
                            field={<TextField value="" onChange={() => {}} />}
                            testId={testId}
                            label={label}
                            description={description}
                            errorMessage={errorMessage}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const el = getElement();

                    // Assert
                    expect(el).toHaveAttribute("data-testid", expectedTestId);
                },
            );

            it.each([
                ["label", getLabel],
                ["description", getDescription],
                ["field", getField],
                [
                    "error",
                    () => {
                        // In order to get the error section (icon + message)
                        // without using testId, we get the parent of the error
                        // text
                        // eslint-disable-next-line testing-library/no-node-access
                        const el = screen.getByText(errorMessage).parentElement;
                        if (!el) {
                            throw Error(
                                "Error section in LabeledField not found",
                            );
                        }
                        return el;
                    },
                ],
            ])(
                "should not set the data-testid attribute on the %s element if the testId prop is not set",
                (
                    _elementType: string, // unused directly but is used for the test name using %s
                    getElement: () => HTMLElement,
                ) => {
                    // Arrange
                    render(
                        <LabeledField
                            field={<TextField value="" onChange={() => {}} />}
                            label={label}
                            description={description}
                            errorMessage={errorMessage}
                        />,
                        defaultOptions,
                    );

                    // Act
                    const el = getElement();

                    // Assert
                    expect(el).not.toHaveAttribute("data-testid");
                },
            );
        });

        it("should persist original attributes on the field if it is not overridden", () => {
            // Arrange
            render(
                <LabeledField
                    field={
                        <TextField
                            value=""
                            onChange={() => {}}
                            name="name-example"
                        />
                    }
                    label="Label"
                />,
                defaultOptions,
            );

            // Act
            const fieldEl = screen.getByRole("textbox");

            // Assert
            expect(fieldEl).toHaveAttribute("name", "name-example");
        });
    });

    describe("Accessibility", () => {
        describe("Axe", () => {
            it("should have no accessibility violations", async () => {
                // Arrange
                const {container} = render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        description="Description for the field"
                        errorMessage="Error message"
                    />,
                    defaultOptions,
                );
                // Act

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
        describe("ARIA", () => {
            it("should render a label tag with the for attribute set to the id of the field", () => {
                // Arrange
                const label = "Label";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label={label}
                    />,
                    defaultOptions,
                );

                // Act
                const labelEl = screen.getByText(label);
                const inputEl = screen.getByRole("textbox");

                // Assert
                expect(labelEl).toHaveAttribute("for", inputEl.id);
            });

            it("should set aria-describedby on the field to the id of the description", () => {
                // Arrange
                const description = "Description of the field";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        description={description}
                    />,
                    defaultOptions,
                );

                // Act
                const descriptionEl = screen.getByText(description);
                const inputEl = screen.getByRole("textbox");

                // Assert
                expect(inputEl).toHaveAttribute(
                    "aria-describedby",
                    descriptionEl.id,
                );
            });

            it("should set the aria-describedby on the field to the id of the error section", () => {
                // Arrange
                const errorMessage = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        errorMessage={errorMessage}
                        testId="labeled-field"
                    />,
                    defaultOptions,
                );

                // Act
                const errorSectionEl = screen.getByTestId(
                    "labeled-field-error",
                );
                const inputEl = getField();

                // Assert
                expect(inputEl).toHaveAttribute(
                    "aria-describedby",
                    errorSectionEl.id,
                );
            });

            it("should have aria-live=assertive set on the error section", () => {
                // Arrange
                const errorMessage = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        errorMessage={errorMessage}
                        testId="labeled-field"
                    />,
                    defaultOptions,
                );

                // Act
                const errorSectionEl = screen.getByTestId(
                    "labeled-field-error",
                );

                // Assert
                expect(errorSectionEl).toHaveAttribute(
                    "aria-live",
                    "assertive",
                );
            });

            it("should have aria-atomic=true set on the error section", () => {
                // Arrange
                const errorMessage = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        errorMessage={errorMessage}
                        testId="labeled-field"
                    />,
                    defaultOptions,
                );

                // Act
                const errorSectionEl = screen.getByTestId(
                    "labeled-field-error",
                );

                // Assert
                expect(errorSectionEl).toHaveAttribute("aria-atomic", "true");
            });
        });
    });

    describe("Field", () => {
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
            "should set aria-required to $ariaRequired on the field if LabeledField has the required set to $required",
            ({required, ariaRequired}) => {
                // Arrange
                // Act
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        required={required}
                        label="Label"
                    />,
                    defaultOptions,
                );

                // Assert
                expect(screen.getByRole("textbox")).toHaveAttribute(
                    "aria-required",
                    ariaRequired,
                );
            },
        );

        it("should set aria-invalid on the field if LabeledField has the errorMessage prop", () => {
            // Arrange
            // Act
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    errorMessage="Error"
                    label="Label"
                />,
                defaultOptions,
            );

            // Assert
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "aria-invalid",
                "true",
            );
        });

        describe("Using props set on field", () => {
            it("should set the required indicator if the field has the required prop set", async () => {
                // Arrange
                // Act
                render(
                    <LabeledField
                        field={
                            <TextField
                                value=""
                                onChange={() => {}}
                                required="Required msg"
                            />
                        }
                        label="Label"
                    />,
                    defaultOptions,
                );

                // Assert
                await screen.findByLabelText("Label *");
            });

            it("should still set the field as required if it is set on the field and not LabeledField", () => {
                // Arrange
                // Act
                render(
                    <LabeledField
                        field={
                            <TextField
                                value=""
                                onChange={() => {}}
                                required="Required msg"
                            />
                        }
                        label="Label"
                    />,
                    defaultOptions,
                );

                // Assert
                expect(screen.getByRole("textbox")).toHaveAttribute(
                    "aria-required",
                    "true",
                );
            });

            it("should still use the field's error prop if it is not set on LabeledField", () => {
                // Arrange
                // Act
                render(
                    <LabeledField
                        field={
                            <TextField
                                value=""
                                onChange={() => {}}
                                error={true}
                            />
                        }
                        label="Label"
                    />,
                    defaultOptions,
                );

                // Assert
                expect(screen.getByRole("textbox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });
        });
    });
});
