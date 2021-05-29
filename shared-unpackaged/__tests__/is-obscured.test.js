// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";

import isObscured from "../is-obscured.js";

describe("isObscured", () => {
    let ogElementFromPoint = null;
    beforeEach(() => {
        // Some tests will want to mock this, so let's ensure we can reset it
        ogElementFromPoint = document.elementFromPoint;
    });

    afterEach(() => {
        if (ogElementFromPoint) {
            const og = ogElementFromPoint;
            ogElementFromPoint = null;
            // Reset the document method to avoid side-effects.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = og;
        }
    });

    test("element is null, throws", () => {
        // Arrange
        const element: Element = (null: any);
        const popperElement: any = "FAKE_ELEMENT";

        // Act
        const underTest = () => isObscured(element, popperElement);

        // Assert
        expect(underTest).toThrowError();
    });

    test("element is not obscured by anything, returns false", async () => {
        // Arrange
        const popperElement: any = "FAKE_ELEMENT";
        const ref = await new Promise((resolve) => {
            const nodes = (
                <View>
                    <View ref={resolve}>Unobscured</View>
                </View>
            );
            mount(nodes);
        });

        const element = ((ReactDOM.findDOMNode(ref): any): Element);

        // When not obscurred, elementFromPoint should return the element.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest.fn().mockReturnValue(element);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("element is partially obscured, returns false", async () => {
        // Arrange
        const popperElement: any = "FAKE_ELEMENT";
        const {ref, otherRef} = await new Promise((resolve) => {
            let ref;
            let otherRef;
            const tryResolve = (r, or) => {
                ref = ref || r;
                otherRef = otherRef || or;
                if (ref && otherRef) {
                    resolve({ref, otherRef});
                }
            };

            const nodes = (
                <View>
                    <View ref={(r) => tryResolve(null, r)} />
                    <View ref={(r) => tryResolve(r, null)}>
                        Partially obscured
                    </View>
                </View>
            );
            mount(nodes);
        });
        const element = ((ReactDOM.findDOMNode(ref): any): Element);
        const otherElement = ((ReactDOM.findDOMNode(otherRef): any): Element);
        // When not obscurred, elementFromPoint should return the element.
        // So let's return the element for one corner but not the other.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest
            .fn()
            .mockImplementationOnce(() => element)
            .mockImplementationOnce(() => otherElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("element is obscured, returns true", async () => {
        // Arrange
        const popperElement: any = "FAKE_ELEMENT";
        const {ref, otherRef} = await new Promise((resolve) => {
            let ref;
            let otherRef;
            const tryResolve = (r, or) => {
                ref = ref || r;
                otherRef = otherRef || or;
                if (ref && otherRef) {
                    resolve({ref, otherRef});
                }
            };

            const nodes = (
                <View>
                    <View ref={(r) => tryResolve(null, r)}>
                        Pretend this covers everything
                    </View>
                    <View ref={(r) => tryResolve(r, null)}>Obscured</View>
                </View>
            );
            mount(nodes);
        });
        const element = ((ReactDOM.findDOMNode(ref): any): Element);
        const otherElement = ((ReactDOM.findDOMNode(otherRef): any): Element);
        // When not obscurred, elementFromPoint should return the element.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest.fn().mockReturnValue(otherElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeTruthy();
    });

    test("element is not obscured, but elementFromPoint returns parent or child, returns false", async () => {
        // Arrange
        const popperElement: any = "FAKE_ELEMENT";
        const {parentRef, elementRef, childRef} = await new Promise(
            (resolve) => {
                let parentRef;
                let elementRef;
                let childRef;
                const tryResolve = (pr, er, cr) => {
                    parentRef = parentRef || pr;
                    elementRef = elementRef || er;
                    childRef = childRef || cr;
                    if (parentRef && elementRef && childRef) {
                        resolve({parentRef, elementRef, childRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r, null, null)}>
                            <View ref={(r) => tryResolve(null, r, null)}>
                                <View ref={(r) => tryResolve(null, null, r)}>
                                    Child
                                </View>
                            </View>
                        </View>
                    </View>
                );
                mount(nodes);
            },
        );

        const element = ((ReactDOM.findDOMNode(elementRef): any): Element);
        expect(element).toBeTruthy();

        const parentElement = ((ReactDOM.findDOMNode(parentRef): any): Element);
        expect(parentElement).toBeTruthy();

        const childElement = ((ReactDOM.findDOMNode(childRef): any): Element);
        expect(childElement).toBeTruthy();

        // When not obscurred, elementFromPoint should return the element.
        // So let's return the element for one corner but not the other.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest
            .fn()
            .mockImplementationOnce(() => parentElement)
            .mockImplementationOnce(() => childElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });
});
