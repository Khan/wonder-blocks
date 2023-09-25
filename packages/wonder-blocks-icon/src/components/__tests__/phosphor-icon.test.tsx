import * as React from "react";
import {render, screen} from "@testing-library/react";

import Plus from "@phosphor-icons/core/regular/plus.svg";
import PlusBold from "@phosphor-icons/core/bold/plus-bold.svg";

import PhosphorIcon from "../phosphor-icon";
import * as utils from "../../util/icon-util";

describe("PhosphorIcon", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("forwards the ref to the `span` element", async () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<PhosphorIcon icon={Plus} ref={ref} />);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    test("applies aria-label to icon", async () => {
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

    test("calls viewportPixelsForSize with size from props", async () => {
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

    test("sets image to asset dimensions", async () => {
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
        expect(icon).toHaveStyle(`height: ${expectedRenderSize}px`);
    });

    test("applies style prop", async () => {
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

    test("includes SVG using the maskImage css attribute", async () => {
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
            `mask-image: url(${Plus});`,
        );
    });
});
