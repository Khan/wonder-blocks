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
        const {Strut} = require("@khanacademy/wonder-blocks-layout");

        const buttonStyle = {width: 160};

        const smallButton = (
            <Button size="small" style={buttonStyle}>
                Small button
            </Button>
        );

        const strut = <Strut size={16} />;

        const secondaryButton = (
            <Button size="small" kind="secondary" style={buttonStyle}>
                Secondary button
            </Button>
        );

        const rightContent = (
            <React.Fragment>
                {smallButton}
                {strut}
                {secondaryButton}
            </React.Fragment>
        );

        const example = <Toolbar size="small" rightContent={rightContent} />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {icons} = require("@khanacademy/wonder-blocks-icon");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const IconButton = require("@khanacademy/wonder-blocks-icon-button")
            .default;
        const {Strut} = require("@khanacademy/wonder-blocks-layout");

        const zoomOutButton = (
            <IconButton
                icon={icons.zoomOut}
                kind="primary"
                style={{marginLeft: -1}}
            />
        );
        const zoomInButton = <IconButton icon={icons.zoomIn} kind="primary" />;

        const strut = <Strut size={16} />;

        const linkButton = <Button kind="tertiary">Import...</Button>;

        const leftContent = (
            <React.Fragment>
                {zoomOutButton}
                {strut}
                {zoomInButton}
            </React.Fragment>
        );

        const example = (
            <Toolbar
                size="small"
                leftContent={leftContent}
                rightContent={linkButton}
            />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {icons} = require("@khanacademy/wonder-blocks-icon");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const IconButton = require("@khanacademy/wonder-blocks-icon-button")
            .default;

        const hintButton = (
            <IconButton
                icon={icons.hint}
                kind="primary"
                style={{marginLeft: -4}}
            />
        );

        const mainButton = <Button kind="primary">Submit</Button>;

        const example = (
            <Toolbar leftContent={hintButton} rightContent={mainButton} />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {icons} = require("@khanacademy/wonder-blocks-icon");
        const IconButton = require("@khanacademy/wonder-blocks-icon-button")
            .default;

        const closeButton = (
            <IconButton
                icon={icons.dismiss}
                kind="tertiary"
                style={{marginLeft: -6}}
            />
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
    it("example 5", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {icons} = require("@khanacademy/wonder-blocks-icon");
        const IconButton = require("@khanacademy/wonder-blocks-icon-button")
            .default;

        const closeButton = (
            <IconButton
                icon={icons.dismiss}
                kind="tertiary"
                style={{marginLeft: -6}}
            />
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
    it("example 6", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");
        const {Strut} = require("@khanacademy/wonder-blocks-layout");

        const buttonStyle = {width: 140};

        const nextExercise = <Button style={buttonStyle}>Next exercise</Button>;
        const questionCount = <LabelLarge>7 questions</LabelLarge>;
        const tryAgain = (
            <Button style={buttonStyle} kind="secondary">
                Try again
            </Button>
        );
        const strut = <Strut size={16} />;

        const rightContent = (
            <React.Fragment>
                {questionCount}
                {strut}
                {tryAgain}
                {strut}
                {nextExercise}
            </React.Fragment>
        );

        const example = <Toolbar rightContent={rightContent} />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 7", () => {
        const {
            default: Icon,
            icons,
        } = require("@khanacademy/wonder-blocks-icon");
        const IconButton = require("@khanacademy/wonder-blocks-icon-button")
            .default;
        const Link = require("@khanacademy/wonder-blocks-link").default;
        const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");

        const closeButton = (
            <IconButton
                icon={icons.dismiss}
                kind="tertiary"
                style={{marginLeft: -6}}
            />
        );

        const goToExercise = (
            <Link href="#">
                <LabelLarge>Go to exercise</LabelLarge>
            </Link>
        );

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
    it("example 8", () => {
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
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
