import * as React from "react";
import {render, screen} from "@testing-library/react";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

import {IconButton} from "../icon-button";
import {ActivityIconButton} from "../activity-icon-button";
import {ConversationIconButton} from "../conversation-icon-button";
import {NodeIconButton} from "../node-icon-button";

describe("data-wb-component", () => {
    it.each([
        ["IconButton", <IconButton key="1" icon={plusIcon} aria-label="Add" />],
        [
            "ActivityIconButton",
            <ActivityIconButton key="2" icon={plusIcon} aria-label="Add" />,
        ],
        [
            "ConversationIconButton",
            <ConversationIconButton key="3" icon={plusIcon} aria-label="Add" />,
        ],
        [
            "NodeIconButton",
            <NodeIconButton key="4" icon={plusIcon} aria-label="Add" />,
        ],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByRole("button");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
