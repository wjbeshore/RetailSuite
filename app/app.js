
const express = require('express')
const app = express()
const port = 3000
const https = require('https')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');



//Connecting MongoDB to app now.

const uri = "mongodb+srv://will:xo52eg15@cluster0.vlxnz.mongodb.net/retail?retryWrites=true&w=majority";


const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(uri, {useNewUrlParser: true});

// 04/2019

mongoose.model('store', new Schema(
{ceres_id:String,
banner:String,
street:String,
city:String,
state:String,
zip:String,
phone:String,
monthly_donation:Object}
	));

var stores = mongoose.model('store');
// stores.find().distinct('banner', function(err, data) { console.log(err, data[2])});
var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();

console.log(month + "/" + year);
let index_of_dates = dateIndex(month, year);




app.get('/', (req, res) => {
	stores.find().distinct('banner', function(err, data) { 

		res.render("home", {renderList: data});
		console.log(err, data)}); 		
	});


app.get('/banner/:id', (req, res) => {
    let bannerreturn = req.params.id;




	stores.find({ 'banner': bannerreturn },"street", function (err, data) {
  		if (err) return handleError(err);
  		res.render("stores", {renderList: data});
	});
});

app.get('/banner/store/:id', (req, res) => {
    let storereturn = req.params.id;
    console.log(storereturn)


    stores.find({ 'street': storereturn }, function (err, data) {
  		if (err) return handleError(err);
  		console.log(data);
  		index_of_dates.forEach(item => {
  			console.log(data[0]["monthly_donation"][item]);
  		})



  		// res.render("stores", {renderList: data});
	});


//     con.query('SELECT * FROM stores s LEFT JOIN donation d ON d.ceres_id = s.ceres_id WHERE s.street = ' + '"' + storereturn + '"' + "ORDER BY d.month DESC LIMIT 12", (err,stores) => {
// 		if(err) throw err;

//   		console.log('Data received from Db:');
//   		let new_arr = [];
//   		stores.forEach((element) => {
//   			let arrSum = 0;
//   			arrSum += element.mix;
//   			arrSum += element.dairy;
//   			arrSum += element.meat;
//   			arrSum += element.produce;
//   			arrSum += element.nonfood;
//   			// let tempArr = [element.month, arrSum];
//   			new_arr.unshift(arrSum)


//   		});
//   		console.log(new_arr);
//   		console.log(stores);
//   		res.render("store_stats", {renderList: new_arr, address: storereturn});
// 	});
    
    
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


function dateIndex(m, y) {
  let return_arr = [];
  let month_iter = m;
  let year_iter = y;
  for(let n = 0; n < 12; n++){
  	
  	if(month_iter == 1){
  		month_iter = 12;
  		year_iter = year_iter - 1;
  	} else {
  		month_iter -= 1;
  	}
  	if(month_iter < 10){
  		return_arr.push("0" + month_iter + "/" + year_iter);
  	} else {
  		return_arr.push(month_iter + "/" + year_iter);
  	}
  	
  }
  return return_arr;

};