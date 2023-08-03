import{a as o,j as y}from"./jsx-runtime-309e447d.js";import{r as d}from"./index-9f32f44c.js";import{r as g}from"./index-9c2d1831.js";import{V as c,l as p,I as F}from"./render-state-root-891c0d56.js";import{w as R}from"./with-action-scheduler-7e779422.js";import{S as i,C as h}from"./index-f641b98f.js";import{b as A,M as v,c as P}from"./strut-c6011196.js";import"./icon-a4f17d53.js";import{g as L}from"./icon-assets-a0b49981.js";import{I as B}from"./icon-button-297fafd1.js";import{e as $,L as W}from"./footnote-761d2bcc.js";class S extends d.Component{render(){const{above:e,below:t,role:a,style:n,children:s,testId:m,"aria-labelledby":u,"aria-describedby":f}=this.props,M={ssrSize:"large",mediaSpec:P};return o(A.Provider,{value:M,children:o(v,{styleSheets:H,children:({styles:b})=>y(c,{style:[b.wrapper,n],children:[t&&o(c,{style:b.below,children:t}),o(c,{role:a,"aria-modal":"true","aria-labelledby":u,"aria-describedby":f,style:b.dialog,testId:m,children:s}),e&&o(c,{style:b.above,children:e})]})})})}}S.defaultProps={role:"dialog"};const H={all:p.StyleSheet.create({wrapper:{display:"flex",flexDirection:"row",alignItems:"stretch",width:"100%",height:"100%",position:"relative"},dialog:{width:"100%",height:"100%",borderRadius:4,overflow:"hidden"},above:{pointerEvents:"none",position:"absolute",top:0,left:0,bottom:0,right:0,zIndex:1},below:{pointerEvents:"none",position:"absolute",top:0,left:0,bottom:0,right:0,zIndex:-1}}),small:p.StyleSheet.create({wrapper:{padding:i.medium_16,flexDirection:"column"}})};try{modaldialog.displayName="modaldialog",modaldialog.__docgenInfo={description:'`ModalDialog` is a component that contains these elements:\n- The visual dialog element itself (`<div role="dialog"/>`)\n- The custom contents below and/or above the Dialog itself (e.g. decorative graphics).\n\n**Accessibility notes:**\n- By default (e.g. using `OnePaneDialog`), `aria-labelledby` is populated automatically using the dialog title `id`.\n- If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the dialog element doesn’t have to have\nthe `aria-labelledby` attribute however this is recommended. It should match the `id` of the dialog title.',displayName:"modaldialog",props:{children:{defaultValue:null,description:"The dialog content",name:"children",required:!1,type:{name:"ReactNode"}},above:{defaultValue:null,description:`When set, provides a component that can render content above the top of the modal;
when not set, no additional content is shown above the modal.
This prop is passed down to the ModalDialog.`,name:"above",required:!1,type:{name:"ReactNode"}},below:{defaultValue:null,description:`When set, provides a component that will render content below the bottom of the modal;
when not set, no additional content is shown below the modal.
This prop is passed down to the ModalDialog.`,name:"below",required:!1,type:{name:"ReactNode"}},role:{defaultValue:{value:"dialog"},description:`When set, overrides the default role value. Default role is "dialog"
Roles other than dialog and alertdialog aren't appropriate for this
component`,name:"role",required:!1,type:{name:"enum",value:[{value:'"dialog"'},{value:'"alertdialog"'}]}},style:{defaultValue:null,description:"Custom styles",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Test ID used for e2e testing.",name:"testId",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:"The ID of the content labelling this dialog, if applicable.",name:"aria-labelledby",required:!1,type:{name:"string"}},"aria-describedby":{defaultValue:null,description:"The ID of the content describing this dialog, if applicable.",name:"aria-describedby",required:!1,type:{name:"string"}}}}}catch{}class C extends d.Component{static isClassOf(e){return e&&e.type&&e.type.__IS_MODAL_FOOTER__}render(){const{children:e}=this.props;return o(c,{style:z.footer,children:e})}}C.__IS_MODAL_FOOTER__=!0;const z=p.StyleSheet.create({footer:{flex:"0 0 auto",boxSizing:"border-box",minHeight:i.xxxLarge_64,paddingLeft:i.medium_16,paddingRight:i.medium_16,paddingTop:i.xSmall_8,paddingBottom:i.xSmall_8,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end",boxShadow:`0px -1px 0px ${h.offBlack16}`}});try{modalfooter.displayName="modalfooter",modalfooter.__docgenInfo={description:`Modal footer included after the content.

**Implementation notes**:

If you are creating a custom Dialog, make sure to follow these guidelines:
- Make sure to include it as part of [ModalPanel](/#modalpanel) by using the \`footer\` prop.
- The footer is completely flexible. Meaning the developer needs to add its own custom layout to match design specs.

**Usage**

\`\`\`js
<ModalFooter>
    <Button onClick={() => {}}>Submit</Button>
</ModalFooter>
\`\`\``,displayName:"modalfooter",props:{}}}catch{}class I extends d.Component{render(){const{breadcrumbs:e=void 0,light:t,subtitle:a=void 0,testId:n,title:s,titleId:m}=this.props;if(a&&e)throw new Error("'subtitle' and 'breadcrumbs' can't be used together");return o(v,{styleSheets:U,children:({styles:u})=>y(c,{style:[u.header,!t&&u.dark],testId:n,children:[e&&o(c,{style:u.breadcrumbs,children:e}),o($,{style:u.title,id:m,testId:n&&`${n}-title`,children:s}),a&&o(W,{style:t&&u.subtitle,testId:n&&`${n}-subtitle`,children:a})]})})}}I.defaultProps={light:!0};const U={all:p.StyleSheet.create({header:{boxShadow:`0px 1px 0px ${h.offBlack16}`,display:"flex",flexDirection:"column",minHeight:66,padding:`${i.large_24}px ${i.xLarge_32}px`,position:"relative",width:"100%"},dark:{background:h.darkBlue,color:h.white},breadcrumbs:{color:h.offBlack64,marginBottom:i.xSmall_8},title:{paddingRight:i.medium_16},subtitle:{color:h.offBlack64,marginTop:i.xSmall_8}}),small:p.StyleSheet.create({header:{paddingLeft:i.medium_16,paddingRight:i.medium_16},title:{paddingRight:i.xLarge_32}})};try{modalheader.displayName="modalheader",modalheader.__docgenInfo={description:`This is a helper component that is never rendered by itself. It is always
pinned to the top of the dialog, is responsive using the same behavior as its
parent dialog, and has the following properties:
- title
- breadcrumb OR subtitle, but not both.

**Accessibility notes:**

- By default (e.g. using [OnePaneDialog](/#onepanedialog)), \`titleId\` is
  populated automatically by the parent container.
- If there is a custom Dialog implementation (e.g. \`TwoPaneDialog\`), the
  ModalHeader doesn’t have to have the \`titleId\` prop however this is
  recommended. It should match the \`aria-labelledby\` prop of the
  [ModalDialog](/#modaldialog) component. If you want to see an example of
  how to generate this ID, check [IDProvider](/#idprovider).

**Implementation notes:**

If you are creating a custom Dialog, make sure to follow these guidelines:
- Make sure to include it as part of [ModalPanel](/#modalpanel) by using the
  \`header\` prop.
- Add a title (required).
- Optionally add a subtitle or breadcrumbs.
- We encourage you to add \`titleId\` (see Accessibility notes).
- If the \`ModalPanel\` has a dark background, make sure to set \`light\` to
  \`false\`.
- If you need to create e2e tests, make sure to pass a \`testId\` prop and
  add a sufix to scope the testId to this component: e.g.
  \`some-random-id-ModalHeader\`. This scope will also be passed to the title
  and subtitle elements: e.g. \`some-random-id-ModalHeader-title\`.

Example:

\`\`\`js
<ModalHeader
     title="Sidebar using ModalHeader"
     subtitle="subtitle"
     titleId="uniqueTitleId"
     light={false}
 />
\`\`\``,displayName:"modalheader",props:{title:{defaultValue:null,description:"The main title rendered in larger bold text.",name:"title",required:!0,type:{name:"string"}},light:{defaultValue:{value:"true"},description:`Whether to display the "light" version of this component instead, for
use when the item is used on a dark background.`,name:"light",required:!1,type:{name:"boolean"}},titleId:{defaultValue:null,description:"An id to provide a selector for the title element.",name:"titleId",required:!0,type:{name:"string"}},testId:{defaultValue:null,description:'Test ID used for e2e testing.\n\nIn this case, this component is internal, so `testId` is composed with\nthe `testId` passed down from the Dialog variant + a suffix to scope it\nto this component.\n@example For testId="some-random-id"\nThe result will be: `some-random-id-modal-header`',name:"testId",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"The dialog subtitle.",name:"subtitle",required:!0,type:{name:"string"}},breadcrumbs:{defaultValue:null,description:"Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.",name:"breadcrumbs",required:!0,type:{name:'ReactElement<Readonly<AriaAttributes> & Readonly<{ role?: AriaRole | undefined; }> & { children: ReactElement<Readonly<AriaAttributes> & Readonly<...> & { ...; } & RefAttributes<...>, string | JSXElementConstructor<...>> | ReactElement<...>[]; "aria-label"?: string | undefined; testId?: string | undefined; } & RefAt...'}}}}}catch{}const j='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';class Y extends d.Component{constructor(){super(...arguments),this.getModalRoot=e=>{if(!e)return;const t=g.findDOMNode(e);if(!t)throw new Error("Assertion error: modal root should exist after mount");this.modalRoot=t},this.handleFocusMoveToLast=()=>{this.focusElementIn(!1)},this.handleFocusMoveToFirst=()=>{this.focusElementIn(!0)}}tryToFocus(e){if(e instanceof HTMLElement){try{e.focus()}catch{}return document.activeElement===e}}focusElementIn(e){const t=this.modalRoot,a=Array.from(t.querySelectorAll(j)),n=e?0:a.length-1,s=a[n];this.tryToFocus(s)}render(){const{style:e}=this.props;return y(d.Fragment,{children:[o("div",{tabIndex:0,className:"modal-focus-trap-first",onFocus:this.handleFocusMoveToLast,style:{position:"fixed"}}),o(c,{style:e,ref:this.getModalRoot,children:this.props.children}),o("div",{tabIndex:0,className:"modal-focus-trap-last",onFocus:this.handleFocusMoveToFirst,style:{position:"fixed"}})]})}}try{focustrap.displayName="focustrap",focustrap.__docgenInfo={description:"",displayName:"focustrap",props:{style:{defaultValue:null,description:`Style applied to the View containing children.
TODO(kevinb): only allow z-index to be specified.  We'll be able to remove
this prop once we remove all uses of z-indexes from webapp.`,name:"style",required:!1,type:{name:"any"}}}}}catch{}const J="data-modal-launcher-portal",X='a[href], details, input, textarea, select, button:not([aria-label^="Close"])';function K(l){return Array.from(l.querySelectorAll(X))}class G extends d.Component{constructor(){super(...arguments),this._mousePressedOutside=!1,this.handleMouseDown=e=>{this._mousePressedOutside=e.target===e.currentTarget},this.handleMouseUp=e=>{e.target===e.currentTarget&&this._mousePressedOutside&&this.props.onCloseModal(),this._mousePressedOutside=!1}}componentDidMount(){const e=g.findDOMNode(this);if(!e)return;const t=this._getInitialFocusElement(e)||this._getFirstFocusableElement(e)||this._getDialogElement(e);setTimeout(()=>{t.focus()},0)}_getInitialFocusElement(e){const{initialFocusId:t}=this.props;return t?g.findDOMNode(e.querySelector(`#${t}`)):null}_getFirstFocusableElement(e){const t=K(e);return t?t[0]:null}_getDialogElement(e){const t=g.findDOMNode(e.querySelector('[role="dialog"]'));return t.tabIndex=-1,t}render(){const{children:e,testId:t}=this.props,a={[J]:!0};return o(c,{style:Q.modalPositioner,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,testId:t,...a,children:e})}}const Q=p.StyleSheet.create({modalPositioner:{position:"fixed",left:0,top:0,width:"100%",height:"100%",alignItems:"center",justifyContent:"center",overflow:"auto",background:h.offBlack64}});try{modalbackdrop.displayName="modalbackdrop",modalbackdrop.__docgenInfo={description:"A private component used by ModalLauncher. This is the fixed-position\ncontainer element that gets mounted outside the DOM. It overlays the modal\ncontent (provided as `children`) over the content, with a gray backdrop\nbehind it.\n\nThis component is also responsible for cloning the provided modal `children`,\nand adding an `onClose` prop that will call `onCloseModal`. If an\n`onClose` prop is already provided, the two are merged.",displayName:"modalbackdrop",props:{onCloseModal:{defaultValue:null,description:"",name:"onCloseModal",required:!0,type:{name:"() => unknown"}},initialFocusId:{defaultValue:null,description:`The selector for the element that will be focused when the dialog shows.
When not set, the first tabbable element within the dialog will be used.`,name:"initialFocusId",required:!1,type:{name:"string"}},testId:{defaultValue:null,description:"Test ID used for e2e testing.",name:"testId",required:!1,type:{name:"string"}}}}}catch{}const x=(()=>{if(typeof window>"u")return!1;const l=window.navigator.userAgent;return l.indexOf("iPad")>-1||l.indexOf("iPhone")>-1})(),T=class r extends d.Component{componentDidMount(){if(r.numModalsOpened===0){const e=document.body;if(!e)throw new Error("couldn't find document.body");r.oldOverflow=e.style.overflow,r.oldScrollY=window.scrollY,x&&(r.oldPosition=e.style.position,r.oldWidth=e.style.width,r.oldTop=e.style.top),e.style.overflow="hidden",x&&(e.style.position="fixed",e.style.width="100%",e.style.top=`${-r.oldScrollY}px`)}r.numModalsOpened++}componentWillUnmount(){if(r.numModalsOpened--,r.numModalsOpened===0){const e=document.body;if(!e)throw new Error("couldn't find document.body");e.style.overflow=r.oldOverflow,x&&(e.style.position=r.oldPosition,e.style.width=r.oldWidth,e.style.top=r.oldTop),typeof window<"u"&&window.scrollTo&&window.scrollTo(0,r.oldScrollY)}}render(){return null}};T.numModalsOpened=0;let Z=T;const ee={closeModal:void 0},k=d.createContext(ee);k.displayName="ModalContext";const E=k;class V extends d.Component{constructor(){super(...arguments),this.state={opened:!1},this._saveLastElementFocused=()=>{this.lastElementFocusedOutsideModal=document.activeElement},this._openModal=()=>{this._saveLastElementFocused(),this.setState({opened:!0})},this._returnFocus=()=>{const{closedFocusId:e,schedule:t}=this.props,a=this.lastElementFocusedOutsideModal;if(e){const n=g.findDOMNode(document.getElementById(e));if(n){t.animationFrame(()=>{n.focus()});return}}a!=null&&t.animationFrame(()=>{a.focus()})},this.handleCloseModal=()=>{this.setState({opened:!1},()=>{const{onClose:e}=this.props;e==null||e(),this._returnFocus()})}}static getDerivedStateFromProps(e,t){return typeof e.opened=="boolean"&&e.children&&console.warn("'children' and 'opened' can't be used together"),typeof e.opened=="boolean"&&!e.onClose&&console.warn("'onClose' should be used with 'opened'"),typeof e.opened!="boolean"&&!e.children&&console.warn("either 'children' or 'opened' must be set"),{opened:typeof e.opened=="boolean"?e.opened:t.opened}}componentDidUpdate(e){!e.opened&&this.props.opened&&this._saveLastElementFocused()}_renderModal(){return typeof this.props.modal=="function"?this.props.modal({closeModal:this.handleCloseModal}):this.props.modal}render(){const e=this.props.children?this.props.children({openModal:this._openModal}):null,{body:t}=document;return t?y(E.Provider,{value:{closeModal:this.handleCloseModal},children:[e,this.state.opened&&g.createPortal(o(Y,{style:oe.container,children:o(G,{initialFocusId:this.props.initialFocusId,testId:this.props.testId,onCloseModal:this.props.backdropDismissEnabled?this.handleCloseModal:()=>{},children:this._renderModal()})}),t),this.state.opened&&o(te,{onClose:this.handleCloseModal}),this.state.opened&&o(Z,{})]}):null}}V.defaultProps={backdropDismissEnabled:!0};class te extends d.Component{constructor(){super(...arguments),this._handleKeyup=e=>{e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this.props.onClose())}}componentDidMount(){window.addEventListener("keyup",this._handleKeyup)}componentWillUnmount(){window.removeEventListener("keyup",this._handleKeyup)}render(){return null}}const oe=p.StyleSheet.create({container:{zIndex:1080}}),ye=R(V);try{modallauncher.displayName="modallauncher",modallauncher.__docgenInfo={description:"",displayName:"modallauncher",props:{children:{defaultValue:null,description:`WARNING: This props should only be used when using the component as a
controlled component.`,name:"children",required:!1,type:{name:"((arg1: { openModal: () => unknown; }) => ReactNode)"}},testId:{defaultValue:null,description:"Test ID used for e2e testing. It's set on the ModalBackdrop",name:"testId",required:!1,type:{name:"string"}},opened:{defaultValue:null,description:`Renders the modal when true, renders nothing when false.

Using this prop makes the component behave as a controlled component.
The parent is responsible for managing the opening/closing of the modal
when using this prop.  \`onClose\` should always be used and \`children\`
should never be used with this prop.  Not doing so will result in an
error being thrown.`,name:"opened",required:!1,type:{name:"boolean"}},backdropDismissEnabled:{defaultValue:null,description:"Enables the backdrop to dismiss the modal on click/tap",name:"backdropDismissEnabled",required:!1,type:{name:"boolean"}},modal:{defaultValue:null,description:`The modal to render.

The modal will be rendered inside of a container whose parent is
document.body. This allows us to use ModalLauncher within menus and
other components that clip their content. If the modal needs to close
itself by some other means than tapping the backdrop or the default
close button a render callback can be passed. The closeModal function
provided to this callback can be called to close the modal.

Note: Don't call \`closeModal\` while rendering! It should be used to
respond to user intearction, like \`onClick\`.`,name:"modal",required:!0,type:{name:"ModalElement | ((props: { closeModal: () => void; }) => ModalElement)"}},initialFocusId:{defaultValue:null,description:`The selector for the element that will be focused when the dialog shows.
When not set, the first tabbable element within the dialog will be used.`,name:"initialFocusId",required:!1,type:{name:"string"}},closedFocusId:{defaultValue:null,description:`The selector for the element that will be focused after the dialog
closes. When not set, the last element focused outside the modal will
be used if it exists.`,name:"closedFocusId",required:!1,type:{name:"string"}},onClose:{defaultValue:null,description:`If the parent needs to be notified when the modal is closed, use this
prop. You probably want to use this instead of \`onClose\` on the modals
themselves, since this will capture a more complete set of close events.

Called when the modal needs to notify the parent component that it should
be closed.

This prop must be used when the component is being used as a controlled
component.`,name:"onClose",required:!1,type:{name:"(() => unknown)"}}}}}catch{}class _ extends d.Component{static isClassOf(e){return e&&e.type&&e.type.__IS_MODAL_CONTENT__}render(){const{scrollOverflow:e,style:t,children:a}=this.props;return o(v,{styleSheets:ne,children:({styles:n})=>o(c,{style:[n.wrapper,e&&n.scrollOverflow],children:o(c,{style:[n.content,t],children:a})})})}}_.defaultProps={scrollOverflow:!0};_.__IS_MODAL_CONTENT__=!0;const ne={all:p.StyleSheet.create({wrapper:{flex:1,display:"block"},scrollOverflow:{overflow:"auto"},content:{flex:1,minHeight:"100%",padding:i.xLarge_32,boxSizing:"border-box"}}),small:p.StyleSheet.create({content:{padding:`${i.xLarge_32}px ${i.medium_16}px`}})};try{modalcontent.displayName="modalcontent",modalcontent.__docgenInfo={description:"The Modal content included after the header",displayName:"modalcontent",props:{scrollOverflow:{defaultValue:{value:"true"},description:"Should the content scroll on overflow, or just expand.",name:"scrollOverflow",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"The contents of the ModalContent",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"Optional styling to apply to the contents.",name:"style",required:!1,type:{name:"any"}}}}}catch{}class ae extends d.Component{render(){const{light:e,onClick:t,style:a,testId:n}=this.props;return o(E.Consumer,{children:({closeModal:s})=>{if(s&&t)throw new Error("You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead");return o(B,{icon:L,"aria-label":"Close modal",onClick:t||s,kind:e?"primary":"tertiary",light:e,style:a,testId:n})}})}}try{closebutton.displayName="closebutton",closebutton.__docgenInfo={description:"",displayName:"closebutton",props:{light:{defaultValue:null,description:`Whether the button is on a dark/colored background.

Sets primary button background color to white, and secondary and
tertiary button title to color.`,name:"light",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"(() => unknown)"}},style:{defaultValue:null,description:"Optional custom styles.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:'Test ID used for e2e testing.\n\nIn this case, this component is internal, so `testId` is composed with\nthe `testId` passed down from the Dialog variant + a suffix to scope it\nto this component.\n@example For testId="some-random-id"\nThe result will be: `some-random-id-modal-panel`',name:"testId",required:!1,type:{name:"string"}}}}}catch{}class q extends d.Component{renderMainContent(){const{content:e,footer:t,scrollOverflow:a}=this.props,n=_.isClassOf(e)?e:o(_,{children:e});return n&&d.cloneElement(n,{scrollOverflow:a,style:[!!t&&w.hasFooter,n.props.style]})}render(){const{closeButtonVisible:e,footer:t,header:a,light:n,onClose:s,style:m,testId:u}=this.props,f=this.renderMainContent();return y(c,{style:[w.wrapper,!n&&w.dark,m],testId:u&&`${u}-panel`,children:[e&&o(ae,{light:!n,onClick:s,style:w.closeButton,testId:u&&`${u}-close`}),a,f,!t||C.isClassOf(t)?t:o(C,{children:t})]})}}q.defaultProps={closeButtonVisible:!0,scrollOverflow:!0,light:!0};const w=p.StyleSheet.create({wrapper:{flex:"1 1 auto",position:"relative",display:"flex",flexDirection:"column",background:"white",boxSizing:"border-box",overflow:"hidden",height:"100%",width:"100%"},closeButton:{position:"absolute",right:i.medium_16,top:i.medium_16,zIndex:1},dark:{background:h.darkBlue,color:h.white},hasFooter:{paddingBottom:i.xLarge_32}});try{modalpanel.displayName="modalpanel",modalpanel.__docgenInfo={description:`ModalPanel is  the content container.

**Implementation notes:**

If you are creating a custom Dialog, make sure to follow these guidelines:
- Make sure to add this component inside the [ModalDialog](/#modaldialog).
- If needed, you can also add a [ModalHeader](/#modalheader) using the
  \`header\` prop. Same goes for [ModalFooter](/#modalfooter).
- If you need to create e2e tests, make sure to pass a \`testId\` prop. This
  will be passed down to this component using a sufix: e.g.
  \`some-random-id-ModalPanel\`. This scope will be propagated to the
  CloseButton element as well: e.g. \`some-random-id-CloseButton\`.

\`\`\`js
<ModalDialog>
     <ModalPanel content={"custom content goes here"} />
</ModalDialog>
\`\`\``,displayName:"modalpanel",props:{content:{defaultValue:null,description:`The main contents of the ModalPanel. All other parts of the panel
are positioned around it.`,name:"content",required:!0,type:{name:"ReactNode | ReactElement<Props, string | JSXElementConstructor<any>>"}},header:{defaultValue:null,description:"The modal header to show at the top of the panel.",name:"header",required:!1,type:{name:"ReactNode | ReactElement<Props, string | JSXElementConstructor<any>>"}},footer:{defaultValue:null,description:"A footer to show beneath the contents.",name:"footer",required:!1,type:{name:"ReactNode | ReactElement<Props, string | JSXElementConstructor<any>>"}},closeButtonVisible:{defaultValue:{value:"true"},description:"When true, the close button is shown; otherwise, the close button is not shown.",name:"closeButtonVisible",required:!1,type:{name:"boolean"}},scrollOverflow:{defaultValue:{value:"true"},description:`Should the contents of the panel become scrollable should they
become too tall?`,name:"scrollOverflow",required:!1,type:{name:"boolean"}},light:{defaultValue:{value:"true"},description:`Whether to display the "light" version of this component instead, for
use when the item is used on a dark background.`,name:"light",required:!1,type:{name:"boolean"}},style:{defaultValue:null,description:"Any optional styling to apply to the panel.",name:"style",required:!1,type:{name:"any"}},onClose:{defaultValue:null,description:"Called when the close button is clicked.\n\nIf you're using `ModalLauncher`, you should not use this prop!\nInstead, to listen for when the modal closes, add an `onClose` handler\nto the `ModalLauncher`.  Doing so will throw an error.",name:"onClose",required:!1,type:{name:"(() => unknown)"}},testId:{defaultValue:null,description:"Test ID used for e2e testing.\n\nIn this case, this `testId` comes from the `testId` prop defined in the\nDialog variant (e.g. OnePaneDialog).",name:"testId",required:!1,type:{name:"string"}}}}}catch{}class le extends d.Component{renderHeader(e){const{title:t,breadcrumbs:a=void 0,subtitle:n=void 0,testId:s}=this.props;return a?o(I,{title:t,breadcrumbs:a,titleId:e,testId:s&&`${s}-header`}):n?o(I,{title:t,subtitle:n,titleId:e,testId:s&&`${s}-header`}):o(I,{title:t,titleId:e,testId:s&&`${s}-header`})}render(){const{onClose:e,footer:t,content:a,above:n,below:s,style:m,closeButtonVisible:u,testId:f,titleId:M,role:b,"aria-describedby":O}=this.props;return o(v,{styleSheets:ie,children:({styles:N})=>o(F,{id:M,scope:"modal",children:D=>o(S,{style:[N.dialog,m],above:n,below:s,testId:f,"aria-labelledby":D,"aria-describedby":O,role:b,children:o(q,{onClose:e,header:this.renderHeader(D),content:a,footer:t,closeButtonVisible:u,testId:f})})})})}}le.defaultProps={closeButtonVisible:!0};const ie={small:p.StyleSheet.create({dialog:{width:"100%",height:"100%",overflow:"hidden"}}),mdOrLarger:p.StyleSheet.create({dialog:{width:"93.75%",maxWidth:576,height:"81.25%",maxHeight:624}})};try{onepanedialog.displayName="onepanedialog",onepanedialog.__docgenInfo={description:`This is the standard layout for most straightforward modal experiences.

The ModalHeader is required, but the ModalFooter is optional.
The content of the dialog itself is fully customizable, but the
left/right/top/bottom padding is fixed.

### Usage

\`\`\`jsx
import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {Body} from "@khanacademy/wonder-blocks-typography";

<OnePaneDialog
    title="Some title"
    content={
        <Body>
            {\`Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est.\`}
        </Body>
    }
/>
\`\`\``,displayName:"onepanedialog",props:{content:{defaultValue:null,description:"The content of the modal, appearing between the titlebar and footer.",name:"content",required:!0,type:{name:"ReactNode"}},title:{defaultValue:null,description:"The title of the modal, appearing in the titlebar.",name:"title",required:!0,type:{name:"string"}},footer:{defaultValue:null,description:`The content of the modal's footer. A great place for buttons!

Content is right-aligned by default. To control alignment yourself,
provide a container element with 100% width.`,name:"footer",required:!1,type:{name:"ReactNode"}},onClose:{defaultValue:null,description:"Called when the close button is clicked.\n\nIf you're using `ModalLauncher`, you probably shouldn't use this prop!\nInstead, to listen for when the modal closes, add an `onClose` handler\nto the `ModalLauncher`.  Doing so will result in a console.warn().",name:"onClose",required:!1,type:{name:"(() => unknown)"}},closeButtonVisible:{defaultValue:{value:"true"},description:"When true, the close button is shown; otherwise, the close button is not shown.",name:"closeButtonVisible",required:!1,type:{name:"boolean"}},above:{defaultValue:null,description:`When set, provides a component that can render content above the top of the modal;
when not set, no additional content is shown above the modal.
This prop is passed down to the ModalDialog.`,name:"above",required:!1,type:{name:"ReactNode"}},below:{defaultValue:null,description:`When set, provides a component that will render content below the bottom of the modal;
when not set, no additional content is shown below the modal.
This prop is passed down to the ModalDialog.

NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
such as by wrapping it in a View.`,name:"below",required:!1,type:{name:"ReactNode"}},role:{defaultValue:null,description:`When set, overrides the default role value. Default role is "dialog"
Roles other than dialog and alertdialog aren't appropriate for this
component`,name:"role",required:!1,type:{name:"enum",value:[{value:'"dialog"'},{value:'"alertdialog"'}]}},style:{defaultValue:null,description:"Optional custom styles.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Test ID used for e2e testing. This ID will be passed down to the Dialog.",name:"testId",required:!1,type:{name:"string"}},titleId:{defaultValue:null,description:`An optional id parameter for the title. If one is
not provided, a unique id will be generated.`,name:"titleId",required:!1,type:{name:"string"}},"aria-describedby":{defaultValue:null,description:"The ID of the content describing this dialog, if applicable.",name:"aria-describedby",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"The subtitle of the modal, appearing in the titlebar, below the title.",name:"subtitle",required:!0,type:{name:"string"}},breadcrumbs:{defaultValue:null,description:"Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.",name:"breadcrumbs",required:!0,type:{name:'ReactElement<Readonly<AriaAttributes> & Readonly<{ role?: AriaRole | undefined; }> & { children: ReactElement<Readonly<AriaAttributes> & Readonly<...> & { ...; } & RefAttributes<...>, string | JSXElementConstructor<...>> | ReactElement<...>[]; "aria-label"?: string | undefined; testId?: string | undefined; } & RefAt...'}}}}}catch{}export{ye as M,le as O,q as a,S as b,I as c,C as d,J as e};
//# sourceMappingURL=one-pane-dialog-da34165b.js.map
