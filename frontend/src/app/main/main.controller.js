export class MainController {
	constructor ($http,$log) {
	'ngInject';

		this.$http = $http;
		this.$log = $log;

		this.distance = null;
	}

	submitQuery(){


		var parent = this;

		this.$http({
		method: 'GET',
		url: 'http://192.168.1.148:8000/'+this.origin+'/'+this.destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				console.log(response.data);
				parent.distance = response.data.distance;
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			console.log('error:  '+response.status+'('+response.statusText+')'+' '+response.data);
		});
	}

}
