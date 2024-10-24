import * as React from "react";

import SearchField from "@khanacademy/wonder-blocks-search-field";

import ComponentTile from "../component-tile";

export default function SearchFieldTile() {
    const [value, setValue] = React.useState<string>("");
    return (
        <ComponentTile
            name="SearchField"
            href="/?path=/docs/packages-searchfield--docs"
            description={`A text field with a search icon at its start
                    and an X icon at its end (when containing text).`}
        >
            <SearchField
                placeholder="Search for a topic"
                value={value}
                onChange={(value) => setValue(value)}
            />
        </ComponentTile>
    );
}
