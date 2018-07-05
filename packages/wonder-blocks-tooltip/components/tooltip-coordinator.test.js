// @flow
import * as React from "react";
import {shallow} from "enzyme";

import timeout from "../../../utils/testing/timeout.js";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants.js";

import TooltipCoordinator from "./tooltip-coordinator.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

/**
 * We'll mock out the tracker and use our own with mocks.
 */
jest.mock(
    "../util/suppression-tracker.js",
    () =>
        class MockTracker {
            static _track = jest.fn();
            static _untrack = jest.fn();

            track = MockTracker._track;
            untrack = MockTracker._untrack;
        },
);

/**
 * Here we make sure we can get hold of the mocks from our mock tracker.
 */
let trackFn;
let untrackFn;
async function getMockTrackerMocks() {
    const MockTracker = await import("../util/suppression-tracker.js");
    // Flow doesn't like our jest mock shenanigans $FlowFixMe
    trackFn = MockTracker._track;
    // Flow doesn't like our jest mock shenanigans $FlowFixMe
    untrackFn = MockTracker._untrack;
}

describe("TooltipCoordinator", () => {
    /**
     * Ensure the mock tracker mocks are available to us.
     */
    beforeAll(async () => {
        await getMockTrackerMocks();
    });

    /**
     * Prevent side-effects by resetting the tracker mocks before each test.
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
            <TooltipCoordinator active={false}>{children}</TooltipCoordinator>
        );

        // Act
        shallow(nodes);

        // Assert
        expect(children).toHaveBeenCalledWith(false, false);
    });

    test("active true, calls tracker's track", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = (
            <TooltipCoordinator active={true}>{children}</TooltipCoordinator>
        );

        // Act
        shallow(nodes);

        // Assert
        expect(trackFn).toHaveBeenCalled();
    });

    test("active transitions from true to false, calls tracker's untrack", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = (
            <TooltipCoordinator active={true}>{children}</TooltipCoordinator>
        );
        const wrapper = shallow(nodes);

        // Act
        wrapper.setProps({active: false});

        // Assert
        expect(untrackFn).toHaveBeenCalled();
    });

    test("active transitions from false to true, calls tracker's track", () => {
        // Arrange
        const children = jest.fn(
            () => ((null: any): React.Element<typeof TooltipPortalMounter>),
        );
        const nodes = (
            <TooltipCoordinator active={false}>{children}</TooltipCoordinator>
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
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
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
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
            );
            const wrapper = shallow(nodes);

            // Act
            wrapper.instance().unsuppress(false);

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
            await timeout(TooltipAppearanceDelay);
            expect(wrapper.state("active")).toBeTruthy();
        });

        test("clears existing timeout, preventing pending state change", async () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(true);
            wrapper.instance().suppress(false);

            // Act
            wrapper.instance().unsuppress(true);

            // Assert
            expect(wrapper.state("active")).toBeTruthy();
            await timeout(TooltipDisappearanceDelay);
            expect(wrapper.state("active")).toBeTruthy();
        });
    });

    describe("#suppress", () => {
        test("instant is true and state is active, sets state active to false", () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(true);

            // Act
            wrapper.instance().suppress(true);

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
        });

        test("instant is false and state is inactive, sets state active to false after delay", async () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(true);

            // Act
            wrapper.instance().suppress(false);

            // Assert
            expect(wrapper.state("active")).toBeTruthy();
            await timeout(TooltipDisappearanceDelay);
            expect(wrapper.state("active")).toBeFalsy();
        });

        test("clears existing timeout, preventing pending state change", async () => {
            // Arrange
            const children = jest.fn(
                () => ((null: any): React.Element<typeof TooltipPortalMounter>),
            );
            const nodes = (
                <TooltipCoordinator active={true}>
                    {children}
                </TooltipCoordinator>
            );
            const wrapper = shallow(nodes);
            wrapper.instance().unsuppress(false);

            // Act
            wrapper.instance().suppress();

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
            await timeout(TooltipAppearanceDelay);
            expect(wrapper.state("active")).toBeFalsy();
        });
    });
});
