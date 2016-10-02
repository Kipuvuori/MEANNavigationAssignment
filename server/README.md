# Server (back end) of the project

## Returns asked data to [front end](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment/tree/master/front_end) side of [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment) project.

### Usage

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
  {"_id":"57cc813da607eba20d2b943c","no":4,"name":"Vantaa","lat":60.29335239999999,"lng":25.0377686},
  {"_id":"57cc813da607eba20d2b943a","no":5,"name":"Oulu","lat":65.0120888,"lng":25.4650773},
  {"_id":"57cc813da607eba20d2b9439","no":6,"name":"Turku","lat":60.4518126,"lng":22.2666303},
  {"_id":"57cc813da607eba20d2b9437","no":7,"name":"Jyväskylä","lat":62.2426034,"lng":25.7472567},
  {"_id":"57cc813da607eba20d2b943b","no":8,"name":"Lahti","lat":60.98267490000001,"lng":25.6612096},
  {"_id":"57cc813da607eba20d2b943e","no":9,"name":"Kuopio","lat":62.89796999999999,"lng":27.6781725},
  {"_id":"57cc813da607eba20d2b9440","no":10,"name":"Kouvola","lat":60.8678835,"lng":26.7041601},
  {"_id":"57cc813da607eba20d2b9441","no":11,"name":"Pori","lat":61.4851393,"lng":21.7974178},
  {"_id":"57cc813da607eba20d2b943f","no":12,"name":"Joensuu","lat":62.6010155,"lng":29.7635719},
  {"_id":"57cc813da607eba20d2b9445","no":13,"name":"Lappeenranta","lat":61.05499289999999,"lng":28.1896628},
  {"_id":"57cc813da607eba20d2b9444","no":14,"name":"Hämeenlinna","lat":60.9928787,"lng":24.4590243},
  {"_id":"57cc813da607eba20d2b9443","no":15,"name":"Vaasa","lat":63.09508899999999,"lng":21.6164564},
  {"_id":"57cc813da607eba20d2b9442","no":16,"name":"Rovaniemi","lat":66.50394779999999,"lng":25.7293905},
  {"_id":"57cc813da607eba20d2b9448","no":17,"name":"Seinäjoki","lat":62.794543,"lng":22.8278264},
  {"_id":"57cc813da607eba20d2b9449","no":18,"name":"Salo","lat":60.3909372,"lng":23.1354809},
  {"_id":"57cc813da607eba20d2b9446","no":19,"name":"Kotka","lat":60.4665666,"lng":26.9459403},
  {"_id":"57cc813da607eba20d2b9447","no":20,"name":"Mikkeli","lat":61.68872709999999,"lng":27.2721457},
  {"_id":"57cc813da607eba20d2b944d","no":21,"name":"Porvoo","lat":60.3931919,"lng":25.6652739},
  {"_id":"57cc813da607eba20d2b944a","no":22,"name":"Kokkola","lat":63.8384908,"lng":23.1304813},
  {"_id":"57cc813da607eba20d2b944b","no":23,"name":"Hyvinkää","lat":60.62995249999999,"lng":24.8580797},
  {"_id":"57cc813da607eba20d2b944c","no":24,"name":"Nurmijärvi","lat":60.46381049999999,"lng":24.8075808},
  {"_id":"57cc813da607eba20d2b944f","no":25,"name":"Lohja","lat":60.251176,"lng":24.0674709},
  {"_id":"57cc813da607eba20d2b9452","no":26,"name":"Rauma","lat":61.1308854,"lng":21.5059264},
  {"_id":"57cc813da607eba20d2b944e","no":27,"name":"Järvenpää","lat":60.47380399999999,"lng":25.0899135},
  {"_id":"57cc813da607eba20d2b9450","no":28,"name":"Kajaani","lat":64.2270558,"lng":27.7286008},
  {"_id":"57cc813da607eba20d2b9451","no":29,"name":"Tuusula","lat":60.4004159,"lng":25.0213065},
  {"_id":"57cc813da607eba20d2b9455","no":30,"name":"Kirkkonummi","lat":60.12349320000001,"lng":24.4412965},
  {"_id":"57cc813da607eba20d2b9453","no":31,"name":"Kerava","lat":60.4009878,"lng":25.1020384},
  {"_id":"57cc813da607eba20d2b9454","no":32,"name":"Nokia","lat":61.4803094,"lng":23.501203},
  {"_id":"57cc813da607eba20d2b9456","no":33,"name":"Kaarina","lat":60.4071689,"lng":22.3682407},
  {"_id":"57cc813da607eba20d2b9457","no":34,"name":"Ylöjärvi","lat":61.5495294,"lng":23.5960504},
  {"_id":"57cc813da607eba20d2b9458","no":35,"name":"Kangasala","lat":61.4637146,"lng":24.0718436},
  {"_id":"57cc813da607eba20d2b9459","no":36,"name":"Raseborg","lat":59.97443730000001,"lng":23.4355071},
  {"_id":"57cc813da607eba20d2b945b","no":37,"name":"Riihimäki","lat":60.73849370000001,"lng":24.7728925},
  {"_id":"57cc813da607eba20d2b945a","no":38,"name":"Imatra","lat":61.17138449999999,"lng":28.7651478},
  {"_id":"57cc813da607eba20d2b945d","no":39,"name":"Vihti","lat":60.4165735,"lng":24.3256379},
  {"_id":"57cc813da607eba20d2b945c","no":40,"name":"Savonlinna","lat":61.8679728,"lng":28.8863842},
  {"_id":"57cc813da607eba20d2b945f","no":41,"name":"Sastamala","lat":61.3415589,"lng":22.9097127},
  {"_id":"57cc813da607eba20d2b945e","no":42,"name":"Raisio","lat":60.48590629999999,"lng":22.1689573},
  {"_id":"57cc813da607eba20d2b9461","no":43,"name":"Varkaus","lat":62.31188169999999,"lng":27.8778704},
  {"_id":"57cc813da607eba20d2b9460","no":44,"name":"Jämsä","lat":61.8638263,"lng":25.1896173},
  {"_id":"57cc813da607eba20d2b9462","no":45,"name":"Kemi","lat":65.73556789999999,"lng":24.5657427},
  {"_id":"57cc813da607eba20d2b9463","no":46,"name":"Raahe","lat":64.6846329,"lng":24.4790186},
  {"_id":"57cc813da607eba20d2b9464","no":47,"name":"Tornio","lat":65.8444927,"lng":24.1527255},
  {"_id":"57cc813da607eba20d2b9465","no":48,"name":"Iisalmi","lat":63.557773,"lng":27.1917194},
  {"_id":"57cc813da607eba20d2b9466","no":49,"name":"Hollola","lat":60.9887015,"lng":25.5163229},
  {"_id":"57cc813da607eba20d2b9467","no":50,"name":"Hamina","lat":60.56920280000001,"lng":27.1938458},
  {"_id":"57cc813da607eba20d2b9468","no":51,"name":"Siilinjärvi","lat":63.0736826,"lng":27.661883},
  {"_id":"57cc813da607eba20d2b9469","no":52,"name":"Valkeakoski","lat":61.2649926,"lng":24.0310372},
  {"_id":"57cc813da607eba20d2b946a","no":53,"name":"Lempäälä","lat":61.3141111,"lng":23.7524484},
  {"_id":"57cc813da607eba20d2b946b","no":54,"name":"Äänekoski","lat":62.6040125,"lng":25.7266691},
  {"_id":"57cc813da607eba20d2b946c","no":55,"name":"Heinola","lat":61.2041941,"lng":26.0381555},
  {"_id":"57cc813da607eba20d2b946d","no":56,"name":"Mäntsälä","lat":60.6372789,"lng":25.3187153},
  {"_id":"57cc813da607eba20d2b946e","no":57,"name":"Pieksämäki","lat":62.2977017,"lng":27.1458161},
  {"_id":"57cc813da607eba20d2b946f","no":58,"name":"Jakobstad","lat":63.6742439,"lng":22.712569},
  {"_id":"57cc813da607eba20d2b9470","no":59,"name":"Haukipudas","lat":65.1762807,"lng":25.3531972},
  {"_id":"57cc813da607eba20d2b9472","no":60,"name":"Naantali","lat":60.46608759999999,"lng":22.0250873}
]
```

### Setting major cities.

If there are no major cities data in MongoDB database, program will parse CSV file that PATH_MAJOR_CITIES_JSON points to.  
This file must contain SIZE_NUMBER,NAME (1,Helsinki).  
There is [a example file](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/master/database/major_cities.csv) that contains major cities of [Finland](https://en.wikipedia.org/wiki/Finland).

### Deploying

 * Make conf.js file to root of the project that has all field of [conf_EXAMPLE.js](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/master/conf_EXAMPLE.js) file.
 * Run command to build dependencies.
  * ``` npm install ```
 * Run command to start back end server.
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

### Credits and license.

* Made by [Santeri Hetekivi](https://github.com/SanteriHetekivi) with association with projects front end developer [Anton Lehmus](https://github.com/AntonLehmus).
* Made for [Tampere University of Applied Sciences](http://www.tamk.fi/web/tamken).
* Made under organization [13i224HetekiviLehmus](https://github.com/13i224HetekiviLehmus).
* This code is licensed under [Apache License 2.0](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/server_documentation/server/LICENSE).
* This code is part of [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment).
