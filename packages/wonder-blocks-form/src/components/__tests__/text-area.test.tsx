import * as React from "react";
import {render, screen} from "@testing-library/react";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import TextArea from "../text-area";

const defaultOptions = {
    wrapper: RenderStateRoot,
};
describe("TextArea", () => {
    it("id prop is passed to textarea", async () => {
        // Arrange
        const testId = "test-id";
        // Act
        render(
            <TextArea id={testId} value="" onChange={() => {}} />,
            defaultOptions,
        );

        // Assert
        expect(await screen.findByRole("textbox")).toHaveAttribute(
            "id",
            testId,
        );
    });

    it("auto-generated id is passed to textarea when id prop is not set", async () => {
        // Arrange

        // Act
        render(<TextArea value="" onChange={() => {}} />, defaultOptions);

        // Assert
        // Since the generated id is unique, we cannot know what it will be. We
        // only test if the id attribute starts with "uid-", then followed by
        // "text-field-" as the scope assigned to IDProvider.
        const textArea = await screen.findByRole("textbox");
        expect(textArea.getAttribute("id")).toMatch(/uid-text-area-.*$/);
    });

    it("testId prop is passed to the input element", async () => {
        // Arrange
        const testId = "test-id";
        render(
            <TextArea value="Text" onChange={() => {}} testId={testId} />,
            defaultOptions,
        );

        // Act

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("data-testid", testId);
    });
});
