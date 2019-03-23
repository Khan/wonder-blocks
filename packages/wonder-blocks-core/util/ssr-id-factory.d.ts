import { IIdentifierFactory } from "./types";
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
declare class SsrIDFactory implements IIdentifierFactory {
    static Default: SsrIDFactory;
    get(id: string): string;
}
declare const _default: SsrIDFactory;
export default _default;
