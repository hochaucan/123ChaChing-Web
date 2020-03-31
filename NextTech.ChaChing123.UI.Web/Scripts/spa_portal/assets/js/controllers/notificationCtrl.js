'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('NotificationController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        $scope.active = false;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        $scope.tabs = [
            { heading: "Tất Cả", route: "app.notification.all", active: true },
            { heading: "Hệ Thống", route: "app.notification.system", active: false },
            { heading: "Cá Nhân", route: "app.notification.newlead", active: false }
        ];

        $scope.go = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        //$scope.$on("$stateChangeSuccess", function () {
        //    $scope.tabs.forEach(function (tab) {
        //        tab.active = $scope.active(tab.route);
        //    });
        //});

        $scope.tabs.forEach(function (tab, index) {
            if (tab.route == routURL) {
                $scope.active = index;
                return;
            }
        });
       
    }]);