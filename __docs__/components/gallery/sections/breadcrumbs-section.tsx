import * as React from "react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge id="breadcrumbs" tag="h3" style={styles.sectionLabel}>
                Breadcrumbs
            </HeadingLarge>
            <ComponentTile
                name="Breadcrumbs"
                href="/?path=/docs/breadcrumbs--docs"
                description={`A breadcrumb trail consists of a list of
                    links to the parent pages of the current page in
                    hierarchical order. It helps users find their place
                    within a website or web application.`}
            >
                <View style={styles.centerContent}>
                    <Breadcrumbs>
                        <BreadcrumbsItem>
                            <Link href="">Course</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>
                            <Link href="">Unit</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                    </Breadcrumbs>
                </View>
            </ComponentTile>
        </>
    );
}
