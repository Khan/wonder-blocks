import * as React from "react";
import {render, screen} from "@testing-library/react";

import Heading from "../heading";
import BodyText from "../body-text";
import BodyMonospace from "../body-monospace";

describe("data-wb-component", () => {
    it.each([
        ["Heading", <Heading key="heading" testId="root" />],
        ["BodyText", <BodyText key="body-text" testId="root" />],
        ["BodyMonospace", <BodyMonospace key="body-monospace" testId="root" />],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
