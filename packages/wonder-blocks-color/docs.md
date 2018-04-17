```js
const ColoredTextWithBackground = ({
    textColor,
    backgroundColor,
}) => (
    <div
        style={{
            color: textColor,
            backgroundColor: backgroundColor || Color.white,
            padding: 10,
        }}
    >
        Hello world!
    </div>
);

const ColorWithName = ({
    colorName,
    color,
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                minHeight: 40,
            }}
        >
            <div style={{width: 250, paddingRight: 10, textAlign: "right"}}>
                {colorName}:
            </div>
            <div
                style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    border: `1px solid ${Color.offBlack}`,
                }}
            />
            <ColoredTextWithBackground textColor={color} />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offWhite}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offBlack64}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.darkBlue}
            />
        </div>
    );
};

const Color = require("./index.js").default;

<div>
    {Object.keys(Color).map((colorName, idx) => (
        <ColorWithName
            key={idx}
            color={Color[colorName]}
            colorName={colorName}
        />
    ))}
</div>
```

```js
const ColoredTextWithBackground = ({
    textColor,
    backgroundColor,
}) => (
    <div
        style={{
            color: textColor,
            backgroundColor: backgroundColor || Color.white,
            padding: 10,
        }}
    >
        Hello world!
    </div>
);

const ColorWithName = ({
    colorName,
    color,
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                minHeight: 40,
            }}
        >
            <div style={{width: 250, paddingRight: 10, textAlign: "right"}}>
                {colorName}:
            </div>
            <div
                style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    border: `1px solid ${Color.offBlack}`,
                }}
            />
            <ColoredTextWithBackground textColor={color} />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offWhite}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offBlack64}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.darkBlue}
            />
        </div>
    );
};

const {mix, fade} = require("./index.js");
const Color = require("./index.js").default;
const {white, offBlack, red} = Color;

<div>
    <p>
        Dynamically computed colors using the <code>fade</code> and{" "}
        <code>mix</code> methods from the color utilities.
    </p>
    <ColorWithName color={white} colorName="White" />
    <ColorWithName
        color={mix(fade(red, 0.16), white)}
        colorName="White (Tinted) = White + 16% Tint"
    />
    <ColorWithName
        color={mix(fade(red, 0.32), white)}
        colorName="White (XTinted) = White + 32% Tint"
    />
    <ColorWithName
        color={mix(fade(red, 0.64), white)}
        colorName="White (XXTinted) = White + 64% Tint"
    />

    <ColorWithName color={red} colorName="Tint" />
    <ColorWithName
        color={mix(fade(white, 0.16), red)}
        colorName="Tint (Light) = Tint + 16% White"
    />
    <ColorWithName
        color={mix(fade(offBlack, 0.32), red)}
        colorName="Tint (Dark) = Tint + 32% Off-Black"
    />

    <ColorWithName
        color={mix(fade(mix(fade(offBlack, 0.32), red), 0.32), red)}
        colorName="Tint (Dark) on Tint = Tint + 32% (Tint + 32% Off-Black)"
    />
    <ColorWithName
        color={mix(
            fade(mix(fade(offBlack, 0.32), red), 0.16),
            white,
        )}
        colorName="Tint (Dark) on White = White + 16% (Tint + 32% Off-Black)"
    />

    <ColorWithName color={offBlack} colorName="Off-Black" />
    <ColorWithName
        color={mix(fade(offBlack, 0.64), white)}
        colorName="Dark Gray"
    />
    <ColorWithName
        color={mix(fade(offBlack, 0.32), white)}
        colorName="Light Gray"
    />
</div>
```