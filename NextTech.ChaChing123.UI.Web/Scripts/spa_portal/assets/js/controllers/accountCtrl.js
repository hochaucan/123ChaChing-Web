'use strict';
/**
 * controllers for Account components
 */
(function () {
    'use strict';
    angular
        .module('ChaChingApp')
        .controller('accountCtrl', ['$scope', '$rootScope', '$state', 'accountResource', function ($scope, $rootScope, $state, accountResource) {
            $scope.isLoading = true;
            $scope.submitted = false;
            $scope.isLoading = false;
            console.log("inside 1");

            var appResource = new accountResource();

            // -----------------------------------------------------------
            // ------------------------ ADD FORM ------------------------
            // -----------------------------------------------------------

            // function to submit the add form after all validation has occurred            
            $scope.login = function () {
                console.log("inside");
                $scope.submitted = true;
                // check to make sure the form is completely valid
                if ($scope.userLoginForm.$valid) {
                    // disabled button to prevent double click
                    $scope.isLoading = true;
                    $scope.buttonAddDisabled = true;

                    // assign input form data to appResource
                    appResource.UserName = $scope.user.username;
                    appResource.Password = $scope.user.password;
                    // http post add
                    appResource.$add().then(function (data) {
                        // if success
                        if (data.success) {
                            //$scope.toggleModalAddForm();
                            sucMsg = 'You have successfully login';
                            $scope.alerts = [{
                                type: 'success',
                                msg: sucMsg
                            }];
                        } else {
                            // assign the error  messgae
                            var errMsg = data.obj.StatusMsg;
                            $("#alertMessage").text(errMsg);
                            // show the alert error message panel
                            $('#alertErrorMessageContainer').show();
                        }
                        $scope.buttonAddDisabled = false;
                        $scope.isLoading = false;

                    }, function errorCallback(response) {
                        //code for what happens when there's an error
                        // assign the error  messgae
                        var errMsg = "E0003C: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
                        $scope.alerts = [{
                            type: 'danger',
                            msg: errMsg
                        }];
                        $("#alertMessage").text(errMsg);
                        // show the alert error message panel
                        $('#alertErrorMessageContainer').show();
                        $scope.buttonAddDisabled = false;
                        $scope.isLoading = false;

                    });
                } else {
                    //alert("E0004: There are invalid entries. Please check again.")
                }
            }
        }]);
})();