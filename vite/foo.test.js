/* global render */
// @flow
import * as React from "react";

import Foo from "./foo.js";
import Button from "../packages/wonder-blocks-button/components/button.js";

describe("foo", () => {
    test("the title should be 'Hello, world!'", async () => {
        // $FlowFixMe
        const element = await render(<Foo msg="msg">Hello, world!</Foo>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });

    test("it should work arrow expressions", async () => {
        // $FlowFixMe
        const element = await render(() => {
            const msg = "Hello, world!";
            return <Foo msg="msg">{msg}</Foo>;
        });
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });

    test("it should render a button", async () => {
        // $FlowFixMe
        const element = await render(<Button>Hello, world!</Button>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });
});
