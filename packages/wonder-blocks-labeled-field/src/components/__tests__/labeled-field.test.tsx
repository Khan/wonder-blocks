import * as React from "react";
import {render, screen} from "@testing-library/react";
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
        expect(screen.getByRole("alert")).toBeInTheDocument();
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

    it("LabeledField adds the correctly formatted id to label's htmlFor", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                id={id}
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const label = screen.getByTestId(`${testId}-label`);
        expect(label).toHaveAttribute("for", `${id}-field`);
    });

    it("LabeledField adds the correctly formatted id to error's id", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        render(
            <LabeledField
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                id={id}
                testId={testId}
            />,
            defaultOptions,
        );

        // Assert
        const error = screen.getByRole("alert");
        expect(error).toHaveAttribute("id", `${id}-error`);
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
});
