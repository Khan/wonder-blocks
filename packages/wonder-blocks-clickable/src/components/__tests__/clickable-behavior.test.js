/* eslint-disable testing-library/prefer-user-event */
/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter, Switch, Route} from "react-router-dom";
import userEvent from "@testing-library/user-event";

import getClickableBehavior from "../../util/get-clickable-behavior";
import ClickableBehavior from "../clickable-behavior";
import type {ClickableState} from "../clickable-behavior";

const keyCodes = {
    tab: 9,
    enter: 13,
    space: 32,
};

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

const labelForState = (state: ClickableState): string => {
    const labels = [];
    if (state.hovered) {
        labels.push("hovered");
    }
    if (state.focused) {
        labels.push("focused");
    }
    if (state.pressed) {
        labels.push("pressed");
    }
    return labels.join(" ");
};

describe("ClickableBehavior", () => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment
        delete window.location;
        window.location = {assign: jest.fn()};
        window.open = jest.fn();
    });

    afterEach(() => {
        window.location.assign.mockClear();
        window.open.mockClear();
    });

    it("renders a label", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    return <button {...childrenProps}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(onClick).not.toHaveBeenCalled();
        userEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalled();
    });

    it("changes hovered state on mouse enter/leave", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("hovered");
        userEvent.hover(button);
        expect(button).toHaveTextContent("hovered");
        userEvent.unhover(button);
        expect(button).not.toHaveTextContent("hovered");
    });

    it("changes hovered state on mouse enter while dragging", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("hovered");
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.mouseEnter(button, {buttons: 1});
        expect(button).not.toHaveTextContent("pressed");
        expect(button).toHaveTextContent("hovered");
    });

    it("changes pressed and hover states on mouse leave while dragging", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("hovered");
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.mouseDown(button);
        expect(button).toHaveTextContent("pressed");

        fireEvent.mouseLeave(button);
        expect(button).not.toHaveTextContent("hovered");
        expect(button).not.toHaveTextContent("pressed");
    });

    it("changes pressed state on mouse down/up", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.mouseDown(button);
        expect(button).toHaveTextContent("pressed");
        fireEvent.mouseUp(button);
        expect(button).not.toHaveTextContent("pressed");
    });

    it("changes pressed state on touch start/end/cancel", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.touchStart(button);
        expect(button).toHaveTextContent("pressed");
        fireEvent.touchEnd(button);
        expect(button).not.toHaveTextContent("pressed");

        expect(button).not.toHaveTextContent("pressed");
        fireEvent.touchStart(button);
        expect(button).toHaveTextContent("pressed");
        fireEvent.touchCancel(button);
        expect(button).not.toHaveTextContent("pressed");
    });

    it("enters focused state on key press after click", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("focused");
        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        // NOTE(kevinb): userEvent.click() fires other events that we don't want
        // affecting this test case.
        fireEvent.click(button);
        expect(button).toHaveTextContent("focused");
    });

    it("exits focused state on click after key press", () => {
        const onClick = jest.fn();

        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("focused");
        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        // NOTE(kevinb): userEvent.click() fires other events that we don't want
        // affecting this test case.
        fireEvent.click(button);
        expect(button).toHaveTextContent("focused");
        userEvent.click(button);
        expect(button).not.toHaveTextContent("focused");
    });

    it("changes pressed state on space/enter key down/up if <button>", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        expect(button).toHaveTextContent("pressed");
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.keyDown(button, {keyCode: keyCodes.enter});
        expect(button).toHaveTextContent("pressed");
        fireEvent.keyUp(button, {keyCode: keyCodes.enter});
        expect(button).not.toHaveTextContent("pressed");
    });

    it("changes pressed state on only enter key down/up for a link", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        render(
            <ClickableBehavior
                disabled={false}
                onClick={(e) => onClick(e)}
                href="https://www.khanacademy.org"
                role="link"
            >
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return (
                        <a
                            href="https://www.khanacademy.org"
                            {...childrenProps}
                        >
                            {label}
                        </a>
                    );
                }}
            </ClickableBehavior>,
        );
        const link = screen.getByRole("link");
        expect(link).not.toHaveTextContent("pressed");
        fireEvent.keyDown(link, {keyCode: keyCodes.enter});
        expect(link).toHaveTextContent("pressed");
        fireEvent.keyUp(link, {keyCode: keyCodes.enter});
        expect(link).not.toHaveTextContent("pressed");

        fireEvent.keyDown(link, {keyCode: keyCodes.space});
        expect(link).not.toHaveTextContent("pressed");
        fireEvent.keyUp(link, {keyCode: keyCodes.space});
        expect(link).not.toHaveTextContent("pressed");
    });

    it("gains focused state on focus event", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        fireEvent.focus(button);
        expect(button).toHaveTextContent("focused");
    });

    it("changes focused state on blur", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        fireEvent.focus(button);
        fireEvent.blur(button);
        expect(button).not.toHaveTextContent("focused");
    });

    test("should not have a tabIndex if one is not passed in", () => {
        // Arrange
        // Act
        render(
            <ClickableBehavior disabled={false} onClick={(e) => {}}>
                {(state, childrenProps) => {
                    return (
                        <button data-test-id="test-button-1" {...childrenProps}>
                            Label
                        </button>
                    );
                }}
            </ClickableBehavior>,
        );

        // Assert
        const button = screen.getByTestId("test-button-1");
        expect(button).not.toHaveAttribute("tabIndex");
    });

    test("should have the tabIndex that is passed in", () => {
        // Arrange
        // Act
        render(
            <ClickableBehavior
                disabled={false}
                onClick={(e) => {}}
                tabIndex={1}
            >
                {(state, childrenProps) => {
                    return (
                        <button data-test-id="test-button-2" {...childrenProps}>
                            Label
                        </button>
                    );
                }}
            </ClickableBehavior>,
        );

        // Assert
        const button = screen.getByTestId("test-button-2");
        expect(button).toHaveAttribute("tabIndex", "1");
    });

    test("should have the tabIndex that is passed in even if disabled", () => {
        // Arrange
        // Act
        render(
            <ClickableBehavior disabled={true} onClick={(e) => {}} tabIndex={1}>
                {(state, childrenProps) => {
                    return (
                        <button data-test-id="test-button-3" {...childrenProps}>
                            Label
                        </button>
                    );
                }}
            </ClickableBehavior>,
        );

        // Assert
        const button = screen.getByTestId("test-button-3");
        expect(button).toHaveAttribute("tabIndex", "1");
    });

    test("should make non-interactive children keyboard focusable if tabIndex 0 is passed", () => {
        // Arrange
        render(
            <ClickableBehavior
                disabled={false}
                onClick={(e) => {}}
                tabIndex={1}
            >
                {(state, childrenProps) => {
                    return (
                        <div data-test-id="test-div-1" {...childrenProps}>
                            Label
                        </div>
                    );
                }}
            </ClickableBehavior>,
        );

        // Act
        const button = screen.getByTestId("test-div-1");
        userEvent.tab();

        // Assert
        expect(button).toHaveFocus();
    });

    it("does not change state if disabled", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={true} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );

        const button = screen.getByRole("button");
        expect(onClick).not.toHaveBeenCalled();
        fireEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();

        expect(button).not.toHaveTextContent("hovered");
        fireEvent.mouseEnter(button);
        expect(button).not.toHaveTextContent("hovered");
        fireEvent.mouseLeave(button);
        expect(button).not.toHaveTextContent("hovered");

        expect(button).not.toHaveTextContent("pressed");
        fireEvent.mouseDown(button);
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.mouseUp(button);
        expect(button).not.toHaveTextContent("pressed");

        expect(button).not.toHaveTextContent("pressed");
        fireEvent.touchStart(button);
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.touchEnd(button);
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.touchStart(button);
        fireEvent.touchCancel(button);
        expect(button).not.toHaveTextContent("pressed");

        expect(button).not.toHaveTextContent("focused");
        fireEvent.keyUp(button, {
            keyCode: keyCodes.tab,
        });
        expect(button).not.toHaveTextContent("focused");
        fireEvent.keyDown(button, {keyCode: keyCodes.tab});
        expect(button).not.toHaveTextContent("focused");

        expect(button).not.toHaveTextContent("pressed");
        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        expect(button).not.toHaveTextContent("pressed");
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        fireEvent.blur(button);
        expect(button).not.toHaveTextContent("pressed");

        fireEvent.focus(button);
        expect(button).toHaveTextContent("focused");

        render(
            <ClickableBehavior
                disabled={true}
                href="https://www.khanacademy.org"
            >
                {(state, childrenProps) => {
                    return (
                        <a
                            href="https://www.khanacademy.org"
                            {...childrenProps}
                        >
                            Label
                        </a>
                    );
                }}
            </ClickableBehavior>,
        );

        const anchor = screen.getByRole("link");
        expect(anchor).not.toHaveTextContent("pressed");
        fireEvent.keyDown(anchor, {keyCode: keyCodes.enter});
        expect(anchor).not.toHaveTextContent("pressed");
        fireEvent.keyUp(anchor, {keyCode: keyCodes.enter});
        expect(anchor).not.toHaveTextContent("pressed");
    });

    it("has onClick triggered just once per click by various means", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    return <button {...childrenProps}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        expect(onClick).not.toHaveBeenCalled();

        userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);

        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(2);

        fireEvent.keyDown(button, {keyCode: keyCodes.enter});
        fireEvent.keyUp(button, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(3);

        fireEvent.touchStart(button, {keyCode: keyCodes.space});
        fireEvent.touchEnd(button, {keyCode: keyCodes.space});
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(4);
    });

    it("resets state when set to disabled", () => {
        const onClick = jest.fn();
        const {rerender} = render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );
        const button = screen.getByRole("button");
        userEvent.tab(); // focus
        userEvent.hover(button);

        rerender(
            <ClickableBehavior disabled={true} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    const label = labelForState(state);
                    return <button {...childrenProps}>{label}</button>;
                }}
            </ClickableBehavior>,
        );

        expect(button).not.toHaveTextContent("pressed");
        expect(button).not.toHaveTextContent("hovered");

        // The button remains focused even after it's been disabled
        expect(button).toHaveTextContent("focused");
    });

    describe("full page load navigation", () => {
        it("both navigates and calls onClick for an anchor link", () => {
            const onClick = jest.fn();
            // Use mount instead of a shallow render to trigger event defaults
            render(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    onClick={(e) => onClick(e)}
                    role="link"
                >
                    {(state, childrenProps) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a
                                href="https://khanacademy.org/"
                                {...childrenProps}
                            >
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );
            const link = screen.getByRole("link");

            // Space press should not trigger the onClick
            fireEvent.keyDown(link, {keyCode: keyCodes.space});
            fireEvent.keyUp(link, {keyCode: keyCodes.space});
            expect(onClick).toHaveBeenCalledTimes(0);

            // Navigation didn't happen with space
            expect(window.location.assign).toHaveBeenCalledTimes(0);

            // Enter press should trigger the onClick after keyup
            fireEvent.keyDown(link, {keyCode: keyCodes.enter});
            expect(onClick).toHaveBeenCalledTimes(0);

            // Navigation doesn't happen until after enter is released
            expect(window.location.assign).toHaveBeenCalledTimes(0);

            fireEvent.keyUp(link, {keyCode: keyCodes.enter});
            expect(onClick).toHaveBeenCalledTimes(1);

            // Navigation happened after enter click
            expect(window.location.assign).toHaveBeenCalledTimes(1);
        });

        it("waits for safeWithNav to resolve before navigation", async () => {
            // Arrange
            render(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    safeWithNav={() => Promise.resolve()}
                    role="link"
                >
                    {(state, childrenProps) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a
                                href="https://khanacademy.org/"
                                {...childrenProps}
                            >
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            const link = screen.getByRole("link");
            userEvent.click(link);
            await wait(0);

            // Assert
            expect(window.location.assign).toHaveBeenCalledTimes(1);
        });

        it("should show waiting UI before safeWithNav resolves", async () => {
            // Arrange
            render(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    safeWithNav={() => Promise.resolve()}
                    role="link"
                >
                    {(state, childrenProps) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a
                                href="https://khanacademy.org/"
                                {...childrenProps}
                            >
                                {state.waiting ? "waiting" : "Label"}
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            const link = screen.getByRole("link");
            userEvent.click(link);

            // Assert
            expect(link).toHaveTextContent("waiting");
        });

        it("If onClick calls e.preventDefault() then we won't navigate", () => {
            // Arrange
            render(
                <ClickableBehavior
                    href="/foo"
                    onClick={(e) => e.preventDefault()}
                    role="checkbox"
                >
                    {(state, childrenProps) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return <button {...childrenProps}>label</button>;
                    }}
                </ClickableBehavior>,
            );

            // Act
            const button = screen.getByRole("button");
            userEvent.click(button);

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });

    it("calls onClick correctly for a component that doesn't respond to enter", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        render(
            // triggerOnEnter may be false for some elements e.g. checkboxes
            <ClickableBehavior onClick={(e) => onClick(e)} role="checkbox">
                {(state, childrenProps) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <input type="checkbox" {...childrenProps} />;
                }}
            </ClickableBehavior>,
        );

        // Enter press should not do anything
        const checkbox = screen.getByRole("checkbox");
        fireEvent.keyDown(checkbox, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
        fireEvent.keyUp(checkbox, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);

        // Space press should trigger the onClick
        fireEvent.keyDown(checkbox, {keyCode: keyCodes.space});
        fireEvent.keyUp(checkbox, {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick for a button component on both enter/space", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        render(
            <ClickableBehavior onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <button {...childrenProps}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        // Enter press
        const button = screen.getByRole("button");
        fireEvent.keyDown(button, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
        fireEvent.keyUp(button, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(1);

        // Space press
        fireEvent.keyDown(button, {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(1);
        fireEvent.keyUp(button, {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    // This tests the case where we attach the childrenProps to an element that is
    // not canonically clickable (like a div). The browser doesn't naturally
    // trigger keyboard click events for such an element.
    it("calls onClick listener on space/enter with a non-usually clickable element", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const {container} = render(
            <ClickableBehavior onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <div {...childrenProps}>Label</div>;
                }}
            </ClickableBehavior>,
        );

        let expectedNumberTimesCalled = 0;
        // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
        const clickableDiv = container.querySelector("div");
        if (!clickableDiv) {
            throw new Error("couldn't find clickable div");
        }

        // Enter press on a div
        fireEvent.keyDown(clickableDiv, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        fireEvent.keyUp(clickableDiv, {
            keyCode: keyCodes.enter,
        });
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate a mouse click.
        userEvent.click(clickableDiv);
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Space press on a div
        fireEvent.keyDown(clickableDiv, {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        fireEvent.keyUp(clickableDiv, {keyCode: keyCodes.space});
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate another mouse click.
        userEvent.click(clickableDiv);
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
    });

    // The following two tests involve click behavior when dragging.
    // Here are some notable related actions that cannot be tested using
    // existing jest/RTL events since these click types are handled
    // by browsers but aren't registered as clicks by RTL/jest:
    // 1. Mousedown in the button, drag within the button, and mouseup
    //    in the button (mouse doesn't leave the button at any point).
    //    This should result in a successful click.
    // 2. Mouse down in the button, drag out of the button (don't let go),
    //    drag back into the button, and mouseup inside the button.
    //    This should result in a successful click.
    it("does not call onClick on mouseup when the mouse presses inside and drags away", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    return <button {...childrenProps}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        const button = screen.getByRole("button");
        fireEvent.mouseDown(button);
        fireEvent.mouseLeave(button);
        fireEvent.mouseUp(button);
        expect(onClick).toHaveBeenCalledTimes(0);
    });

    it("does not call onClick on mouseup when the mouse presses outside and drags in", () => {
        const onClick = jest.fn();
        render(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, childrenProps) => {
                    return <button {...childrenProps}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        const button = screen.getByRole("button");
        fireEvent.mouseEnter(button, {buttons: 1});
        fireEvent.mouseUp(button);
        expect(onClick).toHaveBeenCalledTimes(0);
    });

    it("doesn't trigger enter key when browser doesn't stop the click", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        render(
            <ClickableBehavior onClick={(e) => onClick(e)} role="checkbox">
                {(state, childrenProps) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <input type="checkbox" {...childrenProps} />;
                }}
            </ClickableBehavior>,
        );

        const checkbox = screen.getByRole("checkbox");
        // Enter press should not do anything
        fireEvent.keyDown(checkbox, {keyCode: keyCodes.enter});
        // This element still wants to have a click on enter press
        fireEvent.click(checkbox);
        fireEvent.keyUp(checkbox, {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
    });

    describe("client-side navgiation", () => {
        const ClickableBehaviorWithRouter = getClickableBehavior(
            "/foo",
            false,
            true, // router
        );

        it("handles client-side navigation when there's a router context", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => {}}
                            role="checkbox"
                        >
                            {(state, childrenProps) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button {...childrenProps}>label</button>
                                );
                            }}
                        </ClickableBehaviorWithRouter>
                        <Switch>
                            <Route path="/foo">
                                <div>Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("button"));

            // Assert
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });

        describe("beforeNav", () => {
            it("waits for beforeNav to resolve before client-side navigating", async () => {
                // Arrange
                render(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                            >
                                {(state, childrenProps) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button {...childrenProps}>
                                            {state.waiting
                                                ? "waiting"
                                                : "label"}
                                        </button>
                                    );
                                }}
                            </ClickableBehaviorWithRouter>
                            <Switch>
                                <Route path="/foo">
                                    <div>Hello, world!</div>
                                </Route>
                            </Switch>
                        </div>
                    </MemoryRouter>,
                );

                // Act
                userEvent.click(screen.getByRole("button"));
                await wait(0);

                // Assert
                expect(screen.getByText("Hello, world!")).toBeInTheDocument();
            });

            it("shows waiting state before navigating", async () => {
                // Arrange
                render(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                            >
                                {(state, childrenProps) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button {...childrenProps}>
                                            {state.waiting
                                                ? "waiting"
                                                : "label"}
                                        </button>
                                    );
                                }}
                            </ClickableBehaviorWithRouter>
                            <Switch>
                                <Route path="/foo">
                                    <div>Hello, world!</div>
                                </Route>
                            </Switch>
                        </div>
                    </MemoryRouter>,
                );

                // Act
                userEvent.click(screen.getByRole("button"));

                // Assert
                expect(screen.getByText("waiting")).toBeInTheDocument();
            });

            it("does not navigate if beforeNav rejects", async () => {
                // Arrange
                render(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.reject()}
                            >
                                {(state, childrenProps) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button {...childrenProps}>
                                            label
                                        </button>
                                    );
                                }}
                            </ClickableBehaviorWithRouter>
                            <Switch>
                                <Route path="/foo">
                                    <div>Hello, world!</div>
                                </Route>
                            </Switch>
                        </div>
                    </MemoryRouter>,
                );

                // Act
                userEvent.click(screen.getByRole("button"));
                await wait(0);

                // Assert
                expect(
                    screen.queryByText("Hello, world!"),
                ).not.toBeInTheDocument();
            });

            it("calls safeWithNav if provided if beforeNav resolves", async () => {
                // Arrange
                const safeWithNavMock = jest.fn();
                render(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                                safeWithNav={safeWithNavMock}
                            >
                                {(state, childrenProps) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button {...childrenProps}>
                                            {state.waiting
                                                ? "waiting"
                                                : "label"}
                                        </button>
                                    );
                                }}
                            </ClickableBehaviorWithRouter>
                            <Switch>
                                <Route path="/foo">
                                    <div>Hello, world!</div>
                                </Route>
                            </Switch>
                        </div>
                    </MemoryRouter>,
                );

                // Act
                userEvent.click(screen.getByRole("button"));
                await wait(0);

                // Assert
                expect(safeWithNavMock).toHaveBeenCalled();
            });
        });

        it("doesn't wait for safeWithNav to resolve before client-side navigating", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => {}}
                            role="checkbox"
                            safeWithNav={() => Promise.resolve()}
                        >
                            {(state, childrenProps) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button {...childrenProps}>label</button>
                                );
                            }}
                        </ClickableBehaviorWithRouter>
                        <Switch>
                            <Route path="/foo">
                                <div>Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("button"));

            // Assert
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });

        it("If onClick calls e.preventDefault() then we won't navigate", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => e.preventDefault()}
                            role="checkbox"
                        >
                            {(state, childrenProps) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button {...childrenProps}>label</button>
                                );
                            }}
                        </ClickableBehaviorWithRouter>
                        <Switch>
                            <Route path="/foo">
                                <div>Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("button"));

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });
    });

    describe("target='_blank'", () => {
        it("opens a new tab", () => {
            // Arrange
            render(
                <ClickableBehavior
                    disabled={false}
                    href="https://www.khanacademy.org"
                    role="link"
                    target="_blank"
                >
                    {(state, childrenProps) => {
                        return (
                            <a
                                href="https://www.khanacademy.org"
                                {...childrenProps}
                            >
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(window.open).toHaveBeenCalledWith(
                "https://www.khanacademy.org",
                "_blank",
            );
        });

        it("opens a new tab when using 'safeWithNav'", () => {
            // Arrange
            const safeWithNavMock = jest.fn().mockResolvedValue();
            render(
                <ClickableBehavior
                    disabled={false}
                    href="https://www.khanacademy.org"
                    role="link"
                    target="_blank"
                    safeWithNav={safeWithNavMock}
                >
                    {(state, childrenProps) => {
                        return (
                            <a
                                href="https://www.khanacademy.org"
                                {...childrenProps}
                            >
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(window.open).toHaveBeenCalledWith(
                "https://www.khanacademy.org",
                "_blank",
            );
        });

        it("calls 'safeWithNav'", () => {
            // Arrange
            const safeWithNavMock = jest.fn().mockResolvedValue();
            render(
                <ClickableBehavior
                    disabled={false}
                    href="https://www.khanacademy.org"
                    role="link"
                    target="_blank"
                    safeWithNav={safeWithNavMock}
                >
                    {(state, childrenProps) => {
                        return (
                            <a
                                href="https://www.khanacademy.org"
                                {...childrenProps}
                            >
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(safeWithNavMock).toHaveBeenCalled();
        });

        it("opens a new tab when inside a router", () => {
            // Arrange
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <ClickableBehavior
                        disabled={false}
                        href="https://www.khanacademy.org"
                        role="link"
                        target="_blank"
                    >
                        {(state, childrenProps) => {
                            return (
                                <a
                                    href="https://www.khanacademy.org"
                                    {...childrenProps}
                                >
                                    Label
                                </a>
                            );
                        }}
                    </ClickableBehavior>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(window.open).toHaveBeenCalledWith(
                "https://www.khanacademy.org",
                "_blank",
            );
        });

        it("opens a new tab when using 'safeWithNav' inside a router", () => {
            // Arrange
            const safeWithNavMock = jest.fn().mockResolvedValue();
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <ClickableBehavior
                        disabled={false}
                        href="https://www.khanacademy.org"
                        role="link"
                        target="_blank"
                        safeWithNav={safeWithNavMock}
                    >
                        {(state, childrenProps) => {
                            return (
                                <a
                                    href="https://www.khanacademy.org"
                                    {...childrenProps}
                                >
                                    Label
                                </a>
                            );
                        }}
                    </ClickableBehavior>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(window.open).toHaveBeenCalledWith(
                "https://www.khanacademy.org",
                "_blank",
            );
        });

        it("calls 'safeWithNav' inside a router", () => {
            // Arrange
            const safeWithNavMock = jest.fn().mockResolvedValue();
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <ClickableBehavior
                        disabled={false}
                        href="https://www.khanacademy.org"
                        role="link"
                        target="_blank"
                        safeWithNav={safeWithNavMock}
                    >
                        {(state, childrenProps) => {
                            return (
                                <a
                                    href="https://www.khanacademy.org"
                                    {...childrenProps}
                                >
                                    Label
                                </a>
                            );
                        }}
                    </ClickableBehavior>
                </MemoryRouter>,
            );

            // Act
            userEvent.click(screen.getByRole("link"));

            // Assert
            expect(safeWithNavMock).toHaveBeenCalled();
        });
    });

    describe("rel", () => {
        it("should use the 'rel' that was passed in", () => {
            // Arrange
            const childrenMock = jest.fn().mockImplementation(() => null);
            render(
                <ClickableBehavior
                    href="https://www.khanacademy.org"
                    rel="something_else"
                    target="_blank"
                >
                    {childrenMock}
                </ClickableBehavior>,
            );

            const childrenProps = childrenMock.mock.calls[0][1];
            expect(childrenProps.rel).toEqual("something_else");
        });

        it("should use 'noopener noreferrer' as a default when target='_blank'", () => {
            // Arrange
            const childrenMock = jest.fn().mockImplementation(() => null);
            render(
                <ClickableBehavior
                    href="https://www.khanacademy.org"
                    target="_blank"
                >
                    {childrenMock}
                </ClickableBehavior>,
            );

            const childrenProps = childrenMock.mock.calls[0][1];
            expect(childrenProps.rel).toEqual("noopener noreferrer");
        });

        it("should not use the default if target != '_blank'", () => {
            // Arrange
            const childrenMock = jest.fn().mockImplementation(() => null);
            render(
                <ClickableBehavior href="https://www.khanacademy.org">
                    {childrenMock}
                </ClickableBehavior>,
            );

            const childrenProps = childrenMock.mock.calls[0][1];
            expect(childrenProps.rel).toBeUndefined();
        });
    });
});
