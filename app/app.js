
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
temp_store = stores.find({ceres_id: '1608680'}, function(err, data) { console.log(err, data[0].monthly_donation.test); });


// mongoose.find().distinct('banner', function(error, ids) {
//     // ids is an array of all ObjectIds
//     console.log(ids)
// });

// app.get('/', (req, res) => {
	
// 	con.query('SELECT DISTINCT banner FROM stores', (err,stores) => {
// 		if(err) throw err;

//   		console.log('Data received from Db:');
//   		console.log(stores);
//   		res.render("home", {renderList: stores});
// 	});



// });

// app.get('/', (req, res) => {
	
// 	con.query('SELECT DISTINCT banner FROM stores', (err,stores) => {
// 		if(err) throw err;

//   		console.log('Data received from Db:');
//   		console.log(stores);
//   		res.render("home", {renderList: stores});
// 	});

// });


// app.get('/banner/:id', (req, res) => {
//     let bannerreturn = req.params.id;
//     console.log(bannerreturn)
//     con.query('SELECT street FROM stores WHERE banner = ' + '"' + bannerreturn + '"' , (err,stores) => {
// 		if(err) throw err;

//   		console.log('Data received from Db:');
//   		console.log(stores);
//   		res.render("stores", {renderList: stores});
// 	});    
// });

// app.get('/banner/store/:id', (req, res) => {
//     let storereturn = req.params.id;
//     console.log(storereturn)




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
    
    
// });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





let WMkey = [16473, 1001021, 1001188, 1001265, 100145, 100152, 100172, 100173, 100196, 1002213, 100243, 1002600, 100262, 100295, 100313, 100354, 10037, 100377, 100436, 1004695, 1005313, 100648, 10065, 100653, 10069, 10095, 10099, 101071, 101418, 101514, 10201, 10253, 10256, 102616, 10328, 10361, 104216, 104222, 104252, 1043022, 10435, 1608554, 1608566, 1608641, 1608644, 1608645, 1608815, 1609039, 235791, 31684, 379999, 63699]

let ALDIkey = [1608619, 1608680, 1608681, 1608682, 1608683, 1608684, 1608685, 1608686, 1608687, 1608688, 1608689, 1608690, 1608691, 1608692, 1608693, 1608694, 1608695, 1608696, 1608697, 1608698, 1608699, 1608700, 1608701, 1608702, 1608703, 1608704, 1608705, 1608706, 1608707, 1608708, 1608710, 1608711, 1608712, 1608713, 1608714, 1608715, 1608716, 1608717, 1608718, 1608719, 1608720, 1608721, 1608722, 1608723, 1608743, 1608794, 1608803, 1608948, 1608970, 1608971]

let KROGERkey = [4000, 4002, 4003, 4010, 4011, 4012, 4013, 4014, 4015]

let RULERkey = [1608453, 1608475, 1608500, 1608504, 1608526, 1608545, 1608565, 1608725, 1608726, 1608836]

let TARGETkey = [100234, 100422, 1004255, 100699, 10420, 106241, 12723, 15025, 18383, 18571, 197005, 222222, 23004, 23501, 250366, 291066, 34000, 400000, 445566, 47012, 560123, 567444, 79555]

let FTkey = [1608474, 1608601, 1608602, 1608786, 1608821, 1608883]

let COSTCOkey = [1608663, 1608894, 420001]

let SAMSkey = [102356, 130550, 147832, 159886, 226547, 5569866, 631314, 631569, 631636, 6338555, 66223344]

let SALkey = [1000000, 10000421, 1000404, 1000405, 1000407, 1000408, 1000409, 1000411, 1000412, 1000413, 1000414, 1000416, 1000417, 1000419, 1000420, 1000422, 1000424, 1000425, 1000427, 1000864, 1608476, 1608613, 1608759, 1608876, 1609046, 34671, 400004]
