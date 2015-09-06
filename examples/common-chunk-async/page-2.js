require.ensure(['./modules/cjs', './modules/data.json'], function (require) {
	var module2 = require('./modules/cjs');
	var data = require('./modules/data.json');
	alert(module2(data));
});
