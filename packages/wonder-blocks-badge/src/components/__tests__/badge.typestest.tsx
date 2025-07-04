import * as React from "react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import cookie from "@phosphor-icons/core/regular/cookie.svg";
import {Badge} from "../badge";
import {GemBadge} from "../gem-badge";
import {StreakBadge} from "../streak-badge";
import {StatusBadge} from "../status-badge";
import {DueBadge} from "../due-badge";

const icon = <PhosphorIcon icon={cookie} aria-label="Cookie" />;

/**
 * Badge
 */

<Badge label="Badge label" />;

<Badge label="Badge label" icon={icon} />;

<Badge icon={icon} />;

/**
 * StatusBadge
 */

<StatusBadge label="Badge label" />;

<StatusBadge label="Badge label" icon={icon} />;

<StatusBadge icon={icon} />;

<StatusBadge label="Badge label" kind="info" />;
<StatusBadge label="Badge label" kind="success" />;
<StatusBadge label="Badge label" kind="warning" />;
<StatusBadge label="Badge label" kind="critical" />;

// @ts-expect-error - kind must be valid
<StatusBadge label="Badge label" kind="not-valid-kind" />;

/**
 * DueBadge
 */

<DueBadge label="Badge label" />;

<DueBadge showIcon={true} iconAriaLabel="Due" />;

// @ts-expect-error -- iconAriaLabel is required when showIcon is true and there is no label
<DueBadge showIcon={true} />;

// iconAriaLabel is not required if label is provided
<DueBadge showIcon={true} label="Badge" />;

<DueBadge showIcon={true} label="Badge" iconAriaLabel="Due" />;

/**
 * GemBadge
 */

<GemBadge label="Gem Badge" />;

<GemBadge showIcon={true} iconAriaLabel="Gem" />;

// @ts-expect-error -- iconAriaLabel is required when showIcon is true and there is no label
<GemBadge showIcon={true} />;

// iconAriaLabel is not required if label is provided
<GemBadge showIcon={true} label="Badge" />;

<GemBadge showIcon={true} label="Badge" iconAriaLabel="Gem" />;

/**
 * StreakBadge
 */

<StreakBadge label="Gem Badge" />;

<StreakBadge showIcon={true} iconAriaLabel="Gem" />;

// @ts-expect-error -- iconAriaLabel is required when showIcon is true and there is no label
<StreakBadge showIcon={true} />;

// iconAriaLabel is not required if label is provided
<StreakBadge showIcon={true} label="Badge" />;

<StreakBadge showIcon={true} label="Badge" iconAriaLabel="Gem" />;
