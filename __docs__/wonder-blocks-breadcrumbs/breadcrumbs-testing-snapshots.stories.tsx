import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";

import {allThemeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

const rows = [
    {
        name: "Default",
        props: {
            children: [
                <BreadcrumbsItem>
                    <Link href="#course">Course</Link>
                </BreadcrumbsItem>,
                <BreadcrumbsItem>
                    <Link href="#unit">Unit</Link>
                </BreadcrumbsItem>,
                <BreadcrumbsItem>Lesson</BreadcrumbsItem>,
            ],
        },
    },
    {
        name: "Single breadcrumb",
        props: {children: <BreadcrumbsItem>Lesson</BreadcrumbsItem>},
    },
];

const columns = [{name: "Default", props: {}}];

type Story = StoryObj<typeof Breadcrumbs>;

/**
 * The following stories are used to generate the pseudo states for the
 * Breadcrumbs component. This is only used for visual testing in Chromatic.
 *
 * Breadcrumbs is a composition-based component, so the states that matter for
 * theming are the link states (rest/hover/press/focus), the separator color,
 * and the current-page (plain text) item. The StateSheet renders a
 * representative trail in each pseudo state across every theme mode.
 */
const meta = {
    title: "Packages / Breadcrumbs / Testing / Snapshots / Breadcrumbs",
    component: Breadcrumbs,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, name}) => (
                    <Breadcrumbs {...props} aria-label={name} />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};
