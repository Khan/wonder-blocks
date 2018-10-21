/* global render */
// @flow
import * as React from "react";

import Button from "../packages/wonder-blocks-button/components/button.js";

describe("foo", () => {
    test("it should render a button", async () => {
        // $FlowFixMe
        const element = await render(<Button>Hello, world!</Button>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });
});
