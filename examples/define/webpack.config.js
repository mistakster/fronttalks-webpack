var webpack = require('webpack');

var URL = "http://example.com";

module.exports = {

	entry: './index.js',

	output: {
		filename: '[name].bundle.js'
	},

	plugins: [
		new webpack.DefinePlugin({
			'DEBUG': process.env.NODE_ENV != 'production',
			'API_ENDPOINT': '"' + URL + '"',
			'helloWorldFunc': function () {
				return "Hello, world!";
			}
		})
	]

};