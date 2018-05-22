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

    handleChange(selection: any) {
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
