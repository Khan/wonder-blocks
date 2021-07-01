// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";

import type {ReferenceObject} from "popper.js";
import * as GetIntersection from "../get-intersection.js";
import isObscured from "../is-obscured.js";

describe("isObscured", () => {
    let ogElementFromPoint = null;
    beforeEach(() => {
        // Some tests will want to mock this, so let's ensure we can reset it
        // $FlowIgnore[method-unbinding]
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
        const popperElement: any = {
            contains: () => false,
        };

        // Act
        const underTest = () => isObscured(element, popperElement);

        // Assert
        expect(underTest).toThrowError();
    });

    test("element is not obscured by anything, returns false", async () => {
        // Arrange
        const popperElement: any = {
            contains: () => false,
        };
        const ref = await new Promise((resolve) => {
            const nodes = (
                <View>
                    <View ref={resolve}>Unobscured</View>
                </View>
            );
            mount(nodes);
        });

        const element = ((ReactDOM.findDOMNode(ref): any): Element);

        // When not obscured, elementFromPoint should return the element.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest.fn().mockReturnValue(element);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("element is partially obscured, returns false", async () => {
        // Arrange
        const popperElement: any = {
            contains: () => false,
        };
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
        // When not obscured, elementFromPoint should return the element.
        // So let's return the element for one point but not the others.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest
            .fn()
            .mockImplementationOnce(() => otherElement)
            .mockImplementationOnce(() => element)
            .mockImplementationOnce(() => otherElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("element is obscured, returns true", async () => {
        // Arrange
        const popperElement: any = {
            contains: () => false,
        };
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
        // When not obscured, elementFromPoint should return the element.
        // We want to show it obscured, so we don't return the element.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest.fn().mockReturnValue(otherElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeTruthy();
    });

    test("element is not obscured, but elementFromPoint returns parent or child, returns false", async () => {
        // Arrange
        const popperElement: any = {
            contains: () => false,
        };
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

        // When not obscured, elementFromPoint should return the element
        // or a child. Here we just return child and parent.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest
            .fn()
            .mockImplementationOnce(() => parentElement)
            .mockImplementationOnce(() => parentElement)
            .mockImplementationOnce(() => childElement);

        // Act
        const result = isObscured(element, popperElement);

        // Assert
        expect(result).toBeFalsy();
    });

    describe("popper element is returned by elementFromPoint", () => {
        test("popper element pointer-events style set to none", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                const tryResolve = (ar, pr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    if (anchorRef && popperRef) {
                        resolve({anchorRef, popperRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            Popper (obscuring anchor)
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();

            const pointerEventsSpy = jest.spyOn(
                (popperEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperEl)
                .mockReturnValue(anchorEl);

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("none");
        });

        test("visibility is rechecked", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                const tryResolve = (ar, pr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    if (anchorRef && popperRef) {
                        resolve({anchorRef, popperRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            Popper (obscuring anchor)
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();
            const elementFromPointSpy = jest
                .fn()
                .mockReturnValueOnce(popperEl)
                .mockReturnValue(anchorEl);

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = elementFromPointSpy;

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(elementFromPointSpy).toHaveBeenCalledTimes(2);
        });

        test("on success, popper element pointer-events reset", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                const tryResolve = (ar, pr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    if (anchorRef && popperRef) {
                        resolve({anchorRef, popperRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            Popper (obscuring anchor)
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();

            (popperEl: any).style.pointerEvents = "BEFORE_VALUE";
            const pointerEventsSpy = jest.spyOn(
                (popperEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperEl)
                .mockReturnValue(anchorEl);

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("BEFORE_VALUE");
        });

        test("on error, popper element pointer-events reset", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                const tryResolve = (ar, pr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    if (anchorRef && popperRef) {
                        resolve({anchorRef, popperRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            Popper (obscuring anchor)
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();

            (popperEl: any).style.pointerEvents = "BEFORE_VALUE";
            const pointerEventsSpy = jest.spyOn(
                (popperEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperEl)
                .mockImplementation(() => {
                    throw new Error("Oh noes!");
                });

            // Act
            try {
                isObscured(anchorEl, popperEl);
            } catch (e) {
                // We know it will throw. That's part of the test.
            }

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("BEFORE_VALUE");
        });
    });

    describe("child of popper element is returned by elementFromPoint", () => {
        test("child of popper element pointer-events style set to none", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                let popperChildRef;
                const tryResolve = (ar, pr, pcr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    popperChildRef = popperChildRef || pcr;
                    if (anchorRef && popperRef && popperChildRef) {
                        resolve({anchorRef, popperRef, popperChildRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            <View ref={(r) => tryResolve(null, null, r)}>
                                Popper (obscuring anchor)
                            </View>
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef, popperChildRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();
            const popperChildEl = ((ReactDOM.findDOMNode(
                popperChildRef,
            ): any): Element);
            expect(popperChildEl).toBeTruthy();

            const pointerEventsSpy = jest.spyOn(
                (popperChildEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperChildEl)
                .mockReturnValue(anchorEl);

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("none");
        });

        test("visibility is rechecked", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                let popperChildRef;
                const tryResolve = (ar, pr, pcr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    popperChildRef = popperChildRef || pcr;
                    if (anchorRef && popperRef && popperChildRef) {
                        resolve({anchorRef, popperRef, popperChildRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            <View ref={(r) => tryResolve(null, null, r)}>
                                Popper (obscuring anchor)
                            </View>
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef, popperChildRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();
            const popperChildEl = ((ReactDOM.findDOMNode(
                popperChildRef,
            ): any): Element);
            expect(popperChildEl).toBeTruthy();
            const elementFromPointSpy = jest
                .fn()
                .mockReturnValueOnce(popperChildEl)
                .mockReturnValue(anchorEl);

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = elementFromPointSpy;

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(elementFromPointSpy).toHaveBeenCalledTimes(2);
        });

        test("on success, child of popper element pointer-events reset", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                let popperChildRef;
                const tryResolve = (ar, pr, pcr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    popperChildRef = popperChildRef || pcr;
                    if (anchorRef && popperRef && popperChildRef) {
                        resolve({anchorRef, popperRef, popperChildRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            <View ref={(r) => tryResolve(null, null, r)}>
                                Popper (obscuring anchor)
                            </View>
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef, popperChildRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();
            const popperChildEl = ((ReactDOM.findDOMNode(
                popperChildRef,
            ): any): Element);
            expect(popperChildEl).toBeTruthy();

            (popperChildEl: any).style.pointerEvents = "BEFORE_VALUE";
            const pointerEventsSpy = jest.spyOn(
                (popperChildEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperChildEl)
                .mockReturnValue(anchorEl);

            // Act
            isObscured(anchorEl, popperEl);

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("BEFORE_VALUE");
        });

        test("on error, popper element pointer-events reset", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                let anchorRef;
                let popperRef;
                let popperChildRef;
                const tryResolve = (ar, pr, pcr) => {
                    anchorRef = anchorRef || ar;
                    popperRef = popperRef || pr;
                    popperChildRef = popperChildRef || pcr;
                    if (anchorRef && popperRef && popperChildRef) {
                        resolve({anchorRef, popperRef, popperChildRef});
                    }
                };

                const nodes = (
                    <View>
                        <View ref={(r) => tryResolve(r)}>Anchor</View>
                        <View ref={(r) => tryResolve(null, r)}>
                            <View ref={(r) => tryResolve(null, null, r)}>
                                Popper (obscuring anchor)
                            </View>
                        </View>
                    </View>
                );
                mount(nodes);
            });

            const {anchorRef, popperRef, popperChildRef} = await ref;

            const anchorEl = ((ReactDOM.findDOMNode(anchorRef): any): Element);
            expect(anchorEl).toBeTruthy();
            const popperEl = ((ReactDOM.findDOMNode(popperRef): any): Element);
            expect(popperEl).toBeTruthy();
            const popperChildEl = ((ReactDOM.findDOMNode(
                popperChildRef,
            ): any): Element);
            expect(popperChildEl).toBeTruthy();

            (popperChildEl: any).style.pointerEvents = "BEFORE_VALUE";
            const pointerEventsSpy = jest.spyOn(
                (popperChildEl: any).style,
                "pointerEvents",
                "set",
            );

            // We return the popperRef here so that it is then modified.
            // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
            document.elementFromPoint = jest
                .fn()
                .mockReturnValueOnce(popperChildEl)
                .mockImplementation(() => {
                    throw new Error("Oh noes!");
                });

            // Act
            try {
                isObscured(anchorEl, popperEl);
            } catch (e) {
                // We know it will throw. That's part of the test.
            }

            // Assert
            expect(pointerEventsSpy).toHaveBeenCalledWith("BEFORE_VALUE");
        });
    });

    test("fallsback to intersection check if anchor is a reference instead of an element", () => {
        // Arrange
        const getIntersectionSpy = jest.spyOn(GetIntersection, "default");
        const popperElement: any = {
            contains: () => false,
        };
        const element: ReferenceObject = {
            clientHeight: 100,
            clientWidth: 100,
            getBoundingClientRect: () =>
                ({
                    bottom: 100,
                    top: 0,
                    left: 0,
                    right: 100,
                    height: 100,
                    width: 100,
                }: any),
        };

        // When not obscured, elementFromPoint should return the element.
        // $FlowFixMe[cannot-write] Flow doesn't like us doing this to the document
        document.elementFromPoint = jest.fn().mockReturnValue(element);

        // Act
        isObscured(element, popperElement);

        // Assert
        expect(getIntersectionSpy).toHaveBeenCalled();
    });
});
