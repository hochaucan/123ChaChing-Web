'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('FunnelPublicPageCtrl', ["$scope", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "soloPageService", "funnelsService", "notificationService",
    function ($scope, $location, $localStorage, $timeout, membershipService, editorService, soloPageService, funnelsService, notificationService) {
        var ID = 0;
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        var locationURL = $location.url().split('/');
        if (locationURL[3]) {
            ID = locationURL[3];
        }

        $scope.formType = 4;
        $scope.soloPageDetails = {};
        var soloPageObj = {};


        soloPageObj = {
            "ID": ID,
            "UserName": username,
            "SessionKey": sessionKey
        };

        funnelsService.GetDetailFunnalPage(soloPageObj, function (result) {
            if (result.data && result.data.StatusCode == 17) {
                membershipService.checkMemberAuthorization();
            }

            if (result.data && result.data.StatusCode == 0) {
                var soloIDsStr = result.data.Details.SoloIDList;
                var pickupFirstSoloPageID = 0;
                if (soloIDsStr.length > 0) {
                    pickupFirstSoloPageID = soloIDsStr.split(',')[0];
                    if (pickupFirstSoloPageID > 0) {
                        editorService.GetDetailSoloPageByID({ "ID": pickupFirstSoloPageID }, function (result) {
                            if (result.data && result.data.StatusCode == 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode == 0) {
                                if (result.data.Details && result.data.Details.ID > 0) {
                                    $scope.soloPageDetails = result.data.Details;
                                    $scope.formType = result.data.Details.FromType;
                                    $scope.Title = result.data.Details.Title;
                                    $scope.SubTitle = result.data.Details.SubTitle;
                                    $scope.ButtonName = result.data.Details.ButtonName;
                                    $scope.ButtonColor = result.data.Details.ButtonColor;
                                    document.body.style.backgroundImage = "url('" + baseUrl + "/UploadFile/" + result.data.Details.BackgroundPath + "')";
                                } else {
                                    $location.path('/error/404')
                                }
                            }
                            else {
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                    }
                }
            }
            else {
                notificationService.displayError(result.data.StatusMsg);
            }
        });

    }]);