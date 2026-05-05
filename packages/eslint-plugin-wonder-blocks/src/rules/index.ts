import {TSESLint} from "@typescript-eslint/utils";

import noCustomTabRole from "./no-custom-tab-role";
import noInvalidBodyTextParent from "./no-invalid-bodytext-parent";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
    "no-custom-tab-role": noCustomTabRole,
    "no-invalid-bodytext-parent": noInvalidBodyTextParent,
};

export {rules};
