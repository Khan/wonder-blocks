// @flow
import React from "react";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import ModalHeader from "./modal-header.js";

describe("ModalHeader", () => {
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
