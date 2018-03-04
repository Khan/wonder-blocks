// @flow

// TODO(kevinb): better flow typings for style after updating flow
// type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
// type Falsy = false | 0 | null | void;
// type StyleList<T> = T | Falsy | NestedArray<T | Falsy>;

// export type StyleType<T: Object> = StyleList<$ReadOnly<T>>;

export type StyleType<T: Object> = any; // eslint-disable-line no-unused-vars

export type Props = {
    style?: any,
    tag?: string,
    children?: any,
};
