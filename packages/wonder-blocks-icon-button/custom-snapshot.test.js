// @flow
import React from "react";
import renderer from "react-test-renderer";

import {icons} from "@khanacademy/wonder-blocks-icon";

import IconButtonCore from "./components/icon-button-core.js";

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
                                    <IconButtonCore
                                        icon={icons.search}
                                        aria-label="search"
                                        kind={kind}
                                        color={color}
                                        light={light}
                                        {...stateProps}
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
