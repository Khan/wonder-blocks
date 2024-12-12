/* eslint-disable import/no-deprecated */
import type {IIdentifierFactory} from "./types";

/**
 * This is NOT for direct use. Instead, see the UniqueIDProvider component.
 *
 * Implements a version of IIdentifierFactory that can be used for providing
 * identifiers on initial render of components that are eligible for server-side
 * rendering.
 *
 * The identifiers are not guaranteed to be unique, but they will match between
 * server and the first client render.
 * @deprecated Use `useId` for your ID needs. If you are in a class-based
 * component and cannot use hooks, then use the `Id` component.
 */
class SsrIDFactory implements IIdentifierFactory {
    static Default: IIdentifierFactory = new SsrIDFactory();

    get(id: string): string {
        return id;
    }
}

export default SsrIDFactory.Default;
