/**
 * Widget Header Directive
 */
/*
angular
    .module('RDash')
    .directive('rdWidgetHeader', rdWidgetTitle);

function rdWidgetTitle() {
    var directive = {
        requires: '^rdWidget',
        /*
        scope: {
            title: '@',
            icon: '@'
        },*//*
        transclude: true,
        templateUrl: 'templates/directives/widget-header.html',
        //template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        restrict: 'E',
        link : function (scope, iElement, iAttrs, controller, transcludeFn) {
          scope.title = iAttrs.title;
          scope.icon = iAttrs.icon;
          scope.requireWidgetShow = iAttrs.hide == 'true';
          scope.widgetShow = scope.$parent.widgetShow;
          iAttrs.$observe('title', function(value){
          scope.title = value;
          });
      }
    };
    return directive;
};
*/

app.directive('rdWidgetHeader', function() {
    return {
      requires: '^rdWidget',
      /*
      scope: {
          title: '@',
          icon: '@'
      },*/
      transclude: true,
      templateUrl: 'templates/directives/widget-header.html',
      //template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
      restrict: 'E',
      link : function (scope, iElement, iAttrs, controller, transcludeFn) {
        scope.title = iAttrs.title;
        scope.icon = iAttrs.icon;
        scope.requireWidgetShow = iAttrs.hide == 'true';
        scope.widgetShow = scope.$parent.widgetShow;
        iAttrs.$observe('title', function(value){
        scope.title = value;
        });
    }
    };
});
