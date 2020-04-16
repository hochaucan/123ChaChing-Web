'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var leadID = "";
var sessionKey = "";

app.controller('MasterContactUsCtrl', ["$scope", "$localStorage", "$location", "$timeout",
    function ($scope, $localStorage, $location, $timeout) {
        function initCommonInfoProcessing() {
            sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        }

        $scope.MemberDetailsManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('ContactUsCtrl', ["$scope", "$rootScope", "$location", "$window", "$localStorage", "$timeout", "$uibModal", "contactUsService", "membershipService", "notificationService",
    function ($scope, $rootScope, $location, $window, $localStorage, $timeout, $uibModal, contactUsService, membershipService, notificationService) {
        $scope.lead = {};
        $scope.LeadTypes = [];

        function contactUsForm() {
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
                        var contact = {};
                        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                        contact = {
                            "Name": $scope.contact.Name,
                            "Email": $scope.contact.Email,
                            "Phone": $scope.contact.Phone,
                            "Content": $scope.contact.Message,
                            "SessionKey": sessionkey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        contactUsService.AddContactInfo(contact, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                notificationService.displaySuccess(result.data.StatusMsg);

                                // TODO: Reset contact us form

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                            }
                        });
                    }
                }
            };
        }

        $scope.ContactUsManager = {
            init: function () {
                contactUsForm();
            }
        };

        $scope.ContactUsManager.init();
    }]);