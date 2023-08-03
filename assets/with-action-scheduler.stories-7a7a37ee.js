import{M as U,C as m,b as u}from"./index-35e12253.js";import{V as r,I as f}from"./render-state-root-891c0d56.js";import{r as p}from"./index-9f32f44c.js";import{a as e,j as o,F as I}from"./jsx-runtime-309e447d.js";import{B as N}from"./button-b2794e32.js";import{w as A}from"./with-action-scheduler-7e779422.js";import{C as b}from"./component-info-cedbe096.js";import{u as C}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const x="@khanacademy/wonder-blocks-timing",T="4.0.1",V="v1",D={access:"public"},E="",R="dist/index.js",P="dist/es/index.js",G="dist/index.d.ts",j={test:'echo "Error: no test specified" && exit 1'},k={react:"16.14.0"},K={"wb-dev-build-settings":"^0.9.7"},W="",B="MIT",g={name:x,private:!1,version:T,design:V,publishConfig:D,description:E,main:R,module:P,types:G,scripts:j,peerDependencies:k,devDependencies:K,author:W,license:B},d=function(t){const[n,i]=p.useState(!0);return e(r,{children:(()=>n?o(I,{children:[e(N,{onClick:()=>{i(!1)},children:"Unmount"}),t.children]}):"Children unmounted")()})};class a extends p.Component{componentDidMount(){const{targetId:n}=this.props;let i=0;const c=document.getElementById(n);setInterval(()=>{c.innerText="Naughty interval logged: "+i++},200)}render(){return e(r,{children:"NaughtyComponent here"})}}class h extends p.Component{componentDidMount(){const{targetId:n,schedule:i}=this.props;let c=0;const _=document.getElementById(n);i.interval(()=>{_.innerText="Naughty interval logged: "+c++},200)}render(){return e(r,{children:"GoodComponent here"})}}const l=A(h);try{d.displayName="Unmounter",d.__docgenInfo={description:"",displayName:"Unmounter",props:{}}}catch{}try{a.displayName="MyNaughtyComponent",a.__docgenInfo={description:"",displayName:"MyNaughtyComponent",props:{targetId:{defaultValue:null,description:"",name:"targetId",required:!0,type:{name:"string"}}}}}catch{}try{h.displayName="MyGoodComponent",h.__docgenInfo={description:"",displayName:"MyGoodComponent",props:{schedule:{defaultValue:null,description:"An instance of the `IScheduleActions` API to use for scheduling\nintervals, timeouts, and animation frame requests.",name:"schedule",required:!0,type:{name:"IScheduleActions"}},targetId:{defaultValue:null,description:"",name:"targetId",required:!0,type:{name:"string"}}}}}catch{}try{l.displayName="MyGoodComponentWithScheduler",l.__docgenInfo={description:"",displayName:"MyGoodComponentWithScheduler",props:{targetId:{defaultValue:null,description:"",name:"targetId",required:!0,type:{name:"string"}}}}}catch{}const w=()=>e(f,{id:"incorrect",children:t=>o(r,{children:[e(d,{children:e(a,{targetId:t})}),e(r,{id:t})]})}),v=()=>e(f,{id:"correct",children:t=>o(r,{children:[e(d,{children:e(l,{targetId:t})}),e(r,{id:t})]})});function y(t){const n=Object.assign({h1:"h1",p:"p",a:"a",code:"code",h2:"h2",h3:"h3",pre:"pre"},C(),t.components);return o(I,{children:[e(U,{title:"Timing / withActionScheduler",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},decorators:[i=>e(r,{children:i()})]}),`
`,e(n.h1,{id:"withactionsceduler",children:"withActionSceduler"}),`
`,e(b,{name:g.name,version:g.version}),`
`,o(n.p,{children:[`This is a higher order component (HOC) that attaches the given component to an
`,e(n.a,{href:"#ischeduleactions",children:e(n.code,{children:"IScheduleActions"})}),` instance. Any actions scheduled will automatically be
cleared on unmount. This allows for "set it and forget it" behavior that won't
leave timers dangling when the component's lifecycle ends.`]}),`
`,o(n.p,{children:["For more details on using this component and the ",e(n.a,{href:"#ischeduleactions",children:e(n.code,{children:"IScheduleActions"})}),` interface,
see the `,e(n.a,{href:"#timing-api-overview",children:"API overview"}),"."]}),`
`,e(n.h2,{id:"typescript-types",children:"TypeScript Types"}),`
`,o(n.p,{children:["If you are using TypeScript typing, you can use the ",e(n.code,{children:"WithActionSchedulerProps"}),` type
to build the props for the component that you will pass to the `,e(n.code,{children:"withActionScheduler"}),`
function by spreading the type into your component's `,e(n.code,{children:"Props"})," type."]}),`
`,o(n.p,{children:["The added ",e(n.code,{children:"schedule"})," prop is of type ",e(n.a,{href:"#ischeduleactions",children:e(n.code,{children:"IScheduleActions"})}),`. This is what the
`,e(n.code,{children:"withActionScheduler"})," function injects to your component."]}),`
`,o(n.p,{children:["The returned value from ",e(n.code,{children:"withActionScheduler"}),` is a React component with props of
type `,e(n.code,{children:"TProps"}),"."]}),`
`,o(n.p,{children:["Access to the ",e(n.a,{href:"/docs/timing-types-ischeduleactions--page",children:"timing API"})," is provided via the ",e(n.code,{children:"withActionScheduler"}),` higher order
component.`]}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.h3,{id:"incorrect-usage",children:"Incorrect Usage"}),`
`,o(n.p,{children:["The following component, ",e(n.code,{children:"MyNaughtyComponent"}),`, will keep spamming our pretend
log even after it was unmounted.`]}),`
`,`
`,e(m,{children:e(u,{name:"IncorrectUsage",children:e(w,{})})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`function Unmounter(props: {|children: React.Node|}): React.Node {
    const [mountKids, setMountKids] = React.useState(true);

    const maybeRenderKids = () => {
        if (!mountKids) {
            return "Children unmounted";
        }

        return (
            <>
                <Button
                    onClick={() => {
                        setMountKids(false);
                    }}
                >
                    Unmount
                </Button>
                {props.children}
            </>
        );
    };

    return <View>{maybeRenderKids()}</View>;
}

class MyNaughtyComponent extends React.Component<{|targetId: string|}> {
    componentDidMount() {
        const {targetId} = this.props;
        let counter = 0;
        const domElement: HTMLElement = (document.getElementById(
            targetId,
        ): any);

        setInterval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render(): React.Node {
        return <View>NaughtyComponent here</View>;
    }
}

const IncorrectUsage = () => (
    <IDProvider id="incorrect">
        {(id) => (
            <View>
                <Unmounter>
                    <MyNaughtyComponent targetId={id} />
                </Unmounter>
                <View id={id} />
            </View>
        )}
    </IDProvider>
);
`})}),`
`,e(n.h3,{id:"correct-usage",children:"Correct Usage"}),`
`,o(n.p,{children:["But if we use ",e(n.code,{children:"withActionScheduler"})," and the ",e(n.code,{children:"interval"}),` method, everything is
fine. Unmount the component, and the logging stops.`]}),`
`,`
`,e(m,{children:e(u,{name:"CorrectUsage",children:e(v,{})})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "@khanacademy/wonder-blocks-timing";

type Props = {|
    ...WithActionSchedulerProps,
    targetId: string,
|};

class MyGoodComponent extends React.Component<Props> {
    componentDidMount() {
        const {targetId, schedule} = this.props;
        let counter = 0;
        const domElement: HTMLElement = (document.getElementById(
            targetId,
        ): any);

        schedule.interval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render(): React.Node {
        return <View>GoodComponent here</View>;
    }
}

const MyGoodComponentWithScheduler: React.AbstractComponent<
    WithoutActionScheduler<React.ElementConfig<typeof MyGoodComponent>>,
    MyGoodComponent,
> = withActionScheduler(MyGoodComponent);

// This is the same as the previous example
function Unmounter(props: {|children: React.Node|}): React.Node {
    ...
}

const CorrectUsage = () => (
    <IDProvider id="correct">
        {(id) => (
            <View>
                <Unmounter>
                    <MyGoodComponentWithScheduler targetId={id} />
                </Unmounter>
                <View id={id} />
            </View>
        )}
    </IDProvider>
);
`})})]})}function q(t={}){const{wrapper:n}=Object.assign({},C(),t.components);return n?e(n,{...t,children:e(y,{...t})}):y(t)}const M=()=>e(w,{});M.storyName="IncorrectUsage";M.parameters={storySource:{source:"<IncorrectUsage />"}};const S=()=>e(v,{});S.storyName="CorrectUsage";S.parameters={storySource:{source:"<CorrectUsage />"}};const s={title:"Timing / withActionScheduler",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},decorators:[t=>e(r,{children:t()})],tags:["stories-mdx"],includeStories:["incorrectUsage","correctUsage"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:q};const ue=["IncorrectUsage","CorrectUsage","incorrectUsage","correctUsage"];export{v as CorrectUsage,w as IncorrectUsage,ue as __namedExportsOrder,S as correctUsage,s as default,M as incorrectUsage};
//# sourceMappingURL=with-action-scheduler.stories-7a7a37ee.js.map
