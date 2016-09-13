var navigationApp = angular.module('navigationApp', []);


navigationApp.controller('navigationController', function navigationController($scope, $http, $log, $location) {

  $scope.submitQuery = function() {
		$http({
		method: 'GET',
		url: $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER + '/'+$scope.origin+'/'+$scope.destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				console.log(response.data);//for debug
				$scope.distance = response.data.distance;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			console.log('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}

  var getCities = function() {
		$http({
		method: 'GET',
		url: $location.protocol() + "://" + $location.host() + ":" + PORT_SERVER + '/major_cities'
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
    console.log(response.data);//for debug

				$scope.cities = response.data;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			console.log('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
      $scope.cities = null;

		});
	}


  getCities();
});
