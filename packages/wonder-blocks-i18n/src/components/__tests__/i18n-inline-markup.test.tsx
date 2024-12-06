import * as React from "react";
import {render} from "@testing-library/react";

import * as ParseSimpleHTML from "../parse-simple-html";
import {I18nInlineMarkup} from "../i18n-inline-markup";
import * as i18n from "../../functions/i18n";

const SingleShallowSubstitution = (): React.ReactElement => (
    <I18nInlineMarkup
        u={(t: string) => (
            <React.Fragment>
                [Underline:<u>{t}</u>]
            </React.Fragment>
        )}
    >
        {i18n._("-6\u00b0C, Sunny, Fells like: <u>-12</u>, Wind: VR 5 km/h")}
    </I18nInlineMarkup>
);

const MultipleShallowSubstitution = (): React.ReactElement => (
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

const ElementWrapper = (): React.ReactElement => (
    <I18nInlineMarkup
        elementWrapper={(t) => <span style={{background: "yellow"}}>{t}</span>}
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
            // Arrange
            jest.spyOn(
                ParseSimpleHTML,
                "parseSimpleHTML",
            ).mockImplementationOnce(() => {
                throw new Error("foo");
            });

            // Act
            const action = () =>
                render(
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <I18nInlineMarkup b={(value) => <span>{value}</span>}>
                        {"Hello <b>world</b>!"}
                    </I18nInlineMarkup>,

                    // NOTE(somewhatabstract): This component uses its own
                    // custom error handling instead of relying on error
                    // boundaries. This seems to break the React error boundary
                    // stuff, at least when testing, so the `boundary` test
                    // harness adapter never gets the thrown error. However,
                    // we can use this `legacyRoot` setting to use synchronous
                    // rendering like before, and then the test works as-is.
                    // We probably should rework this stuff before they drop
                    // this feature.
                    {legacyRoot: true},
                );

            // Assert
            expect(action).toThrowErrorMatchingInlineSnapshot(`"foo"`);
        });

        it("should call `onError` callback if set when an parse error is thrown", () => {
            // Arrange
            jest.spyOn(
                ParseSimpleHTML,
                "parseSimpleHTML",
            ).mockImplementationOnce(() => {
                throw new Error("foo");
            });
            const onErrorSpy = jest.fn().mockReturnValue("Hello world!");

            // Act
            const {container} = render(
                <I18nInlineMarkup onError={onErrorSpy}>
                    {"Hello <b>world</b>!"}
                </I18nInlineMarkup>,
            );

            // Assert
            expect(onErrorSpy).toHaveBeenCalled();
            expect(container).toMatchSnapshot();
        });

        it("should throw when there's invalid markup", () => {
            // Arrange, Act
            const action = () =>
                render(
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <I18nInlineMarkup settings={(label) => <div> {label}</div>}>
                        {
                            "This HTML is broken \u003cinvalid\u003einvalid\u003e innner \u003c/invalid\u003e, but here is fine."
                        }
                    </I18nInlineMarkup>,
                );

            // Assert
            expect(action).toThrowErrorMatchingInlineSnapshot(
                `"I18nInlineMarkup: missing render prop for invalid"`,
            );
        });

        it("should call `onError` callback if set when there's invalid markup", () => {
            // Arrange
            const onErrorSpy = jest.fn().mockReturnValue("An error occurred!");

            // Act
            const {container} = render(
                <I18nInlineMarkup onError={onErrorSpy}>
                    {
                        "This HTML is broken \u003cinvalid\u003einvalid\u003e innner \u003c/invalid\u003e, but here is fine."
                    }
                </I18nInlineMarkup>,
            );

            // Assert
            expect(onErrorSpy).toHaveBeenCalledWith(
                new Error("I18nInlineMarkup: missing render prop for invalid"),
            );
            expect(container).toMatchSnapshot();
        });
    });
});
