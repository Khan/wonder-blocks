import * as React from "react";
import {render} from "@testing-library/react";

import MagnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import IconButtonCore from "../components/icon-button-core";
import {IconButtonSize} from "../components/icon-button";

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
            for (const size of [
                "xsmall",
                "small",
                "medium",
            ] as IconButtonSize[]) {
                for (const light of kind === "primary"
                    ? [true, false]
                    : [false]) {
                    for (const state of ["disabled"] as const) {
                        const disabled = state === "disabled";
                        const stateProps = {
                            disabled,
                        } as const;
                        test(`kind:${kind} color:${color} size:${size} light:${String(
                            light,
                        )} ${state}`, () => {
                            const {container} = render(
                                <IconButtonCore
                                    icon={MagnifyingGlass}
                                    aria-label="search"
                                    kind={kind}
                                    color={color}
                                    light={light}
                                    size={size}
                                    tabIndex={disabled ? -1 : 0}
                                    {...stateProps}
                                    {...defaultHandlers}
                                />,
                            );

                            expect(container).toMatchSnapshot();
                        });
                    }
                }
            }
        }
    }
});
