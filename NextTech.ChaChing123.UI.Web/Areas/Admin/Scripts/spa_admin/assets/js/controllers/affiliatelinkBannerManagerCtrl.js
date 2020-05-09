'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('AffiliateLinkBannerManagerCtrl', ["$scope", "$rootScope", "$localStorage", "$timeout", "affiliatelinkBannerService", "membershipService", "notificationService",
    function ($scope, $rootScope, $localStorage, $timeout, affiliatelinkBannerService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        var imageUploaderPathPrev = "";
        $scope.imagePath = "";
        var baseUrl = $rootScope.baseUrl.urlWebApi;

        function loadBanners() {
            var entity = {
                "SessionKey": sessionKey
            };
            // Load the data from the API
            $scope.showSpinner = true;
            affiliatelinkBannerService.GetBannerLink(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.imagePath = result.data.Details;
                    // TODO -  current this api doesn't work properly so need to put the variable as empty
                    //imageUploaderPathPrev = result.data.Details;
                    imageUploaderPathPrev = "";

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function uploadBanner() {
            // GET THE FILE INFORMATION.
            $scope.getFileDetails = function (e) {
                $scope.showSpinner = true;
                $scope.imagePath = "";
                $scope.files = [];
                $scope.$apply(function () {

                    // STORE THE FILE OBJECT IN AN ARRAY.
                    for (var i = 0; i < e.files.length; i++) {
                        $scope.files.push(e.files[i]);
                    }
                });

                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();

                for (var i in $scope.files) {
                    data.append("uploadedFile", $scope.files[i]);
                    if ($scope.files[i].name) {
                        data.append("OldLink", imageUploaderPathPrev);
                        data.append("SessionKey", sessionKey);
                        break;
                    }
                }

                // ADD LISTENERS.
                var objXhr = new XMLHttpRequest();
                $scope.showSpinner = true;
                objXhr.addEventListener("progress", updateProgress, false);
                objXhr.addEventListener("load", transferComplete, false);

                // SEND FILE DETAILS TO THE API.
                // As Is Upload File
                //objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
                objXhr.open("POST", baseUrl + "/api/Admin/UploadFileAffiliateLink/");
                objXhr.send(data);
            };

            // UPDATE PROGRESS BAR.
            function updateProgress(e) {
                if (e.lengthComputable) {
                    //document.getElementById('pro').setAttribute('value', e.loaded);
                    //document.getElementById('pro').setAttribute('max', e.total);
                }
            }

            // CONFIRMATION.
            function transferComplete(e) {
                //notificationService.displaySuccess("Upload file thành công");
                var result = JSON.parse(e.target.response);
                if (result.StatusCode === 0) {
                    imageUploaderPath = result.Details;
                    
                    $scope.isCompletedImageUpload = true;
                    notificationService.displaySuccess("Upload hình ảnh thành công");
                    // Reset the previous image to be empty because it's been already removed away from server
                    imageUploaderPathPrev = result.Details;

                    $timeout(function () {
                        $scope.showSpinner = false;
                        $scope.imagePath = result.Details;
                    }, 1000);
                }
                else {
                    notificationService.displaySuccess(result.StatusMsg);
                    $scope.showSpinner = false;
                }
            }
        }

        $scope.AffiliateLinkBannerManager = {
            init: function () {
                loadBanners();
                uploadBanner();
            }
        };

        $scope.AffiliateLinkBannerManager.init();
    }]);