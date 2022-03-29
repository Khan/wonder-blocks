// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import * as ParseSimpleHTML from "../parse-simple-html.js";
import {I18nInlineMarkup} from "../i18n-inline-markup.js";
import {
    SingleShallowSubstitution,
    MultipleShallowSubstitution,
    ElementWrapper,
} from "../i18n-inline-markup.stories.js";

describe("I18nInlineMarkup", () => {
    test("SingleShallowSubstitution", () => {
        const {container} = render(<SingleShallowSubstitution />);

        expect(container).toMatchSnapshot();
    });

    test("MultipleShallowSubstitution", () => {
        const {container} = render(<MultipleShallowSubstitution />);

        expect(container).toMatchSnapshot();
    });

    test("ElementWrapper", () => {
        const {container} = render(<ElementWrapper />);

        expect(container).toMatchSnapshot();
    });

    describe("errors", () => {
        beforeEach(() => {
            // React calls console.error() whenever there's an exception
            // thrown by a component.  We mock console.error() to avoid
            // error reports that we're expecting as part of these tests.
            jest.spyOn(console, "error").mockImplementation(() => {});
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should throw an error if a render prop is missing", () => {
            const action = () =>
                render(
                    <I18nInlineMarkup>
                        {"Hello <b>world</b>!"}
                    </I18nInlineMarkup>,
                );

            expect(action).toThrowErrorMatchingInlineSnapshot(
                `"I18nInlineMarkup: missing render prop for b"`,
            );
        });

        it("should throw an error if `parseSimpleHTML()` throws", () => {
            jest.spyOn(ParseSimpleHTML, "parseSimpleHTML").mockImplementation(
                () => {
                    throw new Error("foo");
                },
            );

            const action = () =>
                render(
                    <I18nInlineMarkup>
                        {"Hello <b>world</b>!"}
                    </I18nInlineMarkup>,
                );

            expect(action).toThrowErrorMatchingInlineSnapshot(`"foo"`);
        });

        it("should call `onError` callback if set when an parse error is thrown", () => {
            jest.spyOn(ParseSimpleHTML, "parseSimpleHTML").mockImplementation(
                () => {
                    throw new Error("foo");
                },
            );
            const onErrorSpy = jest.fn().mockReturnValue("Hello world!");

            const {container} = render(
                <I18nInlineMarkup onError={onErrorSpy}>
                    {"Hello <b>world</b>!"}
                </I18nInlineMarkup>,
            );

            expect(onErrorSpy).toHaveBeenCalled();
            expect(container).toMatchSnapshot();
        });
    });
});
