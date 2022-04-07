// @flow
import * as React from "react";

import Link from "@khanacademy/wonder-blocks-link";
import type {StoryComponentType} from "@storybook/react";

import Breadcrumbs from "../breadcrumbs.js";
import BreadcrumbsItem from "../breadcrumbs-item.js";

import BreadcrumbsArgTypes from "./breadcrumbs.argtypes.js";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Breadcrumbs / Breadcrumbs",
    component: Breadcrumbs,
    subcomponents: {BreadcrumbsItem},
    argTypes: BreadcrumbsArgTypes,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

/**
 * Default Breadcrumbs example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */

const Template = (args) => (
    <Breadcrumbs {...args}>
        <BreadcrumbsItem>
            <Link href="">Course</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
            <Link href="">Unit</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
            <Link href="">Lesson</Link>
        </BreadcrumbsItem>
    </Breadcrumbs>
);

export const DefaultBreadcrumbs: StoryComponentType = Template.bind({});
