import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import {StyleSheet} from "aphrodite";

import {I18nInlineMarkup} from "@khanacademy/wonder-blocks-i18n";
import {Body} from "@khanacademy/wonder-blocks-typography";

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
    const error = "Error message";
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
        const error = "Error";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error={error}
            />,
            defaultOptions,
        );

        // Assert
        expect(screen.getByText(error)).toBeInTheDocument();
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
                error="Error"
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
                error="Error"
                style={styles.style1}
            />,
            defaultOptions,
        );

        // Assert
        const labeledField = container.childNodes[0];
        expect(labeledField).toHaveStyle("background: blue");
    });

    it("should render a LabelMedium when the 'label' prop is a I18nInlineMarkup", () => {
        // Arrange

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={
                    <I18nInlineMarkup b={(s: string) => <b>{s}</b>}>
                        {"<b>Test</b> Hello, world!"}
                    </I18nInlineMarkup>
                }
            />,
            defaultOptions,
        );

        // Assert
        const label = screen.getByText("Hello, world!");
        // LabelMedium has a font-size of 16px
        expect(label).toHaveStyle("font-size: 16px");
    });

    it("should render a LabelSmall when the 'description' prop is a I18nInlineMarkup", () => {
        // Arrange

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={<Body>Hello, world</Body>}
                description={
                    <I18nInlineMarkup b={(s: string) => <b>{s}</b>}>
                        {"<b>Test</b> description"}
                    </I18nInlineMarkup>
                }
            />,
            defaultOptions,
        );

        // Assert
        const description = screen.getByText("description");
        // LabelSmall has a font-size of 16px
        expect(description).toHaveStyle("font-size: 14px");
    });

    describe("Labels prop", () => {
        it("should use the errorIconAriaLabel for the error icon aria label", () => {
            // Arrange
            const errorIconAriaLabel = "Placeholder for translated aria label";
            render(
                <LabeledField
                    field={<TextField value="" onChange={() => {}} />}
                    label="Label"
                    error="Error message"
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
                    error="Error message"
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
                            error={error}
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
                            error={error}
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
                            error={error}
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
                        const el = screen.getByText(error).parentElement;
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
                            error={error}
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
                        error="Error message"
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
                const error = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        error={error}
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
                const error = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        error={error}
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
                const error = "Error message";
                render(
                    <LabeledField
                        field={<TextField value="" onChange={() => {}} />}
                        label="Label"
                        error={error}
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
});
