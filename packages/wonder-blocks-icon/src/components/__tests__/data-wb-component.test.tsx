import * as React from "react";
import {render, screen} from "@testing-library/react";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

import {Icon} from "../icon";
import {PhosphorIcon} from "../phosphor-icon";
import {GemIcon} from "../custom-icon-components/gem-icon";
import {StreakIcon} from "../custom-icon-components/streak-icon";

describe("data-wb-component", () => {
    it.each([
        [
            "Icon",
            <Icon key="1" testId="root">
                <img src="/foo.svg" alt="" />
            </Icon>,
        ],
        [
            "PhosphorIcon",
            <PhosphorIcon key="2" icon={plusIcon} testId="root" />,
        ],
        ["GemIcon", <GemIcon key="3" testId="root" />],
        ["StreakIcon", <StreakIcon key="4" testId="root" />],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
