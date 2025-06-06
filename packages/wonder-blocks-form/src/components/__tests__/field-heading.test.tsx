import * as React from "react";
import {render, screen} from "@testing-library/react";
import {StyleSheet} from "aphrodite";

import FieldHeading from "../field-heading";
import TextField from "../text-field";

describe("FieldHeading", () => {
    it("fieldheading renders the label text", () => {
        // Arrange
        const label = "Label";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={label}
            />,
        );

        // Assert
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("fieldheading renders the description text", () => {
        // Arrange
        const description = "Description";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description={description}
            />,
        );

        // Assert
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("fieldheading renders the error text", () => {
        // Arrange
        const error = "Error";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error={error}
            />,
        );

        // Assert
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("fieldheading adds testId to label", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                testId={testId}
            />,
        );

        // Assert
        const label = screen.getByTestId(`${testId}-label`);
        expect(label).toBeInTheDocument();
    });

    it("fieldheading adds testId to description", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description="Description"
                testId={testId}
            />,
        );

        // Assert
        const description = screen.getByTestId(`${testId}-description`);
        expect(description).toBeInTheDocument();
    });

    it("fieldheading adds testId to error", () => {
        // Arrange
        const testId = "testid";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                testId={testId}
            />,
        );

        // Assert
        const error = screen.getByTestId(`${testId}-error`);
        expect(error).toBeInTheDocument();
    });

    it("fieldheading adds the correctly formatted id to label's htmlFor", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                id={id}
                testId={testId}
            />,
        );

        // Assert
        const label = screen.getByTestId(`${testId}-label`);
        expect(label).toHaveAttribute("for", `${id}-field`);
    });

    it("fieldheading adds the correctly formatted id to error's id", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                id={id}
                testId={testId}
            />,
        );

        // Assert
        const error = screen.getByRole("alert");
        expect(error).toHaveAttribute("id", `${id}-error`);
    });

    it("stype prop applies to the fieldheading container", () => {
        // Arrange
        const styles = StyleSheet.create({
            style1: {
                flexGrow: 1,
                background: "blue",
            },
        });

        // Act
        const {container} = render(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                style={styles.style1}
            />,
        );

        // Assert
        const fieldHeading = container.childNodes[0];
        expect(fieldHeading).toHaveStyle("background: blue");
    });
});
