// @flow
import React from "react";
import {shallow} from "enzyme";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import ModalHeader from "./modal-header.js";

describe("ModalHeader", () => {
    test("using only `subtitle` should render the header", () => {
        const wrapper = shallow(
            <ModalHeader title="Title" subtitle="Subtitle" />,
        );

        // we make sure the component is rendered
        expect(wrapper.exists()).toBe(true);
    });

    test("using `subtitle` and `breadcrumbs` should throw", () => {
        expectRenderError(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                breadcrumbs="Breadcrumbs"
            />,
            "'subtitle' and 'breadcrumbs' can't be used together",
        );
    });
});
