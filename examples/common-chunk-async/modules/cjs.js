var shuffle = require("lodash/collection/shuffle");
var camelCase = require("lodash/string/camelCase");
module.exports = function (list) {
	return shuffle(list).map(camelCase);
};
