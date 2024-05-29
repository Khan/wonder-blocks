import * as React from "react";
import {render} from "@testing-library/react";
import ButtonCore from "../components/button-core";
import Button from "../components/button";

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

describe("Button", () => {
    test.each`
        tabIndex
        ${-1}
        ${0}
        ${1}
    `("<Link tabIndex={$tabIndex}>", ({tabIndex}: any) => {
        const {container} = render(
            <Button tabIndex={tabIndex}>Click me</Button>,
        );
        expect(container).toMatchSnapshot();
    });
});

describe("ButtonCore", () => {
    for (const kind of ["primary", "secondary", "tertiary"] as const) {
        for (const color of ["default", "destructive"] as const) {
            for (const size of ["medium", "small", "large"] as const) {
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
                            waiting: false,
                        } as const;
                        test(`kind:${kind} color:${color} size:${size} light:${String(
                            light,
                        )} ${state}`, () => {
                            const {container} = render(
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
                            );
                            expect(container).toMatchSnapshot();
                        });
                    }
                }
            }
        }
    }
    for (const kind of ["primary", "secondary", "tertiary"] as const) {
        for (const size of ["medium", "small"] as const) {
            test(`kind:${kind} size:${size} spinner:true`, () => {
                const spinner = true;
                const disabled = spinner;
                const stateProps = {
                    disabled,
                    focused: false,
                    hovered: false,
                    pressed: false,
                    waiting: false,
                } as const;
                const {container} = render(
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
                );
                expect(container).toMatchSnapshot();
            });
        }
    }
});
