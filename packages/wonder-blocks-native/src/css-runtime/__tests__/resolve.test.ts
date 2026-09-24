import {resolveStyle, resolveVars} from "../resolve";
import {convertDeclarations} from "../css-to-rn";
import type {NativeRule, NativeStyleSheet} from "../types";
import buttonSheet from "../../generated/button.native-styles";
import buttonUnstyledSheet from "../../generated/button-unstyled.native-styles";
import {themeVars} from "../../generated/theme-vars";

const rule = (partial: Partial<NativeRule>): NativeRule => ({
    target: {classes: [], states: [], notStates: []},
    ancestors: [],
    media: null,
    layerRank: 1,
    specificity: 1,
    order: 0,
    declarations: [],
    ...partial,
});

const sheet = (...rules: Array<NativeRule>): NativeStyleSheet => ({
    source: "test",
    rules,
});

describe("resolveVars", () => {
    it("should resolve nested references and fallbacks", () => {
        // Arrange
        const vars: Record<string, string> = {"--a": "var(--b)", "--b": "4px"};

        // Act
        const result = resolveVars(
            "var(--a) var(--missing, 2px)",
            (n) => vars[n],
        );

        // Assert
        expect(result).toBe("4px 2px");
    });

    it("should return null when a reference can't be resolved", () => {
        // Arrange, Act
        const result = resolveVars("var(--missing)", () => undefined);

        // Assert
        expect(result).toBeNull();
    });
});

describe("convertDeclarations", () => {
    it("should convert WB rem (10px base) to numbers", () => {
        // Arrange, Act
        const {style} = convertDeclarations([["block-size", "4rem"]]);

        // Assert
        expect(style).toEqual({height: 40});
    });

    it("should map logical inline padding to start/end", () => {
        // Arrange, Act
        const {style} = convertDeclarations([["padding-inline", "1.6rem"]]);

        // Assert
        expect(style).toEqual({paddingStart: 16, paddingEnd: 16});
    });

    it("should give flex containers an explicit row direction", () => {
        // Arrange, Act
        const {style} = convertDeclarations([["display", "inline-flex"]]);

        // Assert
        expect(style).toEqual({display: "flex", flexDirection: "row"});
    });

    it("should draw a spread-only inset box-shadow as extra border width", () => {
        // Arrange, Act
        const {style} = convertDeclarations([
            ["border-width", "1px"],
            ["box-shadow", "inset 0 0 0 2px red"],
        ]);

        // Assert
        expect(style).toMatchObject({
            borderTopWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderTopColor: "red",
        });
    });

    it("should still drop box-shadows that aren't inset rings", () => {
        // Arrange, Act
        const {dropped} = convertDeclarations([
            ["box-shadow", "0 2px 4px rgba(0, 0, 0, 0.2)"],
        ]);

        // Assert
        expect(dropped).toEqual(["box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)"]);
    });

    it("should report declarations with no native equivalent", () => {
        // Arrange, Act
        const {style, dropped} = convertDeclarations([
            ["outline", "2px solid red"],
            ["cursor", "pointer"],
        ]);

        // Assert
        expect({style, dropped}).toEqual({
            style: {},
            dropped: ["outline: 2px solid red", "cursor: pointer"],
        });
    });
});

