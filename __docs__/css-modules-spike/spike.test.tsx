import * as React from "react";
import {render, screen} from "@testing-library/react";

import {Spike} from "./spike";
import styles from "./spike.module.css";

describe("CSS Modules Jest wiring", () => {
    it("returns the class name as-is via identity-obj-proxy", () => {
        // identity-obj-proxy makes any property access on the imported
        // CSS Modules object return the property name. This is what
        // lets className equality checks work in tests without running
        // the real PostCSS pipeline.
        expect(styles.root).toBe("root");
        expect(styles.pill).toBe("pill");
    });

    it("renders the mocked class names onto the DOM", () => {
        render(<Spike label="Spike button" badge="NEW" />);

        expect(screen.getByRole("button")).toHaveClass("root");
        expect(screen.getByText("NEW")).toHaveClass("pill");
    });

    it("renders the inverse variant using the action mixin class", () => {
        // The visual expansion of `--wb-action-inverse` is verified by the
        // real PostCSS pipeline in Storybook; here we only assert the wiring
        // that selects the inverse class (identity-obj-proxy stubs CSS).
        render(<Spike label="Inverse spike button" inverse={true} />);

        expect(screen.getByRole("button")).toHaveClass("inverse");
    });
});
