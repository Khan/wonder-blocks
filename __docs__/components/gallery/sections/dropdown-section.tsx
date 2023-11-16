import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    ActionItem,
    ActionMenu,
    MultiSelect,
    OptionItem,
    SeparatorItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    return (
        <>
            <HeadingLarge id="dropdown" tag="h3" style={styles.sectionLabel}>
                Dropdown
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="ActionMenu"
                    href="/?path=/docs/dropdown-actionmenu--docs"
                    description={`A dropdown menu that consists of
                        various types of items.`}
                >
                    <View style={styles.centerContent}>
                        <ActionMenu menuText="Action Menu">
                            <ActionItem
                                label="Profile"
                                href="http://khanacademy.org/profile"
                                target="_blank"
                                testId="profile"
                            />
                            <ActionItem
                                label="Teacher dashboard"
                                href="http://khanacademy.org/coach/dashboard"
                                testId="dashboard"
                            />
                            <ActionItem
                                label="Settings (onClick)"
                                onClick={() => {}}
                                testId="settings"
                            />
                            <ActionItem
                                label="Help"
                                disabled={true}
                                onClick={() => {}}
                                testId="help"
                            />
                            <ActionItem
                                label="Feedback"
                                disabled={true}
                                href="/feedback"
                                testId="feedback"
                            />
                            <SeparatorItem />
                            <ActionItem
                                label="Log out"
                                href="http://khanacademy.org/logout"
                                testId="logout"
                            />
                        </ActionMenu>
                    </View>
                </ComponentTile>

                <ComponentTile
                    name="MultiSelect"
                    href="/?path=/docs/dropdown-multiselect--docs"
                    description={`A dropdown menu that allows multiple
                        options to be selected.`}
                >
                    <View style={styles.centerContent}>
                        <MultiSelect
                            id=""
                            onChange={(values) => setSelectedValues(values)}
                            onToggle={() => {}}
                            selectedValues={selectedValues}
                            testId=""
                        >
                            <OptionItem label="Mercury" value="1" key={1} />
                            <OptionItem label="Venus" value="2" key={2} />
                            <OptionItem
                                label="Earth"
                                value="3"
                                disabled
                                key={3}
                            />
                            <OptionItem label="Mars" value="4" key={4} />
                            <OptionItem label="Jupiter" value="5" key={5} />
                            <OptionItem label="Saturn" value="6" key={6} />
                            <OptionItem label="Neptune" value="7" key={7} />
                            <OptionItem label="Uranus" value="8" key={8} />
                        </MultiSelect>
                    </View>
                </ComponentTile>

                <ComponentTile
                    name="SingleSelect"
                    href="/?path=/docs/dropdown-singleselect--docs"
                    description={`A dropdown menu that allows the
                        selection of one item.`}
                >
                    <View style={styles.centerContent}>
                        <SingleSelect
                            isFilterable
                            onChange={(value) => setSelectedValue(value)}
                            onToggle={() => {}}
                            placeholder="Choose a fruit"
                            selectedValue={selectedValue}
                        >
                            <OptionItem label="Banana" value="banana" />
                            <OptionItem
                                disabled
                                label="Strawberry"
                                value="strawberry"
                            />
                            <OptionItem label="Pear" value="pear" />
                            <OptionItem label="Orange" value="orange" />
                            <OptionItem label="Watermelon" value="watermelon" />
                            <OptionItem label="Apple" value="apple" />
                            <OptionItem label="Grape" value="grape" />
                            <OptionItem label="Lemon" value="lemon" />
                            <OptionItem label="Mango" value="mango" />
                        </SingleSelect>
                    </View>
                </ComponentTile>
            </View>
        </>
    );
}
