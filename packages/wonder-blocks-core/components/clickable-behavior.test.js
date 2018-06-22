// @flow
import React from "react";
import {mount, shallow} from "enzyme";

import ClickableBehavior from "./clickable-behavior.js";

const keyCodes = {
    tab: 9,
    enter: 13,
    space: 32,
};

describe("ClickableBehavior", () => {
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

    it("changes focused state on tab key down/up", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("focused")).toEqual(false);
        button.simulate("keyup", {keyCode: keyCodes.tab});
        expect(button.state("focused")).toEqual(true);
        button.simulate("keydown", {keyCode: keyCodes.tab});
        expect(button.state("focused")).toEqual(false);
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
        button.simulate("keydown", {keyCode: keyCodes.space});
        button.simulate("keyup", {keyCode: keyCodes.space});
        button.simulate("click", {preventDefault: jest.fn()});
        expect(button.state("focused")).toEqual(true);
    });

    it("exits focused state on click after key press", () => {
        const onClick = jest.fn();
        // Note: window.location.assign is not called, but jest logs an error
        // if it's not stubbed out.
        window.location.assign = jest.fn();

        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("focused")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.space});
        button.simulate("keyup", {keyCode: keyCodes.space});
        button.simulate("click", {preventDefault: jest.fn()});
        expect(button.state("focused")).toEqual(true);
        button.simulate("mousedown");
        button.simulate("click");
        button.simulate("mouseup");
        expect(button.state("focused")).toEqual(false);
    });

    it("changes pressed state on only space key down/up if <button>", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(button.state("pressed")).toEqual(true);
        button.simulate("keyup", {keyCode: keyCodes.space});
        expect(button.state("pressed")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.enter});
        expect(button.state("pressed")).toEqual(false);
    });

    it("changes pressed state on only enter key down/up if <a>", () => {
        const onClick = jest.fn();
        const button = shallow(
            <ClickableBehavior
                disabled={false}
                onClick={(e) => onClick(e)}
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
        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.enter});
        expect(button.state("pressed")).toEqual(true);
        button.simulate("keyup", {keyCode: keyCodes.enter});
        expect(button.state("pressed")).toEqual(false);

        expect(button.state("pressed")).toEqual(false);
        button.simulate("keydown", {keyCode: keyCodes.space});
        expect(button.state("pressed")).toEqual(false);
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
        button.simulate("keyup", {keyCode: keyCodes.tab});
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
        button.simulate("click");
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
        const button = mount(
            <ClickableBehavior disabled={false} onClick={(e) => onClick(e)}>
                {(state, handlers) => {
                    return <button {...handlers}>Label</button>;
                }}
            </ClickableBehavior>,
        );
        expect(onClick).not.toHaveBeenCalled();

        button.simulate("mousedown");
        button.simulate("mouseup");
        button.simulate("click");
        expect(onClick).toHaveBeenCalledTimes(1);

        // Order of DOM events is different for space vs. enter
        button.simulate("keydown", {keyCode: keyCodes.space});
        button.simulate("keyup", {keyCode: keyCodes.space});
        button.simulate("click");
        expect(onClick).toHaveBeenCalledTimes(2);

        button.simulate("keydown", {keyCode: keyCodes.enter});
        button.simulate("click");
        button.simulate("keyup", {keyCode: keyCodes.enter});
        expect(onClick).toHaveBeenCalledTimes(3);

        button.simulate("touchstart", {keyCode: keyCodes.space});
        button.simulate("touchend", {keyCode: keyCodes.space});
        button.simulate("click");
        expect(onClick).toHaveBeenCalledTimes(4);
    });
});
