import * as React from "react";
import {render, screen} from "@testing-library/react";

import {ThemeSwitcherContext} from "../theme-switcher-context";

describe("ThemeSwitcherContext", () => {
    it("should create a context with the 'default' theme", () => {
        // Arrange

        // Act
        render(
            <ThemeSwitcherContext.Consumer>
                {(value) => <>The current theme is: {value}</>}
            </ThemeSwitcherContext.Consumer>,
        );

        // Assert
        expect(screen.getByText(/The current theme is: default/)).toBeTruthy();
    });

    it("should update its value", () => {
        // Arrange

        // Act
        render(
            <ThemeSwitcherContext.Provider value="khanmigo">
                <ThemeSwitcherContext.Consumer>
                    {(value) => <>The current theme is: {value}</>}
                </ThemeSwitcherContext.Consumer>
                ,
            </ThemeSwitcherContext.Provider>,
        );

        // Assert
        expect(screen.getByText(/The current theme is: khanmigo/)).toBeTruthy();
    });
});
