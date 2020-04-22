'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var sessionKey = "";

app.controller('MasterAutoResponderCtrl', ["$scope", "$localStorage", "$location", "$timeout", "membershipService", "notificationService",
    function ($scope, $localStorage, $location, $timeout, membershipService, notificationService) {
        function initCommonInfoProcessing() {
            sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
        }

        $scope.MasterAutoResponderManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.MasterAutoResponderManager.init();

    }]);

app.controller('AutoResponderManagerCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "autoResponderService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, autoResponderService, membershipService, notificationService) {
        $scope.documents = {};
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;

        function loadAutoRespondersWithNgTable() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {};

                        entity = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        autoResponderService.GetAllGetResponseInfoByAccount(entity, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.documents = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve($scope.documents);
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

        function manageAutoResponderActions() {
            $scope.addAutoResponder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditAutoResponder.html',
                    controller: 'ModalAddEditAutoResponderCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            $scope.editAutoResponder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditAutoResponder.html',
                    controller: 'ModalAddEditAutoResponderCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.currentTarget.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };

            $scope.deleteAutoResponder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteAutoResponder.html',
                    controller: 'ModalDeleteAutoResponderCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.currentTarget.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };
        }

        $scope.AutoResponderManager = {
            init: function () {
                loadAutoRespondersWithNgTable();
                manageAutoResponderActions();
            }
        };

        $scope.AutoResponderManager.init();
    }]);

app.controller('ModalAddEditAutoResponderCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "autoResponderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, autoResponderService, membershipService, notificationService) {
        $scope.entity = {};
        $scope.documentHeading = "Thêm Mới AutoResponder";
        var documentID = 0;
        var responseTitle = "";
        var responseContent = "";

        var parts = [];
        var responseRow = items ? items : "";
        if (items !== undefined) {
            parts = responseRow.split('|');
            if (parts.length > 0) {
                documentID = parts[0];
                responseTitle = parts[1];
                responseContent = parts[2];
            }
        }

        if (documentID === 0)
            $scope.documentHeading = "Thêm Mới AutoResponder";
        else
            $scope.documentHeading = "Cập Nhật AutoResponder";

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function addEditAutoResponderForm() {
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
                        if (documentID > 0) {
                            $scope.entity = {
                                "ID": documentID,
                                "APIKey": $scope.entity.APIKey,
                                "CampaignName": $scope.entity.CampaignName,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            autoResponderService.UpdateGetResponseInfoByID($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $uibModalInstance.dismiss('cancel');
                                        $window.location.reload();
                                    }, 1000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $uibModalInstance.dismiss('cancel');
                                    }, 1000);
                                }
                            });
                        } else {
                            $scope.entity = {
                                "APIKey": $scope.entity.APIKey,
                                "CampaignName": $scope.entity.CampaignName,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            autoResponderService.AddGetResponseInfoByAccount($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $uibModalInstance.dismiss('cancel');
                                        $window.location.reload();
                                    }, 1000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $uibModalInstance.dismiss('cancel');
                                    }, 1000);
                                }
                            });
                        }
                    }
                }
            };
        }

        function loadDocumentDetails() {
            if (documentID > 0) {
                $scope.entity = {
                    ID: documentID,
                    APIKey: responseTitle,
                    CampaignName: responseContent
                };
            }
        }

        $scope.ModalAddEditAutoResponderManager = {
            edit: function () {
                loadDocumentDetails();
            },
            handleAddAndEditAutoResponder: function () {
                addEditAutoResponderForm();
            }
        };

        if (documentID > 0) {
            $scope.ModalAddEditAutoResponderManager.edit();
        }
        $scope.ModalAddEditAutoResponderManager.handleAddAndEditAutoResponder();
    }]);

app.controller('ModalDeleteAutoResponderCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "autoResponderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, autoResponderService, membershipService, notificationService) {
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            autoResponderService.DeleteGetResponseInfoByID(title, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    notificationService.displaySuccess('Xóa Thành Công');

                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                        $window.location.reload();
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                    }, 1000);
                }
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);