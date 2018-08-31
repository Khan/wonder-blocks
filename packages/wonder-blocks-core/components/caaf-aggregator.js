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
                const providerEl = React.createElement(providers[i].type, {
                    ...providers[i].props,
                    children: buildProviders,
                });
                i++;
                return providerEl;
            } else {
                return children(provided);
            }
        };

        return buildProviders();
    }
}
