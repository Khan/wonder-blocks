// @flow
import * as React from "react";
import {shallow} from "enzyme";

import {
    MediaLayoutContext,
    MEDIA_DEFAULT_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import StandardModal from "./standard-modal.js";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

describe("StandardModal", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("Ensure the ModalCloseButton isn't inside.", () => {
        const wrapper = shallow(
            <StandardModal title="Title" content="Content" footer="Footer" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });

    // We already capture desktop snapshots from auto generated tests
    test("mobile", () => {
        // Arrange
        const wrapper = mount(
            <div>
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: undefined,
                        ssrSize: "small",
                        mediaSpec: MEDIA_DEFAULT_SPEC,
                    }}
                >
                    <StandardModal
                        title="Title"
                        content="Content"
                        footer="Footer"
                    />
                </MediaLayoutContext.Provider>
            </div>,
        );

        // Act
        const modal = wrapper.find(StandardModal);

        // Assert
        expect(modal).toMatchSnapshot();
    });

    describe("desktop", () => {
        // Arrange
        const wrapper = mount(
            <div>
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: undefined,
                        ssrSize: "large",
                        mediaSpec: MEDIA_DEFAULT_SPEC,
                    }}
                >
                    <StandardModal
                        title="Title"
                        content="Content"
                        footer="Footer"
                    />
                </MediaLayoutContext.Provider>
            </div>,
        );

        // Act
        const modal = wrapper.find(StandardModal);

        // Assert
        expect(modal).toMatchSnapshot();
    });
});
