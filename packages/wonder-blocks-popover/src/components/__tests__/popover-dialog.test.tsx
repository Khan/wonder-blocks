import * as React from "react";
import {render} from "@testing-library/react";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";
import PopoverDialog from "../popover-dialog";
import PopoverContentCore from "../popover-content-core";

jest.mock("@khanacademy/wonder-blocks-tooltip");

describe("PopoverDialog", () => {
    it("should call onUpdate if placement is changed", () => {
        // Arrange
        const onUpdateMock = jest.fn();
        const UnderTest = ({placement}: {placement: Placement}) => (
            <PopoverDialog
                showTail={true}
                placement={placement}
                onUpdate={onUpdateMock}
            >
                <PopoverContentCore>popover content</PopoverContentCore>
            </PopoverDialog>
        );

        const {rerender} = render(<UnderTest placement="top" />);

        // Act
        rerender(<UnderTest placement="bottom" />);

        // Assert
        expect(onUpdateMock).toHaveBeenCalledWith("bottom");
    });

    it("should not call onUpdate if placement remains the same", () => {
        // Arrange
        const onUpdateMock = jest.fn();

        const UnderTest = ({placement}: {placement: Placement}) => (
            <PopoverDialog
                showTail={true}
                placement={placement}
                onUpdate={onUpdateMock}
            >
                <PopoverContentCore>popover content</PopoverContentCore>
            </PopoverDialog>
        );

        const {rerender} = render(<UnderTest placement="top" />);

        // Act
        rerender(<UnderTest placement="top" />);

        // Assert
        expect(onUpdateMock).not.toHaveBeenCalled();
    });
});
