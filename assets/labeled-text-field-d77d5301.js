import{a as l,j as q}from"./jsx-runtime-309e447d.js";import{r as d}from"./index-9f32f44c.js";import{C as $,R as E}from"./radio-0fc824b1.js";import{l as N,a as C,V as T,I as L}from"./render-state-root-891c0d56.js";import{S as k}from"./strut-c6011196.js";import{S as g,C as n,m as B,f as z}from"./index-f641b98f.js";import{c as A,L as I,s as G}from"./footnote-761d2bcc.js";const j=d.forwardRef((r,t)=>{const{disabled:a=!1,error:e=!1}=r;return l($,{...r,variant:"checkbox",disabled:a,error:e,ref:t})}),P=j;try{checkbox.displayName="checkbox",checkbox.__docgenInfo={description:`☑️ A nicely styled checkbox for all your checking needs. Can optionally take
label and description props.

If used by itself, a checkbox provides two options - checked and unchecked.
A group of checkboxes can be used to allow a user to select multiple values
from a list of options.

If you want a whole group of Checkbox[es] that are related, see the Choice
and CheckboxGroup components.

### Usage

\`\`\`jsx
import {Checkbox} from "@khanacademy/wonder-blocks-form";

const [checked, setChecked] = React.useState(false);

<Checkbox checked={checked} onChange={setChecked} />
\`\`\``,displayName:"checkbox",props:{"aria-activedescendant":{defaultValue:null,description:"Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.",name:"aria-activedescendant",required:!1,type:{name:"string"}},"aria-atomic":{defaultValue:null,description:"Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.",name:"aria-atomic",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-autocomplete":{defaultValue:null,description:`Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.`,name:"aria-autocomplete",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inline"'},{value:'"list"'},{value:'"both"'}]}},"aria-busy":{defaultValue:null,description:"Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.",name:"aria-busy",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-checked":{defaultValue:null,description:`Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
@see aria-pressed
@see aria-selected.`,name:"aria-checked",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-colcount":{defaultValue:null,description:`Defines the total number of columns in a table, grid, or treegrid.
@see aria-colindex.`,name:"aria-colcount",required:!1,type:{name:"number"}},"aria-colindex":{defaultValue:null,description:`Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
@see aria-colcount
@see aria-colspan.`,name:"aria-colindex",required:!1,type:{name:"number"}},"aria-colspan":{defaultValue:null,description:`Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-colindex
@see aria-rowspan.`,name:"aria-colspan",required:!1,type:{name:"number"}},"aria-controls":{defaultValue:null,description:`Identifies the element (or elements) whose contents or presence are controlled by the current element.
@see aria-owns.`,name:"aria-controls",required:!1,type:{name:"string"}},"aria-current":{defaultValue:null,description:"Indicates the element that represents the current item within a container or set of related elements.",name:"aria-current",required:!1,type:{name:'boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"'}},"aria-describedby":{defaultValue:null,description:`Identifies the element (or elements) that describes the object.
@see aria-labelledby`,name:"aria-describedby",required:!1,type:{name:"string"}},"aria-details":{defaultValue:null,description:`Identifies the element that provides a detailed, extended description for the object.
@see aria-describedby.`,name:"aria-details",required:!1,type:{name:"string"}},"aria-disabled":{defaultValue:null,description:`Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
@see aria-hidden
@see aria-readonly.`,name:"aria-disabled",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-dropeffect":{defaultValue:null,description:`Indicates what functions can be performed when a dragged object is released on the drop target.
@deprecated in ARIA 1.1`,name:"aria-dropeffect",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"copy"'},{value:'"execute"'},{value:'"link"'},{value:'"move"'},{value:'"popup"'}]}},"aria-errormessage":{defaultValue:null,description:`Identifies the element that provides an error message for the object.
@see aria-invalid
@see aria-describedby.`,name:"aria-errormessage",required:!1,type:{name:"string"}},"aria-expanded":{defaultValue:null,description:"Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.",name:"aria-expanded",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-flowto":{defaultValue:null,description:`Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.`,name:"aria-flowto",required:!1,type:{name:"string"}},"aria-grabbed":{defaultValue:null,description:`Indicates an element's "grabbed" state in a drag-and-drop operation.
@deprecated in ARIA 1.1`,name:"aria-grabbed",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-haspopup":{defaultValue:null,description:"Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.",name:"aria-haspopup",required:!1,type:{name:'boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog"'}},"aria-hidden":{defaultValue:null,description:`Indicates whether the element is exposed to an accessibility API.
@see aria-disabled.`,name:"aria-hidden",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-invalid":{defaultValue:null,description:`Indicates the entered value does not conform to the format expected by the application.
@see aria-errormessage.`,name:"aria-invalid",required:!1,type:{name:'boolean | "false" | "true" | "grammar" | "spelling"'}},"aria-keyshortcuts":{defaultValue:null,description:"Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.",name:"aria-keyshortcuts",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:`Defines a string value that labels the current element.
@see aria-labelledby.`,name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:`Identifies the element (or elements) that labels the current element.
@see aria-describedby.`,name:"aria-labelledby",required:!1,type:{name:"string"}},"aria-level":{defaultValue:null,description:"Defines the hierarchical level of an element within a structure.",name:"aria-level",required:!1,type:{name:"number"}},"aria-live":{defaultValue:null,description:"Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",name:"aria-live",required:!1,type:{name:"enum",value:[{value:'"off"'},{value:'"assertive"'},{value:'"polite"'}]}},"aria-modal":{defaultValue:null,description:"Indicates whether an element is modal when displayed.",name:"aria-modal",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiline":{defaultValue:null,description:"Indicates whether a text box accepts multiple lines of input or only a single line.",name:"aria-multiline",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiselectable":{defaultValue:null,description:"Indicates that the user may select more than one item from the current selectable descendants.",name:"aria-multiselectable",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-orientation":{defaultValue:null,description:"Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",name:"aria-orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},"aria-owns":{defaultValue:null,description:`Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
@see aria-controls.`,name:"aria-owns",required:!1,type:{name:"string"}},"aria-placeholder":{defaultValue:null,description:`Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.`,name:"aria-placeholder",required:!1,type:{name:"string"}},"aria-posinset":{defaultValue:null,description:`Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-setsize.`,name:"aria-posinset",required:!1,type:{name:"number"}},"aria-pressed":{defaultValue:null,description:`Indicates the current "pressed" state of toggle buttons.
@see aria-checked
@see aria-selected.`,name:"aria-pressed",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-readonly":{defaultValue:null,description:`Indicates that the element is not editable, but is otherwise operable.
@see aria-disabled.`,name:"aria-readonly",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-relevant":{defaultValue:null,description:`Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
@see aria-atomic.`,name:"aria-relevant",required:!1,type:{name:"enum",value:[{value:'"additions"'},{value:'"additions removals"'},{value:'"additions text"'},{value:'"all"'},{value:'"removals"'},{value:'"removals additions"'},{value:'"removals text"'},{value:'"text"'},{value:'"text additions"'},{value:'"text removals"'}]}},"aria-required":{defaultValue:null,description:"Indicates that user input is required on the element before a form may be submitted.",name:"aria-required",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-roledescription":{defaultValue:null,description:"Defines a human-readable, author-localized description for the role of an element.",name:"aria-roledescription",required:!1,type:{name:"string"}},"aria-rowcount":{defaultValue:null,description:`Defines the total number of rows in a table, grid, or treegrid.
@see aria-rowindex.`,name:"aria-rowcount",required:!1,type:{name:"number"}},"aria-rowindex":{defaultValue:null,description:`Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
@see aria-rowcount
@see aria-rowspan.`,name:"aria-rowindex",required:!1,type:{name:"number"}},"aria-rowspan":{defaultValue:null,description:`Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-rowindex
@see aria-colspan.`,name:"aria-rowspan",required:!1,type:{name:"number"}},"aria-selected":{defaultValue:null,description:`Indicates the current "selected" state of various widgets.
@see aria-checked
@see aria-pressed.`,name:"aria-selected",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-setsize":{defaultValue:null,description:`Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-posinset.`,name:"aria-setsize",required:!1,type:{name:"number"}},"aria-sort":{defaultValue:null,description:"Indicates if items in a table or grid are sorted in ascending or descending order.",name:"aria-sort",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"ascending"'},{value:'"descending"'},{value:'"other"'}]}},"aria-valuemax":{defaultValue:null,description:"Defines the maximum allowed value for a range widget.",name:"aria-valuemax",required:!1,type:{name:"number"}},"aria-valuemin":{defaultValue:null,description:"Defines the minimum allowed value for a range widget.",name:"aria-valuemin",required:!1,type:{name:"number"}},"aria-valuenow":{defaultValue:null,description:`Defines the current value for a range widget.
@see aria-valuetext.`,name:"aria-valuenow",required:!1,type:{name:"number"}},"aria-valuetext":{defaultValue:null,description:"Defines the human readable text alternative of aria-valuenow for a range widget.",name:"aria-valuetext",required:!1,type:{name:"string"}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"list"'},{value:'"link"'},{value:'"menu"'},{value:'"listbox"'},{value:'"tree"'},{value:'"grid"'},{value:'"dialog"'},{value:'"alert"'},{value:'"alertdialog"'},{value:'"application"'},{value:'"article"'},{value:'"banner"'},{value:'"button"'},{value:'"cell"'},{value:'"checkbox"'},{value:'"columnheader"'},{value:'"combobox"'},{value:'"complementary"'},{value:'"contentinfo"'},{value:'"definition"'},{value:'"directory"'},{value:'"document"'},{value:'"feed"'},{value:'"figure"'},{value:'"form"'},{value:'"gridcell"'},{value:'"group"'},{value:'"heading"'},{value:'"img"'},{value:'"listitem"'},{value:'"log"'},{value:'"main"'},{value:'"marquee"'},{value:'"math"'},{value:'"menubar"'},{value:'"menuitem"'},{value:'"menuitemcheckbox"'},{value:'"menuitemradio"'},{value:'"navigation"'},{value:'"note"'},{value:'"option"'},{value:'"presentation"'},{value:'"progressbar"'},{value:'"radio"'},{value:'"radiogroup"'},{value:'"region"'},{value:'"row"'},{value:'"rowgroup"'},{value:'"rowheader"'},{value:'"scrollbar"'},{value:'"search"'},{value:'"searchbox"'},{value:'"separator"'},{value:'"slider"'},{value:'"spinbutton"'},{value:'"status"'},{value:'"switch"'},{value:'"tab"'},{value:'"table"'},{value:'"tablist"'},{value:'"tabpanel"'},{value:'"term"'},{value:'"textbox"'},{value:'"timer"'},{value:'"toolbar"'},{value:'"tooltip"'},{value:'"treegrid"'},{value:'"treeitem"'}]}},checked:{defaultValue:null,description:"Whether this component is checked or indeterminate",name:"checked",required:!0,type:{name:"Checked"}},disabled:{defaultValue:null,description:"Whether this component is disabled",name:"disabled",required:!1,type:{name:"boolean"}},error:{defaultValue:null,description:"Whether this component should show an error state",name:"error",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:`Callback when this component is selected. The newCheckedState is the
new checked state of the component.`,name:"onChange",required:!0,type:{name:"(newCheckedState: boolean) => unknown"}},label:{defaultValue:null,description:"Optional label for the field.",name:"label",required:!1,type:{name:"ReactNode"}},description:{defaultValue:null,description:"Optional description for the field.",name:"description",required:!1,type:{name:"ReactNode"}},id:{defaultValue:null,description:"Unique identifier attached to the HTML input element. If used, need to\nguarantee that the ID is unique within everything rendered on a page.\nUsed to match `<label>` with `<input>` elements for screenreaders.",name:"id",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"Optional styling for the container. Does not style the component.",name:"style",required:!1,type:{name:"any"}},className:{defaultValue:null,description:"Adds CSS classes to the Checkbox.",name:"className",required:!1,type:{name:"string"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing",name:"testId",required:!1,type:{name:"string"}},groupName:{defaultValue:null,description:`Name for the checkbox or radio button group. Only applicable for group
contexts, auto-populated by group components via Choice.
@ignore`,name:"groupName",required:!1,type:{name:"string"}}}}}catch{}const U=d.forwardRef((r,t)=>{const{checked:a=!1,disabled:e=!1,onChange:i=()=>{},value:o,variant:u,...s}=r,v=(y=>y==="checkbox"?P:E)(u);return l(v,{...s,checked:a,disabled:e,onChange:i,ref:t})}),ue=U;try{choice.displayName="choice",choice.__docgenInfo={description:`This is a labeled 🔘 or ☑️ item. Choice is meant to be used as children of
CheckboxGroup and RadioGroup because many of its props are auto-populated
and not shown in the documentation here. See those components for usage
examples.

If you wish to use just a single field, use Checkbox or Radio with the
optional label and description props.

### Checkbox Usage

\`\`\`jsx
import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";

const [selectedValues, setSelectedValues] = React.useState([]);

// Checkbox usage
<CheckboxGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
/>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
       description="Some choice description."
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</CheckboxGroup>
\`\`\`

### Radio Usage

\`\`\`jsx
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";

const [selectedValue, setSelectedValue] = React.useState("");

<RadioGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValue}>
    selectedValues={selectedValue}
/>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
       description="Some choice description."
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</RadioGroup>
\`\`\``,displayName:"choice",props:{"aria-activedescendant":{defaultValue:null,description:"Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.",name:"aria-activedescendant",required:!1,type:{name:"string"}},"aria-atomic":{defaultValue:null,description:"Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.",name:"aria-atomic",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-autocomplete":{defaultValue:null,description:`Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.`,name:"aria-autocomplete",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inline"'},{value:'"list"'},{value:'"both"'}]}},"aria-busy":{defaultValue:null,description:"Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.",name:"aria-busy",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-checked":{defaultValue:null,description:`Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
@see aria-pressed
@see aria-selected.`,name:"aria-checked",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-colcount":{defaultValue:null,description:`Defines the total number of columns in a table, grid, or treegrid.
@see aria-colindex.`,name:"aria-colcount",required:!1,type:{name:"number"}},"aria-colindex":{defaultValue:null,description:`Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
@see aria-colcount
@see aria-colspan.`,name:"aria-colindex",required:!1,type:{name:"number"}},"aria-colspan":{defaultValue:null,description:`Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-colindex
@see aria-rowspan.`,name:"aria-colspan",required:!1,type:{name:"number"}},"aria-controls":{defaultValue:null,description:`Identifies the element (or elements) whose contents or presence are controlled by the current element.
@see aria-owns.`,name:"aria-controls",required:!1,type:{name:"string"}},"aria-current":{defaultValue:null,description:"Indicates the element that represents the current item within a container or set of related elements.",name:"aria-current",required:!1,type:{name:'boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"'}},"aria-describedby":{defaultValue:null,description:`Identifies the element (or elements) that describes the object.
@see aria-labelledby`,name:"aria-describedby",required:!1,type:{name:"string"}},"aria-details":{defaultValue:null,description:`Identifies the element that provides a detailed, extended description for the object.
@see aria-describedby.`,name:"aria-details",required:!1,type:{name:"string"}},"aria-disabled":{defaultValue:null,description:`Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
@see aria-hidden
@see aria-readonly.`,name:"aria-disabled",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-dropeffect":{defaultValue:null,description:`Indicates what functions can be performed when a dragged object is released on the drop target.
@deprecated in ARIA 1.1`,name:"aria-dropeffect",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"copy"'},{value:'"execute"'},{value:'"link"'},{value:'"move"'},{value:'"popup"'}]}},"aria-errormessage":{defaultValue:null,description:`Identifies the element that provides an error message for the object.
@see aria-invalid
@see aria-describedby.`,name:"aria-errormessage",required:!1,type:{name:"string"}},"aria-expanded":{defaultValue:null,description:"Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.",name:"aria-expanded",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-flowto":{defaultValue:null,description:`Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.`,name:"aria-flowto",required:!1,type:{name:"string"}},"aria-grabbed":{defaultValue:null,description:`Indicates an element's "grabbed" state in a drag-and-drop operation.
@deprecated in ARIA 1.1`,name:"aria-grabbed",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-haspopup":{defaultValue:null,description:"Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.",name:"aria-haspopup",required:!1,type:{name:'boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog"'}},"aria-hidden":{defaultValue:null,description:`Indicates whether the element is exposed to an accessibility API.
@see aria-disabled.`,name:"aria-hidden",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-invalid":{defaultValue:null,description:`Indicates the entered value does not conform to the format expected by the application.
@see aria-errormessage.`,name:"aria-invalid",required:!1,type:{name:'boolean | "false" | "true" | "grammar" | "spelling"'}},"aria-keyshortcuts":{defaultValue:null,description:"Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.",name:"aria-keyshortcuts",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:`Defines a string value that labels the current element.
@see aria-labelledby.`,name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:`Identifies the element (or elements) that labels the current element.
@see aria-describedby.`,name:"aria-labelledby",required:!1,type:{name:"string"}},"aria-level":{defaultValue:null,description:"Defines the hierarchical level of an element within a structure.",name:"aria-level",required:!1,type:{name:"number"}},"aria-live":{defaultValue:null,description:"Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",name:"aria-live",required:!1,type:{name:"enum",value:[{value:'"off"'},{value:'"assertive"'},{value:'"polite"'}]}},"aria-modal":{defaultValue:null,description:"Indicates whether an element is modal when displayed.",name:"aria-modal",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiline":{defaultValue:null,description:"Indicates whether a text box accepts multiple lines of input or only a single line.",name:"aria-multiline",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiselectable":{defaultValue:null,description:"Indicates that the user may select more than one item from the current selectable descendants.",name:"aria-multiselectable",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-orientation":{defaultValue:null,description:"Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",name:"aria-orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},"aria-owns":{defaultValue:null,description:`Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
@see aria-controls.`,name:"aria-owns",required:!1,type:{name:"string"}},"aria-placeholder":{defaultValue:null,description:`Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.`,name:"aria-placeholder",required:!1,type:{name:"string"}},"aria-posinset":{defaultValue:null,description:`Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-setsize.`,name:"aria-posinset",required:!1,type:{name:"number"}},"aria-pressed":{defaultValue:null,description:`Indicates the current "pressed" state of toggle buttons.
@see aria-checked
@see aria-selected.`,name:"aria-pressed",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-readonly":{defaultValue:null,description:`Indicates that the element is not editable, but is otherwise operable.
@see aria-disabled.`,name:"aria-readonly",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-relevant":{defaultValue:null,description:`Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
@see aria-atomic.`,name:"aria-relevant",required:!1,type:{name:"enum",value:[{value:'"additions"'},{value:'"additions removals"'},{value:'"additions text"'},{value:'"all"'},{value:'"removals"'},{value:'"removals additions"'},{value:'"removals text"'},{value:'"text"'},{value:'"text additions"'},{value:'"text removals"'}]}},"aria-required":{defaultValue:null,description:"Indicates that user input is required on the element before a form may be submitted.",name:"aria-required",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-roledescription":{defaultValue:null,description:"Defines a human-readable, author-localized description for the role of an element.",name:"aria-roledescription",required:!1,type:{name:"string"}},"aria-rowcount":{defaultValue:null,description:`Defines the total number of rows in a table, grid, or treegrid.
@see aria-rowindex.`,name:"aria-rowcount",required:!1,type:{name:"number"}},"aria-rowindex":{defaultValue:null,description:`Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
@see aria-rowcount
@see aria-rowspan.`,name:"aria-rowindex",required:!1,type:{name:"number"}},"aria-rowspan":{defaultValue:null,description:`Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-rowindex
@see aria-colspan.`,name:"aria-rowspan",required:!1,type:{name:"number"}},"aria-selected":{defaultValue:null,description:`Indicates the current "selected" state of various widgets.
@see aria-checked
@see aria-pressed.`,name:"aria-selected",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-setsize":{defaultValue:null,description:`Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-posinset.`,name:"aria-setsize",required:!1,type:{name:"number"}},"aria-sort":{defaultValue:null,description:"Indicates if items in a table or grid are sorted in ascending or descending order.",name:"aria-sort",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"ascending"'},{value:'"descending"'},{value:'"other"'}]}},"aria-valuemax":{defaultValue:null,description:"Defines the maximum allowed value for a range widget.",name:"aria-valuemax",required:!1,type:{name:"number"}},"aria-valuemin":{defaultValue:null,description:"Defines the minimum allowed value for a range widget.",name:"aria-valuemin",required:!1,type:{name:"number"}},"aria-valuenow":{defaultValue:null,description:`Defines the current value for a range widget.
@see aria-valuetext.`,name:"aria-valuenow",required:!1,type:{name:"number"}},"aria-valuetext":{defaultValue:null,description:"Defines the human readable text alternative of aria-valuenow for a range widget.",name:"aria-valuetext",required:!1,type:{name:"string"}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"list"'},{value:'"link"'},{value:'"menu"'},{value:'"listbox"'},{value:'"tree"'},{value:'"grid"'},{value:'"dialog"'},{value:'"alert"'},{value:'"alertdialog"'},{value:'"application"'},{value:'"article"'},{value:'"banner"'},{value:'"button"'},{value:'"cell"'},{value:'"checkbox"'},{value:'"columnheader"'},{value:'"combobox"'},{value:'"complementary"'},{value:'"contentinfo"'},{value:'"definition"'},{value:'"directory"'},{value:'"document"'},{value:'"feed"'},{value:'"figure"'},{value:'"form"'},{value:'"gridcell"'},{value:'"group"'},{value:'"heading"'},{value:'"img"'},{value:'"listitem"'},{value:'"log"'},{value:'"main"'},{value:'"marquee"'},{value:'"math"'},{value:'"menubar"'},{value:'"menuitem"'},{value:'"menuitemcheckbox"'},{value:'"menuitemradio"'},{value:'"navigation"'},{value:'"note"'},{value:'"option"'},{value:'"presentation"'},{value:'"progressbar"'},{value:'"radio"'},{value:'"radiogroup"'},{value:'"region"'},{value:'"row"'},{value:'"rowgroup"'},{value:'"rowheader"'},{value:'"scrollbar"'},{value:'"search"'},{value:'"searchbox"'},{value:'"separator"'},{value:'"slider"'},{value:'"spinbutton"'},{value:'"status"'},{value:'"switch"'},{value:'"tab"'},{value:'"table"'},{value:'"tablist"'},{value:'"tabpanel"'},{value:'"term"'},{value:'"textbox"'},{value:'"timer"'},{value:'"toolbar"'},{value:'"tooltip"'},{value:'"treegrid"'},{value:'"treeitem"'}]}},label:{defaultValue:null,description:"User-defined. Label for the field.",name:"label",required:!0,type:{name:"ReactNode"}},description:{defaultValue:null,description:"User-defined. Optional description for the field.",name:"description",required:!1,type:{name:"ReactNode"}},value:{defaultValue:null,description:"User-defined. Should be distinct for each item in the group.",name:"value",required:!0,type:{name:"string"}},disabled:{defaultValue:null,description:"User-defined. Whether this choice option is disabled. Default false.",name:"disabled",required:!1,type:{name:"boolean"}},testId:{defaultValue:null,description:"User-defined. Optional id for testing purposes.",name:"testId",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"User-defined. Optional additional styling.",name:"style",required:!1,type:{name:"any"}},checked:{defaultValue:null,description:`Auto-populated by parent. Whether this choice is checked.
@ignore`,name:"checked",required:!1,type:{name:"boolean"}},error:{defaultValue:null,description:`Auto-populated by parent. Whether this choice is in error mode (everything
in a choice group would be in error mode at the same time).
@ignore`,name:"error",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:`Auto-populated by parent. Used for accessibility purposes, where the label
id should match the input id.
@ignore`,name:"id",required:!1,type:{name:"string"}},groupName:{defaultValue:null,description:`Auto-populated by parent's groupName prop.
@ignore`,name:"groupName",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:`Auto-populated by parent. Returns the new checked state of the component.
@ignore`,name:"onChange",required:!1,type:{name:"((newCheckedState: boolean) => unknown)"}},variant:{defaultValue:null,description:`Auto-populated by parent.
@ignore`,name:"variant",required:!1,type:{name:"enum",value:[{value:'"checkbox"'},{value:'"radio"'}]}}}}}catch{}const b=N.StyleSheet.create({fieldset:{border:"none",padding:0,margin:0},legend:{padding:0},description:{marginTop:g.xxxSmall_4,color:n.offBlack64},error:{marginTop:g.xxxSmall_4,color:n.red},defaultLineGap:{marginTop:g.xSmall_8}}),W=C("fieldset"),H=C("legend"),K=d.forwardRef((r,t)=>{const{children:a,label:e,description:i,errorMessage:o,groupName:u,onChange:s,selectedValues:c,style:v,testId:y}=r,V=(m,h)=>{if(h){const p=c.indexOf(m),f=[...c.slice(0,p),...c.slice(p+1)];s(f)}else s([...c,m])},w=d.Children.toArray(a).filter(Boolean);return l(W,{"data-test-id":y,style:b.fieldset,ref:t,children:q(T,{style:v,children:[e&&l(H,{style:b.legend,children:l(A,{children:e})}),i&&l(I,{style:b.description,children:i}),o&&l(I,{style:b.error,children:o}),(e||i||o)&&l(k,{size:g.small_12}),w.map((m,h)=>{const{style:p,value:f}=m.props,D=c.includes(f);return d.cloneElement(m,{checked:D,error:!!o,groupName:u,id:`${u}-${f}`,key:f,onChange:()=>V(f,D),style:[h>0&&b.defaultLineGap,p],variant:"checkbox"})})]})})}),ce=K;try{checkboxgroup.displayName="checkboxgroup",checkboxgroup.__docgenInfo={description:`A checkbox group allows multiple selection. This component auto-populates
many props for its children Choice components. The Choice component is
exposed for the user to apply custom styles or to indicate which choices are
disabled.

### Usage

\`\`\`jsx
import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";

const [selectedValues, setSelectedValues] = React.useState([]);

<CheckboxGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</CheckboxGroup>
\`\`\``,displayName:"checkboxgroup",props:{children:{defaultValue:null,description:"Children should be Choice components.",name:"children",required:!0,type:{name:'(false | ReactElement<Readonly<AriaAttributes> & Readonly<{ role?: AriaRole | undefined; }> & { label: ReactNode; description?: ReactNode; ... 9 more ...; variant?: "checkbox" | ... 1 more ... | undefined; } & RefAttributes<...>, string | JSXElementConstructor<...>> | null | undefined)[]'}},groupName:{defaultValue:null,description:`Group name for this checkbox or radio group. Should be unique for all
such groups displayed on a page.`,name:"groupName",required:!0,type:{name:"string"}},label:{defaultValue:null,description:`Optional label for the group. This label is optional to allow for
greater flexibility in implementing checkbox and radio groups.`,name:"label",required:!1,type:{name:"ReactNode"}},description:{defaultValue:null,description:"Optional description for the group.",name:"description",required:!1,type:{name:"ReactNode"}},errorMessage:{defaultValue:null,description:`Optional error message. If supplied, the group will be displayed in an
error state, along with this error message. If no error state is desired,
simply do not supply this prop, or pass along null.`,name:"errorMessage",required:!1,type:{name:"string | null"}},style:{defaultValue:null,description:"Custom styling for this group of checkboxes.",name:"style",required:!1,type:{name:"any"}},onChange:{defaultValue:null,description:`Callback for when selection of the group has changed. Passes the newly
selected values.`,name:"onChange",required:!0,type:{name:"(selectedValues: string[]) => unknown"}},selectedValues:{defaultValue:null,description:"An array of the values of the selected values in this checkbox group.",name:"selectedValues",required:!0,type:{name:"string[]"}},testId:{defaultValue:null,description:"Test ID used for e2e testing.",name:"testId",required:!1,type:{name:"string"}}}}}catch{}const Y=C("fieldset"),J=C("legend"),X=d.forwardRef((r,t)=>{const{children:a,label:e,description:i,errorMessage:o,groupName:u,onChange:s,selectedValue:c,style:v,testId:y}=r,V=d.Children.toArray(a).filter(Boolean);return l(Y,{"data-test-id":y,style:b.fieldset,ref:t,children:q(T,{style:v,children:[e&&l(J,{style:b.legend,children:l(A,{children:e})}),i&&l(I,{style:b.description,children:i}),o&&l(I,{style:b.error,children:o}),(e||i||o)&&l(k,{size:g.small_12}),V.map((w,m)=>{const{style:h,value:p}=w.props,f=c===p;return d.cloneElement(w,{checked:f,error:!!o,groupName:u,id:`${u}-${p}`,key:p,onChange:()=>s(p),style:[m>0&&b.defaultLineGap,h],variant:"radio"})})]})})}),pe=X;try{radiogroup.displayName="radiogroup",radiogroup.__docgenInfo={description:`A radio group allows only single selection. Like CheckboxGroup, this
component auto-populates many props for its children Choice components. The
Choice component is exposed for the user to apply custom styles or to
indicate which choices are disabled. The use of the groupName prop is
important to maintain expected keyboard navigation behavior for
accessibility.

### Usage

\`\`\`jsx
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";

const [selectedValue, setSelectedValue] = React.useState("");

<RadioGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</RadioGroup>
\`\`\``,displayName:"radiogroup",props:{children:{defaultValue:null,description:"Children should be Choice components.",name:"children",required:!0,type:{name:'(false | ReactElement<Readonly<AriaAttributes> & Readonly<{ role?: AriaRole | undefined; }> & { label: ReactNode; description?: ReactNode; ... 9 more ...; variant?: "checkbox" | ... 1 more ... | undefined; } & RefAttributes<...>, string | JSXElementConstructor<...>> | null | undefined)[]'}},groupName:{defaultValue:null,description:`Group name for this checkbox or radio group. Should be unique for all
such groups displayed on a page.`,name:"groupName",required:!0,type:{name:"string"}},label:{defaultValue:null,description:`Optional label for the group. This label is optional to allow for
greater flexibility in implementing checkbox and radio groups.`,name:"label",required:!1,type:{name:"ReactNode"}},description:{defaultValue:null,description:"Optional description for the group.",name:"description",required:!1,type:{name:"ReactNode"}},errorMessage:{defaultValue:null,description:`Optional error message. If supplied, the group will be displayed in an
error state, along with this error message. If no error state is desired,
simply do not supply this prop, or pass along null.`,name:"errorMessage",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"Custom styling for this group of checkboxes.",name:"style",required:!1,type:{name:"any"}},onChange:{defaultValue:null,description:"Callback for when the selected value of the radio group has changed.",name:"onChange",required:!0,type:{name:"(selectedValue: string) => unknown"}},selectedValue:{defaultValue:null,description:"Value of the selected radio item.",name:"selectedValue",required:!0,type:{name:"string"}},testId:{defaultValue:null,description:"Test ID used for e2e testing.",name:"testId",required:!1,type:{name:"string"}}}}}catch{}const Q="This field is required.",Z=C("input");class F extends d.Component{constructor(t){super(t),this.state={error:null,focused:!1},this.maybeValidate=a=>{const{validate:e,onValidate:i,required:o}=this.props;if(e){const u=e(a)||null;this.setState({error:u},()=>{i&&i(u)})}else if(o){const s=a?null:typeof o=="string"?o:Q;this.setState({error:s},()=>{i&&i(s)})}},this.handleChange=a=>{const{onChange:e}=this.props,i=a.target.value;this.maybeValidate(i),e(i)},this.handleFocus=a=>{const{onFocus:e}=this.props;this.setState({focused:!0},()=>{e&&e(a)})},this.handleBlur=a=>{const{onBlur:e}=this.props;this.setState({focused:!1},()=>{e&&e(a)})},t.validate&&t.value!==""&&(this.state.error=t.validate(t.value)||null)}componentDidMount(){this.props.value!==""&&this.maybeValidate(this.props.value)}render(){const{id:t,type:a,value:e,disabled:i,onKeyDown:o,placeholder:u,light:s,style:c,testId:v,readOnly:y,autoFocus:V,autoComplete:w,forwardedRef:m,onFocus:h,onBlur:p,onValidate:f,validate:D,onChange:_,required:S,...M}=this.props;return l(Z,{style:[x.input,G.LabelMedium,x.default,i?x.disabled:this.state.focused?[x.focused,s&&x.defaultLight]:!!this.state.error&&[x.error,s&&x.errorLight],!!this.state.error&&x.error,c&&c],id:t,type:a,placeholder:u,value:e,disabled:i,onChange:this.handleChange,onKeyDown:o,onFocus:this.handleFocus,onBlur:this.handleBlur,"data-test-id":v,readOnly:y,autoFocus:V,autoComplete:w,ref:m,...M})}}F.defaultProps={type:"text",disabled:!1,light:!1};const x=N.StyleSheet.create({input:{width:"100%",height:40,borderRadius:4,boxSizing:"border-box",paddingLeft:g.medium_16,margin:0,outline:"none",boxShadow:"none"},default:{background:n.white,border:`1px solid ${n.offBlack16}`,color:n.offBlack,"::placeholder":{color:n.offBlack64}},error:{background:`${B(z(n.red,.06),n.white)}`,border:`1px solid ${n.red}`,color:n.offBlack,"::placeholder":{color:n.offBlack64}},disabled:{background:n.offWhite,border:`1px solid ${n.offBlack16}`,color:n.offBlack64,"::placeholder":{color:n.offBlack32}},focused:{background:n.white,border:`1px solid ${n.blue}`,color:n.offBlack,"::placeholder":{color:n.offBlack64}},defaultLight:{boxShadow:`0px 0px 0px 1px ${n.blue}, 0px 0px 0px 2px ${n.white}`},errorLight:{boxShadow:`0px 0px 0px 1px ${n.red}, 0px 0px 0px 2px ${n.white}`}}),ee=d.forwardRef((r,t)=>l(F,{...r,forwardedRef:t}));try{textfield.displayName="textfield",textfield.__docgenInfo={description:`A TextField is an element used to accept a single line of text from the user.

### Usage

\`\`\`jsx
import {TextField} from "@khanacademy/wonder-blocks-form";

const [value, setValue] = React.useState("");

<TextField
    id="some-unique-text-field-id"
    value={value}
    onChange={setValue}
/>
\`\`\``,displayName:"textfield",props:{"aria-activedescendant":{defaultValue:null,description:"Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.",name:"aria-activedescendant",required:!1,type:{name:"string"}},"aria-atomic":{defaultValue:null,description:"Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.",name:"aria-atomic",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-autocomplete":{defaultValue:null,description:`Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.`,name:"aria-autocomplete",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inline"'},{value:'"list"'},{value:'"both"'}]}},"aria-busy":{defaultValue:null,description:"Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.",name:"aria-busy",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-checked":{defaultValue:null,description:`Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
@see aria-pressed
@see aria-selected.`,name:"aria-checked",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-colcount":{defaultValue:null,description:`Defines the total number of columns in a table, grid, or treegrid.
@see aria-colindex.`,name:"aria-colcount",required:!1,type:{name:"number"}},"aria-colindex":{defaultValue:null,description:`Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
@see aria-colcount
@see aria-colspan.`,name:"aria-colindex",required:!1,type:{name:"number"}},"aria-colspan":{defaultValue:null,description:`Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-colindex
@see aria-rowspan.`,name:"aria-colspan",required:!1,type:{name:"number"}},"aria-controls":{defaultValue:null,description:`Identifies the element (or elements) whose contents or presence are controlled by the current element.
@see aria-owns.`,name:"aria-controls",required:!1,type:{name:"string"}},"aria-current":{defaultValue:null,description:"Indicates the element that represents the current item within a container or set of related elements.",name:"aria-current",required:!1,type:{name:'boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"'}},"aria-describedby":{defaultValue:null,description:`Identifies the element (or elements) that describes the object.
@see aria-labelledby`,name:"aria-describedby",required:!1,type:{name:"string"}},"aria-details":{defaultValue:null,description:`Identifies the element that provides a detailed, extended description for the object.
@see aria-describedby.`,name:"aria-details",required:!1,type:{name:"string"}},"aria-disabled":{defaultValue:null,description:`Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
@see aria-hidden
@see aria-readonly.`,name:"aria-disabled",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-dropeffect":{defaultValue:null,description:`Indicates what functions can be performed when a dragged object is released on the drop target.
@deprecated in ARIA 1.1`,name:"aria-dropeffect",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"copy"'},{value:'"execute"'},{value:'"link"'},{value:'"move"'},{value:'"popup"'}]}},"aria-errormessage":{defaultValue:null,description:`Identifies the element that provides an error message for the object.
@see aria-invalid
@see aria-describedby.`,name:"aria-errormessage",required:!1,type:{name:"string"}},"aria-expanded":{defaultValue:null,description:"Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.",name:"aria-expanded",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-flowto":{defaultValue:null,description:`Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.`,name:"aria-flowto",required:!1,type:{name:"string"}},"aria-grabbed":{defaultValue:null,description:`Indicates an element's "grabbed" state in a drag-and-drop operation.
@deprecated in ARIA 1.1`,name:"aria-grabbed",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-haspopup":{defaultValue:null,description:"Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.",name:"aria-haspopup",required:!1,type:{name:'boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog"'}},"aria-hidden":{defaultValue:null,description:`Indicates whether the element is exposed to an accessibility API.
@see aria-disabled.`,name:"aria-hidden",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-invalid":{defaultValue:null,description:`Indicates the entered value does not conform to the format expected by the application.
@see aria-errormessage.`,name:"aria-invalid",required:!1,type:{name:'boolean | "false" | "true" | "grammar" | "spelling"'}},"aria-keyshortcuts":{defaultValue:null,description:"Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.",name:"aria-keyshortcuts",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:`Defines a string value that labels the current element.
@see aria-labelledby.`,name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:`Identifies the element (or elements) that labels the current element.
@see aria-describedby.`,name:"aria-labelledby",required:!1,type:{name:"string"}},"aria-level":{defaultValue:null,description:"Defines the hierarchical level of an element within a structure.",name:"aria-level",required:!1,type:{name:"number"}},"aria-live":{defaultValue:null,description:"Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",name:"aria-live",required:!1,type:{name:"enum",value:[{value:'"off"'},{value:'"assertive"'},{value:'"polite"'}]}},"aria-modal":{defaultValue:null,description:"Indicates whether an element is modal when displayed.",name:"aria-modal",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiline":{defaultValue:null,description:"Indicates whether a text box accepts multiple lines of input or only a single line.",name:"aria-multiline",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-multiselectable":{defaultValue:null,description:"Indicates that the user may select more than one item from the current selectable descendants.",name:"aria-multiselectable",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-orientation":{defaultValue:null,description:"Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",name:"aria-orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},"aria-owns":{defaultValue:null,description:`Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
@see aria-controls.`,name:"aria-owns",required:!1,type:{name:"string"}},"aria-placeholder":{defaultValue:null,description:`Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.`,name:"aria-placeholder",required:!1,type:{name:"string"}},"aria-posinset":{defaultValue:null,description:`Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-setsize.`,name:"aria-posinset",required:!1,type:{name:"number"}},"aria-pressed":{defaultValue:null,description:`Indicates the current "pressed" state of toggle buttons.
@see aria-checked
@see aria-selected.`,name:"aria-pressed",required:!1,type:{name:'boolean | "false" | "true" | "mixed"'}},"aria-readonly":{defaultValue:null,description:`Indicates that the element is not editable, but is otherwise operable.
@see aria-disabled.`,name:"aria-readonly",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-relevant":{defaultValue:null,description:`Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
@see aria-atomic.`,name:"aria-relevant",required:!1,type:{name:"enum",value:[{value:'"additions"'},{value:'"additions removals"'},{value:'"additions text"'},{value:'"all"'},{value:'"removals"'},{value:'"removals additions"'},{value:'"removals text"'},{value:'"text"'},{value:'"text additions"'},{value:'"text removals"'}]}},"aria-required":{defaultValue:null,description:"Indicates that user input is required on the element before a form may be submitted.",name:"aria-required",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-roledescription":{defaultValue:null,description:"Defines a human-readable, author-localized description for the role of an element.",name:"aria-roledescription",required:!1,type:{name:"string"}},"aria-rowcount":{defaultValue:null,description:`Defines the total number of rows in a table, grid, or treegrid.
@see aria-rowindex.`,name:"aria-rowcount",required:!1,type:{name:"number"}},"aria-rowindex":{defaultValue:null,description:`Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
@see aria-rowcount
@see aria-rowspan.`,name:"aria-rowindex",required:!1,type:{name:"number"}},"aria-rowspan":{defaultValue:null,description:`Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-rowindex
@see aria-colspan.`,name:"aria-rowspan",required:!1,type:{name:"number"}},"aria-selected":{defaultValue:null,description:`Indicates the current "selected" state of various widgets.
@see aria-checked
@see aria-pressed.`,name:"aria-selected",required:!1,type:{name:'boolean | "false" | "true"'}},"aria-setsize":{defaultValue:null,description:`Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-posinset.`,name:"aria-setsize",required:!1,type:{name:"number"}},"aria-sort":{defaultValue:null,description:"Indicates if items in a table or grid are sorted in ascending or descending order.",name:"aria-sort",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"ascending"'},{value:'"descending"'},{value:'"other"'}]}},"aria-valuemax":{defaultValue:null,description:"Defines the maximum allowed value for a range widget.",name:"aria-valuemax",required:!1,type:{name:"number"}},"aria-valuemin":{defaultValue:null,description:"Defines the minimum allowed value for a range widget.",name:"aria-valuemin",required:!1,type:{name:"number"}},"aria-valuenow":{defaultValue:null,description:`Defines the current value for a range widget.
@see aria-valuetext.`,name:"aria-valuenow",required:!1,type:{name:"number"}},"aria-valuetext":{defaultValue:null,description:"Defines the human readable text alternative of aria-valuenow for a range widget.",name:"aria-valuetext",required:!1,type:{name:"string"}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"list"'},{value:'"link"'},{value:'"menu"'},{value:'"listbox"'},{value:'"tree"'},{value:'"grid"'},{value:'"dialog"'},{value:'"alert"'},{value:'"alertdialog"'},{value:'"application"'},{value:'"article"'},{value:'"banner"'},{value:'"button"'},{value:'"cell"'},{value:'"checkbox"'},{value:'"columnheader"'},{value:'"combobox"'},{value:'"complementary"'},{value:'"contentinfo"'},{value:'"definition"'},{value:'"directory"'},{value:'"document"'},{value:'"feed"'},{value:'"figure"'},{value:'"form"'},{value:'"gridcell"'},{value:'"group"'},{value:'"heading"'},{value:'"img"'},{value:'"listitem"'},{value:'"log"'},{value:'"main"'},{value:'"marquee"'},{value:'"math"'},{value:'"menubar"'},{value:'"menuitem"'},{value:'"menuitemcheckbox"'},{value:'"menuitemradio"'},{value:'"navigation"'},{value:'"note"'},{value:'"option"'},{value:'"presentation"'},{value:'"progressbar"'},{value:'"radio"'},{value:'"radiogroup"'},{value:'"region"'},{value:'"row"'},{value:'"rowgroup"'},{value:'"rowheader"'},{value:'"scrollbar"'},{value:'"search"'},{value:'"searchbox"'},{value:'"separator"'},{value:'"slider"'},{value:'"spinbutton"'},{value:'"status"'},{value:'"switch"'},{value:'"tab"'},{value:'"table"'},{value:'"tablist"'},{value:'"tabpanel"'},{value:'"term"'},{value:'"textbox"'},{value:'"timer"'},{value:'"toolbar"'},{value:'"tooltip"'},{value:'"treegrid"'},{value:'"treeitem"'}]}},style:{defaultValue:null,description:"Custom styles for the input.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"The unique identifier for the input.",name:"id",required:!0,type:{name:"string"}},onKeyDown:{defaultValue:null,description:"Called when a key is pressed.",name:"onKeyDown",required:!1,type:{name:"((event: KeyboardEvent<HTMLInputElement>) => unknown)"}},onChange:{defaultValue:null,description:"Called when the value has changed.",name:"onChange",required:!0,type:{name:"(newValue: string) => unknown"}},onFocus:{defaultValue:null,description:"Called when the element has been focused.",name:"onFocus",required:!1,type:{name:"((event: FocusEvent<HTMLInputElement, Element>) => unknown)"}},onBlur:{defaultValue:null,description:"Called when the element has been blurred.",name:"onBlur",required:!1,type:{name:"((event: FocusEvent<HTMLInputElement, Element>) => unknown)"}},light:{defaultValue:null,description:"Change the default focus ring color to fit a dark background.",name:"light",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"Determines the type of input. Defaults to text.",name:"type",required:!1,type:{name:"enum",value:[{value:'"number"'},{value:'"text"'},{value:'"password"'},{value:'"email"'},{value:'"tel"'}]}},placeholder:{defaultValue:null,description:"Provide hints or examples of what to enter.",name:"placeholder",required:!1,type:{name:"string"}},required:{defaultValue:null,description:`Whether this field is required to to continue, or the error message to
render if this field is left blank.

This can be a boolean or a string.

String:
Please pass in a translated string to use as the error message that will
render if the user leaves this field blank. If this field is required,
and a string is not passed in, a default untranslated string will render
upon error.
Note: The string will not be used if a \`validate\` prop is passed in.

Example message: i18n._("A password is required to log in.")

Boolean:
True/false indicating whether this field is required. Please do not pass
in \`true\` if possible - pass in the error string instead.
If \`true\` is passed, and a \`validate\` prop is not passed, that means
there is no corresponding message and the default untranlsated message
will be used.`,name:"required",required:!1,type:{name:"string | boolean"}},value:{defaultValue:null,description:"The input value.",name:"value",required:!0,type:{name:"string"}},disabled:{defaultValue:null,description:"Makes a read-only input field that cannot be focused. Defaults to false.",name:"disabled",required:!1,type:{name:"boolean"}},autoFocus:{defaultValue:null,description:"Whether this field should autofocus on page load.",name:"autoFocus",required:!1,type:{name:"boolean"}},validate:{defaultValue:null,description:`Provide a validation for the input value.
Return a string error message or null | void for a valid input.`,name:"validate",required:!1,type:{name:"((value: string) => string | void | null)"}},onValidate:{defaultValue:null,description:"Called right after the TextField input is validated.",name:"onValidate",required:!1,type:{name:"((errorMessage?: string | null) => unknown)"}},readOnly:{defaultValue:null,description:"Specifies if the input field is read-only.",name:"readOnly",required:!1,type:{name:"boolean"}},autoComplete:{defaultValue:null,description:"Specifies if the input field allows autocomplete.",name:"autoComplete",required:!1,type:{name:"string"}}}}}catch{}const ae=C("span");class te extends d.Component{renderLabel(){const{label:t,id:a,required:e,testId:i}=this.props,o=q(ae,{style:R.required,"aria-hidden":!0,children:[" ","*"]});return q(d.Fragment,{children:[q(A,{style:R.label,tag:"label",htmlFor:a&&`${a}-field`,testId:i&&`${i}-label`,children:[t,e&&o]}),l(k,{size:g.xxxSmall_4})]})}maybeRenderDescription(){const{description:t,testId:a}=this.props;return t?q(d.Fragment,{children:[l(I,{style:R.description,testId:a&&`${a}-description`,children:t}),l(k,{size:g.xxxSmall_4})]}):null}maybeRenderError(){const{error:t,id:a,testId:e}=this.props;return t?q(d.Fragment,{children:[l(k,{size:g.small_12}),l(I,{style:R.error,role:"alert",id:a&&`${a}-error`,testId:e&&`${e}-error`,children:t})]}):null}render(){const{field:t,style:a}=this.props;return q(T,{style:a,children:[this.renderLabel(),this.maybeRenderDescription(),l(k,{size:g.xSmall_8}),t,this.maybeRenderError()]})}}const R=N.StyleSheet.create({label:{color:n.offBlack},description:{color:n.offBlack64},error:{color:n.red},required:{color:n.red}});try{fieldheading.displayName="fieldheading",fieldheading.__docgenInfo={description:`A FieldHeading is an element that provides a label, description, and error element
to present better context and hints to any type of form field component.`,displayName:"fieldheading",props:{field:{defaultValue:null,description:"The form field component.",name:"field",required:!0,type:{name:"ReactNode"}},label:{defaultValue:null,description:"The title for the label element.",name:"label",required:!0,type:{name:"ReactNode"}},description:{defaultValue:null,description:"The text for the description element.",name:"description",required:!1,type:{name:"ReactNode"}},required:{defaultValue:null,description:"Whether this field is required to continue.",name:"required",required:!1,type:{name:"boolean"}},error:{defaultValue:null,description:"The message for the error element.",name:"error",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"Custom styles for the field heading container.",name:"style",required:!1,type:{name:"any"}},id:{defaultValue:null,description:"A unique id to link the label (and optional error) to the field.\n\nThe label will assume that the field will have its id formatted as `${id}-field`.\nThe field can assume that the error will have its id formatted as `${id}-error`.",name:"id",required:!1,type:{name:"string"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}}}}}catch{}class O extends d.Component{constructor(t){super(t),this.handleValidate=a=>{const{onValidate:e}=this.props;this.setState({error:a},()=>{e&&e(a)})},this.handleFocus=a=>{const{onFocus:e}=this.props;this.setState({focused:!0},()=>{e&&e(a)})},this.handleBlur=a=>{const{onBlur:e}=this.props;this.setState({focused:!1},()=>{e&&e(a)})},this.state={error:null,focused:!1}}render(){const{id:t,type:a,label:e,description:i,value:o,disabled:u,required:s,validate:c,onChange:v,onKeyDown:y,placeholder:V,light:w,style:m,testId:h,readOnly:p,autoComplete:f,forwardedRef:D,ariaDescribedby:_}=this.props;return l(L,{id:t,scope:"labeled-text-field",children:S=>l(te,{id:S,testId:h,style:m,field:l(ee,{id:`${S}-field`,"aria-describedby":_||`${S}-error`,"aria-invalid":this.state.error?"true":"false","aria-required":s?"true":"false",required:s,testId:h&&`${h}-field`,type:a,value:o,placeholder:V,disabled:u,validate:c,onValidate:this.handleValidate,onChange:v,onKeyDown:y,onFocus:this.handleFocus,onBlur:this.handleBlur,light:w,readOnly:p,autoComplete:f,ref:D}),label:e,description:i,required:!!s,error:!this.state.focused&&this.state.error||""})})}}O.defaultProps={type:"text",disabled:!1,light:!1};const me=d.forwardRef((r,t)=>l(O,{...r,forwardedRef:t}));try{labeledtextfield.displayName="labeledtextfield",labeledtextfield.__docgenInfo={description:`A LabeledTextField is an element used to accept a single line of text
from the user paired with a label, description, and error field elements.

### Usage

\`\`\`jsx
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

const [value, setValue] = React.useState("");

<LabeledTextField
    label="Label"
    description="Hello, this is the description for this field"
    placeholder="Placeholder"
    value={value}
    onChange={setValue}
/>
\`\`\``,displayName:"labeledtextfield",props:{style:{defaultValue:null,description:`Custom styles for the container.

Note: This style is passed to the field heading container
due to scenarios where we would like to set a specific
width for the text field. If we apply the style directly
to the text field, the container would not be affected.
For example, setting text field to "width: 50%" would not
affect the container since text field is a child of the container.
In this case, the container would maintain its width ocuppying
unnecessary space when the text field is smaller.`,name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}},id:{defaultValue:null,description:`An optional unique identifier for the TextField.
If no id is specified, a unique id will be auto-generated.`,name:"id",required:!1,type:{name:"string"}},onKeyDown:{defaultValue:null,description:"Called when a key is pressed.",name:"onKeyDown",required:!1,type:{name:"((event: KeyboardEvent<HTMLInputElement>) => unknown)"}},onChange:{defaultValue:null,description:"Called when the value has changed.",name:"onChange",required:!0,type:{name:"(newValue: string) => unknown"}},onFocus:{defaultValue:null,description:"Called when the element has been focused.",name:"onFocus",required:!1,type:{name:"((event: FocusEvent<HTMLInputElement, Element>) => unknown)"}},onBlur:{defaultValue:null,description:"Called when the element has been blurred.",name:"onBlur",required:!1,type:{name:"((event: FocusEvent<HTMLInputElement, Element>) => unknown)"}},label:{defaultValue:null,description:"Provide a label for the TextField.",name:"label",required:!0,type:{name:"ReactNode"}},light:{defaultValue:null,description:"Change the field’s sub-components to fit a dark background.",name:"light",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"Determines the type of input. Defaults to text.",name:"type",required:!1,type:{name:"enum",value:[{value:'"number"'},{value:'"text"'},{value:'"password"'},{value:'"email"'},{value:'"tel"'}]}},placeholder:{defaultValue:null,description:"Provide hints or examples of what to enter.",name:"placeholder",required:!1,type:{name:"string"}},required:{defaultValue:null,description:`Whether this field is required to to continue, or the error message to
render if this field is left blank.

This can be a boolean or a string.

String:
Please pass in a translated string to use as the error message that will
render if the user leaves this field blank. If this field is required,
and a string is not passed in, a default untranslated string will render
upon error.
Note: The string will not be used if a \`validate\` prop is passed in.

Example message: i18n._("A password is required to log in.")

Boolean:
True/false indicating whether this field is required. Please do not pass
in \`true\` if possible - pass in the error string instead.
If \`true\` is passed, and a \`validate\` prop is not passed, that means
there is no corresponding message and the default untranlsated message
will be used.`,name:"required",required:!1,type:{name:"string | boolean"}},value:{defaultValue:null,description:"The input value.",name:"value",required:!0,type:{name:"string"}},disabled:{defaultValue:null,description:"Makes a read-only input field that cannot be focused. Defaults to false.",name:"disabled",required:!1,type:{name:"boolean"}},description:{defaultValue:null,description:"Provide a description for the TextField.",name:"description",required:!1,type:{name:"ReactNode"}},validate:{defaultValue:null,description:`Provide a validation for the input value.
Return a string error message or null | void for a valid input.`,name:"validate",required:!1,type:{name:"((value: string) => string | null)"}},onValidate:{defaultValue:null,description:"Called when the TextField input is validated.",name:"onValidate",required:!1,type:{name:"((errorMessage?: string | null) => unknown)"}},readOnly:{defaultValue:null,description:"Specifies if the TextField is read-only.",name:"readOnly",required:!1,type:{name:"boolean"}},autoComplete:{defaultValue:null,description:"Specifies if the TextField allows autocomplete.",name:"autoComplete",required:!1,type:{name:"string"}},ariaDescribedby:{defaultValue:null,description:"Identifies the element or elements that describes this text field.",name:"ariaDescribedby",required:!1,type:{name:"string"}}}}}catch{}export{ue as C,me as L,pe as R,ee as T,ce as a,P as b};
//# sourceMappingURL=labeled-text-field-d77d5301.js.map
