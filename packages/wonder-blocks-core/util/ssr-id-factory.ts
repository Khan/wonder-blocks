// @flow
import {IIdentifierFactory} from "./types";

/**
 * This is NOT for direct use. Instead, see the UniqueIDProvider component.
 *
 * Implements a version of IIdentifierFactory that can be used for providing
 * identifiers on initial render of components that are eligible for server-side
 * rendering.
 *
 * The identifiers are not guaranteed to be unique, but they will match between
 * server and the first client render.
 */
class SsrIDFactory implements IIdentifierFactory {
    static Default = new SsrIDFactory();

    get(id: string) {
        return id;
    }
}

export default SsrIDFactory.Default;
