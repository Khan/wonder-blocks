/* eslint-disable max-lines */
// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipAnchor from "./tooltip-anchor.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants.js";

jest.mock("../util/active-tracker.js");

const noop = () => {};

describe("TooltipAnchor", () => {
    beforeEach(async () => {
        if (typeof document.addEventListener.mockReset === "function") {
            document.addEventListener.mockRestore();
        }
        if (typeof document.removeEventListener.mockReset === "function") {
            document.removeEventListener.mockRestore();
        }
        unmountAll();
        jest.clearAllTimers();
        jest.useFakeTimers();

        const {
            default: ActiveTracker,
        } = await import("../util/active-tracker.js");
        // We know there's one global instance of this import, so let's
        // reset it.
        // Flow doesn't know this is a mock $FlowFixMe
        const mockTracker = ActiveTracker.mock.instances[0];
        mockTracker.steal.mockClear();
        mockTracker.giveup.mockClear();
    });

    test("on mount, subscribes to focus and hover events", () => {
        // Arrange
        const getFakeTooltipPortalMounter = (active) =>
            ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                typeof TooltipPortalMounter,
            >);
        const nodes = (
            <View>
                <TooltipAnchor anchorRef={noop}>
                    {getFakeTooltipPortalMounter}
                </TooltipAnchor>
            </View>
        );
        const addEventListenerSpy = jest.spyOn(
            HTMLElement.prototype,
            "addEventListener",
        );
        addEventListenerSpy.mockClear();

        // Act
        mount(nodes);

        // Assert
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "focusin",
            expect.any(Function),
        );
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "focusout",
            expect.any(Function),
        );
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "mouseenter",
            expect.any(Function),
        );
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "mouseleave",
            expect.any(Function),
        );
    });

    test("on unmount, unsubscribes from focus and hover events", () => {
        // Arrange
        const getFakeTooltipPortalMounter = (active) =>
            ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                typeof TooltipPortalMounter,
            >);
        const nodes = (
            <View>
                <TooltipAnchor anchorRef={noop}>
                    {getFakeTooltipPortalMounter}
                </TooltipAnchor>
            </View>
        );
        const removeEventListenerSpy = jest.spyOn(
            HTMLElement.prototype,
            "removeEventListener",
        );
        removeEventListenerSpy.mockClear();
        const wrapper = mount(nodes);

        // Act
        wrapper.unmount();

        // Assert
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "focusin",
            expect.any(Function),
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "focusout",
            expect.any(Function),
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "mouseenter",
            expect.any(Function),
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "mouseleave",
            expect.any(Function),
        );
    });

    describe("forceAnchorFocusivity is true", () => {
        test("if not set, sets tabindex on anchor target", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const fakeTooltipPortalMounter = (((
                    <View id="portal">This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).toBe("0");
        });

        test("if tabindex already set, leaves it as-is", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const fakeTooltipPortalMounter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).toBe("-1");
        });
    });

    describe("forceAnchorFocusivity is false", () => {
        test("does not set tabindex on anchor target", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const fakeTooltipPortalMounter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={false}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).toBeNull();
        });

        test("if we had added tabindex, removes it", async () => {
            // Arrange
            let wrapper;
            const ref = await new Promise((resolve) => {
                const fakeTooltipPortalMounter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                wrapper = mount(<TestFixture force={true} />);
            });

            // Act
            const tabindex = ref && ref.getAttribute("tabindex");
            expect(tabindex).toBe("0");

            wrapper && wrapper.setProps({force: false});
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).toBeNull();
        });

        test("if we had not added tabindex, leaves it", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const fakeTooltipPortalMounter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                const wrapper = mount(<TestFixture force={true} />);
                wrapper.setProps({force: false});
            });

            // Act
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).not.toBeNull();
        });
    });

    describe("receives keyboard focus", () => {
        test("active state was not stolen, delays set active", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Let's tell the tooltip it isn't stealing and therefore it should
            // be using a delay to show the tooltip.
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => false);

            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            // Let's fake a focusin (this is the event that the anchor gets
            // whether focused directly or a child is focused). We have to
            // fake directly because there's no real browser here handling
            // focus and real events.
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            const before = ref && ref.innerHTML;
            // Check that we didn't go active before the delay
            expect(before).toBe("false");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("true");
        });

        test("active state was stolen, set active immediately", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Let's tell the tooltip it is stealing and therefore it should
            // not be using a delay to show the tooltip.
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => true);

            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            // Let's fake a focusin (this is the event that the anchor gets
            // whether focused directly or a child is focused). We have to
            // fake directly because there's no real browser here handling
            // focus and real events.
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("true");
        });
    });

    describe("loses keyboard focus", () => {
        test("active state was not stolen, active is set to false with delay", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new FocusEvent("focusout"));
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("false");
        });

        test("active state was not stolen, gives up active state", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new FocusEvent("focusout"));
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(mockTracker.giveup).toHaveBeenCalledTimes(1);
        });

        test("active state was stolen, active is set to false immediately", async () => {
            // Arrange
            let wrapper;
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                wrapper = mount(nodes);
            });
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new FocusEvent("focusout"));
            wrapper && wrapper.instance().activeStateStolen();

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("false");
        });

        test("active state was stolen, so it does not have it to give up", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            // Arrange
            let wrapper;
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                wrapper = mount(nodes);
            });
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new FocusEvent("focusout"));
            wrapper && wrapper.instance().activeStateStolen();

            // Assert
            expect(mockTracker.giveup).not.toHaveBeenCalled();
        });

        test("if hovered, remains active", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new FocusEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            setTimeout.mockClear();
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));

            // Act
            ref && ref.dispatchEvent(new FocusEvent("focusout"));

            // Assert
            // Make sure that we're not delay hiding as well.
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).not.toHaveBeenCalled();
        });
    });

    describe("is hovered", () => {
        test("active state was not stolen, delays set active", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Let's tell the tooltip it isn't stealing and therefore it should
            // be using a delay to show the tooltip.
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => false);

            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            const before = ref && ref.innerHTML;
            // Check that we didn't go active before the delay
            expect(before).toBe("false");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("true");
        });

        test("active state was stolen, set active immediately", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Let's tell the tooltip it is stealing and therefore it should
            // not be using a delay to show the tooltip.
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => true);

            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("true");
        });
    });

    describe("is unhovered", () => {
        test("active state was not stolen, active is set to false with delay", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseleave"));
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("false");
        });

        test("active state was not stolen, gives up active state", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseleave"));
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(mockTracker.giveup).toHaveBeenCalledTimes(1);
        });

        test("active state was stolen, active is set to false immediately", async () => {
            // Arrange
            let wrapper;
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                wrapper = mount(nodes);
            });
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseleave"));
            wrapper && wrapper.instance().activeStateStolen();

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("false");
        });

        test("active state was stolen, so it does not have it to give up", async () => {
            // Arrange
            const {
                default: ActiveTracker,
            } = await import("../util/active-tracker.js");
            // Flow doesn't know this is a mock $FlowFixMe
            const mockTracker = ActiveTracker.mock.instances[0];
            // Arrange
            let wrapper;
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                );
                wrapper = mount(nodes);
            });
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(ref && ref.innerHTML).toBe("true");

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseleave"));
            wrapper && wrapper.instance().activeStateStolen();

            // Assert
            expect(mockTracker.giveup).not.toHaveBeenCalled();
        });

        test("if focused, remains active", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            setTimeout.mockClear();
            ref && ref.dispatchEvent(new FocusEvent("focusin"));

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseleave"));

            // Assert
            // Make sure that we're not delay hiding as well.
            expect(ref && ref.innerHTML).toBe("true");
            expect(setTimeout).not.toHaveBeenCalled();
        });
    });

    describe("dismiss behavior", () => {
        test("subscribes to keydown event on active", async () => {
            // Arrange
            const spy = jest.spyOn(document, "addEventListener");
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("does not subscribe to keydown event if already active", async () => {
            // Arrange
            const spy = jest.spyOn(document, "addEventListener");
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            ref && ref.dispatchEvent(new KeyboardEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
            spy.mockClear();

            // Act
            ref && ref.dispatchEvent(new MouseEvent("mouseenter"));

            // Assert
            expect(spy).not.toHaveBeenCalled();
        });

        test("unsubscribes from keydown event on inactive", async () => {
            // Arrange
            const spy = jest.spyOn(document, "removeEventListener");
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            ref && ref.dispatchEvent(new KeyboardEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Act
            ref && ref.dispatchEvent(new KeyboardEvent("focusout"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("unsubscribes from keydown event on unmount", async () => {
            // Arrange
            let wrapper;
            const spy = jest.spyOn(document, "removeEventListener");
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                wrapper = mount(nodes);
            });

            ref && ref.dispatchEvent(new KeyboardEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Act
            wrapper && wrapper.unmount();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("when active, escape dismisses tooltip", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            ref && ref.dispatchEvent(new KeyboardEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const event: KeyboardEvent = (document.createEvent("Event"): any);
            event.key = "Escape";
            event.which = 27;
            event.initEvent("keyup", true, true);

            // Act
            document.dispatchEvent(event);
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(ref && ref.innerHTML).toBe("false");
        });

        test("when active, escape stops event propagation", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            ref && ref.dispatchEvent(new KeyboardEvent("focusin"));
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const event: KeyboardEvent = (document.createEvent("Event"): any);
            const spyOnStopPropagation = jest.spyOn(event, "stopPropagation");
            event.key = "Escape";
            event.initEvent("keyup", true, true);

            // Act
            document.dispatchEvent(event);
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spyOnStopPropagation).toHaveBeenCalled();
        });
    });
});
