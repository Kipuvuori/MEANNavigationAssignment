var navigationApp = angular.module('navigationApp', []);


navigationApp.controller('navigationController', function navigationController($scope, $http, $log, $location) {

	var BASE_URL = $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER ;

  $scope.submitQuery = function() {
		$http({
		method: 'GET',
		url: BASE_URL + '/'+$scope.query_origin+'/'+$scope.query_destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				$log.debug(response.data);//for debug
				$scope.distance = response.data.distance;
				$scope.origin = $scope.query_origin;
				$scope.destination = $scope.query_destination;
				$scope.query_origin = null;
				$scope.query_destination = null;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			$log.error('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}

  var getCities = function() {
		$http({
		method: 'GET',
		url:BASE_URL + '/major_cities'
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
    	$log.debug(response.data);//for debug
			$scope.cities = response.data;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			$log.error('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
      $scope.cities = null;
		});
	}

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
