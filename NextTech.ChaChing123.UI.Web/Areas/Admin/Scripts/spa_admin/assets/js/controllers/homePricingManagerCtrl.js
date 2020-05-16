'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var imageUploaderPath = "";

app.controller('HomePricingManagerCtrl', ["$scope", "$location", "$uibModal", "$localStorage", "$timeout", "homePricingService", "notificationService",
    function ($scope, $location, $uibModal, $localStorage, $timeout, homePricingService, notificationService) {
        $scope.documents = {};
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;
        $scope.showSpinner = true;

        function loadDocumentsWithNgTable() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homePricingService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    $scope.documents = result.data;

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

        function manageDocumentActions() {
            $scope.addDocument = function () {
                $location.path('/app/dashboard/pricing/add');
            };

            $scope.deleteDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteHomePricing.html',
                    controller: 'ModalDeleteHomePricingCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return size.currentTarget.attributes.data.value;
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

app.controller('HomePricingAddNewEditManagerCtrl', ["$scope", "$location", "$window", "$localStorage", "$timeout", "homePricingService", "notificationService",
    function ($scope, $location, $window, $localStorage, $timeout, homePricingService, notificationService) {
        $scope.entity = {};
        $scope.imagePath = "";

        var documentID = 0;

        var parts = $location.url().split('/');

        if (parts.length > 0) {
            var lastPart = parts[parts.length - 1];
            if (lastPart.length === 36) // max length of new guid
            {
                documentID = lastPart;
            }
        }

        if (documentID === 0)
            $scope.documentHeading = "Thêm Mới Nội Dung Bảng Giá Trang Chủ";
        else
            $scope.documentHeading = "Cập Nhật Nội Dung Bảng Giá Trang Chủ";

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
                        var result = {};

                        if (documentID.length > 0) {
                            $scope.entity = {
                                "ID": documentID,
                                "Title": $scope.entity.Title,
                                "BriefTitle": $scope.entity.BriefTitle,
                                "Price": $scope.entity.Price,
                                "Content": $scope.entity.Content
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            homePricingService.update($scope.entity, function (result) {
                                if (result.status === 200) {
                                    notificationService.displaySuccess('Cập nhật thành công');

                                    // Reset image/resource path
                                    imageUploaderPath = "";

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $window.location.reload();
                                    }, 1000);
                                } else {
                                    notificationService.displayError('Cập nhật lỗi');
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 1000);
                                }
                            });
                        } else {
                            $scope.entity = {
                                "Title": $scope.entity.Title,
                                "BriefTitle": $scope.entity.BriefTitle,
                                "Price": $scope.entity.Price,
                                "Content": $scope.entity.Content
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            homePricingService.add($scope.entity, function (result) {
                                if (result.status === 200) {
                                    notificationService.displaySuccess('Thêm thành công');

                                    // Reset image/resource path
                                    imageUploaderPath = "";

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $location.path('/app/dashboard/pricing/manage');
                                    }, 1000);
                                } else {
                                    notificationService.displayError('Thêm bị lỗi');
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 1000);
                                }
                            });
                        }
                    }
                }
            };
        }

        function loadDocumentDetails() {
            if (documentID.length > 0) {
                $scope.entity = {
                    ID: documentID
                };

                $scope.showSpinner = true;
                // Load the data from the API
                homePricingService.getdocumentcontentbyid($scope.entity, function (result) {
                    if (result.status === 200) {
                        $scope.entity = result.data;

                        // display thumbnail image on UI
                        var imageSource = $scope.entity.ImagePath;
                        if (imageSource.length > 0) {
                            $scope.imagePath = imageSource;
                            imageUploaderPath = imageSource;
                        }

                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                    } else {
                        notificationService.displayError('Lỗi khi tải chi tiết nội dung');
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                    }
                });
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

        if (documentID.length > 0) {
            $scope.ModalAddEditDocumentManager.edit();
        }
        $scope.ModalAddEditDocumentManager.handleAddAndEditDocument();
    }]);

app.controller('ModalDeleteHomePricingCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "homePricingService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, homePricingService, membershipService, notificationService) {
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID
            };

            $scope.showSpinner = true;
            homePricingService.deletecontent(title, function (result) {
                if (result.status === 200) {
                    notificationService.displaySuccess('Xóa Nội Dung Thành Công');

                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                        $window.location.reload();
                    }, 1000);
                }
                else {
                    notificationService.displayError('Lỗi xảy ra khi xóa nội dung');
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