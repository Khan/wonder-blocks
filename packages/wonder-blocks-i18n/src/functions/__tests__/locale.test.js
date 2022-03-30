// @flow
import {getLocale, setLocale} from "../locale.js";

describe("#getLocale/#setLocale", () => {
    afterEach(() => {
        // Reset locale to the default
        setLocale("en");
    });

    it("should return the default", () => {
        const result = getLocale();

        expect(result).toEqual("en");
    });

    it("should return whatever setLocale() set it to", () => {
        setLocale("es");

        const result = getLocale();

        expect(result).toEqual("es");
    });

    it("should return whatever setLocale() set it to last", () => {
        setLocale("es");
        setLocale("fr");

        const result = getLocale();

        expect(result).toEqual("fr");
    });
});
