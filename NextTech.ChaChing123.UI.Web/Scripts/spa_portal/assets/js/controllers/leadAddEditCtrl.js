'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('LeadAddEditCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        // JSON ARRAY TO POPULATE TABLE.

        function loadLeads() {
            $scope.showSpinner = true;
        }

        $scope.soloPageManager = {
            init: function () {
                loadLeads();
            }
        };

        $scope.soloPageManager.init();
    }]);