// run from CLI: webpack index.js index.bundle.js

var module1 = require('./cjs');
var module2 = require('./amd');

var data = [
	"grave stone",
	"flatten proud sprite",
	"accepting formula",
	"hideous plasma gun"
];

alert(module1(data));
alert(module2(data));
