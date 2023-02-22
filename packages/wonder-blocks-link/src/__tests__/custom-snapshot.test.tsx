import React from "react";
// @ts-expect-error [FEI-5019] - TS7016 - Could not find a declaration file for module 'react-test-renderer'. '/Users/kevinbarabash/khan/wonder-blocks/node_modules/react-test-renderer/index.js' implicitly has an 'any' type.
import renderer from "react-test-renderer";

import LinkCore from "../components/link-core";
import Link from "../components/link";

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
    onFocus: () => void 0,
    onBlur: () => void 0,
    tabIndex: 0,
} as const;

describe("Link", () => {
    test.each`
        tabIndex
        ${-1}
        ${0}
        ${1}
    `("<Link tabIndex={$tabIndex}>", ({tabIndex}: any) => {
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
                for (const visitable of kind === "primary"
                    ? [true, false]
                    : [false]) {
                    for (const inline of [true, false]) {
                        for (const state of ["focused", "hovered", "pressed"]) {
                            const stateProps = {
                                focused: state === "focused",
                                hovered: state === "hovered",
                                pressed: state === "pressed",
                                waiting: false,
                            } as const;
                            test(`kind:${kind} href:${href} light:${String(
                                light,
                            )} visitable:${String(visitable)} ${state}`, () => {
                                const tree = renderer
                                    .create(
                                        <LinkCore
                                            href="#"
                                            inline={inline}
                                            // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
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
    }
});
