// @flow
// Helper for chaining event handlings.
export default function(
    ref: ?(Element | Document),
    event: Event,
): Promise<void> {
    if (!ref) {
        throw new Error("No element");
    }
    ref.dispatchEvent(event);

    return new Promise((r) => setTimeout(() => r(), 0));
}
