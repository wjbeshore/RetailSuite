import csv
from pathlib import Path
import datetime
import pymongo
import os

#Connect to MongoDb
client = pymongo.MongoClient('mongodb+srv://will:xo52eg15@cluster0.vlxnz.mongodb.net/retail?retryWrites=true&w=majority')
db = client.retail
storesdb = db.stores




#Takes raw csv file exported from Ceres and converts to array.

file_name = input("File name?")
file = open(file_name)
reader = csv.reader(file)
result = [[item for item in row if item != ''] for row in reader]

# Create empty dictionary for stores
stores = {}

# Uses results from csv file and cleans data. Removes headers, takes date and creats a date time object.
result = result[11:]
result = result[:-3]
date_index = result[1][5].split("/")
date = date_index[2] + "-" + date_index[0] + "-01"
x = datetime.datetime(int(date_index[2]), int(date_index[0]), 1)
print(date)

# Begins parsing cleaned data and storing individual stores with all recorded donations that month.
current_store = ""
for row in result:
    if row[0] == "Donor Total":
        current_store = ""
    elif (row[1].isdigit() == False) and (row[1] != "RETAIL"):
        current_store = int(row[0])
        stores[current_store] = []
    
    else:
        if row[8] == '12/31/9999':
            pounds = row[9].replace(",", "")
            pounds = pounds[:-1]
            stores[current_store].append([row[5], row[2], row[4], float(pounds)])
        else:
            pounds = row[8].replace(",", "")
            pounds = pounds[:-1]
            stores[current_store].append([row[5], row[2], row[4], float(pounds)])
 
# Takes our store with donations lists and creates dictionary with totals from all categories and datetime object in each store. 
store_totals = {}
for line in stores:
    key = int(line)
    store_totals[key] = {
    "date": x.strftime("%m/%Y")
    }
    for item in stores[key]:
        category = item[1]

        if category not in store_totals[key]:
            store_totals[key][category] = item[3]
            
        else:
             store_totals[key][category] += item[3]
             
# 4012: {'date': '04/2019', 'RETAIL, MIX FOOD': 284.0}



# Runs through dictionary of stores and adds to MongoDB
for each in store_totals:
	# print(each)
	myquery = { "ceres_id": str(each)}
	temp_date = store_totals[each]["date"]
	update = {"$set": {"monthly_donation." + temp_date : store_totals[each]}};
	storesdb.update_one(myquery, update);







