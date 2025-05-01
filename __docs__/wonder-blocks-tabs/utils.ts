export function startViewTransition({
    update,
    types,
}: {
    update: () => void;
    types: string[];
}) {
    if (document.startViewTransition) {
        document.startViewTransition({update, types});
    } else {
        update();
    }
}
