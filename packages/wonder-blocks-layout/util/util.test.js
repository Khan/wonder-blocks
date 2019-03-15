// @flow
import {queryMatchesSize} from "./util.js";

import type {MediaQuery, MediaSize} from "./types.js";

const testQueryMatchesSizes = (
    query: MediaQuery,
    matchedSizes: Set<MediaSize>,
) => {
    describe(query, () => {
        for (const size of ["small", "medium", "large"]) {
            // Arrange
            const expectedResult = matchedSizes.has(size);

            it(`${query} should ${
                expectedResult ? "" : "not "
            }match ${size}`, () => {
                // Act
                const actualResult = queryMatchesSize(query, size);

                // Assert
                expect(actualResult).toEqual(expectedResult);
            });
        }
    });
};

describe.only("queryMatchesSize", () => {
    testQueryMatchesSizes("all", new Set(["small", "medium", "large"]));
    testQueryMatchesSizes("mdOrSmaller", new Set(["small", "medium"]));
    testQueryMatchesSizes("mdOrLarger", new Set(["medium", "large"]));
    testQueryMatchesSizes("large", new Set(["large"]));
    testQueryMatchesSizes("medium", new Set(["medium"]));
    testQueryMatchesSizes("small", new Set(["small"]));

    // TODO(kevinb): figure out how to add $FlowIgnore without breaking things
    // it("should throw on invalid query", () => {
    //     // $FlowIgnore: this should be caught by flow, but we're testing it anyways
    //     expect(() => queryMatchesSize("foobar", "small")).toThrow();
    // });
});
