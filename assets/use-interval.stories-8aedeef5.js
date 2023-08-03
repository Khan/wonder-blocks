import{M as h,C as g,b as v}from"./index-35e12253.js";import"./footnote-761d2bcc.js";import{V as r}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{B as C}from"./button-b2794e32.js";import"./with-action-scheduler-7e779422.js";import{u as f}from"./use-interval-8b23fdc7.js";import{j as a,a as t,F as b}from"./jsx-runtime-309e447d.js";import{u as c}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";import"./use-updating-ref-187c441b.js";const l=()=>{const[n,e]=React.useState(0),[o,d]=React.useState(!1),u=React.useCallback(()=>{e(p=>p+1)},[]);return f(u,1e3,o),a(r,{children:[a(r,{children:["callCount = ",n]}),a(r,{children:["active = ",o.toString()]}),t(C,{onClick:()=>d(!o),style:{width:200},children:"Toggle active"})]})};function s(n){const e=Object.assign({h1:"h1",code:"code",p:"p",pre:"pre",ul:"ul",li:"li"},c(),n.components);return a(b,{children:[t(h,{title:"Timing/useInterval",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"useinterval",children:t(e.code,{children:"useInterval"})}),`
`,a(e.p,{children:[t(e.code,{children:"useInterval"}),` is a hook that provides a simple API for using intervals safely.
It is defined as follows:`]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function useInterval(
    action: () => mixed,
    intervalMs: number,
    active: boolean,
): void;
`})}),`
`,t(e.p,{children:"Notes:"}),`
`,a(e.ul,{children:[`
`,a(e.li,{children:["Setting ",t(e.code,{children:"active"})," to ",t(e.code,{children:"true"})," will start the interval and setting it to ",t(e.code,{children:"false"}),`
will stop it`]}),`
`,a(e.li,{children:["Changing the value of ",t(e.code,{children:"timeoutMs"})," will reset the interval, changing ",t(e.code,{children:"action"}),`
will not.`]}),`
`]}),`
`,`
`,t(g,{children:t(v,{name:"BasicUsage",children:t(l,{})})}),`
`,t(e.pre,{children:t(e.code,{className:"language-jsx",children:`export const BasicUsage = () => {
    const [callCount, setCallCount] = React.useState(0);
    const [active, setActive] = React.useState(false);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    useInterval(callback, 1000, active);
    return (
        <View>
            <View>callCount = {callCount}</View>
            <View>active = {active.toString()}</View>
            <Button onClick={() => setActive(!active)} style={{width: 200}}>
                Toggle active
            </Button>
        </View>
    );
};
`})})]})}function w(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,{...n,children:t(s,{...n})}):s(n)}const m=()=>t(l,{});m.storyName="BasicUsage";m.parameters={storySource:{source:"<BasicUsage />"}};const i={title:"Timing/useInterval",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["basicUsage"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:w};const J=["BasicUsage","basicUsage"];export{l as BasicUsage,J as __namedExportsOrder,m as basicUsage,i as default};
//# sourceMappingURL=use-interval.stories-8aedeef5.js.map
