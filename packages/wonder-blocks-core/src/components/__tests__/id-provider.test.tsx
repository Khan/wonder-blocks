/* eslint-disable import/no-deprecated */
import * as React from "react";
import {render} from "@testing-library/react";

import IDProvider from "../id-provider";

const mockIDENTIFIER = `uid-component-0-${IDProvider.defaultId}`;

jest.mock("@khanacademy/wonder-blocks-core", () => {
    const Core = jest.requireActual("@khanacademy/wonder-blocks-core");
    // We want all of Core to be the regular thing except for UniqueIDProvider
    return {
        ...Core,
        UniqueIDProvider: (props: any) =>
            // eslint-disable-next-line testing-library/no-node-access
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
        render(
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
        render(<IDProvider scope="component">{renderDialogFn}</IDProvider>);

        // Assert
        expect(renderDialogFn).toHaveBeenCalledWith(mockIDENTIFIER);
    });
});
