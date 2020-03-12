'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('ngTableTitleTemplateListCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "titleTemplateService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, titleTemplateService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.members = {};
        $scope.titleID = 0;

        function loadTitleTemplateListWithNgTable() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var memberObj = {};

                        memberObj = {
                            "UserName": "admin",
                            "KeyWord": "",
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionkey
                        };

                        // Load the data from the API
                        orderService.GetOrderList(memberObj, function (result) {
                            if (result.data && result.data.StatusCode == 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode == 0) {
                                //var data = result.data.Details.Items;
                                $scope.members = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);

                                $scope.getClassForPayMentStatus = function (PaymentStatus) {
                                    if (PaymentStatus === 1) // Chưa thanh toán
                                        return "badge badge-inverse label label-inverse";
                                    else if (PaymentStatus === 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (PaymentStatus === 3) // Hoàn tiền
                                        return "badge badge-danger label label-danger";
                                };

                                $scope.getClassForAffiliateStatus = function (AffiliateStatus) {
                                    if (AffiliateStatus === 1) // Đang Duyệt
                                        return "badge badge-inverse label label-inverse";
                                    else if (AffiliateStatus === 2) // Đã Duyệt
                                        return "badge badge-success label label-success";
                                    else if (AffiliateStatus === 3) // Hủy
                                        return "badge badge-inverse label label-inverse";
                                };
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

        function loadTitles() {
            $scope.showSpinner = true;
            var entity = {
                SessionKey: sessionKey
            };

            titleTemplateService.GetAllTitleTemplate(entity, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.titles = result.data.Details;

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

        function manageTitleTemplateList() {
            $scope.addTitle = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditTitle.html',
                    controller: 'ModalAddEditTitleCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            $scope.editTitle = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalAddEditTitle.html',
                    controller: 'ModalAddEditTitleCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.titleID = size.target.attributes.data.value;
                            return $scope.titleID;
                        }
                    }
                });
            };

            $scope.viewDetailsTitle = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalViewDetailsTitle.html',
                    controller: 'ModalViewDetailsTitleCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };

            $scope.deleteTitle = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteTitle.html',
                    controller: 'ModalDeleteTitleCtrl',
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

        $scope.TitleTemplateManage = {
            init: function () {
                loadTitles();
                manageTitleTemplateList();
            }
        };

        $scope.TitleTemplateManage.init();
    }]);

app.controller('ModalAddEditTitleCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "titleTemplateService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, titleTemplateService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.entity = {};
        $scope.titleHeading = "Thêm Mới Tiêu Đề";
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};
        $scope.titleID = 0;
        if (items === undefined)
            items = 0;

        $scope.titleID = items ? items : 0;

        if ($scope.titleID == 0)
            $scope.titleHeading = "Thêm Mới Tiêu Đề";
        else
            $scope.titleHeading = "Cập Nhật Tiêu Đề";

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancle');
        };

        function addEditTitleTemplateForm() {
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
                        if ($scope.titleID > 0) {
                            $scope.entity = {
                                "ID": $scope.titleID,
                                "Title": $scope.entity.Title,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            titleTemplateService.EditTitleTemplate($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode == 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode == 0) {
                                    notificationService.displaySuccess(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $uibModalInstance.dismiss('cancel');
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
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            titleTemplateService.AddTitleTemplate($scope.entity, function (result) {
                                if (result.data && result.data.StatusCode == 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode == 0) {
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

        function loadTitleDetails() {
            //1. call an API to get order details by ID
            if ($scope.titleID > 0) {
                $scope.entity = {
                    "ID": 1,
                    "Title": "This is test"
                };
            }
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadTitleDetails();
            },
            handleAddAndEditTitle: function () {
                addEditTitleTemplateForm();
            }
        };

        $scope.ModalEditOrderManager.init();
        $scope.ModalEditOrderManager.handleAddAndEditTitle();
    }]);

app.controller('ModalViewDetailsTitleCtrl', ["$scope", "$uibModalInstance", "items", "titleTemplateService", "notificationService",
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

app.controller('ModalDeleteTitleCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "titleTemplateService", "membershipService", "notificationService",
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