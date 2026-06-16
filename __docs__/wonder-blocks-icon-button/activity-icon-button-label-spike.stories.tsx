import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react-vite";

import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import calculator from "@phosphor-icons/core/regular/calculator.svg";
import table from "@phosphor-icons/core/regular/table.svg";
import chatCircle from "@phosphor-icons/core/regular/chat-circle.svg";
import speakerHigh from "@phosphor-icons/core/regular/speaker-high.svg";
import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import bookOpen from "@phosphor-icons/core/regular/book-open.svg";
import wrench from "@phosphor-icons/core/regular/wrench.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import type {PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * SPIKE (WB-2354): exploring solutions for `ActivityIconButton` text labels
 * that don't fit in the limited width of the Classroom tools panel for
 * International markets launching July 6.
 *
 * This file is a temporary spike artifact used to compare label-fitting
 * techniques visually (in Storybook + Chromatic). It is NOT part of the public
 * docs/manifest and is expected to be removed once we pick an approach and
 * implement it in `activity-icon-button.tsx`.
 *
 * The strings below are the REAL Tier 1 (July 6 launch) translation reference
 * provided by the Internationalization team in WB-2354
 * (https://khanacademy.atlassian.net/browse/WB-2354?focusedCommentId=486799).
 *
 * Severity ratings come directly from that comment:
 *   🟢 ok    ≤7 chars
 *   🟡 warn  8–10 chars
 *   🔴 risk  11+ chars (likely breaks layout)
 *
 * NOTE from the i18n team: for Indic scripts, character count ≠ render width —
 * conjuncts/diacritics can make short strings visually wider than `.length`
 * suggests. Strings should be verified against Crowdin before production use.
 *
 * The techniques here are applied via the `styles.label` prop so we can compare
 * them WITHOUT changing the component yet. The "Body / Small" override mirrors
 * `BodyText size="small"` exactly (`font.body.size.small` +
 * `font.body.lineHeight.small`).
 */
export default {
    title: "Packages / IconButton / Testing / Spikes / ActivityIconButton Label Fitting",
    component: ActivityIconButton,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        // This is a wide matrix; let it scroll rather than clip.
        layout: "fullscreen",
    },
} as Meta<typeof ActivityIconButton>;

type Story = StoryObj<typeof ActivityIconButton>;

type Severity = "ok" | "warn" | "risk";

const severityColor: Record<Severity, string> = {
    ok: semanticColor.status.success.foreground,
    warn: semanticColor.status.warning.foreground,
    risk: semanticColor.status.critical.foreground,
};

/**
 * The control labels referenced by the i18n team, in the comment's column
 * order. Icons are best-effort matches — the label fit is what matters here.
 */
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

type Locale = {
    name: string;
    /** BCP-47 tag — drives locale-aware hyphenation in the browser. */
    lang: string;
    rtl?: boolean;
    /** One entry per `controls` item, same order. */
    cells: Array<Cell>;
};

/**
 * Real launch strings from WB-2354 comment 486799 (Carolina Salazar, i18n).
 * Order matches `controls`: Next, Calculator, Financial Calculator,
 * Periodic Table, Chat, Sound, Draw, Lesson, Tools.
 */
