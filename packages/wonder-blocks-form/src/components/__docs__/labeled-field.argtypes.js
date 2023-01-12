// @flow
import * as React from "react";

import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import SearchField from "@khanacademy/wonder-blocks-search-field";

export const FieldMappings: {|[key: string]: React.Node|} = {
    SingleSelect: (
        <SingleSelect
            alignment="right"
            onChange={() => {}}
            selectedValue={null}
            placeholder="Choose a drink"
        >
            <OptionItem label="Regular milk tea with boba" value="regular" />
            <OptionItem
                label="Wintermelon milk tea with boba"
                value="wintermelon"
            />
            <OptionItem label="Taro milk tea, half sugar" value="taro" />
        </SingleSelect>
    ),
    SearchField: (
        <SearchField
            id="some-search-field-id"
            placeholder="Search"
            onChange={() => {}}
            value=""
        />
    ),
};

export default {
    label: {
        control: {
            type: "text",
        },
    },
    description: {
        control: {
            type: "text",
        },
    },
    error: {
        control: {
            type: "text",
        },
    },
    field: {
        control: {type: "select"},
        options: (Object.keys(FieldMappings): Array<React.Node>),
        mapping: FieldMappings,
    },
};
