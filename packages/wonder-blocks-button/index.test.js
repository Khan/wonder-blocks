// @flow
import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";

import Button from "./index.js";
import ButtonCore from "./components/button-core.js";

describe("Button", () => {
    test("render a label", (done) => {
        const wrapper = shallow(
            <Button onClick={() => done()}>Hello World!</Button>,
        );
        wrapper.simulate("click");
    });
});

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
