// @flow
import React from "react";
import renderer from "react-test-renderer";

import LinkCore from "./components/link-core.js";

const defaultHandlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

describe("LinkCore", () => {
    for (const kind of ["primary", "secondary"]) {
        for (const href of ["#", "#non-existent-link"]) {
            for (const light of kind === "primary" ? [true, false] : [false]) {
                for (const state of ["focused", "hovered", "pressed"]) {
                    const stateProps = {
                        focused: state === "focused",
                        hovered: state === "hovered",
                        pressed: state === "pressed",
                    };
                    test(`kind:${kind} href:${href} light:${String(
                        light,
                    )} ${state}`, () => {
                        const tree = renderer
                            .create(
                                <LinkCore
                                    href="#"
                                    kind={kind}
                                    caret={false}
                                    light={light}
                                    {...stateProps}
                                    {...defaultHandlers}
                                    tabIndex={0}
                                >
                                    Click me
                                </LinkCore>,
                            )
                            .toJSON();
                        expect(tree).toMatchSnapshot();
                    });
                }
            }
        }
    }
});
