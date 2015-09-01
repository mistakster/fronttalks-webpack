var ConcatSource = require('webpack-core/lib/ConcatSource');


function MyPlugin() {
}

MyPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compile', function (params) {
    // Just log something
    console.log('Compiling...');
  });

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('optimize', function () {
      console.log('The compilation is now optimizing your stuff');
    });
    
    compilation.plugin('optimize-chunk-assets', function (chunks, callback) {
      chunks.forEach(function (chunk) {
        chunk.files.forEach(function (file) {
          compilation.assets[file] = new ConcatSource('/* banner */', '\n', compilation.assets[file]);
        });
      });
      callback();
    });
    
  });

};


module.exports = {

  entry: './index.js',

  output: {
    path: __dirname + '/_',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },

  plugins: [
    new MyPlugin({
      options: 'nada'
    })
  ]

};