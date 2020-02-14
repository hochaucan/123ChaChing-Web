'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('editorSoloPageCtrl', ["$scope", "$location", "$localStorage", "$timeout", "soloPageService", "notificationService",
    function ($scope, $location, $localStorage, $timeout, soloPageService, notificationService) {
        var ID = $location.url().split('/')[3];
        var UserName = $location.url().split('/')[4];
        var SessionKey = $location.url().split('/')[5];

        $scope.formType = 4;
        $scope.soloPageDetails = {};

        var soloPageObj = {
            "ID": ID,
            "UserName": UserName,
            "SessionKey": SessionKey
        };

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
    }]);