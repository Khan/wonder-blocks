import Announcer from "./announcer";

/**
 * Inject live regions inside a modal element so that announcements are
 * audible while the modal is open.
 *
 * Call this when the `aria-modal` element mounts (e.g. in a `useEffect`).
 * Regions are created eagerly so screen readers have time to register them
 * before the first announcement fires.
 *
 * Wonder Blocks modal components call this automatically — you only need this
 * if you're using a custom modal outside of Wonder Blocks.
 *
 * @param modalElement The element with `role="dialog"` and `aria-modal="true"`.
 */
export function attachAnnouncerToModal(modalElement: HTMLElement) {
    Announcer.getInstance().attachAnnouncerToModal(modalElement);
}

/**
 * Remove the live region container from a modal element and clean up
 * internal state. Call this when the modal unmounts (e.g. in a `useEffect`
 * cleanup).
 *
 * @param modalElement The element previously passed to `attachAnnouncerToModal`.
 */
export function detachAnnouncerFromModal(modalElement: HTMLElement) {
    Announcer.getInstance().detachAnnouncerFromModal(modalElement);
}
