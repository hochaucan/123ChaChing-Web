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
        $scope.isFunnelNameValid = true;
        $scope.isSoloPageNameValid = true;

        $scope.soloPages = {};
        $scope.soloOrder = {};
        $scope.soloIDs = {};
        $scope.funnel = {
            "Status": "1",
            "StepList": "",
            "SoloIDList": "",
            "UserName": username,
            "SessionKey": sessionKey
        };

        $scope.soloPages = [];

        var locationURL = $location.url().split('/');
        var len = locationURL.length;
        if (len > 0) {
            id = locationURL[len - 1];
        }

        $scope.goToDestinationLink = function (url, status) {
            if (status == 2)
                $window.open(url + '/', '_blank');
            else
                notificationService.displayInfo("Trang Funnel chưa được xuất bản");
        };

        // GET VALUES FROM INPUT BOXES AND ADD A NEW ROW TO THE TABLE.
        $scope.addRow = function () {
            $scope.isFunnelNameValid = true;
            $scope.isSoloPageNameValid = true;

            if ($scope.funnel.PageName != undefined && $scope.funnel.PageName.length > 0
                && $scope.soloPage != undefined) {
                var mySoloPage = [];
                mySoloPage.ID = $scope.soloPage.ID;
                mySoloPage.PageName = $scope.soloPage.PageName;

                $scope.soloPages.push(mySoloPage);

                // CLEAR TEXTBOX.
            } else {
                if ($scope.funnel.PageName == undefined || $scope.funnel.PageName.length == 0) {
                    $scope.funnel.PageName = "";
                    $scope.isFunnelNameValid = false;
                    console.log($scope.funnel.PageName);
                }

                if ($scope.soloPage == undefined) {
                    console.log($scope.funnel.PageName);
                    $scope.isSoloPageNameValid = false;
                }
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
        $scope.createFunnelPage = function (saveMethod) {
            var orderList = [];
            var idList = [];
            var orderAsc = 0;

            if ($scope.soloPages.length > 0) {
                angular.forEach($scope.soloPages, function (value, index) {
                    orderList.push(orderAsc++);
                    idList.push(value.ID);
                });

                if (orderList.length > 0) {
                    $scope.soloOrder = orderList.join();
                }

                if (idList.length > 0) {
                    $scope.soloIDs = idList.join();
                }

                //Edit Funnel
                if (id > 0) {
                    $scope.funnel = {
                        "ID": id,
                        "PageName": $scope.funnel.PageName,
                        "Status": saveMethod,
                        "StepList": $scope.soloOrder,
                        "SoloIDList": $scope.soloIDs,
                        "UserName": username,
                        "SessionKey": sessionKey
                    };

                    $scope.showSpinner = true;
                    var funnelID = 0;
                    var soloID = 0;
                    var funnelPageUrlBuilder = "";

                    funnelsService.EditFunnalPage($scope.funnel,
                        function (result) {
                            if (result.data && result.data.StatusCode == 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode == 0) {
                                if (saveMethod == 1) { // save and preview and it indicates user's clicking on Save & Reivew button
                                    funnelID = id;
                                    soloID = $scope.soloIDs.split(",")[0];

                                    var funnelPageUrlBuilder = '#/funnel/preview/' + funnelID + '/' + soloID;
                                    notificationService.displaySuccess("Lưu Funnel Thành Công");

                                    $scope.showSpinner = false;
                                    $timeout(function () {
                                        $window.open(funnelPageUrlBuilder, '_blank');
                                    }, 1000);
                                }

                                if (saveMethod == 2) { // indicate that user's clicking on Public button
                                    funnelID = id;
                                    soloID = $scope.soloIDs.split(",")[0];
                                    funnelPageUrlBuilder = '#/funnel/public/' + funnelID + '/' + soloID;
                                    notificationService.displaySuccess("Xuất Bản Funnel Thành Công");

                                    $scope.showSpinner = false;
                                    $timeout(function () {
                                        $window.open(funnelPageUrlBuilder, '_blank');
                                    }, 1000);
                                }
                            }
                            else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 2000);
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                } else { // Add New Funnel
                    $scope.funnel = {
                        "PageName": $scope.funnel.PageName,
                        "Status": saveMethod,
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
                                    $location.path('/app/editor2/funnels/manage');
                                }, 1000);
                            }
                            else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                }
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

                        var soloIDsStr = $scope.funnel.SoloIDList;
                        var soloIDs = [];

                        if (soloIDsStr.length > 0) {
                            soloIDs = soloIDsStr.split(',');
                            angular.forEach(soloIDs, function (value, index) {
                                //1. Initialize mySoloPage array
                                var mySoloPage = [];
                                var sID = value;
                                //2. Assign ID to mySoloPage ID 
                                mySoloPage.ID = value;
                                //3. Find solo title based on solo ID
                                angular.forEach($scope.mySoloPages, function (v, k) {
                                    if (sID == v.ID) {
                                        //3.1 Assign Title to mySoloPage Title
                                        mySoloPage.PageName = v.PageName;
                                        $scope.soloPages.push(mySoloPage);
                                        return;
                                    }
                                });
                            });
                        }

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

            funnelsService.GetAllPublicSoloPage(userObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.mySoloPages = result.data.Details;

                    if (id > 0) {
                        loadFunnelDetails();
                    }

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
            }
        };

        $scope.soloPageManager.init();
    }]);