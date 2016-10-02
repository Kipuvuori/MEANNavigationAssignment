# Database of the project

Simple MongoDB database for [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment) project.

## Structure

Example:
1. Database
  1. Collection
    * Definition  

Real:
1. mean_navigation
  1. major_cities
    * Contains major cities for fast usage.
    * Cities are parsed from .csv file and coordinates got from Google.
      ```json
      {
        "_id" : ObjectId("57cc813da607eba20d2b9436"),
        "no" : 2,
        "name" : "Espoo",
        "lat" : 60.2054911,
        "lng" : 24.6559001
      }
      ```
  1. routes (optional)
    * **Not used in current version!**
    * Contains routes between points.
    ```json
    {
        "_id" : ObjectId("57cb1775421539c328e67196"),
        "origin" : "Helsinki",
        "destination" : "Pirkkala",
        "distance" : 183645
      }
      ```
  1. points (optional)
    * **Not used in current version!**
    * Contains points for the routes.
    * Links to route with route_id.
    ```json
    {
        "_id" : ObjectId("57cb1a9f571ea8a32a968924"),
        "lat" : 60.1683,
        "lng" : 24.9349203,
        "distance" : 284,
        "order_num" : 1,
        "route_id" : ObjectId("57cb1a9f571ea8a32a968923")
    }
    ```

### Credits and license.

* Made by [Santeri Hetekivi](https://github.com/SanteriHetekivi) with association with projects front end developer [Anton Lehmus](https://github.com/AntonLehmus).
* Made for [Tampere University of Applied Sciences](http://www.tamk.fi/web/tamken).
* Made under organization [13i224HetekiviLehmus](https://github.com/13i224HetekiviLehmus).
* This code is licensed under [Apache License 2.0](https://raw.githubusercontent.com/13i224HetekiviLehmus/MEANNavigationAssignment/server_documentation/server/LICENSE).
* This code is part of [MEANNavigationAssignment](https://github.com/13i224HetekiviLehmus/MEANNavigationAssignment).
