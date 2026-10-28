/**
 * GENERATED FILE — DO NOT EDIT.
 * Run `pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles`.
 */
/* eslint-disable max-lines */
import type {NativeStyleSheet} from "../css-runtime/types";

const sheet: NativeStyleSheet = {
    source: "wonder-blocks-button/src/components/button-unstyled.module.css",
    rules: [
        {
            target: {
                classes: ["reset"],
                states: [],
                notStates: [],
            },
            ancestors: [],
            specificity: 1,
            media: null,
            layerRank: 0,
            order: 0,
            declarations: [
                ["position", "relative"],
                ["display", "inline-flex"],
                ["align-items", "center"],
                ["justify-content", "center"],
                ["margin", "0"],
                ["padding", "0"],
                ["border", "none"],
                ["cursor", "pointer"],
                ["outline", "none"],
                ["text-decoration", "none"],
                ["box-sizing", "border-box"],
                ["touch-action", "manipulation"],
                ["user-select", "none"],
            ],
        },
        {
            target: {
                classes: ["reset"],
                states: ["focus"],
                notStates: [],
            },
            ancestors: [],
            specificity: 2,
            media: null,
            layerRank: 0,
            order: 1,
            declarations: [["-webkit-tap-highlight-color", "transparent"]],
        },
    ],
};

export default sheet;
