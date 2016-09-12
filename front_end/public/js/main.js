var navigationApp = angular.module('navigationApp', []);


navigationApp.controller('navigationController', function navigationController($scope, $http) {

  $scope.submitQuery = function() {
		$http({
		method: 'GET',
		url: REST + '/'+$scope.origin+'/'+$scope.destination
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


});
