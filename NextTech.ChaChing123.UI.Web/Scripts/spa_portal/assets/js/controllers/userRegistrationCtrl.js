'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserRegistrationCtrl', ['$scope', '$location', '$localStorage', 'membershipService', 'notificationService', function ($scope, $location, $localStorage, membershipService, notificationService) {
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

                        var userRegistration = {};

                        userRegistration = {
                            "fullname": $scope.userReg.fullname,
                            "username": $scope.userReg.username,
                            "email": $scope.userReg.email,
                            "phone": $scope.userReg.phone,
                            "password": $scope.userReg.password,
                            "accounttype": $scope.userReg.accounttype,
                            "refcode": FormRegistration.refcode.placeholder //$scope.userReg.refcode <- before
                        };


                        membershipService.register(userRegistration, function (result) {
                            if (result.data && result.data.StatusCode == 0) {
                                notificationService.displaySuccess('Đăng ký thành công');
                                $location.path('/app/home');
                            }
                            else {
                                notificationService.displayError('Registration failed. Try again.');
                                //console.log('Registration failed. Try again.');
                            }
                        });
                    }

                }
            };
            $scope.initForm = {
                init: function () {
                    $scope.refcodeVal = "";
                    var refObj = $localStorage.refcodeVal;
                    if (refObj) {
                        $scope.refcodeVal = refObj.refcode;
                        delete $localStorage.refcodeVal;
                    }
                }
            }

            $scope.initForm.init();
        }]);
})();
