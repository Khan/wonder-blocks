/* eslint-disable max-lines */
// @flow
import React from "react";
import {MemoryRouter, Switch, Route} from "react-router-dom";
import {shallow} from "enzyme";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import getClickableBehavior from "../../util/get-clickable-behavior.js";
import ClickableBehavior from "../clickable-behavior.js";

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

describe("ClickableBehavior", () => {
    beforeEach(() => {
        // Note: window.location.assign needs a mock function in the testing
        // environment.
        window.location.assign = jest.fn();
        unmountAll();
    });

    afterEach(() => {
        window.location.assign.mockClear();
    });

    it("renders a label", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(onClick).not.toHaveBeenCalled();
        button.simulate("click", {preventDefault: jest.fn()});
        expect(onClick).toHaveBeenCalled();
    });

    it("changes only hovered state on mouse enter/leave", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("hovered")).toEqual(false);
        button.simulate("mouseenter", {
            buttons: 0,
        });
        expect(button.state("hovered")).toEqual(true);
        button.simulate("mouseleave");
        expect(button.state("hovered")).toEqual(false);
    });

    it("changes only pressed state on mouse enter/leave while dragging", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("pressed")).toEqual(false);

        button.simulate("mousedown");
        button.simulate("dragstart", {preventDefault: jest.fn()});
        expect(button.state("pressed")).toEqual(true);

        button.simulate("mouseleave");
        expect(button.state("pressed")).toEqual(false);

        button.simulate("mouseenter", {
            buttons: 1,
        });
        expect(button.state("pressed")).toEqual(true);
    });

    it("changes pressed state on mouse down/up", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("pressed")).toEqual(false);
        button.simulate("mousedown");
        expect(button.state("pressed")).toEqual(true);
        button.simulate("mouseup");
        expect(button.state("pressed")).toEqual(false);
    });

    it("changes pressed state on touch start/end/cancel", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("pressed")).toEqual(false);
        button.simulate("touchstart");
        expect(button.state("pressed")).toEqual(true);
        button.simulate("touchend");
        expect(button.state("pressed")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("touchstart");
        expect(button.state("pressed")).toEqual(true);
        button.simulate("touchcancel");
        expect(button.state("pressed")).toEqual(false);
    });

    it("enters focused state on key press after click", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("focused")).toEqual(false);
        button.simulate("keydown", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        button.simulate("keyup", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        button.simulate("click", {preventDefault: jest.fn()});
        expect(button.state("focused")).toEqual(true);
    });

    it("exits focused state on click after key press", () => {
        const onClick = jest.fn();

        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("focused")).toEqual(false);
        button.simulate("keydown", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        button.simulate("keyup", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        button.simulate("click", {preventDefault: jest.fn()});
        expect(button.state("focused")).toEqual(true);
        button.simulate("mousedown");
        button.simulate("mouseup");
        button.simulate("click", {preventDefault: jest.fn()});
        expect(button.state("focused")).toEqual(false);
    });

    it("changes pressed state on space/enter key down/up if <button>", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        expect(button.state("pressed")).toEqual(true);
        button.simulate("keyup", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        expect(button.state("pressed")).toEqual(false);

        button.simulate("keydown", {
            keyCode: keyCodes.enter,
            preventDefault: jest.fn(),
        });
        expect(button.state("pressed")).toEqual(true);
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(button.state("pressed")).toEqual(false);
    });

    it("changes pressed state on only enter key down/up for a link", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const link = mount(
            <ClickableBehavior
                disabled={false}
                onClick={(e) => onClick(e)}
                href="https://www.khanacademy.org"
                role="link"
            >
                {(state, handlers) => {
                    return (
                        <a href="https://www.khanacademy.org" {...handlers}>
                            Label
                        </a>
                    );
                }}
            </ClickableBehavior>,
        );
        expect(link.state("pressed")).toEqual(false);
        link.simulate("keydown", {keyCode: keyCodes.enter});
        expect(link.state("pressed")).toEqual(true);
        link.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(link.state("pressed")).toEqual(false);

        link.simulate("keydown", {keyCode: keyCodes.space});
        expect(link.state("pressed")).toEqual(false);
        link.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.space,
        });
        expect(link.state("pressed")).toEqual(false);
    });

    it("gains focused state on focus event", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        button.simulate("focus");
        expect(button.state("focused")).toEqual(true);
    });

    it("changes focused state on blur", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        button.simulate("blur");
        expect(button.state("focused")).toEqual(false);
    });

    it("does not change state if disabled", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={true} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        expect(onClick).not.toHaveBeenCalled();
        button.simulate("click", {preventDefault: jest.fn()});
        expect(onClick).not.toHaveBeenCalled();

        expect(button.state("hovered")).toEqual(false);
        button.simulate("mouseenter", {
            buttons: 0,
        });
        expect(button.state("hovered")).toEqual(false);
        button.simulate("mouseleave");
        expect(button.state("hovered")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("mousedown");
        expect(button.state("pressed")).toEqual(false);
        button.simulate("mouseup");
        expect(button.state("pressed")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("touchstart");
        expect(button.state("pressed")).toEqual(false);
        button.simulate("touchend");
        expect(button.state("pressed")).toEqual(false);

        button.simulate("touchstart");
        button.simulate("touchcancel");
        expect(button.state("pressed")).toEqual(false);

        expect(button.state("focused")).toEqual(false);
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.tab,
        });
        expect(button.state("focused")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.tab});
        expect(button.state("focused")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(button.state("pressed")).toEqual(false);
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.space,
        });
        expect(button.state("pressed")).toEqual(false);

        button.simulate("keydown", {keyCode: keyCodes.space});
        button.simulate("blur");
        expect(button.state("pressed")).toEqual(false);

        button.simulate("focus");
        expect(button.state("focused")).toEqual(false);

        const anchor = shallow(
            <ClickableBehavior
                disabled={true}
                href="https://www.khanacademy.org"
            >
                {(state, handlers) => {
                    return (
                        <a href="https://www.khanacademy.org" {...handlers}>
                            Label
                        </a>
                    );
                }}
            </ClickableBehavior>,
        );

        expect(anchor.state("pressed")).toEqual(false);
        anchor.simulate("keydown", {keyCode: keyCodes.enter});
        expect(anchor.state("pressed")).toEqual(false);
        anchor.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(anchor.state("pressed")).toEqual(false);
    });

    it("has onClick triggered just once per click by various means", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(onClick).not.toHaveBeenCalled();

        button.simulate("mousedown");
        button.simulate("mouseup");
        button.simulate("click", {preventDefault: jest.fn()});
        expect(onClick).toHaveBeenCalledTimes(1);

        button.simulate("keydown", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        button.simulate("keyup", {
            keyCode: keyCodes.space,
            preventDefault: jest.fn(),
        });
        expect(onClick).toHaveBeenCalledTimes(2);

        button.simulate("keydown", {
            keyCode: keyCodes.enter,
            preventDefault: jest.fn(),
        });
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(onClick).toHaveBeenCalledTimes(3);

        button.simulate("touchstart", {keyCode: keyCodes.space});
        button.simulate("touchend", {keyCode: keyCodes.space});
        button.simulate("click", {preventDefault: jest.fn()});
        expect(onClick).toHaveBeenCalledTimes(4);
    });

    it("resets state when set to disabled", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        button.setState({hovered: true, pressed: true, focused: true});
        button.setProps({disabled: true});

        expect(button.state("hovered")).toEqual(false);
        expect(button.state("pressed")).toEqual(false);
        expect(button.state("focused")).toEqual(false);
    });

    describe("server-side navigation", () => {
        it("both navigates and calls onClick for an anchor link", () => {
            const onClick = jest.fn();
            // Use mount instead of a shallow render to trigger event defaults
            const link = mount(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    onClick={(e) => onClick(e)}
                    role="link"
                >
                    {(state, handlers) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a href="https://khanacademy.org/" {...handlers}>
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Space press should not trigger the onClick
            link.simulate("keydown", {keyCode: keyCodes.space});
            link.simulate("keyup", {
                preventDefault: jest.fn(),
                keyCode: keyCodes.space,
            });
            expect(onClick).toHaveBeenCalledTimes(0);

            // Navigation didn't happen with space
            expect(window.location.assign).toHaveBeenCalledTimes(0);

            // Enter press should trigger the onClick after keyup
            link.simulate("keydown", {keyCode: keyCodes.enter});
            expect(onClick).toHaveBeenCalledTimes(0);

            // Navigation doesn't happen until after enter is released
            expect(window.location.assign).toHaveBeenCalledTimes(0);

            link.simulate("keyup", {
                preventDefault: jest.fn(),
                keyCode: keyCodes.enter,
            });
            expect(onClick).toHaveBeenCalledTimes(1);

            // Navigation happened after enter click
            expect(window.location.assign).toHaveBeenCalledTimes(1);
        });

        it("waits for safeWithNav to resolve before navigation", async () => {
            // Arrange
            const link = mount(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    safeWithNav={() => Promise.resolve()}
                    role="link"
                >
                    {(state, handlers) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a href="https://khanacademy.org/" {...handlers}>
                                Label
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            link.simulate("click", {preventDefault: jest.fn()});
            await wait(0);

            // Assert
            expect(window.location.assign).toHaveBeenCalledTimes(1);
        });

        it("should show waiting UI before safeWithNav resolves", async () => {
            // Arrange
            const link = mount(
                <ClickableBehavior
                    href="https://khanacademy.org/"
                    safeWithNav={() => Promise.resolve()}
                    role="link"
                >
                    {(state, handlers) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <a href="https://khanacademy.org/" {...handlers}>
                                {state.waiting ? "waiting" : "Label"}
                            </a>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            link.simulate("click", {preventDefault: jest.fn()});

            // Assert
            expect(link).toIncludeText("waiting");
        });

        it("If onClick calls e.preventDefault() then we won't navigate", () => {
            // Arrange
            const wrapper = mount(
                <ClickableBehavior
                    href="/foo"
                    onClick={(e) => e.preventDefault()}
                    role="checkbox"
                >
                    {(state, handlers) => {
                        // The base element here doesn't matter in this testing
                        // environment, but the simulated events in the test are in
                        // line with what browsers do for this element.
                        return (
                            <button id="test-button" {...handlers}>
                                label
                            </button>
                        );
                    }}
                </ClickableBehavior>,
            );

            // Act
            const button = wrapper.find("#test-button").first();
            button.simulate("click", {
                preventDefault() {
                    this.defaultPrevented = true;
                },
            });

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });

    it("calls onClick correctly for a component that doesn't respond to enter", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const checkbox = mount(
            // triggerOnEnter may be false for some elements e.g. checkboxes
            <ClickableBehavior onClick={(e) => onClick(e)} role="checkbox">
                {(state, handlers) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <input type="checkbox" {...handlers} />;
                }}
            </ClickableBehavior>,
        );

        // Enter press should not do anything
        checkbox.simulate("keydown", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
        checkbox.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(onClick).toHaveBeenCalledTimes(0);

        // Space press should trigger the onClick
        checkbox.simulate("keydown", {keyCode: keyCodes.space});
        checkbox.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.space,
        });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick for a button component on both enter/space", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const button = mount(
            <ClickableBehavior onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        // Enter press
        button.simulate("keydown", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expect(onClick).toHaveBeenCalledTimes(1);

        // Space press
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(1);
        button.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.space,
        });
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    // This tests the case where we attach the handlers to an element that is
    // not canonically clickable (like a div). The browser doesn't naturally
    // trigger keyboard click events for such an element.
    it("calls onClick listener on space/enter with a non-usually clickable element", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const div = mount(
            <ClickableBehavior onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <div {...handlers}>Label</div>;
                }}
            </ClickableBehavior>,
        );

        let expectedNumberTimesCalled = 0;
        const clickableDiv = div.find("div");

        // Enter press on a div
        clickableDiv.simulate("keydown", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate a mouse click.
        clickableDiv.simulate("mousedown");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("mouseup");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("click", {preventDefault: jest.fn()});
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Space press on a div
        clickableDiv.simulate("keydown", {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.space,
        });
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate another mouse click.
        clickableDiv.simulate("mousedown");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("mouseup");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("click", {preventDefault: jest.fn()});
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
    });

    it("calls onClick on mouseup when the mouse was dragging", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );

        button.simulate("mousedown");
        button.simulate("dragstart", {preventDefault: jest.fn()});
        button.simulate("mouseleave");
        button.simulate("mouseup");
        expect(onClick).toHaveBeenCalledTimes(0);

        button.simulate("mousedown");
        button.simulate("dragstart", {preventDefault: jest.fn()});
        button.simulate("mouseup", {preventDefault: jest.fn()});
        expect(onClick).toHaveBeenCalledTimes(1);

        button.simulate("mouseenter", {
            buttons: 1,
        });
        button.simulate("mouseup", {preventDefault: jest.fn()});
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("doesn't trigger enter key when browser doesn't stop the click", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const checkbox = mount(
            <ClickableBehavior onClick={(e) => onClick(e)} role="checkbox">
                {(state, handlers) => {
                    // The base element here doesn't matter in this testing
                    // environment, but the simulated events in the test are in
                    // line with what browsers do for this element.
                    return <input type="checkbox" {...handlers} />;
                }}
            </ClickableBehavior>,
        );

        // Enter press should not do anything
        checkbox.simulate("keydown", {keyCode: keyCodes.enter});
        // This element still wants to have a click on enter press
        checkbox.simulate("click", {preventDefault: jest.fn()});
        checkbox.simulate("keyup", {
            preventDefault: jest.fn(),
            keyCode: keyCodes.enter,
        });
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
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => {}}
                            role="checkbox"
                        >
                            {(state, handlers) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button id="test-button" {...handlers}>
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
            const button = wrapper.find("#test-button").first();
            button.simulate("click", {preventDefault: jest.fn()});

            // Assert
            expect(wrapper).toIncludeText("Hello, world!");
        });

        describe("beforeNav", () => {
            it("waits for beforeNav to resolve before client-side navigating", async () => {
                // Arrange
                const wrapper = mount(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                            >
                                {(state, handlers) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button id="test-button" {...handlers}>
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
                const button = wrapper.find("#test-button").first();
                button.simulate("click", {preventDefault: jest.fn()});
                await wait(0);

                // Assert
                expect(wrapper).toIncludeText("Hello, world!");
            });

            it("shows waiting state before navigating", async () => {
                // Arrange
                const wrapper = mount(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                            >
                                {(state, handlers) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button id="test-button" {...handlers}>
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
                const button = wrapper.find("#test-button").first();
                button.simulate("click", {preventDefault: jest.fn()});

                // Assert
                expect(wrapper).toIncludeText("waiting");
            });

            it("does not navigate if beforeNav rejects", async () => {
                // Arrange
                const wrapper = mount(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.reject()}
                            >
                                {(state, handlers) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button id="test-button" {...handlers}>
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
                const button = wrapper.find("#test-button").first();
                button.simulate("click", {preventDefault: jest.fn()});
                await wait(0);

                // Assert
                expect(wrapper).not.toIncludeText("Hello, world!");
            });

            it("calls safeWithNav if provided if beforeNav resolves", async () => {
                // Arrange
                const safeWithNavMock = jest.fn();
                const wrapper = mount(
                    <MemoryRouter>
                        <div>
                            <ClickableBehaviorWithRouter
                                href="/foo"
                                onClick={(e) => {}}
                                role="checkbox"
                                beforeNav={() => Promise.resolve()}
                                safeWithNav={safeWithNavMock}
                            >
                                {(state, handlers) => {
                                    // The base element here doesn't matter in this testing
                                    // environment, but the simulated events in the test are in
                                    // line with what browsers do for this element.
                                    return (
                                        <button id="test-button" {...handlers}>
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
                const button = wrapper.find("#test-button").first();
                button.simulate("click", {preventDefault: jest.fn()});
                await wait(0);

                // Assert
                expect(safeWithNavMock).toHaveBeenCalled();
            });
        });

        it("doesn't wait for safeWithNav to resolve before client-side navigating", async () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => {}}
                            role="checkbox"
                            safeWithNav={() => Promise.resolve()}
                        >
                            {(state, handlers) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button id="test-button" {...handlers}>
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
            const button = wrapper.find("#test-button").first();
            button.simulate("click", {preventDefault: jest.fn()});

            // Assert
            expect(wrapper).toIncludeText("Hello, world!");
        });

        it("If onClick calls e.preventDefault() then we won't navigate", () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <ClickableBehaviorWithRouter
                            href="/foo"
                            onClick={(e) => e.preventDefault()}
                            role="checkbox"
                        >
                            {(state, handlers) => {
                                // The base element here doesn't matter in this testing
                                // environment, but the simulated events in the test are in
                                // line with what browsers do for this element.
                                return (
                                    <button id="test-button" {...handlers}>
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
            const button = wrapper.find("#test-button").first();
            button.simulate("click", {
                preventDefault() {
                    this.defaultPrevented = true;
                },
            });

            // Assert
            expect(wrapper).not.toIncludeText("Hello, world!");
        });
    });
});
