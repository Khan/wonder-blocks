import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import AccordionTile from "./tiles/accordion-tile";
import AccordionSectionTile from "./tiles/accordion-section-tile";
import ActionMenuTile from "./tiles/action-menu-tile";
import BannerTile from "./tiles/banner-tile";
import BirthdayPickerTile from "./tiles/birthday-picker-tile";
import BreadcrumbsTile from "./tiles/breadcrumbs-tile";
import ButtonTile from "./tiles/button-tile";
import CheckboxTile from "./tiles/checkbox-tile";
import CheckboxGroupTile from "./tiles/checkbox-group-tile";
import ComboboxTile from "./tiles/combobox-tile";
import CompactCellTile from "./tiles/compact-cell-tile";
import DetailCellTile from "./tiles/detail-cell-tile";
import IconButtonTile from "./tiles/icon-button-tile";
import IconTile from "./tiles/icon-tile";
import LabeledTextFieldTile from "./tiles/labeled-text-field-tile";
import LinkTile from "./tiles/link-tile";
import ModalTile from "./tiles/modal-tile";
import MultiSelectTile from "./tiles/multi-select-tile";
import PillTile from "./tiles/pill-tile";
import PopoverTile from "./tiles/popover-tile";
import ProgressSpinnerTile from "./tiles/progress-spinner-tile";
import RadioGroupTile from "./tiles/radio-group-tile";
import SearchFieldTile from "./tiles/search-field-tile";
import SingleSelectTile from "./tiles/single-select-tile";
import SwitchTile from "./tiles/switch-tile";
import TextFieldTile from "./tiles/text-field-tile";
import ToolbarTile from "./tiles/toolbar-tile";
import TooltipTile from "./tiles/tooltip-tile";

export default function ComponentGallery() {
    return (
        <View>
            <AccordionTile />
            <AccordionSectionTile />
            <BannerTile />
            <BirthdayPickerTile />
            <BreadcrumbsTile />
            <ButtonTile />
            <CompactCellTile />
            <DetailCellTile />
            <ActionMenuTile />
            <MultiSelectTile />
            <SingleSelectTile />
            <ComboboxTile />
            <CheckboxTile />
            <CheckboxGroupTile />
            <RadioGroupTile />
            <TextFieldTile />
            <LabeledTextFieldTile />
            <IconButtonTile />
            <IconTile />
            <LinkTile />
            <ModalTile />
            <PillTile />
            <PopoverTile />
            <ProgressSpinnerTile />
            <SearchFieldTile />
            <SwitchTile />
            <ToolbarTile />
            <TooltipTile />
        </View>
    );
}
