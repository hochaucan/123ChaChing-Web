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
                                    notificationService.displaySuccess('Bạn sẽ nhận được email cấp lại mật khẩu mới nếu địa chỉ email của bạn là hợp lệ');
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $location.path('app/forgot_finish');
                                    }, 1000);
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

    app.controller('UserForgotFinishPasswordCtrl', ['$scope', '$rootScope', '$window', '$location', '$timeout', '$localStorage', 'membershipService', 'notificationService',
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
                            var userForgotFinishPasswordObj = {
                                "UserName": $scope.userForgotPassword.username,
                                "ActiveKey": $scope.userForgotPassword.activatekey,
                                "NewPassword": $scope.userForgotPassword.password
                            };

                            $scope.showSpinner = true;
                            membershipService.ActiveAccountByForgetPassword(userForgotFinishPasswordObj, function (result) {
                                if (result.data && result.data.StatusCode === 0) {
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        notificationService.displaySuccess('Bạn đã tạo lại mật khẩu mới thành công');
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

            $scope.ForgotFinishPasswordManager = {
                init: function () {
                    initForm();
                }
            };

            $scope.ForgotFinishPasswordManager.init();

        }]);
})();
