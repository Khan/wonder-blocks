import Button from "@khanacademy/wonder-blocks-button";
import {
    describe,
    expect,
    test,
    render,
    simulate,
} from "@khanacademy/vite-helpers";

describe("Button", () => {
    test("primary", async () => {
        // focus the window
        await simulate({type: "mousemove", clientX: 1, clientY: 1});
        await simulate({type: "click"});

        const element = await render(<Button>Hello, world!</Button>);
        await expect(element).toMatchScreenshot();
        await simulate({type: "mousemove", clientX: 50, clientY: 25});
        await expect(element).toMatchScreenshot({outset: 4});
        await simulate({type: "mousedown"});
        await expect(element).toMatchScreenshot();
    });

    test("primary (tab to focus)", async () => {
        const element = await render(<Button>Hello, world!</Button>);
        await simulate({type: "keypress", key: "tab"});
        await expect(element).toMatchScreenshot({outset: 4});
    });

    test("secondary", async () => {
        const element = await render(
            <Button kind="secondary">Hello, world!</Button>,
        );
        await expect(element).toMatchScreenshot();
    });

    test("tertiary", async () => {
        const element = await render(
            <Button kind="tertiary">Hello, world!</Button>,
        );
        await expect(element).toMatchScreenshot();
    });
});
