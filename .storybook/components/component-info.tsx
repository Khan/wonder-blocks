import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Caption} from "@khanacademy/wonder-blocks-typography";
import githubLogo from "@phosphor-icons/core/fill/github-logo-fill.svg";

type Props = {
    /**
     * The package name.
     */
    name: string,
    /**
     * The latest stable version.
     */
    version: string
};

/**
 * An internal component that displays the package name and version. It also
 * includes a link to the Github repo.
 */
const ComponentInfo: React.FC<Props> = (
    {
        name,
        version,
    },
): React.ReactElement => {
    const packageFolder = name.split("/")?.[1];
    return (
        <View
            style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
            }}
        >
            <Caption>
                {name}@{version}
            </Caption>
            <Button
                kind="secondary"
                href={`https://github.com/Khan/wonder-blocks/tree/main/packages/${packageFolder}`}
                target="_blank"
                style={{color: "black"}}
                icon={githubLogo}
            >
                Source code
            </Button>
        </View>
    );
};

export default ComponentInfo;
