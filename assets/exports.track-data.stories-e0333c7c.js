import{M as d}from"./index-35e12253.js";import"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{T as s}from"./gql-router-027fc1dc.js";import{a as n,j as r,F as c}from"./jsx-runtime-309e447d.js";import{u as i}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(t){const e=Object.assign({h1:"h1",p:"p",code:"code",h4:"h4",pre:"pre"},i(),t.components);return r(c,{children:[n(d,{title:"Data / Exports / TrackData",component:s,parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"trackdata",children:"TrackData"}),`
`,r(e.p,{children:["The ",n(e.code,{children:"TrackData"}),` component is a server-side only component. It should be used as
a parent to the components whose data requests you want to fulfill during
server-side rendering.`]}),`
`,n(e.h4,{id:"client-side-behavior",children:"Client-side behavior"}),`
`,r(e.p,{children:["If used outside of server-side mode (as set using ",n(e.code,{children:"Server.setServerSide"}),`), this
component will throw, as demonstrated below.`]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {TrackData} from "@khanacademy/wonder-blocks-data";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromError(error) {
        return {error: error.message};
    }

    render() {
        if (typeof jest !== "undefined") {
            /**
             * The snapshot test just sees the error getting thrown, not the
             * awesome error boundary, so we have to hack around it to keep
             * this live example, but not get test failures.
             */
            return "Sorry, no snapshot for you";
        }

        if (this.state.error) {
            return <View>{this.state.error}</View>;
        }
        return this.props.children;
    }
}

<ErrorBoundary>
    <View>
        <TrackData>
            <Body>
                This only renders if we're in server-side mode and the page hot
                reloaded
            </Body>
        </TrackData>
    </View>
</ErrorBoundary>;
`})}),`
`,n(e.h4,{id:"server-side-behavior",children:"Server-side behavior"}),`
`,r(e.p,{children:[`When used server-side, this component tracks any data requests made through
the `,n(e.code,{children:"Data"}),` component during a render cycle. This data can then be obtained
using the `,n(e.code,{children:"fetchTrackedRequests"}),` method. The data can then be used in an
additional render cycle to render with that data.`]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {
    Data,
    TrackData,
    fetchTrackedRequests,
} from "@khanacademy/wonder-blocks-data";

const myPretendHandler = () =>
    new Promise((resolve, reject) => setTimeout(() => resolve("DATA!"), 3000));

class Example extends React.Component {
    constructor() {
        super();
        /**
         * For this demonstration, we need to hack the return of isServerSide solely
         * for the scope of this component.
         */
        this.state = {};
    }

    static getDerivedStateFromError(error) {
        return {error};
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    setClientMode() {
        window.location.reload();
    }

    setServerMode() {
        Server.setServerSide();
        this.setState({refresh: Date.now(), error: null});
    }

    _renderErrorOrContent() {
        if (typeof jest !== "undefined") {
            /**
             * The snapshot test just sees the error getting thrown, not the
             * awesome error boundary, so we have to hack around it to keep
             * this live example, but not get test failures.
             */
            return "Sorry, no snapshot for you";
        }

        if (this.state.error) {
            return (
                <React.Fragment>
                    <Strut size={Spacing.small_12} />
                    <Body>
                        We can't show you anything useful in client-side mode
                    </Body>
                </React.Fragment>
            );
        }

        const data = this.state.data
            ? JSON.stringify(this.state.data, undefined, "  ")
            : "Data requested...";

        return (
            <React.Fragment>
                <Strut size={Spacing.small_12} />
                <TrackData>
                    <Data
                        handler={myPretendHandler}
                        requestId="TRACK_DATA_EXAMPLE"
                    >
                        {(result) => (
                            <View>
                                <BodyMonospace>{\`Loading: \${
                                    result.status === "loading"
                                }\`}</BodyMonospace>
                                <BodyMonospace>{\`Data: \${JSON.stringify(
                                    result.data,
                                )}\`}</BodyMonospace>
                            </View>
                        )}
                    </Data>
                </TrackData>
                <Strut size={Spacing.small_12} />
                <View>
                    <Body>
                        The above components requested data, but we're
                        server-side, so all that happened is we tracked the
                        request. In this example, we've also called
                        \`fetchTrackedRequests\` to fetch that tracked data.
                    </Body>
                    <Strut size={Spacing.small_12} />
                    <Body>
                        In about 3 seconds, it will appear below. Notice that
                        when it does, the above still doesn't update. That's
                        because during SSR, the data is not updated in the
                        rendered tree.
                    </Body>
                    <Strut size={Spacing.small_12} />
                    <BodyMonospace>{data}</BodyMonospace>
                </View>
            </React.Fragment>
        );
    }

    render() {
        try {
            return (
                <View key={this.state.refresh}>
                    {Server.isServerSide() ? (
                        <React.Fragment>
                            <Button
                                kind={"secondary"}
                                onClick={() => this.setClientMode()}
                            >
                                Back to Client-side Mode (reloads page)
                            </Button>
                            <Strut size={Spacing.small_12} />
                            <Button
                                kind={"secondary"}
                                onClick={() => this.setServerMode()}
                            >
                                Re-mount
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button
                            kind={"primary"}
                            onClick={() => this.setServerMode()}
                        >
                            Enable Server-side Mode
                        </Button>
                    )}
                    {this._renderErrorOrContent()}
                </View>
            );
        } finally {
            if (!this.state.data && Server.isServerSide()) {
                setTimeout(
                    () =>
                        fetchTrackedRequests().then((data) => {
                            if (this._mounted) {
                                this.setState({data});
                            }
                        }),
                    0,
                );
            }
        }
    }
}

<Example />;
`})})]})}function h(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?n(e,{...t,children:n(a,{...t})}):a(t)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const o={title:"Data / Exports / TrackData",parameters:{chromatic:{disableSnapshot:!0}},component:s,tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:h};const C=["__page"];export{C as __namedExportsOrder,m as __page,o as default};
//# sourceMappingURL=exports.track-data.stories-e0333c7c.js.map
