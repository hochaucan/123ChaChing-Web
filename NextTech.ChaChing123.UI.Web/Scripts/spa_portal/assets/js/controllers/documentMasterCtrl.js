'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('DocumentMasterController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        $scope.active = false;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        $scope.tabs = [
            { heading: "Hướng Dẫn Sử Dụng", route: "app.document.usermanual", active: false },
            { heading: "Marketing Tổng Thể", route: "app.document.generalmarketing", active: false },
            { heading: "Marketing Cao Cấp", route: "app.document.advancedmarketing", active: true },
            { heading: "Khóa Học", route: "app.document.courses", active: false }
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