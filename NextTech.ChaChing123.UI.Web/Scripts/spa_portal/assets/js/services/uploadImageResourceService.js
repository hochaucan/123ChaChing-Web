(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('uploadImageResourceService', Service);

    function Service(apiService, $http, $rootScope, $timeout, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi;

        var service = {
            upload: upload
        };

        return service;

        function upload(data, updateProgress, transferComplete) {
            $scope.showSpinner = false;
            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", baseUrl + "api/LandingPage/UploadFile/");
            objXhr.send(data);   
        }

        // UPDATE PROGRESS BAR.
        function updateProgress(e) {
            if (e.lengthComputable) {
                //document.getElementById('pro').setAttribute('value', e.loaded);
                //document.getElementById('pro').setAttribute('max', e.total);
            }
        }

        // CONFIRMATION.
        function transferComplete(e, $scope, apiResponse) {
            //notificationService.displaySuccess("Upload file thành công");
            var result = JSON.parse(e.target.response);
            if (result.StatusCode === 0) {
                apiResponse = result.Details;
                notificationService.displaySuccess("Upload file thành công");

                $timeout(function () {
                    $scope.showSpinner = false;
                }, 1000);
            }
            else {
                notificationService.displaySuccess(result.StatusMsg);
                $scope.showSpinner = false;
            }
        }
    }

})();