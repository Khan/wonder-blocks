// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import {RenderStateRoot} from "../render-state-root.js";
// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {RenderState, RenderStateContext} from "../render-state-context.js";

const {useContext} = React;

describe("RenderStateRoot", () => {
    test("the first render should set context's value to RenderState.Initial", () => {
        // Arrange
        const values = [];
        const TestComponent = () => {
            const value = useContext(RenderStateContext);

            values.push(value);

            return null;
        };

        // Act
        render(
            <RenderStateRoot throwIfNested={true}>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(values[0]).toEqual(RenderState.Initial);
    });

    test("the second render should set context's value to RenderState.Standard", () => {
        // Arrange
        const values = [];
        const TestComponent = () => {
            const value = useContext(RenderStateContext);

            values.push(value);

            return null;
        };

        // Act
        render(
            <RenderStateRoot throwIfNested={true}>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(values[1]).toEqual(RenderState.Standard);
    });

    it("should not allow nesting of <RenderStateRoot> when throwIfNested={true}", () => {
        // Act
        const underTest = () =>
            render(
                <RenderStateRoot throwIfNested={true}>
                    <RenderStateRoot throwIfNested={true}>
                        Hello, world!
                    </RenderStateRoot>
                </RenderStateRoot>,
            );

        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"There's already a <RenderStateRoot> above this instance in the render tree.  This instance should be removed."`,
        );
    });

    it("should allow nesting of <RenderStateRoot> when throwIfNested={false}", () => {
        // Act
        const underTest = () =>
            render(
                <RenderStateRoot throwIfNested={false}>
                    <RenderStateRoot throwIfNested={false}>
                        Hello, world!
                    </RenderStateRoot>
                </RenderStateRoot>,
            );

        expect(underTest).not.toThrowError();
    });

    // This test can be written once ADR #526 has been implemented.  I've left
    // a comment in the ADR about this kind of test case being something we
    // should support.
    it.todo("should only render a single context provider when nesting");
});
