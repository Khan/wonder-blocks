import * as React from "react";
import {render} from "@testing-library/react";

import {TestHarnessAdapter} from "../types";

import {Adapter} from "../adapter";

describe("Adapter", () => {
    it("should render only the children if the adapter config is nullish", () => {
        // Arrange
        const adapter: TestHarnessAdapter<string> = (children, config) => (
            <div id="adapter">
                {config}
                {children}
            </div>
        );
        const children = "Adapt me!";

        // Act
        const {container: result} = render(
            <Adapter
                adapter={adapter}
                config={null as null | undefined | string}
            >
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

        // Act
        const {container: result} = render(
            <Adapter adapter={adapter} config={config}>
                {children}
            </Adapter>,
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
