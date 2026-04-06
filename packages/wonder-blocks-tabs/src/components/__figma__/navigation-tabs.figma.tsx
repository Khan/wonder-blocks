import * as React from "react";
import {figma} from "@figma/code-connect";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabs} from "../navigation-tabs";
import {NavigationTabItem} from "../navigation-tab-item";

const TAB_LINK_1 = "";
const TAB_LINK_2 = "";
const ARIA_LABEL = "";
const SHOULD_ANIMATE = false;

figma.connect(
    NavigationTabs,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=2156%3A77",
    {
        props: {
            // The number of tabs in the Figma component (2-6)
            tabName1: figma.textContent("Tab 1"),
            tabName2: figma.textContent("Tab 2"),
            tabCount: figma.enum("Tabs", {
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
            }),
        },
        example: (props: any) => {
            return (
                /* If navigating between pages, use NavigationTabs. If we're flipping between content in page, use Tabs. If unclear ASK ME TO CLARIFY!*/
                <NavigationTabs
                    aria-label={ARIA_LABEL} // if multiple NavigationTabs on page, label needed for a11y. If Figma shows a visible label, use `aria-labelledby={LABEL_ID}` instead
                    animated={SHOULD_ANIMATE} // Defaults to false. Utilize "usePrefersReducedMotion" hook
                >
                    <NavigationTabItem current>
                        {/* Add "current" attr to the tab associated with the current page */}
                        <Link href={TAB_LINK_1}>{props.tabName1}</Link>
                    </NavigationTabItem>
                    <NavigationTabItem>
                        <Link href={TAB_LINK_2}>{props.tabName2}</Link>
                    </NavigationTabItem>
                    {/* ... as many tabs as needed (reference props.tabCount) */}
                </NavigationTabs>
            );
        },
    },
);
