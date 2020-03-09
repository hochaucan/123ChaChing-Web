'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('LeadAddEditCtrl', ["$scope", "$uibModal", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $uibModal, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        // JSON ARRAY TO POPULATE TABLE.

        $scope.addNewLead = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalAddNewLead.html',
                controller: 'ModalAddNewLeadCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

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

app.controller('ModalAddNewLeadCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "$uibModalInstance", "items", "ngTableParams", "leadService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, $uibModalInstance, items, ngTableParams, leadService, membershipService, notificationService) {
        $scope.leads = {};

        $scope.ok = function () {

        };

        $scope.showSpinner = false;
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
                    var lead = {};
                    var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                    var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                    lead = {
                        "Name": $scope.lead.Name,
                        "Email": $scope.lead.Email,
                        "Phone": $scope.lead.Phone,
                        "LeadsType": $scope.lead.LeadsType,
                        "Notes": $scope.lead.Notes,
                        "SessionKey": sessionkey
                    };

                    $scope.showSpinner = true;
                    // Load the data from the API
                    leadService.AddLeadsByAccount(lead, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            notificationService.displaySuccess(result.data.StatusMsg);
                            $window.location.reload();
                        } else {
                            notificationService.displayError(result.data.StatusMsg);
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 1000);
                        }
                        $uibModalInstance.dismiss('cancel');
                    });
                }
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadLeadsType() {
            $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        }

        $scope.LeadsManager = {
            init: function () {
                loadLeadsType();
            }
        };

        $scope.LeadsManager.init();
    }]);