const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './js/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
      },
    optimization: {
        minimizer: [
          '...',
          new CssMinimizerPlugin(),
        ],
      },
      devtool:
    process.env.NODE_ENV === "production" ? false : "source-map",
    devtool: process.env.NODE_ENV === "production" ? "hidden-source-map" : "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new MiniCssExtractPlugin(), 
    ],
};
