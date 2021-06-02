// @flow
import * as React from "react";

import type {StoryComponentType} from "@storybook/react";
import {StyleSheet, css} from "aphrodite";
import {TypeCategory, TypeSize, Typeface, textStyle, Text} from "./text.js";

export default {
    title: "Text",
};

const typeSizeWidths = {
    xxxLarge: 768,
    xxLarge: 640,
    xLarge: 600,
    large: 512,
    medium: 360,
    small: 300,
    xSmall: 300,
};

// See also: https://docs.google.com/spreadsheets/d/1a6NQn5ylp9dLA1UL9bWzBMiWvWlH_0Wt2eTiSm3MeTQ/edit#gid=0
const strings = {
    vi: {
        name: "Vietnamese",
        headingText: "Mọi đứa trẻ đều xứng đáng có cơ hội được học.",
        compactHeadingText: "Cùng chúng tôi tạo nên sự khác biệt",
        labelText: "Trao cho trẻ em cơ hội",
        statementText:
            "Trên toàn cầu, 617 triệu trẻ em không có kiến thức về toán cơ bản và kĩ năng đọc hiểu. Bạn có thể thay đổi cả cuộc đời của một đứa trẻ.",
        paragraphText:
            "Trên toàn cầu, 617 triệu trẻ em không có kiến thức về toán cơ bản và kĩ năng đọc hiểu. Bạn có thể thay đổi cả cuộc đời của một đứa trẻ.",
    },
    th: {
        name: "Thai",
        headingText: "เด็กทุกคน ควรได้รับโอกาสในการเรียนรู้",
        compactHeadingText: "รวมกันเราสามารถสร้างความแตกต่างได้",
        labelText: "ให้โอกาสพวกเขา",
        statementText:
            "เด็กๆ 617 ล้านคนขาดทักษะคณิตและการอ่านพื้นฐานทั่วโลก คุณสามารถเปลี่ยนชะตาชีวิตของเด็กหนึ่งคนได้",
        paragraphText:
            "เด็กๆ 617 ล้านคนขาดทักษะคณิตและการอ่านพื้นฐานทั่วโลก คุณสามารถเปลี่ยนชะตาชีวิตของเด็กหนึ่งคนได้",
    },
    tr: {
        name: "Turkish",
        headingText: "Her çocuğun öğrenmeye hakkı var.",
        compactHeadingText: "Bi̇rli̇kte fark yaratabi̇li̇ri̇z",
        labelText: "Onlara şans verin",
        statementText:
            "Dünya çapında 617 milyon çocuk temel matematik ve okuma becerilerinden yoksun. Bir çocuğun hayatını değiştirebilirsiniz.",
        paragraphText:
            "Dünya çapında 617 milyon çocuk temel matematik ve okuma becerilerinden yoksun. Bir çocuğun hayatını değiştirebilirsiniz.",
    },
    es: {
        name: "Spanish",
        headingText:
            "Todos las niños y niñas merecen la oportunidad para aprender.",
        compactHeadingText: "Juntos podemos hacer la diferencia",
        labelText: "Dales la oportunidad",
        statementText:
            "En todo el mundo, 617 millones de niños carecen de habilidades básicas en matemáticas y lectura. Tú puedes cambiar el curso de la vida de un niño.",
        paragraphText:
            "En todo el mundo, 617 millones de niños carecen de habilidades básicas en matemáticas y lectura. Tú puedes cambiar el curso de la vida de un niño.",
    },
    sr: {
        name: "Serbian",
        headingText: "Свако дете заслужује прилику да учи.",
        compactHeadingText: "Заједно можемо направити промену",
        labelText: "Дајте им прилику",
        statementText:
            "Широм света, 617 милиона деце не поседује основнe математичке вештине или вештине читања. Можете променити живот детету.",
        paragraphText:
            "Широм света, 617 милиона деце не поседује основнe математичке вештине или вештине читања. Можете променити живот детету.",
    },
    pt: {
        name: "Portuguese",
        headingText: "Toda criança merece a oportunidade de aprender.",
        compactHeadingText: "Juntos podemos fazer a diferença",
        labelText: "Dê uma chance às crianças",
        statementText:
            "No mundo todo, 617 milhões de crianças não têm as habilidades básicas de matemática e interpretação de texto. Você pode mudar o rumo da vida de uma delas.",
        paragraphText:
            "No mundo todo, 617 milhões de crianças não têm as habilidades básicas de matemática e interpretação de texto. Você pode mudar o rumo da vida de uma delas.",
    },
    ps: {
        name: "Polish",
        headingText: "Każde dziecko musi mieć szansę, by się uczyć.",
        compactHeadingText: "Razem możemy wiele zmienić",
        labelText: "Stwórz im szansę",
        statementText:
            "Szacuje się, że na świecie 617 milionów dzieci nie ma warunków, by opanować podstawowe umiejętności czytania, pisania i liczenia. Ty, tak, właśnie Ty, możesz zmienić życie jednego z tych dzieciaków.",
        paragraphText:
            "Szacuje się, że na świecie 617 milionów dzieci nie ma warunków, by opanować podstawowe umiejętności czytania, pisania i liczenia. Ty, tak, właśnie Ty, możesz zmienić życie jednego z tych dzieciaków.",
    },
    ko: {
        name: "Korean",
        headingText: "모든 아이들은 배울 수 있는 기회를 가져야 합니다.",
        compactHeadingText: "우리가 같이 변화를 만들어 낼 수 있습니다",
        labelText: "어린이들에게 배움의 기회를 주세요",
        statementText:
            "전 세계의 6억 1700만 어린이들이 기초적인 수학과 읽기에 대한 배움의기회를 얻지 못하고 있습니다. 이러한 어린이들의 삶을 여러분이 바꿀 수 있습니다.",
        paragraphText:
            "전 세계의 6억 1700만 어린이들이 기초적인 수학과 읽기에 대한 배움의기회를 얻지 못하고 있습니다. 이러한 어린이들의 삶을 여러분이 바꿀 수 있습니다.",
    },
    de: {
        name: "German",
        headingText: "Jedes Kind verdient die Chance zu lernen.",
        compactHeadingText: "Zusammen können wir einen unterschied machen",
        labelText: "Gib ihnen die Chance",
        statementText:
            "Auf der ganzen Welt fehlen bei 617 Millionen Kinder grundlegende Mathematikkenntnisse und Lesefähigkeiten. Du kannst den Lebensverlauf eines Kindes ändern.",
        paragraphText:
            "Auf der ganzen Welt fehlen bei 617 Millionen Kinder grundlegende Mathematikkenntnisse und Lesefähigkeiten. Du kannst den Lebensverlauf eines Kindes ändern.",
    },
    ka: {
        name: "Georgian",
        headingText: "თითოეული ბავშვი იმსახურებს სწავლის შანსს.",
        compactHeadingText: "ერთად დიდ წარმატებას მივაღწევთ",
        labelText: "მიეცით მათ შანსი",
        statementText:
            "მთელ მსოფლიოში 617 მილიონ ბავშვს არ აქვს მათემატიკისა და კითხვის საბაზისო უნარები. თქვენ შეგიძლიათ, შეცვალოთ ბავშვის ცხოვრების გეზი.",
        paragraphText:
            "მთელ მსოფლიოში 617 მილიონ ბავშვს არ აქვს მათემატიკისა და კითხვის საბაზისო უნარები. თქვენ შეგიძლიათ, შეცვალოთ ბავშვის ცხოვრების გეზი.",
    },
    fr: {
        name: "French",
        headingText: "Chaque enfant a le droit d'apprendre.",
        compactHeadingText: "Ensemble nous pouvons faire une différence",
        labelText: "Donnez-leur une chance",
        statementText:
            "A travers le monde, 617 millions d'enfants manquent de compétences de base en mathématiques et en lecture. Vous pouvez changer le cours de la vie d’un enfant.",
        paragraphText:
            "A travers le monde, 617 millions d'enfants manquent de compétences de base en mathématiques et en lecture. Vous pouvez changer le cours de la vie d’un enfant.",
    },
    da: {
        name: "Danish",
        headingText: "Ethvert barn fortjener muligheden for at lære.",
        compactHeadingText: "Sammen kan vi gøre en forskel",
        labelText: "Giv dem en chance",
        statementText:
            "På verdensplan mangler 617 millioner børn basale matematik- og læseegenskaber. Du kan ændre et barns liv.",
        paragraphText:
            "På verdensplan mangler 617 millioner børn basale matematik- og læseegenskaber. Du kan ændre et barns liv.",
    },
    cs: {
        name: "Czech",
        headingText: "Každé dítě má právo na kvalitní vzdělání.",
        compactHeadingText: "Společně můžeme dokázat mnohé",
        labelText: "Dejte jim šanci",
        statementText:
            "Na celém světě je 617 miliónů dětí, kterým chybí základní matematické a čtenářské dovednosti. Můžete pomoci to změnit.",
        paragraphText:
            "Na celém světě je 617 miliónů dětí, kterým chybí základní matematické a čtenářské dovednosti. Můžete pomoci to změnit.",
    },
    "zh-hans": {
        name: "Simplified Chinese",
        headingText: "每个孩子都应该获得学习的机会。",
        compactHeadingText: "一起来改变这个社会",
        labelText: "给予他们一个学习的机会",
        statementText:
            "全球约有 6.17 亿儿童缺少基本的数学和阅读技能。你可以改变他们的未来。",
        paragraphText:
            "全球约有 6.17 亿儿童缺少基本的数学和阅读技能。你可以改变他们的未来。",
    },
    bg: {
        name: "Bulgarian",
        headingText: "Всяко дете заслужава възможността да учи.",
        compactHeadingText: "Заедно можем да променим света",
        labelText: "Предостави им тази възможност",
        statementText:
            "617 милиона деца по света не могат да смятат и да четат. Можеш да промениш посоката, в която ще поеме техният живот.",
        paragraphText:
            "617 милиона деца по света не могат да смятат и да четат. Можеш да промениш посоката, в която ще поеме техният живот.",
    },
    bn: {
        name: "Bengali",
        headingText: "প্রতিটি শিশুরই শেখার সুযোগ পাওয়ার অধিকার রয়েছে।",
        compactHeadingText:
            "আমরা সবাই মিলে একসাথে একটি পরিবর্তনের সূচনা করতে পারি।",
        labelText: "তাদের সেই সুযোগটি দাও",
        statementText:
            "বিশ্বজুড়ে, 617 মিলিয়ন শিশুর প্রারম্ভিক গণিত এবং পঠন দক্ষতা নেই। তুমিই পার একজন শিশুর জীবনের ধারা বদলে দিতে।",
        paragraphText:
            "বিশ্বজুড়ে, 617 মিলিয়ন শিশুর প্রারম্ভিক গণিত এবং পঠন দক্ষতা নেই। তুমিই পার একজন শিশুর জীবনের ধারা বদলে দিতে।",
    },
    hy: {
        name: "Armenian",
        headingText: "Ցանկացած երեխա արժանի է սովորելու։",
        compactHeadingText: "Միասին կարող ենք հասնել փոփոխությունների",
        labelText: "Հնարավորություն ընձեռիր նրանց",
        statementText:
            "Ամբողջ աշխարհում շուրջ 617 միլիոն երեխա չունի տարրական հմտություններ մաթեմատիկայի և ընթերցանության ոլորտում։ Դու կարող ես փոխել այդ երեխաների կյանքի ընթացքը։",
        paragraphText:
            "Ամբողջ աշխարհում շուրջ 617 միլիոն երեխա չունի տարրական հմտություններ մաթեմատիկայի և ընթերցանության ոլորտում։ Դու կարող ես փոխել այդ երեխաների կյանքի ընթացքը։",
    },
    ar: {
        name: "Arabic",
        headingText: "كل طفل يستحق الفرصة للتعلم. ",
        compactHeadingText: "نحن نضع حداً زمنياً",
        labelText: "إعطائهم الفرصة",
        statementText:
            "في جميع أنحاء العالم، يفتقر 617 مليون طفل إلى مهارات الرياضيات والقراءة. يمكنك تغيير مسار حياة الطفل.",
        paragraphText:
            "في جميع أنحاء العالم، يفتقر 617 مليون طفل إلى مهارات الرياضيات والقراءة. يمكنك تغيير مسار حياة الطفل.",
    },
    en: {
        // The reference language
        name: "English",
        headingText: "Every child deserves the chance to learn.",
        compactHeadingText: "Together we can make a difference",
        labelText: "Give them the chance",
        statementText:
            "Across the globe, 617 million children are missing basic math and reading skills. We’re a nonprofit delivering the education they need, and we need your help. You can change the course of a child’s life.",
        paragraphText:
            "Across the globe, 617 million children are missing basic math and reading skills. We’re a nonprofit delivering the education they need, and we need your help. You can change the course of a child’s life.",
    },
};

