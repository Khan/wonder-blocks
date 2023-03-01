import * as React from "react";
import * as renderer from "react-test-renderer";

import {icons} from "@khanacademy/wonder-blocks-icon";

import IconButtonCore from "../components/icon-button-core";

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
} as const;

describe("IconButtonCore", () => {
    for (const kind of ["primary", "secondary", "tertiary"] as const) {
        for (const color of ["default", "destructive"] as const) {
            for (const size of ["default", "small"] as const) {
                for (const light of kind === "primary"
                    ? [true, false]
                    : [false]) {
                    for (const state of [
                        "disabled",
                        "focused",
                        "hovered",
                        "pressed",
                    ] as const) {
                        const disabled = state === "disabled";
                        const stateProps = {
                            disabled,
                            focused: state === "focused",
                            hovered: state === "hovered",
                            pressed: state === "pressed",
                            waiting: false,
                        } as const;
                        test(`kind:${kind} color:${color} size:${size} light:${String(
                            light,
                        )} ${state}`, () => {
                            const tree = renderer
                                .create(
                                    <IconButtonCore
                                        icon={icons.search}
                                        aria-label="search"
                                        kind={kind}
                                        color={color}
                                        light={light}
                                        tabIndex={disabled ? -1 : 0}
                                        {...stateProps}
                                        {...defaultHandlers}
                                    />,
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
