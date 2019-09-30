const util = require("./util");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss-modules").default;

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
    plugins: [
        "@babel/transform-react-jsx",
        [
            "import",
            { libraryName: "antd", libraryDirectory: "lib", style: "css" }
        ]
    ]
};

module.exports = {
    input: util.resolve("src/index.jsx"),
    plugins: [
        postcss(),
        babel(babelOptions),
        nodeResolve({
            extensions,
            customResolveOptions: {
                moduleDirectory: "antd"
            }
        }),
        commonjs({ extensions })
    ],
    external: [
        "schema-verify",
        "react",
        "antd",
        "react-transition-group",
        "classnames",
        "moment"
    ]
};
