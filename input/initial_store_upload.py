import csv
from pathlib import Path
import datetime
import pymongo
import os



# Connects to mongo database
client = pymongo.MongoClient('mongodb+srv://will:xo52eg15@cluster0.vlxnz.mongodb.net/retail?retryWrites=true&w=majority')
db = client.retail
stores = db.stores


# Reads list of stores CSV file into array of arrays.
# [['1000417', 'SAVE A LOT', '4515 W MAIN', 'BELLEVILLE', 'IL', '62226', '618-257-9838'], ['1000417', 'SAVE A LOT', '4515 W MAIN', 'BELLEVILLE', 'IL', '62226', '618-257-9838']]
file_name = "CompRetail.csv"
file = open(file_name)
reader = csv.reader(file)
result = [[item for item in row if item != ''] for row in reader]


# Converts array of arrays into array of dictionary objects to insert into mongodb.
# {'ceres_id': '1608685', 'banner': 'ALDI', 'street': '464 HAWK RIDGE TRAIL', 'city': 'LAKE ST. LOUIS', 'state': 'MO', 'zip': '63367', 'phone': '636-625-1477', 'monthly_donation': {}}
store_list = []
for each in result:
	store_dict = {}
	store_dict["ceres_id"] = each[0]
	store_dict["banner"] = each[1]
	store_dict["street"] = each[2]
	store_dict["city"] = each[3]
	store_dict["state"] = each[4]
	store_dict["zip"] = each[5]
	store_dict["phone"] = each[6]
	store_dict["monthly_donation"] = {}
	store_list.append(store_dict)


# Inserts list into database
x = stores.insert_many(store_list)

#print list of the _id values of the inserted documents:
print(x.inserted_ids)