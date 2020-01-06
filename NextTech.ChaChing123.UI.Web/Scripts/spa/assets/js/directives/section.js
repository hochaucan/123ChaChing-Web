/**
 * Section Directive
 */
/*
angular
	    .module('RDash')
	    .directive('rdSection', rdSection);
function rdSection() {
    var directive = {
        transclude: true,
        scope: {
            mode: '@',
            initialShow: '@'
        },
        template: '<div class="section" ng-transclude></div>',
        controller: function ($scope) {
        	if (!$scope.initialShow) $scope.initialShow = 'false';
        	$scope.sectionShow = $scope.initialShow == 'false';
        },
        restrict: 'EA'
    };
    return directive;
};*/

app.directive('rdSection', function() {
    return {
			transclude: true,
			scope: {
					mode: '@',
					initialShow: '@'
			},
			template: '<div class="section" ng-transclude></div>',
			controller: function ($scope) {
				if (!$scope.initialShow) $scope.initialShow = 'false';
				$scope.sectionShow = $scope.initialShow == 'false';
			},
			restrict: 'E'
    };
});
