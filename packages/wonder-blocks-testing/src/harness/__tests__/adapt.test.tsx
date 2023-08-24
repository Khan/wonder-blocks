import * as React from "react";
import {render} from "@testing-library/react";

import {Adapt} from "../adapt";

import type {TestHarnessAdapter, TestHarnessConfigs} from "../types";

describe("Adapt", () => {
    it("should render children if no adapters", () => {
        // Arrange
        const children = <div>Adapt me!</div>;

        // Act
        const {container: result} = render(
            <Adapt adapters={{}} configs={{}}>
                {children}
            </Adapt>,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <div>
              <div>
                Adapt me!
              </div>
            </div>
        `);
    });

    it("should invoke the adapter with its corresponding config", () => {
        // Arrange
        const children = <div>Adapt me!</div>;
        const adapters = {
            adapterA: jest
                .fn()
                .mockReturnValue("ADAPTER A") as TestHarnessAdapter<string>,
        } as const;
        const configs: TestHarnessConfigs<typeof adapters> = {
            adapterA: "APPLY A CONFIG",
        };

        // Act
        render(
            <Adapt adapters={adapters} configs={configs}>
                {children}
            </Adapt>,
        );

        // Assert
        expect(adapters.adapterA).toHaveBeenCalledWith(
            expect.anything(),
            "APPLY A CONFIG",
        );
    });

    it("should render each adapter and the children", () => {
        // Arrange
        const children = "Adapt me!";
        const adapter: TestHarnessAdapter<string> = (c: any, conf: any) => (
            <>
                {conf}
                {c}
            </>
        );
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
        const {container: result} = render(
            <Adapt adapters={adapters} configs={configs}>
                {children}
            </Adapt>,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <div>
              C
              B
              A
              Adapt me!
            </div>
        `);
    });

    it("should skip adapters where the corresponding config is null", () => {
        // Arrange
        const children = "Adapt me!";
        const adapter: TestHarnessAdapter<string> = (c: any, conf: any) => (
            <>
                {conf}
                {c}
            </>
        );
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
        const {container: result} = render(
            <Adapt adapters={adapters} configs={configs}>
                {children}
            </Adapt>,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <div>
              C
              A
              Adapt me!
            </div>
        `);
    });

    it("should render such that contexts are properly setup in order", () => {
        // Arrange
        const MyContext = React.createContext("root");
        const ContextRoot = ({children}: any): React.ReactElement => {
            const value = React.useContext(MyContext);
            if (value !== "root") {
                throw new Error("Don't nest this");
            }
            return (
                <MyContext.Provider value={"other"}>
                    {children}
                </MyContext.Provider>
            );
        };
        const adapterNoContext: TestHarnessAdapter<string> = (
            c: any,
            conf: any,
        ) => (
            <>
                {conf}
                {c}
            </>
        );
        const adapterWithContext: TestHarnessAdapter<string> = (
            c: any,
            conf: string,
        ) => (
            <ContextRoot>
                {conf}
                {c}
            </ContextRoot>
        );
        const adapters = {
            adapterA: adapterNoContext,
            adapterB: adapterWithContext,
            adapterC: adapterNoContext,
        } as const;
        const configs: TestHarnessConfigs<typeof adapters> = {
            adapterA: "A",
            adapterB: "B",
            adapterC: "C",
        };
        const ChildComponent = (props: any): React.ReactElement => {
            const value = React.useContext(MyContext);
            if (value === "default") {
                throw new Error("Context not setup properly");
            }
            return <div>{value}</div>;
        };

        // Act
        const {container: result} = render(
            <Adapt adapters={adapters} configs={configs}>
                <ChildComponent />
            </Adapt>,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`
            <div>
              C
              B
              A
              <div>
                other
              </div>
            </div>
        `);
    });
});
