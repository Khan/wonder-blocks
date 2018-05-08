// @flow
import {processStyleList} from "./util.js";

describe("processStyleList", () => {
    it("no inline styles", () => {
        const {style} = processStyleList([]);
        expect(style).toEqual({});
    });

    it("one inline style", () => {
        const {style} = processStyleList({
            WebkitFlex: 1,
            backgroundColor: "red",
            padding: 12,
        });
        expect(style).toEqual({
            WebkitFlex: "1 !important",
            backgroundColor: "red !important",
            padding: "12px !important",
        });
    });

    it("reused inline style", () => {
        const {style} = processStyleList([
            {
                WebkitFlex: 1,
                backgroundColor: "red",
                padding: 12,
            },
            {
                WebkitFlex: 1,
                backgroundColor: "red",
                padding: 12,
            },
        ]);
        expect(style).toEqual({
            WebkitFlex: "1 !important",
            backgroundColor: "red !important",
            padding: "12px !important",
        });
    });

    it("mixed inline style", () => {
        const {style} = processStyleList([
            {
                WebkitFlex: 1,
                backgroundColor: "red",
                padding: 12,
            },
            {
                flex: 1,
                backgroundColor: "blue",
                padding: 12,
            },
        ]);
        expect(style).toEqual({
            WebkitFlex: "1 !important",
            backgroundColor: "blue !important",
            flex: "1 !important",
            padding: "12px !important",
        });
    });

    it("falsy inline style", () => {
        const {style} = processStyleList([
            {
                WebkitFlex: 1,
                backgroundColor: "red",
                padding: 12,
            },
            false,
        ]);
        expect(style).toEqual({
            WebkitFlex: "1 !important",
            backgroundColor: "red !important",
            padding: "12px !important",
        });
    });
});
