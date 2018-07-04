// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import doEvent from "../../../utils/testing/do-event.js";
import timeout from "../../../utils/testing/timeout.js";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipAnchor from "./tooltip-anchor.js";
import TooltipArbiter from "./tooltip-arbiter.js";

describe("TooltipAnchor", () => {
    afterEach(() => {
        if (typeof document.addEventListener.mockReset === "function") {
            document.addEventListener.mockRestore();
        }
        if (typeof document.removeEventListener.mockReset === "function") {
            document.removeEventListener.mockRestore();
        }
        unmountAll();
    });

    test("on mount, subscribes to focus and hover events", () => {
        // Arrange
        const getFakeTooltipArbiter = (active) =>
            ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                typeof TooltipArbiter,
            >);
        const nodes = (
            <View>
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
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
        const getFakeTooltipArbiter = (active) =>
            ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                typeof TooltipArbiter,
            >);
        const nodes = (
            <View>
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
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
                const fakeTooltipArbiter = (((
                    <View id="portal">This is the anchor</View>
                ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipArbiter}
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
                const fakeTooltipArbiter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipArbiter}
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
                const fakeTooltipArbiter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={false}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipArbiter}
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
                const fakeTooltipArbiter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipArbiter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipArbiter}
                        </TooltipAnchor>
                    </View>
                );
                wrapper = mount(<TestFixture force={true} />);
            });

            // Act
            const tabindex = ref && ref.getAttribute("tabindex");
            expect(tabindex).toBe("0");

            wrapper && wrapper.setProps({force: false});
            // Need to do a timeout so that the mount can return and the
            // wrapper can change the force prop to false.
            await timeout(0);
            const result = ref && ref.getAttribute("tabindex");

            // Assert
            expect(result).toBeNull();
        });

        test("if we had not added tabindex, leaves it", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const fakeTooltipArbiter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipArbiter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={resolve}
                        >
                            {(active) => fakeTooltipArbiter}
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

    test("receives keyboard focus, is active", async () => {
        // Arrange
        const ref = await new Promise((resolve) => {
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <View>
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipArbiter}
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
        await doEvent(ref, new FocusEvent("focusin"));
        const result = ref && ref.innerHTML;

        // Assert
        expect(result).toBe("true");
    });

    describe("loses keyboard focus", () => {
        test("active is set to false", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipArbiter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipArbiter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            await doEvent(ref, new FocusEvent("focusin"));
            await doEvent(ref, new FocusEvent("focusout"));

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("false");
        });

        test("if hovered, remains active", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipArbiter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipArbiter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            await doEvent(ref, new FocusEvent("focusin"));
            await doEvent(ref, new MouseEvent("mouseenter"));
            await doEvent(ref, new FocusEvent("focusout"));

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("true");
        });
    });

    test("is hovered, is active", async () => {
        // Arrange
        const ref = await new Promise((resolve) => {
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <View>
                    <TooltipAnchor anchorRef={resolve}>
                        {getFakeTooltipArbiter}
                    </TooltipAnchor>
                </View>
            );
            mount(nodes);
        });

        // Act
        await doEvent(ref, new MouseEvent("mouseenter"));

        // Assert
        const result = ref && ref.innerHTML;
        expect(result).toBe("true");
    });

    describe("is unhovered", () => {
        test("active is set to false", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipArbiter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipArbiter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            await doEvent(ref, new MouseEvent("mouseenter"));
            await doEvent(ref, new MouseEvent("mouseleave"));

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("false");
        });

        test("if focused, remains active", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const getFakeTooltipArbiter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipArbiter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={resolve}>
                            {getFakeTooltipArbiter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            });

            // Act
            await doEvent(ref, new MouseEvent("mouseenter"));
            await doEvent(ref, new FocusEvent("focusin"));
            await doEvent(ref, new MouseEvent("mouseleave"));

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("true");
        });
    });

    describe("dismiss behavior", () => {
        test("subscribes to keydown event on active", () => {
            // Arrange
            const spy = jest.spyOn(document, "addEventListener");
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);

            // Act
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(true, false);

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("does not subscribe to keydown event if already active", () => {
            // Arrange
            const spy = jest.spyOn(document, "addEventListener");
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);

            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(false, true);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
            spy.mockClear();

            // Act
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(true, false);

            // Assert
            expect(spy).not.toHaveBeenCalled();
        });

        test("unsubscribes from keydown event on inactive", () => {
            // Arrange
            const spy = jest.spyOn(document, "removeEventListener");
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);

            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(false, true);

            // Act
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(false, false);

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("unsubscribes from keydown event on unmount", () => {
            // Arrange
            const spy = jest.spyOn(document, "removeEventListener");
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(true, true);

            // Act
            wrapper.unmount();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("when active, escape dismisses tooltip", async () => {
            // Arrange
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(false, true);
            const event: KeyboardEvent = (document.createEvent("Event"): any);
            event.key = "Escape";
            event.which = 27;
            event.initEvent("keyup", true, true);

            // Act
            await doEvent(document, event);

            // Assert
            expect(wrapper.state("active")).toBeFalsy();
        });

        test("when active, escape stops event propagation", async () => {
            // Arrange
            const getFakeTooltipArbiter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipArbiter,
                >);
            const nodes = (
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipArbiter}
                </TooltipAnchor>
            );
            const wrapper = mount(nodes);
            // We use the internal code to set active as a shortcut rather
            // than sending events. We already tested that.
            wrapper.instance()._updateActiveState(false, true);
            const event: KeyboardEvent = (document.createEvent("Event"): any);
            event.key = "Escape";
            event.which = 27;
            event.initEvent("keyup", true, true);
            const spyHandler = jest.fn();
            document.addEventListener("keyup", spyHandler);

            // Act
            await doEvent(document, event);

            // Assert
            expect(spyHandler).not.toHaveBeenCalled();
        });
    });
});
