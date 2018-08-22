// @flow
import React from "react";
import {shallow} from "enzyme";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import ClickableBehavior from "./clickable-behavior.js";

const keyCodes = {
    tab: 9,
    enter: 13,
    space: 32,
};

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
        button.simulate("click");
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
        button.simulate("mouseenter");
        expect(button.state("hovered")).toEqual(true);
        button.simulate("mouseleave");
        expect(button.state("hovered")).toEqual(false);
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
        button.simulate("click");
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
        button.simulate("click");
        expect(button.state("focused")).toEqual(true);
        button.simulate("mousedown");
        button.simulate("mouseup");
        button.simulate("click");
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
        button.simulate("keyup", {keyCode: keyCodes.enter});
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
        link.simulate("keyup", {keyCode: keyCodes.enter});
        expect(link.state("pressed")).toEqual(false);

        link.simulate("keydown", {keyCode: keyCodes.space});
        expect(link.state("pressed")).toEqual(false);
        link.simulate("keyup", {keyCode: keyCodes.space});
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
        button.simulate("mouseenter");
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
        button.simulate("keyup", {keyCode: keyCodes.tab});
        expect(button.state("focused")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.tab});
        expect(button.state("focused")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(button.state("pressed")).toEqual(false);
        button.simulate("keyup", {keyCode: keyCodes.space});
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
        anchor.simulate("keyup", {keyCode: keyCodes.enter});
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
        button.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(3);

        button.simulate("touchstart", {keyCode: keyCodes.space});
        button.simulate("touchend", {keyCode: keyCodes.space});
        button.simulate("click");
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

    it("both navigates and calls onClick for an anchor link", () => {
        const onClick = jest.fn();
        // Use mount instead of a shallow render to trigger event defaults
        const link = mount(
            // triggerOnSpace is false because links should not navigate or
            // be activated on a space press
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
        link.simulate("keyup", {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(0);

        // Navigation didn't happen with space
        expect(window.location.assign).toHaveBeenCalledTimes(0);

        // Enter press should trigger the onClick after keyup
        link.simulate("keydown", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);

        // Navigation doesn't happen until after enter is released
        expect(window.location.assign).toHaveBeenCalledTimes(0);

        link.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(1);

        // Navigation happened after enter click
        expect(window.location.assign).toHaveBeenCalledTimes(1);
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
        checkbox.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);

        // Space press should trigger the onClick
        checkbox.simulate("keydown", {keyCode: keyCodes.space});
        checkbox.simulate("keyup", {keyCode: keyCodes.space});
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
        button.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(1);

        // Space press
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(1);
        button.simulate("keyup", {keyCode: keyCodes.space});
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
        clickableDiv.simulate("keyup", {keyCode: keyCodes.enter});
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate a mouse click.
        clickableDiv.simulate("mousedown");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("mouseup");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("click");
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Space press on a div
        clickableDiv.simulate("keydown", {keyCode: keyCodes.space});
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("keyup", {keyCode: keyCodes.space});
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);

        // Simulate another mouse click.
        clickableDiv.simulate("mousedown");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("mouseup");
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
        clickableDiv.simulate("click");
        expectedNumberTimesCalled += 1;
        expect(onClick).toHaveBeenCalledTimes(expectedNumberTimesCalled);
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
        checkbox.simulate("click");
        checkbox.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(0);
    });
});
