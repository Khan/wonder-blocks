// @flow
import styles from "./util/styles.js";

import Title from "./components/title.js";
import HeadingLarge from "./components/heading-large.js";
import HeadingMedium from "./components/heading-medium.js";
import HeadingSmall from "./components/heading-small.js";
import HeadingXSmall from "./components/heading-xsmall.js";
import BodySerifBlock from "./components/body-serif-block.js";
import BodySerif from "./components/body-serif.js";
import BodyMonospace from "./components/body-monospace.js";
import Body from "./components/body.js";
import LabelLarge from "./components/label-large.js";
import LabelMedium from "./components/label-medium.js";
import LabelSmall from "./components/label-small.js";
import LabelXSmall from "./components/label-xsmall.js";
import Tagline from "./components/tagline.js";
import Caption from "./components/caption.js";
import Footnote from "./components/footnote.js";

/**
 * Typography components for headings or titles.
 */
export type Heading =
    | typeof Title
    | typeof HeadingLarge
    | typeof HeadingMedium
    | typeof HeadingSmall
    | typeof HeadingXSmall;

/**
 * Typography components for representing body text.
 */
export type BodyText =
    | typeof Body
    | typeof BodySerif
    | typeof BodySerifBlock
    | typeof BodyMonospace;

/**
 * Typography components for labels.
 */
export type Label =
    | typeof LabelLarge
    | typeof LabelMedium
    | typeof LabelSmall
    | typeof LabelXSmall;

/**
 * All typography components.
 */
export type Typography =
    | Heading
    | BodyText
    | Label
    | typeof Tagline
    | typeof Caption
    | typeof Footnote;

export {
    Title,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
    BodySerifBlock,
    BodySerif,
    BodyMonospace,
    Body,
    LabelLarge,
    LabelMedium,
    LabelSmall,
    LabelXSmall,
    Tagline,
    Caption,
    Footnote,
    styles,
};
