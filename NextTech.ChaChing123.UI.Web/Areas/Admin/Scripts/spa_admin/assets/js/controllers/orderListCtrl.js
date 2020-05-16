'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('ngTableOrderListCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "orderService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.members = {};
        $scope.PaymentStatusList = {};
        $scope.Affiliates = {};
        $scope.AffiliateStatusList = {};
        $scope.CommissionPayOffs = {};

        $scope.orderID = 0;

        function loadOrderList(filter) {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var filterObj = {};
                        var keyword = "";
                        var paymentStatus = "";
                        var affiliate = "";
                        var affiliateStatus = "";
                        var affiliateCommissionPayOff = "";

                        if (filter !== undefined) {
                            keyword = (filter.KeyWord && filter.KeyWord.length > 0) ? filter.KeyWord : "";
                            paymentStatus = (filter.PaymentStatus && filter.PaymentStatus.length > 0) ? filter.PaymentStatus : "";
                            affiliate = (filter.UserName && filter.UserName.length > 0) ? filter.UserName : "";
                            affiliateStatus = (filter.AffiliateStatus && filter.AffiliateStatus.length > 0) ? filter.AffiliateStatus : "";
                            affiliateCommissionPayOff = (filter.CommissionPayOff && parseInt(filter.CommissionPayOff) > 0) ? filter.CommissionPayOff : "0";
                        }

                        filterObj = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "KeyWord": keyword,
                            "PaymentState": paymentStatus,
                            "AffiliateState": affiliateStatus,
                            "AffiliateAccount": affiliate,
                            "GreaterThanDay": affiliateCommissionPayOff,
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        orderService.GetOrderList(filterObj, function (result) {
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
            $scope.updatePaymentStatus = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalUpdatePaymentStatus.html',
                    controller: 'ModalUpdatePaymentStatusCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };

            $scope.updatePaymentStatusForAffiliate = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalUpdateAffiliatePaymentStatus.html',
                    controller: 'ModalUpdateAffiliatePaymentStatusCtrl',
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

            $scope.doFilterOrder = function () {
                var filter = {
                    "PaymentStatus": $scope.order.PaymentStatus,
                    "UserName": $scope.order.UserName,
                    "AffiliateStatus": $scope.order.AffiliateStatus,
                    "CommissionPayOff": $scope.order.CommissionPayOff
                };

                loadOrderList(filter);
            };
        }

        function doSearchingOrder() {
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
                        var filter = {
                            "KeyWord": $scope.order.KeyWord
                        };

                        loadOrderList(filter);
                    }
                }
            };
        }

        function loadFilter() {
            loadPaymentStatus();
            loadAffiliates();
            loadAffiliateStatus();
            loadCommissionPayOff();
        }

        function loadPaymentStatus() {
            $scope.PaymentStatusList = [
                { PaymentStatus: "1", PaymentStatusName: 'Chưa thanh toán' },
                { PaymentStatus: "2", PaymentStatusName: 'Ðã thanh toán' },
                { PaymentStatus: "3", PaymentStatusName: 'Hoàn Tiền' }
            ];
        }

        function loadCommissionPayOff() {
            $scope.CommissionPayOffs = [
                { CommissionPayOffID: "7", CommissionPayOffName: '7 ngày' }
            ];
        }

        function loadAffiliates() {
            var entity = {
                "SessionKey": sessionKey
            };
            $scope.showSpinner = true;
            // Load the data from the API
            orderService.GetAffialateList(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.Affiliates = result.data.Details;
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

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: "1", AffiliateStatusName: 'Đang Duyệt' },
                { AffiliateStatus: "2", AffiliateStatusName: 'Đã Duyệt' },
                { AffiliateStatus: "3", AffiliateStatusName: 'Hủy' }
            ];
        }

        $scope.OrderManage = {
            init: function () {
                doSearchingOrder();
                loadFilter();
                loadOrderList();
                manageOrderList();
            }
        };

        $scope.OrderManage.init();
    }]);

app.controller('ModalUpdatePaymentStatusCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.order = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.CustomerAccount = "";
        $scope.CustomerName = "";
        $scope.ContractNo = "";
        $scope.PaymentState = "";

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.CustomerAccount = customerSplit[0];
            $scope.CustomerName = customerSplit[1];
            $scope.ContractNo = customerSplit[2];
            $scope.PaymentState = customerSplit[3];
        }

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function updatePaymentStatusForm() {
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
                        var entity = {
                            "UserName": $scope.CustomerAccount,
                            "PaymentState": $scope.order.PaymentStatus,
                            "ContractNo": $scope.ContractNo,
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        orderService.UpdatePaymentState(entity, function (result) {
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
            };
        }


        function loadOrderDetails() {
            $scope.showSpinner = true;

            if ($scope.CustomerAccount && $scope.CustomerAccount.length > 0) {
                $timeout(function () {
                    $scope.order = {
                        "CustomerAccount": $scope.CustomerAccount,
                        "CustomerName": $scope.CustomerName,
                        "PaymentStatus": $scope.PaymentState,
                        "ContractNo": $scope.ContractNo
                    };

                    $scope.showSpinner = false;
                }, 1000);

            }
        }

        function loadPaymentStatus() {
            $scope.PaymentStatusList = [
                { PaymentStatus: "1", PaymentStatusName: 'Chưa thanh toán' },
                { PaymentStatus: "2", PaymentStatusName: 'Ðã thanh toán' },
                { PaymentStatus: "3", PaymentStatusName: 'Hoàn Tiền' }
            ];
        }

        function loadAccountTypeList() {
            $scope.AccountTypeList = [
                { AccountType: "1", AccountTypeName: 'Cơ Bản' },
                { AccountType: "2", AccountTypeName: 'Nâng Cao' }
            ];
        }

        $scope.ModalUpdatePaymentStatusManager = {
            init: function () {
                loadPaymentStatus();
                loadAccountTypeList();
                loadOrderDetails();
            },
            edit: function () {
                updatePaymentStatusForm();
            }
        };

        $scope.ModalUpdatePaymentStatusManager.init();
        $scope.ModalUpdatePaymentStatusManager.edit();
    }]);

app.controller('ModalUpdateAffiliatePaymentStatusCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.order = {};
        $scope.orderAffiliate = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};
        $scope.AffiliateAccount = "";
        $scope.AffiliateName = "";
        $scope.ContractNo = "";
        $scope.AffiliateStatus = 0;
        $scope.PaymentState = 0;
        $scope.PaymentStateName = "";

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.AffiliateAccount = customerSplit[0];
            $scope.AffiliateName = customerSplit[1];
            $scope.ContractNo = customerSplit[2];
            $scope.AffiliateStatus = customerSplit[3];
            $scope.PaymentState = parseInt(customerSplit[4]);
            $scope.PaymentStateName = customerSplit[5];
        }

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
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
                        /* Background
                         * Dai Su must not be approved when Customer has not settled payment yet
                         * 
                         * Payment Type Details
                         * PaymentStatus = 1 : Chua Thanh Toan
                         * PaymentStatus = 2: Da Thanh Toan
                         * PaymentStatus = 3: Hoan Tien
                         */

                        if ($scope.PaymentState !== 2) { // not proceed the payment yet
                            notificationService.displayWarning('Đại sứ chưa được phê duyệt đơn hàng này. Trạng thái của đơn hàng là ' + $scope.PaymentStateName);

                            $timeout(function () {
                                $uibModalInstance.dismiss('cancel');
                            }, 1000);

                            return;
                        }

                        var entity = {
                            "UserName": $scope.AffiliateAccount,
                            "ContractNo": $scope.ContractNo,
                            "AffiliateState": $scope.order.AffiliateStatus,
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        orderService.UpdatePaymentAffiliateState(entity, function (result) {
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
            };
        }


        function loadOrderDetails() {
            $scope.showSpinner = true;
            if ($scope.AffiliateAccount && $scope.AffiliateAccount.length > 0) {

                $timeout(function () {
                    $scope.order = {
                        "AffiliateAccount": $scope.AffiliateAccount,
                        "AffiliateName": $scope.AffiliateName,
                        "AffiliateStatus": $scope.AffiliateStatus,
                        "ContractNo": $scope.ContractNo
                    };

                    $scope.showSpinner = false;
                }, 1000);
            }
        }

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: "1", AffiliateStatusName: 'Đang Duyệt' },
                { AffiliateStatus: "2", AffiliateStatusName: 'Đã Duyệt' },
                { AffiliateStatus: "3", AffiliateStatusName: 'Hủy' }
            ];
        }

        $scope.ModalEditOrderManager = {
            init: function () {
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
            $uibModalInstance.dismiss('cancel');
        };
    }]);