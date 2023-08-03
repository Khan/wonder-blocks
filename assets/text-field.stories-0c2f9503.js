import{a as n,j as u}from"./jsx-runtime-309e447d.js";import{r as s}from"./index-9f32f44c.js";import{V as c,T as V,l as Le}from"./render-state-root-891c0d56.js";import{S as p,C as x}from"./index-f641b98f.js";import{S as b}from"./strut-c6011196.js";import{B as z}from"./button-b2794e32.js";import{a as Pe}from"./footnote-761d2bcc.js";import{T as d}from"./labeled-text-field-d77d5301.js";import{p as q}from"./package-55b6077d.js";import{C as He}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./radio-0fc824b1.js";const Ae={id:{description:"The unique identifier for the input.",type:{name:"string",required:!0},table:{type:{summary:"string"}},control:{type:"text"}},type:{description:"Determines the type of input. Defaults to text. This may change the appearance or type of characters allowed.",table:{type:{summary:'"text" | "password" | "email" | "number" | "tel"'},defaultValue:{summary:"text"}},options:["text","password","email","number","tel"],control:{type:"select"}},value:{description:"The input value.",type:{name:"string",required:!0},table:{type:{summary:"string"}},control:{type:"text"}},autoComplete:{description:"Specifies if the input field allows autocomplete.",table:{type:{summary:"string",detail:'There is a large number of options, including "on", "off", "username", "current-password", and many others.'}},control:{type:"text"}},disabled:{description:"Makes a read-only input field that cannot be focused.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}},control:{type:"boolean"}},light:{description:"Change the default focus ring color to fit a dark background.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}},control:{type:"boolean"}},required:{description:"Whether this field is required to to continue, or the error message to render if this field is left blank. Pass in a message instead of `true` if possible.",table:{type:{summary:"boolean | string",detail:"The string will not be used if a `validate` prop is passed in."}},control:{type:"null"}},placeholder:{description:"Provide hints or examples of what to enter.",table:{type:{summary:"string"}},control:{type:"text"}},readOnly:{description:"Specifies if the input field is read-only.",table:{type:{summary:"boolean"}},control:{type:"boolean"}},style:{description:"Custom styles for the input.",table:{type:{summary:"StyleType"}}},testId:{description:"Optional test ID for e2e testing.",table:{type:{summary:"string"}},control:{type:"text"}},validate:{description:"Provide a validation for the input value. Return a string error message or null | void for a valid input.",table:{type:{summary:"(value: string) => ?string"}},control:{type:"null"}},onValidate:{description:"Called right after the TextField input is validated.",table:{category:"Events",type:{summary:"(errorMessage: ?string) => mixed"}}},onChange:{description:"Called when the value has changed. Use this in conjunction with the `value` prop to update the string rendered in the input field.",type:{name:"other",value:"(newValue: string) => mixed",required:!0},table:{category:"Events",type:{summary:"(newValue: string) => mixed"}}},onKeyDown:{action:"keyDown",description:"Called when a key is pressed.",table:{category:"Events",type:{summary:"(event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed"}}},onFocus:{action:"focus",description:"Called when the element has been focused.",table:{category:"Events",type:{summary:"(event: SyntheticFocusEvent<HTMLInputElement>) => mixed"}}},onBlur:{action:"blur",description:"Called when the element has been blurred.",table:{category:"Events",type:{summary:"(event: SyntheticFocusEvent<HTMLInputElement>) => mixed"}}}},nt={title:"Form / TextField",component:d,parameters:{componentSubtitle:n(He,{name:q.name,version:q.version})},argTypes:Ae},A={args:{id:"some-id",type:"text",value:"",disabled:!1,placeholder:"",required:!1,light:!1,testId:"",readOnly:!1,autoComplete:"off",validate:()=>{},onValidate:()=>{},onChange:()=>{},onKeyDown:()=>{},onFocus:()=>{},onBlur:()=>{}}},S=()=>{const[r,o]=s.useState("");return n(d,{id:"tf-1",type:"text",value:r,placeholder:"Text",onChange:t=>{o(t)},onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()}})};S.parameters={docs:{storyDescription:"An input field with type `text` takes all kinds of characters."}};const T=()=>{const[r,o]=s.useState("");return n(d,{id:"tf-2",type:"text",value:r,onChange:t=>{o(t)},onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},required:!0})};T.parameters={docs:{description:{story:`A required field will have error styling if the
        field is left blank. To observe this, type something into the
        field, backspace all the way, and then shift focus out of the field.`}},chromatic:{disableSnapshot:!0}};const C=()=>{const[r,o]=s.useState("12345");return n(d,{id:"tf-3",type:"number",value:r,placeholder:"Number",onChange:t=>{o(t)},onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()}})};C.parameters={docs:{description:{story:"An input field with type `number` will only take numeric characters as input."}}};const F=()=>{const[r,o]=s.useState("Password123"),[a,l]=s.useState(),[t,i]=s.useState(!1);return u(c,{children:[n(d,{id:"tf-4",type:"password",value:r,placeholder:"Password",validate:e=>{if(e.length<8)return"Password must be at least 8 characters long";if(!/\d/.test(e))return"Password must contain a numeric value"},onValidate:e=>{l(e)},onChange:e=>{o(e)},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},onFocus:()=>{i(!0)},onBlur:()=>{i(!1)}}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessage,children:a})]})]})};F.parameters={docs:{description:{story:`An input field with type \`password\` will
        obscure the input value. It also often contains validation.
        In this example, the password must be over 8 characters long and
        must contain a numeric value.`}}};const D=()=>{const[r,o]=s.useState("khan@khanacademy.org"),[a,l]=s.useState(),[t,i]=s.useState(!1);return u(c,{children:[n(d,{id:"tf-5",type:"email",value:r,placeholder:"Email",validate:e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},onValidate:e=>{l(e)},onChange:e=>{o(e)},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},onFocus:()=>{i(!0)},onBlur:()=>{i(!1)}}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessage,children:a})]})]})};D.parameters={docs:{description:{story:"An input field with type `email` will automatically\n        validate an input on submit to ensure it's either formatted properly\n        or blank. `TextField` will run validation on blur if the\n        `validate` prop is passed in, as in this example."}}};const E=()=>{const[r,o]=s.useState("123-456-7890"),[a,l]=s.useState(),[t,i]=s.useState(!1);return u(c,{children:[n(d,{id:"tf-6",type:"tel",value:r,placeholder:"Telephone",validate:e=>{if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e))return"Invalid US telephone number"},onValidate:e=>{l(e)},onChange:e=>{o(e)},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},onFocus:()=>{i(!0)},onBlur:()=>{i(!1)}}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessage,children:a})]})]})};E.parameters={docs:{description:{story:"An input field with type `tel` will NOT\n        validate an input on submit by default as telephone numbers\n        can vary considerably. `TextField` will run validation on blur\n        if the `validate` prop is passed in, as in this example."}}};const K=()=>{const[r,o]=s.useState("khan"),[a,l]=s.useState(),[t,i]=s.useState(!1);return u(c,{children:[n(d,{id:"tf-7",type:"email",value:r,placeholder:"Email",validate:e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},onValidate:e=>{l(e)},onChange:e=>{o(e)},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},onFocus:()=>{i(!0)},onBlur:()=>{i(!1)}}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessage,children:a})]})]})};K.parameters={docs:{description:{story:"If an input value fails validation,\n        `TextField` will have error styling."}}};const M=()=>{const[r,o]=s.useState("khan@khanacademy.org"),[a,l]=s.useState(),[t,i]=s.useState(!1),h=e=>{o(e)},y=e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},m=e=>{l(e)},f=e=>{e.key==="Enter"&&e.currentTarget.blur()},w=()=>{i(!0)},v=()=>{i(!1)};return u(c,{style:g.darkBackground,children:[n(d,{id:"tf-9",type:"email",value:r,placeholder:"Email",light:!0,validate:y,onValidate:m,onChange:h,onKeyDown:f,onFocus:w,onBlur:v}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessageLight,children:a})]})]})};M.parameters={docs:{description:{story:"If the `light` prop is set to true,\n        `TextField` will have light styling. This is intended to be used\n        on a dark background. There is also a specific light styling for the\n        error state, as seen in the `ErrorLight` story."}}};const k=()=>{const[r,o]=s.useState("khan"),[a,l]=s.useState(),[t,i]=s.useState(!1),h=e=>{o(e)},y=e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},m=e=>{l(e)},f=e=>{e.key==="Enter"&&e.currentTarget.blur()},w=()=>{i(!0)},v=()=>{i(!1)};return u(c,{style:g.darkBackground,children:[n(d,{id:"tf-7",type:"email",value:r,placeholder:"Email",light:!0,validate:y,onValidate:m,onChange:h,onKeyDown:f,onFocus:w,onBlur:v}),!t&&a&&u(c,{children:[n(b,{size:p.xSmall_8}),n(V,{style:g.errorMessage,children:a})]})]})};k.parameters={docs:{description:{story:"If an input value fails validation and the\n        `light` prop is true, `TextField` will have light error styling."}}};const R=()=>n(d,{id:"tf-8",value:"",placeholder:"This field is disabled.",onChange:()=>{},disabled:!0});R.parameters={docs:{description:{story:"If the `disabled` prop is set to true,\n        `TextField` will have disabled styling and will not be interactable."}}};const B=()=>{const[r,o]=s.useState(""),a=t=>{o(t)},l=t=>{t.key==="Enter"&&t.currentTarget.blur()};return n(d,{id:"tf-10",style:g.customField,type:"text",value:r,placeholder:"Text",onChange:a,onKeyDown:l})};B.parameters={docs:{description:{story:"`TextField` can take in custom styles that\n        override the default styles. This example has custom styles for the\n        `backgroundColor`, `color`, `border`, `maxWidth`, and\n        placeholder `color` properties."}}};const I=()=>{const[r,o]=s.useState(""),a=s.createRef(),l=h=>{o(h)},t=h=>{h.key==="Enter"&&h.currentTarget.blur()},i=()=>{a.current&&a.current.focus()};return u(c,{children:[n(d,{id:"tf-11",type:"text",value:r,placeholder:"Text",onChange:l,onKeyDown:t,ref:a}),n(b,{size:p.medium_16}),n(z,{style:g.button,onClick:i,children:"Focus Input"})]})};I.parameters={docs:{description:{story:"If you need to save a reference to the input\n        field, you can do so by using the `ref` prop. In this example,\n        we want the input field to receive focus when the button is\n        pressed. We can do this by creating a React ref of type\n        `HTMLInputElement` and passing it into `TextField`'s `ref` prop.\n        Now we can use the ref variable in the `handleSubmit` function to\n        shift focus to the field."},chromatic:{disableSnapshot:!0}}};const _=()=>{const[r,o]=s.useState("Khan");return n(d,{id:"tf-12",type:"text",value:r,placeholder:"Text",onChange:t=>{o(t)},onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},readOnly:!0})};_.parameters={docs:{description:{story:`An input field with the prop \`readOnly\` set
        to true is not interactable. It looks the same as if it were not
        read only, and it can still receive focus, but the interaction
        point will not appear and the input will not change.`},chromatic:{disableSnapshot:!0}}};const L=()=>{const[r,o]=s.useState(""),[a,l]=s.useState(!1),t=m=>{o(m)},i=m=>{m.key==="Enter"&&m.currentTarget.blur()},h=()=>{l(!a)},y=()=>u(c,{style:{flexDirection:"row"},children:[n(z,{onClick:()=>{},children:"Some other focusable element"}),n(d,{id:"tf-13",value:r,placeholder:"Placeholder",autoFocus:!0,onChange:t,onKeyDown:i,style:{flexGrow:1,marginLeft:p.small_12}})]});return u(c,{children:[n(Pe,{style:{marginBottom:p.small_12},children:"Press the button to view the text field with autofocus."}),n(z,{onClick:h,style:{width:300,marginBottom:p.large_24},children:"Toggle autoFocus demo"}),a&&n(y,{})]})};L.parameters={docs:{description:{story:`TextField takes an \`autoFocus\` prop, which
            makes it autofocus on page load. Try to avoid using this if
            possible as it is bad for accessibility.

Press the button
            to view this example. Notice that the text field automatically
            receives focus. Upon pressing the botton, try typing and
            notice that the text appears directly in the text field. There
            is another focusable element present to demonstrate that
            focus skips that element and goes straight to the text field.`}}};const P=()=>{const[r,o]=s.useState("");return u("form",{children:[n(d,{id:"tf-14",type:"text",value:r,placeholder:"Name",onChange:t=>{o(t)},onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},style:g.fieldWithButton,autoComplete:"name"}),n(z,{type:"submit",children:"Submit"})]})};P.parameters={docs:{description:{story:`If \`TextField\`'s \`autocomplete\` prop is set,
        the browser can predict values for the input. When the user starts
        to type in the field, a list of options will show up based on
        values that may have been submitted at a previous time.
        In this example, the text field provides options after you
        input a value, press the submit button, and refresh the page.`},chromatic:{disableSnapshot:!0}}};const g=Le.StyleSheet.create({errorMessage:{color:x.red,paddingLeft:p.xxxSmall_4},errorMessageLight:{color:x.white,paddingLeft:p.xxxSmall_4},darkBackground:{backgroundColor:x.darkBlue,padding:p.medium_16},customField:{backgroundColor:x.darkBlue,color:x.white,border:"none",maxWidth:250,"::placeholder":{color:x.white64}},button:{maxWidth:150},fieldWithButton:{marginBottom:p.medium_16}});var O,W,$;A.parameters={...A.parameters,docs:{...(O=A.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    id: "some-id",
    type: "text",
    value: "",
    disabled: false,
    placeholder: "",
    required: false,
    light: false,
    testId: "",
    readOnly: false,
    autoComplete: "off",
    validate: () => undefined,
    onValidate: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {}
  }
}`,...($=(W=A.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var N,j,U;S.parameters={...S.parameters,docs:{...(N=S.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <TextField id="tf-1" type="text" value={value} placeholder="Text" onChange={handleChange} onKeyDown={handleKeyDown} />;
}`,...(U=(j=S.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var G,J,Q;T.parameters={...T.parameters,docs:{...(G=T.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <TextField id="tf-2" type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} required={true} />;
}`,...(Q=(J=T.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;C.parameters={...C.parameters,docs:{...(X=C.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("12345");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <TextField id="tf-3" type="number" value={value} placeholder="Number" onChange={handleChange} onKeyDown={handleKeyDown} />;
}`,...(Z=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,ne;F.parameters={...F.parameters,docs:{...(ee=F.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Password123");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/\\d/.test(value)) {
      return "Password must contain a numeric value";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View>
            <TextField id="tf-4" type="password" value={value} placeholder="Password" validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>}
        </View>;
}`,...(ne=(te=F.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,se,re;D.parameters={...D.parameters,docs:{...(ae=D.parameters)==null?void 0:ae.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan@khanacademy.org");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View>
            <TextField id="tf-5" type="email" value={value} placeholder="Email" validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>}
        </View>;
}`,...(re=(se=D.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var oe,le,ie;E.parameters={...E.parameters,docs:{...(oe=E.parameters)==null?void 0:oe.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("123-456-7890");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    const telRegex = /^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!telRegex.test(value)) {
      return "Invalid US telephone number";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View>
            <TextField id="tf-6" type="tel" value={value} placeholder="Telephone" validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>}
        </View>;
}`,...(ie=(le=E.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var ue,de,ce;K.parameters={...K.parameters,docs:{...(ue=K.parameters)==null?void 0:ue.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View>
            <TextField id="tf-7" type="email" value={value} placeholder="Email" validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>}
        </View>;
}`,...(ce=(de=K.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var he,pe,me;M.parameters={...M.parameters,docs:{...(he=M.parameters)==null?void 0:he.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan@khanacademy.org");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View style={styles.darkBackground}>
            <TextField id="tf-9" type="email" value={value} placeholder="Email" light={true} validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessageLight}>
                        {errorMessage}
                    </_Text>
                </View>}
        </View>;
}`,...(me=(pe=M.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ge,ye,fe;k.parameters={...k.parameters,docs:{...(ge=k.parameters)==null?void 0:ge.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan");
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [focused, setFocused] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleValidate = (errorMessage?: string | null) => {
    setErrorMessage(errorMessage);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return <View style={styles.darkBackground}>
            <TextField id="tf-7" type="email" value={value} placeholder="Email" light={true} validate={validate} onValidate={handleValidate} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
            {!focused && errorMessage && <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>}
        </View>;
}`,...(fe=(ye=k.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var we,ve,be;R.parameters={...R.parameters,docs:{...(we=R.parameters)==null?void 0:we.docs,source:{originalSource:'() => <TextField id="tf-8" value="" placeholder="This field is disabled." onChange={() => {}} disabled={true} />',...(be=(ve=R.parameters)==null?void 0:ve.docs)==null?void 0:be.source}}};var xe,Ve,Se;B.parameters={...B.parameters,docs:{...(xe=B.parameters)==null?void 0:xe.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <TextField id="tf-10" style={styles.customField} type="text" value={value} placeholder="Text" onChange={handleChange} onKeyDown={handleKeyDown} />;
}`,...(Se=(Ve=B.parameters)==null?void 0:Ve.docs)==null?void 0:Se.source}}};var Te,Ce,Fe;I.parameters={...I.parameters,docs:{...(Te=I.parameters)==null?void 0:Te.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleSubmit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return <View>
            <TextField id="tf-11" type="text" value={value} placeholder="Text" onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} />
            <Strut size={Spacing.medium_16} />
            <Button style={styles.button} onClick={handleSubmit}>
                Focus Input
            </Button>
        </View>;
}`,...(Fe=(Ce=I.parameters)==null?void 0:Ce.docs)==null?void 0:Fe.source}}};var De,Ee,Ke;_.parameters={..._.parameters,docs:{...(De=_.parameters)==null?void 0:De.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Khan");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <TextField id="tf-12" type="text" value={value} placeholder="Text" onChange={handleChange} onKeyDown={handleKeyDown} readOnly={true} />;
}`,...(Ke=(Ee=_.parameters)==null?void 0:Ee.docs)==null?void 0:Ke.source}}};var Me,ke,Re;L.parameters={...L.parameters,docs:{...(Me=L.parameters)==null?void 0:Me.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const [showDemo, setShowDemo] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleShowDemo = () => {
    setShowDemo(!showDemo);
  };
  const AutoFocusDemo = () => <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}}>Some other focusable element</Button>
            <TextField id="tf-13" value={value} placeholder="Placeholder" autoFocus={true} onChange={handleChange} onKeyDown={handleKeyDown} style={{
      flexGrow: 1,
      marginLeft: Spacing.small_12
    }} />
        </View>;
  return <View>
            <LabelLarge style={{
      marginBottom: Spacing.small_12
    }}>
                Press the button to view the text field with autofocus.
            </LabelLarge>
            <Button onClick={handleShowDemo} style={{
      width: 300,
      marginBottom: Spacing.large_24
    }}>
                Toggle autoFocus demo
            </Button>
            {showDemo && <AutoFocusDemo />}
        </View>;
}`,...(Re=(ke=L.parameters)==null?void 0:ke.docs)==null?void 0:Re.source}}};var Be,Ie,_e;P.parameters={...P.parameters,docs:{...(Be=P.parameters)==null?void 0:Be.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <form>
            <TextField id="tf-14" type="text" value={value} placeholder="Name" onChange={handleChange} onKeyDown={handleKeyDown} style={styles.fieldWithButton} autoComplete="name" />
            <Button type="submit">Submit</Button>
        </form>;
}`,...(_e=(Ie=P.parameters)==null?void 0:Ie.docs)==null?void 0:_e.source}}};const at=["Default","Text","Required","Number","Password","Email","Telephone","Error","Light","ErrorLight","Disabled","CustomStyle","Ref","ReadOnly","WithAutofocus","AutoComplete"];export{P as AutoComplete,B as CustomStyle,A as Default,R as Disabled,D as Email,K as Error,k as ErrorLight,M as Light,C as Number,F as Password,_ as ReadOnly,I as Ref,T as Required,E as Telephone,S as Text,L as WithAutofocus,at as __namedExportsOrder,nt as default};
//# sourceMappingURL=text-field.stories-0c2f9503.js.map
