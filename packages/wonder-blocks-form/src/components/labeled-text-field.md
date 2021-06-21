LabeledTextField derives from TextField and allows the handling of single lines of text with convenient label, description, and error messages.

Text

```js
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

class LabeledTextFieldExample extends React.Component {
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
                initialValue="Khan"
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
                initialValue="18"
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
    validation(value) {
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
                initialValue="Password123"
                validation={this.validation}
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
    validation(value) {
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
                initialValue="khan@khan.org"
                validation={this.validation}
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
    validation(value) {
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
                initialValue="123-456-7890"
                validation={this.validation}
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
    validation(value) {
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
                initialValue="khan"
                validation={this.validation}
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
    disabled={true}
/>
```
