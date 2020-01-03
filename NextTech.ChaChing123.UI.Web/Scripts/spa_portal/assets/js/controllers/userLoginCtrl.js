'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserLoginCtrl', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {
            $scope.master = $scope.user;
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
                        console.log("logint 1");
                        var username = $scope.user.username;
                        var password = $scope.user.password;
                        console.log($scope.user.username);
                        console.log($scope.user.password);
                        AuthenticationService.Login($scope.user, function (result) {
                            if (result === true) {
                                $location.path('/');
                            } else {
                                $scope.user.error = 'Email/Số Điện Thoại Không Hợp Lệ';
                                //vm.loading = false;
                            }
                        });
                    }

                }
            };

        }]);
})();
