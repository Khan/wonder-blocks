import * as React from "react";
import {render} from "@testing-library/react";

import * as ParseSimpleHTML from "../parse-simple-html";
import {I18nInlineMarkup} from "../i18n-inline-markup";
import {
    SingleShallowSubstitution,
    MultipleShallowSubstitution,
    ElementWrapper,
} from "../__docs__/i18n-inline-markup.stories";

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
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <I18nInlineMarkup>
                        {"Hello <b>world</b>!"}
                    </I18nInlineMarkup>,
                );

            expect(action).toThrowErrorMatchingInlineSnapshot(
                `"I18nInlineMarkup: missing render prop for b"`,
            );
        });

        it("should throw an error if `parseSimpleHTML()` throws", () => {
            jest.spyOn(
                ParseSimpleHTML,
                "parseSimpleHTML",
            ).mockImplementationOnce(() => {
                throw new Error("foo");
            });

            const action = () =>
                render(
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <I18nInlineMarkup b={(value) => <span>{value}</span>}>
                        {"Hello <b>world</b>!"}
                    </I18nInlineMarkup>,
                );

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
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
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
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
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
