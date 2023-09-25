import * as React from "react";
import PlusCircleRegular from "@phosphor-icons/core/regular/plus-circle.svg";
import PlusCircleBold from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import PlusCircleFill from "@phosphor-icons/core/fill/plus-circle-fill.svg";

// @ts-expect-error - invalid icon weight (duotone)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VideoDuoTone from "@phosphor-icons/core/duotone/video-duotone.svg";

import PhosphorIcon from "../phosphor-icon";

// Valid: small + bold
<PhosphorIcon icon={PlusCircleBold} size="small" color="green" />;

// Valid: medium + regular
<PhosphorIcon icon={PlusCircleRegular} size="medium" color="green" />;

// Valid: large + fill
<PhosphorIcon icon={PlusCircleFill} size="large" color="green" />;

// Invalid: small + regular
// @ts-expect-error - small icons only support `bold` and `fill` weights.
<PhosphorIcon icon={PlusCircleRegular} size="small" color="green" />;

// Invalid: medium + bold
// @ts-expect-error - medium icons only support `regular` and `fill` weights.
<PhosphorIcon icon={PlusCircleBold} size="medium" color="green" />;
