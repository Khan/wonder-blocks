// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TooltipAnchor from "../tooltip-anchor";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../../util/constants";

jest.mock("../../util/active-tracker.js");

describe("TooltipAnchor", () => {
    beforeEach(async () => {
        // $FlowIgnore[method-unbinding]
        if (typeof document.addEventListener.mockReset === "function") {
            // $FlowIgnore[method-unbinding]
            document.addEventListener.mockRestore();
        }
        // $FlowIgnore[method-unbinding]
        if (typeof document.removeEventListener.mockReset === "function") {
            // $FlowIgnore[method-unbinding]
            document.removeEventListener.mockRestore();
        }
        jest.clearAllTimers();
        jest.useFakeTimers();

        const {default: ActiveTracker} = await import(
            "../../util/active-tracker.js"
        );
        // We know there's one global instance of this import, so let's
        // reset it.
        // Flow doesn't know this is a mock
        // $FlowFixMe[prop-missing]
        const mockTracker = ActiveTracker.mock.instances[0];
        mockTracker.steal.mockClear();
        mockTracker.giveup.mockClear();
    });

    test("on mount, subscribes to focus and hover events", () => {
        // Arrange
        const addEventListenerSpy = jest.spyOn(
            HTMLElement.prototype,
            "addEventListener",
        );
        addEventListenerSpy.mockClear();

        // Act
        render(
            <TooltipAnchor anchorRef={() => {}} onActiveChanged={() => {}}>
                Anchor text
            </TooltipAnchor>,
        );

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
        const removeEventListenerSpy = jest.spyOn(
            HTMLElement.prototype,
            "removeEventListener",
        );
        removeEventListenerSpy.mockClear();
        const wrapper = render(
            <TooltipAnchor anchorRef={() => {}} onActiveChanged={() => {}}>
                Anchor text
            </TooltipAnchor>,
        );

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

    test("ref is properly set", () => {
        // Arrange
        const anchorRef = jest.fn();

        render(
            <TooltipAnchor
                forceAnchorFocusivity={true}
                anchorRef={anchorRef}
                onActiveChanged={() => {}}
            >
                <View id="portal">This is the anchor</View>
            </TooltipAnchor>,
        );

        // Act
        const result = screen.getByText("This is the anchor");

        // Assert
        expect(anchorRef).toHaveBeenCalledWith(result);
    });

    describe("forceAnchorFocusivity is true", () => {
        test("if not set, sets tabindex on anchor target", () => {
            // Arrange
            render(
                <TooltipAnchor
                    forceAnchorFocusivity={true}
                    anchorRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    <View id="portal">This is the anchor</View>
                </TooltipAnchor>,
            );

            // Act
            const result = screen.getByText("This is the anchor");

            // Assert
            expect(result).toHaveAttribute("tabindex", "0");
        });

        test("if tabindex already set, leaves it as-is", () => {
            // Arrange
            render(
                <TooltipAnchor
                    forceAnchorFocusivity={true}
                    anchorRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    <View tabIndex={-1}>This is the anchor</View>
                </TooltipAnchor>,
            );

            // Act
            const result = screen.getByText("This is the anchor");

            // Assert
            expect(result).toHaveAttribute("tabindex", "-1");
        });
    });

    describe("forceAnchorFocusivity is false", () => {
        test("does not set tabindex on anchor target", () => {
            // Arrange
            render(
                <TooltipAnchor
                    forceAnchorFocusivity={false}
                    anchorRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    <View>This is the anchor</View>
                </TooltipAnchor>,
            );

            // Act
            const result = screen.getByText("This is the anchor");

            // Assert
            expect(result).not.toHaveAttribute("tabindex");
        });

        test("if we had added tabindex, removes it", async () => {
            // Arrange
            const TestFixture = (props: any) => (
                <TooltipAnchor
                    forceAnchorFocusivity={props.force}
                    anchorRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    <View>This is the anchor</View>
                </TooltipAnchor>
            );
            const {rerender} = render(<TestFixture force={true} />);

            // Act
            expect(screen.getByText("This is the anchor")).toHaveAttribute(
                "tabindex",
                "0",
            );

            rerender(<TestFixture force={false} />);

            // Assert
            expect(screen.getByText("This is the anchor")).not.toHaveAttribute(
                "tabindex",
            );
        });

        test("if we had not added tabindex, leaves it", async () => {
            // Arrange
            const TestFixture = (props: any) => (
                <TooltipAnchor
                    forceAnchorFocusivity={props.force}
                    anchorRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    <View tabIndex={-1}>This is the anchor</View>
                </TooltipAnchor>
            );

            const wrapper = render(<TestFixture force={true} />);

            // Act
            wrapper.rerender(<TestFixture force={false} />);

            // Assert
            expect(screen.getByText("This is the anchor")).toHaveAttribute(
                "tabindex",
                "-1",
            );
        });
    });

    describe("receives keyboard focus", () => {
        test("active state was not stolen, delays set active", async () => {
            // Arrange
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            // Let's tell the tooltip it isn't stealing and therefore it should
            // be using a delay to show the tooltip.
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => false);

            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Act
            // Let's focus the anchor
            userEvent.tab();
            // Check that we didn't go active before the delay
            expect(activeState).toBe(false);
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(true);
        });

        test("active state was stolen, set active immediately", async () => {
            // Arrange
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Let's tell the tooltip it is stealing and therefore it should
            // not be using a delay to show the tooltip.
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => true);

            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Act
            // Let's focus the anchor
            userEvent.tab();

            // Assert
            expect(activeState).toBe(true);
        });
    });

    describe("loses keyboard focus", () => {
        test("active state was not stolen, active is set to false with delay", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Let's focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            // Let's blur the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(false);
        });

        test("active state was not stolen, gives up active state", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];

            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Let's focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            // Let's blur the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(mockTracker.giveup).toHaveBeenCalledTimes(1);
        });

        test("active state was stolen, active is set to false immediately", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            // Blur the anchor
            userEvent.tab();
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(false);
        });

        test("active state was stolen, so it does not have it to give up", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            // Arrange
            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );
            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            // Blur the anchor
            userEvent.tab();

            // Assert
            expect(mockTracker.giveup).not.toHaveBeenCalled();
        });

        test("if hovered, remains active", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            timeoutSpy.mockClear();
            userEvent.hover(screen.getByText("Anchor Text"));

            // Act
            // Blur the anchor
            userEvent.tab();

            // Assert
            // Make sure that we're not delay hiding as well.
            expect(activeState).toBe(true);
            expect(timeoutSpy).not.toHaveBeenCalled();
        });
    });

    describe("is hovered", () => {
        test("active state was not stolen, delays set active", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Let's tell the tooltip it isn't stealing and therefore it should
            // be using a delay to show the tooltip.
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => false);

            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Act
            userEvent.hover(screen.getByText("Anchor Text"));
            // Check that we didn't go active before the delay
            expect(activeState).toBe(false);
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(true);
        });

        test("active state was stolen, set active immediately", async () => {
            // Arrange
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Let's tell the tooltip it is stealing and therefore it should
            // not be using a delay to show the tooltip.
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            mockTracker.steal.mockImplementationOnce(() => true);

            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Act
            userEvent.hover(screen.getByText("Anchor Text"));

            // Assert
            expect(activeState).toBe(true);
        });
    });

    describe("is unhovered", () => {
        test("active state was not stolen, active is set to false with delay", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            userEvent.unhover(screen.getByText("Anchor Text"));
            expect(activeState).toBe(true);
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(false);
        });

        test("active state was not stolen, gives up active state", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            userEvent.unhover(screen.getByText("Anchor Text"));
            expect(activeState).toBe(true);
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(mockTracker.giveup).toHaveBeenCalledTimes(1);
        });

        test("active state was stolen, active is set to false immediately", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;

            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            userEvent.unhover(screen.getByText("Anchor Text"));
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(false);
        });

        test("active state was stolen, so it does not have it to give up", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const {default: ActiveTracker} = await import(
                "../../util/active-tracker.js"
            );
            // Flow doesn't know this is a mock
            // $FlowFixMe[prop-missing]
            const mockTracker = ActiveTracker.mock.instances[0];
            // Arrange
            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );
            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(activeState).toBe(true);

            // Act
            userEvent.unhover(screen.getByText("Anchor Text"));

            // Assert
            expect(mockTracker.giveup).not.toHaveBeenCalled();
        });

        test("if focused, remains active", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );
            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            timeoutSpy.mockClear();
            // Focus the anchor
            userEvent.tab();

            // Act
            userEvent.unhover(screen.getByText("Anchor Text"));

            // Assert
            // Make sure that we're not delay hiding as well.
            expect(activeState).toBe(true);
            expect(timeoutSpy).not.toHaveBeenCalled();
        });
    });

    describe("dismiss behavior", () => {
        test("subscribes to keydown event on active", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const spy = jest.spyOn(document, "addEventListener");
            render(
                <TooltipAnchor anchorRef={jest.fn()} onActiveChanged={() => {}}>
                    Anchor Text
                </TooltipAnchor>,
            );

            // Act
            userEvent.hover(screen.getByText("Anchor Text"));
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("does not subscribe to keydown event if already active", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const spy = jest.spyOn(document, "addEventListener");
            render(
                <TooltipAnchor anchorRef={jest.fn()} onActiveChanged={() => {}}>
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
            spy.mockClear();

            // Act
            userEvent.hover(screen.getByText("Anchor Text"));

            // Assert
            expect(spy).not.toHaveBeenCalled();
        });

        test("unsubscribes from keydown event on inactive", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const spy = jest.spyOn(document, "removeEventListener");
            render(
                <TooltipAnchor anchorRef={jest.fn()} onActiveChanged={() => {}}>
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Act
            // Blur the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("unsubscribes from keydown event on unmount", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");

            const spy = jest.spyOn(document, "removeEventListener");
            const {unmount} = render(
                <TooltipAnchor anchorRef={jest.fn()} onActiveChanged={() => {}}>
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Act
            unmount();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith("keyup", expect.any(Function));
        });

        test("when active, escape dismisses tooltip", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            let activeState = false;
            render(
                <TooltipAnchor
                    anchorRef={jest.fn()}
                    onActiveChanged={(active) => {
                        activeState = active;
                    }}
                >
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Act
            userEvent.keyboard("{esc}");
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(activeState).toBe(false);
        });

        test("when active, escape stops event propagation", async () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            render(
                <TooltipAnchor anchorRef={jest.fn()} onActiveChanged={() => {}}>
                    Anchor Text
                </TooltipAnchor>,
            );

            // Focus the anchor
            userEvent.tab();
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipAppearanceDelay,
            );
            jest.runOnlyPendingTimers();
            const event: KeyboardEvent = (document.createEvent("Event"): any);
            const spyOnStopPropagation = jest.spyOn(event, "stopPropagation");
            // $FlowIgnore[cannot-write]
            event.key = "Escape";
            event.initEvent("keyup", true, true);

            // Act
            document.dispatchEvent(event);
            expect(timeoutSpy).toHaveBeenLastCalledWith(
                expect.any(Function),
                TooltipDisappearanceDelay,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(spyOnStopPropagation).toHaveBeenCalled();
        });
    });
});
