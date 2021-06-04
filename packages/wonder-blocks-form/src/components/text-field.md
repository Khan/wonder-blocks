Text

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    render() {
        return (
            <TextField
                id="tf-1"
                type="text"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
            />
        );
    }
}

<TextFieldExample />
```

Number

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "12345",
        };
    }

    render() {
        return (
            <TextField
                id="tf-1"
                type="number"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
            />
        );
    }
}

<TextFieldExample />
```

Password

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Password123",
        };
    }

    render() {
        return (
            <TextField
                id="tf-1"
                type="password"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
            />
        );
    }
}

<TextFieldExample />
```

Disabled

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

<TextField id="tf-1" value="" onChange={() => {}} disabled={true} />
```