import * as React from "react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import Link from "@khanacademy/wonder-blocks-link";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Breadcrumbs
            </HeadingLarge>
            <ComponentTile
                name="Breadcrumbs"
                href="/?path=/docs/breadcrumbs--docs"
            >
                <Breadcrumbs>
                    <BreadcrumbsItem>
                        <Link href="">Course</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                        <Link href="">Unit</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                </Breadcrumbs>
            </ComponentTile>
        </>
    );
}
