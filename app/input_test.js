const parse = require('csv-parse');
const fs = require('fs');
var stringify = require('csv-stringify');

var parser = parse(function (err, records) {
	console.log(records[40]);
});

fs.createReadStream('Apr19.csv').pipe(parser);