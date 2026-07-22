import * as React from "react";
import {describe, expect, it} from "tstyche";
import {useLatestRef} from "../use-latest-ref";

describe("useLatestRef", () => {
    it("should infer the non-nullable type for `current`", () => {
        expect(useLatestRef(123)).type.toBeAssignableTo<{current: number}>();
    });

    it("should be assignable to React.RefObject", () => {
        expect(useLatestRef(123)).type.toBeAssignableTo<
            React.RefObject<number>
        >();
    });

    it("should be assignable to React.MutableRefObject", () => {
        expect(useLatestRef(123)).type.toBeAssignableTo<
            React.MutableRefObject<number>
        >();
    });

    it("should not be assignable to a ref with a different type", () => {
        expect(useLatestRef(123)).type.not.toBeAssignableTo<{
            current: string;
        }>();
    });

    it("should make `current` readonly", () => {
        expect(useLatestRef("")).type.toBe<{readonly current: string}>();
    });
});
