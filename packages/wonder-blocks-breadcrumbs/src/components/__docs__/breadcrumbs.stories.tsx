import * as React from "react";

import Link from "@khanacademy/wonder-blocks-link";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import Breadcrumbs from "../breadcrumbs";
import BreadcrumbsItem from "../breadcrumbs-item";

import BreadcrumbsArgTypes from "./breadcrumbs.argtypes";
import ComponentInfo from "../../../../../.storybook/components/component-info";
import {name, version} from "../../../package.json";

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
