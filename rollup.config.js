import fs from "fs";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";

const createConfig = (pkgName) => ({
    output: {
        file: `packages/${pkgName}/dist/es/index.js`,
        format: "esm",
    },
    input: `packages/${pkgName}/index.js`,
    plugins: [
        babel({
            babelrc: false,
            exclude: "node_modules/**",
            presets: ["react", "flow"],
            plugins: [
                "transform-class-properties", 
                "transform-object-rest-spread",
            ],
        }),      
        autoExternal({
            packagePath: `packages/${pkgName}/package.json`,
        }),
    ],
});

export default fs.readdirSync("packages").map(createConfig);
