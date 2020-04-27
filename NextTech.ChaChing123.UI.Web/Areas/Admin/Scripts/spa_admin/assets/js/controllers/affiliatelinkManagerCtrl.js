'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var baseUrl = 'https://api.123chaching.app';
var imageUploaderPath = "";

app.controller('AffiliateLinkManagerCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "affiliatelinkService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, affiliatelinkService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.documents = [];
        $scope.documentID = 0;
        $scope.documentCategoryID = 0;

        function loadAffiliateLinkWithNgTable() {
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
                        affiliatelinkService.GetAllAffiliateLink(entity, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
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

        function manageAffiliateLinkActions() {
            $scope.addDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditAffiliateLink.html',
                    controller: 'ModalAddEditAffiliateLinkCtrl',
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
                    templateUrl: 'myModalAddEditAffiliateLink.html',
                    controller: 'ModalAddEditAffiliateLinkCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.documentID = size.currentTarget.attributes.data.value;
                            return $scope.documentID;
                        }
                    }
                });
            };

            $scope.deleteDocument = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteAffiliateLink.html',
                    controller: 'ModalDeleteAffiliateLinkCtrl',
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

        $scope.AffiliateLinkManager = {
            init: function () {
                loadAffiliateLinkWithNgTable();
                manageAffiliateLinkActions();
            }
        };

        $scope.AffiliateLinkManager.init();
    }]);

app.controller('ModalAddEditAffiliateLinkCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "affiliatelinkService", "affiliatelinkCategoryService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, affiliatelinkService, affiliatelinkCategoryService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.documentCategories = {};
        $scope.documentCategoryID = 0;
        $scope.imagePath = "";
        //$scope.isShowResourceUpload = false;

        $scope.documentHeading = "Thêm Mới Affiliate Link";

        var documentID = 0;
        var documentTitle = "";
        var documentDescription = "";
        var documentCategoryName = "";
        var documentLink = "";
        var documentOrder = "";
        var documentThumbnailImage = "";

        var parts = [];
        var categoryRowInfo = items;
        if (items !== undefined) {
            parts = categoryRowInfo.split('|');
            if (parts.length > 0) {
                documentID = parts[0];
                documentTitle = parts[1];
                documentDescription = parts[2];
                documentCategoryName = parts[3];
                documentLink = parts[4];
                documentOrder = parts[5];
                documentThumbnailImage = parts[6];
            }
        }

        if (documentID === 0)
            $scope.documentHeading = "Thêm Mới Affiliate Link";
        else
            $scope.documentHeading = "Cập Nhật Affiliate Link";

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
                                "ID": $scope.documentID,
                                "Title": $scope.entity.Title,
                                "Content": $scope.entity.Content,
                                "AffiliateLinksID": $scope.entity.AffiliateLinksID,
                                "Link": $scope.entity.Link === undefined ? "" : $scope.entity.Link,
                                "Order": $scope.entity.Order,
                                "ThumbnailImage": imageUploaderPath,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            affiliatelinkService.UpdateAffiliateLinkByID($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                // Reset image/resource path
                                imageUploaderPath = "";
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
                                "AffiliateLinksID": $scope.entity.AffiliateLinksID,
                                "Link": $scope.entity.Link === undefined ? "" : $scope.entity.Link,
                                "Order": $scope.entity.Order,
                                "ThumbnailImage": imageUploaderPath,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            affiliatelinkService.AddAffiliateLink($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                // Reset image/resource path
                                imageUploaderPath = "";
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
            affiliatelinkCategoryService.GetAllAffiliateLinks(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    //$scope.titles = result.data.Details;
                    $scope.documentCategories = result.data.Details.Items;

                    // LOAD DOCUMENT DETAILS
                    if (documentID > 0) {
                        loadDocumentDetails();
                    }

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
            //if (documentID > 0) {
            //    $scope.entity = {
            //        ID: documentID,
            //        Title: documentTitle,
            //        Content: documentDescription,
            //        Link: documentLink,
            //        Order: documentOrder,
            //        imagePath: documentThumbnailImage.length > 0 ? documentThumbnailImage : ""
            //    };
            //}
            var entity = {
                ID: documentID,
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            affiliatelinkService.GetAffiliateLinkInfoByID(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.entity = result.data.Details;

                    // display thumbnail image on UI
                    var imageSource = $scope.entity.ThumbnailImage;
                    if (imageSource.length > 0) {
                        $scope.imagePath = imageSource;
                        imageUploaderPath = imageSource;
                    }

                    $scope.AffiliateLinksID = result.data.Details.AffiliateLinksID;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.ModalAddEditDocumentManager = {
            addEdit: function () {
                loadDocumentCategories();
            },
            handleAddAndEditDocument: function () {
                addEditDocumentForm();
            }
        };

        $scope.ModalAddEditDocumentManager.addEdit();
        $scope.ModalAddEditDocumentManager.handleAddAndEditDocument();
    }]);

app.controller('ModalDeleteAffiliateLinkCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "affiliatelinkService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, affiliatelinkService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var title = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            affiliatelinkService.DeleteAffiliateLinkByID(title, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    notificationService.displaySuccess('Xóa Affiliate Link Thành Công');

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

app.controller('ImageUploaderCtrl', ["$scope", "$timeout", "$localStorage", "notificationService", function ($scope, $timeout, $localStorage, notificationService) {
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