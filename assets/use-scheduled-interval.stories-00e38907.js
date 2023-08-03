import{M as P,C as p,b as y}from"./index-35e12253.js";import"./footnote-761d2bcc.js";import{V as i}from"./render-state-root-891c0d56.js";import{r as o}from"./index-9f32f44c.js";import{B as s}from"./button-b2794e32.js";import{S as h,C}from"./with-action-scheduler-7e779422.js";import{u as S}from"./use-updating-ref-187c441b.js";import{u as x}from"./use-interval-8b23fdc7.js";import{j as l,a as n,F as B}from"./jsx-runtime-309e447d.js";import{u as w}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";function g(a,e,t){if(typeof a!="function")throw new Error("Action must be a function");if(e<1)throw new Error("Interval period must be >= 1");const r=(t==null?void 0:t.schedulePolicy)??h.Immediately,[c,v]=o.useState(r===h.Immediately),O=o.useCallback(()=>v(!0),[]),u=S(a),D=o.useCallback(m=>{m=m??(t==null?void 0:t.clearPolicy),c&&m===C.Resolve&&u.current(),v(!1)},[u,c,t==null?void 0:t.clearPolicy]),V=S(c&&(t==null?void 0:t.clearPolicy)===C.Resolve);return o.useEffect(()=>()=>{V.current&&u.current()},[]),x(a,e,c),{isSet:c,set:O,clear:D}}const b=()=>{const[a,e]=React.useState(0),t=React.useCallback(()=>{e(c=>c+1)},[]),r=g(t,1e3);return l(i,{children:[l(i,{children:["isSet = ",r.isSet.toString()]}),l(i,{children:["callCount = ",a]}),l(i,{style:{flexDirection:"row"},children:[n(s,{onClick:()=>r.set(),children:"Set interval"}),n(s,{onClick:()=>r.clear(),children:"Clear interval"})]})]})},k=()=>{const[a,e]=React.useState(0),t=React.useCallback(()=>{console.log("action called"),e(c=>c+1)},[]),r=g(t,1e3,{clearPolicy:C.Resolve,schedulePolicy:h.OnDemand});return l(i,{children:[l(i,{children:["isSet = ",r.isSet.toString()]}),l(i,{children:["callCount = ",a]}),l(i,{style:{flexDirection:"row"},children:[n(s,{onClick:()=>r.set(),children:"Set interval"}),n(s,{onClick:()=>r.clear(),children:"Clear interval"})]})]})};function f(a){const e=Object.assign({h1:"h1",code:"code",p:"p",pre:"pre",ul:"ul",li:"li"},w(),a.components);return l(B,{children:[n(P,{title:"Timing/useScheduledInterval",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"usescheduledinterval",children:n(e.code,{children:"useScheduledInterval"})}),`
`,l(e.p,{children:[n(e.code,{children:"useScheduledInterval"}),` is a hook that provides a convenient API for setting and clearing
an interval. It is defined as follows:`]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`function useScheduledInterval(
    action: () => mixed,
    timeoutMs: number,
    options?: {|
        schedulePolicy?: "schedule-immediately" | "schedule-on-demand",
        clearPolicy?: "resolve-on-clear" | "cancel-on-clear",
    |},
): ITimeout;

interface ITimeout {
    get isSet(): boolean;
    set(): void;
    clear(policy?: ClearPolicy): void;
}
`})}),`
`,l(e.p,{children:["By default the interval will be set immediately up creation. The ",n(e.code,{children:"options"}),` parameter can
be used to control when when the interval is schedule and whether or not `,n(e.code,{children:"action"}),` should be
called when the interval is cleared.`]}),`
`,n(e.p,{children:"Notes:"}),`
`,l(e.ul,{children:[`
`,l(e.li,{children:["Because ",n(e.code,{children:"clear"}),` takes a param, it's import that you don't pass it directly to an event handler,
e.g. `,n(e.code,{children:"<Button onClick={clear} />"})," will not work as expected."]}),`
`,l(e.li,{children:["Calling ",n(e.code,{children:"set"})," after the interval has been cleared will restart the interval."]}),`
`,l(e.li,{children:["Updating the second paramter, ",n(e.code,{children:"timeoutMs"}),", will also restart the interval."]}),`
`,n(e.li,{children:"When the component using this hooks is unmounted, the interval will automatically be cleared."}),`
`,l(e.li,{children:["Calling ",n(e.code,{children:"set"})," after the interval is already set does nothing."]}),`
`]}),`
`,`
`,n(p,{children:n(y,{name:"Immediately",children:n(b,{})})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const Immediately = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const interval = useScheduledInterval(callback, 1000);
    return (
        <View>
            <View>isSet = {interval.isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
            </View>
        </View>
    );
};
`})}),`
`,`
`,n(p,{children:n(y,{name:"OnDemandAndResolveOnClear",children:n(k,{})})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const OnDemandAndResolveOnClear = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const interval = useScheduledInterval(callback, 1000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    return (
        <View>
            <View>isSet = {interval.isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
            </View>
        </View>
    );
};
`})})]})}function A(a={}){const{wrapper:e}=Object.assign({},w(),a.components);return e?n(e,{...a,children:n(f,{...a})}):f(a)}const R=()=>n(b,{});R.storyName="Immediately";R.parameters={storySource:{source:"<Immediately />"}};const I=()=>n(k,{});I.storyName="OnDemandAndResolveOnClear";I.parameters={storySource:{source:"<OnDemandAndResolveOnClear />"}};const d={title:"Timing/useScheduledInterval",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["immediately","onDemandAndResolveOnClear"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:A};const re=["Immediately","OnDemandAndResolveOnClear","immediately","onDemandAndResolveOnClear"];export{b as Immediately,k as OnDemandAndResolveOnClear,re as __namedExportsOrder,d as default,R as immediately,I as onDemandAndResolveOnClear};
//# sourceMappingURL=use-scheduled-interval.stories-00e38907.js.map
