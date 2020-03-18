'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('DocumentMasterController', ["$scope", "$sce", "$uibModal", "$state", "$window", "$location", "$localStorage", "$timeout", "documentService", "membershipService", "notificationService",
    function ($scope, $sce, $uibModal, $state, $window, $location, $localStorage, $timeout, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
        $scope.active = false;
        $scope.tabs = [];
        $scope.tabExclusively = [];
        $scope.documentContent = [];
        $scope.documentContentAttachments = [];
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
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
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
                            tab.type = document.Type;
                            //3. Push this into tabs array
                            $scope.tabs.push(tab);
                        } else {
                            tab.heading = document.Title;
                            tab.active = true;
                            tab.id = document.ID;
                            tab.order = document.Order;
                            tab.type = document.Type;
                            //3. Push this into tabs array
                            $scope.tabExclusively.push(tab);
                        }
                    });

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        function findMinTab(tabs) {
            var min = tabs[0].order;
            var foundTab = tabs[0];
            angular.forEach(tabs, function (tab, index) {
                var orderValue = tab.order;

                if (orderValue < min) {
                    min = orderValue;
                    foundTab = tab;
                    return;
                }
            });

            return foundTab;
        }

        function loadDocumentsByID(id) {
            var entity = {
                ID: id,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            $scope.documentContent = [];
            documentService.GetAllDocument(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    var documentItems = result.data.Details.Items;

                    angular.forEach(documentItems, function (item, index) {
                        //1. Initialize a document array
                        var document = item;
                        //2. Update a given link as trusted source
                        if (item.Link !== undefined && item.Link.length > 0) {
                            document.Link = $sce.trustAsResourceUrl(item.Link);
                        }
                        //3. Push document into documentContent array
                        $scope.documentContent.push(document);
                    });

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        function loadAttachedDocumentsByID(id) {
            var entity = {
                ID: id,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            $scope.documentContentAttachments = [];
            documentService.GetAllDocument(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.documentContentAttachments = result.data.Details.Items;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.getDocumentContentByID = function (tab) {
            loadDocumentsByID(tab.id);
            // load attached documents for first tab
            if (tab.order === 1) {
                if ($scope.tabExclusively.length > 0) {
                    loadAttachedDocumentsByID($scope.tabExclusively[0].id);
                }
            }
        };

        $scope.viewDocumentDetails = function (documentID) {
            $scope.showSpinner = true;
            // Load the data from the API
            var entity = {
                ID: documentID,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetDocumentInfoByID(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    var url = result.data.Details.Link;
                    if (url && url.length > 0) {
                        $window.open(url + '/', '_blank');
                    }

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.tabs.forEach(function (tab, index) {
            if (tab.route === routURL) {
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


app.controller('ModalViewAttachedDocumentDetailsCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "$uibModalInstance", "items", "documentService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, $uibModalInstance, items, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
        $scope.documentDetails = {};
        var documentID = items;
        $scope.leads = {};

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadDocumentDetails() {
            $scope.lead = {};
            $scope.showSpinner = true;
            // Load the data from the API
            var entity = {
                ID: documentID,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetDocumentInfoByID(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.documentDetails = result.data.Details;
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.DocumentAttachmentManager = {
            init: function () {
                loadDocumentDetails();
            }
        };

        $scope.DocumentAttachmentManager.init();
    }]);