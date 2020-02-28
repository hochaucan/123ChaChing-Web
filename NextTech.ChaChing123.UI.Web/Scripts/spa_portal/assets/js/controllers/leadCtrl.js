'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('leadsManageCtrl', ["$scope", "$uibModal", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $uibModal, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.showSpinner = false;
        $scope.leads = {};

        function loadLeads() {
            $scope.showSpinner = true;

            leadService.GetAllLeads({ "UserName": username, "SessionKey": sessionKey },
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

        $scope.LeadManager = {
            init: function () {
                loadLeads();
            }
        };

        $scope.LeadManager.init();
}]);