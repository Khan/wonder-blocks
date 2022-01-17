// @flow
/**
 * This file is based on:
 * - https://github.com/testing-library/react-hooks-testing-library/blob/main/src/types/index.ts
 * - https://github.com/testing-library/react-hooks-testing-library/blob/main/src/types/react.ts
 * - https://github.com/testing-library/react-hooks-testing-library/blob/main/src/pure.ts
 */
 declare module "@testing-library/react-hooks" {
    declare export type Renderer<TProps> = {|
        render: (props?: TProps) => void,
        rerender: (props?: TProps) => void,
        unmount: () => void,
        act: Act,
    |};

    declare export type ServerRenderer<TProps> = {|
        ...Renderer<TProps>,
        hydrate: () => void,
    |};

    declare export type RendererProps<TProps, TResult> = {|
        callback: (props: TProps) => TResult,
        setError: (error: Error) => void,
        setValue: (value: TResult) => void,
    |};

    declare export type CreateRenderer<
        TProps,
        TResult,
        TRendererOptions: {...},
        TRenderer: Renderer<TProps>,
    > = (
        props: RendererProps<TProps, TResult>,
        options: TRendererOptions,
    ) => TRenderer;

    declare export type RenderResult<TValue> = {|
        +all: Array<TValue | Error>,
        +current: TValue,
        +error?: Error,
    |};

    declare export type ResultContainer<TValue> = {|
        result: RenderResult<TValue>,
    |};

    declare export type WaitOptions = {|
        interval?: number | false,
        timeout?: number | false,
    |};

    declare export type WaitForOptions = WaitOptions;
    declare export type WaitForValueToChangeOptions = WaitOptions;
    declare export type WaitForNextUpdateOptions = WaitOptions["timeout"];

    declare export type WaitFor = (
        callback: () => boolean | void,
        options?: WaitForOptions,
    ) => Promise<void>;
    declare export type WaitForValueToChange = (
        selector: () => mixed,
        options?: WaitForValueToChangeOptions,
    ) => Promise<void>;
    declare export type WaitForNextUpdate = (
        options?: WaitForNextUpdateOptions,
    ) => Promise<void>;

    declare export type AsyncUtils = {|
        waitFor: WaitFor,
        waitForValueToChange: WaitForValueToChange,
        waitForNextUpdate: WaitForNextUpdate,
    |};

    declare export type RenderHookResult<
        TProps,
        TValue,
        TRenderer: Renderer<TProps> = Renderer<TProps>,
    > = {|
        ...ResultContainer<TValue>,
        // Omit<Renderer<TProps>, 'render' | 'act'>
        ...$Diff<
            Renderer<TProps>,
            {|
                render: Renderer<TProps>["render"],
                act: Renderer<TProps>["act"],
            |},
        >,
        // Omit<TRenderer, keyof Renderer<TProps>>
        ...$Diff<TRenderer, Renderer<TProps>>,
        ...AsyncUtils,
    |};

    declare export type ServerRenderHookResult<
        TProps,
        TValue,
        TRenderer: ServerRenderer<TProps> = ServerRenderer<TProps>,
    > = RenderHookResult<TProps, TValue, TRenderer>;

    declare export type Act = {|
        (callback: () => Promise<void>): Promise<void>,
        (callback: () => void): void,
    |};

    declare export type CleanupCallback = () => Promise<void> | void;

    declare export type WrapperComponent<TProps> = React$ComponentType<TProps>;

    declare export type RendererOptions<TProps> = {|
        wrapper?: WrapperComponent<TProps>,
    |};

    declare export type RenderHookOptions<TProps> = {|
        initialProps?: TProps,
        wrapper?: WrapperComponent<any>,
    |};

    declare export type ReactHooksRenderer = {|
        renderHook: <TProps, TResult>(
            callback: (props: TProps) => TResult,
            options?: RenderHookOptions<TProps>,
        ) => RenderHookResult<TProps, TResult>,
        act: Act,
        cleanup: () => Promise<void>,
        addCleanup: (callback: CleanupCallback) => () => void,
        removeCleanup: (callback: CleanupCallback) => void,
        suppressErrorOutput: () => () => void,
    |};

    declare export type ReactHooksServerRenderer = {|
        // Omit<ReactHooksRenderer, 'renderHook'>
        ...$Diff<
            ReactHooksRenderer,
            {|
                renderHook: ReactHooksRenderer["renderHook"],
            |},
        >,
        renderHook: <TProps, TResult>(
            callback: (props: TProps) => TResult,
            options?: RenderHookOptions<TProps>,
        ) => ServerRenderHookResult<TProps, TResult>,
    |};

    declare export function renderHook<TProps, TResult>(
        callback: (props: TProps) => TResult,
        options?: RenderHookOptions<TProps>,
    ): RenderHookResult<TProps, TResult>;
    declare export var act: Act;
    declare export function cleanup(): Promise<void>;
    declare export function addCleanup(callback: CleanupCallback): () => void;
    declare export function removeCleanup(callback: CleanupCallback): void;
    declare export function suppressErrorOutput(): () => void;
}
