'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserRegistrationCtrl', ['$scope', '$window', '$location', '$timeout', '$localStorage', 'membershipService', 'notificationService',
            function ($scope, $window, $location, $timeout, $localStorage, membershipService, notificationService) {
                $scope.master = $scope.user;
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
                            var userRegistration = {};

                            userRegistration = {
                                "fullname": $scope.userReg.fullname,
                                "username": $scope.userReg.username,
                                "email": $scope.userReg.email,
                                "phone": $scope.userReg.phone,
                                "password": $scope.userReg.password,
                                "accounttype": $scope.userReg.accounttype,
                                "refcode": $scope.userReg.refcode
                            };

                            $scope.showSpinner = true;
                            membershipService.register(userRegistration, function (result) {
                                if (result.data && result.data.StatusCode == 0) {
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 2000);
                                    notificationService.displaySuccess('Đăng ký thành công');
                                    $location.path('/app/home');
                                }
                                else {
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 2000);
                                    notificationService.displayError(result.data.StatusMsg);
                                }
                            });
                        }

                    }
                };

                $scope.initForm = {
                    init: function () {
                        if ($localStorage.refcodeVal == undefined || !$localStorage.refcodeVal) {
                            var search = $location.search();
                            $localStorage.refcodeVal = search;
                        }

                        var refObj = $localStorage.refcodeVal;
                        //Initial the account type for user
                        var accountType = 1;
                        //1. Handle register page when user signup via reference code URL

                        if (refObj.refcode && refObj.refcode.length > 0) {
                            var userRegistration = {};

                            userRegistration = {
                                "fullname": "",
                                "username": "",
                                "email": "",
                                "phone": "",
                                "password": "",
                                "accounttype": "",
                                "refcode": refObj.refcode //$scope.userReg.refcode <- before
                            };

                            $scope.userReg = userRegistration;

                            //2.1 if user is already logged, kick him out then redirect to register url
                            if (membershipService.isUserLoggedIn()) {
                                membershipService.removeCredentials();
                                $window.location.reload();
                                //$location.path('/app/login/signin?refcode=' + refObj.refcode);
                                //notificationService.displaySuccess("remove user's credential successfully");
                            } else {
                                //2.2 Trigger Registration Tab
                                $timeout(function () {
                                    angular.element('#registerTabID a').trigger('click');
                                }, 1000);
                            }

                            delete $localStorage.refcodeVal;
                            //membershipService.removeCredentials();
                            //$window.location.reload();
                            //$location.path('/app/login/signin');
                        }
                    }
                };

                $scope.initForm.init();
            }]);
})();
