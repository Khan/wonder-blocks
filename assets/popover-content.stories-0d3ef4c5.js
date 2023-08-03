import{a as e,j as n,F as i}from"./jsx-runtime-309e447d.js";import{V as T,l as A}from"./render-state-root-891c0d56.js";import{B as t}from"./button-b2794e32.js";import"./index-9f32f44c.js";import{S as l,a as c}from"./strut-c6011196.js";import{S as p}from"./index-f641b98f.js";import{a as N,p as m}from"./package-2cfe7d80.js";import{C as D}from"./component-info-cedbe096.js";import{a as u}from"./footnote-761d2bcc.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./tooltip-f80a1c8a.js";import"./one-pane-dialog-da34165b.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";const d={none:null,singleButton:e(t,{kind:"primary",children:"Continue"}),emphasizedSingleButton:e(t,{kind:"primary",light:!0,children:"Continue"}),pagination:n(i,{children:[e(t,{kind:"tertiary",children:"Previous"}),e(l,{size:p.medium_16}),e(t,{kind:"primary",children:"Next"})]}),emphasizedPagination:n(i,{children:[e(t,{kind:"tertiary",light:!0,children:"Previous"}),e(l,{size:p.medium_16}),e(t,{kind:"primary",light:!0,children:"Next"})]}),steps:n(i,{children:[e(u,{children:"Step 1 of 5"}),e(c,{}),e(t,{kind:"tertiary",children:"Skip this step"})]}),emphasizedSteps:n(i,{children:[e(u,{children:"Step 1 of 5"}),e(c,{}),e(t,{kind:"secondary",light:!0,children:"Skip this step"})]})},h={none:null,logo:e("img",{src:"/logo.svg",width:"100%",alt:"Wonder Blocks logo"}),itemAvatar:e("img",{src:"./avatar.png",alt:"ItemAvatar",width:48,height:48})},g={none:null,default:e("img",{src:"/illustration.svg",alt:"An illustration of a person skating on a pencil",width:288,height:200})},W={content:{description:"The content to render inside the popover.",type:{name:"string",required:!0}},title:{description:"The popover title",type:{name:"string",required:!0}},actions:{description:`User-defined actions.

It can be either a Node or a function using the children-as-function pattern to pass a close function for use anywhere within the actions. This provides a lot of flexibility in terms of what actions may trigger the Popover to close the popover dialog`,type:{name:"other",value:"React.Node | (({|close: () => mixed|}) => React.Node)"},options:Object.keys(d),mapping:d},closeButtonVisible:{description:"When true, the close button is shown; otherwise, the close button is not shown.",table:{type:{summary:"boolean"}}},closeButtonLabel:{description:"Close button label for use in screen readers",control:{type:"text"}},style:{description:"Optional custom styles.",control:{type:"object"},table:{category:"Styling",type:{summary:"StyleType"}}},testId:{description:"Test ID used for e2e testing.",control:{type:"text"},table:{type:{summary:"string"}}},icon:{description:"Decorate the popover with an illustrated icon. It cannot be used at the same time with image.",type:{name:"union",value:[{name:"string"},{name:"other",value:'string | React.Element<"img"> | React.Element<"svg">'}]},options:Object.keys(h),mapping:h},image:{description:"Decorate the popover with a full-bleed illustration. It cannot be used at the same time with icon.",type:{name:"union",value:[{name:"other",value:'React.Element<"img">'},{name:"other",value:'React.Element<"svg">'}]},options:Object.keys(g),mapping:g},emphasized:{description:"When true, changes the popover dialog background to blue; otherwise, the popover dialog background is not modified. It can be used only with Text-only popovers. It cannot be used with icon or image.",control:{type:"boolean"}}},oe={title:"Popover/PopoverContent",component:N,argTypes:W,parameters:{componentSubtitle:e(D,{name:m.name,version:m.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[C=>e(T,{style:E.example,children:C()})]},E=A.StyleSheet.create({example:{alignItems:"center",justifyContent:"center"},row:{flexDirection:"row"}}),o={args:{title:"A simple popover",content:"The default version only includes text.",closeButtonVisible:!0}};o.storyName="Default (text)";o.parameters={docs:{description:{story:"Default popover variant that displays text-only."}}};const r={args:{title:"Popover with emphasis",content:"Some content for the popover. Note that the action buttons are using the light version.",emphasized:!0,actions:n(i,{children:[e(t,{light:!0,kind:"secondary",children:"Previous"}),e(l,{size:p.medium_16}),e(t,{light:!0,kind:"primary",children:"Next"})]})}};r.parameters={docs:{description:{story:`Text-only variant with added emphasis.

**NOTE:** When using this variant, make sure to apply the \`light\`
        prop to each button`}}};const s={args:{title:"Popover with Icon",content:"Popovers can include images on the left.",icon:e("img",{src:"/logo.svg",width:"100%",alt:"Wonder Blocks logo"})}};s.parameters={docs:{description:{story:"Decorate the popover with an illustrated icon. You need to pass an `icon` prop with the following constraints:\n\n - string: The URL of the icon asset\n - `<img>` or `<svg>`: Make sure to define a width"}}};const a={args:{title:"Popover with Illustration",content:"As you can see, this popover includes a full-bleed illustration.",image:e("img",{src:"/illustration.svg",alt:"An illustration of a person skating on a pencil",width:288,height:200}),closeButtonVisible:!0}};a.parameters={docs:{description:{story:"Call attention to the popover using a full-bleed illustration."}}};var v,y,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: "A simple popover",
    content: "The default version only includes text.",
    closeButtonVisible: true
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var b,w,k;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: "Popover with emphasis",
    content: "Some content for the popover. Note that the action buttons are using the light version.",
    emphasized: true,
    actions: <>
                <Button light={true} kind="secondary">
                    Previous
                </Button>
                <Strut size={Spacing.medium_16} />
                <Button light={true} kind="primary">
                    Next
                </Button>
            </>
  }
}`,...(k=(w=r.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var S,x,I;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: "Popover with Icon",
    content: "Popovers can include images on the left.",
    icon: <img src="/logo.svg" width="100%" alt="Wonder Blocks logo" />
  }
}`,...(I=(x=s.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var P,B,z;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    title: "Popover with Illustration",
    content: "As you can see, this popover includes a full-bleed illustration.",
    image: <img src="/illustration.svg" alt="An illustration of a person skating on a pencil" width={288} height={200} />,
    closeButtonVisible: true
  }
}`,...(z=(B=a.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};const ne=["Default","Emphasized","WithIcon","WithIllustration"];export{o as Default,r as Emphasized,s as WithIcon,a as WithIllustration,ne as __namedExportsOrder,oe as default};
//# sourceMappingURL=popover-content.stories-0d3ef4c5.js.map
