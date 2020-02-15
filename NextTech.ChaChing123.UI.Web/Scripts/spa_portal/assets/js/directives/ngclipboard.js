/*! ngclipboard - v2.0.0 - 2018-03-03
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2018 Sachin; Licensed MIT */
(function() {
    'use strict';
    var MODULE_NAME = 'ngclipboard';
    var angular, ClipboardJS;

    // Check for CommonJS support
    if (typeof module === 'object' && module.exports) {
      angular = require('angular');
      ClipboardJS = require('clipboard');
      module.exports = MODULE_NAME;
    } else {
      angular = window.angular;
      ClipboardJS = window.ClipboardJS;
    }

    angular.module(MODULE_NAME, []).directive('ngclipboard', ['$timeout', 'notificationService', function ($timeout, notificationService) {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function (scope, element) {
                //constructor for clipboardjs changed to ClipboardJS
                var clipboard = new ClipboardJS(element[0]);

                clipboard.on('success', function (e) {
                    scope.$apply(function () {
                        scope.ngclipboardSuccess({
                            e: e
                        });
                    });
                    notificationService.displaySuccess(e.trigger.innerText + " Thành Công");

                    $timeout(function () {
                        angular.element('#myModalGetLinkAffiliateCloseButton').trigger('click');
                    }, 1000);

                    if (e.trigger.innerText === "Copy Share Code") {
                        $timeout(function () {
                            angular.element('#myModalSoloPageShareCodeCloseButton').trigger('click');
                        }, 1000);
                    }
                    
                });

                clipboard.on('error', function (e) {
                    scope.$apply(function () {
                        scope.ngclipboardError({
                            e: e
                        });
                        notificationService.displaySuccess(e.trigger.innerText + " Không Thành Công");

                        $timeout(function () {
                            angular.element('#myModalGetLinkAffiliateCloseButton').trigger('click');
                        }, 1000);

                        if (e.trigger.innerText === "Copy Share Code") {
                            $timeout(function () {
                                angular.element('#myModalSoloPageShareCodeCloseButton').trigger('click');
                            }, 1000);
                        }
                    });
                });

                element.on('$destroy', function () {
                    clipboard.destroy();
                });

            }
        };
    }]);
})();
