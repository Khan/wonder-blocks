// @flow
/**
 * Determine if an element is obscured by other elements.
 *
 * This uses document.elementFromPoint to see if the given element is being
 * overdrawn by another element. Note that this won't work if the given element
 * has `pointer-events: none`.
 */
export default function isObscured(element: Element): boolean {
    // TODO(somewhatabstract): We should be smarter in this algorithm and
    // actually look at the intersection of the elements doing the obscuring
    // just as we already do with our scroll parent intersections. That way we
    // can not only check that the entire element is obscured, but think about
    // partial obscurement so we can move the tooltip bubble when it's anchor
    // point is not visible.

    // Before we assume we're visible let's check to see if something else
    // is obscuring us.  Here we make the assumption that if our topleft and
    // bottomright corners are covered by something, we're not visible.
    // There are ways that this can still not work, such as different
    // elements only covering those points and the remainder being visible,
    // or if some covering element has none for pointer-events style, but
    // those edge cases shouldn't bother the main usages for this method.

    // NOTE: If the anchor element has `pointer-events: none`, we're always
    // going to end up hiding, so, you know, probably don't do that.
    // We're not explicitly checking for that CSS since it's a corner-case and
    // would impact perf of the regular cases if we were always checking it.
    // TODO(somewhatabstract): Consider how we might mitigate the pointer-events
    // issue and make this call more robust.
    const anchorRect = element.getBoundingClientRect();
    const style =
        ((element: any).currentStyle: ?CSSStyleDeclaration) ||
        window.getComputedStyle(element);
    const anchorLeft =
        anchorRect.left +
        parseFloat(style.marginLeft) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.borderLeftWidth);
    const anchorTop =
        anchorRect.top +
        parseFloat(style.marginTop) +
        parseFloat(style.paddingTop) +
        parseFloat(style.borderTopWidth);
    const topLeftElement = document.elementFromPoint(anchorLeft, anchorTop);
    // The bottom right corner is one less than the bounds, otherwise we
    // can end up getting the parent of the anchor, rather than the anchor
    // itself.
    const anchorRight =
        anchorRect.right -
        parseFloat(style.marginRight) -
        parseFloat(style.paddingRight) -
        parseFloat(style.borderRightWidth);
    const anchorBottom =
        anchorRect.bottom -
        parseFloat(style.marginBottom) -
        parseFloat(style.paddingBottom) -
        parseFloat(style.borderBottomWidth);
    const bottomRightElement = document.elementFromPoint(
        anchorRight,
        anchorBottom,
    );
    // TODO(somewhatabstract): Need to cater to the case where the viewport is
    // zoomed such that both corners are off screen but the rest isn't as in
    // some browsers, elementFromPoint then doesn't return the element (see
    // WB-300).

    // To cope with us hitting a child of our anchor or a parent due to
    // borders and things, we do some descendancy checks. We're ok with
    // saying that we're visible if we hit a parent because we already
    // checked them for visibility earlier.
    const topLeftVisible =
        topLeftElement &&
        (element.contains(topLeftElement) || topLeftElement.contains(element));
    const bottomRightVisible =
        bottomRightElement &&
        (element.contains(bottomRightElement) ||
            bottomRightElement.contains(element));
    return !topLeftVisible && !bottomRightVisible;
}
