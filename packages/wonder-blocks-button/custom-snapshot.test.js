// @flow
import React from "react";
import renderer from "react-test-renderer";

import ButtonCore from "./components/button-core.js";

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
};

describe("ButtonCore", () => {
    for (const kind of ["primary", "secondary", "tertiary"]) {
        for (const color of ["default", "destructive"]) {
            for (const size of ["default", "small"]) {
                for (const light of [true, false]) {
                    for (const state of [
                        "disabled",
                        "focused",
                        "hovered",
                        "pressed",
                    ]) {
                        const stateProps = {
                            disabled: state === "disabled",
                            focused: state === "focused",
                            hovered: state === "hovered",
                            pressed: state === "pressed",
                        };
                        test(`kind:${kind} color:${color} size:${size} light:${String(
                            light,
                        )} ${state}`, () => {
                            const tree = renderer
                                .create(
                                    <ButtonCore
                                        kind={kind}
                                        size={size}
                                        color={color}
                                        light={light}
                                        {...stateProps}
                                        {...defaultHandlers}
                                    >
                                        Click me
                                    </ButtonCore>,
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
