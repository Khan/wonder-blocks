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

## Dropdown (initial selection)

This example is still fully controlled.  Here the `selection` prop acts to 
override the initial value of the component's internal `selection` state var.
```js
<Dropdown 
    items={[
        {label: "item 1", value: 1},
        {label: "item 2", value: 2},
        {label: "item 3", value: 3},
    ]}
    selection={1}
/>
```

## Dropdown (uncontrolled)

This example uses DropdownCore to implement a dropdown with custom behavior.
It forces users to make a selection before they can close it.  It also, closes
the dropdown when a user makes a selection instead of leaving it open like
the other dropdowns.
```js
class CustomDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selection: null,
        };
    }

    handleHeaderClick() {
        this.setState({show: true});
    }

    handleItemClick(item, index) {
        this.setState({selection: index});
        this.setState({show: false});
    }

    render() {
        return <DropdownCore
            show={this.state.show}
            selection={this.state.selection}
            onHeaderClick={() => this.handleHeaderClick()}
            onItemClick={(item, index) => this.handleItemClick(item, index)}
            items={[
                {label: "item 1", value: 1},
                {label: "item 2", value: 2},
                {label: "item 3", value: 3},
                {label: "item 4", value: 4},
            ]}
        />
    }
}

<CustomDropdown/>;
```
