import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {tokens} from "@khanacademy/wonder-blocks-theming";

import AccordionGallerySection from "./sections/accordion-section";
import BannerSection from "./sections/banner-section";
import BirthdayPickerSection from "./sections/birthday-picker-section";
import BreadcrumbsSection from "./sections/breadcrumbs-section";
import ButtonSection from "./sections/button-section";
import CellSection from "./sections/cell-section";
import DropdownSection from "./sections/dropdown-section";
import FormSection from "./sections/form-section";
import IconButtonSection from "./sections/icon-button-section";
import IconSection from "./sections/icon-section";
import LinkSection from "./sections/link-section";
import ModalSection from "./sections/modal-section";
import PillSection from "./sections/pill-section";
import PopoverSection from "./sections/popover-section";
import ProgressSpinnerSection from "./sections/progress-spinner-section";
import SearchFieldSection from "./sections/search-field-section";
import SwitchSection from "./sections/switch-section";
import ToolbarSection from "./sections/toolbar-section";
import TooltipSection from "./sections/tooltip-section";

export default function ComponentGallery() {
    return (
        <View>
            <AccordionGallerySection />
            <BannerSection />
            <BirthdayPickerSection />
            <BreadcrumbsSection />
            <ButtonSection />
            <CellSection />
            <DropdownSection />
            <FormSection />
            <IconButtonSection />
            <IconSection />
            <LinkSection />
            <ModalSection />
            <PillSection />
            <PopoverSection />
            <ProgressSpinnerSection />
            <SearchFieldSection />
            <SwitchSection />
            <ToolbarSection />
            <TooltipSection />
        </View>
    );
}

export const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionLabel: {
        marginTop: tokens.spacing.xLarge_32,
        marginBottom: tokens.spacing.large_24,
    },
    cellExample: {
        backgroundColor: tokens.color.offWhite,
        padding: tokens.spacing.large_24,
    },
    centerContent: {
        width: "fit-content",
        alignSelf: "center",
    },
});
