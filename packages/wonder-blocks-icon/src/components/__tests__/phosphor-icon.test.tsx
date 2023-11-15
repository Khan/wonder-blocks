import * as React from "react";
import {render, screen} from "@testing-library/react";

import Plus from "@phosphor-icons/core/regular/plus.svg";
import PlusBold from "@phosphor-icons/core/bold/plus-bold.svg";
// mock out the custom icon
import customIcon from "./custom-icon-mock.svg";

import {PhosphorIcon} from "../phosphor-icon";
import * as utils from "../../util/icon-util";

describe("PhosphorIcon", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("forwards the ref to the `span` element", async () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<PhosphorIcon icon={Plus} ref={ref} />);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies aria-label to icon", async () => {
        // Arrange

        // Act
        render(
            <PhosphorIcon
                icon={Plus}
                aria-label="something"
                testId="phosphor-icon"
            />,
        );

        // Assert
        expect(screen.getByTestId("phosphor-icon")).toHaveAttribute(
            "aria-label",
            "something",
        );
    });

    it("calls viewportPixelsForSize with size from props", async () => {
        // Arrange
        const viewPortPixelsForSizeSpy = jest.spyOn(
            utils,
            "viewportPixelsForSize",
        );

        // Act
        render(<PhosphorIcon icon={PlusBold} size="small" />);

        // Assert
        expect(viewPortPixelsForSizeSpy).toHaveBeenCalledWith("small");
    });

    it("sets correct width", async () => {
        // Arrange
        const expectedRenderSize = 24;

        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedRenderSize,
        );

        // Act
        render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

        // Assert
        const icon = screen.getByTestId("phosphor-icon");
        expect(icon).toHaveStyle(`width: ${expectedRenderSize}px`);
    });

    it("sets correct height", async () => {
        // Arrange
        const expectedRenderSize = 24;

        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedRenderSize,
        );

        // Act
        render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

        // Assert
        const icon = screen.getByTestId("phosphor-icon");
        expect(icon).toHaveStyle(`height: ${expectedRenderSize}px`);
    });

    it("applies style prop", async () => {
        // Arrange
        const expectedStyle = {
            display: "none",
        } as const;

        // Act
        render(
            <PhosphorIcon
                icon={Plus}
                style={expectedStyle}
                testId="phosphor-icon"
            />,
        );

        // Assert
        expect(screen.getByTestId("phosphor-icon")).toHaveStyle(
            "display: none;",
        );
    });

    it("includes SVG using the maskImage css attribute", async () => {
        // Arrange

        // Act
        render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

        // Assert
        expect(screen.getByTestId("phosphor-icon")).toHaveStyle(
            `mask-image: url(${Plus});`,
        );
    });

    it("allows importing an arbitrary SVG file (custom icon)", async () => {
        // Arrange

        // Act
        render(<PhosphorIcon icon={customIcon} testId="phosphor-icon" />);

        // Assert
        expect(screen.getByTestId("phosphor-icon")).toHaveStyle(
            `mask-image: url(${customIcon});`,
        );
    });
});
