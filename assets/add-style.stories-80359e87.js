import{r as g}from"./index-9f32f44c.js";import{M as f,C as i,b as s}from"./index-35e12253.js";import{l as b,a as x,V as C}from"./render-state-root-891c0d56.js";import{C as d,S as c,f as w}from"./index-f641b98f.js";import{b as k}from"./labeled-text-field-d77d5301.js";import{j as n,a as t,F as T}from"./jsx-runtime-309e447d.js";import{u as y}from"./index-506666d7.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const o=b.StyleSheet.create({input:{background:d.white,border:`1px solid ${d.offBlack16}`,borderRadius:c.xxxSmall_4,fontSize:c.medium_16,padding:c.xSmall_8},error:{background:w(d.red,.16),borderColor:d.red}}),l=x("input",o.input),p=()=>{const[r,e]=g.useState(!1);return n(C,{children:[t(k,{label:"Click here to add the error style to the input",checked:r,onChange:()=>e(!r)}),t(l,{style:[o.input,r&&o.error],type:"text",placeholder:"Lorem ipsum"})]})};function h(r){const e=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",h2:"h2",pre:"pre",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",em:"em",h3:"h3",a:"a"},y(),r.components);return n(T,{children:[t(f,{title:"Core / addStyle"}),`
`,`
`,`
`,t(e.h1,{id:"addstyle",children:"addStyle"}),`
`,n(e.p,{children:["The ",t(e.code,{children:"addStyle"})," function is a HOC that accepts a ",t(e.strong,{children:"React Component"})," or a ",t(e.strong,{children:"DOM"}),`
`,t(e.strong,{children:"intrinsic"}),` ("div", "span", etc.) as its first argument and optional default
styles as its second argument. This HOC returns a `,t(e.strong,{children:"React Component"}),` with a
`,t(e.code,{children:"style"})," prop included ready to be rendered."]}),`
`,t(e.h2,{id:"usage",children:"Usage"}),`
`,t(e.pre,{children:t(e.code,{className:"language-js",children:`import {addStyle} from "@khanacademy/wonder-blocks-core";

addStyle(
    Component: React.Element | "string",
    defaultStyle?: StyleType
): React.Element;
`})}),`
`,t(e.h2,{id:"api",children:"API"}),`
`,n(e.table,{children:[t(e.thead,{children:n(e.tr,{children:[t(e.th,{align:"none",children:"Argument"}),t(e.th,{align:"none",children:"TypeScript Type"}),t(e.th,{align:"none",children:"Default"}),t(e.th,{align:"none",children:"Description"})]})}),n(e.tbody,{children:[n(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"Component"})}),n(e.td,{align:"none",children:[t(e.code,{children:"React.ReactElement"}),", ",t(e.code,{children:"string"})]}),t(e.td,{align:"none",children:t(e.em,{children:"Required"})}),t(e.td,{align:"none",children:"The component that will be decorated."})]}),n(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"defaultStyle"})}),t(e.td,{align:"none",children:t(e.code,{children:"StyleType"})}),t(e.td,{align:"none",children:"null"}),t(e.td,{align:"none",children:"The initial styles to be applied."})]})]})]}),`
`,t(e.h2,{id:"types",children:"Types"}),`
`,t(e.h3,{id:"styletype",children:"StyleType"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | void;

export type StyleType =
    | CSSProperties
    | Falsy
    | NestedArray<CSSProperties | Falsy>;
`})}),`
`,n(e.p,{children:[t(e.strong,{children:"Note:"})," ",t(e.code,{children:"StyleType"}),` can contain a combination of style rules from an Aphrodite
StyleSheet as well inline style objects (see example 3).`]}),`
`,t(e.h3,{id:"cssproperties",children:"CSSProperties"}),`
`,t(e.p,{children:t(e.a,{href:"https://github.com/Khan/wonder-blocks/blob/main/flow-typed/aphrodite.flow.js#L13",target:"_blank",rel:"nofollow noopener noreferrer",children:"See source file"})}),`
`,t(e.h2,{id:"examples",children:"Examples"}),`
`,n(e.p,{children:["It's recommended to create your styled component using ",t(e.code,{children:"addStyle"}),` outside of the
component so we don't have to create a new instance on every render.`]}),`
`,t(e.pre,{children:t(e.code,{className:"language-js",children:`import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {addStyle} from "@khanacademy/wonder-blocks-core";

const StyledInput = addStyle("input", styles.input);

const styles = StyleSheet.create({
    // default style for all instances of StyledInput
    input: {
        background: Color.white,
        borderColor: Color.offBlack16,
        borderRadius: Spacing.xxxSmall_4,
        fontSize: Spacing.medium_16,
        padding: Spacing.xSmall_8,
    },
    error: {
        background: fade(Color.red, 0.16),
        borderColor: Color.red,
    },
});
`})}),`
`,t(e.h3,{id:"1-adding-default-styles",children:"1. Adding default styles"}),`
`,n(e.p,{children:["You can create a new styled component by using the ",t(e.code,{children:"addStyle"}),` function. Note
here that you can also define default styles for this component by passing an
initial style object to this function.`]}),`
`,t(i,{withSource:"open",children:t(s,{name:"With default style",children:t(l,{type:"text",placeholder:"This is a styled input"})})}),`
`,t(e.h3,{id:"2-overriding-a-default-style",children:"2. Overriding a default style"}),`
`,n(e.p,{children:[`After defining default styles, you can also customize the instance by adding
and/or merging styles using the `,t(e.code,{children:"style"}),` prop in your newly created styled
component.`]}),`
`,t(i,{withSource:"open",children:t(s,{name:"Override styles",children:t(l,{style:o.error,type:"text",placeholder:"With an error style"})})}),`
`,t(e.h3,{id:"3-adding-styles-dynamically",children:"3. Adding styles dynamically"}),`
`,n(e.p,{children:[`This example shows that you can dynamically create styles by adding them to the
`,t(e.code,{children:"style"})," prop only when you need them."]}),`
`,`
`,t(i,{withSource:"open",children:t(s,{name:"Adding styles dynamically",children:p.bind({})})})]})}function D(r={}){const{wrapper:e}=Object.assign({},y(),r.components);return e?t(e,{...r,children:t(h,{...r})}):h(r)}const m=()=>t(l,{type:"text",placeholder:"This is a styled input"});m.storyName="With default style";m.parameters={storySource:{source:'<StyledInput type="text" placeholder="This is a styled input" />'}};const u=()=>t(l,{style:o.error,type:"text",placeholder:"With an error style"});u.storyName="Override styles";u.parameters={storySource:{source:'<StyledInput style={styles.error} type="text" placeholder="With an error style" />'}};const S=p.bind({});S.storyName="Adding styles dynamically";S.parameters={storySource:{source:`() => {
  const [error, setError] = React.useState(false);
  return <View>
            <Checkbox label="Click here to add the error style to the input" checked={error} onChange={() => setError(!error)} />
            <StyledInput style={[styles.input, error && styles.error]} type="text" placeholder="Lorem ipsum" />
        </View>;
}`}};const a={title:"Core / addStyle",tags:["stories-mdx"],includeStories:["withDefaultStyle","overrideStyles","addingStylesDynamically"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:D};const Y=["styles","StyledInput","DynamicStyledInput","withDefaultStyle","overrideStyles","addingStylesDynamically"];export{p as DynamicStyledInput,l as StyledInput,Y as __namedExportsOrder,S as addingStylesDynamically,a as default,u as overrideStyles,o as styles,m as withDefaultStyle};
//# sourceMappingURL=add-style.stories-80359e87.js.map
