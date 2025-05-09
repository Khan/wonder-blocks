import styles from "./util/styles";

import Title from "./components/title";
import Heading from "./components/heading";
import HeadingLarge from "./components/heading-large";
import HeadingMedium from "./components/heading-medium";
import HeadingSmall from "./components/heading-small";
import HeadingXSmall from "./components/heading-xsmall";
import BodyText from "./components/body-text";
import BodySerifBlock from "./components/body-serif-block";
import BodySerif from "./components/body-serif";
import BodyMonospace from "./components/body-monospace";
import Body from "./components/body";
import LabelLarge from "./components/label-large";
import LabelMedium from "./components/label-medium";
import LabelSmall from "./components/label-small";
import LabelXSmall from "./components/label-xsmall";
import Tagline from "./components/tagline";
import Caption from "./components/caption";
import Footnote from "./components/footnote";

/**
 * Typography components for headings or titles.
 */
export type HeadingComponents =
    | typeof Title
    | typeof Heading
    | typeof HeadingLarge
    | typeof HeadingMedium
    | typeof HeadingSmall
    | typeof HeadingXSmall;

/**
 * Typography components for representing body text.
 */
export type BodyComponents =
    | typeof Body
    | typeof BodyText
    | typeof BodySerif
    | typeof BodySerifBlock
    | typeof BodyMonospace;

/**
 * Typography components for labels.
 */
export type LabelComponents =
    | typeof LabelLarge
    | typeof LabelMedium
    | typeof LabelSmall
    | typeof LabelXSmall;

/**
 * All typography components.
 */
export type Typography =
    | HeadingComponents
    | BodyComponents
    | LabelComponents
    | typeof Tagline
    | typeof Caption
    | typeof Footnote;

export {
    Title,
    Heading,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
    BodyText,
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
