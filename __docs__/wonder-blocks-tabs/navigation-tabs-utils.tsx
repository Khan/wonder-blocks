import * as React from "react";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Link from "@khanacademy/wonder-blocks-link";

export const generateChildren = (
    numItems: number,
    label: string,
    showIcons: boolean = false,
) => {
    return Array(numItems)
        .fill(0)
        .map((_, index) => (
            <NavigationTabItem current={index === 0}>
                <Link
                    href={`#link-${index + 1}`}
                    startIcon={
                        showIcons ? (
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        ) : undefined
                    }
                    endIcon={
                        showIcons ? (
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        ) : undefined
                    }
                >
                    {label}
                </Link>
            </NavigationTabItem>
        ));
};
