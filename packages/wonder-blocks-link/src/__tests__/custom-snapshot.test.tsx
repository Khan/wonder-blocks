import * as React from "react";

import {render} from "@testing-library/react";
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
        const {container} = render(
            <Link href="#" tabIndex={tabIndex}>
                Click me
            </Link>,
        );
        expect(container).toMatchSnapshot();
    });
});

describe("LinkCore", () => {
    for (const kind of ["primary", "secondary"] as const) {
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
                                const {container} = render(
                                    <LinkCore
                                        href="#"
                                        inline={inline}
                                        kind={kind}
                                        light={light}
                                        visitable={visitable}
                                        {...stateProps}
                                        {...defaultHandlers}
                                    >
                                        Click me
                                    </LinkCore>,
                                );

                                expect(container).toMatchSnapshot();
                            });
                        }
                    }
                }
            }
        }
    }
});
