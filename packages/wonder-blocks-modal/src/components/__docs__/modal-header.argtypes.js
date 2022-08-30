// @flow
import * as React from "react";
import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";

const BreadcrumbsMappings: {[key: string]: React.Node} = {
    none: null,
    "lesson path": (
        <Breadcrumbs>
            <BreadcrumbsItem>
                <Link href="">Course</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
                <Link href="">Unit</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>Lesson</BreadcrumbsItem>
        </Breadcrumbs>
    ),
    "lesson path light": (
        <View style={{color: Color.white}}>
            <Breadcrumbs>
                <BreadcrumbsItem>
                    <Link href="" light={true}>
                        Course
                    </Link>
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    <Link light={true} href="">
                        Unit
                    </Link>
                </BreadcrumbsItem>
                <BreadcrumbsItem>Lesson</BreadcrumbsItem>
            </Breadcrumbs>
        </View>
    ),
};

export default {
    title: {
        control: {type: "text"},
        description: "The main title rendered in larger bold text.",
        table: {type: {summary: "string"}},
    },
    light: {
        control: {type: "boolean"},
        defaultValue: "true",

        description: `Whether to display the "light" version of this
            component instead, for use when the item is used on a dark
            background.`,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
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
        options: (Object.keys(BreadcrumbsMappings): Array<React.Node>),
        mapping: BreadcrumbsMappings,
        table: {type: {summary: "React.Element<Breadcrumbs>"}},
    },
};
