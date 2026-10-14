import * as React from "react";
import {render} from "@testing-library/react";

import TooltipTail from "../tooltip-tail";

import type {Placement} from "../../util/types";

describe("TooltipTail", () => {
    describe("#render", () => {
        test("unknown placement, throws", () => {
            // Arrange
            const fakePlacement = "notaplacement" as Placement;
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
            const makeNode = (p: any) => <TooltipTail placement={p} />;

            // Act
            const testees = testPoints.map(
                (tp: any) => () => render(makeNode(tp)),
            );

            // Assert
            for (const testee of testees) {
                expect(testee).not.toThrowError();
            }
        });

        it("should render a spacer when show is false", () => {
            // Arrange
            const nodes = <TooltipTail placement="top" show={false} />;

            // Act
            const {container} = render(nodes);

            // Assert
            expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="default tailContainer"
    data-placement="top"
    style="top: -1px; width: 40px; height: 20px;"
  >
    <div
      aria-hidden="true"
      class="default"
      style="inline-size: 12px; flex-basis: 12px; flex-shrink: 0;"
    />
  </div>
</div>
`);
        });
    });
});
