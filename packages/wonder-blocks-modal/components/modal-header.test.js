// @flow
import React from "react";
import {shallow} from "enzyme";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import expectRenderError from "../../../utils/testing/expect-render-error.js";
import ModalHeader from "./modal-header.js";

const exampleBreadcrumbs = (
    <Breadcrumbs>
        <BreadcrumbsItem>test</BreadcrumbsItem>
    </Breadcrumbs>
);

describe("ModalHeader", () => {
    test("renders the title by default", () => {
        // Arrange, Act
        const wrapper = shallow(<ModalHeader title="Title" />);

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("using only `breadcrumbs` should render the header", () => {
        // Arrange, Act
        const wrapper = shallow(
            <ModalHeader title="Title" breadcrumbs={exampleBreadcrumbs} />,
        );

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("using only `subtitle` should render the header", () => {
        // Arrange, Act
        const wrapper = shallow(
            <ModalHeader title="Title" subtitle="Subtitle" />,
        );

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    test("using `subtitle` and `breadcrumbs` should throw", () => {
        expectRenderError(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                breadcrumbs={exampleBreadcrumbs}
            />,
            "'subtitle' and 'breadcrumbs' can't be used together",
        );
    });
});
