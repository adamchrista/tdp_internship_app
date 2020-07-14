import networkx as nx
import pymongo
import string
import random

client = pymongo.MongoClient("localhost", 27017)
db = client["team-y-nots"]
table = db["people"]

f = open("/Users/jt2608/Documents/team-y-nots/graph_1.kml", "r")
firstLine = f.readline()
split = firstLine[1:-2]
numOfCharacters = int(split)

my_list_of_users = []


for index in range(0, numOfCharacters):
	is_diagnosed_with_covid = random.choice([True, False])
	is_recovered_from_covid = random.choice([True, False])
	if is_diagnosed_with_covid == False and is_recovered_from_covid == True:
        	is_diagnosed_with_covid = True
	tempStr = (f.readline())[:-1]
	user = {"company_id": str(tempStr), "first_name": "John", "last_name": "Donovan", "email": "ac1234@att.com", "phone": "555-555-5555",\
	"diagnosed_with_covid": is_diagnosed_with_covid, "recovered_from_covid": is_recovered_from_covid, "list_of_ids_exposed": []}
	my_list_of_users.append(user)

x = table.insert_many(my_list_of_users)
print(x.inserted_ids)

place_holder = f.readline()

for line in f:
	tempStr = f.readline()
	trial = tempStr.split()
	my_query = {"company_id": str(trial[0])}
	new_values = {"$push": {"list_of_ids_exposed": str(trial[1])}}
	table.update_one(my_query, new_values)
