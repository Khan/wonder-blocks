import * as React from "react";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import Link from "@khanacademy/wonder-blocks-link";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {
    name,
    version,
} from "../../packages/wonder-blocks-breadcrumbs/package.json";
import ComponentInfo from "../../.storybook/components/component-info";

import BreadcrumbsArgTypes from "./breadcrumbs.argtypes";

export default {
    title: "Breadcrumbs",
    component: Breadcrumbs,
    subcomponents: {BreadcrumbsItem},
    argTypes: BreadcrumbsArgTypes,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
} as ComponentMeta<typeof Breadcrumbs>;

type StoryComponentType = ComponentStory<typeof Breadcrumbs>;

/**
 * Default Breadcrumbs example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
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
