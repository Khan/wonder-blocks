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
});
