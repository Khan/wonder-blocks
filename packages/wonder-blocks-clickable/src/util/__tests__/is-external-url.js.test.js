// @flow
import {isClientSideUrl} from "../is-client-side-url.js";

describe("isExternalUrl", () => {
    test("returns boolean based on the url", () => {
        // external urls
        expect(
            isClientSideUrl(
                "//khanacademy.zendesk.com/hc/en-us/articles/236355907",
            ),
        ).toEqual(false);
        expect(
            isClientSideUrl(
                "https://khanacademy.zendesk.com/hc/en-us/articles/360007253831",
            ),
        ).toEqual(false);
        expect(isClientSideUrl("http://external.com")).toEqual(false);
        expect(isClientSideUrl("//www.google.com")).toEqual(false);
        expect(isClientSideUrl("//")).toEqual(false);

        // fake hrefs
        expect(isClientSideUrl("#")).toEqual(false);
        expect(isClientSideUrl("javascript:void(0);")).toEqual(false);
        expect(isClientSideUrl("javascript:void(0)")).toEqual(false);

        // internal urls
        expect(isClientSideUrl("/foo//bar")).toEqual(true);
        expect(isClientSideUrl("/coach/dashboard")).toEqual(true);
        expect(isClientSideUrl("/math/early-math/modal/e/addition_1")).toEqual(
            true,
        );
    });
});
