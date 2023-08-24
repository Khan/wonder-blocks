import * as React from "react";
import {render} from "@testing-library/react";

import {TestHarnessAdapter} from "../types";

import {makeAdapter} from "../make-adapter";

describe("makeAdapter", () => {
    it("should return a function", () => {
        // Arrange
        const adapter: TestHarnessAdapter<string> = (children, config) => (
            <div id="adapter">
                {config}
                {children}
            </div>
        );

        // Act
        const result = makeAdapter<string>("test-adapter", adapter);

        // Assert
        expect(result).toBeFunction();
    });

    it("should set the displayName on the function to match the passed name", () => {
        // Arrange
        const adapter: TestHarnessAdapter<string> = (children, config) => (
            <div id="adapter">
                {config}
                {children}
            </div>
        );

        // Act
        const result = makeAdapter<string>("test-adapter", adapter);

        // Assert
        expect(result.displayName).toBe("Adapter(test-adapter)");
    });

    describe("the created component", () => {
        it("should render only the children if the adapter config is nullish", () => {
            // Arrange
            const adapter: TestHarnessAdapter<string> = (children, config) => {
                throw new Error("Adapter should not be rendered!");
            };
            const children = "Adapt me!";
            const Adapter = makeAdapter<string>("test-adapter", adapter);

            // Act
            const {container: result} = render(
                <Adapter config={null as null | undefined | string}>
                    {children}
                </Adapter>,
            );

            // Assert
            expect(result).toMatchInlineSnapshot(`
                <div>
                  Adapt me!
                </div>
            `);
        });

        it("should render the adapter around the children if the config is not nullish", () => {
            // Arrange
            const adapter: TestHarnessAdapter<string> = (children, config) => (
                <div id="adapter">
                    {config}
                    {children}
                </div>
            );
            const children = "Adapt me!";
            const config = "this-is-the-config";
            const Adapter = makeAdapter<string>("test-adapter", adapter);

            // Act
            const {container: result} = render(
                <Adapter config={config}>{children}</Adapter>,
            );

            // Assert
            expect(result).toMatchInlineSnapshot(`
                <div>
                  <div
                    id="adapter"
                  >
                    this-is-the-config
                    Adapt me!
                  </div>
                </div>
            `);
        });
    });
});
