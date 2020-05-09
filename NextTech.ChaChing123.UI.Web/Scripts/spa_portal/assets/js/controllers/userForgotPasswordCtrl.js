'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    app.controller('UserForgotPasswordCtrl', ['$scope', '$rootScope', '$window', '$location', '$timeout', '$localStorage', 'membershipService', 'notificationService',
        function ($scope, $rootScope, $window, $location, $timeout, $localStorage, membershipService, notificationService) {
            $scope.master = $scope.user;
            $scope.showSpinner = false;

            function initForm() {
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
                            var userForgotPasswordObj = {
                                "Email": $scope.userForgotPassword.username
                            };

                            $scope.showSpinner = true;
                            membershipService.RegisterForgetPassword(userForgotPasswordObj, function (result) {
                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess('Vui lòng kiểm tra email. Bạn sẽ nhận được email cấp lại mật khẩu mới nếu địa chỉ email của bạn là hợp lệ');
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        //$location.path('app/forgot_finish');
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

                    }
                };
            }

            $scope.ForgotPasswordManager = {
                init: function () {
                    initForm();
                }
            };

            $scope.ForgotPasswordManager.init();

        }]);

    app.controller('UserForgotFinishPasswordCtrl', ['$scope', '$rootScope', '$window', '$location', '$timeout', '$localStorage', 'commonService', 'membershipService', 'notificationService',
        function ($scope, $rootScope, $window, $location, $timeout, $localStorage, commonService, membershipService, notificationService) {
            $scope.master = $scope.user;
            $scope.showSpinner = false;
            $scope.userForgotPassword = {};
            var _username = "";
            var _activecode = "";

            function getUserInfo() {
                var isHasParams = $location.url().indexOf('?') !== -1;
                if (isHasParams) {
                    var locationSplit = $location.url().split('?');
                    var isForgotFinishPage = false;

                    if (locationSplit.length > 0) {
                        isForgotFinishPage = locationSplit[0].indexOf('forgot_finish') !== -1;
                        if (isForgotFinishPage) {
                            var pairResponseValues = locationSplit[1]; // username=0933058984&activatecode=95411054
                            // find value from list keys
                            if (pairResponseValues !== undefined && pairResponseValues.length > 0) {
                                _username = commonService.getURLVar('username', pairResponseValues);
                                _activecode = commonService.getURLVar('activatecode', pairResponseValues);
                            }
                        }
                    }
                }

                $scope.userForgotPassword = {
                    'username': _username,
                    'activatekey': _activecode
                };
            }

            function initForm() {
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
                            var userForgotFinishPasswordObj = {
                                "UserName": $scope.userForgotPassword.username,
                                "ActiveCode": $scope.userForgotPassword.activatekey,
                                "NewPassword": $scope.userForgotPassword.password
                            };

                            $scope.showSpinner = true;
                            membershipService.ActiveAccountByForgetPassword(userForgotFinishPasswordObj, function (result) {
                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess('Bạn đã tạo lại mật khẩu mới thành công');
                                    //$timeout(function () {
                                    //    $scope.showSpinner = false;
                                    //    //$location.path('app/login/signin');
                                    //    var baseUrl = $rootScope.baseUrl.url;
                                    //    var signInUrl = baseUrl + '#/app/login/signin';
                                    //    $window.location.href = signInUrl;
                                    //}, 1000);

                                    membershipService.saveCredentials(result.data.Details);
                                    notificationService.displaySuccess('Đăng nhập thành công. Xin chào ' + result.data.Details.FullName);
                                    $scope.userData.displayUserInfo();

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 1000);

                                    if ($rootScope.previousState && $rootScope.previousState !== '/app/login/signin') {
                                        $location.path($rootScope.previousState);
                                    } else {
                                        //$location.path('/app/dashboard');
                                        var baseUrl = $rootScope.baseUrl.url;
                                        var dashboardUrl = baseUrl + '#/app/dashboard';
                                        $window.location.href = dashboardUrl;
                                    }
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
            }

            $scope.ForgotFinishPasswordManager = {
                init: function () {
                    getUserInfo();
                    initForm();
                }
            };

            $scope.ForgotFinishPasswordManager.init();

        }]);
})();
