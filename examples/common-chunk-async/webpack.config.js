var path = require('path');
var webpack = require('webpack');

module.exports = {

	entry: {
		page1: './page-1.js',
		page2: './page-2.js'
	},

	output: {
		path: path.resolve('./_'),
		filename: '[name].js',
		chunkFilename: '[id].js',
		publicPath: '_/'
	},

	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json' }
		]
	},

	plugins: [
		new webpack.optimize.AggressiveMergingPlugin()
	]

};
