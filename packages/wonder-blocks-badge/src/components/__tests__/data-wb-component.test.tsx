import * as React from "react";
import {render, screen} from "@testing-library/react";

import {Badge} from "../badge";
import {StatusBadge} from "../status-badge";
import {GemBadge} from "../gem-badge";
import {StreakBadge} from "../streak-badge";
import {DueBadge} from "../due-badge";
import {NeutralBadge} from "../neutral-badge";

describe("data-wb-component", () => {
    it.each([
        ["Badge", <Badge key="1" label="Label" testId="root" />],
        ["StatusBadge", <StatusBadge key="2" label="Label" testId="root" />],
        ["GemBadge", <GemBadge key="3" label="Label" testId="root" />],
        ["StreakBadge", <StreakBadge key="4" label="Label" testId="root" />],
        ["DueBadge", <DueBadge key="5" label="Label" testId="root" />],
        ["NeutralBadge", <NeutralBadge key="6" label="Label" testId="root" />],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