const languages = {};
Object.keys(strings)
    .sort()
    .forEach((key) => {
        const name = strings[key].name;
        const k = `${key} (${name})`;
        const v = key;
        languages[k] = v;
    });

const sharedStyles = StyleSheet.create({
    ul: {},
});

function String(props: TextProps): React.Node {
    const {children, tag, style, width, language} = props;

    const styles = StyleSheet.create({
        li: {
            listStyleType: "none",
            marginTop: 32,
            ":first-child": {
                marginTop: 0,
            },
            width: width,
        },
        label: {
            ...textStyle(TypeCategory.Label, TypeSize.XSmall, Typeface.Sans),
            color: "#ff0088",
            margin: 0,
        },
    });

    return (
        <li className={css(styles.li)}>
            <label className={css(styles.label)}>{language}</label>
            <Text tag={tag} style={style}>
                {children}
            </Text>
        </li>
    );
}

export const serifHeading: StoryComponentType = () => {
    const sizes = [
        TypeSize.XXXLarge,
        TypeSize.XXLarge,
        TypeSize.XLarge,
        TypeSize.Large,
        TypeSize.Medium,
        TypeSize.Small,
        TypeSize.XSmall,
    ];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(
                                        TypeCategory.Heading,
                                        size,
                                        Typeface.Serif,
                                    ),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].headingText}
                        </String>
                    )),
                )}
        </ul>
    );
};

