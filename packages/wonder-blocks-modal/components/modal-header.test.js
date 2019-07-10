// @flow
import * as React from "react";
import {shallow} from "enzyme";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import ModalHeader from "./modal-header.js";

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
});
