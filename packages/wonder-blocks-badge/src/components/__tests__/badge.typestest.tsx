import * as React from "react";
import {describe, expect, it} from "tstyche";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import cookie from "@phosphor-icons/core/regular/cookie.svg";
import {Badge} from "../badge";
import {GemBadge} from "../gem-badge";
import {StreakBadge} from "../streak-badge";
import {StatusBadge} from "../status-badge";
import {DueBadge} from "../due-badge";

const icon = <PhosphorIcon icon={cookie} aria-label="Cookie" />;

describe("Badge", () => {
    it("can have a label", () => {
        <Badge label="Badge label" />;
    });

    it("can have an icon", () => {
        <Badge icon={icon} />;
    });

    it("can have both a label and an icon", () => {
        <Badge label="Badge label" icon={icon} />;
    });
});

describe("StatusBadge", () => {
    it("can have a label", () => {
        <StatusBadge label="Badge label" />;
    });

    it("can have an icon", () => {
        <StatusBadge icon={icon} />;
    });

    it("can have both a label and an icon", () => {
        <StatusBadge label="Badge label" icon={icon} />;
    });

    it(`should accept kind="info"`, () => {
        <StatusBadge label="Badge label" kind="info" />;
    });

    it(`should accept kind="success"`, () => {
        <StatusBadge label="Badge label" kind="success" />;
    });

    it(`should accept kind="warning"`, () => {
        <StatusBadge label="Badge label" kind="warning" />;
    });

    it(`should accept kind="critical"`, () => {
        <StatusBadge label="Badge label" kind="critical" />;
    });

    it("should reject invalid kind", () => {
        // @ts-expect-error Type '"not-valid-kind"' is not assignable
        <StatusBadge label="Badge label" kind="not-valid-kind" />;
    });
});

describe("DueBadge", () => {
    it("should accept a label prop", () => {
        <DueBadge label="Badge label" />;
    });

    it("should accept showIcon={true} when iconAriaLabel is set", () => {
        <DueBadge showIcon={true} iconAriaLabel="Due" />;
    });

    it("should accept showIcon={true} when label is set", () => {
        <DueBadge showIcon={true} label="Badge" />;
    });

    it("should reject showIcon={true} with no label or aria label", () => {
        // @ts-expect-error Property 'label' is missing
        <DueBadge showIcon={true} />;
    });

    it("should accept showIcon={true} with both visible and aria labels", () => {
        <DueBadge showIcon={true} label="Badge" iconAriaLabel="Due" />;
    });
});

describe("GemBadge", () => {
    it("should accept a label prop", () => {
        <GemBadge label="Gem Badge" />;
    });

    it("should accept showIcon={true} when iconAriaLabel is set", () => {
        <GemBadge showIcon={true} iconAriaLabel="Gem" />;
    });

    it("should accept showIcon={true} when label is set", () => {
        <GemBadge showIcon={true} label="Badge" />;
    });

    it("should reject showIcon={true} with no label or aria label", () => {
        // @ts-expect-error Property 'label' is missing
        <GemBadge showIcon={true} />;
    });

    it("should accept showIcon={true} with both visible and aria labels", () => {
        <GemBadge showIcon={true} label="Badge" iconAriaLabel="Gem" />;
    });
});

describe("StreakBadge", () => {
    it("should accept a label prop", () => {
        <StreakBadge label="Gem Badge" />;
    });

    it("should accept showIcon={true} when iconAriaLabel is set", () => {
        <StreakBadge showIcon={true} iconAriaLabel="Gem" />;
    });

    it("should accept showIcon={true} when label is set", () => {
        <StreakBadge showIcon={true} label="Badge" />;
    });

    it("should reject showIcon={true} with no label or aria label", () => {
        // @ts-expect-error Property 'label' is missing
        <StreakBadge showIcon={true} />;
    });

    it("should accept showIcon={true} with both visible and aria labels", () => {
        <StreakBadge showIcon={true} label="Badge" iconAriaLabel="Gem" />;
    });
});
