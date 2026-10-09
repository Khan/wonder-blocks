import * as React from "react";

import {useWonderBlocksI18n} from "@khanacademy/wonder-blocks-config";

import {getDefaultComboboxLabels, getDefaultLabels} from "../util/constants";

/**
 * Returns the default labels for SingleSelect, MultiSelect and DropdownCore
 * using the strings provided by `WonderBlocksConfigProvider`.
 */
export const useDefaultLabels = () => {
    const {strings} = useWonderBlocksI18n();
    return React.useMemo(() => getDefaultLabels(strings), [strings]);
};

/**
 * Returns the default labels for Combobox using the strings provided by
 * `WonderBlocksConfigProvider`.
 */
export const useDefaultComboboxLabels = () => {
    const {strings} = useWonderBlocksI18n();
    return React.useMemo(() => getDefaultComboboxLabels(strings), [strings]);
};
