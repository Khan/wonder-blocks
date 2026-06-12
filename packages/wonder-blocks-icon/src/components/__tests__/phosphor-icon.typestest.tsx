import * as React from "react";
import PlusCircleRegular from "@phosphor-icons/core/regular/plus-circle.svg";
import PlusCircleBold from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import PlusCircleFill from "@phosphor-icons/core/fill/plus-circle-fill.svg";

import {PhosphorIcon} from "../phosphor-icon";

// Valid: small + bold
<PhosphorIcon icon={PlusCircleBold} size="small" color="currentColor" />;

// Valid: medium + regular
<PhosphorIcon icon={PlusCircleRegular} size="medium" color="currentColor" />;

// Valid: large + fill
<PhosphorIcon icon={PlusCircleFill} size="large" color="currentColor" />;

// Valid: small + regular
<PhosphorIcon icon={PlusCircleRegular} size="small" color="currentColor" />;

// Valid: medium + bold
<PhosphorIcon icon={PlusCircleBold} size="medium" color="currentColor" />;
