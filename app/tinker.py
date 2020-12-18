import csv
import simplejson as json
from pathlib import Path

file = open("idaddressmap.csv")
reader = csv.reader(file)
result = [[item for item in row if item != ''] for row in reader]

print(result)

address_map = {}

for each in result:
	address_map[each[0]] = each[1:]


jsonline = json.dumps(address_map)

f = open(Path("idaddressmap.json"),"w")
f.write(jsonline)
f.close()

print(address_map)