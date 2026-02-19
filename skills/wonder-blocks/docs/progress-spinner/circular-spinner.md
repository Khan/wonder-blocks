# CircularSpinner

> Package: `@khanacademy/wonder-blocks-progress-spinner`

---

## Default

---

## Sizes

```tsx
<table>
    <tbody>
        <tr>
            <th>
                <LabelLarge>xsmall</LabelLarge>
            </th>
            <th>
                <LabelLarge>small</LabelLarge>
            </th>
            <th>
                <LabelLarge>medium</LabelLarge>
            </th>
            <th>
                <LabelLarge>large</LabelLarge>
            </th>
        </tr>
        <tr>
            <td>
                <CircularSpinner size={"xsmall"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"small"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"medium"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"large"} style={styles.distanced} />
            </td>
        </tr>
        <tr className={css(styles.darkBackground)}>
            <td>
                <CircularSpinner
                    light={true}
                    size={"xsmall"}
                    style={styles.distanced}
                />
            </td>
            <td>
                <CircularSpinner
                    light={true}
                    size={"small"}
                    style={styles.distanced}
                />
            </td>
            <td>
                <CircularSpinner
                    light={true}
                    size={"medium"}
                    style={styles.distanced}
                />
            </td>
            <td>
                <CircularSpinner
                    light={true}
                    size={"large"}
                    style={styles.distanced}
                />
            </td>
        </tr>
    </tbody>
</table>
```

---

## Light

```tsx
<CircularSpinner light={true} />
```

---

## Inline

```tsx
<Body>
    Inline inside{" "}
    <CircularSpinner size="xsmall" style={{display: "inline"}} /> some text.
</Body>
```

---

## With Style

```tsx
<CircularSpinner style={spinnerStyle} />
```

