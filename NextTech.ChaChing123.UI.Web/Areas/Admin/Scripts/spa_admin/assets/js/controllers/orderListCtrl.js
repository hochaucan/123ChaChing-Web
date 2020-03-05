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
        }

        $scope.OrderManage = {
            init: function () {
                loadOrderList();
                manageOrderList();
            },

        };

        $scope.OrderManage.init();
    }]);

app.controller('ModalEditOrderCtrl', ["$scope", "$uibModalInstance", "items", "orderService", "notificationService",
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