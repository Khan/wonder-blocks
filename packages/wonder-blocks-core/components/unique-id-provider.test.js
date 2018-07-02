// @flow
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import {shallow, mount} from "enzyme";

import View from "./view.js";

import SsrIDFactory from "../util/ssr-id-factory.js";
import UniqueIDFactory from "../util/unique-id-factory.js";
import UniqueIDProvider from "./unique-id-provider.js";

describe("UniqueIDProvider", () => {
    describe("no placeholder", () => {
        test("initial render identifiers match on client & server", () => {
            // Arrange
            const id = "view-id";
            const nodes = (
                <UniqueIDProvider>
                    {(ids) => <View id={ids.id(id)}>My view</View>}
                </UniqueIDProvider>
            );

            // Act
            const serverRender = ReactDOMServer.renderToString(nodes);
            const clientRender = shallow(nodes).html();

            // Assert
            const expectation = `id="${id}"`;
            expect(serverRender).toContain(expectation);
            expect(clientRender).toContain(expectation);
        });

        test("initial render should use SSR id factory", () => {
            // Arrange
            const children = jest.fn(() => <View />);
            const nodes = <UniqueIDProvider>{children}</UniqueIDProvider>;

            // Act
            mount(nodes);

            // Assert
            expect(children).toHaveBeenCalledTimes(2);
            expect(children.mock.calls[0][0]).toBe(SsrIDFactory);
            expect(children.mock.calls[1][0]).toBeInstanceOf(UniqueIDFactory);
        });

        test("subsequent renders get same unique id factory", () => {
            // Arrange
            const children = jest.fn(() => <View />);
            const nodes = <UniqueIDProvider>{children}</UniqueIDProvider>;
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

    describe("with placeholder", () => {
        test("initial render, children is not called", () => {
            // Arrange
            const id = "view-id";
            const placeholder = (ids) => <View id={ids.id(id)}>My view</View>;
            const children = jest.fn();
            const nodes = (
                <UniqueIDProvider placeholder={placeholder}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            shallow(nodes).html();

            // Assert
            expect(children).not.toHaveBeenCalled();
        });

        test("initial render identifiers match on client & server", () => {
            // Arrange
            const id = "view-id";
            const placeholder = (ids) => <View id={ids.id(id)}>My view</View>;
            const children = jest.fn();
            const nodes = (
                <UniqueIDProvider placeholder={placeholder}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            const serverRender = ReactDOMServer.renderToString(nodes);
            const clientRender = shallow(nodes).html();

            // Assert
            const expectation = `id="${id}"`;
            expect(serverRender).toContain(expectation);
            expect(clientRender).toContain(expectation);
        });

        test("placeholder called with SSR id factory", () => {
            // Arrange
            const placeholder = jest.fn(() => <View />);
            const children = jest.fn(() => <View />);
            const nodes = (
                <UniqueIDProvider placeholder={placeholder}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            mount(nodes);

            // Assert
            expect(placeholder).toHaveBeenCalledTimes(1);
            expect(placeholder).toHaveBeenCalledWith(SsrIDFactory);
        });

        test("children called with unique id factory", () => {
            // Arrange
            const placeholder = jest.fn(() => <View />);
            const children = jest.fn(() => <View />);
            const nodes = (
                <UniqueIDProvider placeholder={placeholder}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            mount(nodes);

            // Assert
            expect(children).toHaveBeenCalledTimes(1);
            expect(children).toHaveBeenCalledWith(expect.any(UniqueIDFactory));
        });

        test("all children calls get same unique id factory", () => {
            // Arrange
            const placeholder = jest.fn(() => <View />);
            const children = jest.fn(() => <View />);
            const nodes = (
                <UniqueIDProvider placeholder={placeholder}>
                    {children}
                </UniqueIDProvider>
            );
            const wrapper = mount(nodes);

            // Act
            wrapper.instance().forceUpdate();

            // Assert
            // Check our forced render worked and we rendered three times.
            expect(children).toHaveBeenCalledTimes(2);
            // Check the second render gets a UniqueIDFactory instance.
            expect(children.mock.calls[0][0]).toBeInstanceOf(UniqueIDFactory);
            // Check the third render gets the same UniqueIDFactory instance.
            expect(children.mock.calls[1][0]).toBe(children.mock.calls[1][0]);
        });
    });
});
