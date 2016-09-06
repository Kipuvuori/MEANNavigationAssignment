export class MainController {
	constructor ($http,$log) {
	'ngInject';

		this.$http = $http;
		this.$log = $log;
	}

	submitQuery(){
		this.$http({
		method: 'GET',
		url: 'http://localhost:8000/'+this.origin+'/'+this.destination
		}).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
				this.$log.debug(response.data);
		},
		function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			this.$log.error(response.status+'('+response.statusText+')'+' '+response.data);
		});
	}

}
