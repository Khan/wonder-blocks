// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";
import {StyleSheet} from "aphrodite";

import FieldHeading from "../field-heading.js";
import TextField from "../text-field.js";

describe("FieldHeading", () => {
    it("fieldheading renders the label text", () => {
        // Arrange
        const label = "Label";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={label}
            />,
        );

        // Assert
        expect(wrapper).toIncludeText(label);
    });

    it("fieldheading renders the description text", () => {
        // Arrange
        const description = "Description";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description={description}
            />,
        );

        // Assert
        expect(wrapper).toIncludeText(description);
    });

    it("fieldheading renders the error wrapper always", () => {
        // Arrange
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                testId={testId}
            />,
        );

        // Assert
        const error = wrapper.find(`[data-test-id="${testId}-error"]`);
        expect(error).toExist();
    });

    it("fieldheading renders the error text", () => {
        // Arrange
        const error = "Error";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error={error}
            />,
        );

        // Assert
        expect(wrapper).toIncludeText(error);
    });

    it("fieldheading adds testId to label", () => {
        // Arrange
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                testId={testId}
            />,
        );

        // Assert
        const label = wrapper.find(`[data-test-id="${testId}-label"]`);
        expect(label).toExist();
    });

    it("fieldheading adds testId to description", () => {
        // Arrange
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description="Description"
                testId={testId}
            />,
        );

        // Assert
        const description = wrapper.find(
            `[data-test-id="${testId}-description"]`,
        );
        expect(description).toExist();
    });

    it("fieldheading adds testId to error", () => {
        // Arrange
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                testId={testId}
            />,
        );

        // Assert
        const error = wrapper.find(`[data-test-id="${testId}-error"]`);
        expect(error).toExist();
    });

    it("fieldheading adds the correctly formatted id to label's htmlFor", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                id={id}
                testId={testId}
            />,
        );

        // Assert
        const label = wrapper.find(`[data-test-id="${testId}-label"]`);
        expect(label).toContainMatchingElement(`[htmlFor="${id}-field"]`);
    });

    it("fieldheading adds the correctly formatted id to error's id", () => {
        // Arrange
        const id = "exampleid";
        const testId = "testid";

        // Act
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                id={id}
                testId={testId}
            />,
        );

        // Assert
        const error = wrapper.find(`[data-test-id="${testId}-error"]`);
        expect(error).toContainMatchingElement(`[id="${id}-error"]`);
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
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error="Error"
                style={styles.style1}
            />,
        );

        // Assert
        const container = wrapper.find("View").at(0);
        expect(container).toHaveStyle(styles.style1);
    });
});
