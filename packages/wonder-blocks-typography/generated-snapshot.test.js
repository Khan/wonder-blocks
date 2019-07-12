// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-typography
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import BodyMonospace from "./components/body-monospace.js";
import BodySerifBlock from "./components/body-serif-block.js";
import BodySerif from "./components/body-serif.js";
import Body from "./components/body.js";
import Caption from "./components/caption.js";
import Footnote from "./components/footnote.js";
import HeadingLarge from "./components/heading-large.js";
import HeadingMedium from "./components/heading-medium.js";
import HeadingSmall from "./components/heading-small.js";
import HeadingXSmall from "./components/heading-xsmall.js";
import LabelLarge from "./components/label-large.js";
import LabelMedium from "./components/label-medium.js";
import LabelSmall from "./components/label-small.js";
import LabelXSmall from "./components/label-xsmall.js";
import Tagline from "./components/tagline.js";
import Title from "./components/title.js";

describe("wonder-blocks-typography", () => {
    it("example 1", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {
            Title,
            HeadingLarge,
            HeadingMedium,
            HeadingSmall,
            HeadingXSmall,
            BodySerifBlock,
            BodySerif,
            BodyMonospace,
            Body,
            LabelLarge,
            LabelMedium,
            LabelSmall,
            LabelXSmall,
            Tagline,
            Caption,
            Footnote,
        } = require("@khanacademy/wonder-blocks-typography");

        // NOTE(mdr): I added an `id` attribute to each of these tags, to ensure that
        //     they all pass the `id` attribute correctly. This fact will be saved in
        //     snapshot tests.
        const example = (
            <View>
                <Title id="example-Title">Title</Title>
                <HeadingLarge id="example-HeadingLarge">
                    HeadingLarge
                </HeadingLarge>
                <HeadingMedium id="example-HeadingMedium">
                    HeadingMedium
                </HeadingMedium>
                <HeadingSmall id="example-HeadingSmall">
                    HeadingSmall
                </HeadingSmall>
                <HeadingXSmall id="example-HeadingXSmall">
                    HeadingXSmall
                </HeadingXSmall>
                <BodySerifBlock id="example-BodySerifBlock">
                    BodySerifBlock
                </BodySerifBlock>
                <BodySerif id="example-BodySerif">BodySerif</BodySerif>
                <BodyMonospace id="example-BodyMonospace">
                    BodyMonospace
                </BodyMonospace>
                <Body id="example-Body">Body</Body>
                <LabelLarge id="example-LabelLarge">LabelLarge</LabelLarge>
                <LabelMedium id="example-LabelMedium">LabelMedium</LabelMedium>
                <LabelSmall id="example-LabelSmall">LabelSmall</LabelSmall>
                <LabelXSmall id="example-LabelXSmall">LabelXSmall</LabelXSmall>
                <Tagline id="example-Tagline">Tagline</Tagline>
                <Caption id="example-Caption">Caption</Caption>
                <Footnote id="example-Footnote">Footnote</Footnote>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {StyleSheet} = require("aphrodite");

        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {Title} = require("@khanacademy/wonder-blocks-typography");

        const styles = StyleSheet.create({
            blueText: {
                color: Color.blue,
            },
        });

        const example = <Title style={styles.blueText}>Blue Title</Title>;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {Title} = require("@khanacademy/wonder-blocks-typography");

        const example = <Title aria-label="Accessible Title">Title</Title>;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const example = (
            <View>
                <Title>Привет</Title>
                <HeadingLarge>Привет</HeadingLarge>
                <HeadingMedium>Привет</HeadingMedium>
                <HeadingSmall>Привет</HeadingSmall>
                <HeadingXSmall>Привет</HeadingXSmall>
                <BodySerifBlock>Привет</BodySerifBlock>
                <BodySerif>Привет</BodySerif>
                <BodyMonospace>Привет</BodyMonospace>
                <Body>Привет</Body>
                <LabelLarge>Привет</LabelLarge>
                <LabelMedium>Привет</LabelMedium>
                <LabelSmall>Привет</LabelSmall>
                <LabelXSmall>Привет</LabelXSmall>
                <Tagline>Привет</Tagline>
                <Caption>Привет</Caption>
                <Footnote>Привет</Footnote>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");

        const example = (
            <View>
                <Title dir="rtl">مرحبا</Title>
                <HeadingLarge dir="rtl">مرحبا</HeadingLarge>
                <HeadingMedium dir="rtl">مرحبا</HeadingMedium>
                <HeadingSmall dir="rtl">مرحبا</HeadingSmall>
                <HeadingXSmall dir="rtl">مرحبا</HeadingXSmall>
                <BodySerifBlock dir="rtl">مرحبا</BodySerifBlock>
                <BodySerif dir="rtl">مرحبا</BodySerif>
                <BodyMonospace dir="rtl">مرحبا</BodyMonospace>
                <Body dir="rtl">مرحبا</Body>
                <LabelLarge dir="rtl">مرحبا</LabelLarge>
                <LabelMedium dir="rtl">مرحبا</LabelMedium>
                <LabelSmall dir="rtl">مرحبا</LabelSmall>
                <LabelXSmall dir="rtl">مرحبا</LabelXSmall>
                <Tagline dir="rtl">مرحبا</Tagline>
                <Caption dir="rtl">مرحبا</Caption>
                <Footnote dir="rtl">مرحبا</Footnote>

                <Title>γεια σας</Title>
                <HeadingLarge>γεια σας</HeadingLarge>
                <HeadingMedium>γεια σας</HeadingMedium>
                <HeadingSmall>γεια σας</HeadingSmall>
                <HeadingXSmall>γεια σας</HeadingXSmall>
                <BodySerifBlock>γεια σας</BodySerifBlock>
                <BodySerif>γεια σας</BodySerif>
                <BodyMonospace>γεια σας</BodyMonospace>
                <Body>γεια σας</Body>
                <LabelLarge>γεια σας</LabelLarge>
                <LabelMedium>γεια σας</LabelMedium>
                <LabelSmall>γεια σας</LabelSmall>
                <LabelXSmall>γεια σας</LabelXSmall>
                <Tagline>γεια σας</Tagline>
                <Caption>γεια σας</Caption>
                <Footnote>γεια σας</Footnote>

                <Title dir="rtl">שלום</Title>
                <HeadingLarge dir="rtl">שלום</HeadingLarge>
                <HeadingMedium dir="rtl">שלום</HeadingMedium>
                <HeadingSmall dir="rtl">שלום</HeadingSmall>
                <HeadingXSmall dir="rtl">שלום</HeadingXSmall>
                <BodySerifBlock dir="rtl">שלום</BodySerifBlock>
                <BodySerif dir="rtl">שלום</BodySerif>
                <BodyMonospace dir="rtl">שלום</BodyMonospace>
                <Body dir="rtl">שלום</Body>
                <LabelLarge dir="rtl">שלום</LabelLarge>
                <LabelMedium dir="rtl">שלום</LabelMedium>
                <LabelSmall dir="rtl">שלום</LabelSmall>
                <LabelXSmall dir="rtl">שלום</LabelXSmall>
                <Tagline dir="rtl">שלום</Tagline>
                <Caption dir="rtl">שלום</Caption>
                <Footnote dir="rtl">שלום</Footnote>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const Code = ({children}) => (
            <BodyMonospace style={{whiteSpace: "pre"}}>
                {children}
            </BodyMonospace>
        );

        const code = `const things = {
            areTested\: "This is my new Code element with my code.",
        };`;

        const example = <Code>{code}</Code>;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
