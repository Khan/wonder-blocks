// @flow
import * as React from "react";
import {shallow} from "enzyme";

import {
    MediaLayoutContext,
    MEDIA_DEFAULT_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import TwoColumnModal from "./two-column-modal.js";
import LargeTwoColumnModal from "./large-two-column-modal.js";
import SmallTwoColumnModal from "./small-two-column-modal.js";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

describe("TwoColumnModal", () => {
    beforeAll(() => {
        unmountAll();
    });

    test("Ensure the ModalCloseButton isn't inside.", () => {
        const wrapper = shallow(
            <TwoColumnModal sidebar="Sidebar" content="Contents" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });

    it("should render SmallTwoColumnModal on mobile", () => {
        // Arrange
        const wrapper = mount(
            <MediaLayoutContext.Provider
                value={{
                    overrideSize: undefined,
                    ssrSize: "small",
                    mediaSpec: MEDIA_DEFAULT_SPEC,
                }}
            >
                <TwoColumnModal
                    content="Content"
                    sidebar="Sidebar"
                    footer="Footer"
                />
            </MediaLayoutContext.Provider>,
        );

        // Act
        const modal = wrapper.find(SmallTwoColumnModal);

        // Assert
        expect(modal);
    });

    it("should render LargeTwoColumnModal on mobile", () => {
        // Arrange
        const wrapper = mount(
            <MediaLayoutContext.Provider
                value={{
                    overrideSize: undefined,
                    ssrSize: "large",
                    mediaSpec: MEDIA_DEFAULT_SPEC,
                }}
            >
                <TwoColumnModal
                    content="Content"
                    sidebar="Sidebar"
                    footer="Footer"
                />
            </MediaLayoutContext.Provider>,
        );

        // Act
        const modal = wrapper.find(LargeTwoColumnModal);

        // Assert
        expect(modal);
    });

    // We already capture desktop snapshots from auto generated tests
    describe("mobile", () => {
        describe("with footer", () => {
            it("should match snapshot", () => {
                // Arrange

                // Act
                const wrapper = shallow(
                    <SmallTwoColumnModal
                        content="Content"
                        fullBleedSidebar={true}
                        sidebar="Sidebar"
                        footer="Footer"
                    />,
                );

                // Assert
                expect(wrapper).toMatchSnapshot();
            });
        });

        describe("without footer", () => {
            it("should match snapshot", () => {
                // Arrange

                // Act
                const wrapper = shallow(
                    <SmallTwoColumnModal
                        fullBleedSidebar={true}
                        sidebar="Sidebar"
                        content="Content"
                    />,
                );

                // Assert
                expect(wrapper).toMatchSnapshot();
            });
        });
    });
});
