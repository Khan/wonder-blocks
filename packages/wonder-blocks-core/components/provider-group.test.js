// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import UniqueIDProvider from "./unique-id-provider.js";
import ProviderGroup from "./provider-group.js";

describe("ProviderGroup", () => {
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
            <ProviderGroup providers={providers}>
                {(...args) => gatherer(args)}
            </ProviderGroup>
        );

        // Act
        mount(underTest);

        // Assert
        expect(gatherer).toHaveBeenCalledTimes(1);
    });
});
