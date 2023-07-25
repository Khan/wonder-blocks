import * as React from "react";
import {render} from "@testing-library/react";

import Title from "../title";

describe("Title", () => {
    test("forwards the ref to the heading element", () => {
        // Arrange
        const ref: React.RefObject<HTMLHeadingElement> = React.createRef();

        // Act
        render(<Title ref={ref}>This is a title</Title>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
});
