# Server (back end) of the project

## Returns asked data to [front end](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment/tree/master/front_end) side of [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment) project.

### Usage

All of the distances are in **meters**.  

 * Getting route
  * HOST:PORT_SERVER/origin/destination (http://localhost:8000/Tampere/Helsinki)
  * Returns JSON object that contains route and total distance.
```json
  {
    "origin":"Tampere",
    "destination":"Helsinki",
    "distance":193945.21023209943,
    "points":
    [
      {"name":"Tampere","lat":61.4977524,"lng":23.7609535,"distance":0},
      {"name":"Nokia","lat":61.4803094,"lng":23.501203,"distance":13922.362625343052},
      {"name":"Valkeakoski","lat":61.2649926,"lng":24.0310372,"distance":37012.9841272983},
      {"name":"Hämeenlinna","lat":60.9928787,"lng":24.4590243,"distance":37993.68315679782},
      {"name":"Riihimäki","lat":60.73849370000001,"lng":24.7728925,"distance":32997.36308414512},
      {"name":"Hyvinkää","lat":60.62995249999999,"lng":24.8580797,"distance":12929.66797265928},
      {"name":"Nurmijärvi","lat":60.46381049999999,"lng":24.8075808,"distance":18679.33520672118},
      {"name":"Tuusula","lat":60.4004159,"lng":25.0213065,"distance":13682.619415619369},
      {"name":"Vantaa","lat":60.29335239999999,"lng":25.0377686,"distance":11939.315249487847},
      {"name":"Helsinki","lat":60.16985569999999,"lng":24.938379,"distance":14787.87939402742}
    ]
  }
```

* Getting major cities
 * HOST:PORT_SERVER/major_cities (http://localhost:8000/major_cities)
 * Returns JSON object that contains major cities.
```json
[
  {"_id":"57cc813da607eba20d2b943d","no":1,"name":"Helsinki","lat":60.16985569999999,"lng":24.938379},
  {"_id":"57cc813da607eba20d2b9436","no":2,"name":"Espoo","lat":60.2054911,"lng":24.6559001},
  {"_id":"57cc813da607eba20d2b9438","no":3,"name":"Tampere","lat":61.4977524,"lng":23.7609535},
  ...
]
```

### Setting major cities.

If there are no major cities data in MongoDB database, program will parse CSV file that PATH_MAJOR_CITIES_JSON points to.  
This file must contain SIZE_NUMBER,NAME (1,Helsinki).  
There is [a example file](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/master/database/major_cities.csv) that contains major cities of [Finland](https://en.wikipedia.org/wiki/Finland).

### Deploying

1. Make conf.js file to root of the project that has all field of [conf_EXAMPLE.js](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/master/conf_EXAMPLE.js) file.
2. Run command to build dependencies.
  * ``` npm install ```
3. Run command to start back end server.
  * ``` node server.js ```

### Dependencies

* [cors](https://github.com/expressjs/cors)
  * For communication with front end.
* [csv-parse](https://github.com/wdavidw/node-csv-parse)
  * For parsing major_cities.csv file.
* [express](https://github.com/expressjs/express)
  * For making calls simpler.
* [mongodb](https://github.com/mongodb/node-mongodb-native)
  * For making MongoDB queries.
* [traceur](https://github.com/google/traceur-compiler)
  * For adding support for ES5.
* [apicache](https://github.com/kwhitley/apicache)
  * For caching major cities.

### Credits and license

* Made by [Santeri Hetekivi](https://github.com/SanteriHetekivi) with association with projects front end developer [Anton Lehmus](https://github.com/AntonLehmus).
* Made for [Tampere University of Applied Sciences](http://www.tamk.fi/web/tamken).
* Made under organization [13i224HetekiviLehmus](https://github.com/13i224HetekiviLehmus).
* This code is licensed under [Apache License 2.0](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/server_documentation/server/LICENSE).
* This code is part of [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment).
