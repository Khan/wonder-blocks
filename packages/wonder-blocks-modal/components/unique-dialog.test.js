// @flow
import React from "react";
import {mount, shallow} from "enzyme";

import UniqueDialog from "./unique-dialog.js";

const mockIDENTIFIER = `uid-modal-0-${UniqueDialog.defaultTitleId}`;

jest.mock("@khanacademy/wonder-blocks-core", () => {
    const Core = jest.requireActual("@khanacademy/wonder-blocks-core");
    // We want all of Core to be the regular thing except for UniqueIDProvider
    return {
        ...Core,
        UniqueIDProvider: (props) =>
            props.children({
                get: () => mockIDENTIFIER,
            }),
    };
});

describe("UniqueDialog", () => {
    test("renders children if ID is provided", () => {
        // Arrange
        const renderDialogFn = jest.fn(() => <div />);
        const titleId = "custom-title";

        // Act
        shallow(
            <UniqueDialog id={titleId} scope="modal">
                {renderDialogFn}
            </UniqueDialog>,
        );

        // Assert
        expect(renderDialogFn).toHaveBeenCalledWith(titleId);
    });

    test("if ID is not provided, then generates a unique ID and renders children", () => {
        // Arrange
        const renderDialogFn = jest.fn(() => <div />);

        // Act
        mount(<UniqueDialog scope="modal">{renderDialogFn}</UniqueDialog>);

        // Assert
        expect(renderDialogFn).toHaveBeenCalledWith(mockIDENTIFIER);
    });
});
