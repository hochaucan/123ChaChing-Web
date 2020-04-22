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

app.controller('MasterMemberDetailsCtrl', ["$scope", "$localStorage", "$location", "$timeout", "membershipService", "notificationService",
    function ($scope, $localStorage, $location, $timeout, membershipService, notificationService) {
        function initCommonInfoProcessing() {
            sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";

            var parts = $location.url().split('/');
            var len = parts.length;
            if (len > 0)
                username = parts[len - 1];
        }

        $scope.MemberDetailsManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('MemberDetailsCtrl', ["$scope", "$rootScope", "$window", "$localStorage", "$timeout", "$uibModal", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $rootScope, $window, $localStorage, $timeout, $uibModal, ngTableParams, membershipService, notificationService) {
        $scope.member = {};
        $scope.affiliates = {};
        $scope.totalAffiliateAmount = 0; // total amount
        $scope.pendingAffiliateAmount = 0; // the amount that is waiting for approval
        $scope.approvedAffilateAmount = 0; // the amount that is already approved
        $scope.withdrawalAmount = 0; // Total amount that already withdrawll
        $scope.totalPockedAmount = 0; // Total amount that is inside your pocket
        $scope.requestWithDrawallNumber = 0; // number of requests of withdrawlling

        function loadMemberDetails() {
            var entity = {
                "UserName": username,
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.GetAccountInfo(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    //notificationService.displaySuccess(result.data.StatusMsg);
                    $scope.member = result.data.Details;

                    $scope.totalAffiliateAmount = $scope.member.TotalAmount;
                    $scope.pendingAffiliateAmount = $scope.member.PendingAmount;
                    $scope.approvedAffilateAmount = $scope.member.ApprovedAmount;
                    $scope.withdrawalAmount = $scope.member.WithdrawalAmount;
                    $scope.totalPockedAmount = $scope.member.Amount;
                    $scope.requestWithDrawallNumber = result.data.Details.RequestWithDrawallNumber;

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

        function updateMemberDetailsForm() {
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
                        //1. Proceed to update notes
                        if ($scope.member.Note.length > 0) {
                            var memberInfo = {
                                "FullName": $scope.member.FullName,
                                "UserName": $scope.member.UserName,
                                "Email": $scope.member.Email,
                                "Phone": $scope.member.Phone,
                                "RenewalNo": $scope.member.RenewalNo,
                                "Note": $scope.member.Note,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            membershipService.UpdateAccountInfo(memberInfo, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess('Cập nhật ghi chú ' + result.data.StatusMsg);

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $window.location.reload();
                                    }, 2000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 1000);
                                }
                            });
                        }

                        //2. Proceed to update new password
                        //if ($scope.member.Password === undefined || $scope.member.Password.length === 0) {
                        //    notificationService.displayWarning('Bạn chưa nhập mật khẩu mới');
                        //    return;
                        //}

                        if ($scope.member.Password.length > 0) {
                            var entity = {
                                "AccountName": username,
                                "NewPassword": $scope.member.Password,
                                "SessionKey": sessionKey
                            };

                            $scope.showSpinner = true;
                            // Load the data from the API
                            membershipService.SetPasswodForAccount(entity, function (result) {
                                if (result.data && result.data.StatusCode === 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode === 0) {
                                    notificationService.displaySuccess('Cập nhật mật khẩu mới ' + result.data.StatusMsg);

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        $window.location.reload();
                                    }, 2000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
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

        $scope.accessUserAccount = function (username) {
            //http://localhost:1484/#/app/dologin/dangminh/4324234dfasdfsdafs54543
            var urlBuilder = $rootScope.baseUrl.url + '#/app/dologin/' + username + '/' + sessionKey;

            $window.open(urlBuilder, '_blank');
        };

        $scope.lockOrUnlockUser = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalLockOrUnlockUser.html',
                controller: 'ModalLockOrUnlockUserCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.currentTarget.attributes.data.value;
                    }
                }
            });
        };

        $scope.lockOrUnlockAffiliateAccount = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalLockOrUnlockAffiliateAccount.html',
                controller: 'ModalLockOrUnlockAffiliateAccountCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.currentTarget.attributes.data.value;
                    }
                }
            });
        };

        $scope.upgradeOrDowngradeUser = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalUpgradeOrDowngradeUser.html',
                controller: 'ModalUpgradeOrDowngradeUserCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.currentTarget.attributes.data.value;
                    }
                }
            });
        };

        $scope.updatePaymentStatus = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalRequestUpdatePaymentStatusForAffiliate.html',
                controller: 'ModalRequestUpdatePaymentStatusForAffiliateCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.orderID = size.currentTarget.attributes.data.value;
                        return $scope.orderID;
                    }
                }
            });
        };

        function loadAffiliateOperation() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "UserName": username,
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        $scope.showSpinner = true;
                        membershipService.GetAffiliateList(entity, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.affiliates = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

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

        function loadAffilateAmountReport() {
            $scope.totalAffiliateAmount = totalAmount;
            $scope.pendingAffiliateAmount = pendingAmount;
            $scope.approvedAffilateAmount = approvedAmount;
        }

        $scope.MemberDetailsManager = {
            init: function () {
                loadMemberDetails();
                loadAffiliateOperation();
                loadAffilateAmountReport();
                updateMemberDetailsForm();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('ModalRequestUpdatePaymentStatusForAffiliateCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
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
        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.AffiliateAccount = customerSplit[0];
            $scope.AffiliateName = customerSplit[1];
            $scope.ContractNo = customerSplit[2];
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

app.controller('RequestWithDrawalCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, membershipService, notificationService) {
        $scope.withdrawals = {};

        function loadRequestWithDrawal() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "UserName": username,
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        membershipService.GetWithDrawallInfoByAccount(entity, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.withdrawals = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

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
                controller: 'ModalRequestWithDrawalCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.orderID = size.currentTarget.attributes.data.value;
                        return $scope.orderID;
                    }
                }
            });
        };

        $scope.MemberDetailsManager = {
            init: function () {
                loadRequestWithDrawal();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('ModalLockOrUnlockUserCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, membershipService, notificationService) {
        var username = "";
        var isLock = 0;

        var memberInfo = items ? items : "";
        var memberSplit = memberInfo.split('|');
        if (memberSplit.length > 0) {
            username = memberSplit[0];
            isLock = memberSplit[1];
        }

        $scope.ok = function () {


            var entity = {
                "UserName": username,
                "SessionKey": sessionKey,
                "IsLock": isLock === "0" ? 1 : 0
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.LockAccount(entity, function (result) {
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
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ModalLockOrUnlockAffiliateAccountCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, membershipService, notificationService) {
        var username = "";
        var isLock = 0;

        var memberInfo = items ? items : "";
        var memberSplit = memberInfo.split('|');
        if (memberSplit.length > 0) {
            username = memberSplit[0];
            isLock = memberSplit[1];
        }

        $scope.ok = function () {
            var entity = {
                "UserName": username,
                "SessionKey": sessionKey,
                "IsLockAffialate": isLock === "0" ? "1" : "0"
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.LockAffialate(entity, function (result) {
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
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ModalUpgradeOrDowngradeUserCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, membershipService, notificationService) {
        var username = "";
        var accountType = 0;

        var memberInfo = items ? items : "";
        var memberSplit = memberInfo.split('|');
        if (memberSplit.length > 0) {
            username = memberSplit[0];
            accountType = memberSplit[1];
        }

        $scope.ok = function () {


            var entity = {
                "UserName": username,
                "SessionKey": sessionKey,
                "AccountType": accountType === "1" ? 2 : 1
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.ChangeAccountType(entity, function (result) {
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
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ModalRequestWithDrawalCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
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