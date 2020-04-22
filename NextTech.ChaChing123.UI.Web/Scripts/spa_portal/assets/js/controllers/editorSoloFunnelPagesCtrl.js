'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('EditorSoloFunnelPagesController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        $scope.active = false;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        $scope.tabs = [
            { heading: "Tạo Trang", route: "app.editor2.solo.add", active: false },
            { heading: "Quản Lý Trang", route: "app.editor2.solo.manage", active: false },
            { heading: "Tạo Trang Funnel", route: "app.editor2.funnels.add", active: true },
            { heading: "Quản Lý Trang Funnel", route: "app.editor2.funnels.manage", active: false },
            { heading: "Quản Lý AUTORESPONDER", route: "app.editor2.autoresponder.manage", active: false }
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