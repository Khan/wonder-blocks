// @flow
import * as React from "react";
import * as Core from "@khanacademy/wonder-blocks-core";
import {mount} from "enzyme";
import "jest-enzyme";

import icons from "../../util/icon-assets.js";
import {getPathForIcon, viewportPixelsForSize} from "../../util/icon-util.js";

// We mock things out so that we're in control of what really gets rendered.
// Means we can test that we're using addStyle to generate the component
// and then verify what that component has going on.
jest.mock("@khanacademy/wonder-blocks-core", () => {
    const mockStyledSVGComponent = jest.fn((props: any) => <div>Pretend</div>);
    return {
        _mockStyledSVGComponent: mockStyledSVGComponent,
        addStyle: jest.fn(() => mockStyledSVGComponent),
    };
});

// We cannot make the mock outside of the jest.mock call, so we make it inside
// then attach it to the exports and grab it here.
const mockStyledSVGComponent: JestMockFn<any, any> = (Core: any)
    ._mockStyledSVGComponent;

// Also, let's type up a couple of other mocks to shut flow up.
const mockGetPathForIcon: JestMockFn<any, any> = (getPathForIcon: any);
const mockViewportPixelsForSize: JestMockFn<any, any> =
    (viewportPixelsForSize: any);

jest.mock("../../util/icon-util.js", () => ({
    getPathForIcon: jest.fn(() => ({})),
    viewportPixelsForSize: jest.fn(() => ({})),
}));

describe("Icon", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("creates a styled svg using addStyle", async () => {
        // Arrange
        const importModulePromise = import("../icon.js");

        // Act
        await importModulePromise;

        // Assert
        expect(Core.addStyle).toHaveBeenCalledWith("svg");
    });

    test("applies aria-label to svg", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon
                        ref={() => resolve()}
                        aria-label="ARIA LABEL"
                        icon={icons.add}
                    />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockStyledSVGComponent).toHaveBeenCalledTimes(1);
        expect(mockStyledSVGComponent.mock.calls[0][0]).toEqual(
            expect.objectContaining({"aria-label": "ARIA LABEL"}),
        );
    });

    test("calls getPathForIcon", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon
                        ref={() => resolve()}
                        icon={icons.add}
                        size="medium"
                    />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockGetPathForIcon).toHaveBeenCalledTimes(1);
        expect(mockGetPathForIcon).toHaveBeenCalledWith(icons.add, "medium");
    });

    test("calls viewportPixelsForSize with size from props and asset size from getPathForIcon", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        mockGetPathForIcon.mockImplementationOnce(() => ({
            assetSize: "large",
            path: "TESTPATH",
        }));
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon ref={() => resolve()} icon={icons.add} size="small" />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockViewportPixelsForSize).toHaveBeenCalledTimes(2);
        expect(mockViewportPixelsForSize).toHaveBeenNthCalledWith(1, "small");
        expect(mockViewportPixelsForSize).toHaveBeenNthCalledWith(2, "large");
    });

    test("sets viewbox to asset dimensions", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        const expectedRenderSize = 42;
        const expectedAssetSize = 7;
        mockViewportPixelsForSize.mockImplementationOnce(
            () => expectedRenderSize,
        );
        mockViewportPixelsForSize.mockImplementationOnce(
            () => expectedAssetSize,
        );
        mockGetPathForIcon.mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon ref={() => resolve()} icon={icons.add} />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockStyledSVGComponent).toHaveBeenCalledTimes(1);
        expect(mockStyledSVGComponent.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                viewBox: `0 0 ${expectedAssetSize} ${expectedAssetSize}`,
            }),
        );
    });

    test("sets size to dimensions derived from size prop", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        const expectedRenderSize = 42;
        const expectedAssetSize = 7;
        mockViewportPixelsForSize.mockImplementationOnce(
            () => expectedRenderSize,
        );
        mockViewportPixelsForSize.mockImplementationOnce(
            () => expectedAssetSize,
        );
        mockGetPathForIcon.mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon ref={() => resolve()} icon={icons.add} />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockStyledSVGComponent).toHaveBeenCalledTimes(1);
        expect(mockStyledSVGComponent.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                width: expectedRenderSize,
                height: expectedRenderSize,
            }),
        );
    });

    test("sets inner path fill and d to color prop and path from getPathForIcon", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        mockGetPathForIcon.mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon
                        ref={() => resolve()}
                        icon={icons.add}
                        color={"#BADFAD"}
                    />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockStyledSVGComponent).toHaveBeenCalledTimes(1);
        expect(mockStyledSVGComponent.mock.calls[0][0].children)
            .toMatchInlineSnapshot(`
<path
  d="TESTPATH"
  fill="#BADFAD"
/>
`);
    });

    test("applies style prop", async () => {
        // Arrange
        const {default: Icon} = await import("../icon.js");
        mockGetPathForIcon.mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));
        const expectedStyle = {
            display: "none",
        };
        const render = new Promise((resolve) => {
            const nodes = (
                <div>
                    <Icon
                        ref={() => resolve()}
                        icon={icons.add}
                        style={expectedStyle}
                    />
                </div>
            );

            mount(nodes);
        });

        // Act
        await render;

        // Assert
        expect(mockStyledSVGComponent).toHaveBeenCalledTimes(1);
        expect(mockStyledSVGComponent.mock.calls[0][0].style).toContain(
            expectedStyle,
        );
    });
});
