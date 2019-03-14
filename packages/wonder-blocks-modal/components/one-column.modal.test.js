// @flow
import * as React from "react";
import {shallow} from "enzyme";

import {
    MediaLayoutContext,
    MEDIA_DEFAULT_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import OneColumnModal, {
    SmallOneColumnModal,
    LargeOneColumnModal,
} from "./one-column-modal.js";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

describe("OneColumnModal", () => {
    beforeEach(() => {
        unmountAll();
    });

    it("should render SmallOneColumnModal on mobile", () => {
        // Arrange
        const wrapper = mount(
            <MediaLayoutContext.Provider
                value={{
                    overrideSize: undefined,
                    ssrSize: "small",
                    mediaSpec: MEDIA_DEFAULT_SPEC,
                }}
            >
                <OneColumnModal content="Content" footer="Footer" />
            </MediaLayoutContext.Provider>,
        );

        // Act
        const modal = wrapper.find(SmallOneColumnModal);

        // Assert
        expect(modal);
    });

    it("should render LargeOneColumnModal on desktop", () => {
        // Arrange
        const wrapper = mount(
            <MediaLayoutContext.Provider
                value={{
                    overrideSize: undefined,
                    ssrSize: "large",
                    mediaSpec: MEDIA_DEFAULT_SPEC,
                }}
            >
                <OneColumnModal content="Content" footer="Footer" />
            </MediaLayoutContext.Provider>,
        );

        // Act
        const modal = wrapper.find(LargeOneColumnModal);

        // Assert
        expect(modal);
    });

    // We already capture desktop snapshots from auto generated tests
    describe("mobile", () => {
        test("with footer", () => {
            const wrapper = shallow(
                <SmallOneColumnModal content="Content" footer="Footer" />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        test("without footer", () => {
            const wrapper = shallow(<SmallOneColumnModal content="Content" />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
