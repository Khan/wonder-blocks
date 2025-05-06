export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};
