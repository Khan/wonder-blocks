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
            <RenderStateRoot>
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
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(values[1]).toEqual(RenderState.Standard);
    });

    it("should not allow nesting of <RenderStateRoot>", () => {
        // Act
        const underTest = () =>
            render(
                <RenderStateRoot>
                    <RenderStateRoot>Hello, world!</RenderStateRoot>
                </RenderStateRoot>,
            );

        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"There's already a <RenderStateRoot> above this instance in the render tree.  This instance should be removed."`,
        );
    });
});
