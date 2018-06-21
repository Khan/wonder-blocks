// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import enumerateScrollAncestors from "./enumerate-scroll-ancestors.js";

describe("enumerateScrollAncestors", () => {
    test("if passed an invalid parameter, yields nothing", () => {
        // Arrange
        const param = (("this is not an element": any): Element);

        // Act
        const result = Array.from(enumerateScrollAncestors(param));

        // Assert
        expect(result.length).toBe(0);
    });

    test("if there are no scroll parents, yields documentElement", (done) => {
        const arrange = (actAndAssert) => {
            // Arrange
            const nodes = (
                <div>
                    <div ref={actAndAssert}>Test</div>
                </div>
            );

            mount(nodes);
        };

        const actAndAssert = (ref) => {
            if (ref) {
                const domNode = ((ReactDOM.findDOMNode(ref): any): Element);

                // Act
                const result = Array.from(enumerateScrollAncestors(domNode));

                // Assert
                expect(result.length).toBe(1);
                expect(result[0]).toBe(document.documentElement);
                done();
            }
        };

        arrange(actAndAssert);
    });

    test("if there are scrollable parents, yields them in order", (done) => {
        const arrange = (actAndAssert) => {
            // Arrange
            const nodes = (
                <div id="parent3" style={{overflow: "auto"}}>
                    <div id="nonscrollparent">
                        <div id="parent2" style={{overflowY: "auto"}}>
                            <div id="parent" style={{overflowX: "scroll"}}>
                                <div ref={actAndAssert}>Test</div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            mount(nodes);
        };

        const actAndAssert = (ref) => {
            if (ref) {
                const domNode = ((ReactDOM.findDOMNode(ref): any): Element);

                // Act
                const result = Array.from(enumerateScrollAncestors(domNode));

                // Assert
                expect(result).toHaveLength(4);
                expect(result[0].getAttribute("id")).toBe("parent");
                expect(result[1].getAttribute("id")).toBe("parent2");
                expect(result[2].getAttribute("id")).toBe("parent3");
                expect(result[3]).toBe(document.documentElement);
                done();
            }
        };

        arrange(actAndAssert);
    });
});