/* global render */
// @flow
import * as React from "react";

import Button from "../packages/wonder-blocks-button/components/button.js";

describe("foo", () => {
    test("it should render a button", async () => {
        // Arrange
        // $FlowFixMe
        const element = await render(<Button>Hello, world!</Button>);

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });
});
