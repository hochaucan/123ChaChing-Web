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
        var sessionKey = ($localStorage.currentUserAdmin) ? $localStorage.currentUserAdmin.token : "";
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
                        leadService.GetAllLeads(memberObj, function (result) {
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

                                $scope.getClassForLeadsType = function (LeadStatus) {
                                    if (LeadStatus == 0) // NA
                                        return "badge badge-info";
                                    else if (LeadStatus == 1) // Lạnh
                                        return "badge badge-default";
                                    else if (LeadStatus == 2) // Ấm
                                        return "badge badge-warning";
                                    else if (LeadStatus == 3) // Nóng
                                        return "badge badge-danger";
                                };

                                $scope.getClassForLeadStatus = function (LeadStatus) {
                                    if (LeadStatus == 0) // Chưa dùng
                                        return "badge badge-inverse label label-inverse";
                                    else if (LeadStatus == 1) // Cơ bản
                                        return "badge badge-default label label-default";
                                    else if (LeadStatus == 2) // Nâng cao
                                        return "badge badge-warning label label-warning";
                                };
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

        $scope.LeadManager = {
            init: function () {
                loadLeads();
            }
        };

        $scope.LeadManager.init();
    }]);