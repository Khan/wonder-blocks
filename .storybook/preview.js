import {addDecorator, addParameters} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import {jsxDecorator} from "storybook-addon-jsx";

addParameters({
    options: {
        showAddonPanel: false,
    },
});

addDecorator(withKnobs);
addDecorator(jsxDecorator);
