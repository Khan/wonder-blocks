/**
 * SpreadType<A, B> simulates {...A, ...B} from Flow.
 */
declare type SpreadType<A, B> = Omit<A, keyof B> & B;

declare type Empty = Record<string, never>;

declare type ObjMap<
    O extends Record<string, any>,
    F extends (...args: any[]) => any,
> = {[P in keyof O]: ReturnType<F>};
