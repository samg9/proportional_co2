import pandas as pd
import json
import os


# Reading the json as a dict
with open('/Users/sameer/code/proportional_co2/public/ne_110m_admin_0_countries.json') as jsondata:
	data = json.load(jsondata)

d = pd.read_csv('/Users/sameer/code/proportional_co2/public/owid-co2-data.csv')
# # let see how many countries co2 we have data for 
years = list(range(1750,2020))

for ix,row in d[['country','iso_code','co2','year']][:][pd.notnull(d.co2)][d.iso_code!=None][d.year.isin(years)].iterrows():
	for i in range(len(data['objects']['countries']['geometries'] )):
		possible_isos = [
			data['objects']['countries']['geometries'][i]['properties']['ADM0_A3'], 
			data['objects']['countries']['geometries'][i]['properties']['WB_A3'], 
			data['objects']['countries']['geometries'][i]['properties']['ADM0_A3_IS'],
			data['objects']['countries']['geometries'][i]['properties']['SOV_A3'],
			data['objects']['countries']['geometries'][i]['properties']['GU_A3'],
			data['objects']['countries']['geometries'][i]['properties']['SU_A3'],
			data['objects']['countries']['geometries'][i]['properties']['BRK_A3'],
			data['objects']['countries']['geometries'][i]['properties']['ISO_A3'],
			data['objects']['countries']['geometries'][i]['properties']['ISO_A3_EH'],
			data['objects']['countries']['geometries'][i]['properties']['ADM0_A3_IS'],
			data['objects']['countries']['geometries'][i]['properties']['ADM0_A3_US'],
		]
		possible_country = [
			data['objects']['countries']['geometries'][i]['properties']['SOVEREIGNT'],
			data['objects']['countries']['geometries'][i]['properties']['ADMIN'],
			data['objects']['countries']['geometries'][i]['properties']['GEOUNIT'], 
			data['objects']['countries']['geometries'][i]['properties']['NAME'] ,
			data['objects']['countries']['geometries'][i]['properties']['NAME_LONG'],
			data['objects']['countries']['geometries'][i]['properties']['BRK_NAME'],
			data['objects']['countries']['geometries'][i]['properties']['NAME_SORT'],
		] 
		if (row.country in possible_country) or (row.iso_code in possible_isos):
			print("found a match for ", row.country)
			data['objects']['countries']['geometries'][i]['properties'][str(row.year)] = {'co2': row.co2}

with open('./countries_againandagain.json', 'w') as outfile:
    json.dump(data, outfile)