// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import Popover from "./popover.js";
import PopoverContent from "./popover-content.js";
import {PopoverContentCore} from "../index.js";

describe("Popover", () => {
    afterEach(() => {
        unmountAll();
    });

    it("should set the anchor as the popover ref", () => {
        // Arrange
        const wrapper = mount(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Act
        const anchorElement = wrapper.find("[data-anchor]").getDOMNode();

        // Assert
        expect(wrapper.state("anchorElement")).toBe(anchorElement);

        expect(wrapper.find(PopoverContent)).toHaveLength(0);
    });

    it("should hide the popover dialog by default", () => {
        // Arrange, Act
        const wrapper = mount(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Assert
        expect(wrapper.find(PopoverContent)).toHaveLength(0);
    });

    it("should render a text-only variant", () => {
        // Arrange
        const wrapper = mount(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Act
        wrapper.find("[data-anchor]").simulate("click");

        // Assert
        expect(wrapper.find(PopoverContent)).toHaveLength(1);
    });

    it("should close the popover from inside the content", () => {
        // Arrange
        const onCloseMock = jest.fn();

        const wrapper = mount(
            <Popover
                placement="top"
                onClose={onCloseMock}
                content={({close}) => (
                    <PopoverContentCore>
                        <span>custom popover</span>
                        <button data-close-button onClick={close}>
                            close popover
                        </button>
                    </PopoverContentCore>
                )}
            >
                {({open}) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Act
        // first open the popover
        wrapper.find("[data-anchor]").simulate("click");
        expect(wrapper.find(PopoverContentCore)).toHaveLength(1);
        // then we try to close it from inside the content
        wrapper.find("[data-close-button]").simulate("click");

        // Assert
        expect(onCloseMock).toBeCalled();
    });
});
