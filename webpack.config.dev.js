const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

// console.log(process.env);

module.exports = {
	devtool: 'inline-source-map',
	entry: ['./src'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // load js
				use: 'babel-loader'
			},
			{
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
                includePaths: ["absolute/path/a", "absolute/path/b"]
            }
        }]
      },
			{
				test: /\.css$/, // load css
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/, // load file
				use: [
					'file-loader'
				]
			},
			{
			 test: /\.(woff|woff2|eot|ttf|otf)$/, // load font
			 use: [
				 'file-loader'
				]
			}
		]
	},
	plugins: [
    extractSass
  ]
};