// @flow
import * as React from "react";
import {mount} from "enzyme";

import TooltipAnchor from "./tooltip-anchor.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

// Some helpers for chaining event handlings.
const doEvent = (ref, event, then) => {
    ref.dispatchEvent(event);
    if (then) {
        setTimeout(then, 0);
    }
};

describe("TooltipAnchor", () => {
    test("on mount, subscribes to focus and hover events", () => {
        // Arrange
        const getFakeTooltipPortalMounter = (active) =>
            (((
                <div id="anchor">{active ? "true" : "false"}</div>
            ): any): React.Element<typeof TooltipPortalMounter>);
        const nodes = (
            <div>
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipPortalMounter}
                </TooltipAnchor>
            </div>
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
            (((
                <div id="anchor">{active ? "true" : "false"}</div>
            ): any): React.Element<typeof TooltipPortalMounter>);
        const nodes = (
            <div>
                <TooltipAnchor anchorRef={() => {}}>
                    {getFakeTooltipPortalMounter}
                </TooltipAnchor>
            </div>
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
                    <div>This is the anchor</div>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                if (!ref) {
                    return;
                }

                // Act
                const result = ref.getAttribute("tabindex");

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
                    <div tabIndex="-1">This is the anchor</div>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor
                            forceAnchorFocusivity={true}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                if (!ref) {
                    return;
                }

                // Act
                const result = ref.getAttribute("tabindex");

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
                    <div>This is the anchor</div>
                ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor
                            forceAnchorFocusivity={false}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                if (!ref) {
                    return;
                }

                // Act
                const result = ref.getAttribute("tabindex");

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
                    <div>This is the anchor</div>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <div>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                const wrapper = mount(<TestFixture force={true} />);
                wrapper.setProps({force: false});
            };

            const actAndAssert = (ref) => {
                // Act
                // Need to do a timeout so that the mount can return and the
                // wrapper can change the force prop to false.
                setTimeout(() => {
                    if (!ref) {
                        return;
                    }

                    const result = ref.getAttribute("tabindex");

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
                    <div tabIndex="-1">This is the anchor</div>
                ): any): React.Element<typeof TooltipPortalMounter>);

                const TestFixture = (props: any) => (
                    <div>
                        <TooltipAnchor
                            forceAnchorFocusivity={props.force}
                            anchorRef={actAndAssert}
                        >
                            {(active) => fakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                const wrapper = mount(<TestFixture force={true} />);
                wrapper.setProps({force: false});
            };

            const actAndAssert = (ref) => {
                // Act
                // Need to do a timeout so that the mount can return and the
                // wrapper can change the force prop to false.
                setTimeout(() => {
                    if (!ref) {
                        return;
                    }

                    const result = ref.getAttribute("tabindex");

                    // Assert
                    expect(result).not.toBeNull();
                    done();
                }, 0);
            };

            arrange(actAndAssert);
        });
    });

    test("receives keyboard focus, is active", (done) => {
        // Arrange
        const arrange = (actAndAssert) => {
            const getFakeTooltipPortalMounter = (active) =>
                (((
                    <div id="anchor">{active ? "true" : "false"}</div>
                ): any): React.Element<typeof TooltipPortalMounter>);
            const nodes = (
                <div>
                    <TooltipAnchor anchorRef={actAndAssert}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                </div>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            if (!ref) {
                return;
            }

            // Act
            // Let's fake a focusin (this is the event that the anchor gets
            // whether focused directly or a child is focused). We have to
            // fake directly because there's no real browser here handling
            // focus and real events.
            const event = new FocusEvent("focusin");
            ref.dispatchEvent(event);

            // Need a timeout here so that the event handling can occur.
            setTimeout(() => {
                if (!ref) {
                    return;
                }

                const result = ref.innerHTML;

                // Assert
                expect(result).toBe("true");
                done();
            }, 0);
        };

        arrange(actAndAssert);
    });

    describe("loses keyboard focus", () => {
        test("active is set to false", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <div id="anchor">{active ? "true" : "false"}</div>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                const localRef = ref;
                if (!localRef) {
                    return;
                }

                // Act
                const focusin = () =>
                    doEvent(localRef, new FocusEvent("focusin"), focusout);
                const focusout = () =>
                    doEvent(localRef, new FocusEvent("focusout"), assert);
                // Focus starts the event chain defined above.
                focusin();

                // Assert
                const assert = () => {
                    const result = localRef.innerHTML;
                    expect(result).toBe("false");
                    done();
                };
            };

            arrange(actAndAssert);
        });

        test("if hovered, remains active", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <div id="anchor">{active ? "true" : "false"}</div>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                const localRef = ref;
                if (!localRef) {
                    return;
                }

                // Act
                const focusin = () =>
                    doEvent(localRef, new FocusEvent("focusin"), mouseenter);
                const mouseenter = () =>
                    doEvent(localRef, new MouseEvent("mouseenter"), focusout);
                const focusout = () =>
                    doEvent(localRef, new FocusEvent("focusout"), assert);
                // Focus starts the event chain defined above.
                focusin();

                // Assert
                const assert = () => {
                    const result = localRef.innerHTML;
                    expect(result).toBe("true");
                    done();
                };
            };

            arrange(actAndAssert);
        });
    });

    test("is hovered, is active", (done) => {
        // Arrange
        const arrange = (actAndAssert) => {
            const getFakeTooltipPortalMounter = (active) =>
                (((
                    <div id="anchor">{active ? "true" : "false"}</div>
                ): any): React.Element<typeof TooltipPortalMounter>);
            const nodes = (
                <div>
                    <TooltipAnchor anchorRef={actAndAssert}>
                        {getFakeTooltipPortalMounter}
                    </TooltipAnchor>
                </div>
            );
            mount(nodes);
        };

        const actAndAssert = (ref) => {
            if (!ref) {
                return;
            }

            // Act
            // Let's fake a mouseenter
            const event = new MouseEvent("mouseenter", {
                bubbles: true,
                cancelable: true,
            });
            ref.dispatchEvent(event);

            // Need a timeout here so that the event handling can occur.
            setTimeout(() => {
                if (!ref) {
                    return;
                }

                const result = ref.innerHTML;

                // Assert
                expect(result).toBe("true");
                done();
            }, 0);
        };

        arrange(actAndAssert);
    });

    describe("is unhovered", () => {
        test("active is set to false", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <div id="anchor">{active ? "true" : "false"}</div>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                const localRef = ref;
                if (!localRef) {
                    return;
                }

                // Act
                const mouseenter = () =>
                    doEvent(localRef, new MouseEvent("mouseenter"), mouseleave);
                const mouseleave = () =>
                    doEvent(localRef, new MouseEvent("mouseleave"), assert);
                // Focus starts the event chain defined above.
                mouseenter();

                // Assert
                const assert = () => {
                    const result = localRef.innerHTML;
                    expect(result).toBe("false");
                    done();
                };
            };

            arrange(actAndAssert);
        });

        test("if focused, remains active", (done) => {
            // Arrange
            const arrange = (actAndAssert) => {
                const getFakeTooltipPortalMounter = (active) =>
                    (((
                        <div id="anchor">{active ? "true" : "false"}</div>
                    ): any): React.Element<typeof TooltipPortalMounter>);
                const nodes = (
                    <div>
                        <TooltipAnchor anchorRef={actAndAssert}>
                            {getFakeTooltipPortalMounter}
                        </TooltipAnchor>
                    </div>
                );
                mount(nodes);
            };

            const actAndAssert = (ref) => {
                const localRef = ref;
                if (!localRef) {
                    return;
                }

                // Act
                const mouseenter = () =>
                    doEvent(localRef, new MouseEvent("mouseenter"), focusin);
                const focusin = () =>
                    doEvent(localRef, new FocusEvent("focusin"), mouseleave);
                const mouseleave = () =>
                    doEvent(localRef, new MouseEvent("mouseleave"), assert);
                // Focus starts the event chain defined above.
                mouseenter();

                // Assert
                const assert = () => {
                    const result = localRef.innerHTML;
                    expect(result).toBe("true");
                    done();
                };
            };

            arrange(actAndAssert);
        });
    });
});
