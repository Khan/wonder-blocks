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
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    validation(value) {
        if (value.length <= 8) {
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

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="password"
                    value={this.state.value}
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                />
                {this.state.errorMessage && (
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
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
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

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                />
                {this.state.errorMessage && (
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
        };
        this.validation = this.validation.bind(this);
        this.handleOnValidation = this.handleOnValidation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
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

    render() {
        return (
            <View>
                <TextField
                    id="tf-1"
                    type="email"
                    value={this.state.value}
                    validation={this.validation}
                    onValidation={this.handleOnValidation}
                    onChange={this.handleOnChange}
                />
                {this.state.errorMessage && (
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

<TextField id="tf-1" value="" onChange={() => {}} disabled={true} />
```