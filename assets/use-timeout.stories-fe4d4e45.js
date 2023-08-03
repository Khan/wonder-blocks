import{M as h,C as g,b as C}from"./index-35e12253.js";import"./footnote-761d2bcc.js";import{V as s}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{B as f}from"./button-b2794e32.js";import"./with-action-scheduler-7e779422.js";import{u as v}from"./use-timeout-d9103eb1.js";import{j as n,a as t,F as b}from"./jsx-runtime-309e447d.js";import{u as r}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";import"./use-updating-ref-187c441b.js";const l=()=>{const[i,e]=React.useState(0),[a,u]=React.useState(!1),d=React.useCallback(()=>{e(p=>p+1)},[]);return v(d,1e3,a),n(s,{children:[n(s,{children:["callCount = ",i]}),n(s,{children:["active = ",a.toString()]}),t(f,{onClick:()=>u(!a),style:{width:200},children:"Toggle active"})]})};function c(i){const e=Object.assign({h1:"h1",code:"code",p:"p",pre:"pre",ul:"ul",li:"li"},r(),i.components);return n(b,{children:[t(h,{title:"Timing/useTimeout",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"usetimeout",children:t(e.code,{children:"useTimeout"})}),`
`,n(e.p,{children:[t(e.code,{children:"useTimeout"}),` is a hook that provides a simple API for using timers safely.
It is defined as follows:`]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function useTimeout(
    action: () => mixed,
    timeoutMs: number,
    active: boolean,
): void;
`})}),`
`,t(e.p,{children:"Notes:"}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["Setting ",t(e.code,{children:"active"})," to ",t(e.code,{children:"true"})," will start the timeout and setting it to ",t(e.code,{children:"false"}),`
will stop it`]}),`
`,n(e.li,{children:["Changing the value of ",t(e.code,{children:"timeoutMs"})," will reset the timeout, changing ",t(e.code,{children:"action"}),`
will not.`]}),`
`]}),`
`,`
`,t(g,{children:t(C,{name:"BasicUsage",children:t(l,{})})}),`
`,t(e.pre,{children:t(e.code,{className:"language-jsx",children:`export const BasicUsage = () => {
    const [callCount, setCallCount] = React.useState(0);
    const [active, setActive] = React.useState(false);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    useTimeout(callback, 1000, active);
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
`})})]})}function w(i={}){const{wrapper:e}=Object.assign({},r(),i.components);return e?t(e,{...i,children:t(c,{...i})}):c(i)}const m=()=>t(l,{});m.storyName="BasicUsage";m.parameters={storySource:{source:"<BasicUsage />"}};const o={title:"Timing/useTimeout",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["basicUsage"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:w};const J=["BasicUsage","basicUsage"];export{l as BasicUsage,J as __namedExportsOrder,m as basicUsage,o as default};
//# sourceMappingURL=use-timeout.stories-fe4d4e45.js.map
