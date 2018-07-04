// @flow
import * as React from "react";
import {shallow} from "enzyme";

import timeout from "../../../utils/testing/timeout.js";

import TooltipArbiter from "./tooltip-arbiter.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

/**
 * We'll mock out the arbiter and use our own with mocks.
 */
jest.mock(
    "../util/suppression-arbiter.js",
    () =>
        class MockArbiter {
            static _track = jest.fn();
            static _untrack = jest.fn();

            track = MockArbiter._track;
            untrack = MockArbiter._untrack;
        },
);

/**
 * Here we make sure we can get hold of the mocks from our mock arbiter.
 */
let trackFn;
let untrackFn;
async function getMockArbiterMocks() {
    const MockArbiter = await import("../util/suppression-arbiter.js");
    // Flow doesn't like our jest mock shenanigans $FlowFixMe
    trackFn = MockArbiter._track;
    // Flow doesn't like our jest mock shenanigans $FlowFixMe
    untrackFn = MockArbiter._untrack;
}

describe("TooltipArbiter", () => {
    /**
     * Ensure the mock arbiter mocks are available to us.
     */
    beforeAll(async () => {
        await getMockArbiterMocks();
    });

    /**
     * Prevent side-effects by resetting the arbiter mocks before each test.
     */
    beforeEach(() => {
        trackFn.mockReset();
        untrackFn.mockReset();
    });

    test("active false, renders children with false,false", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = (
            <TooltipArbiter active={false}>{children}</TooltipArbiter>
        );

        // Act
        shallow(nodes);

        // Assert
        expect(children).toHaveBeenCalledWith(false, false);
    });

    test("active true, calls arbiter track", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = <TooltipArbiter active={true}>{children}</TooltipArbiter>;

        // Act
        shallow(nodes);

        // Assert
        expect(trackFn).toHaveBeenCalled();
    });

    test("active transitions from true to false, calls arbiter untrack", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = <TooltipArbiter active={true}>{children}</TooltipArbiter>;
        const wrapper = shallow(nodes);

        // Act
        wrapper.setProps({active: false});

        // Assert
        expect(untrackFn).toHaveBeenCalled();
    });

    test("active transitions from false to true, calls arbiter track", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = (
            <TooltipArbiter active={false}>{children}</TooltipArbiter>
        );
        const wrapper = shallow(nodes);

        // Act
        wrapper.setProps({active: true});

        // Assert
        expect(trackFn).toHaveBeenCalled();
    });

    describe("#unsuppress", () => {
        test("instant is true and state is inactive, sets state active to true", () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipArbiter active={true}>{children}</TooltipArbiter>
            );
            const wrapper = shallow(nodes);

            // Act
            wrapper.instance().unsuppress(true);

            // Assert
            expect(wrapper.state("active")).toBeTruthy();
        });

        test("instant is false and state is inactive, sets state active to true after delay", async () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipArbiter active={true}>{children}</TooltipArbiter>
            );
            const wrapper = shallow(nodes);

            // Act
            wrapper.instance().unsuppress(false);

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
            await timeout(100);
            expect(wrapper.state("active")).toBeTruthy();
        });
    });

    describe("#suppress", () => {
        test("if active, sets state active to false", () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipArbiter active={true}>{children}</TooltipArbiter>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(true);

            // Act
            wrapper.instance().suppress();

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
        });

        test("clears existing timeout, preventing pending state change", async () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipArbiter active={true}>{children}</TooltipArbiter>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(false);

            // Act
            wrapper.instance().suppress();

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
            await timeout(100);
            expect(wrapper.state("active")).toBeFalsy();
        });
    });
});
