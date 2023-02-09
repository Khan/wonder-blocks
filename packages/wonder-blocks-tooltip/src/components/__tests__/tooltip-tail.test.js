// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import TooltipTail from "../tooltip-tail.js";

import type {Placement} from "../../util/types.js";

describe("TooltipTail", () => {
    describe("#render", () => {
        test("unknown placement, throws", () => {
            // Arrange
            const fakePlacement = (("notaplacement": any): Placement);
            const nodes = <TooltipTail placement={fakePlacement} />;

            // Act
            const underTest = () => render(nodes);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Unknown placement: notaplacement"`,
            );
        });

        test("known placement, does not throw", () => {
            // Arrange
            const testPoints = ["top", "right", "bottom", "left"];
            const makeNode = (p) => <TooltipTail placement={p} />;

            // Act
            const testees = testPoints.map((tp) => () => render(makeNode(tp)));

            // Assert
            for (const testee of testees) {
                expect(testee).not.toThrowError();
            }
        });
    });
});
