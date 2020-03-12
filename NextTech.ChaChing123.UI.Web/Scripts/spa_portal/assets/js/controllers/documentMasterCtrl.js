'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('DocumentMasterController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "documentService", "membershipService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
        $scope.active = false;
        $scope.tabs = [];
        $scope.documentContent = {};
        $scope.showSpinner = true;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        function loadDocumentCategories() {
            var entity = {
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetAllDocuments(entity, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    //$scope.titles = result.data.Details;
                    var categories = result.data.Details.Items;
                    angular.forEach(categories, function (document, index) {
                        //1. Initialize a tab array
                        var tab = [];
                        //2. Assign ID to mySoloPage ID 
                        if (document.Order !== 99) {
                            tab.heading = document.Title;
                            tab.active = true;
                            tab.id = document.ID;
                            tab.order = document.Order;
                            //3. Push this into tabs array
                            $scope.tabs.push(tab); 
                        }
                    });

                    //3. Build the content for the first tab
                    loadDocumentFirstTab();
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        function loadDocumentFirstTab() {
            angular.forEach($scope.tabs, function (tab, index) {
                if (tab.order === 1) {
                    loadDocumentsByID(tab.id);
                }
            });
        }

        function loadDocumentsByID(id) {
            var entity = {
                ID: id,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetAllDocument(entity, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.documentContent = result.data.Details.Items;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
            });
        }

        $scope.getDocuments = function (id) {
            loadDocumentsByID(id);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        //$scope.$on("$stateChangeSuccess", function () {
        //    $scope.tabs.forEach(function (tab) {
        //        tab.active = $scope.active(tab.route);
        //    });
        //});

        $scope.tabs.forEach(function (tab, index) {
            if (tab.route == routURL) {
                $scope.active = index;
                return;
            }
        });

        $scope.DocumentManager = {
            init: function () {
                loadDocumentCategories();
            }
        };

        $scope.DocumentManager.init();
    }]);