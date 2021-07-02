LabeledTextField derives from TextField and allows the handling of single lines of text with convenient label, description, and error messages.

Text

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Khan",
        };
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Name"
                description="Please enter your name"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Name"
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

Number

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "18",
        };
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Age"
                type="number"
                description="Please enter your age"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Age"
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

Password

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Password123",
        };
    }

    validate(value) {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Password"
                type="password"
                description="Please enter a secure password"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Password"
                validate={this.validate}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

Email

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "khan@khan.org",
        };
    }

    validate(value) {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Email"
                type="email"
                description="Please provide your personal email"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Email"
                validate={this.validate}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

Telephone

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "123-456-7890",
        };
    }

    validate(value) {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Telephone"
                type="tel"
                description="Please provide your personal phone number"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Telephone"
                validate={this.validate}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

The field can have an error

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "khan",
        };
    }

    validate(value) {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Email"
                type="email"
                description="Please enter your personal email"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Email"
                validate={this.validate}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

<LabeledTextFieldExample />
```

The field can be disabled

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

<LabeledTextField
    label="Name"
    description="Please enter your name"
    value=""
    onChange={() => {}}
    placeholder="Name"
    disabled={true}
/>
```

The field can be in light mode to fit a dark background

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <View style={styles.darkBackground}>
                <LabeledTextField
                    label={
                        <LabelMedium style={styles.whiteColor}>Name</LabelMedium>
                    }
                    description={
                        <LabelSmall style={styles.offWhiteColor}>
                            Please enter your name
                        </LabelSmall>
                    }
                    value={this.state.value}
                    onChange={(newValue) => this.setState({value: newValue})}
                    placeholder="Name"
                    light={true}
                    onKeyDown={this.handleKeyDown}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    darkBackground: {
        background: Color.darkBlue,
        padding: `${Spacing.medium_16}px`,
    },
    whiteColor: {
        color: Color.white,
    },
    offWhiteColor: {
        color: Color.white64,
    },
});

<LabeledTextFieldExample />
```

The field can have custom styles

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Khan",
        };
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <LabeledTextField
                label="Name"
                description="Please enter your name"
                value={this.state.value}
                onChange={(newValue) => this.setState({value: newValue})}
                placeholder="Name"
                style={styles.customField}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

const styles = StyleSheet.create({
    customField: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: Color.white64,
        },
    },
});

<LabeledTextFieldExample />
```

The field forwards its ref to the input

```js
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";

class LabeledTextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Khan",
        };
        this.inputRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleSubmit() {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    render() {
        return (
            <View>
                <LabeledTextField
                    label="Name"
                    description="Please enter your name"
                    value={this.state.value}
                    onChange={(newValue) => this.setState({value: newValue})}
                    placeholder="Name"
                    onKeyDown={this.handleKeyDown}
                    ref={this.inputRef}
                />
                <Strut size={Spacing.medium_16} />
                <Button style={styles.button} onClick={this.handleSubmit}>
                    Focus Input
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        maxWidth: 150,
    },
});

<LabeledTextFieldExample />
```
