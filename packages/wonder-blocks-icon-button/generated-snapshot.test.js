// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests
// edit packages/wonder-blocks-icon-button/docs.md and run `npm run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";
import IconButton from "./components/icon-button.js";

describe("wonder-blocks-icon-button", () => {
    it("example 1", () => {
        const Color = require("wonder-blocks-color").default;
        const IconButtonCore = require("./components/icon-button-core.js")
            .default;
        const searchIcon = `M7.73732912,6.67985439 C7.75204857,6.69246326 7.76639529,
            6.70573509 7.7803301,6.7196699 L9.65165045,8.59099025 C9.94454365,
            8.8838835 9.94454365,9.3587572 9.65165045,9.65165045 C9.3587572,
            9.94454365 8.8838835,9.94454365 8.59099025,9.65165045 L6.7196699,
            7.7803301 C6.70573509,7.76639529 6.69246326,7.75204857 6.67985439,
            7.73732912 C5.99121283,8.21804812 5.15353311,8.5 4.25,8.5 C1.90278981,
            8.5 0,6.59721019 0,4.25 C0,1.90278981 1.90278981,0 4.25,0 C6.59721019,
            0 8.5,1.90278981 8.5,4.25 C8.5,5.15353311 8.21804812,5.99121283
            7.73732912,6.67985439 L7.73732912,6.67985439 Z M4.25,7.5 C6.04492544,
            7.5 7.5,6.04492544 7.5,4.25 C7.5,2.45507456 6.04492544,1 4.25,1
            C2.45507456,1 1,2.45507456 1,4.25 C1,6.04492544 2.45507456,7.5 4.25,
            7.5 L4.25,7.5 Z`;

        const {blue, darkBlue, white, offWhite} = Color;

        const handlers = {
            onClick: () => void 0,
            onMouseEnter: () => void 0,
            onMouseLeave: () => void 0,
            onMouseDown: () => void 0,
            onMouseUp: () => void 0,
            onTouchStart: () => void 0,
            onTouchEnd: () => void 0,
            onTouchCancel: () => void 0,
            onKeyDown: () => void 0,
            onKeyUp: () => void 0,
            onBlur: () => void 0,
        };

        const defaultProps = {
            kind: "primary",
            icon: searchIcon,
            alt: "search",
            color: blue,
            light: false,
            hovered: false,
            focused: false,
            pressed: false,
            disabled: false,
        };

        const example = (
            <table
                style={{
                    background: offWhite,
                    textAlign: "center",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th />
                        <th style={{width: 100}}>Default</th>
                        <th style={{width: 100}}>
                            Hovered/<br />Focused
                        </th>
                        <th style={{width: 100}}>
                            Active/<br />Pressed
                        </th>
                        <th style={{width: 100}}>Disabled</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Primary</th>
                        <td>
                            <IconButtonCore {...defaultProps} {...handlers}>
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Secondary</th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Tertiary</th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="tertiary"
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr
                        style={{
                            background: darkBlue,
                            color: white,
                            height: 60,
                            verticalAlign: "middle",
                        }}
                    >
                        <th>
                            Primary<br />(Light)
                        </th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const Color = require("wonder-blocks-color").default;
        const IconButtonCore = require("./components/icon-button-core.js")
            .default;
        const searchIcon = `M7.73732912,6.67985439 C7.75204857,6.69246326 7.76639529,
            6.70573509 7.7803301,6.7196699 L9.65165045,8.59099025 C9.94454365,
            8.8838835 9.94454365,9.3587572 9.65165045,9.65165045 C9.3587572,
            9.94454365 8.8838835,9.94454365 8.59099025,9.65165045 L6.7196699,
            7.7803301 C6.70573509,7.76639529 6.69246326,7.75204857 6.67985439,
            7.73732912 C5.99121283,8.21804812 5.15353311,8.5 4.25,8.5 C1.90278981,
            8.5 0,6.59721019 0,4.25 C0,1.90278981 1.90278981,0 4.25,0 C6.59721019,
            0 8.5,1.90278981 8.5,4.25 C8.5,5.15353311 8.21804812,5.99121283
            7.73732912,6.67985439 L7.73732912,6.67985439 Z M4.25,7.5 C6.04492544,
            7.5 7.5,6.04492544 7.5,4.25 C7.5,2.45507456 6.04492544,1 4.25,1
            C2.45507456,1 1,2.45507456 1,4.25 C1,6.04492544 2.45507456,7.5 4.25,
            7.5 L4.25,7.5 Z`;

        const {red, darkBlue, white, offWhite} = Color;

        const handlers = {
            onClick: () => void 0,
            onMouseEnter: () => void 0,
            onMouseLeave: () => void 0,
            onMouseDown: () => void 0,
            onMouseUp: () => void 0,
            onTouchStart: () => void 0,
            onTouchEnd: () => void 0,
            onTouchCancel: () => void 0,
            onKeyDown: () => void 0,
            onKeyUp: () => void 0,
            onBlur: () => void 0,
        };

        const defaultProps = {
            kind: "primary",
            icon: searchIcon,
            alt: "search",
            color: red,
            light: false,
            hovered: false,
            focused: false,
            pressed: false,
            disabled: false,
        };

        const example = (
            <table
                style={{
                    background: offWhite,
                    textAlign: "center",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th />
                        <th style={{width: 100}}>Default</th>
                        <th style={{width: 100}}>
                            Hovered/<br />Focused
                        </th>
                        <th style={{width: 100}}>
                            Active/<br />Pressed
                        </th>
                        <th style={{width: 100}}>Disabled</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Primary</th>
                        <td>
                            <IconButtonCore {...defaultProps} {...handlers}>
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Secondary</th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr style={{height: 60, verticalAlign: "middle"}}>
                        <th>Tertiary</th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="tertiary"
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                kind="secondary"
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                    <tr
                        style={{
                            background: darkBlue,
                            color: white,
                            height: 60,
                            verticalAlign: "middle",
                        }}
                    >
                        <th>
                            Primary<br />(Light)
                        </th>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                hovered={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                pressed={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                        <td>
                            <IconButtonCore
                                {...defaultProps}
                                {...handlers}
                                light={true}
                                disabled={true}
                            >
                                Label
                            </IconButtonCore>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
