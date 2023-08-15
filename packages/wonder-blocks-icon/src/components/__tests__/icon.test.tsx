import * as React from "react";
import {render} from "@testing-library/react";

import Icon from "../icon";
import * as icons from "../../util/icon-assets";
import * as utils from "../../util/icon-util";

describe("Icon", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("applies aria-label to svg", async () => {
        // Arrange
        const ref: React.RefObject<SVGSVGElement> = React.createRef();

        // Act
        render(<Icon icon={icons.add} ref={ref} aria-label="something" />);

        // Assert
        expect(ref.current).toHaveAttribute("aria-label", "something");
    });

    test("calls getPathForIcon", async () => {
        // Arrange
        const getPathForIconSpy = jest.spyOn(utils, "getPathForIcon");

        // Act
        render(<Icon icon={icons.add} size="medium" />);

        // Assert
        expect(getPathForIconSpy).toHaveBeenCalledTimes(1);
        expect(getPathForIconSpy).toHaveBeenCalledWith(icons.add, "medium");
    });

    test("calls viewportPixelsForSize with size from props and asset size from getPathForIcon", async () => {
        // Arrange
        const viewPortPixelsForSizeSpy = jest.spyOn(
            utils,
            "viewportPixelsForSize",
        );
        jest.spyOn(utils, "getPathForIcon").mockImplementationOnce(() => ({
            assetSize: "large",
            path: "TESTPATH",
        }));

        // Act
        render(<Icon icon={icons.add} size="small" />);

        // Assert
        expect(viewPortPixelsForSizeSpy).toHaveBeenCalledTimes(2);
        expect(viewPortPixelsForSizeSpy).toHaveBeenNthCalledWith(1, "small");
        expect(viewPortPixelsForSizeSpy).toHaveBeenNthCalledWith(2, "large");
    });

    test("sets viewbox to asset dimensions", async () => {
        // Arrange
        const expectedRenderSize = 42;
        const expectedAssetSize = 7;
        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedRenderSize,
        );
        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedAssetSize,
        );
        jest.spyOn(utils, "getPathForIcon").mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));

        const svgRef = React.createRef<SVGSVGElement>();

        // Act
        render(<Icon icon={icons.add} ref={svgRef} />);

        // Assert
        expect(svgRef.current).toHaveAttribute(
            "viewBox",
            `0 0 ${expectedAssetSize} ${expectedAssetSize}`,
        );
    });

    test("sets size to dimensions derived from size prop", async () => {
        // Arrange
        const expectedRenderSize = 42;
        const expectedAssetSize = 7;
        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedRenderSize,
        );
        jest.spyOn(utils, "viewportPixelsForSize").mockImplementationOnce(
            () => expectedAssetSize,
        );
        jest.spyOn(utils, "getPathForIcon").mockImplementationOnce(() => ({
            assetSize: "small",
            path: "TESTPATH",
        }));

        const svgRef = React.createRef<SVGSVGElement>();

        // Act
        render(<Icon icon={icons.add} ref={svgRef} />);

        // Assert
        expect(svgRef.current).toHaveAttribute(
            "width",
            String(expectedRenderSize),
        );
        expect(svgRef.current).toHaveAttribute(
            "height",
            String(expectedRenderSize),
        );
    });

    test("sets inner path fill and d to color prop and path from getPathForIcon", async () => {
        // Arrange
        const svgRef = React.createRef<SVGSVGElement>();

        // Act
        render(<Icon icon={icons.add} color={"#BADFAD"} ref={svgRef} />);
        const svg = svgRef.current;
        // There's no way to get the SVG's <path> element using
        // react testing library, so we have to use the DOM API.
        // eslint-disable-next-line testing-library/no-node-access
        const innerPath = svg?.getElementsByTagName("path")[0];

        // Assert
        expect(innerPath).toMatchInlineSnapshot(`
            <path
              d="M11 11V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4zm1 13C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              fill="#BADFAD"
            />
        `);
    });

    test("applies style prop", async () => {
        // Arrange
        const expectedStyle = {
            display: "none",
        } as const;

        const svgRef = React.createRef<SVGSVGElement>();

        // Act
        render(<Icon icon={icons.add} style={expectedStyle} ref={svgRef} />);

        // Assert
        expect(svgRef.current).toHaveAttribute(
            "style",
            expect.stringContaining("display: none;"),
        );
    });
});
