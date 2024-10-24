import * as React from "react";

import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";
import {View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BirthdayPickerTile(props: {layout: "grid" | "list"}) {
    return (
        <ComponentTile
            name="BirthdayPicker"
            href="/?path=/docs/packages-birthdaypicker--docs"
            description={`Similar to a datepicker, but specifically
                    for birthdates. It consists of a set of dropdowns
                    to choose the date.`}
            layout={props.layout}
        >
            <View style={styles.centerContent}>
                <BirthdayPicker onChange={() => {}} />
            </View>
        </ComponentTile>
    );
}
