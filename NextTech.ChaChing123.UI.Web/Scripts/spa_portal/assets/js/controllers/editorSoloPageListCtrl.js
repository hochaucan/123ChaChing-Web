'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('ngTableSoloPageListCtrl', ["$scope", "$location", "$uibModal", "$window", "$localStorage", "$timeout", "ngTableParams", "membershipService", "editorService", "notificationService",
    function ($scope, $location, $uibModal, $window, $localStorage, $timeout, ngTableParams, membershipService, editorService, notificationService) {
        $scope.soloPageID = 0;

        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        $scope.myPages = {};
        $scope.isPublicLink = true;
        $scope.showSpinner = true;

        function loadMyPages() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var soloPageObj = {};
                        soloPageObj = {
                            "UserName": username,
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        editorService.getMyPages(soloPageObj, function (result) {
                            if (result.data && result.data.StatusCode == 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode == 0) {
                                //var data = result.data.Details.Items;
                                $scope.myPages = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);

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
                });
        }

        $scope.manageMyPages = {
            init: function () {
                loadMyPages();
            }
        };

        $scope.manageMyPages.init();

        $scope.deleteSoloPage = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalDeleteSoloPage.html',
                controller: 'ModalDeleteSoloPageCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.soloPageID = size.target.attributes.data.value;
                        return $scope.soloPageID;
                    }
                }
            });
        };
        $scope.shareSoloPageCode = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalGenerateSharedCode.html',
                controller: 'ModalGenerateSharedCodeCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.soloPageID = size.target.attributes.data.value;
                        return $scope.soloPageID;
                    }
                }
            });
        };
        $scope.goToDestinationLink = function (url, status) {
            if (status == 2)
                $window.open(url, '_blank');
            else
                notificationService.displayInfo("Trang chưa được xuất bản");
        };
        $scope.editSoloPage = function (soloID) {
            $location.path('#/app/editor2/solo/edit/' + soloID + '');
        };
    }]);

app.controller('ModalDeleteSoloPageCtrl', ["$scope", "$window", "$timeout", "$location", "$localStorage", "$uibModalInstance", "items", "membershipService", "editorService", "notificationService",
    function ($scope, $window, $timeout, $location, $localStorage, $uibModalInstance, items, membershipService, editorService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        $scope.ok = function () {
            var ID = items;

            var soloPageObj = {
                "ID": ID,
                "UserName": username,
                "SessionKey": sessionKey
            };

            editorService.deleteSoloPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    notificationService.displaySuccess('Delete Solo Page Thành Công');
                    $uibModalInstance.dismiss('cancel');
                    $localStorage.manageMyPageTab = result.data.StatusCode;

                    $window.location.reload();
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ModalGenerateSharedCodeCtrl', ["$scope", "$window", "$timeout", "$location", "$localStorage", "$uibModalInstance", "items", "editorService", "notificationService",
    function ($scope, $window, $timeout, $location, $localStorage, $uibModalInstance, items, editorService, notificationService) {
        $scope.editor = {};
        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.modalSoloPageSharingCode = {
            init: function () {
                $scope.editor.soloPageShareCode = items;
            }
        };

        $scope.modalSoloPageSharingCode.init();
    }]);