import {getRoundedValuesForHeader} from "./utils";

/**
 * This is a test for the function getRoundedValuesForHeader. This is used
 * to determine if the AccordionSectionHeader should be rounded based on the
 * cornerKind prop, if it is the first or last section, and if it is expanded.
 *
 * If the cornerKind is "rounded-per-section", the section should always be
 * rounded at the top, and only rounded at the bottom if the section is closed.
 * If the cornerKind is "rounded", the section should be rounded at the top
 * if it is the first section, and only rounded at the bottom if it is the
 * last section and the section is closed.
 */
describe("getRoundedValuesForHeader", () => {
    test.each`
        cornerKind               | isFirstSection | isLastSection | expanded | roundedTop | roundedBottom
        ${"rounded-per-section"} | ${true}        | ${true}       | ${true}  | ${true}    | ${false}
        ${"rounded-per-section"} | ${true}        | ${true}       | ${false} | ${true}    | ${true}
        ${"rounded-per-section"} | ${true}        | ${false}      | ${true}  | ${true}    | ${false}
        ${"rounded-per-section"} | ${true}        | ${false}      | ${false} | ${true}    | ${true}
        ${"rounded-per-section"} | ${false}       | ${true}       | ${true}  | ${true}    | ${false}
        ${"rounded-per-section"} | ${false}       | ${true}       | ${false} | ${true}    | ${true}
        ${"rounded-per-section"} | ${false}       | ${false}      | ${true}  | ${true}    | ${false}
        ${"rounded-per-section"} | ${false}       | ${false}      | ${false} | ${true}    | ${true}
        ${"rounded"}             | ${true}        | ${true}       | ${true}  | ${true}    | ${false}
        ${"rounded"}             | ${true}        | ${true}       | ${false} | ${true}    | ${true}
        ${"rounded"}             | ${true}        | ${false}      | ${true}  | ${true}    | ${false}
        ${"rounded"}             | ${true}        | ${false}      | ${false} | ${true}    | ${false}
        ${"rounded"}             | ${false}       | ${true}       | ${true}  | ${false}   | ${false}
        ${"rounded"}             | ${false}       | ${true}       | ${false} | ${false}   | ${true}
        ${"rounded"}             | ${false}       | ${false}      | ${true}  | ${false}   | ${false}
        ${"rounded"}             | ${false}       | ${false}      | ${false} | ${false}   | ${false}
        ${"square"}              | ${true}        | ${true}       | ${true}  | ${false}   | ${false}
    `(
        `returns $roundedTop roundedTop and $roundedBottom roundedBottom when
        cornerKind is $cornerKind, isFirstSection is $isFirstSection,
        isLastSection is $isLastSection, and expanded is $expanded`,
        ({
            cornerKind,
            isFirstSection,
            isLastSection,
            expanded,
            roundedTop,
            roundedBottom,
        }) => {
            expect(
                getRoundedValuesForHeader(
                    cornerKind,
                    isFirstSection,
                    isLastSection,
                    expanded,
                ),
            ).toEqual({
                roundedTop,
                roundedBottom,
            });
        },
    );
});
