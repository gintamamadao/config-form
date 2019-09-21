const util = require("./util");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelOptions = {
    extensions,
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false
            }
        ]
    ],
    plugins: ["@babel/transform-react-jsx"]
};

module.exports = {
    input: util.resolve("src/index.jsx"),
    plugins: [
        babel(babelOptions),
        nodeResolve({ extensions }),
        commonjs({ extensions, ignore: ["conditional-runtime-dependency"] })
    ],
    external: ["schema-verify", "react", "antd"]
};
