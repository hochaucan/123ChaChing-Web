'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('FunnelsDetailsPageCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        console.log('this is add funnels controller');
}]);