export const sansHeading: StoryComponentType = () => {
    const sizes = [
        TypeSize.XXXLarge,
        TypeSize.XXLarge,
        TypeSize.XLarge,
        TypeSize.Large,
        TypeSize.Medium,
        TypeSize.Small,
        TypeSize.XSmall,
    ];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(
                                        TypeCategory.Heading,
                                        size,
                                        Typeface.Sans,
                                    ),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].headingText}
                        </String>
                    )),
                )}
        </ul>
    );
};

export const compactHeading: StoryComponentType = () => {
    const sizes = [
        TypeSize.XLarge,
        TypeSize.Large,
        TypeSize.Medium,
        TypeSize.Small,
    ];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(
                                        TypeCategory.CompactHeading,
                                        size,
                                    ),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].compactHeadingText}
                        </String>
                    )),
                )}
        </ul>
    );
};

export const label: StoryComponentType = () => {
    const sizes = [
        TypeSize.XLarge,
        TypeSize.Large,
        TypeSize.Medium,
        TypeSize.Small,
        TypeSize.XSmall,
    ];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(TypeCategory.Label, size),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].labelText}
                        </String>
                    )),
                )}
        </ul>
    );
};

export const statement: StoryComponentType = () => {
    const sizes = [TypeSize.XLarge, TypeSize.Large, TypeSize.Medium];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(
                                        TypeCategory.Statement,
                                        size,
                                    ),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].statementText}
                        </String>
                    )),
                )}
        </ul>
    );
};

export const paragraph: StoryComponentType = () => {
    const sizes = [
        TypeSize.XLarge,
        TypeSize.Large,
        TypeSize.Medium,
        TypeSize.Small,
        TypeSize.XSmall,
    ];

    return (
        <ul className={css(sharedStyles.ul)}>
            {Object.values(languages)
                .sort()
                .map((lCode, i) =>
                    sizes.map((size, i) => (
                        <String
                            key={i}
                            style={
                                StyleSheet.create({
                                    string: textStyle(
                                        TypeCategory.Paragraph,
                                        size,
                                    ),
                                })["string"]
                            }
                            tag="h1"
                            width={typeSizeWidths[size]}
                            language={`${strings[lCode].name} - ${size}`}
                        >
                            {strings[lCode].paragraphText}
                        </String>
                    )),
                )}
        </ul>
    );
};
