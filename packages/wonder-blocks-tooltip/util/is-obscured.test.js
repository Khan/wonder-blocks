// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {View} from "@khanacademy/wonder-blocks-core";

import {mount} from "enzyme";
import isObscured from "./is-obscured.js";

describe("isObscured", () => {
    test("element is null, throws", () => {
        // Arrange
        const element = ((null: any): Element);

        // Act
        const underTest = () => isObscured(element);

        // Assert
        expect(underTest).toThrowError();
    });

    test("element is not obscured by anything, returns false", (done) => {
        const arrange = (actAndAssert) => {
            // Arrange
            const nodes = (
                <View>
                    <View ref={actAndAssert}>Unobscured</View>
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);

            const ogElementFromPoint = document.elementFromPoint;
            // When not obscurred, elementFromPoint should return the element.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = jest.fn().mockReturnValue(element);

            // Act
            const result = isObscured(element);

            // Assert
            expect(result).toBeFalsy();
            // Reset the document method to avoid side-effects.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = ogElementFromPoint;
            done();
        };

        arrange(actAndAssert);
    });

    test("element is partially obscured, returns false", (done) => {
        // Arrange
        let otherRef = null;
        const arrange = (actAndAssert) => {
            const nodes = (
                <View>
                    <View ref={(ref) => (otherRef = ref)} />
                    <View ref={actAndAssert}>Partially obscured</View>
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);
            const otherElement = ((ReactDOM.findDOMNode(
                otherRef,
            ): any): Element);
            const ogElementFromPoint = document.elementFromPoint;
            // When not obscurred, elementFromPoint should return the element.
            // So let's return the element for one corner but not the other.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = jest
                .fn()
                .mockImplementationOnce(() => element)
                .mockImplementationOnce(() => otherElement);

            // Act
            const result = isObscured(element);

            // Assert
            expect(result).toBeFalsy();
            // Reset the document method to avoid side-effects.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = ogElementFromPoint;
            done();
        };

        arrange(actAndAssert);
    });

    test("element is obscured, returns true", (done) => {
        // Arrange
        let otherRef = null;
        const arrange = (actAndAssert) => {
            const nodes = (
                <View>
                    <View ref={(ref) => (otherRef = ref)}>
                        Pretend this covers everything
                    </View>
                    <View ref={actAndAssert}>Obscured</View>
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);
            const otherElement = ((ReactDOM.findDOMNode(
                otherRef,
            ): any): Element);
            const ogElementFromPoint = document.elementFromPoint;
            // When not obscurred, elementFromPoint should return the element.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = jest.fn().mockReturnValue(otherElement);

            // Act
            const result = isObscured(element);

            // Assert
            expect(result).toBeTruthy();
            // Reset the document method to avoid side-effects.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = ogElementFromPoint;
            done();
        };

        arrange(actAndAssert);
    });
});
