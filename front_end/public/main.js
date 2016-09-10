var navigationApp = angular.module('navigationApp', []);

// Allow cross domain request from web server through angular.js
navigationApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


navigationApp.controller('navigationController', function navigationController($scope, $http) {

	var distance = null;

  $scope.submitQuery = function() {
		console.log('hello');
		distance = $this.distance;
		this.$http({
		method: 'GET',
		url: '/'+this.origin+'/'+this.destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				console.log(response.data);
				distance = response.data.distance;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			console.log('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}
});
