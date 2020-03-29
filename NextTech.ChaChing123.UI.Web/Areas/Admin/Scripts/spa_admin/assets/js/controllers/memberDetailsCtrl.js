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

app.controller('MemberDetailsCtrl', ["$scope", "$window", "$localStorage", "$timeout", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, membershipService, notificationService) {
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
            notificationService.displayInfo('This feature is processing. Please get back it later');
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
        console.log('AffiliateOperationCtrl');
        console.log(username);
        console.log(sessionKey);

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
        console.log('RequestWithDrawalCtrl');
        console.log(username);
        console.log(sessionKey);

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