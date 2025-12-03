import {beforeAll} from "vitest";
import {setProjectAnnotations} from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

import * as projectAnnotations from "./preview";

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([
    projectAnnotations,
    a11yAddonAnnotations,
]);

beforeAll(project.beforeAll);
