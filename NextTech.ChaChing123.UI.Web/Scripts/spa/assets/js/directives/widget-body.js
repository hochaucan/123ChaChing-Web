/**
 * Widget Body Directive
 */
/*
angular
    .module('RDash')
    .directive('rdWidgetBody', rdWidgetBody);

function rdWidgetBody() {
  var directive = {
      requires: '^rdWidget',
      transclude: true,
      template: '<div class="widget-body" ng-class="classes" ng-show="widgetShow"><rd-loading ng-show="isLoading"></rd-loading><div ng-hide="isLoading" class="widget-content" ng-transclude></div></div>',
      restrict: 'E',
      link : function (scope, iElement, iAttrs, controller, transcludeFn) {
        scope.classes = iAttrs.classes;
        scope.widgetShow = scope.$parent.widgetShow;
        scope.isLoading = iAttrs.isloading == 'true';
        iAttrs.$observe('isloading', function(value){
          scope.isLoading = value == 'true';
          });
      }
  };
  return directive;
};*/

app.directive('rdWidgetBody', function() {
    return {
      requires: '^rdWidget',
      transclude: true,
      template: '<div class="widget-body" ng-class="classes" ng-show="widgetShow"><rd-loading ng-show="isLoading"></rd-loading><div ng-hide="isLoading" class="widget-content" ng-transclude></div></div>',
      restrict: 'E',
      link : function (scope, iElement, iAttrs, controller, transcludeFn) {
        scope.classes = iAttrs.classes;
        scope.widgetShow = scope.$parent.widgetShow;
        scope.isLoading = iAttrs.isloading == 'true';
        iAttrs.$observe('isloading', function(value){
          scope.isLoading = value == 'true';
          });
      }
    };
});
