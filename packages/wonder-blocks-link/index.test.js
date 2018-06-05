// @flow
import React from "react";
import {mount} from "enzyme";
import renderer from "react-test-renderer";

import Link from "./index.js";
import LinkCore from "./components/link-core.js";

describe("Link", () => {
    test("TODO", () => {
        const wrapper = mount(<Link href="#">Hello World!</Link>);
        wrapper.simulate("click");
    });
});

describe("LinkCore", () => {
    for (const kind of ["primary", "secondary"]) {
        for (const href of ["#", "#non-existent-link"]) {
            for (const light of kind === "primary" ? [true, false] : [false]) {
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
