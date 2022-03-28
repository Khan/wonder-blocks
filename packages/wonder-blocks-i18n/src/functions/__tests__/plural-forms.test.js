// @flow
import {allPluralForms, likeFrench} from "../plural-forms.js";

describe("allPluralForms", () => {
    describe("likeFrench", () => {
        test.each`
            number | form
            ${0}   | ${false}
            ${1}   | ${false}
            ${2}   | ${true}
            ${100} | ${true}
        `("likeFrench($number) = $form", ({number, form}) => {
            expect(likeFrench(number)).toEqual(form);
        });
    });

    describe("ar", () => {
        test.each`
            number  | form
            ${0}    | ${0}
            ${1}    | ${1}
            ${2}    | ${2}
            ${404}  | ${3}
            ${1259} | ${4}
            ${501}  | ${5}
        `("allPluralForms.ar($number) = $form", ({number, form}) => {
            expect(allPluralForms.ar(number)).toEqual(form);
        });
    });

    describe("cs", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${3}   | ${1}
            ${0}   | ${2}
            ${5}   | ${2}
        `("allPluralForms.cs($number) = $form", ({number, form}) => {
            expect(allPluralForms.cs(number)).toEqual(form);
        });
    });

    describe("hr", () => {
        test.each`
            number | form
            ${21}  | ${0}
            ${22}  | ${1}
            ${20}  | ${2}
            ${25}  | ${2}
        `("allPluralForms.hr($number) = $form", ({number, form}) => {
            expect(allPluralForms.hr(number)).toEqual(form);
        });
    });

    describe("lt", () => {
        test.each`
            number | form
            ${21}  | ${0}
            ${22}  | ${1}
            ${25}  | ${1}
            ${20}  | ${2}
        `("allPluralForms.lt($number) = $form", ({number, form}) => {
            expect(allPluralForms.lt(number)).toEqual(form);
        });
    });

    describe("lv", () => {
        test.each`
            number | form
            ${0}   | ${0}
            ${21}  | ${1}
            ${31}  | ${1}
            ${11}  | ${2}
            ${111} | ${2}
        `("allPluralForms.lv($number) = $form", ({number, form}) => {
            expect(allPluralForms.lv(number)).toEqual(form);
        });
    });

    describe("pl", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${3}   | ${1}
            ${23}  | ${1}
            ${33}  | ${1}
            ${13}  | ${2}
        `("allPluralForms.pl($number) = $form", ({number, form}) => {
            expect(allPluralForms.pl(number)).toEqual(form);
        });
    });

    describe("ro", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${16}  | ${1}
            ${216} | ${1}
            ${21}  | ${2}
            ${221} | ${2}
        `("allPluralForms.ro($number) = $form", ({number, form}) => {
            expect(allPluralForms.ro(number)).toEqual(form);
        });
    });

    describe("ru", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${101} | ${0}
            ${3}   | ${1}
            ${23}  | ${1}
            ${13}  | ${2}
            ${11}  | ${2}
        `("allPluralForms.ru($number) = $form", ({number, form}) => {
            expect(allPluralForms.ru(number)).toEqual(form);
        });
    });

    describe("sk", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${3}   | ${1}
            ${5}   | ${2}
            ${10}  | ${2}
            ${100} | ${2}
        `("allPluralForms.sk($number) = $form", ({number, form}) => {
            expect(allPluralForms.sk(number)).toEqual(form);
        });
    });

    // NOTE: Serbian plurals are the same as Russian plurals
    describe("sr", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${101} | ${0}
            ${3}   | ${1}
            ${23}  | ${1}
            ${13}  | ${2}
            ${11}  | ${2}
        `("allPluralForms.sr($number) = $form", ({number, form}) => {
            expect(allPluralForms.sr(number)).toEqual(form);
        });
    });

    // NOTE: Ukranian plurals are the same as Russian plurals
    describe("uk", () => {
        test.each`
            number | form
            ${1}   | ${0}
            ${101} | ${0}
            ${3}   | ${1}
            ${23}  | ${1}
            ${13}  | ${2}
            ${11}  | ${2}
        `("allPluralForms.uk($number) = $form", ({number, form}) => {
            expect(allPluralForms.uk(number)).toEqual(form);
        });
    });
});
