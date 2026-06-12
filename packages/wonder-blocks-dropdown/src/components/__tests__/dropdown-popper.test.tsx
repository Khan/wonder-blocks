import * as React from "react";
import {act, render, screen, waitFor} from "@testing-library/react";
import {Popper} from "react-popper";

import DropdownPopper from "../dropdown-popper";
import {maxHeightModifier} from "../../util/popper-max-height-modifier";

// Mock `Popper` so individual tests can drive its render-prop arguments (e.g.
// `update`, `hasPopperEscaped`). By default it delegates to the real Popper so
// the existing positioning/max-height tests keep exercising real behavior.
jest.mock("react-popper", () => {
    const React = require("react");
    const actual = jest.requireActual("react-popper");
    return {
        __esModule: true,
        ...actual,
        Popper: jest.fn((props) => React.createElement(actual.Popper, props)),
    };
});

const mockPopper = Popper as unknown as jest.Mock;
const actualPopper = jest.requireActual("react-popper").Popper;

/**
 * Installs a mock `window.visualViewport` with controllable event listeners.
 * Returns the mock, which exposes a `dispatch(type)` helper to fire events.
 */
function mockVisualViewport() {
    const listeners: Record<string, Array<() => void>> = {
        resize: [],
        scroll: [],
    };
    const vv = {
        offsetLeft: 0,
        offsetTop: 0,
        width: 500,
        height: 400,
        scale: 2, // zoomed in
        addEventListener: jest.fn((type: string, cb: () => void) => {
            (listeners[type] ??= []).push(cb);
        }),
        removeEventListener: jest.fn((type: string, cb: () => void) => {
            listeners[type] = (listeners[type] ?? []).filter((l) => l !== cb);
        }),
        dispatch: (type: string) => (listeners[type] ?? []).forEach((l) => l()),
    };
    Object.defineProperty(window, "visualViewport", {
        configurable: true,
        writable: true,
        value: vv,
    });
    return vv;
}

/**
 * Makes the mocked Popper render its children immediately with the given
 * render-prop arguments, instead of delegating to the real Popper.
 */
function mockPopperRenderProps(
    renderProps: Partial<{
        ref: unknown;
        style: object;
        placement: string;
        hasPopperEscaped: boolean;
        isReferenceHidden: boolean;
        update: () => Promise<unknown>;
    }> = {},
) {
    mockPopper.mockImplementation(({children}: any) =>
        children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            hasPopperEscaped: false,
            isReferenceHidden: false,
            update: jest.fn().mockResolvedValue(null),
            ...renderProps,
        }),
    );
}

