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
        $scope.showSpinner = true;
        $scope.leadTypes = {};
        $scope.affiliates = [];
        $scope.leadStatus = {};
        $scope.leadID = 0;

        function loadLeads(filter) {
            $scope.members = {};

            $scope.showSpinner = true;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var filterObj = {};
                        var keyword = "";
                        var leadType = "";
                        var leadStatus = "";
                        var leadName = "";

                        if (filter !== undefined) {
                            keyword = (filter.KeyWord && filter.KeyWord.length > 0) ? filter.KeyWord : "";
                            leadType = (filter.LeadType && filter.LeadType.length > 0) ? filter.LeadType : "";
                            leadStatus = (filter.LeadStatus && filter.LeadStatus.length > 0) ? filter.LeadStatus : "";
                            //leadName = (filter.Name && filter.Name.length > 0) ? filter.Name : "";
                        }

                        filterObj = {
                            "KeyWord": keyword,
                            "LeadType": leadType,
                            "LeadStatus": leadStatus,
                            "AffiliateAccount": "",
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        leadService.GetAllLeads(filterObj, function (result) {
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

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
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

        function doSearchingCustomer() {
            $scope.form = {
                submit: function (form) {
                    var firstError = null;
                    if (form.$invalid) {

                        var field = null, firstError = null;
                        for (field in form) {
                            if (field[0] != '$') {
                                if (firstError === null && !form[field].$valid) {
                                    firstError = form[field].$name;
                                }

                                if (form[field].$pristine) {
                                    form[field].$dirty = true;
                                }
                            }
                        }

                        angular.element('.ng-invalid[name=' + firstError + ']').focus();
                        //SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");

                        return;

                    } else {
                        var filter = {
                            "KeyWord": $scope.customer.KeyWord
                        };

                        loadLeads(filter);
                    }
                }
            };
        }

        $scope.doFilterOrder = function () {
            var filter = {
                "LeadType": $scope.lead.LeadType,
                "KeyWord": $scope.lead.Name,
                "LeadStatus": $scope.lead.LeadStatus
            };

            loadLeads(filter);
        };

        function loadLeadType() {
            $scope.leadTypes = [
                { LeadType: "1", LeadTypeName: 'Lạnh' },
                { LeadType: "2", LeadTypeName: 'Ấm' },
                { LeadType: "3", LeadTypeName: 'Nóng' }
            ];
        }

        function loadAffiliate() {
            $scope.showSpinner = true;

            var entity = {
                "PageIndex": "1",
                "PageCount": "9999",
                "SessionKey": sessionKey
            };

            // Load the data from the API
            leadService.GetAllLeads(entity, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    var leads = result.data.Details.Items;
                    var leadArr = [];

                    angular.forEach(leads, function (item, index) {
                        if (item.Name.length > 0) {
                            var lead = {
                                ID: item.ID,
                                Name: item.Name
                            };
                            leadArr.push(lead);
                        }
                    });

                    $scope.affiliates = removeDuplicates(leadArr, 'Name');

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject = {};

            for (var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for (i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }

        function loadLeadStatus() {
            $scope.leadStatus = [
                { Status: "0", StatusName: 'Chưa dùng' },
                { Status: "1", StatusName: 'Cơ bản' },
                { Status: "2", StatusName: 'Nâng cao' }
            ];
        }

        $scope.LeadManager = {
            init: function () {
                loadLeadType();
                loadAffiliate();
                loadLeadStatus();
                doSearchingCustomer();
                loadLeads();
            }
        };

        $scope.LeadManager.init();
    }]);