'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('DocumentCategoryManagerCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "documentService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.documents = {};
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;
        $scope.showSpinner = true;

        function loadDocumentsWithNgTable() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {};

                        entity = {
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        $scope.showSpinner = true;
                        documentService.GetAllDocuments(entity, function (result) {
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

        function manageDocumentActions() {
            $scope.addDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditDocumentCategory.html',
                    controller: 'ModalAddEditDocumentCategoryCtrl',
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
                    templateUrl: 'myModalAddEditDocumentCategory.html',
                    controller: 'ModalAddEditDocumentCategoryCtrl',
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
                    templateUrl: 'myModalViewDetailsDocumentCategory.html',
                    controller: 'ModalViewDetailsDocumentCategoryCtrl',
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
                    templateUrl: 'myModalDeleteDocumentCategory.html',
                    controller: 'ModalDeleteDocumentCategoryCtrl',
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

app.controller('ModalAddEditDocumentCategoryCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "documentService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.documentCategories = {};
        $scope.documentCategoryID = 0;
        $scope.isShowLinkDestination = false;
        $scope.isShowImageUpload = false;
        //$scope.isShowResourceUpload = false;

        $scope.documentHeading = "Thêm Mới Danh Mục Tài Liệu";
        $scope.documentID = 0;
        if (items === undefined)
            items = 0;

        $scope.documentID = items ? items : 0;

        if ($scope.documentID === 0)
            $scope.documentHeading = "Thêm Mới Danh Mục Tài Liệu";
        else
            $scope.documentHeading = "Cập Nhật Danh Mục Tài Liệu";

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
                        if ($scope.documentID > 0) {
                            $scope.entity = {
                                "ID": $scope.documentID,
                                "Title": $scope.entity.Title,
                                "Description": $scope.entity.Description,
                                "Order": $scope.entity.Order,
                                "Type": $scope.entity.Type,
                                "IsAdvanced": "0",
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            documentService.UpdateDocumentsByID($scope.entity, function (result) {
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
                                "Description": $scope.entity.Description,
                                "Order": $scope.entity.Order,
                                "Type": $scope.entity.Type,
                                "IsAdvanced": "0",
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            documentService.AddDocuments($scope.entity, function (result) {
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

        function loadDocumentCategoryTypes() {
            $scope.documentCategories = [
                {
                    ID: 1,
                    Title: "Video"
                },
                {
                    ID: 2,
                    Title: "Hình Ảnh"
                },
                {
                    ID: 3,
                    Title: "Tài Liệu"
                }
            ];
        }

        function loadDocumentDetails() {
            var entity = {
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetAllDocumentsByAccount(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.entity = result.data.Details;

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

        $scope.ModalAddEditDocumentManager = {
            edit: function () {
                loadDocumentCategoryTypes();
                loadDocumentDetails();
            },
            add: function () {
                loadDocumentCategoryTypes();
            },
            handleAddAndEditDocument: function () {
                addEditDocumentForm();
            }
        };

        if ($scope.documentID > 0) {
            $scope.ModalAddEditDocumentManager.edit();
        }
        else {
            $scope.ModalAddEditDocumentManager.add();
        }
        $scope.ModalAddEditDocumentManager.handleAddAndEditDocument();
    }]);

app.controller('ModalViewDetailsDocumentCategoryCtrl', ["$scope", "$localStorage", "$timeout", "$uibModalInstance", "items", "documentService", "notificationService",
    function ($scope, $localStorage, $timeout, $uibModalInstance, items, documentService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.documentID = 0;
        $scope.documentCategories = {};
        $scope.documentCategoryID = 0;
        $scope.isShowLinkDestination = false;
        $scope.isShowImageUpload = false;
        //$scope.isShowResourceUpload = false;
        $scope.documentHeading = "Chi Tiết Danh Mục Tài Liệu";

        $scope.ok = function () {

        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadDocumentCategoryTypes() {
            $scope.documentCategories = [
                {
                    ID: 1,
                    Title: "Video"
                },
                {
                    ID: 2,
                    Title: "Hình Ảnh"
                },
                {
                    ID: 3,
                    Title: "Tài Liệu"
                }
            ];
        }

        function loadDocumentDetails() {
            $scope.documentID = items;
            if ($scope.documentID > 0) {
                var entity = {
                    SessionKey: sessionKey
                };

                $scope.showSpinner = true;
                documentService.GetAllDocumentsByAccount(entity, function (result) {
                    if (result.data && result.data.StatusCode === 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode === 0) {
                        $scope.entity = result.data.Details;

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
        }

        $scope.ModalDocumentDetailsManager = {
            init: function () {
                loadDocumentCategoryTypes();
                loadDocumentDetails();
            }
        };

        $scope.ModalDocumentDetailsManager.init();
    }]);

app.controller('ModalDeleteDocumentCategoryCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "documentService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            documentService.DeleteDocumentsByID(title, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    notificationService.displaySuccess('Xóa Danh Mục Tài Liệu Thành Công');

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