'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserLoginCtrl', ['$scope', '$rootScope', '$localStorage', '$location', 'membershipService', 'notificationService', function ($scope, $rootScope, $localStorage, $location, membershipService, notificationService) {
            //$scope.master = $scope.user;
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
                        //SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
                        //your code for submit
                        membershipService.login($scope.userLogin, loginCompleted);
                        function loginCompleted(result) {
                            if (result.data && result.data.StatusCode == 0) {
                                membershipService.saveCredentials(result.data.Details);
                                notificationService.displaySuccess('Đăng nhập thành công. Xin chào ' + $scope.userLogin.username);
                                $scope.userData.displayUserInfo();
                                if ($rootScope.previousState)
                                    $location.path($rootScope.previousState);
                                else
                                    $location.path('/');
                            }
                            else {
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        }
                    }
                    if ($localStorage && $localStorage.currentPackage) {
                        var currentPackage = $localStorage.currentPackage;
                        $('.nav-tabs > .active').next('li').find('a').trigger('click');
                    }
                }
            };            
        }]);
})();
