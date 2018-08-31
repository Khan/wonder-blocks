// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import UniqueIDProvider from "./unique-id-provider.js";
import CaaFAggregator from "./caaf-aggregator.js";

describe("CaaFAggregator", () => {
    afterEach(() => {
        unmountAll();
    });

    test("provides values to children from specified providers", () => {
        // Arrange
        const gatherer = jest.fn((...args) => {
            // eslint-disable-next-line no-console
            console.log(args[0]);
            return "Gathered";
        });
        const providers = [
            {type: UniqueIDProvider, props: {}},
            {type: UniqueIDProvider, props: {scope: "test"}},
        ];
        const underTest = (
            <CaaFAggregator providers={providers}>
                {(...args) => gatherer(args)}
            </CaaFAggregator>
        );

        // Act
        mount(underTest);

        // Assert
        expect(gatherer).toHaveBeenCalledTimes(1);
    });
});
