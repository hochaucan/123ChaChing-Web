'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('editorSoloPageCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "soloPageService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, soloPageService, notificationService) {
        var ID = 0;
        var UserName = "";
        var SessionKey = "";
        var destinationURL = "";
        $scope.lead = {};
        var soloPageObj = {};

        var locationURL = $location.url().split('/');
        if (locationURL[3]) {
            ID = locationURL[3];
        }

        if (locationURL[4] && locationURL[4].length > 0) {
            UserName = locationURL[4];
        }

        if (locationURL[5] && locationURL[5].length > 0) {
            SessionKey = locationURL[5];
        }

        $scope.soloPageManager = {
            init: function () {
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
                            //notificationService.displayInfo('You are submitting the form');

                            var leadRes = {
                                "Name": ($scope.lead.name) ? $scope.lead.name : "",
                                "Email": ($scope.lead.email) ? $scope.lead.email : "",
                                "Phone": ($scope.lead.phone) ? $scope.lead.phone : "",
                                "SoloID": ID
                            };

                            destinationURL = angular.element('#refLink').val();

                            $scope.showSpinner = true;
                            // Load the data from the API
                            editorService.RegisterLeadBySoloPage(leadRes, function (result) {
                                if (result.data && result.data.StatusCode == 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode == 0) {
                                    notificationService.displaySuccess('Đăng ký thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất');
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        if (destinationURL && destinationURL.length > 0) {
                                            $window.open(destinationURL, '_blank');
                                        }
                                    }, 1000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 2000);
                                }
                            });
                        }

                    }
                };
            },
            previewSoloPage : function () {
                $scope.formType = 4;
                $scope.soloPageDetails = {};
                
                soloPageObj = {
                    "ID": ID,
                    "UserName": UserName,
                    "SessionKey": SessionKey
                };

                soloPageService.loadSoloPage(soloPageObj, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (!result.data.Details) {
                        $location.path('/error/404');
                        return;
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.soloPageDetails = result.data.Details;
                        $scope.formType = result.data.Details.FromType;
                        $scope.Title = result.data.Details.Title;
                        $scope.SubTitle = result.data.Details.SubTitle;
                        $scope.ButtonName = result.data.Details.ButtonName;
                        $scope.ButtonColor = result.data.Details.ButtonColor;
                        document.body.style.backgroundImage = "url('" + result.data.Details.BackgroundPath + "')";
                    }
                    else {
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            },
            publicSoloPage: function () {
                soloPageObj = {
                    "ID": ID
                };

                editorService.GetDetailSoloPageByID(soloPageObj, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (!result.data.Details) {
                        $location.path('/error/404');
                        return;
                    }

                    if (result.data && result.data.StatusCode == 0) {

                        $scope.soloPageDetails = result.data.Details;
                        $scope.formType = result.data.Details.FromType;
                        $scope.Title = result.data.Details.Title;
                        $scope.SubTitle = result.data.Details.SubTitle;
                        $scope.ButtonName = result.data.Details.ButtonName;
                        $scope.ButtonColor = result.data.Details.ButtonColor;
                        document.body.style.backgroundImage = "url('" + result.data.Details.BackgroundPath + "')";
                    }
                    else {
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            }
        };

        $scope.soloPageManager.init();

        if (ID > 0 && UserName.length > 0 && SessionKey.length > 0) {
            $scope.soloPageManager.previewSoloPage();
        } else {
            $scope.soloPageManager.publicSoloPage();
        }
}]);