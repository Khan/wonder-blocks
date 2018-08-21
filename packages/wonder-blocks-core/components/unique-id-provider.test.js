// @flow
import * as React from "react";
import * as ReactDOMServer from "react-dom/server.js";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import View from "./view.js";

import SsrIDFactory from "../util/ssr-id-factory.js";
import UniqueIDFactory from "../util/unique-id-factory.js";
import UniqueIDProvider from "./unique-id-provider.js";

describe("UniqueIDProvider", () => {
    beforeEach(() => {
        unmountAll();
    });

    describe("mockOnFirstRender is default (false)", () => {
        test("initial render is nothing on server", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = <UniqueIDProvider>{children}</UniqueIDProvider>;

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(children).not.toHaveBeenCalled();
        });

        test("initial render is skipped on client", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = <UniqueIDProvider>{children}</UniqueIDProvider>;

            // Act
            mount(nodes);

            // Assert
            // Called once; for real render.
            // Compare with case where mock factory is provided and note that
            // children gets called twice, once for initial render, and once
            // for real render with unique ID factory.
            expect(children).toHaveBeenCalledTimes(1);
            expect(children.mock.calls[0][0]).toBeInstanceOf(UniqueIDFactory);
        });

        test("all renders get same unique id factory", () => {
            // Arrange
            const children = jest.fn(() => <View />);
            const nodes = <UniqueIDProvider>{children}</UniqueIDProvider>;
            const wrapper = mount(nodes);

            // Act
            wrapper.instance().forceUpdate();

            // Assert
            // Check our forced render worked and we rendered three times.
            expect(children).toHaveBeenCalledTimes(2);
            // Check the first render gets a UniqueIDFactory instance.
            expect(children.mock.calls[0][0]).toBeInstanceOf(UniqueIDFactory);
            // Check the second render gets the same UniqueIDFactory instance.
            expect(children.mock.calls[1][0]).toBe(children.mock.calls[1][0]);
        });
    });

    describe("mockOnFirstRender is true", () => {
        test("initial server render, children called with SsrIDFactory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            // Called twice; once for initial mock render only.
            expect(children).toHaveBeenCalledTimes(1);
            expect(children).toHaveBeenCalledWith(SsrIDFactory);
        });

        test("initial client render, children called with SsrIDFactory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            mount(nodes);

            // Assert
            // Called twice; once for initial mock render, and again for real
            // render.
            expect(children).toHaveBeenCalledTimes(2);
            expect(children).toHaveBeenCalledWith(SsrIDFactory);
        });

        test("children calls after first get same unique id factory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );
            const wrapper = mount(nodes);

            // Act
            wrapper.instance().forceUpdate();

            // Assert
            // Check our forced render worked and we rendered three times.
            expect(children).toHaveBeenCalledTimes(3);
            // Check the second render gets a UniqueIDFactory instance.
            expect(children.mock.calls[1][0]).toBeInstanceOf(UniqueIDFactory);
            // Check the third render gets the same UniqueIDFactory instance.
            expect(children.mock.calls[2][0]).toBe(children.mock.calls[1][0]);
        });
    });
});
