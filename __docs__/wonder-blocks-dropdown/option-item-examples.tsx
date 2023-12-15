import * as React from "react";
import userCircleIcon from "@phosphor-icons/core/duotone/user-circle-duotone.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

export const allCountries = [
    ["AF", "Afghanistan"],
    ["AX", "Åland Islands"],
    ["AL", "Albania"],
    ["DZ", "Algeria"],
    ["AS", "American Samoa"],
    ["AD", "Andorra"],
    ["AO", "Angola"],
    ["AI", "Anguilla"],
    ["AQ", "Antarctica"],
    ["AG", "Antigua and Barbuda"],
    ["AR", "Argentina"],
    ["AM", "Armenia"],
    ["AW", "Aruba"],
    ["AU", "Australia"],
    ["AT", "Austria"],
    ["AZ", "Azerbaijan"],
    ["BS", "Bahamas (the)"],
    ["BH", "Bahrain"],
    ["BD", "Bangladesh"],
    ["BB", "Barbados"],
    ["BY", "Belarus"],
    ["BE", "Belgium"],
    ["BZ", "Belize"],
    ["BJ", "Benin"],
    ["BM", "Bermuda"],
    ["BT", "Bhutan"],
    ["BO", "Bolivia (Plurinational State of)"],
    ["BQ", "Bonaire, Sint Eustatius and Saba"],
    ["BA", "Bosnia and Herzegovina"],
    ["BW", "Botswana"],
    ["BV", "Bouvet Island"],
    ["BR", "Brazil"],
    ["VG", "Virgin Islands (British)"],
    ["IO", "British Indian Ocean Territory (the)"],
    ["BN", "Brunei Darussalam"],
    ["BG", "Bulgaria"],
    ["BF", "Burkina Faso"],
    ["BI", "Burundi"],
    ["KH", "Cambodia"],
    ["CM", "Cameroon"],
    ["CA", "Canada"],
    ["CV", "Cabo Verde"],
    ["KY", "Cayman Islands (the)"],
    ["CF", "Central African Republic (the)"],
    ["TD", "Chad"],
    ["CL", "Chile"],
    ["CN", "China"],
    ["HK", "Hong Kong"],
    ["MO", "Macao"],
    ["CX", "Christmas Island"],
    ["CC", "Cocos (Keeling) Islands (the)"],
    ["CO", "Colombia"],
    ["KM", "Comoros (the)"],
    ["CG", "Congo (the)"],
    ["CD", "Congo (the Democratic Republic of the)"],
    ["CK", "Cook Islands (the)"],
    ["CR", "Costa Rica"],
    ["CI", "Côte d'Ivoire"],
    ["HR", "Croatia"],
    ["CU", "Cuba"],
    ["CW", "Curaçao"],
    ["CY", "Cyprus"],
    ["CZ", "Czechia"],
    ["DK", "Denmark"],
    ["DJ", "Djibouti"],
    ["DM", "Dominica"],
    ["DO", "Dominican Republic (the)"],
    ["EC", "Ecuador"],
    ["EG", "Egypt"],
    ["SV", "El Salvador"],
    ["GQ", "Equatorial Guinea"],
    ["ER", "Eritrea"],
    ["EE", "Estonia"],
    ["ET", "Ethiopia"],
    ["FK", "Falkland Islands (the) [Malvinas]"],
    ["FO", "Faroe Islands (the)"],
    ["FJ", "Fiji"],
    ["FI", "Finland"],
    ["FR", "France"],
    ["GF", "French Guiana"],
    ["PF", "French Polynesia"],
    ["TF", "French Southern Territories (the)"],
    ["GA", "Gabon"],
    ["GM", "Gambia (the)"],
    ["GE", "Georgia"],
    ["DE", "Germany"],
    ["GH", "Ghana"],
    ["GI", "Gibraltar"],
    ["GR", "Greece"],
    ["GL", "Greenland"],
    ["GD", "Grenada"],
    ["GP", "Guadeloupe"],
    ["GU", "Guam"],
    ["GT", "Guatemala"],
    ["GG", "Guernsey"],
    ["GN", "Guinea"],
    ["GW", "Guinea-Bissau"],
    ["GY", "Guyana"],
    ["HT", "Haiti"],
    ["HM", "Heard Island and McDonald Islands"],
    ["VA", "Holy See (the)"],
    ["HN", "Honduras"],
    ["HU", "Hungary"],
    ["IS", "Iceland"],
    ["IN", "India"],
    ["ID", "Indonesia"],
    ["IR", "Iran (Islamic Republic of)"],
    ["IQ", "Iraq"],
    ["IE", "Ireland"],
    ["IM", "Isle of Man"],
    ["IL", "Israel"],
    ["IT", "Italy"],
    ["JM", "Jamaica"],
    ["JP", "Japan"],
    ["JE", "Jersey"],
    ["JO", "Jordan"],
    ["KZ", "Kazakhstan"],
    ["KE", "Kenya"],
    ["KI", "Kiribati"],
    ["KP", "Korea (the Democratic People's Republic of)"],
    ["KR", "Korea (the Republic of)"],
    ["KW", "Kuwait"],
    ["KG", "Kyrgyzstan"],
    ["LA", "Lao People's Democratic Republic (the)"],
    ["LV", "Latvia"],
    ["LB", "Lebanon"],
    ["LS", "Lesotho"],
    ["LR", "Liberia"],
    ["LY", "Libya"],
    ["LI", "Liechtenstein"],
    ["LT", "Lithuania"],
    ["LU", "Luxembourg"],
    ["MK", "North Macedonia"],
    ["MG", "Madagascar"],
    ["MW", "Malawi"],
    ["MY", "Malaysia"],
    ["MV", "Maldives"],
    ["ML", "Mali"],
    ["MT", "Malta"],
    ["MH", "Marshall Islands (the)"],
    ["MQ", "Martinique"],
    ["MR", "Mauritania"],
    ["MU", "Mauritius"],
    ["YT", "Mayotte"],
    ["MX", "Mexico"],
    ["FM", "Micronesia (Federated States of)"],
    ["MD", "Moldova (the Republic of)"],
    ["MC", "Monaco"],
    ["MN", "Mongolia"],
    ["ME", "Montenegro"],
    ["MS", "Montserrat"],
    ["MA", "Morocco"],
    ["MZ", "Mozambique"],
    ["MM", "Myanmar"],
    ["NA", "Namibia"],
    ["NR", "Nauru"],
    ["NP", "Nepal"],
    ["NL", "Netherlands (the)"],
    ["NC", "New Caledonia"],
    ["NZ", "New Zealand"],
    ["NI", "Nicaragua"],
    ["NE", "Niger (the)"],
    ["NG", "Nigeria"],
    ["NU", "Niue"],
    ["NF", "Norfolk Island"],
    ["MP", "Northern Mariana Islands (the)"],
    ["NO", "Norway"],
    ["OM", "Oman"],
    ["PK", "Pakistan"],
    ["PW", "Palau"],
    ["PS", "Palestine, State of"],
    ["PA", "Panama"],
    ["PG", "Papua New Guinea"],
    ["PY", "Paraguay"],
    ["PE", "Peru"],
    ["PH", "Philippines (the)"],
    ["PN", "Pitcairn"],
    ["PL", "Poland"],
    ["PT", "Portugal"],
    ["PR", "Puerto Rico"],
    ["QA", "Qatar"],
    ["RE", "Réunion"],
    ["RO", "Romania"],
    ["RU", "Russian Federation (the)"],
    ["RW", "Rwanda"],
    ["BL", "Saint Barthélemy"],
    ["SH", "Saint Helena, Ascension and Tristan da Cunha"],
    ["KN", "Saint Kitts and Nevis"],
    ["LC", "Saint Lucia"],
    ["MF", "Saint Martin (French part)"],
    ["PM", "Saint Pierre and Miquelon"],
    ["VC", "Saint Vincent and the Grenadines"],
    ["WS", "Samoa"],
    ["SM", "San Marino"],
    ["ST", "Sao Tome and Principe"],
    ["SA", "Saudi Arabia"],
    ["SN", "Senegal"],
    ["RS", "Serbia"],
    ["SC", "Seychelles"],
    ["SL", "Sierra Leone"],
    ["SG", "Singapore"],
    ["SX", "Sint Maarten (Dutch part)"],
    ["SK", "Slovakia"],
    ["SI", "Slovenia"],
    ["SB", "Solomon Islands"],
    ["SO", "Somalia"],
    ["ZA", "South Africa"],
    ["GS", "South Georgia and the South Sandwich Islands"],
    ["SS", "South Sudan"],
    ["ES", "Spain"],
    ["LK", "Sri Lanka"],
    ["SD", "Sudan (the)"],
    ["SR", "Suriname"],
    ["SJ", "Svalbard and Jan Mayen"],
    ["SZ", "Eswatini"],
    ["SE", "Sweden"],
    ["CH", "Switzerland"],
    ["SY", "Syrian Arab Republic (the)"],
    ["TW", "Taiwan (Province of China)"],
    ["TJ", "Tajikistan"],
    ["TZ", "Tanzania, the United Republic of"],
    ["TH", "Thailand"],
    ["TL", "Timor-Leste"],
    ["TG", "Togo"],
    ["TK", "Tokelau"],
    ["TO", "Tonga"],
    ["TT", "Trinidad and Tobago"],
    ["TN", "Tunisia"],
    ["TR", "Turkey"],
    ["TM", "Turkmenistan"],
    ["TC", "Turks and Caicos Islands (the)"],
    ["TV", "Tuvalu"],
    ["UG", "Uganda"],
    ["UA", "Ukraine"],
    ["AE", "United Arab Emirates (the)"],
    ["GB", "United Kingdom of Great Britain and Northern Ireland (the)"],
    ["US", "United States of America (the)"],
    ["UM", "United States Minor Outlying Islands (the)"],
    ["UY", "Uruguay"],
    ["UZ", "Uzbekistan"],
    ["VU", "Vanuatu"],
    ["VE", "Venezuela (Bolivarian Republic of)"],
    ["VN", "Viet Nam"],
    ["VI", "Virgin Islands (U.S.)"],
    ["WF", "Wallis and Futuna"],
    ["EH", "Western Sahara"],
    ["YE", "Yemen"],
    ["ZM", "Zambia"],
    ["ZW", "Zimbabwe"],
];

const icon = (
    <PhosphorIcon
        icon={userCircleIcon}
        size="large"
        role="img"
        aria-label="User's profile picture"
    />
);

export const allProfilesWithPictures = [
    {
        id: "1",
        name: "John Doe 1",
        email: "john.doe@wonder-blocks.com",
        picture: icon,
    },
    {
        id: "2",
        name: "Jane Doe 1",
        email: "jane.doe@wonder-blocks.com",
        picture: icon,
    },
    {
        id: "3",
        name: "John Smith 1",
        email: "john.smith@wonder-blocks.com",
        picture: icon,
    },
    {
        id: "4",
        name: "Jane Smith 1",
        email: "jane.smith@wonder-blocks.com",
        picture: icon,
    },
    {
        id: "5",
        name: "John Doe 2",
        email: "john.doe@wonder-blocks.com",
        picture: icon,
    },
    {
        id: "6",
        name: "Jane Doe 2",
        email: "jane.doe@wonder-blocks.com",
        picture: icon,
    },
];
