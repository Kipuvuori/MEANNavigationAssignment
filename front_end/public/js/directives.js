angular.module('navigationApp').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'map.svg',
        link: function (scope, element, attrs) {

        }
    }
}]);
