// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
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
                <div>
                    <div ref={actAndAssert}>Unobscured</div>
                </div>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);
            // When not obscurred, elementFromPoint should return the element.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = jest.fn().mockReturnValue(element);

            // Act
            const result = isObscured(element);

            // Assert
            expect(result).toBeFalsy();
            done();
        };

        arrange(actAndAssert);
    });

    test("element is partially obscured, returns false", (done) => {
        // Arrange
        let otherElement = null;
        const arrange = (actAndAssert) => {
            const nodes = (
                <div>
                    <div ref={(ref) => (otherElement = ref)} />
                    <div ref={actAndAssert}>Unobscured</div>
                </div>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);
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
            done();
        };

        arrange(actAndAssert);
    });

    test("element is obscured, returns true", (done) => {
        // Arrange
        let otherElement = null;
        const arrange = (actAndAssert) => {
            const nodes = (
                <div>
                    <div ref={(ref) => (otherElement = ref)}>
                        Pretend this covers everything
                    </div>
                    <div ref={actAndAssert}>Unobscured</div>
                </div>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            const element = ((ReactDOM.findDOMNode(ref): any): Element);
            // When not obscurred, elementFromPoint should return the element.
            // Flow doesn't like us doing this to the document $FlowFixMe
            document.elementFromPoint = jest.fn().mockReturnValue(otherElement);

            // Act
            const result = isObscured(element);

            // Assert
            expect(result).toBeTruthy();
            done();
        };

        arrange(actAndAssert);
    });
});
