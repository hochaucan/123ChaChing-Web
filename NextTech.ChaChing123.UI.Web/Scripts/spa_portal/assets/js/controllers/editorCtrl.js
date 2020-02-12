'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('TabsEditorCtrl', ["$scope", "$localStorage", "editorService", "notificationService", function ($scope, $localStorage, editorService, notificationService) {
    var fullname = ($localStorage.currentUser) ? $localStorage.currentUser.fullname : "";
    var phone = ($localStorage.currentUser) ? $localStorage.currentUser.phone : "";

    $scope.affiliateInfo = {
        fullname: fullname,
        phone: phone
    };

    $scope.master = $scope.user;
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

                return;

            } else {
                var editor = {};

                editor = {
                    "headline": $scope.editor.headline,
                    "subheadline": $scope.editor.subheadline,
                    "buttonText": $scope.editor.buttonText,
                    "pageName": $scope.editor.pageName,
                    "urlDestination": $scope.editor.urlDestination
                };

                $scope.showSpinner = true;
                editorService.createSoloPage(editor, function (result) {
                    if (result.data && result.data.StatusCode == 0) {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displaySuccess('Đăng ký thành công');
                        $location.path('/app/home');
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
}]);