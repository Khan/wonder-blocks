// @flow
import * as React from "react";
import {mount} from "enzyme";

import doEvent from "../../../utils/testing/do-event.js";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipAnchor from "./tooltip-anchor.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

describe("TooltipAnchor", () => {
    test("on mount, subscribes to focus and hover events", () => {
        // Arrange
        const getFakeTooltipPortalMounter = (active) =>
            ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                typeof TooltipPortalMounter,
            >);
        const nodes = (
            <View>
                <TooltipAnchor anchorRef={() => {}}>
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
                <TooltipAnchor anchorRef={() => {}}>
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
        test("if not set, sets tabindex on anchor target", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const fakeTooltipPortalMounter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                // Act
                const result = ref && ref.getAttribute("tabindex");

                // Assert
                expect(result).toBe("0");
                done();
            };

            arrange(actAndAssert);
        });

        test("if tabindex already set, leaves it as-is", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const fakeTooltipPortalMounter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                // Act
                const result = ref && ref.getAttribute("tabindex");

                // Assert
                expect(result).toBe("-1");
                done();
            };

            arrange(actAndAssert);
        });
    });

    describe("forceAnchorFocusivity is false", () => {
        test("does not set tabindex on anchor target", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const fakeTooltipPortalMounter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={false}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                // Act
                const result = ref && ref.getAttribute("tabindex");

                // Assert
                expect(result).toBeNull();
                done();
            };

            arrange(actAndAssert);
        });

        test("if we had added tabindex, removes it", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const fakeTooltipPortalMounter = (((
                    <View>This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                const wrapper = mount(<TestFixture force={true} />);
                wrapper.setProps({force: false});
            };

            const actAndAssert = (ref) => {
                // Act
                const tabindex = ref && ref.getAttribute("tabindex");
                expect(tabindex).toBe("0");

                // Need to do a timeout so that the mount can return and the
                // wrapper can change the force prop to false.
                setTimeout(() => {
                    const result = ref && ref.getAttribute("tabindex");

                    // Assert
                    expect(result).toBeNull();
                    done();
                }, 0);
            };

            arrange(actAndAssert);
        });

        test("if we had not added tabindex, leaves it", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const fakeTooltipPortalMounter = (((
                    <View tabIndex="-1">This is the anchor</View>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <View>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                const wrapper = mount(<TestFixture force={true} />);
                wrapper.setProps({force: false});
            };

            const actAndAssert = async (ref) => {
                // Act
                const result = ref && ref.getAttribute("tabindex");

                // Assert
                expect(result).not.toBeNull();
                done();
            };

            arrange(actAndAssert);
        });
    });

    test("receives keyboard focus, is active", (done) => {
        // Arrange
        const arrange = (actAndAssert) => {
            const getFakeTooltipPortalMounter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipPortalMounter,
                >);
            const nodes = (
                <View>
                    <TooltipAnchor anchorRef={actAndAssert}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = async (ref) => {
            // Act
            // Let's fake a focusin (this is the event that the anchor gets
            // whether focused directly or a child is focused). We have to
            // fake directly because there's no real browser here handling
            // focus and real events.
            await doEvent(ref, new FocusEvent("focusin"));
            const result = ref && ref.innerHTML;

            // Assert
            expect(result).toBe("true");
            done();
        };

        arrange(actAndAssert);
    });

    describe("loses keyboard focus", () => {
        test("active is set to false", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = async (ref) => {
                // Act
                await doEvent(ref, new FocusEvent("focusin"));
                await doEvent(ref, new FocusEvent("focusout"));

                // Assert
                const result = ref && ref.innerHTML;
                expect(result).toBe("false");
                done();
            };

            arrange(actAndAssert);
        });

        test("if hovered, remains active", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = async (ref) => {
                // Act
                await doEvent(ref, new FocusEvent("focusin"));
                await doEvent(ref, new MouseEvent("mouseenter"));
                await doEvent(ref, new FocusEvent("focusout"));

                // Assert
                const result = ref && ref.innerHTML;
                expect(result).toBe("true");
                done();
            };

            arrange(actAndAssert);
        });
    });

    test("is hovered, is active", (done) => {
        // Arrange
        const arrange = (actAndAssert) => {
            const getFakeTooltipPortalMounter = (active) =>
                ((<View>{active ? "true" : "false"}</View>: any): React.Element<
                    typeof TooltipPortalMounter,
                >);
            const nodes = (
                <View>
                    <TooltipAnchor anchorRef={actAndAssert}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = async (ref) => {
            // Act
            await doEvent(ref, new MouseEvent("mouseenter"));

            // Assert
            const result = ref && ref.innerHTML;
            expect(result).toBe("true");
            done();
        };

        arrange(actAndAssert);
    });

    describe("is unhovered", () => {
        test("active is set to false", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = async (ref) => {
                // Act
                await doEvent(ref, new MouseEvent("mouseenter"));
                await doEvent(ref, new MouseEvent("mouseleave"));

                // Assert
                const result = ref && ref.innerHTML;
                expect(result).toBe("false");
                done();
            };

            arrange(actAndAssert);
        });

        test("if focused, remains active", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <View>{active ? "true" : "false"}</View>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <View>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </View>
                );
                mount(nodes);
            };

            const actAndAssert = async (ref) => {
                // Act
                await doEvent(ref, new MouseEvent("mouseenter"));
                await doEvent(ref, new FocusEvent("focusin"));
                await doEvent(ref, new MouseEvent("mouseleave"));

                // Assert
                const result = ref && ref.innerHTML;
                expect(result).toBe("true");
                done();
            };

            arrange(actAndAssert);
        });
    });
});
