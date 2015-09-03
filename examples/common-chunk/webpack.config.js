var path = require('path');
var webpack = require('webpack');

module.exports = {

	entry: {
		page1: './page-1.js',
		page2: './page-2.js',
		page3: './page-3.js'
	},

	output: {
		path: path.resolve('./_'),
		filename: '[name].js',
		chunkFilename: '[id].js'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			chunks: ['page1', 'page2'],
			async: true
		})
	]

};
