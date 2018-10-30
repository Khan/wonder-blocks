/* global render */
// @flow
import * as React from "react";

import Button from "./button.js";

describe("foo", () => {
    test("it should render a button", async () => {
        // Arrange
        // $FlowFixMe: flow can't resolve render
        const element = await render(<Button>Hello, world!</Button>);

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });
});
