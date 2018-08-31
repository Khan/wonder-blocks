// @flow
import * as React from "react";

type Provider<P> = {|
    type: React.ComponentType<P>,
    props?: P,
|};

type Props = {|
    providers: Array<Provider<any>>,
    children: (Array<any>) => React.Node,
|};

export default class CaaFAggregator extends React.Component<Props> {
    render() {
        const {providers, children} = this.props;
        const provided = [];
        let i = 0;
        const buildProviders = (...args) => {
            if (i > 0) {
                if (args.length === 0) {
                    // We need to have something in the array so that consumers
                    // can correlate the provider definition with the values
                    // we give.
                    provided.push(undefined);
                } else if (args.length === 1) {
                    // We unpack the array to a single value.
                    // Is this bad? I don't think so.
                    // Consumers of the results should know if something is
                    // providing multiple values, and single values are the
                    // more common use case so we should make that the easiest.
                    provided.push(...args);
                } else {
                    // We have lots of args so let's push the argument array.
                    provided.push(args);
                }
            }
            if (i < providers.length) {
                // For each provider, we tell it that its children is our little
                // function. This allows us to gather its CaaF arguments into
                // our array and then tell that provider that its child is the
                // next provider.
                const providerEl = React.createElement(providers[i].type, {
                    ...providers[i].props,
                    children: buildProviders,
                });
                i++;
                return providerEl;
            } else {
                // If we have made it through all the providers, we return the
                // result of the real children, given the now gathered provided
                // values (which are in the same order as the providers array
                // passed to the props, ensuring an intuitive ordering for
                // consumers).
                return children(provided);
            }
        };

        return buildProviders();
    }
}
