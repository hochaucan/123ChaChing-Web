'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('EditMyPageCtrl', ["$scope", "$rootScope", "$location", "$window", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $rootScope, $location, $window, $localStorage, $timeout, membershipService, editorService, notificationService) {
        // Get current member logged info
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";
        var ID = $location.url().split('/')[4];

        $scope.master = $scope.user;
        $scope.showSpinner = false;
        $scope.isShowTitleTemplate = false;
        $scope.isShowSubTitleTemplate = false;
        $scope.isShareCodeHidden = true;
        $scope.isThankYouContentHidden = true;
        $scope.formTypeVal = 1;
        $scope.saveMethod = 1;
        $scope.buttonColor = "";
        $scope.IsAdvanceAccount = true;
        $scope.editor = {};
        $scope.titles = {};
        $scope.subtitles = {};

        var userObj = {
            ID: ID,
            UserName: username,
            SessionKey: sessionKey
        };

        $scope.$watch('editor.FromType', function (formTypeVal) {
            if (formTypeVal == 5) {
                $scope.isThankYouContentHidden = true;
                $scope.isShareCodeHidden = $scope.isShareCodeHidden ? false : true;
            }

            if (formTypeVal == 4) {
                $scope.isShareCodeHidden = true;
                $scope.isThankYouContentHidden = $scope.isThankYouContentHidden ? false : true;
            }
        });

        $scope.$watch('editor.ButtonColor', function (pageColour) {
            var buttonColor = pageColour;
            $scope.buttonColor = buttonColor;
            if (buttonColor && buttonColor.length > 0) {
                var idBuilder = buttonColor.substr(1, buttonColor.length - 1);
                angular.element('.color').removeClass("color-select");
                angular.element('#' + idBuilder + '').addClass("color-select");
            } 
        });

        $scope.$watch('saveMethod', function (saveMethod) {
            console.log('save method ' + saveMethod);
        });

        $scope.showTitleTemplate = function () {
            $scope.isShowTitleTemplate = !$scope.isShowTitleTemplate ? true : false;
        };

        $scope.showSubTitleTemplate = function () {
            $scope.isShowSubTitleTemplate = !$scope.isShowSubTitleTemplate ? true : false;
        };

        $scope.hideTitleTemplateBox = function () {
            $scope.isShowTitleTemplate = !$scope.isShowTitleTemplate ? true : false;
        };

        $scope.hideSubTitleTemplateBox = function () {
            $scope.isShowSubTitleTemplate = !$scope.isShowSubTitleTemplate ? true : false;
        };

        $scope.clickMe1 = function () {
            $scope.saveMethod = 1;
        };

        $scope.clickMe2 = function () {
            $scope.saveMethod = 2;
        };

        $scope.getColorBackground = function (obj) {
            var buttonColor = obj.target.attributes.data.value;
            $scope.buttonColor = buttonColor;
            var idBuilder = buttonColor.substr(1, buttonColor.length - 1);
            angular.element('.color').removeClass("color-select");
            angular.element('#' + idBuilder + '').addClass("color-select");
        };

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

                    return;

                } else {
                    var editor = {
                        "ID": ID,
                        "Title": "",
                        "SubTitle": "",
                        "ButtonName": "",
                        "ButtonColor": "",
                        "PageName": "",
                        "RefLink": $scope.editor.RefLink,
                        "BackgroundPath": "",
                        "ResourcePath": resourcePath,
                        "UseShareCode": $scope.editor.UseShareCode,
                        "ThankYouContent": "",
                        "FromType": $scope.formTypeVal,
                        "IsAdvance": ($scope.editor.AutoresponderCodes != null || $scope.editor.TrackingCode != null) ? 1 : 0, // one of those are NOT equal NULL then customer is using advanced feature
                        "Status": $scope.saveMethod,
                        "AutoresponderCodes": $scope.editor.AutoresponderCodes,
                        "TrackingCode": $scope.editor.TrackingCode,
                        "UpdatedBy": username,
                        "SessionKey": sessionKey
                    };

                    if ($scope.formTypeVal != 5) {
                        editor = {
                            "ID": ID,
                            "Title": $scope.editor.Title,
                            "SubTitle": $scope.editor.SubTitle,
                            "ButtonName": $scope.editor.ButtonName,
                            "ButtonColor": $scope.buttonColor,
                            "PageName": $scope.editor.PageName,
                            "RefLink": $scope.editor.RefLink,
                            "BackgroundPath": backgroundPath,
                            "ResourcePath": resourcePath,
                            "UseShareCode": "",
                            "ThankYouContent": $scope.editor.ThankYouContent,
                            "FromType": $scope.editor.FromType,
                            "IsAdvance": ($scope.editor.AutoresponderCodes != null || $scope.editor.TrackingCode != null) ? 2 : 1, // one of those are NOT equal NULL then customer is using advanced feature,
                            "Status": $scope.saveMethod,
                            "AutoresponderCodes": ($scope.editor.AutoresponderCodes) ? $scope.editor.AutoresponderCodes : "",
                            "TrackingCode": ($scope.editor.TrackingCode) ? $scope.editor.TrackingCode : "",
                            "UpdatedBy": username,
                            "SessionKey": sessionKey
                        };
                    }

                    $scope.showSpinner = true;
                    editorService.editSoloPage(editor, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            backgroundPath = "";
                            resourcePath = "";

                            // Save and Review (open new tab)
                            if ($scope.saveMethod == 1) {
                                var soloPageUrlBuilder = 'https://123chaching.app/#/solo/page/' + result.data.Details.ID + '/' + username + '/' + sessionKey;
                                notificationService.displaySuccess('Lưu Solo Page Thành Công');
                                $scope.showSpinner = false;
                                $timeout(function () {
                                    if (result.data.Details) {
                                        soloPageUrlBuilder = result.data.Details.urlPath;
                                    }
                                    $window.open(soloPageUrlBuilder, '_blank');
                                }, 2000);
                            }

                            // Public page
                            if ($scope.saveMethod == 2) {
                                notificationService.displaySuccess('Xuất Bản Solo Page Thành Công');
                                $scope.showSpinner = false;
                                $localStorage.manageMyPageTab = 0;
                                $location.path('/app/editor');
                            }

                            // Just save because this page is already publiced
                            if ($scope.saveMethod == 3) {
                                notificationService.displaySuccess('Lưu Trang Xuất Bản Thành Công');
                                $scope.showSpinner = false;
                                $localStorage.manageMyPageTab = 0;
                                $location.path('/app/editor');
                            }
                        }
                        else {
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 2000);
                            notificationService.displayError(result.data.StatusMsg);
                            backgroundPath = "";
                            resourcePath = "";
                        }
                    });
                }

            }
        };

        function loadMyPage() {
            $scope.showSpinner = true;
            editorService.loadMyPage(userObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.editor = result.data.Details;
                    $scope.IsAdvanceAccount = (accountType == 2) ? true : false;
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        $scope.manageSoloPages = {
            init: function () {
                var isManageMyPageTab = ($localStorage.manageMyPageTab == 0) ? true : false;
                if (isManageMyPageTab) {
                    $timeout(function () {
                        angular.element('#manageSoloPage a').trigger('click');
                    }, 1000);

                    delete $localStorage.manageMyPageTab;
                }
            },
            loadMyPage: function () {
                loadMyPage();
            },
            loadTitles: function () {
                $scope.showSpinner = true;
                editorService.loadTitles({ SessionKey: sessionKey }, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.titles = result.data.Details;
                    } else {
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            },
            loadSubTitles: function () {
                $scope.showSpinner = true;
                editorService.loadSubTitles({ SessionKey: sessionKey }, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.subtitles = result.data.Details;
                        $scope.showSpinner = false;
                    } else {
                        notificationService.displayError(result.data.StatusMsg);
                        $scope.showSpinner = false;
                    }
                });
            }
        };

        //$scope.manageSoloPages.init();
        $scope.manageSoloPages.loadMyPage();
        $scope.manageSoloPages.loadTitles();
        $scope.manageSoloPages.loadSubTitles();

    }]);