// @flow
import * as React from "react";
import {mount} from "enzyme";

import FieldHeading from "../field-heading.js";
import TextField from "../text-field.js";

describe("FieldHeading", () => {
    it("fieldheading renders the label text", () => {
        // Arrange
        const label = "Label";
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label={label}
            />,
        );

        // Act

        // Assert
        expect(wrapper).toIncludeText(label);
    });

    it("fieldheading renders the description text", () => {
        // Arrange
        const description = "Description";
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                description={description}
            />,
        );

        // Act

        // Assert
        expect(wrapper).toIncludeText(description);
    });

    it("fieldheading renders the error text", () => {
        // Arrange
        const error = "Error";
        const wrapper = mount(
            <FieldHeading
                field={<TextField id="tf-1" value="" onChange={() => {}} />}
                label="Label"
                error={error}
            />,
        );

        // Act

        // Assert
        expect(wrapper).toIncludeText(error);
    });
});
