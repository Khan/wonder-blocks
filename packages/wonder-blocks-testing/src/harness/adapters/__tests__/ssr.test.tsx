import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as WBCore from "@khanacademy/wonder-blocks-core";
import {makeTestHarness} from "../../make-test-harness";

import * as SSR from "../ssr";

jest.mock("@khanacademy/wonder-stuff-core", () => {
    const actualCore = jest.requireActual("@khanacademy/wonder-stuff-core");
    return {
        ...actualCore,
        RenderStateRoot: (props: any) => (
            <actualCore.RenderStateRoot {...props} />
        ),
    };
});

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

    it("should enable harnessing of components that require RenderStateRoot", () => {
        // Arrange
        const ComponentNeedsSsr = (props: any) => {
            const idf = WBCore.useUniqueIdWithoutMock();
            return <div>{idf?.get("my-id")}</div>;
        };
        const testHarness = makeTestHarness(
            {
                ssr: SSR.adapter,
            },
            {
                ssr: true,
            },
        );
        const Harnessed = testHarness(ComponentNeedsSsr);

        // Act
        const underTest = () => render(<Harnessed />);

        // Assert
        expect(underTest).not.toThrowError();
    });

    it("should throw on bad configuration", () => {
        // Arrange
        const children = <div>CHILDREN!</div>;

        // Act
        const underTest = () => render(SSR.adapter(children, false as any));

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Unexpected configuration: set config to null to turn this adapter off"`,
        );
    });
});
