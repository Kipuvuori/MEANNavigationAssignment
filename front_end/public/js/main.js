var navigationApp = angular.module('navigationApp', ['nemLogging','ui-leaflet']);



navigationApp.controller('navigationController',[ '$scope', '$http', '$log', '$location','leafletData', function navigationController($scope, $http, $log, $location, leafletData) {

	var BASE_URL = $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER ;

	//default marker
	$scope.routeMarker = {
	lat: 0,
	lng: 0,
	focus: true,
	message: "This is default message. You shouldn't see this",
	draggable: false,
	};

	//default marker
	$scope.cityMarker = {
	lat: 0,
	lng: 0,
	focus: false,
	message: "This is default message. You shouldn't see this",
	draggable: false,
	opacity: 0.8,
	icon: {}
	};


	var icons = {
		blue: {
			type: 'div',
			iconSize: [12, 12],
			className: 'blue',
			iconAnchor:  [6, 6]
		},
	}

	//initialize leaflet map
	angular.extend($scope,{
	    center: {
	        lat: 62.2426,
	        lng: 25.7473,
	        zoom: 5,
	    },
			defaults: {
			minZoom: 5,
			maxZoom: 10,
			dragging: true,
			tap: true,
			path: {
				weight: 12,
				color: '#23De23',
				opacity: 0.7
			 },
		 },
		 markers:{
    },
		 routePaths:{
		 },
		 awesomeMarkerIcon: {
			 type: 'awesomeMarker',
			 icon: 'tag',
			 markerColor: 'red'
		 },
	});

	/*
	*Query back end for distance between cities
	*Set $scope.distance to query result.
	*/
  $scope.submitQuery = function() {

		$scope.markers = {};

		$http({
		method: 'GET',
		url: BASE_URL + '/'+$scope.query_origin+'/'+$scope.query_destination
		}).then(function successCallback(response) {

			//set result
			$scope.distance = response.data.distance;

			//set route message
			$scope.routePaths = {
				main_path:{
					message: "<h3>"+$scope.query_origin+" - "+ $scope.query_destination+"</h3><p>Etäisyys: "+$scope.distance/1000+"km</p>",
					latlngs: []
				}
			};

			angular.forEach(response.data.points, function(point) {
				//add path to map
				$scope.routePaths.main_path.latlngs.push({lat: point.lat, lng: point.lng});

				//crate marker for node
				createMarker(point.lat,point.lng,point.name,point.distance);
			});

			//save queried origin and destination
			$scope.origin = $scope.query_origin;
			$scope.destination = $scope.query_destination;
			//initalize query variables for new query
			$scope.query_origin = null;
			$scope.query_destination = null;

		},

		function errorCallback(response) {
			$log.error('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}

	/*
	*Gets all available cities from back end asynchronously.
	*Sets response to cities array.
	*/
  var getCities = function() {
		$http({
		method: 'GET',
		url:BASE_URL + '/major_cities'
		}).then(function successCallback(response) {
			$scope.cities = response.data;
			createCityMarkers();
		},
		function errorCallback(response) {
			$log.error('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
      $scope.cities = null;
		});
	}

	/*
	*Set query origin and destination on cityBtn click
	*Submit query when both values are set and aren't the same
	*
	*@paramn string cityName
	*/
	$scope.cityBtnClick = function(cityName){
		if($scope.query_origin == null){
			$scope.query_origin = cityName;
		}
		else if($scope.query_destination == null && $scope.query_origin != cityName)
		{
			$scope.query_destination = cityName;
			$scope.markers = {}; //remove cityMarkers
			$scope.submitQuery();
		}
	}

	/*
	*Create new marker and add it to markers object
	*
	*@paramn double lat, double lng, string name, double dist
	*/
	var createMarker = function(lat,lng,name,dist){
		var marker = angular.copy($scope.cityMarker);
		marker.lat = lat;
		marker.lng = lng;
		marker.message = name+" "+Math.round(dist/1000,2)+"km";
		$scope.markers[name] = marker;
	}

	/*
	*Create markers for each city
	*
	*/
	var createCityMarkers = function(){
		angular.forEach($scope.cities, function(city) {
			var marker = angular.copy($scope.cityMarker);
			marker.lat = city.lat;
			marker.lng = city.lng;
			marker.message = city.name;
			marker.focus = false;

			marker.icon = $scope.awesomeMarkerIcon;
			marker.icon.icon='glyphicon glyphicon-road';

			$scope.markers[city.name] = marker;
		});
	}

	/*
	* On marker click
	* add city name to query
	*
	*/
	$scope.$on('leafletDirectiveMarker.click', function(e, args) {
		//don't register click when route is drawn
		if($scope.distance === null)
		{
			$scope.cityBtnClick(args.modelName);
		}
	});


	/*
	* Clear route and markers related to it
	*
	*/
	$scope.clearRoute = function(){
		$scope.markers = {};
		$scope.routePaths = {};

		$scope.distance = null;

		createCityMarkers();
	}

	var disableScrolling = function(){
		leafletData.getMap().then(function(map){
			map.dragging.disable();
		});
	}

	//get available cities on app start
  getCities();
	$scope.distance = null;
}]);
