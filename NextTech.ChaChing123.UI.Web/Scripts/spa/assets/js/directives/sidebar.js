/**
 * Widget Sidebar Directive
 */
app.directive('rdSidebar', function () {
    return {
        requires: '^rdSection',
        transclude: true,
        templateUrl: 'Scripts/spa/templates/sidebar.html',
        restrict: 'E',
        link: function (scope, iElement, iAttrs, controller, transcludeFn) {
            scope.title = iAttrs.title;
            scope.icon = iAttrs.icon;
            scope.hide = iAttrs.hide == 'true';
            scope.sectionShow = scope.$parent.sectionShow;
            iAttrs.$observe('title', function (value) {
                scope.title = value;
            });
        }
    };
});
