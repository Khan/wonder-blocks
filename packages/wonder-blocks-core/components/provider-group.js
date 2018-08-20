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

export default class ProviderGroup extends React.Component<Props> {
    render() {
        const {providers, children} = this.props;
        const provided = [];
        let i = 0;
        const buildProviders = (...args) => {
            if (i > 0) {
                provided.push(...args);
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
