## Dropdown 
```js
<Dropdown 
    items={[
        {label: "item 1", value: 1},
        {label: "item 2", value: 2},
        {label: "item 3", value: 3},
    ]}
/>
```

## Dropdown (start open)

This example is still fully controlled.  Here the `show` prop acts to 
override the initial value of the component's internal `show` state var.
```js
<Dropdown 
    show={true}
    items={[
        {label: "item 1", value: 1},
        {label: "item 2", value: 2},
        {label: "item 3", value: 3},
    ]}
/>
```

## Dropdown (full controlled)

This example full controls the Dropdown component to customize its behavior
forcing users to make a selection before they can close.  It also, closes
the dropdown when a user makes a selection instead of leaving it open like
the other dropdowns.
```js
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selection: null,
        };
    }

    handleOpen() {
        this.setState({show: true});
    }

    handleClose() {
        console.log("handle close");
        this.setState({show: true});
    }

    handleChange(selection) {
        this.setState({selection});
        this.setState({show: false});
    }

    render() {
        console.log(`show = ${this.state.show}`);
        return <Dropdown
            controlled={false}
            show={this.state.show}
            selection={this.state.selection}
            onOpen={() => this.handleOpen()}
            onClose={() => this.handleClose()}
            onChange={(e, selection) => this.handleChange(selection)}
            items={[
                {label: "item 1", value: 1},
                {label: "item 2", value: 2},
                {label: "item 3", value: 3},
                {label: "item 4", value: 4},
            ]}
        />
    }
}

<Parent/>;
```
