import * as React from "react";

import SearchField from "@khanacademy/wonder-blocks-search-field";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function SearchFieldSection() {
    const [value, setValue] = React.useState<string>("");
    return (
        <>
            <HeadingLarge
                id="search-field"
                tag="h3"
                style={styles.sectionLabel}
            >
                Search Field
            </HeadingLarge>

            <ComponentTile
                name="SearchField"
                href="/?path=/docs/searchfield--docs"
                description={`A text field with a search icon at its start
                    and an X icon at its end (when containing text).`}
            >
                <SearchField
                    placeholder="Search for a topic"
                    value={value}
                    onChange={(value) => setValue(value)}
                />
            </ComponentTile>
        </>
    );
}
