import networkx as nx
from community import community_louvain
import pymongo
import string
import random
import sys

trial_root = sys.argv[1]

client = pymongo.MongoClient("localhost", 27017)
db = client["team-y-nots"]
table = db["people"]

G = nx.Graph()
list_of_edges = []
list_of_ids_and_weights = []

queue = []
visited = []
queue.append(trial_root)
while queue:
        curr_parent_id = queue.pop()
        visited.append(curr_parent_id)
        full_json_parent = table.find_one({"company_id": curr_parent_id})
        array_of_ids = full_json_parent["list_of_ids_exposed"]
        length_of_array = len(array_of_ids)
        for i in range (0, length_of_array):
                curr_child_id = array_of_ids[i]
                already_exists = G.has_edge(curr_child_id, curr_parent_id)
                already_exists2 = G.has_edge(curr_parent_id, curr_child_id)
                if curr_child_id is not curr_parent_id and already_exists is False and already_exists2 is False:
                        G.add_edge(curr_parent_id, curr_child_id)
                        list_of_edges.append(curr_parent_id)
                        list_of_edges.append(curr_child_id)
                        if curr_parent_id not in list_of_ids_and_weights:
                                list_of_ids_and_weights.append(curr_parent_id)
                                list_of_ids_and_weights.append(1)
                        if curr_parent_id in list_of_ids_and_weights:
                                index = list_of_ids_and_weights.index(curr_parent_id)
                                list_of_ids_and_weights[index + 1] = list_of_ids_and_weights[index + 1] + 1
                        if curr_child_id not in list_of_ids_and_weights:
                                list_of_ids_and_weights.append(curr_child_id)
                                list_of_ids_and_weights.append(1)
                        if curr_child_id in list_of_ids_and_weights:
                                index = list_of_ids_and_weights.index(curr_child_id)
                                list_of_ids_and_weights[index + 1] = list_of_ids_and_weights[index + 1] + 1
                        

                if curr_child_id not in visited:
                        queue.append(curr_child_id)

all_key_values = []
partition = community_louvain.best_partition(G)
for key,value in partition.items():
        all_key_values.append(key)
        all_key_values.append(value)
        index = list_of_ids_and_weights.index(key)
        initial_value = list_of_ids_and_weights[index + 1]
        scaled_value = ((initial_value)/75)*(25 - 5) + 5
        if scaled_value < 6.5:
                scaled_value = 3
        elif scaled_value < 9:
                scaled_value = 6
        elif scaled_value < 14:
                scaled_value = 9
        elif scaled_value < 19:
                scaled_value = 12
        else:
                scaled_value = 15                

        all_key_values.append(scaled_value)

list_of_network_and_community_data = []
network_count = 0
community_count = 0
network_is_diagnosed_with_covid = 0
community_is_diagnosed_with_covid = 0
network_is_recovered_from_covid = 0
community_is_recovered_from_covid = 0
for key,value in partition.items():
        full_json_parent = table.find_one({"company_id": key})

        is_diagnosed_with_covid = full_json_parent["diagnosed_with_covid"]
        if is_diagnosed_with_covid == True:
                network_is_diagnosed_with_covid = network_is_diagnosed_with_covid + 1
        if is_diagnosed_with_covid == True and str(value) == '0':
                community_is_diagnosed_with_covid = community_is_diagnosed_with_covid + 1        

        is_recovered_from_covid = full_json_parent["recovered_from_covid"]
        if is_recovered_from_covid == True:
                network_is_recovered_from_covid = network_is_recovered_from_covid + 1
        if is_recovered_from_covid == True and str(value) == '0':
                community_is_recovered_from_covid = community_is_recovered_from_covid + 1        

        if str(value) == '0':
                community_count = community_count + 1
        network_count = network_count + 1

list_of_network_and_community_data.append(network_count)
list_of_network_and_community_data.append(network_is_diagnosed_with_covid)
list_of_network_and_community_data.append(network_is_recovered_from_covid)
list_of_network_and_community_data.append(community_count)
list_of_network_and_community_data.append(community_is_diagnosed_with_covid)
list_of_network_and_community_data.append(community_is_recovered_from_covid)                

print(str(all_key_values) +'|'+ str(list_of_edges) + '|' + str(list_of_network_and_community_data))
sys.stdout.flush()