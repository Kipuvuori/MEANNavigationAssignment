function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// App
define("PORT_APP", PORT_FOR_APP);

// Server
define("PORT_SERVER", PORT_FOR_SERVER);
// Mongo
define("DATABASE", NAME_OF_DATABASE);
define("SERVER_DATABASE", SERVER_YOUR_DATABASE);
define("PORT_DATABASE", PORT_FOR_DATABASE);
define("COLLECTION_ROUTES", NAME_FOR_ROUTES_COLLECTION);
define("COLLECTION_POINTS", NAME_FOR_POINTS_COLLECTION);
// GoogleAPI
define("API_KEY", GOOGLE_API_KEY_FOR_DIRECTIONS);
