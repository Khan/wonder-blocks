// @flow
import React from "react";
import renderer from "react-test-renderer";

import LinkCore from "../components/link-core.js";
import Link from "../components/link.js";

const defaultHandlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onDragStart: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onFocus: () => void 0,
    onBlur: () => void 0,
    tabIndex: 0,
};

describe("Link", () => {
    test.each`
        tabIndex
        ${-1}
        ${0}
        ${1}
    `("<Link tabIndex={$tabIndex}>", ({tabIndex}) => {
        const tree = renderer
            .create(
                <Link href="#" tabIndex={tabIndex}>
                    Click me
                </Link>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("LinkCore", () => {
    for (const kind of ["primary", "secondary"]) {
        for (const href of ["#", "#non-existent-link"]) {
            for (const light of kind === "primary" ? [true, false] : [false]) {
                for (const visitable of kind === "primary" && !light
                    ? [true, false]
                    : [false]) {
                    for (const state of ["focused", "hovered", "pressed"]) {
                        const stateProps = {
                            focused: state === "focused",
                            hovered: state === "hovered",
                            pressed: state === "pressed",
                            waiting: false,
                        };
                        test(`kind:${kind} href:${href} light:${String(
                            light,
                        )} visitable:${String(visitable)} ${state}`, () => {
                            const tree = renderer
                                .create(
                                    <LinkCore
                                        href="#"
                                        kind={kind}
                                        light={light}
                                        visitable={visitable}
                                        {...stateProps}
                                        {...defaultHandlers}
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
    }
});
