import * as React from "react";
import {render, screen} from "@testing-library/react";

import {Heading} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import plusIcon from "@phosphor-icons/core/regular/plus.svg";
import ActionItem from "../action-item";
import OptionItem from "../option-item";
import SeparatorItem from "../separator-item";

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
                label={<Heading>A heading as an item</Heading>}
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

    describe("ref", () => {
        it("should forward the ref to the root element", () => {
            // Arrange
            const ref = React.createRef<HTMLElement>();

            // Act
            render(<OptionItem value="1" label="Example" ref={ref} />);

            // Assert
            expect(ref.current).toBe(screen.getByRole("option"));
        });
    });

    describe("isClassOf", () => {
        it("should return true for an OptionItem element", () => {
            // Arrange
            const element = <OptionItem value="1" label="Example" />;

            // Act
            const result = OptionItem.isClassOf(element);

            // Assert
            expect(result).toBe(true);
        });

        it.each([
            ["ActionItem", <ActionItem key="action" label="Example" />],
            ["SeparatorItem", <SeparatorItem key="separator" />],
            ["div", <div key="div" />],
        ])("should return false for a %s element", (_, element) => {
            // Arrange
            // (element comes from it.each)

            // Act
            const result = OptionItem.isClassOf(element);

            // Assert
            expect(result).toBe(false);
        });
    });
});
