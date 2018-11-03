/* global render, driver */
// @flow
import * as React from "react";

// TODO(kevinb): fix vite so that it can handle importing modules
// from within the same mono-repo.
// eslint-disable-next-line monorepo/no-relative-import
import Button from "../../wonder-blocks-button/index.js";

import ModalLauncher from "./modal-launcher.js";
import OneColumnModal from "./one-column-modal.js";

jest.mock("../util/needs-hacky-mobile-safari-scroll-disabler.js", () => true);

const TAB = "\ue004";

describe("foo", () => {
    test("initial focus is the toolbar button", async () => {
        // Arrange
        // $FlowFixMe: flow can't resolve render
        await render(
            <ModalLauncher
                modal={
                    <OneColumnModal
                        content="Hello, world!"
                        footer={<Button onClick={() => {}}>Click me!</Button>}
                    />
                }
                opened={true}
                onClose={() => {}}
            />,
        );

        // Act
        // $FlowFixMe: flow can't resolve driver
        const element = await driver.switchTo().activeElement();

        // Assert
        expect(await element.getText()).toBe("Click me!");
    });

    test("tabbing once moves to the close button", async () => {
        // Arrange
        // $FlowFixMe: flow can't resolve render
        await render(
            <ModalLauncher
                modal={
                    <OneColumnModal
                        content="Hello, world!"
                        footer={<Button onClick={() => {}}>Click me!</Button>}
                    />
                }
                opened={true}
                onClose={() => {}}
            />,
        );

        // Act
        // $FlowFixMe: flow can't resolve driver
        await driver
            .actions()
            .sendKeys(TAB)
            .perform();

        // Assert
        const element = await driver.switchTo().activeElement();
        expect(await element.getAttribute("aria-label")).toBe("Close modal");
    });

    test("tabbing twice returns to the toolbar button", async () => {
        // Arrange
        // $FlowFixMe: flow can't resolve render
        await render(
            <ModalLauncher
                modal={
                    <OneColumnModal
                        content="Hello, world!"
                        footer={<Button onClick={() => {}}>Click me!</Button>}
                    />
                }
                opened={true}
                onClose={() => {}}
            />,
        );

        // Act
        // $FlowFixMe: flow can't resolve driver
        await driver
            .actions()
            .sendKeys(TAB)
            .perform();
        await driver
            .actions()
            .sendKeys(TAB)
            .perform();

        // Assert
        const element = await driver.switchTo().activeElement();
        expect(await element.getText()).toBe("Click me!");
    });
});
