// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests
// edit packages/wonder-blocks-typography/docs.md and run `npm run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";
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
        const {View} = require("wonder-blocks-core");
        
        // NOTE(mdr): I added an `id` attribute to each of these tags, to ensure that
        //     they all pass the `id` attribute correctly. This fact will be saved in
        //     snapshot tests.
        const example = <View>
            <Title id="example-Title">Title</Title>
            <HeadingLarge id="example-HeadingLarge">HeadingLarge</HeadingLarge>
            <HeadingMedium id="example-HeadingMedium">HeadingMedium</HeadingMedium>
            <HeadingSmall id="example-HeadingSmall">HeadingSmall</HeadingSmall>
            <HeadingXSmall id="example-HeadingXSmall">HeadingXSmall</HeadingXSmall>
            <BodySerifBlock id="example-BodySerifBlock">BodySerifBlock</BodySerifBlock>
            <BodySerif id="example-BodySerif">BodySerif</BodySerif>
            <BodyMonospace id="example-BodyMonospace">BodyMonospace</BodyMonospace>
            <Body id="example-Body">Body</Body>
            <LabelLarge id="example-LabelLarge">LabelLarge</LabelLarge>
            <LabelMedium id="example-LabelMedium">LabelMedium</LabelMedium>
            <LabelSmall id="example-LabelSmall">LabelSmall</LabelSmall>
            <LabelXSmall id="example-LabelXSmall">LabelXSmall</LabelXSmall>
            <Tagline id="example-Tagline">Tagline</Tagline>
            <Caption id="example-Caption">Caption</Caption>
            <Footnote id="example-Footnote">Footnote</Footnote>
        </View>
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const Color = require("wonder-blocks-color").default;
        const {StyleSheet} = require("aphrodite");
        
        const styles = StyleSheet.create({
            blueText: {
                color: Color.blue,
            },
        });
        
        const example = <Title style={styles.blueText}>Blue Title</Title>
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
