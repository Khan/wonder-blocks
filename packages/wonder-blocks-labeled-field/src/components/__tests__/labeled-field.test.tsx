import * as React from "react";
import {render, screen, within} from "@testing-library/react";

import {TextField} from "@khanacademy/wonder-blocks-form";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {userEvent} from "@testing-library/user-event";
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
    const readOnlyMessage = "Read only message";
    const additionalHelperMessage = "Additional helper message";

    const getLabel = () => screen.getByText(label);
    const getDescription = () => screen.getByText(description);
    const getField = () => screen.getByRole("textbox");
    const getError = () => screen.getByTestId("test-id-error");
    const getReadOnlyMessage = () =>
        screen.getByTestId("test-id-read-only-message");
    const getAdditionalHelperMessage = () =>
        screen.getByText(additionalHelperMessage);

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

    it("LabeledField renders the read only message text", () => {
        // Arrange
        const readOnlyMessage = "Read only message";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage={readOnlyMessage}
            />,
            defaultOptions,
        );

        // Assert
        expect(screen.getByText(readOnlyMessage)).toBeInTheDocument();
    });

    it("LabeledField renders the read only message text even if there is an error message and additional helper message", () => {
        // Arrange
        const readOnlyMessage = "Read only message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage={readOnlyMessage}
                errorMessage="Error message"
                additionalHelperMessage="Additional helper message"
            />,
            defaultOptions,
        );

        // Act
        const readOnlyMessageEl = screen.getByText(readOnlyMessage);

        // Assert
        expect(readOnlyMessageEl).toBeInTheDocument();
    });

    it("LabeledField renders the error message text if there is also a read only message and additional helper message", () => {
        // Arrange
        const errorMessage = "Error message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage="Read only message"
                errorMessage={errorMessage}
                additionalHelperMessage="Additional helper message"
            />,
            defaultOptions,
        );

        // Act
        const errorMessageEl = screen.getByText(errorMessage);

        // Assert
        expect(errorMessageEl).toBeInTheDocument();
    });

    it("renders the additional helper message text", () => {
        // Arrange
        const additionalHelperMessage = "Additional helper message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                additionalHelperMessage={additionalHelperMessage}
            />,
            defaultOptions,
        );

        // Act
        const additionalHelperMessageEl = screen.getByText(
            additionalHelperMessage,
        );

        // Assert
        expect(additionalHelperMessageEl).toBeInTheDocument();
    });

    it("renders the additional helper message text even if there is an error message and read only message", () => {
        // Arrange
        const additionalHelperMessage = "Additional helper message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                additionalHelperMessage={additionalHelperMessage}
                errorMessage="Error message"
                readOnlyMessage="Read only message"
            />,
            defaultOptions,
        );

        // Act
        const additionalHelperMessageEl = screen.getByText(
            additionalHelperMessage,
        );

        // Assert
        expect(additionalHelperMessageEl).toBeInTheDocument();
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

        it("Should set an aria-label on the read only icon if provided", () => {
            // Arrange
            const readOnlyIconAriaLabel = "Aria label for read only icon";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    readOnlyMessage="Read only message"
                    labels={{readOnlyIconAriaLabel}}
                />,
                defaultOptions,
            );

            // Act
            const readOnlyIcon = screen.getByRole("img", {
                name: readOnlyIconAriaLabel,
            });

            // Assert
            expect(readOnlyIcon).toHaveAttribute(
                "aria-label",
                readOnlyIconAriaLabel,
            );
        });
    });

    describe("Attributes", () => {
        describe("id", () => {
            it.each([
                ["label", `${id}-label`, getLabel],
                ["description", `${id}-description`, getDescription],
                ["field", `${id}-field`, getField],
                ["error", `${id}-error`, getError],
                [
                    "read only message",
                    `${id}-read-only-message`,
                    getReadOnlyMessage,
                ],
                [
                    "additional helper message",
                    `${id}-additional-helper-message`,
                    getAdditionalHelperMessage,
                ],
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
                            readOnlyMessage={readOnlyMessage}
                            additionalHelperMessage={additionalHelperMessage}
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
                ["read only message", "-read-only-message", getReadOnlyMessage],
                [
                    "additional helper message",
                    "-additional-helper-message",
                    getAdditionalHelperMessage,
                ],
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
                            readOnlyMessage={readOnlyMessage}
                            additionalHelperMessage={additionalHelperMessage}
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
                [
                    "read only message",
                    `${testId}-read-only-message`,
                    getReadOnlyMessage,
                ],
                [
                    "additional helper message",
                    `${testId}-additional-helper-message`,
                    getAdditionalHelperMessage,
                ],
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
                            readOnlyMessage={readOnlyMessage}
                            additionalHelperMessage={additionalHelperMessage}
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
                [
                    "read only message",
                    () => {
                        // In order to get the read read only message section (icon + message)
                        // without using testId, we get the parent of the read only
                        // text
                        const el =
                            // eslint-disable-next-line testing-library/no-node-access
                            screen.getByText(readOnlyMessage).parentElement;
                        if (!el) {
                            throw Error(
                                "Read only message section in LabeledField not found",
                            );
                        }
                        return el;
                    },
                ],
                ["additional helper message", getAdditionalHelperMessage],
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
                            readOnlyMessage={readOnlyMessage}
                            additionalHelperMessage={additionalHelperMessage}
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

            it("should have no accessibility violations if the helper text props are set", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        description="Description for the field"
                        readOnlyMessage="Read only message"
                        additionalHelperMessage="Additional helper message"
                        errorMessage="Error message"
                    />,
                    defaultOptions,
                );

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

            it("Should set aria-describedby on the field to the id of the read only message", () => {
                // Arrange
                const readOnlyMessage = "Read only message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        readOnlyMessage={readOnlyMessage}
                        testId="labeled-field"
                    />,
                    defaultOptions,
                );

                // Act
                const readOnlyMessageEl = screen.getByTestId(
                    "labeled-field-read-only-message",
                );
                const inputEl = screen.getByRole("textbox");

                // Assert
                expect(inputEl).toHaveAttribute(
                    "aria-describedby",
                    readOnlyMessageEl.id,
                );
            });

            it("Should set aria-describedby on the field to the id of the additional helper message", () => {
                // Arrange
                const additionalHelperMessage = "Additional helper message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        additionalHelperMessage={additionalHelperMessage}
                    />,
                    defaultOptions,
                );

                // Act
                const additionalHelperMessageEl = screen.getByText(
                    additionalHelperMessage,
                );
                const inputEl = screen.getByRole("textbox");

                // Assert
                expect(inputEl).toHaveAttribute(
                    "aria-describedby",
                    additionalHelperMessageEl.id,
                );
            });

            it("Should support multiple aria-describedby attributes on the field", () => {
                // Arrange
                const readOnlyMessage = "Read only message";
                const errorMessage = "Error message";
                const description = "Description of the field";
                const id = "example-id";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        readOnlyMessage={readOnlyMessage}
                        errorMessage={errorMessage}
                        description={description}
                        additionalHelperMessage="Additional helper message"
                        id={id}
                    />,
                    defaultOptions,
                );

                // Act
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute(
                    "aria-describedby",
                    [
                        `${id}-description`,
                        `${id}-additional-helper-message`,
                        `${id}-read-only-message`,
                        `${id}-error`,
                    ].join(" "),
                );
            });

            it("Should have no aria-describedby values on the field if there is no helper text for the field", () => {
                // Arrange
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                    />,
                    defaultOptions,
                );

                // Act
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute("aria-describedby", "");
            });
        });
    });

    describe("Field", () => {
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

    describe("Read Only", () => {
        it("Should set the readOnly prop on the field if the readOnlyMessage prop is set", () => {
            // Arrange
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    readOnlyMessage="Read only message"
                />,
                defaultOptions,
            );

            // Act
            const field = screen.getByRole("textbox");

            // Assert
            expect(field).toHaveAttribute("readOnly");
        });

        it("Should not set the readOnly prop on the field if the readOnlyMessage prop is not set", () => {
            // Arrange
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                />,
                defaultOptions,
            );

            // Act
            const field = screen.getByRole("textbox");

            // Assert
            expect(field).not.toHaveAttribute("readOnly");
        });

        it("Should persist the readOnly attribute on the field if it is set on the field", () => {
            // Arrange
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} readOnly />}
                    label="Label"
                />,
                defaultOptions,
            );

            // Act
            const field = screen.getByRole("textbox");

            // Assert
            expect(field).toHaveAttribute("readOnly");
        });
    });
});
