// @flow
import * as React from "react";
import {mount, shallow} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import IDProvider from "../id-provider.js";

const mockIDENTIFIER = `uid-component-0-${IDProvider.defaultId}`;

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
            <IDProvider id={titleId} scope="component">
                {renderDialogFn}
            </IDProvider>,
        );

        // Assert
        expect(renderDialogFn).toHaveBeenCalledWith(titleId);
    });

    test("if ID is not provided, then generates a unique ID and renders children", () => {
        // Arrange
        const renderDialogFn = jest.fn(() => <div />);

        // Act
        mount(<IDProvider scope="component">{renderDialogFn}</IDProvider>);

        // Assert
        expect(renderDialogFn).toHaveBeenCalledWith(mockIDENTIFIER);
    });
});
