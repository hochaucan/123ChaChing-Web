'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';
    //var myApp = angular.module('ChaChingApp', ['angular-spinkit']);
    angular.module('ChaChingApp').controller('UserLoginCtrl', ['$scope', '$rootScope', '$localStorage', '$location', '$timeout', 'membershipService', 'notificationService',
        function ($scope, $rootScope, $localStorage, $location, $timeout, membershipService, notificationService) {
            function doLogin() {
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
                            $scope.showSpinner = true;
                            membershipService.login($scope.userLogin, function (result) {
                                if (result.data && result.data.StatusCode === 0) {
                                    membershipService.saveCredentials(result.data.Details);
                                    notificationService.displaySuccess('Đăng nhập thành công. Xin chào ' + result.data.Details.FullName);
                                    $scope.userData.displayUserInfo();

                                    $scope.showSpinner = false;
                                    if ($rootScope.previousState && $rootScope.previousState != '/app/login/signin')
                                        $location.path($rootScope.previousState);
                                    else
                                        $location.path('/app/home');
                                } else {
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 1000);

                                    notificationService.displayError(result.data.StatusMsg);
                                }
                            });
                        }
                        if ($localStorage && $localStorage.currentPackage) {
                            var currentPackage = $localStorage.currentPackage;
                            $('.nav-tabs > .active').next('li').find('a').trigger('click');
                        }
                    }
                };
            }

            function doLoginByAdmin() {
                var username = "";
                var sessionkey = "";
                var isAdminLogging = ($location.url().indexOf('dologin') !== -1) ? true : false;

                if (isAdminLogging) {
                    var parts = $location.url().split('/');
                    var len = parts.length;
                    if (len > 0) {
                        username = parts[len - 2];
                        sessionkey = parts[len - 1];
                    }

                    if (username.length > 0 && sessionkey.length > 0) {
                        var entity = {
                            "UserName": username,
                            "SessionKey": sessionkey
                        };

                        $scope.showSpinner = true;
                        membershipService.SetDefautAccount(entity, function (result) {
                            if (result.data && result.data.StatusCode === 0) {
                                membershipService.saveCredentials(result.data.Details);
                                notificationService.displaySuccess('Đăng nhập thành công. Xin chào ' + result.data.Details.FullName);
                                $scope.userData.displayUserInfo();

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);

                                if ($rootScope.previousState && $rootScope.previousState !== '/app/login/signin')
                                    $location.path($rootScope.previousState);
                                else
                                    $location.path('/app/home');
                            } else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);

                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                    }
                }
            }

            $scope.UserLoginManager = {
                init: function () {
                    doLogin();
                    doLoginByAdmin();
                }
            };

            $scope.UserLoginManager.init();
        }]);
})();
