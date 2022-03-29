// @flow
import * as React from "react";

import * as Locale from "../locale.js";
import * as FakeTranslate from "../i18n-faketranslate.js";
import {_, $_, ngettext, doNotTranslate, doNotTranslateYet} from "../i18n.js";

jest.mock("react", () => {
    return {
        __esModule: true,
        Fragment: "<Fragment>",
        createElement: jest.fn((element, props, ...children) => {
            return {
                props: {
                    ...props,
                    children,
                },
            };
        }),
    };
});

describe("i18n", () => {
    beforeEach(() => {
        // "en" is the default locale so that's going to be our default
        // mock for `getLocale()`.
        jest.spyOn(Locale, "getLocale").mockImplementation(() => "en");
        jest.clearAllMocks();
    });

    describe("integration tests", () => {
        beforeEach(() => {
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");
        });

        it("_ should translate", () => {
            // Arrange
            const expectation =
                FakeTranslate.Translators["boxes"].translate("Test");

            // Act
            const result = _("Test");

            // Assert
            expect(result).toEqual(expectation);
        });

        it("$_ should translate", () => {
            // Arrange
            const expectation =
                FakeTranslate.Translators["boxes"].translate("Test");

            // Act
            const result = $_("Test");

            // Assert
            expect(result).toEqual(expectation);
        });

        it("ngettext should translate", () => {
            // Arrange
            const expectation =
                FakeTranslate.Translators["boxes"].translate("Plural");

            // Act
            const result = ngettext("Singular", "Plural", 0);

            // Assert
            expect(result).toEqual(expectation);
        });

        it("doNotTranslate should not translate", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        it("doNotTranslateYet should not translate", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test");

            // Assert
            expect(result).toEqual("Test");
        });
    });

    describe("# _", () => {
        it("returns input when no translation nor substitutions", () => {
            // Arrange

            // Act
            const result = _("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        it("handles % outside of a substitution", () => {
            // Arrange

            // Act
            const result = _("Test %s");

            // Assert
            expect(result).toEqual("Test %s");
        });

        it("returns input when using substituion syntax but no value to substitute,", () => {
            // Arrange

            // Act
            const result = _("Test %(name)s");

            // Assert
            expect(result).toEqual("Test %(name)s");
        });

        it("with string substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = _("Test %(str)s", {str: "string"});

            // Assert
            expect(result).toEqual("Test string");
        });

        it("with number substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = _("Test %(num)s", {num: 2});

            // Assert
            expect(result).toEqual("Test 2");
        });

        it("returns singular when given a plural configuration object", () => {
            // Arrange

            // Act
            const result = _({lang: "en", messages: ["Singular", "Plural"]});

            // Assert
            expect(result).toEqual("Singular");
        });

        it("calls our fake translation", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");

            const spy = jest.spyOn(
                FakeTranslate.Translators["boxes"],
                "translate",
            );

            // Act
            _("Test");

            // Assert
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("# $_", () => {
        it("should return input when options are null", () => {
            // Arrange

            // Act
            const result = $_("Test", null);

            // Assert
            expect(result).toEqual("Test");
        });

        it("should return input when options are empty", () => {
            // Arrange

            // Act
            const result = $_("Test", {});

            // Assert
            expect(result).toEqual("Test");
        });

        it("should return input with % when options are null", () => {
            // Arrange

            // Act
            const result = $_("Test %s", {});

            // Assert
            expect(result).toEqual("Test %s");
        });

        it("should return input with % when options are empty", () => {
            // Arrange

            // Act
            const result = $_("Test %s", {});

            // Assert
            expect(result).toEqual("Test %s");
        });

        it("should return array combining text with substitutions when substitutions given", () => {
            // Arrange

            // Act
            const result = $_("Test %(num)s %(str)s", {str: "string", num: 2});

            // Assert
            // $FlowIgnore[prop-missing]
            // $FlowIgnore[incompatible-use]
            expect(result.props.children).toEqual([
                "Test ",
                2,
                " ",
                "string",
                "",
            ]);
        });

        it("should pass children as separate arguments, not an array", () => {
            // Arrange

            // Act
            $_("Test %(num)s %(str)s", {str: "string", num: 2});

            // Assert
            expect(React.createElement).toHaveBeenCalledWith(
                "<Fragment>",
                {},
                "Test ",
                2,
                " ",
                "string",
                "",
            );
        });

        it("calls our fake translation", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");
            const spy = jest.spyOn(
                FakeTranslate.Translators["boxes"],
                "translate",
            );

            // Act
            $_("Test %(num)s %(str)s", {str: "string", num: 2});

            // Assert
            expect(spy).toHaveBeenCalled();
        });

        it("should pass-through markers that don't appear in options", () => {
            // Arrange

            // Act
            $_("Test %(num)s %(str)s", {num: 2});

            // Assert
            expect(React.createElement).toHaveBeenCalledWith(
                "<Fragment>",
                {},
                "Test ",
                2,
                " ",
                "%(str)s",
                "",
            );
        });

        it("should handle reused markers", () => {
            // Arrange

            // Act
            $_("Test %(num)s %(num)s %(num)s", {num: 2});

            // Assert
            expect(React.createElement).toHaveBeenCalledWith(
                "<Fragment>",
                {},
                "Test ",
                2,
                " ",
                2,
                " ",
                2,
                "",
            );
        });
    });

    describe("# ngettext", () => {
        it("calls our fake translation", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");
            const spy = jest.spyOn(
                FakeTranslate.Translators["boxes"],
                "translate",
            );

            // Act
            ngettext("Singular", "Plural", 0);

            // Assert
            expect(spy).toHaveBeenCalled();
        });

        describe("for default locale/en", () => {
            describe("without substitutions", () => {
                it("should return plural form for num 0", () => {
                    // Arrange

                    // Act
                    const result = ngettext("Singular", "Plural", 0);

                    // Assert
                    expect(result).toEqual("Plural");
                });

                it("should return singular form for num 1", () => {
                    // Arrange

                    // Act
                    const result = ngettext("Singular", "Plural", 1);

                    // Assert
                    expect(result).toEqual("Singular");
                });

                it("should return plural form for num 2 or more", () => {
                    // Arrange

                    // Act
                    const result = ngettext("Singular", "Plural", 2);

                    // Assert
                    expect(result).toEqual("Plural");
                });
            });

            describe("with num substitution", () => {
                it("should return plural form for num 0", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        0,
                    );

                    // Assert
                    expect(result).toEqual("Plural 0");
                });

                it("should return singular form for num 1", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        1,
                    );

                    // Assert
                    expect(result).toEqual("Singular 1");
                });

                it("should return plural form for num 2 or more", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        2,
                    );

                    // Assert
                    expect(result).toEqual("Plural 2");
                });
            });

            describe("with num substitution and num option", () => {
                it("should return plural form for num 0", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        0,
                        {num: 5},
                    );

                    // Assert
                    expect(result).toEqual("Plural 5");
                });

                it("should return singular form for num 1", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        1,
                        {num: 5},
                    );

                    // Assert
                    expect(result).toEqual("Singular 5");
                });

                it("should return plural form for num 2 or more", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "Singular %(num)s",
                        "Plural %(num)s",
                        2,
                        {num: 5},
                    );

                    // Assert
                    expect(result).toEqual("Plural 5");
                });
            });

            describe("with num substitution and other substitutions", () => {
                it("should return plural form for num 0", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "%(canIDigIt)s Singular %(num)s",
                        "%(canIDigIt)s Plural %(num)s",
                        0,
                        {canIDigIt: "yes you can"},
                    );

                    // Assert
                    expect(result).toEqual("yes you can Plural 0");
                });

                it("should return singular form for num 1", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "%(canIDigIt)s Singular %(num)s",
                        "%(canIDigIt)s Plural %(num)s",
                        1,
                        {canIDigIt: "yes you can"},
                    );

                    // Assert
                    expect(result).toEqual("yes you can Singular 1");
                });

                it("should return plural form for num 2 or more", () => {
                    // Arrange

                    // Act
                    const result = ngettext(
                        "%(canIDigIt)s Singular %(num)s",
                        "%(canIDigIt)s Plural %(num)s",
                        2,
                        {canIDigIt: "yes you can"},
                    );

                    // Assert
                    expect(result).toEqual("yes you can Plural 2");
                });
            });
        });

        describe("no plurals locale (using zh-hans)", () => {
            it("should return singular for 0", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "zh-hans",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural %(num)s",
                        ],
                    },
                    0,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Singular 0");
            });

            it("should return singular for 1", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "zh-hans",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural %(num)s",
                        ],
                    },
                    1,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Singular 1");
            });

            it("should return singular for 2", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "zh-hans",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural %(num)s",
                        ],
                    },
                    2,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Singular 2");
            });
        });

        describe("multiple plurals local (using pl)", () => {
            it("should return second plural form for 0", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "pl",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural 1 %(num)s",
                            "%(canIDigIt)s Plural 2 %(num)s",
                        ],
                    },
                    0,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Plural 2 0");
            });

            it("should return singular form for 1", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "pl",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural 1 %(num)s",
                            "%(canIDigIt)s Plural 2 %(num)s",
                        ],
                    },
                    1,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Singular 1");
            });

            it("should return first plural form for 2 through 4", () => {
                // Arrange
                const testPoints = [2, 3, 4];

                // Act
                const results = testPoints.map((n) =>
                    ngettext(
                        {
                            lang: "pl",
                            messages: [
                                "%(canIDigIt)s Singular %(num)s",
                                "%(canIDigIt)s Plural 1 %(num)s",
                                "%(canIDigIt)s Plural 2 %(num)s",
                            ],
                        },
                        n,
                        {canIDigIt: "yes you can"},
                    ),
                );

                // Assert
                expect(results).toEqual([
                    "yes you can Plural 1 2",
                    "yes you can Plural 1 3",
                    "yes you can Plural 1 4",
                ]);
            });

            it("should return second plural form for 5", () => {
                // Arrange

                // Act
                const result = ngettext(
                    {
                        lang: "pl",
                        messages: [
                            "%(canIDigIt)s Singular %(num)s",
                            "%(canIDigIt)s Plural 1 %(num)s",
                            "%(canIDigIt)s Plural 2 %(num)s",
                        ],
                    },
                    5,
                    {canIDigIt: "yes you can"},
                );

                // Assert
                expect(result).toEqual("yes you can Plural 2 5");
            });
        });
    });

    describe("# doNotTranslate", () => {
        it("should not call our fake translation", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");
            const spy = jest.spyOn(
                FakeTranslate.Translators["boxes"],
                "translate",
            );
            spy.mockReset();

            // Act
            doNotTranslate("Test");

            // Assert
            expect(spy).not.toHaveBeenCalled();
        });

        it("returns input when no translation nor substitutions", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        it("handles % outside of a substitution", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test %s");

            // Assert
            expect(result).toEqual("Test %s");
        });

        it("returns input when using substituion syntax but no value to substitute,", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test %(name)s");

            // Assert
            expect(result).toEqual("Test %(name)s");
        });

        it("with string substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test %(str)s", {str: "string"});

            // Assert
            expect(result).toEqual("Test string");
        });

        it("with number substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = doNotTranslate("Test %(num)s", {num: 2});

            // Assert
            expect(result).toEqual("Test 2");
        });

        it("returns singular when given a plural configuration object", () => {
            // Arrange

            // Act
            const result = doNotTranslate({
                lang: "en",
                messages: ["Singular", "Plural"],
            });

            // Assert
            expect(result).toEqual("Singular");
        });
    });

    describe("# doNotTranslateYet", () => {
        it("should not call our fake translation", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "boxes");
            const spy = jest.spyOn(
                FakeTranslate.Translators["boxes"],
                "translate",
            );
            spy.mockReset();

            // Act
            doNotTranslateYet("Test");

            // Assert
            expect(spy).not.toHaveBeenCalled();
        });

        it("returns input when no translation nor substitutions", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        it("handles % outside of a substitution", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test %s");

            // Assert
            expect(result).toEqual("Test %s");
        });

        it("returns input when using substituion syntax but no value to substitute,", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test %(name)s");

            // Assert
            expect(result).toEqual("Test %(name)s");
        });

        it("with string substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test %(str)s", {
                str: "string",
            });

            // Assert
            expect(result).toEqual("Test string");
        });

        it("with number substitution returns substituted value", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet("Test %(num)s", {num: 2});

            // Assert
            expect(result).toEqual("Test 2");
        });

        it("returns singular when given a plural configuration object", () => {
            // Arrange

            // Act
            const result = doNotTranslateYet({
                lang: "en",
                messages: ["Singular", "Plural"],
            });

            // Assert
            expect(result).toEqual("Singular");
        });
    });
});
