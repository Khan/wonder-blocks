// @flow
// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-tooltip
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import Tooltip from "./components/tooltip.js";
import TooltipContent from "./components/tooltip-content.js";
import TooltipArrow from "./components/tooltip-arrow.js";
import TooltipBubble from "./components/tooltip-bubble.js";

describe("wonder-blocks-tooltip", () => {
    it("example 1", () => {
        const React = require("react");

        const example = (
            <Tooltip content={"I'm on the right!"} placement="right">
                Some text
            </Tooltip>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");

        const example = (
            <Tooltip forceAnchorFocusivity={false} content={"I'm at the top!"}>
                <View>
                    Some text
                    <input />
                </View>
            </Tooltip>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {StyleSheet} = require("aphrodite");
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");

        const styles = StyleSheet.create({
            scrollbox: {
                height: 100,
                overflow: "auto",
                border: "1px solid black",
                margin: 10,
            },
            hostbox: {
                minHeight: "200vh",
            },
        });

        const example = (
            <View>
                <View style={styles.scrollbox}>
                    <View style={styles.hostbox}>
                        <Body>
                            This is a big long piece of text with a
                            <Tooltip
                                content={"I'm on the bottom!"}
                                placement={"bottom"}
                            >
                                [tooltip]
                            </Tooltip>
                            <span> </span>in the middle.
                        </Body>
                    </View>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {StyleSheet} = require("aphrodite");
        const React = require("react");
        const {View, Text} = require("@khanacademy/wonder-blocks-core");
        const {
            StandardModal,
            ModalLauncher,
        } = require("@khanacademy/wonder-blocks-modal");

        const styles = StyleSheet.create({
            scrollbox: {
                height: 100,
                overflow: "auto",
                border: "1px solid black",
                margin: 10,
            },
            hostbox: {
                minHeight: "200vh",
            },
            modalbox: {
                height: "200vh",
            },
        });

        const scrollyContent = (
            <View style={styles.scrollbox}>
                <View style={styles.hostbox}>
                    <Tooltip content={"I'm on the left!"} placement="left">
                        tooltip
                    </Tooltip>
                </View>
            </View>
        );

        const modalContent = (
            <View style={styles.modalbox}>{scrollyContent}</View>
        );

        const modal = (
            <StandardModal
                title="My modal"
                footer="Still my modal"
                content={modalContent}
            />
        );

        const example = (
            <ModalLauncher modal={modal}>
                {({openModal}) => (
                    <button onClick={openModal}>Click here!</button>
                )}
            </ModalLauncher>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const example = <TooltipContent>Just the content</TooltipContent>;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const example = (
            <TooltipContent title="Title text!">
                Some content in my content
            </TooltipContent>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 7", () => {
        const {
            Body,
            LabelSmall,
        } = require("@khanacademy/wonder-blocks-typography");

        const example = (
            <TooltipContent title={<Body>Body text title!</Body>}>
                <Body>Body text content!</Body>
                <LabelSmall>And LabelSmall!</LabelSmall>
            </TooltipContent>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 8", () => {
        const example = (
            <div style={{display: "flex", flexDirection: "column"}}>
                <TooltipArrow placement="top" />
                <div style={{backgroundColor: "red", width: 24, height: 4}} />
            </div>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 9", () => {
        const example = (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                }}
            >
                <TooltipArrow placement="right" />
                <div style={{backgroundColor: "red", width: 4, height: 24}} />
            </div>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 10", () => {
        const example = (
            <div style={{display: "flex", flexDirection: "column-reverse"}}>
                <TooltipArrow placement="bottom" />
                <div style={{backgroundColor: "red", width: 24, height: 4}} />
            </div>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 11", () => {
        const example = (
            <div style={{display: "flex", flexDirection: "row"}}>
                <TooltipArrow placement="left" />
                <div style={{backgroundColor: "red", width: 4, height: 24}} />
            </div>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 12", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const popperProps = {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            placement: "top",
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 0,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: false,
        };

        const example = (
            <View style={{height: 50, flexDirection: "column"}}>
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>I'm on the top!</TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 13", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const popperProps = {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            placement: "right",
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 0,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: false,
        };

        const example = (
            <View
                style={{
                    height: 50,
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                }}
            >
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>I'm on the right!</TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 14", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const popperProps = {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            placement: "bottom",
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 0,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: false,
        };

        const example = (
            <View
                style={{
                    height: 50,
                    display: "flex",
                    flexDirection: "column-reverse",
                }}
            >
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>I'm on the bottom!</TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 15", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const popperProps = {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            placement: "left",
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 0,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: false,
        };

        const example = (
            <View style={{height: 50, display: "flex", flexDirection: "row"}}>
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>I'm on the left!</TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 16", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Spacing = require("@khanacademy/wonder-blocks-spacing");

        const popperProps = {
            placement: "top",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 50,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: false,
        };

        const example = (
            <View style={{height: 50, display: "flex", flexDirection: "row"}}>
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>
                        I'm on the bottom with an arrow 50px in!
                    </TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 17", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Spacing = require("@khanacademy/wonder-blocks-spacing");

        const popperProps = {
            placement: "top",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            },
            ref: () => {},
            scheduleUpdate: () => {},
            arrowProps: {
                style: {
                    left: 0,
                    top: 0,
                },
                ref: () => {},
            },
            outOfBoundaries: true,
        };

        const example = (
            <View style={{height: 50}}>
                <TooltipBubble popperProps={popperProps}>
                    <TooltipContent>
                        I'm hidden. So hidden. Shhhhh!
                    </TooltipContent>
                </TooltipBubble>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
