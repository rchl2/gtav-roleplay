const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const glob = require("glob");
const rimraf = require("rimraf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const directoryExist = fs.existsSync("./client_packages/LSOnline/browser/dist/");
const env = process.argv[2] === "--mode=production" ? "production" : "development";

if (directoryExist) rimraf.sync("./client_packages/LSOnline/browser/dist");

module.exports = {
  mode: env,
  stats: "errors-only",
  performance: {
    hints: false
  },
  entry: glob
    .sync("./client_packages/LSOnline/browser/src/pages/*/main.js")
    .reduce(
      (x, y) =>
        Object.assign(x, {
          [y.split("/")[6]]: path.resolve(__dirname, '..', y)
        }),
      {}
    ),
  output: {
    path: path.resolve("./client_packages/LSOnline/browser/dist/"),
    filename: "[name]/[name].min.js",
    publicPath: ".."
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "/assets/static"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          env !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "all",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        styles: {
          name: "assets/styles",
          test: module =>
            module.nameForCondition &&
            /\.(s?css|vue)$/.test(module.nameForCondition()) &&
            !/^javascript/.test(module.type),
          chunks: "all",
          minChunks: 1,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: "./node_modules/.cache/hard-source/[confighash]",
      configHash: function (webpackConfig) {
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      },
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ["package-lock.json", "yarn.lock"]
      },
      info: {
        mode: "none",
        level: "debug"
      },
      cachePrune: {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sizeThreshold: 50 * 1024 * 1024
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};

if (env === "development") {
  module.exports.devServer = {
    contentBase: "./client_packages/LSOnline/browser",
    stats: { chunks: false },
    hot: true,
    open: true,
    publicPath: "/dist/",
    index: "",
    watchOptions: {
      poll: 1000
    }
  };
  module.exports.devtool = "cheap-eval-source-map";
  module.exports.plugins.push(
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: "./client_packages/LSOnline/browser/src/assets/images/*",
            destination:
              "./client_packages/LSOnline/browser/dist/assets/static"
          }
        ]
      }
    })
  );
}

if (env === "production") {
  module.exports.stats = true;
  module.exports.plugins.push(
    new FileManagerPlugin({
      onEnd: {
        delete: [
          "./client_packages/LSOnline/browser/src/*",
          "./client_packages/LSOnline/browser/src/",
          "./client_packages/LSOnline/browser/dist/index.html"
        ]
      }
    })
  );
}

glob
  .sync("./client_packages/LSOnline/browser/src/pages/*/*.js")
  .forEach(element => {
    const name = element.split("/")[6];
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        title: name,
        filename: `${name}/index.html`,
        alwaysWriteToDisk: true,
        chunks: ["vendor", "commons", "styles", name],
        template: "./client_packages/LSOnline/browser/src/pages/template.html",
        meta: {
          viewport: "width=device-width, initial-scale=1"
        }
      })
    );
  });
