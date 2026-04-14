import * as React from "react";
import {describe, it, expect} from "tstyche";

import type {
    TestHarnessAdapter,
    TestHarnessAdapters,
    TestHarnessConfig,
    TestHarnessConfigs,
} from "../types";

describe("TestHarnessAdapter<TConfig>", () => {
    it("should reject incorrect config type", () => {
        // @ts-expect-error Types of parameters 'config' and 'config' are incompatible.
        ((children: React.ReactNode, config: number): React.ReactElement<any> => (
            <div />
        )) as TestHarnessAdapter<string>;
    });

    it("should accept correctly defined adapter", () => {
        ((children: React.ReactNode, config: string): React.ReactElement<any> => (
            <div />
        )) as TestHarnessAdapter<string>;
    });
});

describe("TestHarnessAdapters", () => {
    it("should accept an empty object", () => {
        ({}) as TestHarnessAdapters;
    });

    it("should reject adapters that do not satisfy Adapter<TConfig>", () => {
        // @ts-expect-error Type 'string' is not comparable to type 'TestHarnessAdapter<any>'.
        ({
            adapterString: "string",
        }) as TestHarnessAdapters;
    });

    it("should accept a valid adapter function", () => {
        ({
            adapterA: (children: React.ReactNode, config: string) => (
                <div>test</div>
            ),
        }) as TestHarnessAdapters;
    });
});

describe("TestHarnessConfig<TAdapter>", () => {
    it("should give the config type of an adapter", () => {
        "string" as TestHarnessConfig<TestHarnessAdapter<string>>;
    });

    it("should error if the config type is wrong", () => {
        // 45 is not a string
        // @ts-expect-error Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other.
        45 as TestHarnessConfig<TestHarnessAdapter<string>>;
    });
});

/**
 * TestHarnessConfigs<TAdapters>
 *
 * NOTE: This only works if the properties of the passed `TAdapters` type
 * are explicitly typed as `TestHarnessAdapter<TConfig>` so if passing in a
 * non-Adapters type (which we should be, to get strong TConfig types instead
 * of `any`), then that object should make sure that each adapter is strongly
 * marked as `TestHarnessAdapter<TConfig>`.
 */
const adapterA: TestHarnessAdapter<string> = (
    children: React.ReactNode,
    config?: string | null,
): React.ReactElement<any> => <div />;
const adapterB: TestHarnessAdapter<number> = (
    children: React.ReactNode,
    config?: number | null,
): React.ReactElement<any> => <div />;
const adapters = {
    adapterA,
    adapterB,
} as const;

describe("TestHarnessConfigs<TAdapters>", () => {
    it("should require the TAdapters type arg to satisfy TestHarnessAdapters", () => {
        // string is not a valid Adapter
        // @ts-expect-error: Type 'string' does not satisfy the constraint 'TestHarnessAdapters'
        ({}) as TestHarnessConfigs<string>;
    });

    it("should expect one config per adapter", () => {
        // both adapter configs missing
        expect({}).type.not.toBeAssignableTo<TestHarnessConfigs<typeof adapters>>();
        // adapterB config missing
        expect({adapterA: "test"}).type.not.toBeAssignableTo<TestHarnessConfigs<typeof adapters>>();
    });

    it("should accept adapters of the correct types", () => {
        expect({
            adapterA: "a string, this is correct",
            adapterB: 7,
        }).type.toBeAssignableTo<TestHarnessConfigs<typeof adapters>>();
    })

    it("should require specific adapter types", () => {
        expect({
            adapterA: "a string, this is correct",
            adapterB: "a string, but it should be a number",
        }).type.not.toBeAssignableTo<TestHarnessConfigs<typeof adapters>>();
    });
});
