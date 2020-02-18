'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('FunnelsAddEditCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "funnelsService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, funnelsService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var id = 0;

        // JSON ARRAY TO POPULATE TABLE.
        $scope.mySoloPages = {};
        $scope.funnels = {};
        $scope.funnel = {};
        $scope.id = 0;

        $scope.soloPages = {};
        $scope.soloOrder = {};
        $scope.soloIDs = {};
        $scope.funnel = {
            "PageName": "",
            "Status": "1",
            "StepList": "",
            "SoloIDList": "",
            "UserName": username,
            "SessionKey": sessionKey
        };

        $scope.soloPages = [];

        var locationURL = $location.url().split('/');
        if (locationURL[4] && locationURL[4] > 0) {
            id = locationURL[4];
        }

        // GET VALUES FROM INPUT BOXES AND ADD A NEW ROW TO THE TABLE.
        $scope.addRow = function () {
            if ($scope.funnel.PageName != undefined && $scope.soloPage.Title != undefined) {
                var mySoloPage = [];
                mySoloPage.ID = $scope.soloPage.ID;
                mySoloPage.Title = $scope.soloPage.Title;

                $scope.soloPages.push(mySoloPage);

                // CLEAR TEXTBOX.
            }
        };

        // REMOVE SELECTED ROW(s) FROM TABLE.
        $scope.removeRow = function (index) {
            //Find the record using Index from Array.
            var name = $scope.soloPages[index].Title;
            if ($window.confirm("Do you want to delete: " + name)) {
                //Remove the item from Array using Index.
                $scope.soloPages.splice(index, 1);
            }
        };

        // FINALLY SUBMIT THE DATA.
        $scope.createFunnelPage = function () {
            var orderList = [];
            var idList = [];
            var orderAsc = 0;

            if ($scope.soloPages.length > 0) {
                angular.forEach($scope.soloPages, function (value, index) {
                    console.log(orderAsc++);
                    orderList.push(orderAsc);
                    idList.push(value.ID);
                });

                if (orderList.length > 0) {
                    $scope.soloOrder = orderList.join();
                }

                if (idList.length > 0) {
                    $scope.soloIDs = idList.join();
                }

                $scope.funnel = {
                    "PageName": $scope.funnel.PageName,
                    "Status": "1",
                    "StepList": $scope.soloOrder,
                    "SoloIDList": $scope.soloIDs,
                    "UserName": username,
                    "SessionKey": sessionKey
                };

                $scope.showSpinner = true;

                funnelsService.AddFunnalPage($scope.funnel,
                    function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            notificationService.displaySuccess("Tạo mới Funnel Thành Công");
                            $timeout(function () {
                                $scope.showSpinner = false;
                                loadFunnels();
                            }, 2000);
                        }
                        else {
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 2000);
                            notificationService.displayError(result.data.StatusMsg);
                        }
                    });
            }
        };

        function loadFunnels() {
            $scope.showSpinner = true;

            funnelsService.GetAllFunnalPage({ "UserName": username, "SessionKey": sessionKey },
                function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.funnels = result.data.Details;
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                    }
                    else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
        }

        function loadFunnelDetails() {
            $scope.showSpinner = true;

            funnelsService.GetDetailFunnalPage({ "ID": id, "UserName": username, "SessionKey": sessionKey },
                function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.funnel = result.data.Details;

                        //var listIds = [];
                        //if (result.data.Details.SoloIDList && result.data.Details.SoloIDList.length > 0) {
                        //    listIds = result.data.Details.SoloIDList.split(',');

                        //    angular.forEach(listIds, function (value, index) {
                        //        var mySoloPage = [];
                        //        mySoloPage.ID = value.ID;
                        //        mySoloPage.Title = $scope.soloPage.Title;
                        //    });

                        //}
                        //var mySoloPage = [];
                        //mySoloPage.ID = $scope.soloPage.ID;
                        //mySoloPage.Title = $scope.soloPage.Title;

                        

                        //$scope.soloPages.push(mySoloPage);

                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                    }
                    else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
        }

        function loadMyPages() {
            $scope.showSpinner = true;

            var userObj = {
                UserName: username,
                SessionKey: sessionKey
            };

            editorService.getMyPages(userObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.mySoloPages = result.data.Details;


                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
                else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        $scope.soloPageManager = {
            init: function () {
                loadMyPages();
                loadFunnels();
            },
            edit: function () {
                loadMyPages();
                loadFunnelDetails();
                loadFunnels();
            }
        };

        if (id > 0) {
            $scope.soloPageManager.edit();
        } else {
            $scope.soloPageManager.init();
        }
    }]);