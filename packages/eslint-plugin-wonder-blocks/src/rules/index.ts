import {TSESLint} from "@typescript-eslint/utils";

import noCustomTabRole from "./no-custom-tab-role";
import noInvalidBodyTextChildren from "./no-invalid-bodytext-children";
import noInvalidBodyTextParent from "./no-invalid-bodytext-parent";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
    "no-custom-tab-role": noCustomTabRole,
    "no-invalid-bodytext-children": noInvalidBodyTextChildren,
    "no-invalid-bodytext-parent": noInvalidBodyTextParent,
};

export {rules};
