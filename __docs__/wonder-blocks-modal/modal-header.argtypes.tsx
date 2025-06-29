import * as React from "react";
import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import Link from "@khanacademy/wonder-blocks-link";

const BreadcrumbsMappings: {
    [key: string]: React.ReactNode;
} = {
    none: null,
    "lesson path": (
        <Breadcrumbs>
            <BreadcrumbsItem>
                <Link href="#course">Course</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
                <Link href="#unit">Unit</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>Lesson</BreadcrumbsItem>
        </Breadcrumbs>
    ),
};

export default {
    title: {
        control: {type: "text"},
        description: "The main title rendered in larger bold text.",
        table: {type: {summary: "string"}},
    },
    titleId: {
        control: {type: "text"},
        description: `An id to provide a selector for the title element.
            Use this as the \`aria-labelledby\` value on the encompassing
            \`<ModalDialog>\`.`,
        table: {
            type: {summary: "string"},
        },
    },
    testId: {
        control: {type: "text"},
        description: `Test ID used for e2e testing.\n\nIn this case, this
            component is internal, so \`testId\` is composed with the
            \`testId\` passed down from the Dialog variant + a suffix to scope
            it to this component. If the dialog \`testId\` is
            \`"some-random-id"\` then the header will have the \`testId\`
            \`"some-random-id-modal-header"\`.`,
        table: {
            type: {summary: "string"},
        },
    },
    subtitle: {
        control: {type: "text"},
        description: "The dialog subtitle.",
        table: {type: {summary: "string"}},
    },
    breadcrumbs: {
        control: {type: "select"},
        description: `Adds a breadcrumb-trail, appearing in the ModalHeader,
            above the title.`,
        options: Object.keys(BreadcrumbsMappings) as Array<React.ReactNode>,
        mapping: BreadcrumbsMappings,
        table: {type: {summary: "React.Element<Breadcrumbs>"}},
    },
};
