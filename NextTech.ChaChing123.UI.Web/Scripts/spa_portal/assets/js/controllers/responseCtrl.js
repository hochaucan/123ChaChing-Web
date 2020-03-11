'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('ReponseController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        $scope.active = false;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        $scope.tabs = [
            { heading: "Trả Lời Nhanh", route: "app.response.now", active: false },
            { heading: "Nhắn Tin Theo Kịch Bản", route: "app.response.script", active: false },
            { heading: "Xử Lý Sự Từ Chối", route: "app.response.rebuttal", active: true }
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