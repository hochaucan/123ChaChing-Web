'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('ngTableMemberListCtrl', ["$scope", "$localStorage", "$timeout", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $localStorage, $timeout, ngTableParams, membershipService, notificationService) {
        var sessionkey = ($localStorage.currentUserAdmin) ? $localStorage.currentUserAdmin.token : "";
        $scope.members = {};

        function loadMemberList(filter) {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var filterObj = {};
                        var keyword = "";

                        if (filter !== undefined) {
                            keyword = (filter.KeyWord && filter.KeyWord.length > 0) ? filter.KeyWord : "";
                        }

                        filterObj = {
                            "KeyWord": keyword,
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionkey
                        };

                        // Load the data from the API
                        membershipService.GetAccountList(filterObj, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
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
                                $scope.getClass = function (StatusOfAccount) {
                                    if (StatusOfAccount == 1) // Chờ duyệt
                                        return "badge badge-warning label label-warning";
                                    else if (StatusOfAccount == 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (StatusOfAccount == 3) // Dùng thử
                                        return "badge badge-info label label-info";
                                    else if (StatusOfAccount == 4) // Đang hoạt động
                                        return "badge badge-success label label-success";
                                    else if (StatusOfAccount == 5) // Ngừng hoạt động
                                        return "badge badge-inverse label label-inverse";
                                    else if (StatusOfAccount == 6) // Hoàn trả
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

        function doSearchingMember() {
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
                            "KeyWord": $scope.member.KeyWord
                        };

                        loadMemberList(filter);
                    }
                }
            };
        }

        $scope.MemberManage = {
            init: function () {
                doSearchingMember();
                loadMemberList();
            }
        };

        $scope.MemberManage.init();
    }]);