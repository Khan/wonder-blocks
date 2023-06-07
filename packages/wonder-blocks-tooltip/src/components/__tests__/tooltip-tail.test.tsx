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

        it("should render a visible tail", () => {
            // Arrange
            const nodes = <TooltipTail placement="top" />;

            // Act
            const {container} = render(nodes);

            // Assert
            expect(container).toMatchInlineSnapshot(`
                <div>
                  <div
                    class=""
                    data-placement="top"
                    style="align-items: stretch; border-width: 0px; border-style: solid; box-sizing: border-box; display: flex; flex-direction: column; margin: 0px; padding: 0px; position: relative; z-index: 0; min-height: 0; min-width: 0; pointer-events: none; top: -1px; width: 40px; height: 20px;"
                  >
                    <svg
                      aria-hidden="true"
                      class="arrow_oo4scr"
                      height="12"
                      style="margin-left: 8px; margin-right: 8px; padding-bottom: 8px;"
                      width="24"
                    >
                      <filter
                        height="200%"
                        id="tooltip-dropshadow-top-3"
                        width="200%"
                        x="-50%"
                        y="-50%"
                      >
                        <fegaussianblur
                          in="SourceAlpha"
                          stdDeviation="3"
                        />
                        <fecomponenttransfer>
                          <fefunca
                            slope="0.3"
                            type="linear"
                          />
                        </fecomponenttransfer>
                      </filter>
                      <g
                        transform="translate(0,5.5)"
                      >
                        <polyline
                          fill="rgba(33,36,44,0.16)"
                          filter="url(#tooltip-dropshadow-top-3)"
                          points="0,0 12,12 24,0"
                          stroke="rgba(33,36,44,0.32)"
                        />
                      </g>
                      <polyline
                        fill="#ffffff"
                        points="0,0 12,12 24,0"
                        stroke="#ffffff"
                      />
                      <polyline
                        fill="#ffffff"
                        points="0,0 12,12 24,0"
                        stroke="rgba(33,36,44,0.16)"
                      />
                      <polyline
                        points="0,-0.5 24,-0.5"
                        stroke="#ffffff"
                      />
                    </svg>
                  </div>
                </div>
            `);
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
                    class=""
                    data-placement="top"
                    style="align-items: stretch; border-width: 0px; border-style: solid; box-sizing: border-box; display: flex; flex-direction: column; margin: 0px; padding: 0px; position: relative; z-index: 0; min-height: 0; min-width: 0; pointer-events: none; top: -1px; width: 40px; height: 20px;"
                  >
                    <div
                      aria-hidden="true"
                      class=""
                      style="align-items: stretch; border-width: 0px; border-style: solid; box-sizing: border-box; display: flex; flex-direction: column; margin: 0px; padding: 0px; position: relative; z-index: 0; min-height: 0; min-width: 0; width: 12px; flex-basis: 12px; flex-shrink: 0;"
                    />
                  </div>
                </div>
            `);
        });
    });
});
