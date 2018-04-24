Modals. These are WIP. TODO(mdr): Finish building, and write more thorough docs.

## Two-column layout

```js
const {StyleSheet, css} = require("aphrodite");
const {Title, Body} = require("wonder-blocks-typography");
const TwoColumnModal = require("./components/two-column-modal.js").default;

const styles = StyleSheet.create({
    example: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        padding: 32,
    },

    title: {
        marginBottom: 16,
    },
});

<div className={css(styles.example)}>
    <TwoColumnModal
        leftContent={
            <div>
                <Title style={styles.title}>Left column</Title>
                <Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                </Body>
            </div>
        }
        rightContent={
            <div>
                <Title style={styles.title}>Right column</Title>
                <Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est.
                </Body>
            </div>
        }
    />
</div>;
```
