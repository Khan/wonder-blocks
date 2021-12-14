// @flow
import * as React from "react";
import {mount, shallow} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";

import ModalHeader from "../modal-header.js";

const exampleBreadcrumbs: React.Element<typeof Breadcrumbs> = (
    <Breadcrumbs>
        <BreadcrumbsItem>test</BreadcrumbsItem>
    </Breadcrumbs>
);

describe("ModalHeader", () => {
    test("renders the title by default", () => {
        // Arrange, Act
        const wrapper = shallow(
            <ModalHeader title="Title" titleId="modal-title" />,
        );

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("using only `breadcrumbs` should render the header", () => {
        // Arrange, Act
        const wrapper = shallow(
            <ModalHeader
                title="Title"
                breadcrumbs={exampleBreadcrumbs}
                titleId="modal-title"
            />,
        );

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("using only `subtitle` should render the header", () => {
        // Arrange, Act
        const wrapper = shallow(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                titleId="modal-title"
            />,
        );

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("testId should be added to the title", () => {
        // Arrange
        const wrapper = mount(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                testId="test-example-header"
                titleId="modal-title"
            />,
        );

        // Act
        const title = wrapper.find(
            `[data-test-id="test-example-header-title"]`,
        );

        // Assert
        expect(title).toHaveLength(1);
    });

    test("testId should be added to the subtitle", () => {
        // Arrange
        const wrapper = mount(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                testId="test-example-header"
                titleId="modal-title"
            />,
        );

        // Act
        const subtitle = wrapper.find(
            `[data-test-id="test-example-header-subtitle"]`,
        );

        // Assert
        expect(subtitle).toHaveLength(1);
    });
});
