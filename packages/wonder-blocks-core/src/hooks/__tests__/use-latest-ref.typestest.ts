import {useLatestRef} from "../use-latest-ref";

// The correct, non-nullable type should be inferred for `current`.
useLatestRef(123) satisfies {current: number};

// The return value should be assignable to React's ref types.
useLatestRef(123) satisfies React.RefObject<number>;
useLatestRef(123) satisfies React.MutableRefObject<number>;

// @ts-expect-error the result should not be assignable to the wrong type
useLatestRef(123) satisfies {current: string};

{
    // The `current` property of the returned object should be readonly
    const ref = useLatestRef("")
    // @ts-expect-error the current property should be readonly
    ref.current = "changed"
}
