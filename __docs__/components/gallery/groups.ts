import AccordionTile from "./tiles/accordion-tile";
import AccordionSectionTile from "./tiles/accordion-section-tile";
import BannerTile from "./tiles/banner-tile";
import BirthdayPickerTile from "./tiles/birthday-picker-tile";
import BreadcrumbsTile from "./tiles/breadcrumbs-tile";
import ButtonTile from "./tiles/button-tile";
import CompactCellTile from "./tiles/compact-cell-tile";
import DetailCellTile from "./tiles/detail-cell-tile";
import ActionMenuTile from "./tiles/action-menu-tile";
import ComboboxTile from "./tiles/combobox-tile";
import ListboxTile from "./tiles/listbox-tile";
import MultiSelectTile from "./tiles/multi-select-tile";
import SingleSelectTile from "./tiles/single-select-tile";
import CheckboxTile from "./tiles/checkbox-tile";
import CheckboxGroupTile from "./tiles/checkbox-group-tile";
import RadioGroupTile from "./tiles/radio-group-tile";
import TextFieldTile from "./tiles/text-field-tile";
import TextAreaTile from "./tiles/text-area-tile";
import LabeledTextFieldTile from "./tiles/labeled-text-field-tile";
import IconButtonTile from "./tiles/icon-button-tile";
import LinkTile from "./tiles/link-tile";
import OnePaneDialogTile from "./tiles/one-pane-dialog-tile";
import PhosphorIconTile from "./tiles/phosphor-icon-tile";
import PillTile from "./tiles/pill-tile";
import PopoverTile from "./tiles/popover-tile";
import CircularSpinnerTile from "./tiles/circular-spinner-tile";
import SearchFieldTile from "./tiles/search-field-tile";
import SwitchTile from "./tiles/switch-tile";
import ToolbarTile from "./tiles/toolbar-tile";
import TooltipTile from "./tiles/tooltip-tile";

export type GroupMap = {
    name: string;
    components: Array<
        (props: {layout: "grid" | "list"; compactGrid: boolean}) => JSX.Element
    >;
};

export const alphabetGroups: Array<GroupMap> = [
    {
        name: "A",
        components: [AccordionTile, AccordionSectionTile, ActionMenuTile],
    },
    {
        name: "B",
        components: [
            BannerTile,
            BirthdayPickerTile,
            BreadcrumbsTile,
            ButtonTile,
        ],
    },
    {
        name: "C",
        components: [
            CheckboxTile,
            CheckboxGroupTile,
            CircularSpinnerTile,
            ComboboxTile,
            CompactCellTile,
        ],
    },
    {name: "D", components: [DetailCellTile]},
    {name: "I", components: [IconButtonTile]},
    {name: "L", components: [LabeledTextFieldTile, LinkTile, ListboxTile]},
    {name: "M", components: [MultiSelectTile]},
    {name: "O", components: [OnePaneDialogTile]},
    {
        name: "P",
        components: [PhosphorIconTile, PillTile, PopoverTile],
    },
    {name: "R", components: [RadioGroupTile]},
    {name: "S", components: [SearchFieldTile, SingleSelectTile, SwitchTile]},
    {
        name: "T",
        components: [TextAreaTile, TextFieldTile, ToolbarTile, TooltipTile],
    },
];

export const functionGroups: Array<GroupMap> = [
    {
        name: "Buttons & Links",
        components: [
            ButtonTile,
            IconButtonTile,
            LinkTile,
            PillTile,
            CompactCellTile,
            DetailCellTile,
        ],
    },
    {
        name: "Collapsible (Accordion)",
        components: [AccordionTile, AccordionSectionTile],
    },
    {
        name: "Dropdowns & Pickers",
        components: [
            ActionMenuTile,
            ComboboxTile,
            ListboxTile,
            MultiSelectTile,
            SingleSelectTile,
            BirthdayPickerTile,
        ],
    },
    {
        name: "Indicators",
        components: [
            PhosphorIconTile,
            PillTile,
            BannerTile,
            CircularSpinnerTile,
        ],
    },
    {
        name: "Lists",
        components: [CompactCellTile, DetailCellTile, ListboxTile],
    },
    {
        name: "Navigation",
        components: [BreadcrumbsTile, ToolbarTile],
    },
    {
        name: "Popovers & Modals",
        components: [PopoverTile, TooltipTile, OnePaneDialogTile],
    },
    {
        name: "Selection Controls",
        components: [
            CheckboxTile,
            CheckboxGroupTile,
            RadioGroupTile,
            SwitchTile,
        ],
    },
    {
        name: "Text",
        components: [
            TextFieldTile,
            TextAreaTile,
            LabeledTextFieldTile,
            SearchFieldTile,
            ComboboxTile,
        ],
    },
];

export const packageGroups: Array<GroupMap> = [
    {name: "Accordion", components: [AccordionTile, AccordionSectionTile]},
    {name: "Banner", components: [BannerTile]},
    {name: "Birthday Picker", components: [BirthdayPickerTile]},
    {name: "Breadcrumbs", components: [BreadcrumbsTile]},
    {name: "Button", components: [ButtonTile]},
    {name: "Cell", components: [CompactCellTile, DetailCellTile]},
    {
        name: "Dropdown",
        components: [
            ActionMenuTile,
            ComboboxTile,
            ListboxTile,
            MultiSelectTile,
            SingleSelectTile,
        ],
    },
    {
        name: "Form",
        components: [
            CheckboxTile,
            CheckboxGroupTile,
            RadioGroupTile,
            TextFieldTile,
            LabeledTextFieldTile,
            TextAreaTile,
        ],
    },
    {name: "Icon Button", components: [IconButtonTile]},
    {name: "Icon", components: [PhosphorIconTile]},
    {name: "Link", components: [LinkTile]},
    {name: "Modal", components: [OnePaneDialogTile]},
    {name: "Pill", components: [PillTile]},
    {name: "Popover", components: [PopoverTile]},
    {name: "Progress Spinner", components: [CircularSpinnerTile]},
    {name: "Search Field", components: [SearchFieldTile]},
    {name: "Switch", components: [SwitchTile]},
    {name: "Toolbar", components: [ToolbarTile]},
    {name: "Tooltip", components: [TooltipTile]},
];
