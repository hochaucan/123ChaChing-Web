/*
angular
	    .module('RDash')
	    .directive('rdSectionBody', rdSectionBody);
function rdSectionBody() {
    var directive = {
        requires: '^rdSection',
        transclude: true,
        template: '<div class="section-body" ng-class="classes" ng-show="sectionShow"><rd-loading ng-show="isLoading"></rd-loading><div ng-hide="isLoading" class="section-content" ng-transclude></div></div>',
        restrict: 'E',
        link : function (scope, iElement, iAttrs, controller, transcludeFn) {
        	scope.classes = iAttrs.classes;
        	scope.sectionShow = scope.$parent.sectionShow;
        	scope.isLoading = iAttrs.isloading == 'true';
        	iAttrs.$observe('isloading', function(value){
        		scope.isLoading = value == 'true';
            });
        }
    };
    return directive;
};*/
app.directive('rdSectionBody', function() {
    return {
			requires: '^rdSection',
			transclude: true,
			template: '<div class="section-body" ng-class="classes" ng-show="sectionShow"><rd-loading ng-show="isLoading"></rd-loading><div ng-hide="isLoading" class="section-content" ng-transclude></div></div>',
			restrict: 'E',
			link : function (scope, iElement, iAttrs, controller, transcludeFn) {
				scope.classes = iAttrs.classes;
				scope.sectionShow = scope.$parent.sectionShow;
				scope.isLoading = iAttrs.isloading == 'true';
				iAttrs.$observe('isloading', function(value){
					scope.isLoading = value == 'true';
					});
			}
    };
});
