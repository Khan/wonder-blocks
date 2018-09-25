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
    onDragStart: () => void 0,
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
            for (const size of ["medium", "small"]) {
                for (const light of [true, false]) {
                    for (const state of [
                        "disabled",
                        "focused",
                        "hovered",
                        "pressed",
                    ]) {
                        const disabled = state === "disabled";
                        const stateProps = {
                            disabled,
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
                                        tabIndex={disabled ? -1 : 0}
                                        spinner={false}
                                        aria-label={""}
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
    for (const kind of ["primary", "secondary", "tertiary"]) {
        for (const size of ["medium", "small"]) {
            test(`kind:${kind} size:${size} spinner:true`, () => {
                const spinner = true;
                const disabled = spinner;
                const stateProps = {
                    disabled,
                    focused: false,
                    hovered: false,
                    pressed: false,
                };
                const tree = renderer
                    .create(
                        <ButtonCore
                            kind={kind}
                            size={size}
                            color="default"
                            light={false}
                            tabIndex={disabled ? -1 : 0}
                            spinner={spinner}
                            aria-label={"loading"}
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
});
