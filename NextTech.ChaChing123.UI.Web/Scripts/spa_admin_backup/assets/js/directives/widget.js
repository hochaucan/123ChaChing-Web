/**
 * Widget Directive
 */
/*
angular
    .module('RDash')
    .directive('rdWidget', rdWidget);

function rdWidget() {
    var directive = {
    transclude: true,
    scope: {
        mode: '@'
    },
    template: '<div class="widget {{mode}}" ng-transclude></div>',
    controller: function ($scope) {
      $scope.widgetShow = true;
    },
    restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {

    }
};
*/

app.directive('rdWidget', function() {
    return {
      transclude: true,
      scope: {
          mode: '@'
      },
      template: '<div class="widget {{mode}}" ng-transclude></div>',
      controller: function ($scope) {
        $scope.widgetShow = true;
      },
      restrict: 'EA'
    };
});
