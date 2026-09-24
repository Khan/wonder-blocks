/**
 * GENERATED FILE — DO NOT EDIT.
 * Run `pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles`.
 */
/* eslint-disable max-lines */
import type {NativeStyleSheet} from "../css-runtime/types";

const sheet: NativeStyleSheet = {
    source: "wonder-blocks-button/src/components/button.module.css",
    rules: [
        {
            target: {
                classes: ["button"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 0,
            declarations: [
                ["block-size", "var(--wb-c-button-root-sizing-height-medium)"],
                ["padding-block", "0"],
                ["padding-inline", "var(--wb-c-button--padding-inline)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-default)",
                ],
                ["border-style", "solid"],
                ["border-width", "var(--wb-c-button--border-width-default)"],
                ["border-color", "var(--wb-c-button--border-default)"],
                ["background", "var(--wb-c-button--bg-default)"],
                ["color", "var(--wb-c-button--fg-default)"],
                ["transition", "border-radius 0.1s ease-in-out"],
            ],
        },
        {
            target: {
                classes: ["primary"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 1,
            declarations: [
                [
                    "--wb-c-button--border-width-default",
                    "var(\n        --wb-c-button-root-border-width-primary-default\n    )",
                ],
                [
                    "--wb-c-button--border-width-hover",
                    "var(\n        --wb-c-button-root-border-width-primary-hover\n    )",
                ],
                [
                    "--wb-c-button--border-width-press",
                    "var(\n        --wb-c-button-root-border-width-primary-press\n    )",
                ],
                [
                    "--wb-c-button--outline-offset",
                    "var(--wb-c-button-root-border-offset-primary)",
                ],
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-primary-medium\n    )",
                ],
                [
                    "--wb-c-button--bg-disabled",
                    "var(--wb-semanticColor-action-primary-disabled-background)",
                ],
                [
                    "--wb-c-button--fg-disabled",
                    "var(--wb-semanticColor-action-primary-disabled-foreground)",
                ],
                [
                    "--wb-c-button--border-disabled",
                    "var(--wb-semanticColor-action-primary-disabled-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 2,
            declarations: [
                [
                    "--wb-c-button--border-width-default",
                    "var(\n        --wb-c-button-root-border-width-secondary-default\n    )",
                ],
                [
                    "--wb-c-button--border-width-hover",
                    "var(\n        --wb-c-button-root-border-width-secondary-hover\n    )",
                ],
                [
                    "--wb-c-button--border-width-press",
                    "var(\n        --wb-c-button-root-border-width-secondary-press\n    )",
                ],
                [
                    "--wb-c-button--outline-offset",
                    "var(\n        --wb-c-button-root-border-offset-secondary\n    )",
                ],
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-secondary-medium\n    )",
                ],
                [
                    "--wb-c-button--bg-disabled",
                    "var(--wb-semanticColor-action-secondary-disabled-background)",
                ],
                [
                    "--wb-c-button--fg-disabled",
                    "var(--wb-semanticColor-action-secondary-disabled-foreground)",
                ],
                [
                    "--wb-c-button--border-disabled",
                    "var(--wb-semanticColor-action-secondary-disabled-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 3,
            declarations: [
                [
                    "--wb-c-button--border-width-default",
                    "var(\n        --wb-c-button-root-border-width-tertiary-default\n    )",
                ],
                [
                    "--wb-c-button--border-width-hover",
                    "var(\n        --wb-c-button-root-border-width-tertiary-hover\n    )",
                ],
                [
                    "--wb-c-button--border-width-press",
                    "var(\n        --wb-c-button-root-border-width-tertiary-press\n    )",
                ],
                [
                    "--wb-c-button--outline-offset",
                    "var(\n        --wb-c-button-root-border-offset-tertiary\n    )",
                ],
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-tertiary-medium\n    )",
                ],
                [
                    "--wb-c-button--bg-disabled",
                    "var(--wb-semanticColor-action-tertiary-disabled-background)",
                ],
                [
                    "--wb-c-button--fg-disabled",
                    "var(--wb-semanticColor-action-tertiary-disabled-foreground)",
                ],
                [
                    "--wb-c-button--border-disabled",
                    "var(--wb-semanticColor-action-tertiary-disabled-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["small"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 4,
            declarations: [
                ["block-size", "var(--wb-c-button-root-sizing-height-small)"],
            ],
        },
        {
            target: {
                classes: ["large"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 5,
            declarations: [
                ["block-size", "var(--wb-c-button-root-sizing-height-large)"],
            ],
        },
        {
            target: {
                classes: ["primary", "small"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 6,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-primary-small\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["primary", "large"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 7,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-primary-large\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary", "small"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 8,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-secondary-small\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary", "large"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 9,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-secondary-large\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary", "small"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 10,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-tertiary-small\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary", "large"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 11,
            declarations: [
                [
                    "--wb-c-button--padding-inline",
                    "var(\n        --wb-c-button-root-layout-padding-inline-tertiary-large\n    )",
                ],
            ],
        },
        {
            target: {
                classes: ["primary", "progressive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 12,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-primary-progressive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-primary-progressive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-primary-progressive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-primary-progressive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-primary-progressive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-primary-progressive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-primary-progressive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-primary-progressive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-primary-progressive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["primary", "destructive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 13,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-primary-destructive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-primary-destructive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-primary-destructive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-primary-destructive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-primary-destructive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-primary-destructive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-primary-destructive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-primary-destructive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-primary-destructive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["primary", "neutral"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 14,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-primary-neutral-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-primary-neutral-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-primary-neutral-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-primary-neutral-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-primary-neutral-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-primary-neutral-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-primary-neutral-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-primary-neutral-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-primary-neutral-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary", "progressive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 15,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-secondary-progressive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-secondary-progressive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-secondary-progressive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-secondary-progressive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-secondary-progressive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-secondary-progressive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-secondary-progressive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-secondary-progressive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-secondary-progressive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary", "destructive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 16,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-secondary-destructive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-secondary-destructive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-secondary-destructive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-secondary-destructive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-secondary-destructive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-secondary-destructive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-secondary-destructive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-secondary-destructive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-secondary-destructive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["secondary", "neutral"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 17,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-secondary-neutral-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-secondary-neutral-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-secondary-neutral-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-secondary-neutral-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-secondary-neutral-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-secondary-neutral-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-secondary-neutral-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-secondary-neutral-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-secondary-neutral-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary", "progressive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 18,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-tertiary-progressive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-tertiary-progressive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-tertiary-progressive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-tertiary-progressive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-tertiary-progressive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-tertiary-progressive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-tertiary-progressive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-tertiary-progressive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-tertiary-progressive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary", "destructive"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 19,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-tertiary-destructive-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-tertiary-destructive-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-tertiary-destructive-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-tertiary-destructive-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-tertiary-destructive-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-tertiary-destructive-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-tertiary-destructive-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-tertiary-destructive-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-tertiary-destructive-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiary", "neutral"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 20,
            declarations: [
                [
                    "--wb-c-button--bg-default",
                    "var(--wb-semanticColor-action-tertiary-neutral-default-background)",
                ],
                [
                    "--wb-c-button--fg-default",
                    "var(--wb-semanticColor-action-tertiary-neutral-default-foreground)",
                ],
                [
                    "--wb-c-button--border-default",
                    "var(--wb-semanticColor-action-tertiary-neutral-default-border)",
                ],
                [
                    "--wb-c-button--bg-hover",
                    "var(--wb-semanticColor-action-tertiary-neutral-hover-background)",
                ],
                [
                    "--wb-c-button--fg-hover",
                    "var(--wb-semanticColor-action-tertiary-neutral-hover-foreground)",
                ],
                [
                    "--wb-c-button--border-hover",
                    "var(--wb-semanticColor-action-tertiary-neutral-hover-border)",
                ],
                [
                    "--wb-c-button--bg-press",
                    "var(--wb-semanticColor-action-tertiary-neutral-press-background)",
                ],
                [
                    "--wb-c-button--fg-press",
                    "var(--wb-semanticColor-action-tertiary-neutral-press-foreground)",
                ],
                [
                    "--wb-c-button--border-press",
                    "var(--wb-semanticColor-action-tertiary-neutral-press-border)",
                ],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: "hover",
            layerRank: 1,
            order: 21,
            declarations: [
                ["background", "var(--wb-c-button--bg-hover)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-hover)",
                ],
                ["color", "var(--wb-c-button--fg-hover)"],
            ],
        },
        {
            target: {
                classes: ["button", "primary"],
                states: ["hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: "hover",
            layerRank: 1,
            order: 22,
            declarations: [
                [
                    "outline",
                    "var(--wb-c-button--border-width-hover) solid\n            var(--wb-c-button--border-hover)",
                ],
                ["outline-offset", "var(--wb-c-button--outline-offset)"],
            ],
        },
        {
            target: {
                classes: ["button", "secondary"],
                states: ["hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: "hover",
            layerRank: 1,
            order: 23,
            declarations: [
                ["border-color", "var(--wb-c-button--border-hover)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-hover)\n            var(--wb-c-button--border-hover)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary"],
                states: ["hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: "hover",
            layerRank: 1,
            order: 23,
            declarations: [
                ["border-color", "var(--wb-c-button--border-hover)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-hover)\n            var(--wb-c-button--border-hover)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary"],
                states: ["hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: "hover",
            layerRank: 1,
            order: 24,
            declarations: [
                [
                    "text-underline-offset",
                    "var(--wb-c-button-root-font-offset-default)",
                ],
                [
                    "text-decoration",
                    "var(--wb-c-button-root-font-decoration-hover)\n            var(--wb-c-button-root-sizing-underline-hover)",
                ],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 25,
            declarations: [
                ["background", "var(--wb-c-button--bg-press)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-press)",
                ],
                ["color", "var(--wb-c-button--fg-press)"],
            ],
        },
        {
            target: {
                classes: ["button", "pressed"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 26,
            declarations: [
                ["background", "var(--wb-c-button--bg-press)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-press)",
                ],
                ["color", "var(--wb-c-button--fg-press)"],
            ],
        },
        {
            target: {
                classes: ["button", "primary"],
                states: ["press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 27,
            declarations: [
                [
                    "outline",
                    "var(--wb-c-button--border-width-press) solid\n        var(--wb-c-button--border-press)",
                ],
                ["outline-offset", "var(--wb-c-button--outline-offset)"],
            ],
        },
        {
            target: {
                classes: ["button", "primary", "pressed"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 28,
            declarations: [
                [
                    "outline",
                    "var(--wb-c-button--border-width-press) solid\n        var(--wb-c-button--border-press)",
                ],
                ["outline-offset", "var(--wb-c-button--outline-offset)"],
            ],
        },
        {
            target: {
                classes: ["button", "secondary"],
                states: ["press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 29,
            declarations: [
                ["border-color", "var(--wb-c-button--border-press)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-press)\n        var(--wb-c-button--border-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary"],
                states: ["press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 29,
            declarations: [
                ["border-color", "var(--wb-c-button--border-press)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-press)\n        var(--wb-c-button--border-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "secondary", "pressed"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 30,
            declarations: [
                ["border-color", "var(--wb-c-button--border-press)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-press)\n        var(--wb-c-button--border-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary", "pressed"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 30,
            declarations: [
                ["border-color", "var(--wb-c-button--border-press)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-press)\n        var(--wb-c-button--border-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary"],
                states: ["press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 31,
            declarations: [
                [
                    "text-underline-offset",
                    "var(--wb-c-button-root-font-offset-default)",
                ],
                [
                    "text-decoration",
                    "var(--wb-c-button-root-font-decoration-press)\n        var(--wb-c-button-root-sizing-underline-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "tertiary", "pressed"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 32,
            declarations: [
                [
                    "text-underline-offset",
                    "var(--wb-c-button-root-font-offset-default)",
                ],
                [
                    "text-decoration",
                    "var(--wb-c-button-root-font-decoration-press)\n        var(--wb-c-button-root-sizing-underline-press)",
                ],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["focus"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 33,
            declarations: [
                [
                    "box-shadow",
                    "0 0 0 var(--wb-border-width-medium)\n        var(--wb-semanticColor-focus-inner)",
                ],
                [
                    "outline",
                    "var(--wb-border-width-medium) solid\n        var(--wb-semanticColor-focus-outer)",
                ],
                ["outline-offset", "var(--wb-border-width-medium)"],
            ],
        },
        {
            target: {
                classes: ["button", "focused"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 34,
            declarations: [
                [
                    "box-shadow",
                    "0 0 0 var(--wb-border-width-medium)\n        var(--wb-semanticColor-focus-inner)",
                ],
                [
                    "outline",
                    "var(--wb-border-width-medium) solid\n        var(--wb-semanticColor-focus-outer)",
                ],
                ["outline-offset", "var(--wb-border-width-medium)"],
            ],
        },
        {
            target: {
                classes: ["button", "secondary"],
                states: ["focus", "hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 3,
            media: null,
            layerRank: 1,
            order: 35,
            declarations: [
                [
                    "box-shadow",
                    "0 0 0 var(--wb-border-width-medium)\n        var(--wb-semanticColor-focus-inner)",
                ],
                [
                    "outline",
                    "var(--wb-border-width-medium) solid\n        var(--wb-semanticColor-focus-outer)",
                ],
                ["outline-offset", "var(--wb-border-width-medium)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-hover)\n            var(--wb-c-button--border-hover),\n        0 0 0 var(--wb-border-width-medium) var(--wb-semanticColor-focus-inner)",
                ],
            ],
        },
        {
            target: {
                classes: ["button", "secondary"],
                states: ["focus", "press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 3,
            media: null,
            layerRank: 1,
            order: 36,
            declarations: [
                [
                    "box-shadow",
                    "0 0 0 var(--wb-border-width-medium)\n        var(--wb-semanticColor-focus-inner)",
                ],
                [
                    "outline",
                    "var(--wb-border-width-medium) solid\n        var(--wb-semanticColor-focus-outer)",
                ],
                ["outline-offset", "var(--wb-border-width-medium)"],
                [
                    "box-shadow",
                    "inset 0 0 0 var(--wb-c-button--border-width-press)\n            var(--wb-c-button--border-press),\n        0 0 0 var(--wb-border-width-medium) var(--wb-semanticColor-focus-inner)",
                ],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["disabled"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 1,
            order: 37,
            declarations: [
                ["cursor", "not-allowed"],
                ["border-width", "var(--wb-c-button--border-width-default)"],
                ["border-color", "var(--wb-c-button--border-disabled)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-default)",
                ],
                ["background", "var(--wb-c-button--bg-disabled)"],
                ["color", "var(--wb-c-button--fg-disabled)"],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["disabled", "hover"],
                notStates: [],
            },
            ancestors: [],
            specificity: 3,
            media: null,
            layerRank: 1,
            order: 38,
            declarations: [
                ["border-width", "var(--wb-c-button--border-width-default)"],
                ["border-color", "var(--wb-c-button--border-disabled)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-default)",
                ],
                ["background", "var(--wb-c-button--bg-disabled)"],
                ["color", "var(--wb-c-button--fg-disabled)"],
                ["outline", "none"],
                ["box-shadow", "none"],
                ["text-decoration", "none"],
                ["text-decoration-thickness", "unset"],
                ["text-underline-offset", "unset"],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["disabled", "press"],
                notStates: [],
            },
            ancestors: [],
            specificity: 3,
            media: null,
            layerRank: 1,
            order: 39,
            declarations: [
                ["border-width", "var(--wb-c-button--border-width-default)"],
                ["border-color", "var(--wb-c-button--border-disabled)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-default)",
                ],
                ["background", "var(--wb-c-button--bg-disabled)"],
                ["color", "var(--wb-c-button--fg-disabled)"],
                ["outline", "none"],
                ["box-shadow", "none"],
                ["text-decoration", "none"],
                ["text-decoration-thickness", "unset"],
                ["text-underline-offset", "unset"],
            ],
        },
        {
            target: {
                classes: ["button"],
                states: ["disabled", "focus"],
                notStates: [],
            },
            ancestors: [],
            specificity: 3,
            media: null,
            layerRank: 1,
            order: 40,
            declarations: [
                [
                    "box-shadow",
                    "0 0 0 var(--wb-border-width-medium)\n        var(--wb-semanticColor-focus-inner)",
                ],
                [
                    "outline",
                    "var(--wb-border-width-medium) solid\n        var(--wb-semanticColor-focus-outer)",
                ],
                ["outline-offset", "var(--wb-border-width-medium)"],
                ["border-width", "var(--wb-c-button--border-width-default)"],
                ["border-color", "var(--wb-c-button--border-disabled)"],
                [
                    "border-radius",
                    "var(--wb-c-button-root-border-radius-default)",
                ],
                ["background", "var(--wb-c-button--bg-disabled)"],
                ["color", "var(--wb-c-button--fg-disabled)"],
            ],
        },
        {
            target: {
                classes: ["text"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 41,
            declarations: [
                ["align-items", "center"],
                ["font-weight", "var(--wb-c-button-root-font-weight-default)"],
                ["white-space", "nowrap"],
                ["overflow", "hidden"],
                [
                    "line-height",
                    "var(--wb-c-button-root-font-lineHeight-default)",
                ],
                ["text-overflow", "ellipsis"],
                ["display", "inline-block"],
                ["pointer-events", "none"],
            ],
        },
        {
            target: {
                classes: ["smallText"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 42,
            declarations: [
                [
                    "line-height",
                    "var(--wb-c-button-root-font-lineHeight-small)",
                ],
            ],
        },
        {
            target: {
                classes: ["largeText"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 43,
            declarations: [
                ["font-size", "var(--wb-c-button-root-font-size-large)"],
                [
                    "line-height",
                    "var(--wb-c-button-root-font-lineHeight-large)",
                ],
            ],
        },
        {
            target: {
                classes: ["hiddenText"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 44,
            declarations: [["visibility", "hidden"]],
        },
        {
            target: {
                classes: ["spinner"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 45,
            declarations: [["position", "absolute"]],
        },
        {
            target: {
                classes: ["startIcon"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 46,
            declarations: [
                [
                    "margin-inline",
                    "var(--wb-c-button-icon-margin-inline-outer) var(--wb-c-button-icon-margin-inline-inner)",
                ],
            ],
        },
        {
            target: {
                classes: ["tertiaryStartIcon"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 47,
            declarations: [["margin-inline-start", "0"]],
        },
        {
            target: {
                classes: ["endIcon"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 48,
            declarations: [
                [
                    "margin-inline-start",
                    "var(--wb-c-button-icon-margin-inline-inner)",
                ],
            ],
        },
        {
            target: {
                classes: ["iconWrapper"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 49,
            declarations: [
                ["padding", "var(--wb-c-button-icon-padding)"],
                ["min-inline-size", "auto"],
            ],
        },
        {
            target: {
                classes: ["endIconWrapper"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 50,
            declarations: [
                [
                    "margin-inline",
                    "var(--wb-c-button-icon-margin-inline-inner) var(--wb-c-button-icon-margin-inline-outer)",
                ],
            ],
        },
        {
            target: {
                classes: ["endIconWrapperTertiary"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 1,
            order: 51,
            declarations: [["margin-inline-end", "0"]],
        },
    ],
};

export default sheet;
