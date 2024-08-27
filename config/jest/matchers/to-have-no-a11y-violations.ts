// custom matcher for the jest-axe testing library. This uses the axe testing
// engine to flag a11y violations
// https://github.com/nickcolley/jest-axe
import {configureAxe, toHaveNoViolations} from "jest-axe";

const axe = configureAxe({
    globalOptions: {
        rules: [
            // This rule is that all content must be inside a landmark region.
            // Since our components might have a region outside of the
            // component boundary, it doesn't make sense to enable here.
            // If we were to apply this testing in a whole page context we
            // should enable in that context
            {id: "region", enabled: false},
            {
                id: "meta-viewport",
                enabled: false,
            },
        ],
    },
});

expect.extend({
    async toHaveNoA11yViolations(received: HTMLElement) {
        const result = await axe(received); // note this is the axe we configured above
        return toHaveNoViolations.toHaveNoViolations(result);
    },
});
