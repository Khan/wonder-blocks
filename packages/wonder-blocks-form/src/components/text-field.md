Text

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <TextField
                id="tf-1"
                type="text"
                value={this.state.value}
                placeholder="Text"
                onChange={this.handleOnChange}
                onKeyDown={this.handleOnKeyDown}
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
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <TextField
                id="tf-1"
                type="number"
                value={this.state.value}
                placeholder="Number"
                onChange={this.handleOnChange}
                onKeyDown={this.handleOnKeyDown}
            />
        );
    }
}

<TextFieldExample />
```

Password (with Validation)

```js
import {StyleSheet} from "aphrodite";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Password123",
            errorMessage: null,
            focused: false,
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    validation(value) {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    }

    handleOnValidation(errorMessage) {
        this.setState({errorMessage: errorMessage});
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleOnFocus() {
        this.setState({focused: true});
    }

    handleOnBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="password"
                    value={this.state.value}
                    placeholder="Password"
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {!this.state.focused && this.state.errorMessage && (
                    <View>
                        <Strut size={Spacing.xSmall_8} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
});

<TextFieldExample />
```

Email (with Validation)

```js
import {StyleSheet} from "aphrodite";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "khan@khanacademy.org",
            errorMessage: null,
            focused: false,
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    validation(value) {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    }

    handleOnValidation(errorMessage) {
        this.setState({errorMessage: errorMessage});
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleOnFocus() {
        this.setState({focused: true});
    }

    handleOnBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    placeholder="Email"
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {!this.state.focused && this.state.errorMessage && (
                    <View>
                        <Strut size={Spacing.xSmall_8} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
});

<TextFieldExample />
```

Telephone (with Validation)

```js
import {StyleSheet} from "aphrodite";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "123-456-7890",
            errorMessage: null,
            focused: false,
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    validation(value) {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    }

    handleOnValidation(errorMessage) {
        this.setState({errorMessage: errorMessage});
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleOnFocus() {
        this.setState({focused: true});
    }

    handleOnBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    placeholder="Telephone"
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {!this.state.focused && this.state.errorMessage && (
                    <View>
                        <Strut size={Spacing.xSmall_8} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
});

<TextFieldExample />
```

Error

```js
import {StyleSheet} from "aphrodite";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "khan",
            errorMessage: null,
            focused: false,
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    validation(value) {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    }

    handleOnValidation(errorMessage) {
        this.setState({errorMessage: errorMessage});
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleOnFocus() {
        this.setState({focused: true});
    }

    handleOnBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    placeholder="Email"
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {!this.state.focused && this.state.errorMessage && (
                    <View>
                        <Strut size={Spacing.xSmall_8} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
});

<TextFieldExample />
```

Disabled

```js
import {TextField} from "@khanacademy/wonder-blocks-form";

<TextField
    id="tf-1" value=""
    placeholder="This field is disabled."
    onChange={() => {}}
    disabled={true}
/>
```

Light (default focus ring fits a dark background)

```js
import {StyleSheet} from "aphrodite";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "khan@khanacademy.org",
            errorMessage: null,
            focused: false,
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    validation(value) {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    }

    handleOnValidation(errorMessage) {
        this.setState({errorMessage: errorMessage});
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    handleOnFocus() {
        this.setState({focused: true});
    }

    handleOnBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <View style={styles.darkBackground}>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    light={true}
                    placeholder="Email"
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {!this.state.focused && this.state.errorMessage && (
                    <View>
                        <Strut size={Spacing.xSmall_8} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.white,
        paddingLeft: Spacing.xxxSmall_4,
    },
    darkBackground: {
        backgroundColor: Color.darkBlue,
        padding: Spacing.medium_16,
    },
});

<TextFieldExample />
```

Custom Style

```js
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextFieldExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    handleOnChange(newValue) {
        this.setState({value: newValue});
    }

    handleOnKeyDown(event) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    render() {
        return (
            <TextField
                id="tf-1"
                style={styles.customField}
                type="text"
                value={this.state.value}
                placeholder="Text"
                onChange={this.handleOnChange}
                onKeyDown={this.handleOnKeyDown}
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

<TextFieldExample />
```
