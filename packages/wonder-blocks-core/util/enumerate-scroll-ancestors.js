// @flow
/**
 * Utility for finding the scroll ancestors of a child
 *
 * Inspired by https://github.com/olahol/scrollparent.js
 * with modifications to make an iterator that returns a sequence of all scroll
 * ancestors.
 *
 * Also modified for our standards (and commented a bit).
 */
const getElementStyle = function(node: Element, prop) {
    return getComputedStyle(node).getPropertyValue(prop);
};

const getElementOverflow = function(node: Element) {
    return (
        getElementStyle(node, "overflow") +
        getElementStyle(node, "overflow-y") +
        getElementStyle(node, "overflow-x")
    );
};

const canScroll = function(node: Element) {
    return /(auto|scroll)/.test(getElementOverflow(node));
};

// NOTE(somewhatabstract): Flow includes the @@iterator value in the Iterator
// interface definition, but it doesn't pick up on our computed property
// defining it (tried handling this in other ways, but it just won't work).
// So, we need this and the additional FlowFixMe a few lines down on the
// iterator property itself. $FlowFixMe
class ScrollAncestorsIterator implements Iterator<Element> {
    done: boolean = false;
    parentElement: ?Element;

    constructor(element: Element) {
        if (!(element instanceof HTMLElement)) {
            this.done = true;
        } else {
            this.parentElement = element.parentElement;
        }
    }

    //$FlowFixMe: Computed property keys are not allowed by flow at the moment
    [Symbol.iterator]() {
        return this;
    }

    next(): IteratorResult<Element, void> {
        if (this.done) {
            return {done: true};
        }

        // Climb the DOM looking for the next scroll candidate.
        let scrollCandidate: ?Element;
        do {
            scrollCandidate = this.parentElement;
            this.parentElement =
                this.parentElement && this.parentElement.parentElement;
        } while (scrollCandidate && !canScroll(scrollCandidate));

        if (!scrollCandidate) {
            // If we don't have a scroll candidate, we'll definitely be done
            // iterating by the next call to next().
            // So let's remember that.
            this.done = true;

            // If we don't have a documentElement, we are actually done right
            // now, rather than on the next call.
            if (!document.documentElement) {
                return {done: true};
            }

            // Otherwise, as we have a documentElement, this is our penultimate
            // iteration .
            return {
                done: false,
                value: (document.documentElement: Element),
            };
        }

        // We found a scroll ancestor, so let's return that.
        return {
            done: false,
            value: scrollCandidate,
        };
    }
}

export default function enumerateScrollAncestors(
    element: Element,
): Iterable<Element> {
    return Object.defineProperty({}, Symbol.iterator, {
        value: () => new ScrollAncestorsIterator(element),
        writable: true,
    });
}
