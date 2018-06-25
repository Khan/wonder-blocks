// @flow
// Utility for finding the scroll ancestors of a child
// Inspired by https://github.com/olahol/scrollparent.js
// with modifications to make a generator that returns a sequence of all scroll
// ancestors.
// Also modified for our standards (and commented a bit).
const style = function(node: Element, prop) {
    return getComputedStyle(node).getPropertyValue(prop);
};

const overflow = function(node: Element) {
    return (
        style(node, "overflow") +
        style(node, "overflow-y") +
        style(node, "overflow-x")
    );
};

const scroll = function(node: Element) {
    return /(auto|scroll)/.test(overflow(node));
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
        } while (scrollCandidate && !scroll(scrollCandidate));

        if (!scrollCandidate) {
            // If we don't have a scroll candidate, we're done iterating.
            // So let's remember that.
            this.done = true;

            // If we don't have a documentElement, we are done on this
            // iteration.
            if (!document.documentElement) {
                return {done: true};
            }

            // Otherwise, we have a documentElement, this is our penultimate
            // iteration.
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
        writable: false,
    });
}
