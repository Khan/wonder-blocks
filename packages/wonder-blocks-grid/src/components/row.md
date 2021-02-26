**Example:**

A row inside of a grid containing two [Cells](#cell). The row has some styling
applied giving it a white background, a gold border, and some vertical padding.
Note that the margins and gutter have been inserted automatically.

```jsx
import {Cell} from "@khanacademy/wonder-blocks-grid";
import Color from "@khanacademy/wonder-blocks-color";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    background: {
        background: Color.offBlack,
    },

    row: {
        padding: "16px 0",
        border: `1px solid ${Color.gold}`,
        background: Color.white,
    },

    cell: {
        height: 100,
        padding: 5,
        background: Color.gold,
    },
});

<View style={styles.background}>
    <Row style={styles.row}>
        <Cell smallCols={2} mediumCols={4} largeCols={6} style={styles.cell}>
            <Text>Cell</Text>
        </Cell>
        <Cell smallCols={2} mediumCols={4} largeCols={6} style={styles.cell}>
            <Text>Cell</Text>
        </Cell>
    </Row>
</View>;
```

Another example – If the height of the [Cell's](#cell) contents is taller than
the [Row](#row) it will allow vertical scrolling.

```jsx
import {Cell} from "@khanacademy/wonder-blocks-grid";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    view: {
        background: Color.offBlack,
        height: "400px",
    },

    row: {
        alignItems: "stretch",
        background: Color.white,
        border: `1px solid ${Color.gold}`,
        display: "flex",
        height: "100%",
        padding: "16px 0",
    },

    cell: {
        background: Color.gold,
        overflowY: "auto",
        padding: 5,
    },
});

<View style={styles.view}>
    <Row style={styles.row}>
        <Cell
            smallCols={2}
            mediumCols={4}
            largeCols={4}
            style={styles.cell}
        >
            <Text>Sidebar</Text>
            <ul>
                <li>Chapter 1: Loomings</li>
                <li>Chapter 2: The Carpet-Bag</li>
                <li>Chapter 3: The Spouter-Inn</li>
                <li>Chapter 4: The Counterpane</li>
                <li>Chapter 5: Breakfast</li>
                <li>Chapter 6: The Street</li>
            </ul>
        </Cell>
        <Cell
            smallCols={2}
            mediumCols={4}
            largeCols={8}
            style={styles.cell}
        >
            <Body tag="p">Call me Ishmael. Some years ago- never mind how long precisely- having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off- then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.</Body>

            <Body tag="p">There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs- commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.</Body>
        </Cell>
    </Row>
</View>
```
