import * as React from "react";
import {render, screen} from "@testing-library/react";

import * as WBCore from "@khanacademy/wonder-blocks-core";

import * as SSR from "../ssr";

jest.mock("@khanacademy/wonder-stuff-core", () => ({
    ...jest.requireActual("@khanacademy/wonder-stuff-core"),
    RenderStateRoot: (props: any) => <div {...props} />,
}));

describe("SSR.adapter", () => {
    it("should render the RenderStateRoot", () => {
        // Arrange
        const children = <div>CHILDREN!</div>;
        const renderStateRootSpy = jest.spyOn(WBCore, "RenderStateRoot");

        // Act
        render(SSR.adapter(children, true));

        // Assert
        expect(renderStateRootSpy).toHaveBeenCalledWith(
            {
                children,
            },
            {},
        );
    });

    it("should render the children correctly", () => {
        // Arrange
        const children = <div>CHILDREN!</div>;

        // Act
        render(SSR.adapter(children, true));

        // Assert
        expect(screen.getByText("CHILDREN!")).toBeInTheDocument();
    });
});
