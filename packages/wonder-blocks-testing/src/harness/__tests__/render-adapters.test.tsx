import * as React from "react";
import {renderAdapters} from "../render-adapters";

import type {TestHarnessAdapter, TestHarnessConfigs} from "../types";

describe("#renderAdapters", () => {
    it("should render children if no adapters", () => {
        // Arrange
        const children = <div>Adapt me!</div>;

        // Act
        const result = renderAdapters({}, {}, children);

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <React.Fragment>
              <div>
                Adapt me!
              </div>
            </React.Fragment>
        `);
    });

    it("should invoke the adapter with its corresponding config", () => {
        // Arrange
        const children = <div>Adapt me!</div>;
        const adapters = {
            adapterA: jest.fn() as TestHarnessAdapter<string>,
        } as const;
        const configs: TestHarnessConfigs<typeof adapters> = {
            adapterA: "APPLY A CONFIG",
        };

        // Act
        renderAdapters(adapters, configs, children);

        // Assert
        expect(adapters.adapterA).toHaveBeenCalledWith(
            children,
            "APPLY A CONFIG",
        );
    });

    it("should render each adapter and the children", () => {
        // Arrange
        const children = "Adapt me!";
        const adapter: TestHarnessAdapter<string> = (c: any, conf: any) =>
            `${conf}:${c}` as any;
        const adapters = {
            adapterA: adapter,
            adapterB: adapter,
            adapterC: adapter,
        } as const;
        const configs: TestHarnessConfigs<typeof adapters> = {
            adapterA: "A",
            adapterB: "B",
            adapterC: "C",
        };

        // Act
        const result = renderAdapters(adapters, configs, children);

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <React.Fragment>
              C:B:A:Adapt me!
            </React.Fragment>
        `);
    });

    it("should skip adapters where the corresponding config is null", () => {
        // Arrange
        const children = "Adapt me!";
        const adapter: TestHarnessAdapter<string> = (c: any, conf: any) =>
            `${conf}:${c}` as any;
        const adapters = {
            adapterA: adapter,
            adapterB: adapter,
            adapterC: adapter,
        } as const;
        const configs: TestHarnessConfigs<typeof adapters> = {
            adapterA: "A",
            adapterB: null,
            adapterC: "C",
        };

        // Act
        const result = renderAdapters(adapters, configs, children);

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <React.Fragment>
              C:A:Adapt me!
            </React.Fragment>
        `);
    });
});
