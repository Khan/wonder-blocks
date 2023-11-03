import * as React from "react";

import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BirthdayPickerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Birthday Picker
            </HeadingLarge>
            <ComponentTile
                name="BirthdayPicker"
                href="/?path=/docs/birthdaypicker--docs"
            >
                <BirthdayPicker onChange={() => {}} />
            </ComponentTile>
        </>
    );
}
