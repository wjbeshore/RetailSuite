import csv
from pathlib import Path
import datetime




file_name = input("File name?")

file = open(file_name)
reader = csv.reader(file)
result = [[item for item in row if item != ''] for row in reader]

stores = {}
result = result[11:]
result = result[:-3]


date_index = result[1][5].split("/")
date = date_index[2] + "-" + date_index[0] + "-01"
x = datetime.datetime(int(date_index[2]), int(date_index[0]), 1)
print(x)


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
             
print(store_totals)
# 66223344: { 'RETAIL, PRODUCE': 21080.0, 'RETAIL, MEAT AND DELI': 2855.0, 'RETAIL, MIX FOOD': 15786.0, 'RETAIL, DAIRY': 390.0}




# jsonline = json.dumps(store_totals)
# f = open(Path("./stored/" + date_index[2] + "_" + date_index[0] + ".json"),"w")
# f.write(jsonline)
# f.close()







