// подключаем нужные на модули
var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer-core');

// вспомогательная функция для определения окружения
function isProduction() {
	return process.env.NODE_ENV == 'production';
}

// мы будем извлекать CSS из модулей и сохранять в отдельный файл
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var staticCssPlugin = new ExtractTextPlugin('[name].css', { allChunks: true });


// конфигурация
module.exports = {

	// точки входа
	entry: {
		site: './site', // сборка для сайта
		admin: './admin' // сборка для админки
	},

	output: {
		// директорая, куда будут сохраняться сгенерированные ресурсы
		path: path.resolve('./assets/'),
		// формат имени для упаковок
		filename: '[name].js',
		// формат имени дополнительных сборок
		// для подакшина имя файла будет меняться при изменении содержимого
		chunkFilename: isProduction() ? '[chunkhash].chunk.js' : '[id].chunk.js',
		// адрес для асинхронной загрузки дополнительных сборок
		// в продакшине мы загружаем ресурсы из CDN
		publicPath: isProduction() ? 'https://cdn.domain.tld/' : '/assets/'
	},

	module: {
		loaders: [{
			// все JS и JSX файлы (кроме NPM модулей) пропускаем через транспайлер
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader?cacheDirectory&stage=0'
		}, {
			// 
			test: /\.css$/,
			loader: staticCssPlugin.extract('style-loader', 'css-loader')
		}, {
			test: /\.less$/,
			loader: staticCssPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'
		},{
			test: /\.(eot|ttf|woff|woff2|svg|png|jpg|jpeg)$/,
			loader: 'url-loader?limit=20000'
		}]
	},

	postcss: function () {
		return [
			// используем AutoPrefixer
			autoprefixer,
			// напишем свой плагин для PostCSS прям в конфигруации webpack
			postcss.plugin('addNamespaceToMyWidget', function () {
				return function (css) {
					css.eachRule(function (rule) {
						rule.selectors = rule.selectors.map(function (selector) {
							if (selector.indexOf('.my-widget-') >= 0 || selector.indexOf('*') == 0) {
								selector = '#namespace ' + selector;
							}
							return selector;
						});
					});
				};
			});
		]
	},

	// набор плагинов webpack зависит от окружения
	plugins: (function () {
		var plugins = [];

		plugins.push(
			// плаги для извлечения стилей из сборки
			staticCssPlugin,
			// в глобальные переменные добавляем значение переменной окружения
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
			}),
			// извлекаем общие модули для сайта и админки в отдельную сборку
			new webpack.optimize.CommonsChunkPlugin({
				name: 'commons'
			})
		);

		// для сборки «в продакшин» добавим ещё оптимизаций
		if (isProduction()) {
			plugins.push(
				// удаляем возможные дубликаты модулей
				new webpack.optimize.DedupePlugin(),
				// минифицируем все скрипты
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					}
				})
			);
		}

		return plugins;
	}())

};