describe("resolveStyle", () => {
    it("should let higher specificity win regardless of source order", () => {
        // Arrange
        const sheets = [
            sheet(
                rule({
                    target: {classes: ["a", "b"], states: [], notStates: []},
                    specificity: 2,
                    order: 0,
                    declarations: [["color", "red"]],
                }),
                rule({
                    target: {classes: ["a"], states: [], notStates: []},
                    specificity: 1,
                    order: 1,
                    declarations: [["color", "blue"]],
                }),
            ),
        ];

        // Act
        const {style} = resolveStyle(
            sheets,
            {classes: ["a", "b"]},
            {themeVars: {}},
        );

        // Assert
        expect(style).toEqual({color: "red"});
    });

    it("should let rules outside a nested layer beat rules inside it", () => {
        // Arrange
        const sheets = [
            sheet(
                rule({
                    target: {classes: ["a"], states: [], notStates: []},
                    layerRank: 1,
                    specificity: 1,
                    declarations: [["margin", "0"]],
                }),
                rule({
                    target: {classes: ["a"], states: [], notStates: []},
                    layerRank: 0,
                    specificity: 5,
                    order: 1,
                    declarations: [["margin", "1px"]],
                }),
            ),
        ];

        // Act
        const {style} = resolveStyle(sheets, {classes: ["a"]}, {themeVars: {}});

        // Assert
        expect(style).toMatchObject({marginTop: 0});
    });

    it("should skip (hover: hover) rules unless the env has hover", () => {
        // Arrange
        const sheets = [
            sheet(
                rule({
                    target: {classes: ["a"], states: ["hover"], notStates: []},
                    media: "hover",
                    declarations: [["color", "red"]],
                }),
            ),
        ];
        const input = {classes: ["a"], states: {hover: true}};

        // Act
        const withoutHover = resolveStyle(sheets, input, {themeVars: {}});
        const withHover = resolveStyle(sheets, input, {
            themeVars: {},
            hover: true,
        });

        // Assert
        expect([withoutHover.style, withHover.style]).toEqual([
            {},
            {color: "red"},
        ]);
    });

    it("should match descendant selectors against ancestor states", () => {
        // Arrange
        const sheets = [
            sheet(
                rule({
                    target: {classes: ["child"], states: [], notStates: []},
                    ancestors: [
                        {classes: ["parent"], states: ["press"], notStates: []},
                    ],
                    declarations: [["opacity", "0.5"]],
                }),
            ),
        ];

        // Act
        const {style} = resolveStyle(
            sheets,
            {
                classes: ["child"],
                ancestors: [{classes: ["parent"], states: {press: true}}],
            },
            {themeVars: {}},
        );

        // Assert
        expect(style).toEqual({opacity: 0.5});
    });

    it("should inherit custom properties and text properties", () => {
        // Arrange
        const sheets = [
            sheet(
                rule({
                    target: {classes: ["parent"], states: [], notStates: []},
                    declarations: [
                        ["--fg", "var(--theme-fg)"],
                        ["color", "var(--fg)"],
                    ],
                }),
                rule({
                    target: {classes: ["child"], states: [], notStates: []},
                    declarations: [["border-color", "var(--fg)"]],
                }),
            ),
        ];
        const env = {themeVars: {"--theme-fg": "#123456"}};
        const parent = resolveStyle(sheets, {classes: ["parent"]}, env);

        // Act
        const child = resolveStyle(
            sheets,
            {classes: ["child"], inherited: parent.inherited},
            env,
        );

        // Assert
        expect(child.style).toEqual({
            color: "#123456",
            borderTopColor: "#123456",
            borderRightColor: "#123456",
            borderBottomColor: "#123456",
            borderLeftColor: "#123456",
        });
    });
});

describe("compiled button.module.css", () => {
    const sheets = [buttonUnstyledSheet, buttonSheet];
    const env = {themeVars: themeVars.thunderblocks};

    it("should resolve the SYL primary progressive rest state", () => {
        // Arrange, Act
        const {style} = resolveStyle(
            sheets,
            {classes: ["reset", "button", "primary", "progressive"]},
            env,
        );

        // Assert
        expect(style).toMatchObject({
            height: 40,
            backgroundColor:
                themeVars.thunderblocks[
                    "--wb-semanticColor-action-primary-progressive-default-background"
                ],
            color: themeVars.thunderblocks[
                "--wb-semanticColor-action-primary-progressive-default-foreground"
            ],
        });
    });

    it("should resolve the pressed state from :active", () => {
        // Arrange, Act
        const {style} = resolveStyle(
            sheets,
            {
                classes: ["reset", "button", "primary", "progressive"],
                states: {press: true},
            },
            env,
        );

        // Assert
        expect(style.backgroundColor).toBe(
            themeVars.thunderblocks[
                "--wb-semanticColor-action-primary-progressive-press-background"
            ],
        );
    });

    it("should give pressed SYL tertiary buttons the 2px press ring", () => {
        // Arrange, Act
        const {style} = resolveStyle(
            sheets,
            {
                classes: ["reset", "button", "tertiary", "progressive"],
                states: {press: true},
            },
            env,
        );

        // Assert
        expect(style).toMatchObject({
            borderTopWidth: 2,
            borderTopColor:
                themeVars.thunderblocks[
                    "--wb-semanticColor-action-tertiary-progressive-press-border"
                ],
        });
    });

    it("should let disabled win over pressed", () => {
        // Arrange, Act
        const {style} = resolveStyle(
            sheets,
            {
                classes: ["reset", "button", "secondary", "destructive"],
                states: {press: true, disabled: true},
            },
            env,
        );

        // Assert
        expect(style.backgroundColor).toBe(
            themeVars.thunderblocks[
                "--wb-semanticColor-action-secondary-disabled-background"
            ],
        );
    });

    it("should use the SYL small height for small buttons", () => {
        // Arrange, Act
        const {style} = resolveStyle(
            sheets,
            {classes: ["reset", "button", "tertiary", "neutral", "small"]},
            env,
        );

        // Assert
        // thunderblocks overrides small to `sizing.size_260` (default: 32).
        expect(style.height).toBe(26);
    });

    it("should resolve different colours for SYL dark", () => {
        // Arrange
        const input = {
            classes: ["reset", "button", "secondary", "progressive"],
        };

        // Act
        const light = resolveStyle(sheets, input, env);
        const dark = resolveStyle(sheets, input, {
            themeVars: themeVars["syl-dark"],
        });

        // Assert
        expect(light.style.backgroundColor).not.toBe(
            dark.style.backgroundColor,
        );
    });
});
