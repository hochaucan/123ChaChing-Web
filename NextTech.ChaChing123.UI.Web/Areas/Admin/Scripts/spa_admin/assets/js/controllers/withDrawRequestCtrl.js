'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var username = "";
var sessionKey = "";
var totalAmount = 0;
var pendingAmount = 0;
var approvedAmount = 0;

app.controller('MasterWithDrawRequestCtrl', ["$scope", "$localStorage", "$location", "$timeout", "membershipService", "notificationService",
    function ($scope, $localStorage, $location, $timeout, membershipService, notificationService) {
        function initCommonInfoProcessing() {
            sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        }

        $scope.MasterWithDrawRequestManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.MasterWithDrawRequestManager.init();

    }]);

app.controller('WithDrawRequestCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "withDrawRequestService", "orderService", "membershipService", "commonService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, withDrawRequestService, orderService, membershipService, commonService, notificationService) {
        $scope.withdrawals = {};
        $scope.Affiliates = [];
        $scope.AffiliateStatusList = {};
        $scope.totalApprovalAmount = 0; // Total amount that already approve
        $scope.totalWaitingForApprovalAmount = 0; // Total amount that is waiting for apporval

        function loadRequestWithDrawal(filter) {
            $scope.showSpinner = true;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {
                            "KeyWord": filter !== undefined && filter.KeyWord !== undefined && filter.KeyWord && filter.KeyWord.length > 0 ? filter.KeyWord : "",
                            "UserName": filter !== undefined && filter.UserName !== undefined && filter.UserName && filter.UserName.length > 0 ? filter.UserName : "",
                            "Status": filter !== undefined && filter.AffiliateStatus !== undefined && filter.AffiliateStatus && filter.AffiliateStatus.length > 0 ? filter.AffiliateStatus : "",
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        withDrawRequestService.GetAllWithDrawall(entity, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.withdrawals = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                $scope.totalApprovalAmount = result.data.Details.ApprovedAmount;
                                $scope.totalWaitingForApprovalAmount = result.data.Details.PendingAmount;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);
                                $scope.getClass = function (StatusOfAccount) {
                                    if (StatusOfAccount === 1) // Chờ duyệt
                                        return "badge badge-warning label label-warning";
                                    else if (StatusOfAccount === 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (StatusOfAccount === 3) // Dùng thử
                                        return "badge badge-info label label-info";
                                    else if (StatusOfAccount === 4) // Đang hoạt động
                                        return "badge badge-success label label-success";
                                    else if (StatusOfAccount === 5) // Ngừng hoạt động
                                        return "badge badge-inverse label label-inverse";
                                    else if (StatusOfAccount === 6) // Hoàn trả
                                        return "badge badge-danger label label-danger";
                                };

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

        $scope.requestWithDrawall = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalRequestWithDrawal.html',
                controller: 'ModalWithDrawRequestCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.orderID = size.currentTarget.attributes.data.value;
                        return $scope.orderID;
                    }
                }
            });
        };

        function doSearchingCustomer() {
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
                            "KeyWord": $scope.customer.KeyWord
                        };

                        loadRequestWithDrawal(filter);
                    }
                }
            };
        }

        function doFiltering() {
            $scope.doFilterOrder = function () {
                var filter = {
                    "UserName": $scope.customer.UserName,
                    "AffiliateStatus": $scope.customer.AffiliateStatus
                };

                loadRequestWithDrawal(filter);
            };
        }

        function loadAffiliates() {
            var entity = {
                "KeyWord": "",
                "PageIndex": "1",
                "PageCount": "9999",
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.GetAccountList(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.Affiliates = result.data.Details.Items;
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

        function loadFiltering() {
            loadAffiliates();
            loadAffiliateStatus();
        }

        $scope.WithDrawRequestManager = {
            init: function () {
                loadFiltering();
                doSearchingCustomer();
                doFiltering();
                loadRequestWithDrawal();
            }
        };

        $scope.WithDrawRequestManager.init();

    }]);

app.controller('ModalWithDrawRequestCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.member = {};
        $scope.orderAffiliate = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};

        $scope.ContractNo = "";
        $scope.AffiliateAccount = "";
        $scope.AffiliateName = "";
        $scope.AffiliateStatus = 0;

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.ContractNo = customerSplit[0];
            $scope.AffiliateAccount = customerSplit[1];
            $scope.AffiliateName = customerSplit[2];
            $scope.AffiliateStatus = customerSplit[3];
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
                        var entity = {
                            "ContractNo": $scope.ContractNo,
                            "AccountName": $scope.AffiliateAccount,
                            "Status": $scope.member.AffiliateStatus,
                            "Noted": $scope.member.Notes !== undefined ? $scope.member.Notes : "",
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        membershipService.ApprovetWithDrawallInfoByAccount(entity, function (result) {
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


        function loadWithDrawalDetails() {
            $scope.showSpinner = true;
            if ($scope.AffiliateAccount && $scope.AffiliateAccount.length > 0) {

                $timeout(function () {
                    $scope.member = {
                        "ContractNo": $scope.ContractNo,
                        "AffiliateAccount": $scope.AffiliateAccount,
                        "AffiliateName": $scope.AffiliateName,
                        "AffiliateStatus": $scope.AffiliateStatus
                    };

                    $scope.showSpinner = false;
                }, 1000);
            }
        }

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: "2", AffiliateStatusName: 'Duyệt' },
                { AffiliateStatus: "3", AffiliateStatusName: 'Hủy' }
            ];
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadAffiliateStatus();
                loadWithDrawalDetails();
            },
            edit: function () {
                approveOrderForm();
            }
        };

        $scope.ModalEditOrderManager.init();
        $scope.ModalEditOrderManager.edit();
    }]);