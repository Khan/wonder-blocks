import * as React from "react";

import {RenderStateInternal, RenderStateContext} from "./render-state-context";

/**
 * We use render functions so that we don't do any work unless we need to.
 * This avoids rendering but not mounting potentially complex component trees.
 */
type Props = {
    /**
     * The content that is client-only.  This is what is rendered when
     * not server-side rendering, or (when server-side rendering) after
     * the initial rehydration has finished.
     */
    children: () => React.ReactNode;
    /**
     * What to initially render, or null if nothing should be rendered.
     *
     * NOTE: Make sure the fallback will render the same for both
     * client and server -- that is, it does the same thing for both
     * the server-side renderer and the rehydration -- or it defeats
     * the purpose of using the InitialFallback component.
     */
    fallback: (() => React.ReactNode) | null;
};

type State = {
    mounted: boolean;
};

/**
 * Defer or change rendering until the component did mount.
 *
 * The purpose of this component is to disable or modify server-side rendering
 * of certain components. Disabling rendering on the server, by itself, would
 * not be sufficient, since the initial render of the component must match what
 * is rendered on the server. Therefore, this component also disables rendering
 * the first time around on the client.
 *
 * If `InitialFallback` components are nested within one another, the root
 * `InitialFallback` component will handle the initial render, but nested
 * `InitialFallback` components will delegate to the root one, meaning that
 * we don't cascade delayed rendering down the component tree. This will also be
 * the case across portal boundaries.
 *
 * ## Usage
 *
 * ```js
 * import {InitialFallback} from "@khanacademy/wonder-blocks-core";
 *
 * <InitialFallback fallback={() => <div>Renders on the server!</div>}>
 *   {() => (
 *      <div>This is rendered only by the client, for all renders after the rehydration render</div>
 *   )}
 * </InitialFallback>
 * ```
 */
export default class InitialFallback extends React.Component<Props, State> {
    state: State = {
        mounted: false,
    };

    componentDidMount() {
        if (this._isTheRootComponent) {
            // We only want to force a new render if we were responsible for
            // the first render, so we guard that state change here.

            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                mounted: true,
            });
        }
    }

    _isTheRootComponent = false;

    _renderAsRootComponent(): React.ReactNode {
        const {mounted} = this.state;
        const {children, fallback} = this.props;

        // We are the first component in the tree.
        // We are in control of instigating a second render for our
        // component tree.
        this._isTheRootComponent = true;

        if (mounted) {
            // This is our second render, so let's tell everyone to
            // do their thing. Components don't mount during SSR, so we won't
            // hit this when server-side rendering.
            return (
                <RenderStateContext.Provider
                    value={RenderStateInternal.Standard}
                >
                    {children()}
                </RenderStateContext.Provider>
            );
        }

        // OK, this is the very first initial render.
        // If we have a fallback, we render it, and ensure that any
        // nested components know we're still on that initial render
        // and they're not in charge of initiating the next render.
        if (fallback) {
            return (
                <RenderStateContext.Provider
                    value={RenderStateInternal.Initial}
                >
                    {fallback()}
                </RenderStateContext.Provider>
            );
        }

        // Otherwise, we return nothing.
        return null;
    }

    _maybeRender(renderState: RenderStateInternal): React.ReactNode {
        const {children, fallback} = this.props;

        switch (renderState) {
            case RenderStateInternal.Root:
                return this._renderAsRootComponent();

            case RenderStateInternal.Initial:
                // We're not the root component, so we just have to either
                // render our placeholder or nothing.
                // The second render is going to be triggered for us.
                return fallback ? fallback() : null;

            case RenderStateInternal.Standard:
                // We have covered the SSR render, we're now rendering with
                // standard rendering semantics.
                return children();
        }

        // There are edge cases where for some reason, we get an unknown
        // context value here. So far it seems to be when we're nested in a
        // v1 InitialFallback equivalent component, or in some older
        // React v16 situations where we're nested in the provider of a
        // different context.
        //
        // We ignore this from coverage. It's a maintenance case to help
        // us catch code changes that affect the control flow unexpectedly,
        // but it's not something we need to write a test case for.
        //
        // TypeScript will assert exhaustiveness of the switch.
        //
        /* istanbul ignore next */
        {
            // Let's log this case so we can debug it easily.
            // Then fall through to the root case.
            /* eslint-disable-next-line no-console */
            console.log(
                `We got a render state we don't understand: "${
                    JSON.stringify(renderState) ?? ""
                }"`,
            );
            // We "fallthrough" to the root case. This is more obvious
            // and maintainable code than just ignoring the no-fallthrough
            // lint rule.
            return this._maybeRender(RenderStateInternal.Root);
        }
    }

    render(): React.ReactNode {
        return (
            <RenderStateContext.Consumer>
                {(value) => this._maybeRender(value)}
            </RenderStateContext.Consumer>
        );
    }
}
