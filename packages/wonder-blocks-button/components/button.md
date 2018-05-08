Button example:
```js
<Button
    onClick={(e) => console.log("Hello, world!")}
>Label</Button>
```

Button example, `href="#button-1"`:
```js
<Button
    onClick={(e) => console.log("Hello, world!")}
    href="#button-1"
>Label</Button>
```

Disabled button example:
```js
<Button
    onClick={(e) => console.log("Hello, world!")}
    disabled={true}
>Label</Button>
```

Button examples, `style` specified (Support width, position, margin, and flex styles):
```js
const {View} = require("wonder-blocks-core");
<table>
    <thead>
        <tr>
            <th style={{minWidth: '250px'}}>Styles</th>
            <th style={{width: '100%'}}>Buttons</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>width: '200px'</td>
        <td>
            <Button
                onClick={(e) => console.log("Hello, world!")}
                style={{width: '200px'}}
            >Label</Button>
        </td>
    </tr>
    <tr>
        <td>width: '75%'</td>
        <td>
            <Button
                onClick={(e) => console.log("Hello, world!")}
                style={{width: '75%'}}
            >Label</Button>
        </td>
    </tr>
    <tr>
        <td>display: 'block', margin: '0 auto'</td>
        <td>
            <Button
                onClick={(e) => console.log("Hello, world!")}
                style={{display: 'block', margin: '0 auto'}}
            >Label</Button>
        </td>
    </tr>
    <tr>
        <td>flexGrow: 1</td>
        <td>
            <div style={{display: 'flex'}}>
                <Button
                    onClick={(e) => console.log("Hello, world!")}
                    style={{flexGrow: 1}}
                >Label</Button>
            </div>
        </td>
    </tr>
    <tr>
        <td>flexShrink: 2, width: '300px'</td>
        <td>
            <div style={{display: 'flex'}}>
                <Button
                    onClick={(e) => console.log("Hello, world!")}
                    style={{flexShrink: 2, width: '300px'}}
                >Label</Button>
                <div
                    onClick={(e) => console.log("Hello, world!")}
                    style={
                        {
                            width: '100%',
                            background: '#d92916',
                            textAlign: 'center',
                            lineHeight: '40px',
                            borderRadius: '4px',
                            color: 'white',
                        }
                    }
                >A wide div</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>alignSelf: 'flex-end'</td>
        <td>
            <div style={{display: 'flex'}}>
                <Button
                    onClick={(e) => console.log("Hello, world!")}
                    style={{alignSelf: 'flex-end'}}
                >Label</Button>
                <div
                    onClick={(e) => console.log("Hello, world!")}
                    style={
                        {
                            background: '#d92916',
                            textAlign: 'center',
                            lineHeight: '100px',
                            height: '100px',
                            borderRadius: '4px',
                            padding: '0px 4px',
                            color: 'white',
                        }
                    }
                >A tall div</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>justifySelf: 'flex-end'</td>
        <td>
            <div style={{display: 'flex'}}>
                <div style={{display: 'grid', width: '100%'}}>
                <Button
                    onClick={(e) => console.log("Hello, world!")}
                    style={{justifySelf: 'flex-end'}}
                >Label</Button>
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td>background: 'green'</td>
        <td>
            <Button
                onClick={(e) => console.log("Hello, world!")}
                style={{background: 'green'}}
            >Label</Button>
        </td>
    </tr>
    </tbody>
</table>
```
