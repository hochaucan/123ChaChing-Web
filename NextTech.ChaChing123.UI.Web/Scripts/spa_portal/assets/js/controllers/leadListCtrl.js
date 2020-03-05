'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('ngTableLeadListCtrl', ["$scope", "$uibModal", "$window", "$location", "$localStorage", "$timeout", "ngTableParams", "leadService", "membershipService", "notificationService",
    function ($scope, $uibModal, $window, $location, $localStorage, $timeout, ngTableParams, leadService, membershipService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.showSpinner = false;
        $scope.leads = {};
        $scope.leadID = 0;

        function loadLeads() {
            $scope.members = {};

            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var memberObj = {};

                        memberObj = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        leadService.GetAllLeadsByAccount(memberObj, function (result) {
                            if (result.data && result.data.StatusCode == 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode == 0) {
                                //var data = result.data.Details.Items;
                                $scope.leads = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);
                            } else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                    }
                });
        }

        $scope.viewLeadDetails = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalViewLeadDetails.html',
                controller: 'ModalViewLeadDetailsCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.target.attributes.data.value;
                    }
                }
            });
        };

        $scope.LeadManager = {
            init: function () {
                loadLeads();
            }
        };

        $scope.LeadManager.init();
    }]);

app.controller('ModalViewLeadDetailsCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "$uibModalInstance", "items", "ngTableParams", "leadService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, $uibModalInstance, items, ngTableParams, leadService, membershipService, notificationService) {
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var leadID = 0;
        leadID = items;
        $scope.leads = {};

        $scope.ok = function () {

        };

        $scope.showSpinner = false;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadLeadsDetails() {
            $scope.lead = {};
            $scope.showSpinner = true;
            // Load the data from the API
            var lead = {
                "ID": leadID,
                "SessionKey": sessionKey
            };

            leadService.GetLeadsDetailByAccount(lead, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.lead = result.data.Details;
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.LeadsManager = {
            init: function () {
                loadLeadsDetails();
            }
        };

        $scope.LeadsManager.init();
    }]);