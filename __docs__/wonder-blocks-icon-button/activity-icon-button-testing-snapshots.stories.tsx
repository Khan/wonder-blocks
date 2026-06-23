import * as React from "react";
import {action} from "storybook/actions";
import type {Meta, StoryObj} from "@storybook/react-vite";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import calculator from "@phosphor-icons/core/regular/calculator.svg";
import table from "@phosphor-icons/core/regular/table.svg";
import chatCircle from "@phosphor-icons/core/regular/chat-circle.svg";
import speakerHigh from "@phosphor-icons/core/regular/speaker-high.svg";
import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import bookOpen from "@phosphor-icons/core/regular/book-open.svg";
import wrench from "@phosphor-icons/core/regular/wrench.svg";
import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {allThemeModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {longTextWithNoWordBreak} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Icon} from "@khanacademy/wonder-blocks-icon";
import type {PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";
import khanmigoIcon from "./images/mini-khanmigo.svg";
import {StatusBadge} from "@khanacademy/wonder-blocks-badge";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

/**
 * The following stories are used to generate the pseudo states for the
 * ActivityIconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / Testing / Snapshots / ActivityIconButton",
    tags: ["!autodocs", "!manifest"],
    args: {
        "aria-label": "Send",
        icon: paperPlaneIcon,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
} as Meta;

type Story = StoryObj<typeof ActivityIconButton>;

const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
    {name: "Disabled", props: {disabled: true}},
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypes}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <ActivityIconButton
                        {...args}
                        {...props}
                        className={className}
                        key={name}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

const actionTypesWithLabel = [
    {
        name: "Progressive",
        props: {actionType: "progressive", label: "Send"},
    },
    {name: "Neutral", props: {actionType: "neutral", label: "Send"}},
    {name: "Disabled", props: {disabled: true, label: "Send"}},
];

export const StateSheetVisibleLabelStory: Story = {
    name: "StateSheet (Visible Label)",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypesWithLabel}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <ActivityIconButton
                        {...args}
                        {...props}
                        className={className}
                        key={name}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Long label with multiple words",
                props: {
                    children: (
                        <ActivityIconButton
                            label="Send with a very long text"
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Long label with single word in more than two lines",
                props: {
                    children: (
                        <ActivityIconButton
                            label={longTextWithNoWordBreak}
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Long label with single word in same line",
                props: {
                    children: (
                        <ActivityIconButton
                            label="Conversation"
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Horizontally stacked buttons",
                props: {
                    children: (
                        <View
                            style={{
                                flexDirection: "row",
                                background:
                                    semanticColor.core.background.base.subtle,
                                gap: sizing.size_160,
                                padding: sizing.size_160,
                            }}
                        >
                            <ActivityIconButton
                                label="Label"
                                icon={paperPlaneIcon}
                            />
                            <ActivityIconButton
                                icon={paperPlaneIcon}
                                aria-label="Send"
                            />
                        </View>
                    ),
                },
            },
            {
                name: "With custom icon",
                props: {
                    children: (
                        <ActivityIconButton
                            icon={
                                <Icon size="medium">
                                    <img alt="" src={khanmigoIcon} />
                                </Icon>
                            }
                            aria-label="Khanmigo"
                            kind="secondary"
                        />
                    ),
                },
            },
            {
                name: "With custom size + badge",
                props: {
                    children: (
                        <ActivityIconButton
                            icon={
                                <>
                                    <StatusBadge
                                        label="new"
                                        kind="info"
                                        styles={{
                                            root: {
                                                top: sizing.size_0,
                                                right: sizing.size_0,
                                                position: "absolute",
                                                transform:
                                                    "translate(-50%, -50%)",
                                            },
                                        }}
                                    />
                                    <Icon size="large">
                                        <img alt="" src={khanmigoIcon} />
                                    </Icon>
                                </>
                            }
                            label="Cool badge"
                            actionType="neutral"
                            kind="secondary"
                            styles={{
                                root: {
                                    marginBlock: sizing.size_160,
                                },
                                box: {
                                    inlineSize: sizing.size_960,
                                    blockSize: sizing.size_960,
                                },
                            }}
                        />
                    ),
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => props.children}
            </ScenariosLayout>
        );
    },
};

/* -------------------------------------------------------------------------- */
/* International label-fitting matrix (WB-2354)                               */
/* -------------------------------------------------------------------------- */

/**
 * Severity ratings for how likely a translated label is to break the layout,
 * from the i18n team's Tier 1 launch reference (WB-2354 comment 486799):
 *   🟢 ok    ≤7 chars
 *   🟡 warn  8–10 chars
 *   🔴 risk  11+ chars (most likely to wrap/clip)
 */
type Severity = "ok" | "warn" | "risk";

const severityColor: Record<Severity, string> = {
    ok: semanticColor.feedback.success.strong.icon,
    warn: semanticColor.feedback.warning.strong.icon,
    risk: semanticColor.feedback.critical.strong.icon,
};

// Accessible names so severity isn't conveyed by color alone (WCAG 1.4.1).
const severityLabel: Record<Severity, string> = {
    ok: "OK",
    warn: "Warning",
    risk: "Risk",
};

const controls: Array<{key: string; en: string; icon: PhosphorIconAsset}> = [
    {key: "next", en: "Next", icon: caretRight},
    {key: "calculator", en: "Calculator", icon: calculator},
    {key: "finCalculator", en: "Financial Calculator", icon: calculator},
    {key: "periodicTable", en: "Periodic Table", icon: table},
    {key: "chat", en: "Chat", icon: chatCircle},
    {key: "sound", en: "Sound", icon: speakerHigh},
    {key: "draw", en: "Draw", icon: pencilSimple},
    {key: "lesson", en: "Lesson", icon: bookOpen},
    {key: "tools", en: "Tools", icon: wrench},
];

type Cell = {label: string; sev: Severity};

type LocaleRow = {
    name: string;
    /** BCP-47 tag — drives locale-aware hyphenation in the browser. */
    lang: string;
    rtl?: boolean;
    /** One entry per `controls` item, same order. */
    cells: Array<Cell>;
};

/**
 * Real Tier 1 launch strings from WB-2354 comment 486799 (i18n team). Order
 * matches `controls`: Next, Calculator, Financial Calculator, Periodic Table,
 * Chat, Sound, Draw, Lesson, Tools.
 *
 * NOTE from the i18n team: for Indic scripts, character count ≠ render width —
 * conjuncts/diacritics can make short strings visually wider than `.length`
 * suggests. Strings should be verified against Crowdin before production use.
 */
const locales: Array<LocaleRow> = [
    {
        name: "Brazilian Portuguese",
        lang: "pt-BR",
        cells: [
            {label: "Próximo", sev: "warn"},
            {label: "Calculadora", sev: "risk"},
            {label: "Calculadora financeira", sev: "risk"},
            {label: "Tabela periódica", sev: "risk"},
            {label: "Chat", sev: "ok"},
            {label: "Som", sev: "ok"},
            {label: "Desenhar", sev: "warn"},
            {label: "Lição", sev: "ok"},
            {label: "Ferramentas", sev: "risk"},
        ],
    },
    {
        name: "Vietnamese",
        lang: "vi",
        cells: [
            {label: "Tiếp theo", sev: "warn"},
            {label: "Máy tính", sev: "warn"},
            {label: "Máy tính tài chính", sev: "risk"},
            {label: "Bảng tuần hoàn", sev: "risk"},
            {label: "Trò chuyện", sev: "risk"},
            {label: "Âm thanh", sev: "warn"},
            {label: "Vẽ", sev: "ok"},
            {label: "Bài học", sev: "ok"},
            {label: "Công cụ", sev: "ok"},
        ],
    },
    {
        name: "Urdu",
        lang: "ur",
        rtl: true,
        cells: [
            {label: "اگلا", sev: "ok"},
            {label: "کیلکولیٹر", sev: "warn"},
            {label: "مالی کیلکولیٹر", sev: "risk"},
            {label: "دوری جدول", sev: "warn"},
            {label: "چیٹ", sev: "ok"},
            {label: "آواز", sev: "ok"},
            {label: "ڈرا", sev: "ok"},
            {label: "سبق", sev: "ok"},
            {label: "اوزار", sev: "ok"},
        ],
    },
    {
        name: "Sindhi",
        lang: "sd",
        rtl: true,
        cells: [
            {label: "اڳيون", sev: "ok"},
            {label: "حساب مشين", sev: "risk"},
            {label: "مالي حساب مشين", sev: "risk"},
            {label: "دوري جدول", sev: "warn"},
            {label: "گپ", sev: "ok"},
            {label: "آواز", sev: "ok"},
            {label: "ڊرا", sev: "ok"},
            {label: "سبق", sev: "ok"},
            {label: "اوزار", sev: "ok"},
        ],
    },
    {
        name: "Spanish (Chile)",
        lang: "es-CL",
        cells: [
            {label: "Siguiente", sev: "warn"},
            {label: "Calculadora", sev: "risk"},
            {label: "Calculadora financiera", sev: "risk"},
            {label: "Tabla periódica", sev: "risk"},
            {label: "Chat", sev: "ok"},
            {label: "Sonido", sev: "ok"},
            {label: "Dibujar", sev: "ok"},
            {label: "Lección", sev: "ok"},
            {label: "Herramientas", sev: "risk"},
        ],
    },
    {
        name: "Bangla",
        lang: "bn",
        cells: [
            {label: "পরবর্তী", sev: "ok"},
            {label: "ক্যালকুলেটর", sev: "risk"},
            {label: "আর্থিক ক্যালকুলেটর", sev: "risk"},
            {label: "পর্যায় সারণি", sev: "risk"},
            {label: "চ্যাট", sev: "ok"},
            {label: "শব্দ", sev: "ok"},
            {label: "আঁকো", sev: "ok"},
            {label: "পাঠ", sev: "ok"},
            {label: "সরঞ্জাম", sev: "warn"},
        ],
    },
    {
        name: "Hindi",
        lang: "hi",
        cells: [
            {label: "अगला", sev: "ok"},
            {label: "कैलकुलेटर", sev: "risk"},
            {label: "वित्तीय कैलकुलेटर", sev: "risk"},
            {label: "आवर्त सारणी", sev: "risk"},
            {label: "चैट", sev: "ok"},
            {label: "ध्वनि", sev: "ok"},
            {label: "बनाएं", sev: "ok"},
            {label: "पाठ", sev: "ok"},
            {label: "उपकरण", sev: "ok"},
        ],
    },
    {
        name: "Odia",
        lang: "or",
        cells: [
            {label: "ପରବର୍ତ୍ତୀ", sev: "risk"},
            {label: "କ୍ୟାଲ୍କୁଲେଟର", sev: "risk"},
            {label: "ଆର୍ଥିକ କ୍ୟାଲ୍କୁଲେଟର", sev: "risk"},
            {label: "ପର୍ଯ୍ୟାୟ ସାରଣୀ", sev: "risk"},
            {label: "ଚ୍ୟାଟ", sev: "ok"},
            {label: "ଶବ୍ଦ", sev: "ok"},
            {label: "ଆଙ୍କ", sev: "ok"},
            {label: "ପାଠ", sev: "ok"},
            {label: "ଉପକରଣ", sev: "ok"},
        ],
    },
    {
        name: "Marathi",
        lang: "mr",
        cells: [
            {label: "पुढे", sev: "ok"},
            {label: "कॅल्क्युलेटर", sev: "risk"},
            {label: "आर्थिक कॅल्क्युलेटर", sev: "risk"},
            {label: "आवर्त सारणी", sev: "risk"},
            {label: "चॅट", sev: "ok"},
            {label: "ध्वनी", sev: "ok"},
            {label: "काढा", sev: "ok"},
            {label: "धडा", sev: "ok"},
            {label: "साधने", sev: "ok"},
        ],
    },
    {
        name: "Telugu",
        lang: "te",
        cells: [
            {label: "తదుపరి", sev: "ok"},
            {label: "కాల్క్యులేటర్", sev: "risk"},
            {label: "ఆర్థిక కాల్క్యులేటర్", sev: "risk"},
            {label: "ఆవర్తన పట్టిక", sev: "risk"},
            {label: "చాట్", sev: "ok"},
            {label: "శబ్దం", sev: "ok"},
            {label: "గీయి", sev: "ok"},
            {label: "పాఠం", sev: "ok"},
            {label: "సాధనాలు", sev: "warn"},
        ],
    },
    {
        name: "Kannada",
        lang: "kn",
        cells: [
            {label: "ಮುಂದೆ", sev: "ok"},
            {label: "ಕ್ಯಾಲ್ಕುಲೇಟರ್", sev: "risk"},
            {label: "ಹಣಕಾಸು ಕ್ಯಾಲ್ಕುಲೇಟರ್", sev: "risk"},
            {label: "ಆವರ್ತಕ ಕೋಷ್ಟಕ", sev: "risk"},
            {label: "ಚಾಟ್", sev: "ok"},
            {label: "ಶಬ್ದ", sev: "ok"},
            {label: "ಬಿಡಿ", sev: "ok"},
            {label: "ಪಾಠ", sev: "ok"},
            {label: "ಸಾಧನಗಳು", sev: "warn"},
        ],
    },
    {
        name: "Dzongkha",
        lang: "dz",
        cells: [
            {label: "མར་གྱི", sev: "ok"},
            {label: "རྩིས་འཁོར་", sev: "warn"},
            {label: "དངུལ་རྩིས་འཁོར་", sev: "risk"},
            {label: "ཁྱད་ཅན་ཐིག་འཕྲིན།", sev: "risk"},
            {label: "འཕྲིན་བརྒྱུད", sev: "risk"},
            {label: "སྒྲ་", sev: "ok"},
            {label: "རི་མོ་", sev: "ok"},
            {label: "སློབ་ཚན", sev: "ok"},
            {label: "ལག་ཆས", sev: "ok"},
        ],
    },
];

const SeverityDot = ({sev}: {sev: Severity}) => (
    <View
        role="img"
        aria-label={severityLabel[sev]}
        style={{
            inlineSize: sizing.size_080,
            blockSize: sizing.size_080,
            borderRadius: "50%",
            backgroundColor: severityColor[sev],
            // A contrasting ring guarantees the mark is perceivable against any
            // page/theme background, meeting non-text contrast (WCAG 1.4.11)
            // even where the saturated fill alone wouldn't.
            border: `${border.width.thin} solid ${semanticColor.core.border.neutral.strong}`,
        }}
    />
);

const Legend = () => (
    <View
        style={{
            flexDirection: "row",
            gap: sizing.size_160,
            alignItems: "center",
        }}
    >
        {(
            [
                ["ok", "≤7 chars"],
                ["warn", "8–10 chars"],
                ["risk", "11+ chars (most likely to wrap)"],
            ] as Array<[Severity, string]>
        ).map(([sev, text]) => (
            <View
                key={sev}
                style={{
                    flexDirection: "row",
                    gap: sizing.size_040,
                    alignItems: "center",
                }}
            >
                <SeverityDot sev={sev} />
                <BodyText size="xsmall">{text}</BodyText>
            </View>
        ))}
    </View>
);

const LabelCell = ({
    cell,
    lang,
    rtl,
    icon,
}: {
    cell: Cell;
    lang: string;
    rtl?: boolean;
    icon: PhosphorIconAsset;
}) => (
    // `lang` enables locale-aware hyphenation; `dir` handles RTL scripts.
    <View
        lang={lang}
        dir={rtl ? "rtl" : undefined}
        style={{
            inlineSize: sizing.size_960,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: sizing.size_040,
            paddingBlock: sizing.size_080,
        }}
    >
        <ActivityIconButton
            icon={icon}
            label={cell.label}
            onClick={() => {}}
            // The button root sets `alignSelf: flex-start`; override it so the
            // button centers within its (centered) cell.
            styles={{root: {alignSelf: "center"}}}
        />
        <SeverityDot sev={cell.sev} />
    </View>
);

/**
 * Renders the real Tier 1 (international launch) translation reference set
 * across every Classroom-tools control, so we can confirm the component's
 * label-fitting behavior (Body/Small + locale-aware hyphenation, see WB-2354)
 * keeps even the highest-risk strings within two lines without clipping. The
 * severity dots flag strings the i18n team rated most likely to break.
 *
 * Captured in a single theme (ThunderBlocks, where this button is used in the
 * Classroom tools panel) — label fitting is layout, not theming, so the extra
 * theme snapshots aren't worth the Chromatic cost for this wide matrix.
 */
export const LabelFittingLocaleMatrix: Story = {
    name: "Label Fitting (Locale Matrix)",
    render: () => (
        <View style={{padding: sizing.size_160, gap: sizing.size_160}}>
            <Legend />
            <View style={{overflowX: "auto"}}>
                {/* Column headers */}
                <View style={{flexDirection: "row", gap: sizing.size_080}}>
                    <View style={{inlineSize: 150}} />
                    {controls.map((control) => (
                        <View
                            key={control.key}
                            style={{
                                inlineSize: sizing.size_960,
                                alignItems: "center",
                            }}
                        >
                            <BodyText size="xsmall" weight="bold">
                                {control.en}
                            </BodyText>
                        </View>
                    ))}
                </View>

                {locales.map((locale) => (
                    <View
                        key={locale.name}
                        style={{
                            flexDirection: "row",
                            gap: sizing.size_080,
                            alignItems: "flex-start",
                            borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
                        }}
                    >
                        <View
                            style={{
                                inlineSize: 150,
                                paddingBlockStart: sizing.size_160,
                                gap: sizing.size_020,
                            }}
                        >
                            <BodyText size="small" weight="semi">
                                {locale.name}
                            </BodyText>
                            <BodyText
                                size="xsmall"
                                style={{
                                    color: semanticColor.core.foreground.neutral
                                        .subtle,
                                }}
                            >
                                [{locale.lang}]{locale.rtl ? " · RTL" : ""}
                            </BodyText>
                        </View>
                        {locale.cells.map((cell, i) => (
                            <LabelCell
                                key={controls[i].key}
                                cell={cell}
                                lang={locale.lang}
                                rtl={locale.rtl}
                                icon={controls[i].icon}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    ),
    parameters: {
        // This is a wide matrix; let it scroll rather than clip.
        layout: "fullscreen",
        // Label fitting is layout, not theming — one snapshot is enough.
        chromatic: {
            modes: {
                thunderblocks: allThemeModes.thunderblocks,
            },
        },
    },
};
