import pandas as pd
import json
import os


# Reading the json as a dict
with open('/Users/sameer/code/proportional_co2/public/ne_110m_admin_0_countries.json') as jsondata:
	data = json.load(jsondata)

# using the from_dict load function. Note that the 'orient' parameter 
#is not using the default value (or it will give the same error that you got before)
# We transpose the resulting df and set index column as its index to get this result
pd.DataFrame.from_dict(data, orient='index').T.set_index('index')   
# list of countries
geom = data['objects']['countries']['geometries'] 
for i in geom:
	print(i['properties']['NAME_CIAWF'])
	
afg = data['objects']['countries']['geometries'][0]['properties']['NAME_CIAWF']
d = pd.read_csv('owid-co2-data.csv')
afgg = data1.iloc[0]['country']
