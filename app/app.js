
const express = require('express')
const app = express()
// const port = 3000
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



//Connecting MongoDB
const uri = "mongodb+srv://will:xo52eg15@cluster0.vlxnz.mongodb.net/retail?retryWrites=true&w=majority";
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(uri, {useNewUrlParser: true});


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

//Creates date index used to create graphs
var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();

let index_of_dates = dateIndex(month, year);



//initial route
app.get('/', (req, res) => {

  //pulls all unique banners from DB
	stores.find().distinct('banner', function(err, data) { 

    //passes array through to home page
		res.render("home", {renderList: data});
				
	});


//route for banner home page
app.get('/banner/:id', (req, res) => {
    
    let bannerreturn = req.params.id;

    //uses banner to pull all locations from DB and passes through to banner page.

    stores.find({ 'banner': bannerreturn },"street", function (err, data) {
  		if (err) return handleError(err);
  		res.render("stores", {renderList: data});
	});
});


//route for individual store page
app.get('/banner/store/:id', (req, res) => {

    //passes store address
    let storereturn = req.params.id;
    
    //uses store address to pull donation information for previous 12 months
    //puts that information into array to pass through to individual store page to visualize

    let return_arr = [];
    stores.find({ 'street': storereturn }, function (err, data) {
  		if (err) return handleError(err);
  		

  		index_of_dates.forEach(item => {
  			let return_sum = 0;

  			if(data[0]["monthly_donation"][item] && data[0]["monthly_donation"][item] != []){
  			console.log(data[0]["monthly_donation"][item])
  		
  			for(const [key, value] of Object.entries(data[0]["monthly_donation"][item])) {
  				if(key != 'date' && value != undefined){
  					return_sum += value;
  				}
  				
  				
  			}
  			return_arr.unshift(return_sum);
	  		}




  			console.log(return_arr);
  		})


  		res.render("store_stats", {renderList: return_arr, address: storereturn});
  		
	});
    
});
    




app.listen(process.env.PORT || 5000);


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