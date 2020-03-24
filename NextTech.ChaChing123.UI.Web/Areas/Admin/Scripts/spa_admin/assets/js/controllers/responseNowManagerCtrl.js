'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
app.controller('ResponseNowManagerCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "responseService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, responseService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.documents = {};
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;

        function loadDocumentsWithNgTable() {
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
                        responseService.GetAllQuickReplies(entity, function (result) {
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
                                $defer.resolve(result.data.Details.Items);
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

        function manageDocumentActions() {
            $scope.addDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditDocument.html',
                    controller: 'ModalAddEditDocumentCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            $scope.editDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditDocument.html',
                    controller: 'ModalAddEditDocumentCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.target.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };

            $scope.viewDetailsDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalViewDetailsDocument.html',
                    controller: 'ModalViewDetailsDocumentCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.target.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };

            $scope.deleteDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteDocument.html',
                    controller: 'ModalDeleteDocumentCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.target.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };
        }

        $scope.DocumentManager = {
            init: function () {
                loadDocumentsWithNgTable();
                manageDocumentActions();
            }
        };

        $scope.DocumentManager.init();
    }]);

app.controller('ModalAddEditDocumentCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "responseService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, responseService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.documentHeading = "Thêm Mới Trả Lời Nhanh";
        var documentID = 0;
        var responseTitle = "";
        var responseContent = "";
        var responseOrder = "";

        var responseRow = items ? items : "";
        var parts = responseRow.split('|');
        if (parts.length > 0) {
            documentID = parts[0];
            responseTitle = parts[1];
            responseContent = parts[2];
            responseOrder = parts[3];
        }

        if (documentID === 0)
            $scope.documentHeading = "Thêm Mới Trả Lời Nhanh";
        else
            $scope.documentHeading = "Cập Nhật Trả Lời Nhanh";

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function addEditDocumentForm() {
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
                                "Title": $scope.entity.Title,
                                "Content": $scope.entity.Content,
                                "Order": $scope.entity.Order,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            responseService.UpdateQuickRepliesByID($scope.entity, function (result) {
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
                                "Title": $scope.entity.Title,
                                "Content": $scope.entity.Content,
                                "Order": $scope.entity.Order,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            responseService.AddQuickReplies($scope.entity, function (result) {
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
                    Title: responseTitle,
                    Content: responseContent,
                    Order: responseOrder
                };
            }
        }

        $scope.ModalAddEditDocumentManager = {
            edit: function () {
                loadDocumentDetails();
            },
            handleAddAndEditDocument: function () {
                addEditDocumentForm();
            }
        };

        if (documentID > 0) {
            $scope.ModalAddEditDocumentManager.edit();
        }
        $scope.ModalAddEditDocumentManager.handleAddAndEditDocument();
    }]);

app.controller('ModalViewDetailsDocumentCtrl', ["$scope", "$localStorage", "$timeout", "$uibModalInstance", "items", "responseService", "notificationService",
    function ($scope, $localStorage, $timeout, $uibModalInstance, items, responseService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        var documentID = 0;
        var responseTitle = "";
        var responseContent = "";
        var responseOrder = "";

        var responseRow = items ? items : "";
        var parts = responseRow.split('|');
        if (parts.length > 0) {
            documentID = parts[0];
            responseTitle = parts[1];
            responseContent = parts[2];
            responseOrder = parts[3];
        }
        
        $scope.documentHeading = "Chi Tiết Trả Lời Nhanh";

        $scope.ok = function () {

        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadDocumentDetails() {
            if (documentID > 0) {
                $scope.entity = {
                    ID: documentID,
                    Title: responseTitle,
                    Content: responseContent,
                    Order: responseOrder
                };
            }
        }

        $scope.ModalDocumentDetailsManager = {
            init: function () {
                loadDocumentDetails();
            }
        };

        $scope.ModalDocumentDetailsManager.init();
    }]);

app.controller('ModalDeleteDocumentCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "responseService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, responseService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            responseService.DeleteQuickRepliesByID(title, function (result) {
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