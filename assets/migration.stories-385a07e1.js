import{M as a}from"./index-35e12253.js";import{a as n,j as o,F as c}from"./jsx-runtime-309e447d.js";import{u as s}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function i(t){const e=Object.assign({h1:"h1",h2:"h2",p:"p",ol:"ol",li:"li",code:"code",h3:"h3",pre:"pre"},s(),t.components);return o(c,{children:[n(a,{title:"Timing / withActionScheduler / Migration from standard API",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"withactionsceduler",children:"withActionSceduler"}),`
`,n(e.h2,{id:"migration-from-standard-api",children:"Migration from standard API"}),`
`,n(e.p,{children:"Migrating from the standard API can be done by:"}),`
`,o(e.ol,{children:[`
`,o(e.li,{children:["Wrapping your component with the ",n(e.code,{children:"withActionScheduler"}),` HOC (and, if using TypeScript, using the
`,n(e.code,{children:"WithActionSchedulerProps"}),` type to extend your components props by spreading the type into
your component's `,n(e.code,{children:"Props"})," type)"]}),`
`,o(e.li,{children:["Using the new ",n(e.code,{children:"schedule"})," prop in your component instead of ",n(e.code,{children:"setTimeout"}),", ",n(e.code,{children:"setInterval"})," and ",n(e.code,{children:"requestAnimationFrame"})]}),`
`]}),`
`,n(e.h3,{id:"migration-example",children:"Migration Example"}),`
`,o(e.p,{children:["Let's imagine we have a component that uses ",n(e.code,{children:"setTimeout"})," like this:"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`type Props = {||};

type State = {
    timerFired: boolean,
}

class MyLegacyComponent extends React.Component<Props, State> {
    _timeoutID: TimeoutID;

    state: State = {
        timerFired: false;
    };

    componentDidMount() {
        this.timeoutID = setTimeout(
            () => this.setState({timerFired: true}),
            2000,
        );
    }

    componentWillUnmount() {
        /* 0 is a valid ID for a timeout */
        if (this.timeoutID != null) {
            clearTimeout(this.timeoutID);
        }
    }

    renderState() {
        const {timerFired} = this.state;
        if (timerFired) {
            return "...fired!";
        }
        return "pending...";
    }

    render() {
        return <View>Legacy Component {this.renderState()}</View>;
    }
}
`})}),`
`,n(e.p,{children:"We can rewrite it to use the Wonder Blocks Timing API like this:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`type Props = {|
    /**
     * These props will be injected into your component.  They won't appear
     * as part of the public props of the component since \`withActionSceduler\`
     * will excluding them from the props of the component it returns.
     */
    ...withActionSchedulerProps
|};

type State = {
    timerFired: boolean,
}

class MyWonderBlocksComponentImpl extends React.Component<Props, State> {
    state: State = {
        timerFired: false;
    };

    componentDidMount() {
        const {schedule} = this.props;
        schedule.timeout(() => this.setState({timerFired: true}), 2000);
    }

    renderState() {
        const {timerFired} = this.state;
        if (timerFired) {
            return "...fired!";
        }
        return "pending...";
    }

    render() {
        return <View>Wonder Blocks Component {this.renderState()}</View>;
    }
}

/**
 * The component that you would export as a drop-in replacement for your
 * legacy component.
 */
const MyWonderBlocksComponent = withActionScheduler(MyWonderBlocksComponentImpl);
`})})]})}function d(t={}){const{wrapper:e}=Object.assign({},s(),t.components);return e?n(e,{...t,children:n(i,{...t})}):i(t)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const r={title:"Timing / withActionScheduler / Migration from standard API",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:d};const P=["__page"];export{P as __namedExportsOrder,p as __page,r as default};
//# sourceMappingURL=migration.stories-385a07e1.js.map