describe("DropdownPopper", () => {
    beforeEach(() => {
        // Reset to the real Popper implementation before each test.
        mockPopper.mockImplementation((props: any) =>
            React.createElement(actualPopper, props),
        );
    });

    afterEach(() => {
        // Restore visualViewport so mocks don't leak across tests.
        Object.defineProperty(window, "visualViewport", {
            configurable: true,
            writable: true,
            value: undefined,
        });
    });

    it("renders the children if valid props are passed in", () => {
        // Arrange
        const referenceElement = document.createElement("button");

        // Act
        render(
            <DropdownPopper referenceElement={referenceElement}>
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        expect(screen.getByTestId("dropdown-container")).toBeInTheDocument();
    });

    it("renders the dropdown aligned to the right", () => {
        // Arrange
        const referenceElement = document.createElement("button");

        // Act
        render(
            <DropdownPopper
                referenceElement={referenceElement}
                alignment="right"
            >
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        expect(screen.getByTestId("dropdown-popper")).toHaveAttribute(
            "data-placement",
            "bottom-end",
        );
    });

    it("applies a max-height style", async () => {
        // Arrange
        const referenceElement = document.createElement("button");
        jest.spyOn(maxHeightModifier, "fn").mockImplementation(({state}) => {
            state.styles.popper = {
                ...state.styles.popper,
                maxHeight: "500px",
            };
        });

        // Act
        render(
            <DropdownPopper referenceElement={referenceElement}>
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        await waitFor(() =>
            expect(screen.getByTestId("dropdown-popper")).toHaveStyle(
                "max-height: 500px",
            ),
        );
    });

    describe("visual viewport (pinch-zoom)", () => {
        it("recomputes Popper position when the visual viewport resizes", () => {
            // Arrange
            const vv = mockVisualViewport();
            const update = jest.fn().mockResolvedValue(null);
            mockPopperRenderProps({update});

            render(
                <DropdownPopper
                    referenceElement={document.createElement("button")}
                >
                    {() => <div data-testid="dropdown-container">c</div>}
                </DropdownPopper>,
            );

            // Act
            act(() => vv.dispatch("resize"));

            // Assert
            expect(vv.addEventListener).toHaveBeenCalledWith(
                "resize",
                expect.any(Function),
            );
            expect(update).toHaveBeenCalledTimes(1);
        });

        it("recomputes Popper position when the visual viewport scrolls", () => {
            // Arrange
            const vv = mockVisualViewport();
            const update = jest.fn().mockResolvedValue(null);
            mockPopperRenderProps({update});

            render(
                <DropdownPopper
                    referenceElement={document.createElement("button")}
                >
                    {() => <div data-testid="dropdown-container">c</div>}
                </DropdownPopper>,
            );

            // Act
            act(() => vv.dispatch("scroll"));

            // Assert
            expect(vv.addEventListener).toHaveBeenCalledWith(
                "scroll",
                expect.any(Function),
            );
            expect(update).toHaveBeenCalledTimes(1);
        });

        it("removes the visual viewport listeners on unmount", () => {
            // Arrange
            const vv = mockVisualViewport();
            mockPopperRenderProps();

            const {unmount} = render(
                <DropdownPopper
                    referenceElement={document.createElement("button")}
                >
                    {() => <div data-testid="dropdown-container">c</div>}
                </DropdownPopper>,
            );

            // Act
            unmount();

            // Assert
            expect(vv.removeEventListener).toHaveBeenCalledWith(
                "resize",
                expect.any(Function),
            );
            expect(vv.removeEventListener).toHaveBeenCalledWith(
                "scroll",
                expect.any(Function),
            );
        });

        it("does not throw when visualViewport is unavailable", () => {
            // Arrange
            Object.defineProperty(window, "visualViewport", {
                configurable: true,
                writable: true,
                value: undefined,
            });
            mockPopperRenderProps();

            // Act + Assert
            expect(() =>
                render(
                    <DropdownPopper
                        referenceElement={document.createElement("button")}
                    >
                        {() => <div data-testid="dropdown-container">c</div>}
                    </DropdownPopper>,
                ),
            ).not.toThrow();
        });
    });

    describe("hide suppression", () => {
        it("does not hide the menu when only the reference is hidden (pinch-zoom)", () => {
            // Arrange
            const childSpy = jest.fn(() => (
                <div data-testid="dropdown-container">c</div>
            ));
            // The false-positive that occurs under iOS pinch-zoom.
            mockPopperRenderProps({
                isReferenceHidden: true,
                hasPopperEscaped: false,
            });

            // Act
            render(
                <DropdownPopper
                    referenceElement={document.createElement("button")}
                >
                    {childSpy}
                </DropdownPopper>,
            );

            // Assert: children invoked with shouldHidePopper === false
            expect(childSpy).toHaveBeenCalledWith(false);
        });

        it("hides the menu when the popper has genuinely escaped", () => {
            // Arrange
            const childSpy = jest.fn(() => (
                <div data-testid="dropdown-container">c</div>
            ));
            mockPopperRenderProps({
                isReferenceHidden: false,
                hasPopperEscaped: true,
            });

            // Act
            render(
                <DropdownPopper
                    referenceElement={document.createElement("button")}
                >
                    {childSpy}
                </DropdownPopper>,
            );

            // Assert: children invoked with shouldHidePopper === true
            expect(childSpy).toHaveBeenCalledWith(true);
        });
    });
});
