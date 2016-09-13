var navigationApp = angular.module('navigationApp', ['nemLogging','ui-leaflet']);



navigationApp.controller('navigationController', function navigationController($scope, $http, $log, $location) {

	var BASE_URL = $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER ;

	angular.extend($scope,{
	    center: {
	        lat: 62.2426,
	        lng: 25.7473,
	        zoom: 5,

	    },
			defaults: {
			minZoom: 4,
			maxZoom: 8,
			path: {
				weight: 8,
				color: '#ff0000',
				opacity: 1
			 },
		 },
		 routePaths:{
			 main_path:{
			 color: 'red',
			 latlngs: []
		 },
	 }
	});

	/*
	*Query back end for distance between cities
	*Set $scope.distance to query result.
	*/
  $scope.submitQuery = function() {
		$http({
		method: 'GET',
		url: BASE_URL + '/'+$scope.query_origin+'/'+$scope.query_destination
		}).then(function successCallback(response) {
			$log.debug(response.data);//for debug

			//set result
			$scope.distance = response.data.distance;

			//add path to map
			angular.forEach(response.data.points, function(point) {
				$scope.routePaths.main_path.latlngs.push({lat: point.lat, lng: point.lng});
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
    	$log.debug(response.data);//for debug
			$scope.cities = response.data;
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
			$scope.submitQuery();
		}
	}


  getCities();
});
