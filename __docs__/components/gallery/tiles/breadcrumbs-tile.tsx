import * as React from "react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {CommonTileProps} from "../types";

export default function BreadcrumbsTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="Breadcrumbs"
            href="/?path=/docs/packages-breadcrumbs--docs"
            description={`A breadcrumb trail consists of a list of
                    links to the parent pages of the current page in
                    hierarchical order. It helps users find their place
                    within a website or web application.`}
            {...props}
        >
            <View style={styles.centerContent}>
                <Breadcrumbs>
                    <BreadcrumbsItem>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- TODO: Address a11y error */}
                        <Link href="">Course</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- TODO: Address a11y error */}
                        <Link href="">Unit</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                </Breadcrumbs>
            </View>
        </ComponentTile>
    );
}
