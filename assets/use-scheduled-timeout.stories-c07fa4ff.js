import{M as T,C as f,b as w}from"./index-35e12253.js";import"./footnote-761d2bcc.js";import{V as a}from"./render-state-root-891c0d56.js";import{r as d}from"./index-9f32f44c.js";import{B as u}from"./button-b2794e32.js";import{S as p,C as y}from"./with-action-scheduler-7e779422.js";import{u as b}from"./use-updating-ref-187c441b.js";import{u as B}from"./use-timeout-d9103eb1.js";import{j as l,a as t,F as I}from"./jsx-runtime-309e447d.js";import{u as k}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";function R(c,e,n){if(typeof c!="function")throw new Error("Action must be a function");if(e<0)throw new Error("Timeout period must be >= 0");const r=(n==null?void 0:n.schedulePolicy)??p.Immediately,[o,i]=d.useState(r===p.Immediately),s=d.useCallback(()=>i(!0),[]),S=d.useCallback(()=>{i(!1),c()},[c]),h=b(S),x=d.useCallback(C=>{C=C??(n==null?void 0:n.clearPolicy),o&&C===y.Resolve&&h.current(),i(!1)},[h,o,n==null?void 0:n.clearPolicy]),P=b(o&&(n==null?void 0:n.clearPolicy)===y.Resolve);return d.useEffect(()=>()=>{P.current&&h.current()},[]),B(S,e,o),{isSet:o,set:s,clear:x}}const O=()=>{const[c,e]=React.useState(0),n=React.useCallback(()=>{e(s=>s+1)},[]),{isSet:r,set:o,clear:i}=R(n,1e3);return l(a,{children:[l(a,{children:["isSet = ",r.toString()]}),l(a,{children:["callCount = ",c]}),l(a,{style:{flexDirection:"row"},children:[t(u,{onClick:o,children:"Set timeout"}),t(u,{onClick:i,children:"Clear timeout"})]})]})},v=()=>{const[c,e]=React.useState(0),n=React.useCallback(()=>{console.log("action called"),e(s=>s+1)},[]),{isSet:r,set:o,clear:i}=R(n,1e3,{clearPolicy:y.Resolve,schedulePolicy:p.OnDemand});return l(a,{children:[l(a,{children:["isSet = ",r.toString()]}),l(a,{children:["callCount = ",c]}),l(a,{style:{flexDirection:"row"},children:[t(u,{onClick:()=>o(),children:"Set timeout"}),t(u,{onClick:()=>i(),children:"Clear timeout"})]})]})};function g(c){const e=Object.assign({h1:"h1",code:"code",p:"p",pre:"pre",ul:"ul",li:"li"},k(),c.components);return l(I,{children:[t(T,{title:"Timing/useScheduledTimeout",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"usescheduledtimeout",children:t(e.code,{children:"useScheduledTimeout"})}),`
`,l(e.p,{children:[t(e.code,{children:"useScheduledTimeout"}),` is a hook that provides a convenient API for setting and clearing
a timeout. It is defined as follows:`]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function useScheduledTimeout(
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
`,l(e.p,{children:["By default the timeout will be set immediately up creation. The ",t(e.code,{children:"options"}),` parameter can
be used to control when when the timeout is schedule and whether or not `,t(e.code,{children:"action"}),` should be
called when the timeout is cleared.`]}),`
`,t(e.p,{children:"Notes:"}),`
`,l(e.ul,{children:[`
`,l(e.li,{children:["Because ",t(e.code,{children:"clear"}),` takes a param, it's import that you don't pass it directly to an event handler,
e.g. `,t(e.code,{children:"<Button onClick={clear} />"})," will not work as expected."]}),`
`,l(e.li,{children:["Calling ",t(e.code,{children:"set"})," after the timeout has expired will restart the timeout."]}),`
`,l(e.li,{children:["Updating the second paramter, ",t(e.code,{children:"timeoutMs"}),", will also restart the timeout."]}),`
`,t(e.li,{children:"When the component using this hooks is unmounted, the timeout will automatically be cleared."}),`
`,l(e.li,{children:["Calling ",t(e.code,{children:"set"}),` after the timeout is set but before it expires means that the timeout will be
reset and will call `,t(e.code,{children:"action"}),", ",t(e.code,{children:"timeoutMs"})," after the most recent call to ",t(e.code,{children:"set"})," was made."]}),`
`]}),`
`,`
`,t(f,{children:t(w,{name:"Immediately",children:t(O,{})})}),`
`,t(e.pre,{children:t(e.code,{className:"language-jsx",children:`const Immediately = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const {isSet, set, clear} = useScheduledTimeout(callback, 1000);
    return (
        <View>
            <View>isSet = {isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => set()}>Set timeout</Button>
                <Button onClick={() => clear()}>Clear timeout</Button>
            </View>
        </View>
    );
};
`})}),`
`,`
`,t(f,{children:t(w,{name:"OnDemandAndResolveOnClear",children:t(v,{})})}),`
`,t(e.pre,{children:t(e.code,{className:"language-jsx",children:`const OnDemandAndResolveOnClear = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const {isSet, set, clear} = useScheduledTimeout(callback, 1000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    return (
        <View>
            <View>isSet = {isSet.toString()}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => set()}>Set timeout</Button>
                <Button onClick={() => clear()}>Clear timeout</Button>
            </View>
        </View>
    );
};
`})})]})}function A(c={}){const{wrapper:e}=Object.assign({},k(),c.components);return e?t(e,{...c,children:t(g,{...c})}):g(c)}const D=()=>t(O,{});D.storyName="Immediately";D.parameters={storySource:{source:"<Immediately />"}};const V=()=>t(v,{});V.storyName="OnDemandAndResolveOnClear";V.parameters={storySource:{source:"<OnDemandAndResolveOnClear />"}};const m={title:"Timing/useScheduledTimeout",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["immediately","onDemandAndResolveOnClear"]};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:A};const ae=["Immediately","OnDemandAndResolveOnClear","immediately","onDemandAndResolveOnClear"];export{O as Immediately,v as OnDemandAndResolveOnClear,ae as __namedExportsOrder,m as default,D as immediately,V as onDemandAndResolveOnClear};
//# sourceMappingURL=use-scheduled-timeout.stories-c07fa4ff.js.map
