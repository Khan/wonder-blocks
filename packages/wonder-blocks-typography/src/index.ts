import styles from "./util/styles";

import Heading from "./components/heading";
import BodyText from "./components/body-text";
import BodyMonospace from "./components/body-monospace";

/**
 * Typography components for headings or titles.
 */
export type HeadingComponents = typeof Heading;

/**
 * Typography components for representing body text.
 */
export type BodyComponents = typeof BodyText | typeof BodyMonospace;

/**
 * All typography components.
 */
export type Typography = HeadingComponents | BodyComponents;

export {Heading, BodyText, BodyMonospace, styles};
