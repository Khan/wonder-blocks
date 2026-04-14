import * as React from "react";
import {describe, it} from "tstyche";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";

import {ActivityIconButton} from "../activity-icon-button";

describe("ActivityIconButton", () => {
    it("should accept aria-label only", () => {
        <ActivityIconButton
            icon={plusCircle}
            aria-label="Add item"
            onClick={() => {}}
        />;
    });

    it("should accept label only", () => {
        <ActivityIconButton icon={plusCircle} label="Add" onClick={() => {}} />;
    });

    it("should require either label or aria-label", () => {
        // @ts-expect-error Property 'label' is missing
        <ActivityIconButton icon={plusCircle} onClick={() => {}} />;
    });

    it("should reject the combination of label and aria-label", () => {
        // @ts-expect-error Types of property 'label' are incompatible
        <ActivityIconButton
            icon={plusCircle}
            aria-label="Add item"
            label="Add"
            onClick={() => {}}
        />;
    });
});
