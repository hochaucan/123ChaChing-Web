'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('FunnelPreviewPublicPageCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "soloPageService", "funnelsService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, soloPageService, funnelsService, notificationService) {
        var funnelID = 0;
        var soloID = 0;
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var funnelView = "";
        $scope.isNextFunnel = false;
        $scope.nextFunnelPage = "";
        $scope.lead = {};
        var destinationURL = "";

        // /app/funnel/preview/58/183
        // locationURL[2] = preview OR public
        // locationURL[3] = ID

        var locationURL = $location.url().split('/');

        if (locationURL[2]) {
            funnelView = locationURL[2];
        }

        if (locationURL[3]) {
            funnelID = locationURL[3];
        }

        if (locationURL[4]) {
            soloID = locationURL[4];
        }

        $scope.formType = 1;
        $scope.soloPageDetails = {};
        var soloPageObj = {};


        soloPageObj = {
            "ID": funnelID,
            "UserName": username,
            "SessionKey": sessionKey
        };

        function formSubmit() {
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
                            "SoloID": soloID
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
        }

        function loadFunnelDetailsPublicPage() {
            soloPageObj = {
                "FunnalID": funnelID,
                "SoloID": soloID
            };

            funnelsService.GetFunnalDetailsPublicPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (!result.data.Details) {
                    $location.path('/error/404');
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.soloPageDetails = result.data.Details.SoloObj;
                    document.body.style.backgroundImage = "url('" + result.data.Details.SoloObj.BackgroundPath + "')";

                    var nextSoloID = result.data.Details.SoloObj.NextSoloID;
                    if (nextSoloID > 0) {
                        $scope.isNextFunnel = true;
                        $scope.nextFunnelPage = '#/funnel/public/' + funnelID + '/' + nextSoloID;
                    }
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function loadFunnelDetailsPreviewPage() {
            soloPageObj = {
                "FunnalID": funnelID,
                "SoloID": soloID,
                "UserName": username,
                "SessionKey": sessionKey
            };

            funnelsService.GetFunnalDetailsPreviewPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (!result.data.Details) {
                    $location.path('/error/404');
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.soloPageDetails = result.data.Details.SoloObj;
                    document.body.style.backgroundImage = "url('" + result.data.Details.SoloObj.BackgroundPath + "')";

                    funnelsService.GetDetailFunnalPage({ ID: funnelID, UserName: username, SessionKey: sessionKey }, function (result) {
                        if (result.data && result.data.StatusCode == 0) {
                            var soloIDList = result.data.Details.SoloIDList;
                            var soloPagesArr = soloIDList.split(',');
                            if (soloPagesArr.length > 0) {
                                var nextSoloID = getNextElement(soloID, soloPagesArr);
                                if (nextSoloID > 0) {
                                    $scope.isNextFunnel = true;
                                    $scope.nextFunnelPage = '#/funnel/preview/' + funnelID + '/' + nextSoloID;
                                }
                            }
                        }
                    });
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function getNextElement(value, soloPagesArray) {
            var nextItem = 0;
            var index = soloPagesArray.indexOf(value);
            if (index >= 0 && index < soloPagesArray.length - 1)
                nextItem = soloPagesArray[index + 1];

            return nextItem;
        }

        $scope.funnelPreviewPublicManager = {
            init : function () {
                formSubmit();
            },
            preview: function() {
                loadFunnelDetailsPreviewPage();
            },
            public: function () {
                loadFunnelDetailsPublicPage();
            }
        };

        $scope.funnelPreviewPublicManager.init();
        if (funnelView.length > 0 && funnelView == "preview") {
            $scope.funnelPreviewPublicManager.preview();
        } else {
            $scope.funnelPreviewPublicManager.public();
        }

    }]);