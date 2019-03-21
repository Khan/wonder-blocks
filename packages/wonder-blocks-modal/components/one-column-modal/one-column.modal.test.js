// @flow
import * as React from "react";
import {shallow} from "enzyme";

import {
    MediaLayoutContext,
    MEDIA_DEFAULT_SPEC,
} from "@khanacademy/wonder-blocks-layout";
import OneColumnModal from "./one-column-modal.js";
import LargeOneColumnModal from "./large-one-column-modal.js";
import SmallOneColumnModal from "./small-one-column-modal.js";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

describe("OneColumnModal", () => {
    beforeEach(() => {
        unmountAll();
    });

    it("should render SmallOneColumnModal on mobile", () => {
        // Arrange

        // Act
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
        const modal = wrapper.find(SmallOneColumnModal);

        // Assert
        expect(modal);
    });

    it("should render LargeOneColumnModal on desktop", () => {
        // Arrange

        // Act
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
        const modal = wrapper.find(LargeOneColumnModal);

        // Assert
        expect(modal);
    });

    // We already capture desktop snapshots from auto generated tests
    describe("mobile", () => {
        describe("with footer", () => {
            it("should match snapshot", () => {
                // Arrange, Act
                const wrapper = shallow(
                    <SmallOneColumnModal content="Content" footer="Footer" />,
                );

                // Assert
                expect(wrapper).toMatchSnapshot();
            });
        });

        describe("without footer", () => {
            it("should match snapshot", () => {
                // Arrange, Act
                const wrapper = shallow(
                    <SmallOneColumnModal content="Content" />,
                );

                // Assert
                expect(wrapper).toMatchSnapshot();
            });
        });
    });
});