const locales: Array<Locale> = [
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

/* -------------------------------------------------------------------------- */
/* Label-fitting techniques (applied via `styles.label`)                      */
/* -------------------------------------------------------------------------- */

type Technique = {
    name: string;
    description: string;
    labelStyle?: StyleType;
};

// Mirrors BodyText size="small".
const bodySmall = {
    fontSize: font.body.size.small,
    lineHeight: font.body.lineHeight.small,
} as const;

// Prefer hyphenation, fall back to breaking long words so nothing overflows.
const hyphenate = {
    hyphens: "auto",
    overflowWrap: "break-word",
    // The component currently sets `wordBreak: "break-word"`, which forces a
    // hard break before hyphenation can kick in. Reset it so hyphens win.
    wordBreak: "normal",
} as const;

const techniques: Array<Technique> = [
    {
        name: "Baseline (current)",
        description:
            "Body/Medium, word-break, 2-line clamp + overflow hidden (truncates).",
        labelStyle: undefined,
    },
    {
        name: "+ Hyphenation",
        description: "Body/Medium with hyphens: auto.",
        labelStyle: hyphenate,
    },
    {
        name: "Body / Small",
        description: "Smaller font, current break behavior.",
        labelStyle: bodySmall,
    },
    {
        name: "Small + Hyphenation (candidate)",
        description: "Body/Small with hyphens: auto.",
        labelStyle: {...bodySmall, ...hyphenate},
    },
];

const candidate = techniques[techniques.length - 1];

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

const SeverityDot = ({sev}: {sev: Severity}) => (
    <View
        aria-hidden={true}
        style={{
            inlineSize: sizing.size_080,
            blockSize: sizing.size_080,
            borderRadius: "50%",
            backgroundColor: severityColor[sev],
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
                ["risk", "11+ chars (likely breaks)"],
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

const ButtonCell = ({
    cell,
    lang,
    rtl,
    icon,
    labelStyle,
    width = 96,
}: {
    cell: Cell;
    lang: string;
    rtl?: boolean;
    icon: PhosphorIconAsset;
    labelStyle?: StyleType;
    width?: number;
}) => (
    // `lang` enables locale-aware hyphenation; `dir` handles RTL scripts.
    <div
        lang={lang}
        dir={rtl ? "rtl" : undefined}
        style={{
            inlineSize: width,
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
            styles={{
                root: {alignSelf: "center"},
                ...(labelStyle ? {label: labelStyle} : {}),
            }}
        />
        <SeverityDot sev={cell.sev} />
    </div>
);

/* -------------------------------------------------------------------------- */
/* Stories                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The full Tier 1 launch matrix (every locale × every control) rendered with
 * the **candidate** technique (Body/Small + hyphenation). This is the realistic
 * "does the launch set fit?" view. Scan for any label that still wraps past two
 * lines or clips — those are the ones we can't ship.
 */
export const LaunchLocaleMatrix: Story = {
    render: () => (
        <View style={{padding: sizing.size_160, gap: sizing.size_160}}>
            <BodyText size="medium" weight="bold">
                {`Tier 1 launch strings — candidate technique: ${candidate.name}`}
            </BodyText>
            <Legend />
            <View style={{overflowX: "auto"}}>
                {/* Column headers */}
                <View style={{flexDirection: "row", gap: sizing.size_080}}>
                    <View style={{inlineSize: 150}} />
                    {controls.map((control) => (
                        <View
                            key={control.key}
                            style={{inlineSize: 96, alignItems: "center"}}
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
                            borderBlockStart: `1px solid ${semanticColor.core.border.neutral.subtle}`,
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
                            <ButtonCell
                                key={controls[i].key}
                                cell={cell}
                                lang={locale.lang}
                                rtl={locale.rtl}
                                icon={controls[i].icon}
                                labelStyle={candidate.labelStyle}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    ),
};

/**
 * The worst offenders (🔴) from the launch set, compared across all four
 * techniques so we can see which one keeps them within two lines without
 * truncation. "Financial Calculator" and "Periodic Table" are 🔴 in virtually
 * every language; "Calculator" is 🔴 in most Indic/Romance languages. These
 * rows span Latin, Indic, Vietnamese, and RTL scripts.
 */
const worstCases: Array<{locale: Locale; controlIndex: number}> = [
    {locale: locales[0], controlIndex: 2}, // pt-BR "Calculadora financeira"
    {locale: locales[4], controlIndex: 3}, // es-CL "Tabla periódica"
    {locale: locales[1], controlIndex: 2}, // vi "Máy tính tài chính"
    {locale: locales[5], controlIndex: 2}, // bn "আর্থিক ক্যালকুলেটর"
    {locale: locales[6], controlIndex: 1}, // hi "कैलकुलेटर"
    {locale: locales[10], controlIndex: 2}, // kn "ಹಣಕಾಸು ಕ್ಯಾಲ್ಕುಲೇಟರ್"
    {locale: locales[2], controlIndex: 2}, // ur (RTL) "مالی کیلکولیٹر"
    {locale: locales[3], controlIndex: 1}, // sd (RTL) "حساب مشين"
];

export const TechniqueComparison: Story = {
    render: () => (
        <View style={{padding: sizing.size_160, gap: sizing.size_160}}>
            <BodyText size="medium" weight="bold">
                Highest-risk launch strings × techniques
            </BodyText>
            {/* Column headers */}
            <View style={{flexDirection: "row", gap: sizing.size_080}}>
                <View style={{inlineSize: 180}}>
                    <BodyText size="small" weight="bold">
                        String / locale
                    </BodyText>
                </View>
                {techniques.map((technique) => (
                    <View
                        key={technique.name}
                        style={{inlineSize: 140, gap: sizing.size_040}}
                    >
                        <BodyText size="small" weight="bold">
                            {technique.name}
                        </BodyText>
                        <BodyText
                            size="xsmall"
                            style={{
                                color: semanticColor.core.foreground.neutral
                                    .subtle,
                            }}
                        >
                            {technique.description}
                        </BodyText>
                    </View>
                ))}
            </View>

            {worstCases.map(({locale, controlIndex}) => {
                const cell = locale.cells[controlIndex];
                const control = controls[controlIndex];
                return (
                    <View
                        key={`${locale.lang}-${control.key}`}
                        style={{
                            flexDirection: "row",
                            gap: sizing.size_080,
                            alignItems: "flex-start",
                            borderBlockStart: `1px solid ${semanticColor.core.border.neutral.subtle}`,
                            paddingBlockStart: sizing.size_080,
                        }}
                    >
                        <View style={{inlineSize: 180, gap: sizing.size_020}}>
                            <BodyText size="small" weight="semi">
                                “{cell.label}”
                            </BodyText>
                            <BodyText
                                size="xsmall"
                                style={{
                                    color: semanticColor.core.foreground.neutral
                                        .subtle,
                                }}
                            >
                                {control.en} · [{locale.lang}]
                                {locale.rtl ? " · RTL" : ""}
                            </BodyText>
                        </View>
                        {techniques.map((technique) => (
                            <ButtonCell
                                key={technique.name}
                                cell={cell}
                                lang={locale.lang}
                                rtl={locale.rtl}
                                icon={control.icon}
                                labelStyle={technique.labelStyle}
                                width={140}
                            />
                        ))}
                    </View>
                );
            })}
        </View>
    ),
};
