import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import Link from "@khanacademy/wonder-blocks-link";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import packageConfig from "../../packages/wonder-blocks-breadcrumbs/package.json";
import ComponentInfo from "../components/component-info";

import BreadcrumbsArgTypes from "./breadcrumbs.argtypes";

const meta: Meta<typeof Breadcrumbs> = {
    title: "Packages / Breadcrumbs",
    component: Breadcrumbs,
    argTypes: BreadcrumbsArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export default meta;

type StoryComponentType = StoryObj<typeof Breadcrumbs>;

/**
 * Default Breadcrumbs example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
export const Default: StoryComponentType = {
    args: {
        children: [
            <BreadcrumbsItem>
                <Link href="#course">Course</Link>
            </BreadcrumbsItem>,
            <BreadcrumbsItem>
                <Link href="#unit">Unit</Link>
            </BreadcrumbsItem>,
            <BreadcrumbsItem>Lesson</BreadcrumbsItem>,
        ],
        "aria-label": "Navigation Menu",
    },
};
