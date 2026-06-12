import * as React from "react";
import {render, screen} from "@testing-library/react";
import Text from "../text";

describe("Text", () => {
    test("forwards the ref to the heading element", () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<Text ref={ref}>Some text</Text>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    test("appends the className prop to the element's class list", () => {
        // Arrange
        const className = "some-class";

        // Act
        render(<Text className={className}>Text</Text>);

        const wrapper = screen.getByText("Text");

        // Assert
        expect(wrapper).toHaveClass(className);
    });
});
