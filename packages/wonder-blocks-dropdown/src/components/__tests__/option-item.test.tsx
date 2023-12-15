import * as React from "react";
import {render, screen} from "@testing-library/react";

import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import plusIcon from "@phosphor-icons/core/regular/plus.svg";
import OptionItem from "../option-item";

describe("OptionItem", () => {
    it("should render with disabled styles", () => {
        // Arrange

        // Act
        render(<OptionItem value="1" label="Example" disabled={true} />);

        // Assert
        expect(screen.getByRole("option")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("should allow passing an accessory", () => {
        // Arrange

        // Act
        render(
            <OptionItem
                label="OptionItem"
                value="1"
                leftAccessory={<PhosphorIcon icon={plusIcon} role="img" />}
            />,
        );

        // Assert
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should allow passing a custom label", () => {
        // Arrange

        // Act
        render(
            <OptionItem
                value="1"
                label={<HeadingSmall>A heading as an item</HeadingSmall>}
            />,
        );

        // Assert
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should allow passing subtitle1", () => {
        // Arrange

        // Act
        render(
            <OptionItem
                label="OptionItem"
                value="1"
                subtitle1={"Subtitle 1"}
            />,
        );

        // Assert
        expect(screen.getByText("Subtitle 1")).toBeInTheDocument();
    });

    it("should allow passing subtitle2", () => {
        // Arrange

        // Act
        render(
            <OptionItem
                label="OptionItem"
                value="1"
                subtitle2={"Subtitle 2"}
            />,
        );

        // Assert
        expect(screen.getByText("Subtitle 2")).toBeInTheDocument();
    });
});
