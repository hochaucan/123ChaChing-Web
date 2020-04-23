'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('CheckoutPaymentConfirmationCtrl', ["$scope", "$rootScope", "$location", "$window", "$localStorage", "$timeout", "$uibModal", "checkoutService", "membershipService", "notificationService",
    function ($scope, $rootScope, $location, $window, $localStorage, $timeout, $uibModal, checkoutService, membershipService, notificationService) {
        var sessionkey = $localStorage.currentUserRegistration ? $localStorage.currentUserRegistration.token : "";
        //url = https://123chaching.app/#/checkoutpayment/success?error_code=00&token=45035840353jflkdjfsd&order_code=545934095&order_id=534534

        var locationSplit = $location.url().split('?');
        var isCheckoutPaymentPage = false;
        var _error_code = "";
        var _token = 0;
        var _order_code = 0;
        var _order_id = 0;
        $scope.checkout_payment = {
            "type": "0"
        };

        if (locationSplit.length > 0) {
            isCheckoutPaymentPage = locationSplit[0].indexOf('checkoutpayment') === 1;
            if (isCheckoutPaymentPage) {
                var pairResponseValues = locationSplit[1]; // pairResponseValues = "error_code=00&token=45035840353jflkdjfsd&order_code=545934095&order_id=534534"
                // find value from list keys
                if (pairResponseValues !== undefined && pairResponseValues.length > 0) {
                    _error_code = getURLVar('error_code', pairResponseValues);
                    _token = getURLVar('token', pairResponseValues);
                    _order_code = getURLVar('order_code', pairResponseValues);
                    _order_id = getURLVar('order_id', pairResponseValues);
                }
            }
        }

        function getURLVar(key, query) {
            var value = [];

            if (query.length > 0) {
                var part = query.split('&');

                for (var i = 0, j = part.length; i < j; i++) {
                    var data = part[i].split('=');

                    if (data[0] && data[1]) {
                        value[data[0]] = data[1];
                    }
                }

                if (value[key]) {
                    return value[key];
                } else {
                    return '';
                }
            }
        }

        function getPaymentResponse() {
            if (_error_code.length > 0 && _token.length > 0 && _order_code.length > 0 && _order_id.length > 0) {
                var paymentResponse = {
                    "error_code": _error_code, //"00"
                    "token": _token, //"207880-ba82ea41b645c81101fc34fe0e38d029"
                    "order_code": _order_code, //"80583018",
                    "order_id": _order_id, //"207880",
                    "Type": _error_code === "00" ? "1" : "0", //"1": Success, "0": Error
                    "SessionKey": sessionkey //"c4cf56baac943ef392a57b58a218a16c"
                };

                $scope.checkout_payment = {
                    "type": _error_code === "00" ? "1" : "0"
                };

                $scope.showSpinner = true;
                // Load the data from the API
                checkoutService.UpdateCashInfoByNL(paymentResponse, function (result) {
                    if (result.data && result.data.StatusCode === 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode === 0) {
                        notificationService.displaySuccess(result.data.StatusMsg);

                        // Remove localStorage for user registration
                        membershipService.removeUserRegistration();

                        var baseUrl = $rootScope.baseUrl.url;
                        $timeout(function () {
                            $scope.showSpinner = false;
                            $window.location.href = baseUrl;
                        }, 3000);
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

        $scope.CheckoutPaymentConfirmationManager = {
            init: function () {
                getPaymentResponse();
            }
        };

        $scope.CheckoutPaymentConfirmationManager.init();
    }]);