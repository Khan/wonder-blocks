// @flow
import {isClientSideUrl} from "../is-client-side-url.js";

describe("isExternalUrl", () => {
    test("returns boolean based on the url", () => {
        // external URLs
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

        // non-http(s) URLs
        expect(isClientSideUrl("javascript:void(0);")).toEqual(false);
        expect(isClientSideUrl("javascript:void(0)")).toEqual(false);
        expect(isClientSideUrl("mailto:foo@example.com")).toEqual(false);
        expect(isClientSideUrl("tel:+1234567890")).toEqual(false);

        // fake HREFs
        expect(isClientSideUrl("#")).toEqual(false);

        // internal URLs
        expect(isClientSideUrl("/foo//bar")).toEqual(true);
        expect(isClientSideUrl("/coach/dashboard")).toEqual(true);
        expect(isClientSideUrl("/math/early-math/modal/e/addition_1")).toEqual(
            true,
        );
    });
});
