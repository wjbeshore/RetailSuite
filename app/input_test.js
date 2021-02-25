const parse = require('csv-parse');
const fs = require('fs');
var stringify = require('csv-stringify');


var parser = parse(function (err, records) {
    let temp_arr = [];
	// console.log(records[40]);
    records.forEach(element => (temp_arr.push(element.filter(item => item != ""))));
    let stores = {};
    temp_arr = temp_arr.slice(11);
    temp_arr = temp_arr.slice(0,-3);
    let date = temp_arr[1][5];
    let current_store = "";
    temp_arr.forEach(item => {
        // console.log(item);
        if(item[0] == "Donor Total"){
            current_store = "";
        } else if((isNaN(item[1])) && (item[1] != "RETAIL") ){
            current_store = parseInt(item[0])
            stores[current_store] = [];
        } else{
            if(item[8] == '12/31/9999'){
                
                let pounds = item[9];
                pounds = pounds.slice(0,-1);
                stores[current_store].push([item[5], item[2], item[4], parseFloat(pounds)])
                
            } else {
                
                let pounds = item[8];
                pounds = pounds.slice(0,-1);
                stores[current_store].push([item[5], item[2], item[4], parseFloat(pounds)])
                
            }
                

            }
        
    })
    
        
    console.log(stores);
});

fs.createReadStream('Apr19.csv').pipe(parser);