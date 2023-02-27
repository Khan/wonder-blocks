import * as React from "react";
import {render} from "@testing-library/react";

import * as ParseSimpleHTML from "../parse-simple-html";
import {I18nInlineMarkup} from "../i18n-inline-markup";
import * as i18n from "../../functions/i18n";

export const SingleShallowSubstitution = (): React.ReactElement => {
    return (
        <I18nInlineMarkup
            u={(t: string) => (
                <React.Fragment>
                    [Underline:<u>{t}</u>]
                </React.Fragment>
            )}
        >
            {i18n._(
                "-6\u00b0C, Sunny, Fells like: <u>-12</u>, Wind: VR 5 km/h",
            )}
        </I18nInlineMarkup>
    );
};

export const MultipleShallowSubstitution = (): React.ReactElement => {
    return (
        <I18nInlineMarkup
            u={(t: string) => (
                <React.Fragment>
                    __<u>{t}</u>__
                </React.Fragment>
            )}
            i={(t: string) => (
                <span style={{background: "lightblue"}}>
                    *<i style={{fontStyle: "italic"}}>{t}</i>*
                </span>
            )}
        >
            {i18n._(
                "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
            )}
        </I18nInlineMarkup>
    );
};

export const ElementWrapper = (): React.ReactElement => {
    return (
        <I18nInlineMarkup
            elementWrapper={(t) => (
                <span style={{background: "yellow"}}>{t}</span>
            )}
            u={(t: string) => (
                <span style={{background: "red"}}>
                    __<u>{t}</u>__
                </span>
            )}
            i={(t: string) => (
                <span style={{background: "lightblue"}}>
                    *<i style={{fontStyle: "italic"}}>{t}</i>*
                </span>
            )}
        >
            {i18n._(
                "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
            )}
        </I18nInlineMarkup>
    );
};

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
