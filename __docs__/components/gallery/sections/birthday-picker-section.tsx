import * as React from "react";

import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";
import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BirthdayPickerSection() {
    return (
        <>
            <HeadingLarge
                id="birthday-picker"
                tag="h3"
                style={styles.sectionLabel}
            >
                Birthday Picker
            </HeadingLarge>
            <ComponentTile
                name="BirthdayPicker"
                href="/?path=/docs/birthdaypicker--docs"
                description={`Similar to a datepicker, but specifically
                    for birthdates. It consists of a set of dropdowns
                    to choose the date.`}
            >
                <View style={styles.centerContent}>
                    <BirthdayPicker onChange={() => {}} />
                </View>
            </ComponentTile>
        </>
    );
}
