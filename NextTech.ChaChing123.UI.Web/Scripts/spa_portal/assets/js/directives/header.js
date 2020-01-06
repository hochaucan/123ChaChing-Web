﻿/**
 * Section header Directive
 */
app.directive('rdHeader', function () {
    return {
        requires: '^rdSection',
        transclude: true,
        templateUrl: 'Scripts/spa_portal/assets/views/partials/header.html',
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
