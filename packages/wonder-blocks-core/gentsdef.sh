#!/usr/bin/env bash
# TODO: figure out why writing this as script in package.json doesn't work
# My hunch is that it has to do with where tsconfig.json is located
tsc --emitDeclarationOnly --declaration --declarationDir dist --allowSyntheticDefaultImports --downlevelIteration --jsx react --lib ES2018,DOM index.ts
