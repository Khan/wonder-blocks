// Adapted from https://typescript-eslint.io/packages/rule-tester/#vitest
import {afterAll, it, describe} from "@jest/globals";
import {RuleTester} from "@typescript-eslint/rule-tester";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
