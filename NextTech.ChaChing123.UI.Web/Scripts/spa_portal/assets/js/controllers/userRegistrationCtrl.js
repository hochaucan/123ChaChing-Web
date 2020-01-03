'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserRegistrationCtrl', ['$scope', '$location', 'membershipService', function ($scope, $location, membershipService) {
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
                        var fullname = $scope.userReg.fullname;
                        var username = $scope.userReg.username;
                        var email = $scope.userReg.email;
                        var phone = $scope.userReg.phone;
                        var password = $scope.userReg.password;
                        var repassword = $scope.userReg.repassword;

                        console.log(fullname);
                        console.log(username);
                        console.log(email);
                        console.log(phone);
                        console.log(password);
                        console.log(repassword);

                        membershipService.register($scope.userReg, function (result) {
                            if (result.data.success) {
                                membershipService.saveCredentials($scope.user);
                                //notificationService.displaySuccess('Hello ' + $scope.user.username);
                                console.log('Hello' + $scope.userReg.username);
                                //$scope.userData.displayUserInfo();
                                $location.path('/');
                            }
                            else {
                                //notificationService.displayError('Registration failed. Try again.');
                                console.log('Registration failed. Try again.')
                            }
                        });
                    }

                }
            };
        }]);
})();
