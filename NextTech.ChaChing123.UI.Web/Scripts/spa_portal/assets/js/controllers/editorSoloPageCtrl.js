'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('editorSoloPageCtrl', ["$scope", "$location", "$localStorage", "$timeout", "editorService", "soloPageService", "notificationService",
    function ($scope, $location, $localStorage, $timeout, editorService, soloPageService, notificationService) {
        var ID = 0;
        var UserName = "";
        var SessionKey = "";

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
        
        $scope.formType = 4;
        $scope.soloPageDetails = {};
        var soloPageObj = {};

        if (ID.length > 0 && UserName.length > 0 && SessionKey.length > 0) {
            soloPageObj = {
                "ID": ID,
                "UserName": UserName,
                "SessionKey": SessionKey
            };

            console.log(ID);
            console.log(UserName);
            console.log(SessionKey);

            soloPageService.loadSoloPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 0) {
                    $scope.soloPageDetails = result.data.Details;
                    $scope.formType = result.data.Details.FromType;
                    $scope.Title = result.data.Details.Title;
                    $scope.SubTitle = result.data.Details.SubTitle;
                    $scope.ButtonName = result.data.Details.ButtonName;
                    $scope.ButtonColor = result.data.Details.ButtonColor;
                    document.body.style.backgroundImage = "url('" + baseUrl + "/UploadFile/" + result.data.Details.BackgroundPath + "')";
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        } else {
            var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
            var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
            soloPageObj = {
                "ID": ID,
                "UserName": username,
                "SessionKey": sessionKey
            };

            editorService.loadMyPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 0) {
                    $scope.soloPageDetails = result.data.Details;
                    $scope.formType = result.data.Details.FromType;
                    $scope.Title = result.data.Details.Title;
                    $scope.SubTitle = result.data.Details.SubTitle;
                    $scope.ButtonName = result.data.Details.ButtonName;
                    $scope.ButtonColor = result.data.Details.ButtonColor;
                    document.body.style.backgroundImage = "url('" + baseUrl + "/UploadFile/" + result.data.Details.BackgroundPath + "')";
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }
        
    }]);