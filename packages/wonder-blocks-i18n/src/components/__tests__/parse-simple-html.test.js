// @flow
import {parseSimpleHTML} from "../parse-simple-html.js";

describe("parseSimpleHTML", () => {
    it("Parses a self-closing tag", () => {
        expect(parseSimpleHTML("Test: <myImg />")).toEqual([
            {
                type: "text",
                text: "Test: ",
            },
            {
                type: "tag",
                tag: "myImg",
                children: null,
            },
        ]);
        expect(parseSimpleHTML("Test: <myImg />.")).toEqual([
            {
                type: "text",
                text: "Test: ",
            },
            {
                type: "tag",
                tag: "myImg",
                children: null,
            },
            {
                type: "text",
                text: ".",
            },
        ]);
    });

    it("Trims", () => {
        expect(parseSimpleHTML(" Test: <myImg /> ")).toEqual([
            {
                type: "text",
                text: "Test: ",
            },
            {
                type: "tag",
                tag: "myImg",
                children: null,
            },
        ]);
    });

    it("Parses simple inline markup", () => {
        expect(parseSimpleHTML("Hello, <b>world</b>")).toEqual([
            {
                type: "text",
                text: "Hello, ",
            },
            {
                type: "tag",
                tag: "b",
                children: "world",
            },
        ]);

        expect(parseSimpleHTML("<blink>help</blink>, <b>me</b>>")).toEqual([
            {
                type: "tag",
                tag: "blink",
                children: "help",
            },
            {
                type: "text",
                text: ", ",
            },
            {
                type: "tag",
                tag: "b",
                children: "me",
            },
            {
                type: "text",
                text: ">",
            },
        ]);
    });

    it("Parses unicode and numbers", () => {
        expect(parseSimpleHTML("Olá, <b123á>mundo</b123á>")).toEqual([
            {
                type: "text",
                text: "Olá, ",
            },
            {
                type: "tag",
                tag: "b123á",
                children: "mundo",
            },
        ]);
    });

    it("Does not accept attributes", () => {
        const action1 = () => parseSimpleHTML("Text: <hello name='world' />");

        expect(action1).toThrowErrorMatchingInlineSnapshot(
            `"I18nInlineMarkup: expected a tag without attributes, but received: <hello name='world'/>"`,
        );

        const action2 = () =>
            parseSimpleHTML("Text: <hello name='world'>x</hello>");
        expect(action2).toThrowErrorMatchingInlineSnapshot(
            `"I18nInlineMarkup: expected a tag without attributes, but received: <hello name='world'>"`,
        );
    });

    it("Does not accept nesting", () => {
        const action = () =>
            parseSimpleHTML("Text: <hello> <world /> </hello>");

        expect(action).toThrowErrorMatchingInlineSnapshot(
            `"I18nInlineMarkup: nested tags are not supported, but <world /> is nested underneath <hello>."`,
        );
    });

    it("Does not accept unnecessary use", () => {
        const action1 = () => parseSimpleHTML("Test");
        expect(action1).toThrowErrorMatchingInlineSnapshot(
            `"Unnecessary use of I18nInlineMarkup."`,
        );

        const action2 = () => parseSimpleHTML(" Test ");
        expect(action2).toThrowErrorMatchingInlineSnapshot(
            `"Unnecessary use of I18nInlineMarkup."`,
        );

        const action3 = () => parseSimpleHTML("<hello></hello>");
        expect(action3).toThrowErrorMatchingInlineSnapshot(
            `"Unnecessary use of I18nInlineMarkup."`,
        );
    });

    it("Parses tag enclosing all text", () => {
        expect(parseSimpleHTML("<hello>Test</hello>")).toEqual([
            {
                type: "tag",
                tag: "hello",
                children: "Test",
            },
        ]);
    });

    it("should throw an error if it encounters and unexpected closing tag", () => {
        const action = () => parseSimpleHTML("<foo>Test</bar>");

        expect(action).toThrowErrorMatchingInlineSnapshot(
            `"I18nInlineMarkup: expected closing tag </foo>, but got </bar>"`,
        );
    });
});
