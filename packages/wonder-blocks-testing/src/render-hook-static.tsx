import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

type Options<Props> = {
    /**
     * A wrapper component to render around the inner element.
     *
     * Pass a React Component as the wrapper option to have it rendered around
     * the inner element. This is most useful for creating reusable custom
     * render functions for common data providers. See setup for examples.
     *
     *  @see https://testing-library.com/docs/react-testing-library/api/#wrapper
     */
    wrapper?: React.JSXElementConstructor<{children: React.ReactNode}>;

    /**
     * The initial props to pass to the hook.
     */
    initialProps?: Props;
};

type RenderHookStaticResult<Result> = {
    result: {
        current: Result;
    };
};

/**
 * Produce the initial static render of a hook within a test React component.
 *
 * This is useful for seeing what the initial render might be for a hook before
 * any effects are run, mimicking a server-side rendered result or initial
 * client-side render.
 */
export const renderHookStatic = <Result, Props>(
    render: (initialProps: Props) => Result,
    {wrapper, initialProps}: Options<Props> = {},
): RenderHookStaticResult<Result> => {
    let result: Result;
    function TestComponent({
        renderCallbackProps,
    }: {
        renderCallbackProps: Props;
    }) {
        result = render(renderCallbackProps);
        return null;
    }

    const component = <TestComponent renderCallbackProps={initialProps} />;

    const componentWithWrapper =
        wrapper == null
            ? component
            : React.createElement(wrapper, null, component);

    ReactDOMServer.renderToString(componentWithWrapper);

    return {result: {current: result}};
};
