import * as React from "react";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";

import {ActivityIconButton} from "../activity-icon-button";

// Valid: aria-label only
<ActivityIconButton
    icon={plusCircle}
    aria-label="Add item"
    onClick={() => {}}
/>;

// Valid: label only
<ActivityIconButton icon={plusCircle} label="Add" onClick={() => {}} />;

// @ts-expect-error - no label/aria-label set
<ActivityIconButton icon={plusCircle} onClick={() => {}} />;

// @ts-expect-error - only one of aria-label or label should be set
<ActivityIconButton
    icon={plusCircle}
    aria-label="Add item"
    label="Add"
    onClick={() => {}}
/>;
