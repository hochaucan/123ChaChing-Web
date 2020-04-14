'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var imageUploaderPath = "";

app.controller('HomeMobileManagerCtrl', ["$scope", "$location", "$uibModal", "$localStorage", "$timeout", "homeMobileService", "notificationService",
    function ($scope, $location, $uibModal, $localStorage, $timeout, homeMobileService, notificationService) {
        $scope.documents = {};
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;
        $scope.showSpinner = true;

        function loadDocumentsWithNgTable() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homeMobileService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    $scope.documents = result.data;

                    //$scope.getCategoryTypeName = function (type) {
                    //    if (type === "landing_page") // Chưa thanh toán
                    //        return "Landing Page Không Giới Hạn";
                    //    else if (type === "mobile_application") // Ðã thanh toán
                    //        return "Ứng Dụng Điện Thoại";
                    //    else if (type === "integration") // Hoàn tiền
                    //        return "Tích Hợp";
                    //    else if (type === "support")
                    //        return "Hỗ Trợ Tận Tinh";
                    //};

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
                $location.path('/app/dashboard/mobileadd');
            };

            $scope.deleteDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteHomeMobile.html',
                    controller: 'ModalDeleteHomeMobileCtrl',
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

app.controller('HomeMobileAddNewEditManagerCtrl', ["$scope", "$location", "$window", "$localStorage", "$timeout", "homeMobileService", "notificationService",
    function ($scope, $location, $window, $localStorage, $timeout, homeMobileService, notificationService) {
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
            $scope.documentHeading = "Thêm Mới Nội Dung Ứng Dụng Di Động Trang Chủ";
        else
            $scope.documentHeading = "Cập Nhật Nội Dung Ứng Dụng Di Động Trang Chủ";

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
                                "Content": $scope.entity.Content,
                                "ImagePath": imageUploaderPath,
                                "CategoryID": "mobile"
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            homeMobileService.update($scope.entity, function (result) {
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
                                "Content": $scope.entity.Content,
                                "ImagePath": imageUploaderPath,
                                "CategoryID": "mobile"
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            homeMobileService.add($scope.entity, function (result) {
                                if (result.status === 200) {
                                    notificationService.displaySuccess('Thêm thành công');

                                    // Reset image/resource path
                                    imageUploaderPath = "";

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $location.path('/app/dashboard/mobile');
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

        function loadDocumentCategoryTypes() {
            $scope.documentCategories = [
                {
                    ID: "mobile",
                    Title: "Mobile"
                }
            ];
        }

        function loadDocumentDetails() {
            if (documentID.length > 0) {
                $scope.entity = {
                    ID: documentID
                };

                $scope.showSpinner = true;
                // Load the data from the API
                homeMobileService.getdocumentcontentbyid($scope.entity, function (result) {
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

        if (documentID.length > 0) {
            $scope.ModalAddEditDocumentManager.edit();
        }
        else {
            $scope.ModalAddEditDocumentManager.add();
        }
        $scope.ModalAddEditDocumentManager.handleAddAndEditDocument();
    }]);

app.controller('ModalDeleteHomeMobileCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "homeMobileService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, homeMobileService, membershipService, notificationService) {
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID
            };

            $scope.showSpinner = true;
            homeMobileService.deletecontent(title, function (result) {
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

app.controller('ImageUploaderCtrl', ["$scope", "$rootScope", "$timeout", "$localStorage", "notificationService",
    function ($scope, $rootScope, $timeout, $localStorage, notificationService) {
        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {
            $scope.showSpinner = true;
            $scope.imagePath = "";
            $scope.files = [];
            var baseUrl = $rootScope.baseUrl.urlWebApi;

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
                $scope.imagePath = result.Details;
                $scope.isCompletedImageUpload = true;
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