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
                        <Link href="#course" target="_blank">
                            Course
                        </Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                        <Link href="#unit" target="_blank">
                            Unit
                        </Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                </Breadcrumbs>
            </View>
        </ComponentTile>
    );
}
