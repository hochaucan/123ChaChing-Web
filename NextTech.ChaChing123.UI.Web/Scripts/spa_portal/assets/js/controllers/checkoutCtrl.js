'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var leadID = "";
var sessionKey = "";

app.controller('MasterCheckoutPaymentMethodCtrl', ["$scope", "$localStorage", "$location", "$timeout",
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

app.controller('CheckoutPaymentMethodCtrl', ["$scope", "$rootScope", "$location", "$window", "$localStorage", "$timeout", "$uibModal", "checkoutService", "membershipService", "notificationService",
    function ($scope, $rootScope, $location, $window, $localStorage, $timeout, $uibModal, checkoutService, membershipService, notificationService) {
        $scope.payment_method = {};
        $scope.isNLPocketShown = false;
        $scope.isDomesticBankCardShow = false;
        $scope.isViasMasterCardShow = false;

        $scope.changePaymentMethod = function (paymentTypeID) {
            switch (paymentTypeID) {
                case 1:
                    $scope.isNLPocketShown = true;
                    $scope.isDomesticBankCardShow = false;
                    $scope.isViasMasterCardShow = false;
                    break;
                case 2:
                    $scope.isNLPocketShown = false;
                    $scope.isDomesticBankCardShow = true;
                    $scope.isViasMasterCardShow = false;
                    break;
                case 3:
                    $scope.isNLPocketShown = false;
                    $scope.isDomesticBankCardShow = false;
                    $scope.isViasMasterCardShow = true;
                    break;
                default:
            }
        };

        function checkout() {
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
                        var sessionkey = $localStorage.currentUserRegistration ? $localStorage.currentUserRegistration.token : "";

                        var payment_option = {
                            "OptionPayment": $scope.payment_method.option_payment,
                            "BankCode": $scope.payment_method.bankcode,
                            "FullName": $scope.payment_method.Name,
                            "Email": $scope.payment_method.Email,
                            "Phone": $scope.payment_method.Phone,
                            "Amount": $scope.payment_method.Amount,
                            "Description": $scope.payment_method.Description,
                            "SessionKey": sessionkey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        checkoutService.SubmitPaymentToNL(payment_option, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                notificationService.displaySuccess(result.data.StatusMsg);

                                // Remove localStorage for user registration
                                membershipService.removeUserRegistration();

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                membershipService.removeUserRegistration();
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                            }
                        });
                    }
                }
            };
        }

        function loadUserRegistration() {
            var userReg = $localStorage.currentUserRegistration;
            var accountType = $localStorage.currentUserRegistration ? $localStorage.currentUserRegistration.accountType : "";
            var amount = 0;
            if (accountType.length > 0) {
                switch (accountType) {
                    case "1":
                        amount = 5997000;
                        break;
                    case "2":
                        amount = 8997000;
                        break;
                    default:
                }
            }

            if (userReg !== undefined) {
                $scope.payment_method = {
                    "Name": userReg.fullname,
                    "Email": userReg.email,
                    "Phone": userReg.phone,
                    "Amount": amount
                };
            }
        }

        $scope.CheckoutPaymentMethodManager = {
            init: function () {
                loadUserRegistration();
                checkout();
            }
        };

        $scope.CheckoutPaymentMethodManager.init();
    }]);