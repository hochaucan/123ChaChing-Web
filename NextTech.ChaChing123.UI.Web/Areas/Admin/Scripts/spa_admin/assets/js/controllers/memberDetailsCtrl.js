'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var username = "";
var sessionKey = "";

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

app.controller('MemberDetailsCtrl', ["$scope", "$rootScope", "$window", "$localStorage", "$timeout", "$uibModal", "membershipService", "notificationService",
    function ($scope, $rootScope, $window, $localStorage, $timeout, $uibModal, membershipService, notificationService) {
        $scope.member = {};

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
                    notificationService.displaySuccess(result.data.StatusMsg);
                    $scope.member = result.data.Details;
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
                        var entity = {
                            "UserName": username,
                            "SessionKey": sessionKey,
                            "IsLock": $scope.member.IsLock
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
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                            }
                        });
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
                        return size.target.attributes.data.value;
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
                        return size.target.attributes.data.value;
                    }
                }
            });
        };

        $scope.MemberDetailsManager = {
            init: function () {
                loadMemberDetails();
                updateMemberDetailsForm();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);
app.controller('AffiliateOperationCtrl', ["$scope", "$localStorage", "$timeout", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $localStorage, $timeout, ngTableParams, membershipService, notificationService) {
        $scope.affiliates = {};
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

        $scope.MemberDetailsManager = {
            init: function () {
                loadAffiliateOperation();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('RequestWithDrawalCtrl', ["$scope", "$localStorage", "$timeout", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $localStorage, $timeout, ngTableParams, membershipService, notificationService) {
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