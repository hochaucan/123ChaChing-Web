'use strict';
/** 
  * controller for Validation Form example
*/

app.controller('AdminProfileProfileMasterCtrl', ["$scope",
    function ($scope) {
        $scope.imageUploaderPath = "";
        $scope.showSpinner = true;
    }]);

(function () {
    'use strict';
    //var myApp = angular.module('ChaChingApp', ['angular-spinkit']);
    angular
        .module('ChaChingApp')
        .controller('AdminProfileCtrl', ['$scope', '$window', '$rootScope', '$localStorage', '$location', '$timeout', 'membershipService', 'notificationService',
            function ($scope, $window, $rootScope, $localStorage, $location, $timeout, membershipService, notificationService) {
                var username = ($localStorage.currentUserAdmin) ? $localStorage.currentUserAdmin.username : "";
                var sessionKey = ($localStorage.currentUserAdmin) ? $localStorage.currentUserAdmin.token : "";
                $scope.showSpinner = false;

                function changeAdminPassword() {
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
                                var adminObj = {
                                    "AccountName": username,
                                    "OldPassword": $scope.userAdminChangePassword.currentPassword,
                                    "NewPassword": $scope.userAdminChangePassword.newPassword,
                                    "SessionKey": sessionKey
                                };

                                $scope.showSpinner = true;
                                membershipService.ChangePassword(adminObj, function (result) {
                                    if (result.data && result.data.StatusCode === 0) {
                                        notificationService.displaySuccess('Thay đổi mật khẩu mới thành công');

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
                        }
                    };
                }

                $scope.adminProfileManager = {
                    init: function () {
                        changeAdminPassword();
                    }
                };
                $scope.adminProfileManager.init();
            }]);
})();