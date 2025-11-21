const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: ["web"],
  entry: path.resolve(__dirname, "gramjs/index.ts"),

  // ✅ Strict mode for Chrome extension safety
  mode: "production",
  devtool: false, // disable eval-based source maps

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      net: false,
      crypto: false,
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      assert: false,
      stream: false,
      events: false,
      constants: false,
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    // ✅ Enforce non-eval builds and suppress devtool warnings
    new webpack.BannerPlugin({
      banner: "/* Telegram Browser Build — Production Safe, No eval() */",
      raw: true,
    }),
  ],

  output: {
    library: "telegram",
    libraryTarget: "umd",
    filename: "telegram.js",
    path: path.resolve(__dirname, "browser"),
    // ✅ Prevent Webpack from using eval chunk loading
    globalObject: "self",
    devtoolModuleFilenameTemplate: undefined,
  },
};
