'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';
    //var myApp = angular.module('ChaChingApp', ['angular-spinkit']);
    angular
        .module('ChaChingApp')
        .controller('UserLoginCtrl', ['$scope', '$rootScope', '$localStorage', '$location', '$timeout', 'membershipService', 'notificationService', function ($scope, $rootScope, $localStorage, $location, $timeout, membershipService, notificationService) {
            //$scope.master = $scope.user;
            //$scope.searchButtonText = "Đăng Nhập";
            //$scope.isLoading = false;
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
                            if (result.data && result.data.StatusCode == 0) {
                                //$scope.isLoading = false;
                                membershipService.saveCredentials(result.data.Details);
                                notificationService.displaySuccess('Đăng nhập thành công. Xin chào ' + $scope.userLogin.username);
                                $scope.userData.displayUserInfo();

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 2000);

                                if ($rootScope.previousState)
                                    $location.path($rootScope.previousState);
                                else
                                    $location.path('/');
                            } else {
                                //$scope.isLoading = false;

                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 2000);

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
        }]);
})();
