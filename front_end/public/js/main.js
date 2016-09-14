var navigationApp = angular.module('navigationApp', ['nemLogging','ui-leaflet']);



navigationApp.controller('navigationController', function navigationController($scope, $http, $log, $location) {

	var BASE_URL = $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER ;

	$scope.mainMarker = {
	lat: 0,
	lng: 0,
	focus: true,
	message: "This is default message. You shouldn't see this",
	draggable: false
	};


	//initialize leaflet map
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
				weight: 12,
				color: '#23De23',
				opacity: 0.7
			 },
		 },
		 markers:{
    },
		 routePaths:{
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
			$log.debug("response"+response.data);//for debug

			//set result
			$scope.distance = response.data.distance;

			//reset last route
			$scope.routePaths = {
				main_path:{
					message: "<h3>"+$scope.query_origin+" - "+ $scope.query_destination+"</h3><p>Etäisyys: "+$scope.distance/1000+"km</p>",
					latlngs: []
				}
			};

			angular.forEach(response.data.points, function(point) {
				//add path to map
				$scope.routePaths.main_path.latlngs.push({lat: point.lat, lng: point.lng});

				//crate markers
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

	var createMarker = function(lat,lng,name,dist){
		var marker = angular.copy($scope.mainMarker);
		marker.lat = lat;
		marker.lng = lng;
		marker.message = name+" "+dist;
		$scope.markers[name] = marker;
		$log.debug("Markers:"+$scope.markers);
	}


  getCities();
});
