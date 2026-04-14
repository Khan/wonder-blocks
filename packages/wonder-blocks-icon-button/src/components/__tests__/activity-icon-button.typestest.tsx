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

// @ts-expect-error Property 'label' is missing
<ActivityIconButton icon={plusCircle} onClick={() => {}} />;

// @ts-expect-error Types of property 'label' are incompatible
<ActivityIconButton
    icon={plusCircle}
    aria-label="Add item"
    label="Add"
    onClick={() => {}}
/>;
