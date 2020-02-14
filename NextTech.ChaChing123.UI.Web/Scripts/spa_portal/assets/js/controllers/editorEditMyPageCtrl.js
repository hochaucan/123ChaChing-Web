'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('EditMyPageCtrl', ["$scope", "$window", "$localStorage", "$timeout", "editorService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, editorService, notificationService) {
        $scope.master = $scope.user;
        $scope.showSpinner = false;
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";

        var ID = 86;

        $scope.myPage = {};
        $scope.isPublicLink = true;

        var userObj = {
            UserName: username,
            SessionKey: sessionKey
        };

        $scope.showSpinner = true;

        function loadMyPage() {

            $scope.showSpinner = false;

            editorService.loadMyPage(userObj, function (result) {
                if (result.data && result.data.StatusCode == 0) {
                    $scope.myPage = result.data.Details;
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
                else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });

            apiService.get('/api/movies/details/' + $routeParams.id, null,
                movieLoadCompleted,
                movieLoadFailed);
        }

        loadMyPage();
        //editorService.getMyPages(userObj, function (result) {
        //    if (result.data && result.data.StatusCode == 0) {
        //        $scope.myPages = result.data.Details;
        //        $timeout(function () {
        //            $scope.showSpinner = false;
        //        }, 2000);
        //    }
        //    else {
        //        $timeout(function () {
        //            $scope.showSpinner = false;
        //        }, 2000);
        //        notificationService.displayError(result.data.StatusMsg);
        //    }
        //});
    }]);