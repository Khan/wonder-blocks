// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-toolbar
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import Toolbar from "./components/toolbar.js";

describe("wonder-blocks-toolbar", () => {
    it("example 1", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const smallButton = <Button size="small">Small button</Button>;

        const example = (
            <Toolbar size="small" rightContent={[smallButton, smallButton]} />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        // TODO(scottgrant): Use wonder-blocks-icon and wonder-blocks-icon-button
        const dismissIcon =
            "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
        const closeButton = (
            <svg role="img" width="24px" height="24px">
                <path d={dismissIcon} />
            </svg>
        );

        const example = (
            <Toolbar
                leftContent={closeButton}
                title="Counting with small numbers"
            />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;

        const dismissIcon =
            "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
        const closeButton = (
            <svg role="img" width="24px" height="24px">
                <path d={dismissIcon} />
            </svg>
        );

        const startExercise = <Button>Next Video</Button>;

        const example = (
            <Toolbar
                leftContent={closeButton}
                rightContent={startExercise}
                title="Counting with small numbers"
            />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {LabelMedium} = require("@khanacademy/wonder-blocks-typography");

        const nextExercise = <Button>Next exercise</Button>;
        const questionCount = <LabelMedium>7 questions</LabelMedium>;
        const tryAgain = <Button kind="secondary">Try again</Button>;

        const example = (
            <Toolbar rightContent={[questionCount, tryAgain, nextExercise]} />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const Link = require("@khanacademy/wonder-blocks-link").default;

        const dismissIcon =
            "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
        const closeButton = (
            <svg role="img" width="24px" height="24px">
                <path d={dismissIcon} />
            </svg>
        );

        const goToExercise = <Link>Go to exercise</Link>;

        const example = (
            <Toolbar
                leftContent={closeButton}
                rightContent={goToExercise}
                subtitle="1 of 14 questions answered"
                title="Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious"
            />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const style = {
            backgroundColor: "#0a2a66",
            boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
            color: "white",
            height: 200,
        };

        const example = (
            <View style={style}>
                <Toolbar color="dark" title="Title" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
