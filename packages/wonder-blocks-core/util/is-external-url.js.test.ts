// @flow
import isExternalUrl from "./is-external-url.js";

describe("isExternalUrl", () => {
    test("returns boolean based on the url", () => {
        // external urls
        expect(
            isExternalUrl(
                "//khanacademy.zendesk.com/hc/en-us/articles/236355907",
            ),
        ).toEqual(true);
        expect(
            isExternalUrl(
                "https://khanacademy.zendesk.com/hc/en-us/articles/360007253831",
            ),
        ).toEqual(true);
        expect(isExternalUrl("http://external.com")).toEqual(true);
        expect(isExternalUrl("//www.google.com")).toEqual(true);
        expect(isExternalUrl("//")).toEqual(true);

        // internal urls
        expect(isExternalUrl("/foo//bar")).toEqual(false);
        expect(isExternalUrl("/coach/dashboard")).toEqual(false);
        expect(isExternalUrl("/math/early-math/modal/e/addition_1")).toEqual(
            false,
        );
    });
});
