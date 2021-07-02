```js
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField, Radio} from "@khanacademy/wonder-blocks-form";

class FieldHeadingExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <FieldHeading
                field={
                    <TextField
                        id="tf-1"
                        type="text"
                        value={this.state.value}
                        placeholder="Username"
                        onChange={(newValue) => this.setState({value: newValue})}
                        onKeyDown={this.handleKeyDown}
                    />
                }
                label="Username"
                description="Please enter your username."
                error="That username is already taken."
            />

        );
    }
}

<FieldHeadingExample />
```
