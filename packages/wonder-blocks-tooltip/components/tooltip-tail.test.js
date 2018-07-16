// @flow
import * as React from "react";
import {shallow} from "enzyme";

import TooltipTail from "./tooltip-tail.js";

import type {Placement} from "../util/types.js";

describe("TooltipTail", () => {
    describe("#render", () => {
        test("unknown placement, throws", () => {
            // Arrange
            const fakePlacement = (("notaplacement": any): Placement);
            const nodes = <TooltipTail placement={fakePlacement} />;

            // Act
            const underTest = () => shallow(nodes);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("known placement, does not throw", () => {
            // Arrange
            const testPoints = ["top", "right", "bottom", "left"];
            const makeNode = (p) => <TooltipTail placement={p} />;

            // Act
            const testees = testPoints.map((tp) => () => shallow(makeNode(tp)));

            // Assert
            for (const testee of testees) {
                expect(testee).not.toThrowError();
            }
        });
    });

    describe("INTERNALS", () => {
        // We have some code internally that is there for code maintenance to
        // catch if we add a new placement string and forget to update one of
        // our methods. These tests are to verify those maintenance checks
        // so they poke at the insides of the TooltipTail. We only test the
        // throw case in these examples and rely on testing the external
        // behavior of the component to verify the expected execution paths.
        test("_getFilterPositioning throws on bad placement", () => {
            // Arrange
            const fakePlacement = (("notaplacement": any): Placement);
            // We need an instance so let's make one with a valid placement so
            // that we can render it.
            const nodes = <TooltipTail placement="top" />;
            const wrapper = shallow(nodes);
            const tailInstance = wrapper.instance();
            // Sneakily change props so as not to re-render.
            // This means getting rid of the read-only props and
            // recreating so that we can write a fake placement value
            // for testing.
            const oldProps = tailInstance.props;
            delete tailInstance.props;
            tailInstance.props = {
                ...oldProps,
                placement: fakePlacement,
            };

            // Act
            const underTest = () => tailInstance._getFilterPositioning();

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("_calculateDimensionsFromPlacement throws on bad placement", () => {
            // Arrange
            const fakePlacement = (("notaplacement": any): Placement);
            // We need an instance so let's make one with a valid placement so
            // that we can render it.
            const nodes = <TooltipTail placement="top" />;
            const wrapper = shallow(nodes);
            const tailInstance = wrapper.instance();
            // Sneakily change props so as not to re-render.
            // This means getting rid of the read-only props and
            // recreating so that we can write a fake placement value
            // for testing.
            const oldProps = tailInstance.props;
            delete tailInstance.props;
            tailInstance.props = {
                ...oldProps,
                placement: fakePlacement,
            };

            // Act
            const underTest = () =>
                tailInstance._calculateDimensionsFromPlacement();

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("_minDistanceFromCorners throws on bad placement", () => {
            // Arrange
            const fakePlacement = (("notaplacement": any): Placement);
            // We need an instance so let's make one with a valid placement so
            // that we can render it.
            const nodes = <TooltipTail placement="top" />;
            const wrapper = shallow(nodes);
            const tailInstance = wrapper.instance();

            // Act
            const underTest = () =>
                tailInstance._minDistanceFromCorners(fakePlacement);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });
    });
});
