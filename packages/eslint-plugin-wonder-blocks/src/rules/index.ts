import {TSESLint} from "@typescript-eslint/utils";

import noCustomTabRole from "./no-custom-tab-role";
import noExcessiveBodyTextChildren from "./no-excessive-bodytext-children";
import noInvalidBodyTextChildren from "./no-invalid-bodytext-children";
import noInvalidBodyTextParent from "./no-invalid-bodytext-parent";
import noRawButton from "./no-raw-button";
import requireLogicalPropertiesForRtl from "./require-logical-properties-for-rtl";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
    "no-custom-tab-role": noCustomTabRole,
    "no-excessive-bodytext-children": noExcessiveBodyTextChildren,
    "no-invalid-bodytext-children": noInvalidBodyTextChildren,
    "no-invalid-bodytext-parent": noInvalidBodyTextParent,
    "no-raw-button": noRawButton,
    "require-logical-properties-for-rtl": requireLogicalPropertiesForRtl,
};

export {rules};
