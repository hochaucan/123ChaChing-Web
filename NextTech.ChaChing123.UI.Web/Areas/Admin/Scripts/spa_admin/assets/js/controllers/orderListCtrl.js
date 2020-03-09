'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('ngTableOrderListCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "orderService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, orderService, notificationService) {
        $scope.members = {};
        $scope.orderID = 0;

        function loadOrderList() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var memberObj = {};
                        var sessionkey = ($localStorage.currentUserAdmin) ? $localStorage.currentUserAdmin.token : "";

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
        function manageOrderList() {
            $scope.editOrder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalEditOrder.html',
                    controller: 'ModalEditOrderCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };

            $scope.viewDetailsOrder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalViewDetailsOrder.html',
                    controller: 'ModalViewDetailsOrderCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };

            $scope.deleteOrder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalDeleteDetailsOrder.html',
                    controller: 'ModalDeleteDetailsOrderCtrl',
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

        $scope.OrderManage = {
            init: function () {
                loadOrderList();
                manageOrderList();
            }
        };

        $scope.OrderManage.init();
    }]);

app.controller('ModalEditOrderCtrl', ["$scope", "$uibModalInstance", "items", "orderService", "notificationService",
    function ($scope, $uibModalInstance, items, orderService, notificationService) {
        $scope.order = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};
        $scope.orderID = 0;
        $scope.orderID = items ? items : 0;

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancle');
        };

        function approveOrderForm() {
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
                        $scope.order = {
                            "ContractNo": $scope.orderID,
                            "CreatedDate": "",
                            "CustomerAccount": "",
                            "CustomerName": "",
                            "CustomerEmail": "",
                            "CustomerPhone": "",
                            "PaymentStatus": 0,
                            "PaymentStatusName": "",
                            "AccountType": 0,
                            "AccountTypeName": "",
                            "CustomerAmount": 0,
                            "AffiliateAmount": 0,
                            "AffiliateAccount": "",
                            "AffiliateName": "",
                            "AffiliateStatus": $scope.order.AffiliateStatus,
                            "AffiliateStatusName": $scope.order.AffiliateStatusName
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        orderService.EditOrderDetails($scope.order, function (result) {
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
                    }
                }
            };
        }

        function loadOrderDetails() {
            //1. call an API to get order details by ID
            $scope.order = {
                "ContractNo": "95774698",
                "CreatedDate": "2020-01-19 18:06:23",
                "CustomerAccount": "0981108894",
                "CustomerName": "Nguyen Van C",
                "CustomerEmail": "nguyentran87@gmail.com",
                "CustomerPhone": "0981108894",
                "PaymentStatus": 2,
                "PaymentStatusName": "Ðã thanh toán",
                "AccountType": 2,
                "AccountTypeName": "Nâng cao",
                "CustomerAmount": 8997000,
                "AffiliateAmount": 4498500,
                "AffiliateAccount": "0973730111",
                "AffiliateName": "Hồ Châu Cần",
                "AffiliateStatus": 2,
                "AffiliateStatusName": "Đã duyệt"
            };
        }

        function loadPaymentStatus() {
            $scope.PaymentStatusList = [
                { PaymentStatus: 1, PaymentStatusName: 'Chưa thanh toán' },
                { PaymentStatus: 2, PaymentStatusName: 'Ðã thanh toán' },
                { PaymentStatus: 3, PaymentStatusName: 'Hoàn Tiền' }
            ];
        }

        function loadAccountTypeList() {
            $scope.AccountTypeList = [
                { AccountType: 1, AccountTypeName: 'Cơ Bản' },
                { AccountType: 2, AccountTypeName: 'Nâng Cao' }
            ];
        }

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: 1, AffiliateStatusName: 'Đang Duyệt' },
                { AffiliateStatus: 2, AffiliateStatusName: 'Đã Duyệt' },
                { AffiliateStatus: 3, AffiliateStatusName: 'Hủy' }
            ];
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadPaymentStatus();
                loadAccountTypeList();
                loadAffiliateStatus();
                loadOrderDetails();
            },
            edit: function () {
                approveOrderForm();
            }
        };

        $scope.ModalEditOrderManager.init();
        $scope.ModalEditOrderManager.edit();
    }]);

app.controller('ModalViewDetailsOrderCtrl', ["$scope", "$uibModalInstance", "items", "orderService", "notificationService",
    function ($scope, $uibModalInstance, items, orderService, notificationService) {
        $scope.order = {};
        $scope.orderID = 0;

        $scope.ok = function () {

        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancle');
        };

        function loadOrderDetails() {
            $scope.orderID = items;
            $scope.order = {
                "ContractNo": "95774698",
                "CreatedDate": "2020-01-19 18:06:23",
                "CustomerAccount": "0981108894",
                "CustomerName": "Nguyen Van C",
                "CustomerEmail": "nguyentran87@gmail.com",
                "CustomerPhone": "0981108894",
                "PaymentStatus": 2,
                "PaymentStatusName": "Ðã thanh toán",
                "AccountType": 2,
                "AccountTypeName": "Nâng cao",
                "CustomerAmount": 8997000,
                "AffiliateAmount": 4498500,
                "AffiliateAccount": "0973730111",
                "AffiliateName": "Hồ Châu Cần",
                "AffiliateStatus": 2,
                "AffiliateStatusName": "Đã duyệt"
            };
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadOrderDetails();
            }
        };

        $scope.ModalEditOrderManager.init();
    }]);

app.controller('ModalDeleteDetailsOrderCtrl', ["$scope", "$localStorage", "$uibModalInstance", "items", "orderService", "notificationService",
    function ($scope, $localStorage, $uibModalInstance, items, orderService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.orderID = 0;

        $scope.ok = function () {
            var ID = items;

            var order = {
                "ID": ID,
                "SessionKey": sessionKey
            };

            orderService.DeleteOrderDetails(order, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    notificationService.displaySuccess('Xóa Đơn Hàng Thành Công');
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