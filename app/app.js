
const express = require('express')
const app = express()
const port = 3000
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
const parse = require('csv-parse');
const fs = require('fs');



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
});

//initial route
app.get('/upload', (req, res) => {

	//pulls all unique banners from DB
	  
  
	  //passes array through to home page
	res.render("upload");
			
  });

  app.post('/upload', function(req, res) {
	console.log(req.body); // the uploaded file object
	let file_to_upload = req.body.upload_file;
	uploadFile(file_to_upload);
	stores.find().distinct('banner', function(err, data) { 

		//passes array through to home page
			res.render("home", {renderList: data});
  });
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

// app.listen(process.env.PORT || 5000);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
  });


  function uploadFile(file){
	var datekey = "monthly_donation.";
	let date = "";
	
	
	var parser = parse(function (err, records) {
		let temp_arr = [];
		// console.log(records[40]);
		records.forEach(element => (temp_arr.push(element.filter(item => item != ""))));
		let storesDictionary = {};
		temp_arr = temp_arr.slice(11);
		temp_arr = temp_arr.slice(0,-3);
		date = temp_arr[1][5];
		datekey = datekey + date;
		let current_store = "";
		temp_arr.forEach(item => {
			// console.log(item);
			if(item[0] == "Donor Total"){
				current_store = "";
			} else if((isNaN(item[1])) && (item[1] != "RETAIL") ){
				current_store = parseInt(item[0])
				storesDictionary[current_store] = [];
			} else{
				if(item[8] == '12/31/9999'){
					
					let pounds = item[9];
					pounds = pounds.slice(0,-1);
					storesDictionary[current_store].push([item[5], item[2], item[4], parseFloat(pounds)])
					
				} else {
					
					let pounds = item[8];
					pounds = pounds.slice(0,-1);
					storesDictionary[current_store].push([item[5], item[2], item[4], parseFloat(pounds)])
					
				}
					
	
				}
				
			
		})
		
			
	
	
	
		let store_totals = {};
		Object.keys(storesDictionary).forEach(function(key) {
			store_totals[key] = {
				   "date": date
				   }
			storesDictionary[key].forEach(row => {
				let category = row[1];
				if(store_totals[key].hasOwnProperty(category)){
					store_totals[key][category] += row[3];
				} else {
					store_totals[key][category] = row[3];
				}
			})
			
			Object.keys(store_totals).forEach(function(key) {
			let queryU = {$push: {"monthly_donation": store_totals[key]}};
			console.log(datekey);
			stores.updateOne({ceres_id:key}, {$push: {"monthly_donation": store_totals[key]}}, function(
				err,
				result
			  ) {
				if (err) {
				  console.log(err);
				} else {
				  console.log(result);
				}
			  });
	
	
	
	
		});
	});
	});
	
	fs.createReadStream('Apr19.csv').pipe(parser);


  }