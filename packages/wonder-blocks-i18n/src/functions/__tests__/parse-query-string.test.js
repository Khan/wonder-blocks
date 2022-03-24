// @flow
import parseQueryString from "../parse-query-string.js";

describe("parseQueryString", () => {
    it("should return empty object with empty string", () => {
        expect(parseQueryString("")).toEqual({});
    });

    it("should return urlParams with dictinct keys", () => {
        const queryString = "a=1&b=2&c=3&d=4";
        const expectedResult = {a: "1", b: "2", c: "3", d: "4"};
        expect(parseQueryString(queryString)).toEqual(expectedResult);
    });

    it("should return duplicated key as array of values", () => {
        const queryString = "a=1&b=2&b=3&a=4&c=5";
        const expectedResult = {a: ["1", "4"], b: ["2", "3"], c: "5"};
        expect(parseQueryString(queryString)).toEqual(expectedResult);
    });

    it("should return multiple duplicated key as array of values", () => {
        const queryString = "a=1&b=2&b=3&a=4&c=5&a=6&a=7";
        const expectedResult = {a: ["1", "4", "6", "7"], b: ["2", "3"], c: "5"};
        expect(parseQueryString(queryString)).toEqual(expectedResult);
    });

    it("should take empty string as a valid value", () => {
        const queryString = "a=&b=1&a=2&c=";
        const expectedResult = {a: ["", "2"], b: "1", c: ""};
        expect(parseQueryString(queryString)).toEqual(expectedResult);
    });

    it("should strip off leading question marks", () => {
        const queryString = "?a=&b=1&a=2&c=";
        const expectedResult = {a: ["", "2"], b: "1", c: ""};
        expect(parseQueryString(queryString)).toEqual(expectedResult);
    });
});
