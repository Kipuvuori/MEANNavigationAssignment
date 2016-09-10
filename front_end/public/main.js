var navigationApp = angular.module('navigationApp', []);

// Allow cross domain request from web server through angular.js
navigationApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


navigationApp.controller('navigationController', function navigationController($scope, $http) {

  $scope.submitQuery = function() {
		$http({
		method: 'GET',
		url: 'http://vanillasky.local:8000/'+$scope.origin+'/'+$scope.destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				console.log(response.data);
				$scope.distance = response.data.distance;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			console.log('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}
});
