var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
//var APP_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: "./app-client.js",
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
		loaders: [
			{
				exclude: /(node_modules|app-server.js)/,
				loader: 'babel'
			}
		]
	}
};

module.exports = config;
