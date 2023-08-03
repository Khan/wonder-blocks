import{M as k,C as d,b as h}from"./index-35e12253.js";import{V as g,l as f}from"./render-state-root-891c0d56.js";import{C as x}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{b as i}from"./labeled-text-field-d77d5301.js";import{L as y}from"./footnote-761d2bcc.js";import{j as r,a as t,F as S}from"./jsx-runtime-309e447d.js";import{u as p}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./icon-a4f17d53.js";const b=o=>{const[e,a]=React.useState(!1),c=!e;return r(g,{children:[t(i,{checked:e,onChange:a,error:c,"aria-describedby":c&&"error-message","aria-required":!0,...o}),c&&t(y,{style:w.error,id:"error-message",children:"You must agree to the terms to continue"})]})},m=o=>{const[e,a]=React.useState(!1);return t(i,{checked:e,onChange:a,label:"Some setting",description:"You do not have permission to change this setting",disabled:!0})},w=f.StyleSheet.create({error:{color:x.red}});function l(o){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",ul:"ul",li:"li",a:"a"},p(),o.components);return r(S,{children:[t(k,{title:"Form/Checkbox/Accessibility",component:i,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,`
`,`
`,t(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t(e.h3,{id:"aria",children:"ARIA"}),`
`,r(e.p,{children:[t(e.code,{children:"Checkbox"})," can take in all ARIA props defined in Wonder Blocks Core types."]}),`
`,r(e.p,{children:["Elements with role ",t(e.code,{children:'"checkbox"'})," can have an ",t(e.code,{children:"aria-checked"}),` property that
exposes the checked state to assistive technology. The dev does not have
to worry about this because the Wonder Blocks Checkbox component is an
`,t(e.code,{children:"input"})," element with type ",t(e.code,{children:'"checkbox"'}),`, as this has built-in semantics and
does not require ARIA.`]}),`
`,r(e.p,{children:["The current implementation of ",t(e.code,{children:"Checkbox"})," uses ",t(e.code,{children:"aria-describedby"}),` with the
label and description that may be passed in as props.`]}),`
`,r(e.p,{children:["See the Error section for information about ",t(e.code,{children:"aria-invalid"}),` and
`,t(e.code,{children:"aria-required"}),"."]}),`
`,t(e.h3,{id:"error-state",children:"Error state"}),`
`,r(e.p,{children:["The Wonder Blocks ",t(e.code,{children:"Checkbox"})," component takes an ",t(e.code,{children:"error"}),` boolean prop. Setting
this prop to true will set `,t(e.code,{children:"aria-invalid"}),` to true, and the color of the
checkbox to red.`]}),`
`,t(e.p,{children:`When a form input is invalid, the user should provide a reason for why
this is.`}),`
`,r(e.p,{children:[`Generally, it is also suggested this is the validation error message is
passed to the checkbox's `,t(e.code,{children:"aria-describedby"}),` prop so assistive tech can
read it. However, this is not possible with the current implementation of
the Wonder Blocks Form Checkbox component.`]}),`
`,r(e.p,{children:[`The error state can be used to signal that a required checkbox has not been
checked. In cases where a checkbox is required, the checkbox component should
set the `,t(e.code,{children:"aria-required"}),` prop to true for assistive tech.
There should also be some sort of visual indication that checking
the box is required, such as a "Required" label or an asterisk.`]}),`
`,t(d,{children:t(h,{name:"Error state",args:{label:"I accept the terms and conditions"},children:b.bind({})})}),`
`,t(e.h3,{id:"disabled-state",children:"Disabled state"}),`
`,r(e.p,{children:["The Wonder Blocks ",t(e.code,{children:"Checkbox"})," compoenent takes a ",t(e.code,{children:"disabled"}),` boolean prop.
This sets the underlying `,t(e.code,{children:"input"})," element's ",t(e.code,{children:"disabled"})," prop to ",t(e.code,{children:"true"}),`.
This makes is so that the checkbox is not interactable. Also, assistive
tech will indicated that the checkbox is dimmed.`]}),`
`,t(e.p,{children:`A user will not be able to navigate to the checkbox with a keyboard.
Screen reader users will be able to navigate to the checkbox with
screen reader controls.`}),`
`,t(e.p,{children:`It is suggested that if an element is disabled, an explanation as to why
should to provided somewhere.`}),`
`,t(d,{children:t(h,{name:"Disabled state",children:m.bind({})})}),`
`,t(e.h3,{id:"keyboard-interaction",children:"Keyboard Interaction"}),`
`,t(e.p,{children:`If a checkbox is not disabled, a user can tab to it using standard
keyboard navigation. The Space key toggles the checked state of the checkbox.`}),`
`,r(e.p,{children:["Note the the Space key triggers the ",t(e.code,{children:"onChange"}),` function of the
Wonder Blocks Checkbox component. If the user does not specify an `,t(e.code,{children:"onChange"}),`
funciton prop that in turn updates the value of `,t(e.code,{children:"checked"}),`, neither clicking
nor the Space key will toggle the Checkbox.`]}),`
`,t(e.h3,{id:"references",children:"References"}),`
`,r(e.ul,{children:[`
`,t(e.li,{children:t(e.a,{href:"https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Accessible validation of checkbox and radiobutton groups"})}),`
`,t(e.li,{children:t(e.a,{href:"https://www.the-art-of-web.com/html/html5-checkbox-required/#example1",target:"_blank",rel:"nofollow noopener noreferrer",children:"HTML: Validating a checkbox with HTML5"})}),`
`,t(e.li,{children:t(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked",target:"_blank",rel:"nofollow noopener noreferrer",children:"aria-checked MDN Docs"})}),`
`,t(e.li,{children:t(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role",target:"_blank",rel:"nofollow noopener noreferrer",children:"ARIA: checkbox role MDN Docs"})}),`
`]})]})}function C(o={}){const{wrapper:e}=Object.assign({},p(),o.components);return e?t(e,{...o,children:t(l,{...o})}):l(o)}const s=b.bind({});s.storyName="Error state";s.args={label:"I accept the terms and conditions"};s.parameters={storySource:{source:`args => {
  const [checked, setChecked] = React.useState(false);
  const errorState = !checked;
  return <View>
            <Checkbox checked={checked} onChange={setChecked} error={errorState} aria-describedby={errorState && "error-message"} aria-required={true} {...args} />
            {errorState && <LabelSmall style={styles.error} id="error-message">
                    You must agree to the terms to continue
                </LabelSmall>}
        </View>;
}`}};const u=m.bind({});u.storyName="Disabled state";u.parameters={storySource:{source:`args => {
  const [checked, setChecked] = React.useState(false);
  const errorState = !checked;
  return <Checkbox checked={checked} onChange={setChecked} label="Some setting" description="You do not have permission to change this setting" disabled={true} />;
}`}};const n={title:"Form/Checkbox/Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:i,tags:["stories-mdx"],includeStories:["errorState","disabledState"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:C};const G=["ErrorTemplate","DisabledTemplate","styles","errorState","disabledState"];export{m as DisabledTemplate,b as ErrorTemplate,G as __namedExportsOrder,n as default,u as disabledState,s as errorState,w as styles};
//# sourceMappingURL=checkbox-accessibility.stories-233d1333.js.map
