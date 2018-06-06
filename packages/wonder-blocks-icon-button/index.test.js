// @flow
import React from "react";
import {mount, shallow} from "enzyme";
import renderer from "react-test-renderer";

import IconButton from "./index.js";
import IconButtonCore from "./components/icon-button-core.js";

const searchIcon = `M7.73732912,6.67985439 C7.75204857,6.69246326 7.76639529,
    6.70573509 7.7803301,6.7196699 L9.65165045,8.59099025 C9.94454365,
    8.8838835 9.94454365,9.3587572 9.65165045,9.65165045 C9.3587572,
    9.94454365 8.8838835,9.94454365 8.59099025,9.65165045 L6.7196699,
    7.7803301 C6.70573509,7.76639529 6.69246326,7.75204857 6.67985439,
    7.73732912 C5.99121283,8.21804812 5.15353311,8.5 4.25,8.5 C1.90278981,
    8.5 0,6.59721019 0,4.25 C0,1.90278981 1.90278981,0 4.25,0 C6.59721019,
    0 8.5,1.90278981 8.5,4.25 C8.5,5.15353311 8.21804812,5.99121283
    7.73732912,6.67985439 L7.73732912,6.67985439 Z M4.25,7.5 C6.04492544,
    7.5 7.5,6.04492544 7.5,4.25 C7.5,2.45507456 6.04492544,1 4.25,1
    C2.45507456,1 1,2.45507456 1,4.25 C1,6.04492544 2.45507456,7.5 4.25,
    7.5 L4.25,7.5 Z`;

describe("IconButton", () => {
    test("render an icon", (done) => {
        const wrapper = shallow(
            <IconButton
                icon={searchIcon}
                alt="search"
                onClick={() => done()}
            />,
        );
        wrapper.simulate("click");
    });
    test("throw an error for if light and not primary", () => {
        expect(() =>
            mount(
                <IconButton
                    icon={searchIcon}
                    alt="search"
                    kind="secondary"
                    light={true}
                    onClick={() => void 0}
                />,
            ),
        ).toThrowError("Light is only supported for primary IconButtons");
    });
});

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

describe("IconButtonCore", () => {
    for (const kind of ["primary", "secondary", "tertiary"]) {
        for (const color of ["default", "destructive"]) {
            for (const size of ["default", "small"]) {
                for (const light of kind === "primary"
                    ? [true, false]
                    : [false]) {
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
                                    <IconButtonCore
                                        icon={searchIcon}
                                        alt="search"
                                        kind={kind}
                                        size={size}
                                        color={color}
                                        light={light}
                                        {...stateProps}
                                        {...defaultHandlers}
                                    >
                                        Click me
                                    </IconButtonCore>,
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
