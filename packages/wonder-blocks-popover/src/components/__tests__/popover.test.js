// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import Popover from "../popover.js";
import PopoverContent from "../popover-content.js";
import {PopoverContentCore} from "../../index.js";

describe("Popover", () => {
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
        expect(wrapper.find(PopoverContent)).not.toExist();
    });

    it("should render the popover content after clicking the trigger", () => {
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
        expect(wrapper.find(PopoverContent)).toExist();
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

        // open the popover
        wrapper.find("[data-anchor]").simulate("click");

        // Act
        // we try to close it from inside the content
        wrapper.find("[data-close-button]").simulate("click");

        // Assert
        expect(wrapper.find(PopoverContentCore)).not.toExist();
        expect(onCloseMock).toBeCalled();
    });
});
