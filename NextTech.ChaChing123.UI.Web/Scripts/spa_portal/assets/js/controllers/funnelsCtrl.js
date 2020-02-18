'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('FunnelsManageCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.showSpinner = false;
        $scope.funnels = {};
        $scope.soloPages = {};

        function loadFunnels() {
            $scope.showSpinner = true;

            funnelsService.GetAllFunnalPage({ "UserName": username, "SessionKey": sessionKey },
                function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.funnels = result.data.Details;
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
        }

        function loadSoloPages() {
            $scope.showSpinner = true;

            editorService.getMyPages({ "UserName": username, "SessionKey": sessionKey },
                function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.soloPages = result.data.Details;
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
        }

        $scope.FunnelsManager = {
            init: function () {
                loadFunnels();
                loadSoloPages();
            }
        };

        $scope.FunnelsManager.init();

    }]);

app.controller('FunnelsLandingPageCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        console.log('this is list of solo pages');
    }]);
