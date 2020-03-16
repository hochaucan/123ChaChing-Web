'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var baseUrl = 'https://api.123chaching.app';
var resourceUploaderPath = "";
var imageUploaderPath = "";

app.controller('DocumentManagerCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "documentService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, documentService, membershipService, notificationService) {
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
                            "ID": 3,
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        documentService.GetAllDocument(entity, function (result) {
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
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
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
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
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

app.controller('ModalAddEditDocumentCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "documentService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, documentService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.documentCategories = {};
        $scope.documentCategoryID = 0;
        $scope.isShowLinkDestination = false;
        $scope.isShowImageUpload = false;
        $scope.isShowResourceUpload = false;

        $scope.documentHeading = "Thêm Mới Tiêu Đề";
        $scope.documentID = 0;
        if (items === undefined)
            items = 0;

        $scope.documentID = items ? items : 0;

        if ($scope.documentID === 0)
            $scope.documentHeading = "Thêm Mới Tài Liệu";
        else
            $scope.documentHeading = "Cập Nhật Tài Liệu";

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
                                "Content": $scope.entity.Content,
                                "ImagePath": imageUploaderPath,
                                "Link": $scope.entity.Link === undefined ? "" : $scope.entity.Link,
                                "ResourcePath": resourceUploaderPath,
                                "Style": "1",
                                "DocumentsID": $scope.entity.DocumentsID,
                                "Order": $scope.entity.Order,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            documentService.UpdateDocumentByID($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                // Reset image/resource path
                                imageUploaderPath = "";
                                resourceUploaderPath = "";
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
                                "ImagePath": imageUploaderPath,
                                "Link": $scope.entity.Link === undefined ? "" : $scope.entity.Link,
                                "ResourcePath": resourceUploaderPath,
                                "Style": "1",
                                "DocumentsID": $scope.entity.DocumentsID,
                                "Order": $scope.entity.Order,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            documentService.AddDocument($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                // Reset image/resource path
                                imageUploaderPath = "";
                                resourceUploaderPath = "";
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
                    $scope.documentCategories = result.data.Details.Items;

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

        function loadDocumentDetails() {
            var entity = {
                ID: $scope.documentID,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            documentService.GetDocumentInfoByID(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.entity = result.data.Details;

                    $scope.documentCategoryID = result.data.Details.DocumentsID;
                    showHideUploader($scope.documentCategoryID);

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

        function showHideUploader(documentCategoryID) {
            var categoryType = 0;
            console.log(categoryType);
            angular.forEach($scope.documentCategories, function (category, index) {
                if (documentCategoryID === category.ID) {
                    categoryType = category.Type;
                }
            });
            console.log(categoryType);

            if (categoryType === 1) { // Video
                $scope.isShowLinkDestination = true; // Show Link Area
                $scope.isShowImageUpload = false;
                $scope.isShowResourceUpload = false;
            }

            if (categoryType === 2) { // Image
                $scope.isShowImageUpload = true; // Show Image Uploader Area
                $scope.isShowLinkDestination = false;
                $scope.isShowResourceUpload = false;
            }

            if (categoryType === 3) { // Material
                $scope.isShowResourceUpload = true; // Show Resource Uploader Area
                $scope.isShowLinkDestination = false;
                $scope.isShowImageUpload = false;
            }
        }

        $scope.showHideUploaderBox = function () {
            console.log($scope.entity.DocumentsID);
            showHideUploader($scope.entity.DocumentsID);
        };

        $scope.ModalAddEditDocumentManager = {
            edit: function () {
                loadDocumentCategories();
                loadDocumentDetails();
            },
            add: function () {
                loadDocumentCategories();
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

app.controller('ModalViewDetailsDocumentCtrl', ["$scope", "$uibModalInstance", "items", "titleTemplateService", "notificationService",
    function ($scope, $uibModalInstance, items, titleTemplateService, notificationService) {
        $scope.order = {};
        $scope.orderID = 0;

        $scope.ok = function () {

        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancle');
        };

        function loadOrderDetails() {
            $scope.orderID = items;
            $scope.title = {
                "ContractNo": "95774698",
                "CreatedDate": "2020-01-19 18:06:23",
                "CustomerAccount": "0981108894"
            };
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadOrderDetails();
            }
        };

        $scope.ModalEditOrderManager.init();
    }]);

app.controller('ModalDeleteDocumentCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "titleTemplateService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, titleTemplateService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            titleTemplateService.DeleteTitleTemplate(title, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    notificationService.displaySuccess('Xóa Tiêu Đề Thành Công');
                    $uibModalInstance.dismiss('cancel');
                    $window.location.reload();
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                    }, 2000);
                }
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancle');
        };
    }]);

app.controller('ResourceUploaderCtrl', ["$scope", "$timeout", "$localStorage", "notificationService", function ($scope, $timeout, $localStorage, notificationService) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {
        $scope.showSpinner = true;
        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i]);
            }
        });

        //FILL FormData WITH FILE DETAILS.
        var SessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("uploadedFile", $scope.files[i]);
            if ($scope.files[i].name) {
                data.append("SessionKey", SessionKey);
                break;
            }
        }

        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        $scope.showSpinner = true;
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
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
            resourceUploaderPath = result.Details;
            notificationService.displaySuccess("Upload tài liệu thành công");

            $timeout(function () {
                $scope.showSpinner = false;
            }, 1000);
        }
        else {
            notificationService.displaySuccess(result.StatusMsg);
            $scope.showSpinner = false;
        }
    }
}]);

app.controller('ImageUploaderCtrl', ["$scope", "$timeout", "$localStorage", "notificationService", function ($scope, $timeout, $localStorage, notificationService) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {
        $scope.showSpinner = true;
        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i]);
            }
        });

        //FILL FormData WITH FILE DETAILS.
        var SessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("uploadedFile", $scope.files[i]);
            if ($scope.files[i].name) {
                data.append("SessionKey", SessionKey);
                break;
            }
        }

        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        $scope.showSpinner = true;
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
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
            notificationService.displaySuccess("Upload hình ảnh thành công");

            $timeout(function () {
                $scope.showSpinner = false;
            }, 1000);
        }
        else {
            notificationService.displaySuccess(result.StatusMsg);
            $scope.showSpinner = false;
        }
    }
}]);