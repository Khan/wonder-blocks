import {isClientSideUrl} from "../is-client-side-url";

describe("isClientSideUrl", () => {
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
        expect(isClientSideUrl("tel:+1234567890")).toEqual(false);
        expect(isClientSideUrl("ms-help://kb12345.htm")).toEqual(false);
        expect(isClientSideUrl("z39.50s://0.0.0.0")).toEqual(false);

        // HREFs with anchors
        expect(isClientSideUrl("#")).toEqual(false);
        expect(isClientSideUrl("#foo")).toEqual(false);
        expect(isClientSideUrl("/foo#bar")).toEqual(false);
        expect(isClientSideUrl("foo/bar#baz")).toEqual(false);

        // internal URLs
        expect(isClientSideUrl("/foo//bar")).toEqual(true);
        expect(isClientSideUrl("/coach/dashboard")).toEqual(true);
        expect(isClientSideUrl("/math/early-math/modal/e/addition_1")).toEqual(
            true,
        );
    });

    test("invalid values for 'href' should return false", () => {
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'null' is not assignable to parameter of type 'string'.
        expect(isClientSideUrl(null)).toEqual(false);
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'undefined' is not assignable to parameter of type 'string'.
        expect(isClientSideUrl(undefined)).toEqual(false);
    });
});
