import {TSESLint} from "@typescript-eslint/utils";

import noCustomTabRole from "./no-custom-tab-role";
import noExcessiveBodyTextChildren from "./no-excessive-bodytext-children";
import noHardcodedColor from "./no-hardcoded-color";
import noInvalidBodyTextChildren from "./no-invalid-bodytext-children";
import noInvalidBodyTextParent from "./no-invalid-bodytext-parent";
import noRawButton from "./no-raw-button";
import noRtlIconSwap from "./no-rtl-icon-swap";
import requireLogicalPropertiesForRtl from "./require-logical-properties-for-rtl";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
    "no-custom-tab-role": noCustomTabRole,
    "no-excessive-bodytext-children": noExcessiveBodyTextChildren,
    "no-hardcoded-color": noHardcodedColor,
    "no-invalid-bodytext-children": noInvalidBodyTextChildren,
    "no-invalid-bodytext-parent": noInvalidBodyTextParent,
    "no-raw-button": noRawButton,
    "no-rtl-icon-swap": noRtlIconSwap,
    "require-logical-properties-for-rtl": requireLogicalPropertiesForRtl,
};

export {rules};
