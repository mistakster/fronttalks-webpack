define(["lodash/collection/shuffle", "lodash/string/camelCase"], function (shuffle, camelCase) {
	return function (list) {
		return shuffle(list).map(camelCase);
	}
});
