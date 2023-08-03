import{a as r}from"./jsx-runtime-309e447d.js";import{V as P,a as N,l as W}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{S as D,C as d}from"./index-f641b98f.js";import{g as u}from"./clickable-8a7f284d.js";import{c as t,p as m}from"./clickable.argtypes-8b694e47.js";import{C as V}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./button-b2794e32.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const A={children:{description:"A function that returns the a React `Element`. The function is passed an object with three boolean properties: hovered, focused, and pressed, and a `childrenProps` argument that contains all the event handlers that should be passed to the React `Element` itself.",type:{name:"other",value:"(state: ClickableState, childrenProps: ChildrenProps) => React.Node",required:!0},table:{type:{summary:"(state: ClickableState, childrenProps: ChildrenProps) => React.Node"}}},tabIndex:{control:{type:"number"},description:`Used to indicate the tab order of an element.
            Use 0 to make an element focusable, and use -1 to make an
            element non-focusable via keyboard navigation.`,table:{type:{summary:"number"}}},disabled:{...t.disabled,description:`Whether the component is disabled.

If the component is disabled, this component will return handlers that do nothing.`},onClick:{...t.onClick,description:"An onClick function which ClickableBehavior can execute when clicked."},onkeyDown:t.onkeyDown,onKeyUp:t.onKeyUp,skipClientNav:t.skipClientNav,rel:t.rel,target:t.target,href:{...t.href,description:"Optional `href` which `ClickableBehavior` should direct to, uses client-side routing by default if react-router is present.\n\nFor keyboard navigation, the default is that both an enter and space press would also navigate to this location. See the triggerOnEnter and triggerOnSpace props for more details"},beforeNav:t.beforeNav,safeWithNav:t.safeWithNav,role:t.role},E=u(),L={title:"Clickable / ClickableBehavior",component:E,argTypes:A,args:{disabled:!1},parameters:{componentSubtitle:r(V,{name:m.name,version:m.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}}},h=a=>{const n=u();return r(n,{role:"button",...a,children:(s,i)=>{const{pressed:l,hovered:c,focused:b}=s;return r(P,{style:[e.clickable,c&&e.hovered,b&&e.focused,l&&e.pressed],...i,children:"This is an element wrapped with ClickableBehavior"})}})};h.parameters={chromatic:{disableSnapshot:!0}};const o=a=>{const n=u(),s=N("button");return r(n,{...a,children:(i,l)=>{const{pressed:c,hovered:b,focused:T}=i;return r(s,{style:[e.clickable,e.newButton,b&&e.hovered,T&&e.focused,c&&e.pressed],...l,children:"This is an element wrapped with ClickableBehavior"})}})};o.parameters={chromatic:{disableSnapshot:!0}};const p=()=>{const a=u();return r(a,{role:"button",tabIndex:0,children:(n,s)=>{const{pressed:i,hovered:l,focused:c}=n;return r(P,{style:[e.clickable,l&&e.hovered,c&&e.focused,i&&e.pressed],...s,children:"This is an element wrapped with ClickableBehavior"})}})};p.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"A `<ClickableBehavior>` element does not have\n            a tabIndex by default, as many elements it could wrap may have\n            their own built in tabIndex attribute, such as buttons. If this\n            is not the case, a tabIndex should be passed in using the\n            `tabIndex` prop."}}};const e=W.StyleSheet.create({clickable:{cursor:"pointer",padding:D.medium_16,textAlign:"center"},newButton:{border:"none",backgroundColor:d.white,width:"100%"},hovered:{textDecoration:"underline",backgroundColor:d.blue,color:d.white},pressed:{backgroundColor:d.darkBlue},focused:{outline:`solid 4px ${d.lightBlue}`}});var v,k,f;h.parameters={...h.parameters,docs:{...(v=h.parameters)==null?void 0:v.docs,source:{originalSource:`(args: any) => {
  const ClickableBehavior = getClickableBehavior();
  return <ClickableBehavior role="button" {...args}>
            {(state, childrenProps) => {
      const {
        pressed,
        hovered,
        focused
      } = state;
      return <View style={[styles.clickable, hovered && styles.hovered, focused && styles.focused, pressed && styles.pressed]} {...childrenProps}>
                        This is an element wrapped with ClickableBehavior
                    </View>;
    }}
        </ClickableBehavior>;
}`,...(f=(k=h.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var y,C,B,g,w;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`(args: any) => {
  const ClickableBehavior = getClickableBehavior();
  const StyledButton = addStyle("button");
  return <ClickableBehavior {...args}>
            {(state, childrenProps) => {
      const {
        pressed,
        hovered,
        focused
      } = state;
      return <StyledButton style={[styles.clickable, styles.newButton, hovered && styles.hovered, focused && styles.focused, pressed && styles.pressed]} {...childrenProps}>
                        This is an element wrapped with ClickableBehavior
                    </StyledButton>;
    }}
        </ClickableBehavior>;
}`,...(B=(C=o.parameters)==null?void 0:C.docs)==null?void 0:B.source},description:{story:"This is an example of a `<ClickableBehavior>` wrapping a button. Since\nbuttons have a built in tabIndex, a tabIndex does not need to be added to\n`<ClickableBehavior>` here.",...(w=(g=o.parameters)==null?void 0:g.docs)==null?void 0:w.description}}};var S,x,I;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const ClickableBehavior = getClickableBehavior();
  return <ClickableBehavior role="button" tabIndex={0}>
            {(state, childrenProps) => {
      const {
        pressed,
        hovered,
        focused
      } = state;
      return <View style={[styles.clickable, hovered && styles.hovered, focused && styles.focused, pressed && styles.pressed]} {...childrenProps}>
                        This is an element wrapped with ClickableBehavior
                    </View>;
    }}
        </ClickableBehavior>;
}`,...(I=(x=p.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};const M=["Default","WrappingButton","WithTabIndex"];export{h as Default,p as WithTabIndex,o as WrappingButton,M as __namedExportsOrder,L as default};
//# sourceMappingURL=clickable-behavior.stories-aeda8026.js.map
