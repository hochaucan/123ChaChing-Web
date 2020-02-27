'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('ngTableOrderListCtrl', ["$scope", "$localStorage", "$timeout", "ngTableParams", "orderService", "notificationService",
    function ($scope, $localStorage, $timeout, ngTableParams, orderService, notificationService) {
        $scope.members = {};

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10 // count per page
        }, {
                getData: function ($defer, params) {
                    var memberObj = {};
                    var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                    var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                    memberObj = {
                        "UserName": "admin",
                        "KeyWord": "",
                        "PageIndex": params.page(),
                        "PageCount": params.count(),
                        "SessionKey": sessionkey
                    };

                    // Load the data from the API
                    orderService.GetOrderList(memberObj, function (result) {
                        // Later when working on member authentication and authorization, then we will use the following comment
                        //if (result.data && result.data.StatusCode == 17) {
                        //    membershipService.checkMemberAuthorization();
                        //}

                        if (result.data && result.data.StatusCode == 0) {
                            //var data = result.data.Details.Items;
                            $scope.members = result.data.Details.Items;
                            var totalRecordCount = result.data.Details.Total;

                            // Tell ngTable how many records we have (so it can set up paging)
                            params.total(totalRecordCount);

                            // Return the customers to ngTable
                            $defer.resolve(result.data.Details.Items);
                        } else {
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 1000);
                            notificationService.displayError(result.data.StatusMsg);
                        }
                    });
                }
            });
    }]);