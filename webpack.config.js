const path = require("path");

module.exports = {
    entry: {
        powerGuages: "./src/powerGauges.js",
        internetGauges: "./src/internetGauges.js", // Add another entry file
    },
    output: {
        path: path.resolve("scripts", "bundles"),
        filename: "[name].bundle.js", // Generates powerGuages.bundle.js & anotherFile.bundle.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: "development",
};
