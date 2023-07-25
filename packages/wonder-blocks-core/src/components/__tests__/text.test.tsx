import * as React from "react";
import {render} from "@testing-library/react";

import Text from "../text";

describe("Title", () => {
    test("forwards the ref to the heading element", () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<Text ref={ref}>Some text</Text>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
});
