const parse = require('csv-parse');
const fs = require('fs');
var stringify = require('csv-stringify');


var parser = parse(function (err, records) {
    let temp_arr = [];
	// console.log(records[40]);
    records.forEach(element => (temp_arr.push(element.filter(item => item != ""))));
    console.log(temp_arr[45]);
    let stores = {};
    temp_arr = temp_arr.slice(11);
    temp_arr = temp_arr.slice(0,-3);

});

fs.createReadStream('Apr19.csv').pipe(parser);