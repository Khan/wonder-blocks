/**
 * The attribute used to identify a modal launcher portal.
 */
const ModalLauncherPortalAttributeName = "data-modal-launcher-portal";

/* Pure height values */
const height = {
    smMin: 500, // Arbitary breakpoint for screen height
} as const;

const width = {
    mid: 767,
} as const;

const modalMediaQuery = {
    midOrSmaller: `@media screen and (max-width: ${width.mid}px) /* breakpoint.mediaQuery.midOrSmaller */`,
    midOrLarger: `@media screen and (min-width: ${width.mid}px) /* breakpoint.mediaQuery.midOrLarger */`,
    smMinOrSmallerHeight: `@media screen and (max-height:${height.smMin}px)`,
};

export {ModalLauncherPortalAttributeName, modalMediaQuery};
