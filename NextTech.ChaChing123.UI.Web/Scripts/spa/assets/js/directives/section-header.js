/**
 * Section header Directive
 */
/*
angular
	    .module('RDash')
	    .directive('rdSectionHeader', rdSectionTitle);

function rdSectionTitle() {
    var directive = {
        requires: '^rdSection',
        transclude: true,
        templateUrl: 'templates/directives/section-header.html',
        restrict: 'E',
        link : function (scope, iElement, iAttrs, controller, transcludeFn) {
        	scope.title = iAttrs.title;
        	scope.icon = iAttrs.icon;
        	scope.hide = iAttrs.hide == 'true';
        	scope.sectionShow = scope.$parent.sectionShow;
        	iAttrs.$observe('title', function(value){
        		scope.title = value;
            });
        }
    };
    return directive;
};*/

app.directive('rdSectionHeader', function() {
    return {
			requires: '^rdSection',
			transclude: true,
			templateUrl: 'Scripts/spa/templates/directives/section-header.html',
			restrict: 'E',
			link : function (scope, iElement, iAttrs, controller, transcludeFn) {
				scope.title = iAttrs.title;
				scope.icon = iAttrs.icon;
				scope.hide = iAttrs.hide == 'true';
				scope.sectionShow = scope.$parent.sectionShow;
				iAttrs.$observe('title', function(value){
					scope.title = value;
					});
			}
    };
});
