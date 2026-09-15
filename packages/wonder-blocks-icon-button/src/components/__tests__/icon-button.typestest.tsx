import * as React from "react";
import {describe, it} from "tstyche";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {IconButton} from "../icon-button";

describe("IconButton", () => {
    it("should accept aria-label", () => {
        <IconButton
            icon={magnifyingGlass}
            aria-label="Search"
            onClick={() => {}}
        />;
    });

    it("should require aria-label", () => {
        // @ts-expect-error Property '"aria-label"' is missing
        <IconButton icon={magnifyingGlass} onClick={() => {}} />;
    });
});
