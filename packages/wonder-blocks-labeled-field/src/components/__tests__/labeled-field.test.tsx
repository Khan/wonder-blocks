/* eslint-disable max-lines */
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
    const elementBeforeFieldStart = "Before field start helper text";
    const elementBeforeFieldEnd = "Before field end helper text";
    const elementAfterFieldStart = "After field start helper text";
    const elementAfterFieldEnd = "After field end helper text";

    const getLabel = () => screen.getByText(label);
    const getDescription = () => screen.getByText(description);
    const getField = () => screen.getByRole("textbox");
    const getError = () => screen.getByTestId("test-id-error");
    const getReadOnlyMessage = () =>
        screen.getByTestId("test-id-read-only-message");
    const getElementBeforeFieldStart = () =>
        screen.getByText(elementBeforeFieldStart);
    const getElementBeforeFieldEnd = () =>
        screen.getByText(elementBeforeFieldEnd);
    const getElementAfterFieldStart = () =>
        screen.getByText(elementAfterFieldStart);
    const getElementAfterFieldEnd = () =>
        screen.getByText(elementAfterFieldEnd);

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

    it("LabeledField renders the read only message text if there is an error message", () => {
        // Arrange
        const readOnlyMessage = "Read only message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage={readOnlyMessage}
                errorMessage="Error message"
            />,
            defaultOptions,
        );

        // Act
        const readOnlyMessageEl = screen.getByText(readOnlyMessage);

        // Assert
        expect(readOnlyMessageEl).toBeInTheDocument();
    });

    it("LabeledField renders the error message text if there is also a read only message", () => {
        // Arrange
        const readOnlyMessage = "Read only message";
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage={readOnlyMessage}
                errorMessage="Error message"
            />,
            defaultOptions,
        );

        // Act
        const errorMessageEl = screen.getByText(errorMessage);

        // Assert
        expect(errorMessageEl).toBeInTheDocument();
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

    it("LabeledField adds testId to read only message", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                readOnlyMessage="Read only message"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const readOnlyMessage = screen.getByTestId(
            `${testId}-read-only-message`,
        );
        expect(readOnlyMessage).toBeInTheDocument();
    });

    it("LabeledField adds testId to elementBeforeFieldStart", () => {
        // Arrange
        const testId = "testid";
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
                elementBeforeFieldStart="Helper text"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const elementBeforeFieldStart = screen.getByTestId(
            `${testId}-element-before-field-start`,
        );
        expect(elementBeforeFieldStart).toBeInTheDocument();
    });

    it("LabeledField adds testId to elementBeforeFieldEnd", () => {
        // Arrange
        const testId = "testid";
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
                elementBeforeFieldEnd="Helper text"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const elementBeforeFieldEnd = screen.getByTestId(
            `${testId}-element-before-field-end`,
        );
        expect(elementBeforeFieldEnd).toBeInTheDocument();
    });

    it("LabeledField adds testId to elementAfterFieldStart", () => {
        // Arrange
        const testId = "testid";
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
                elementAfterFieldStart="Helper text"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const elementAfterFieldStart = screen.getByTestId(
            `${testId}-element-after-field-start`,
        );
        expect(elementAfterFieldStart).toBeInTheDocument();
    });

    it("LabeledField adds testId to elementAfterFieldEnd", () => {
        // Arrange
        const testId = "testid";
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
                elementAfterFieldEnd="Helper text"
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const elementAfterFieldEnd = screen.getByTestId(
            `${testId}-element-after-field-end`,
        );
        expect(elementAfterFieldEnd).toBeInTheDocument();
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
            const readOnlyAriaLabel = "Aria label for read only icon";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    readOnlyMessage="Read only message"
                    labels={{readOnlyAriaLabel}}
                />,
                defaultOptions,
            );

            // Act
            const readOnlyIcon = screen.getByRole("img", {
                name: readOnlyAriaLabel,
            });

            // Assert
            expect(readOnlyIcon).toHaveAttribute(
                "aria-label",
                readOnlyAriaLabel,
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
                    "elementBeforeFieldStart",
                    `${id}-element-before-field-start`,
                    getElementBeforeFieldStart,
                ],
                [
                    "elementBeforeFieldEnd",
                    `${id}-element-before-field-end`,
                    getElementBeforeFieldEnd,
                ],
                [
                    "elementAfterFieldStart",
                    `${id}-element-after-field-start`,
                    getElementAfterFieldStart,
                ],
                [
                    "elementAfterFieldEnd",
                    `${id}-element-after-field-end`,
                    getElementAfterFieldEnd,
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
                            elementBeforeFieldStart={elementBeforeFieldStart}
                            elementBeforeFieldEnd={elementBeforeFieldEnd}
                            elementAfterFieldStart={elementAfterFieldStart}
                            elementAfterFieldEnd={elementAfterFieldEnd}
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
                    "elementBeforeFieldStart",
                    "-element-before-field-start",
                    getElementBeforeFieldStart,
                ],
                [
                    "elementBeforeFieldEnd",
                    "-element-before-field-end",
                    getElementBeforeFieldEnd,
                ],
                [
                    "elementAfterFieldStart",
                    "-element-after-field-start",
                    getElementAfterFieldStart,
                ],
                [
                    "elementAfterFieldEnd",
                    "-element-after-field-end",
                    getElementAfterFieldEnd,
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
                            elementBeforeFieldStart={elementBeforeFieldStart}
                            elementBeforeFieldEnd={elementBeforeFieldEnd}
                            elementAfterFieldStart={elementAfterFieldStart}
                            elementAfterFieldEnd={elementAfterFieldEnd}
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
                    "elementBeforeFieldStart",
                    `${testId}-element-before-field-start`,
                    getElementBeforeFieldStart,
                ],
                [
                    "elementBeforeFieldEnd",
                    `${testId}-element-before-field-end`,
                    getElementBeforeFieldEnd,
                ],
                [
                    "elementAfterFieldStart",
                    `${testId}-element-after-field-start`,
                    getElementAfterFieldStart,
                ],
                [
                    "elementAfterFieldEnd",
                    `${testId}-element-after-field-end`,
                    getElementAfterFieldEnd,
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
                            elementBeforeFieldStart={elementBeforeFieldStart}
                            elementBeforeFieldEnd={elementBeforeFieldEnd}
                            elementAfterFieldStart={elementAfterFieldStart}
                            elementAfterFieldEnd={elementAfterFieldEnd}
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
                        // In order to get the read error message section (icon + message)
                        // without using testId, we get the parent of the read error
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
                ["elementBeforeFieldStart", getElementBeforeFieldStart],
                ["elementBeforeFieldEnd", getElementBeforeFieldEnd],
                ["elementAfterFieldStart", getElementAfterFieldStart],
                ["elementAfterFieldEnd", getElementAfterFieldEnd],
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
                            elementBeforeFieldStart={elementBeforeFieldStart}
                            elementBeforeFieldEnd={elementBeforeFieldEnd}
                            elementAfterFieldStart={elementAfterFieldStart}
                            elementAfterFieldEnd={elementAfterFieldEnd}
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

            it("should have no accessibility violations if the readOnlyMessage prop is set", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        readOnlyMessage="Read only message"
                    />,
                    defaultOptions,
                );

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
                        elementBeforeFieldStart="Start helper text"
                        elementBeforeFieldEnd="End helper text"
                        elementAfterFieldStart="Start helper text"
                        elementAfterFieldEnd="End helper text"
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
                        id={id}
                        elementBeforeFieldStart="Start helper text"
                        elementBeforeFieldEnd="End helper text"
                        elementAfterFieldStart="Start helper text"
                        elementAfterFieldEnd="End helper text"
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
                        `${id}-error`,
                        `${id}-read-only-message`,
                        `${id}-element-before-field-start`,
                        `${id}-element-before-field-end`,
                        `${id}-element-after-field-start`,
                        `${id}-element-after-field-end`,
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

            it("Should set aria-describedby on the field to the id of the elementBeforeFieldStart", () => {
                // Arrange
                const elementBeforeFieldStart = "Helper text";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        elementBeforeFieldStart={elementBeforeFieldStart}
                    />,
                    defaultOptions,
                );

                // Act
                const elementBeforeFieldStartEl = screen.getByText(
                    elementBeforeFieldStart,
                );
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute(
                    "aria-describedby",
                    elementBeforeFieldStartEl.id,
                );
            });

            it("Should set aria-describedby on the field to the id of the elementBeforeFieldEnd", () => {
                // Arrange
                const elementBeforeFieldEnd = "Helper text";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        elementBeforeFieldEnd={elementBeforeFieldEnd}
                    />,
                    defaultOptions,
                );

                // Act
                const elementBeforeFieldEndEl = screen.getByText(
                    elementBeforeFieldEnd,
                );
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute(
                    "aria-describedby",
                    elementBeforeFieldEndEl.id,
                );
            });

            it("Should set aria-describedby on the field to the id of the elementAfterFieldStart", () => {
                // Arrange
                const elementAfterFieldStart = "Helper text";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        elementAfterFieldStart={elementAfterFieldStart}
                    />,
                    defaultOptions,
                );

                // Act
                const elementAfterFieldStartEl = screen.getByText(
                    elementAfterFieldStart,
                );
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute(
                    "aria-describedby",
                    elementAfterFieldStartEl.id,
                );
            });

            it("Should set aria-describedby on the field to the id of the elementAfterFieldEnd", () => {
                // Arrange
                const elementAfterFieldEnd = "Helper text";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        elementAfterFieldEnd={elementAfterFieldEnd}
                    />,
                    defaultOptions,
                );

                // Act
                const elementAfterFieldEndEl =
                    screen.getByText(elementAfterFieldEnd);
                const field = screen.getByRole("textbox");

                // Assert
                expect(field).toHaveAttribute(
                    "aria-describedby",
                    elementAfterFieldEndEl.id,
                );
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

    describe("Custom required message", () => {
        it("should show the custom required message if it is set on the field", async () => {
            // Arrange
            const requiredMessage = "Custom required message";

            const ControlledLabeledFieldWithTextField = () => {
                const [value, setValue] = React.useState("T");
                const [errorMessage, setErrorMessage] = React.useState<
                    string | null
                >();
                return (
                    <LabeledField
                        field={
                            <TextField
                                value={value}
                                onChange={setValue}
                                onValidate={setErrorMessage}
                                required={requiredMessage}
                            />
                        }
                        label="Label"
                        errorMessage={errorMessage}
                    />
                );
            };
            render(<ControlledLabeledFieldWithTextField />, defaultOptions);
            const field = await screen.findByRole("textbox");

            // Act
            await userEvent.type(field, "{backspace}");

            // Assert
            await screen.findByText(requiredMessage);
        });

        it("should show the custom required message if it is set on LabeledField", async () => {
            // Arrange
            const requiredMessage = "Custom required message";

            const ControlledLabeledFieldWithTextField = () => {
                const [value, setValue] = React.useState("T");
                const [errorMessage, setErrorMessage] = React.useState<
                    string | null
                >();
                return (
                    <LabeledField
                        field={
                            <TextField
                                value={value}
                                onChange={setValue}
                                onValidate={setErrorMessage}
                            />
                        }
                        required={requiredMessage}
                        label="Label"
                        errorMessage={errorMessage}
                    />
                );
            };
            render(<ControlledLabeledFieldWithTextField />, defaultOptions);
            const field = await screen.findByRole("textbox");

            // Act
            await userEvent.type(field, "{backspace}");

            // Assert
            await screen.findByText(requiredMessage);
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

    describe("Helper text", () => {
        it("Should render the elementBeforeFieldStart prop if it is provided", () => {
            // Arrange
            const elementBeforeFieldStart = "Helper text";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    elementBeforeFieldStart={elementBeforeFieldStart}
                />,
                defaultOptions,
            );

            // Act
            const elementBeforeFieldStartEl = screen.getByText(
                elementBeforeFieldStart,
            );

            // Assert
            expect(elementBeforeFieldStartEl).toBeInTheDocument();
        });

        it("Should render the elementBeforeFieldEnd prop if it is provided", () => {
            // Arrange
            const elementBeforeFieldEnd = "Helper text";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    elementBeforeFieldEnd={elementBeforeFieldEnd}
                />,
                defaultOptions,
            );

            // Act
            const elementBeforeFieldEndEl = screen.getByText(
                elementBeforeFieldEnd,
            );

            // Assert
            expect(elementBeforeFieldEndEl).toBeInTheDocument();
        });

        it("Should render the elementAfterFieldStart prop if it is provided", () => {
            // Arrange
            const elementAfterFieldStart = "Helper text";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    elementAfterFieldStart={elementAfterFieldStart}
                />,
                defaultOptions,
            );

            // Act
            const elementAfterFieldStartEl = screen.getByText(
                elementAfterFieldStart,
            );

            // Assert
            expect(elementAfterFieldStartEl).toBeInTheDocument();
        });

        it("Should render the elementAfterFieldEnd prop if it is provided", () => {
            // Arrange
            const elementAfterFieldEnd = "Helper text";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    elementAfterFieldEnd={elementAfterFieldEnd}
                />,
                defaultOptions,
            );

            // Act
            const elementAfterFieldEndEl =
                screen.getByText(elementAfterFieldEnd);

            // Assert
            expect(elementAfterFieldEndEl).toBeInTheDocument();
        });
    });
});
