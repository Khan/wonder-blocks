import * as React from "react";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import Link from "@khanacademy/wonder-blocks-link";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {
    name,
    version,
} from "../../packages/wonder-blocks-breadcrumbs/package.json";

import BreadcrumbsArgTypes from "./breadcrumbs.argtypes";
import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Breadcrumbs",
    component: Breadcrumbs,
    subcomponents: {BreadcrumbsItem},
    argTypes: BreadcrumbsArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
};

/**
 * Default Breadcrumbs example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => (
    <Breadcrumbs {...args}>
        <BreadcrumbsItem>
            <Link href="">Course</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
            <Link href="">Unit</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>Lesson</BreadcrumbsItem>
    </Breadcrumbs>
);
