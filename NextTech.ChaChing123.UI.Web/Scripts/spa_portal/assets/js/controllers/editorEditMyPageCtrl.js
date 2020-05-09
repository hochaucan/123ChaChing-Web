'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
var backgroundPath = "";
var resourceUploadImageFullFileName = "";
var _imageResourcePath = "";
//var baseUrl = 'http://localhost:1494';

app.controller('EditMyPageMasterCtrl', ["$scope", function ($scope) {
        $scope.imageResourcePath = "";
}]);

app.controller('EditMyPageCtrl', ["$scope", "$rootScope", "$location", "$window", "$localStorage", "$timeout", "autoResponderService", "membershipService", "editorService", "notificationService",
    function ($scope, $rootScope, $location, $window, $localStorage, $timeout, autoResponderService, membershipService, editorService, notificationService) {
        // Get current member logged info
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";
        var locationArr = $location.url().split('/');
        var len = locationArr.length;
        var ID = 0;
        if (len > 0)
            ID = locationArr[len - 1];

        $scope.master = $scope.user;
        $scope.showSpinner = false;
        $scope.isShowTitleTemplate = false;
        $scope.isShowSubTitleTemplate = false;
        $scope.isShareCodeHidden = true;
        $scope.isShowResourceUploadImageFile = false;
        $scope.isShowResourceVideoLink = true;
        $scope.isThankYouContentHidden = true;
        $scope.isUploadFileDetails = false;
        $scope.formTypeVal = 1;
        $scope.saveMethod = 1;
        $scope.buttonColor = "";
        $scope.LinkImageResource = "video";
        $scope.ResourceSelected = "";
        $scope.IsAdvanceAccount = true;
        $scope.editor = {};
        $scope.titles = {};
        $scope.subtitles = {};
        $scope.autoresponders = {};
        $scope.imageBackgroundPath = "";
        //$scope.imageResourcePath = "";

        var userObj = {
            ID: ID,
            UserName: username,
            SessionKey: sessionKey
        };

        $scope.$watch('editor.FromType', function (formTypeVal) {
            $scope.isShareCodeHidden = true;
            $scope.isThankYouContentHidden = true;

            if (formTypeVal == 5) {
                $scope.isThankYouContentHidden = true;
                $scope.isShareCodeHidden = $scope.isShareCodeHidden ? false : true;
            }

            if (formTypeVal == 4) {
                $scope.isShareCodeHidden = true;
                $scope.isThankYouContentHidden = $scope.isThankYouContentHidden ? false : true;
            }

            $scope.formTypeVal = formTypeVal;
        });

        $scope.$watch('LinkImageResource', function (LinkImageResource) {
            $scope.LinkImageResource = LinkImageResource;
        });

        $scope.ResourceUploadRadioChange = function (s) {
            $scope.editor.ResourcePath = "";
            $scope.ResourceSelected = s;

            if ($scope.ResourceSelected == "image") {
                $scope.isShowResourceUploadImageFile = true;
                $scope.isShowResourceVideoLink = false;
            }

            if ($scope.ResourceSelected == "video") {
                $scope.isShowResourceUploadImageFile = false;
                $scope.isShowResourceVideoLink = true;
            }
        };

        $scope.$watch('editor.ButtonColor', function (pageColour) {
            var buttonColor = pageColour;
            $scope.buttonColor = buttonColor;
            if (buttonColor && buttonColor.length > 0) {
                var idBuilder = buttonColor.substr(1, buttonColor.length - 1);
                angular.element('.color').removeClass("color-select");
                angular.element('#' + idBuilder + '').addClass("color-select");
            }
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

        $scope.manageAutoResponder = function () {
            $location.path('app/editor2/autoresponder/manage');
            //var baseUrl = $rootScope.baseUrl.url;
            //var checkoutUrl = baseUrl + '#/app/editor2/autoresponder/manage';

            //$window.location.href = checkoutUrl;
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
                        "ResourcePath": "",
                        "UseShareCode": $scope.editor.UseShareCode,
                        "ThankYouContent": "",
                        "FromType": $scope.formTypeVal,
                        "IsAdvance": accountType === 2 ? 1 : 0,
                        "Status": $scope.saveMethod,
                        "AutoresponderCodes": ($scope.editor.AutoresponderCodes) ? $scope.editor.AutoresponderCodes : "",
                        "TrackingCode": ($scope.editor.TrackingCode) ? $scope.editor.TrackingCode : "",
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
                            "ResourcePath": $scope.editor.ResourcePath,
                            "UseShareCode": "",
                            "ThankYouContent": $scope.editor.ThankYouContent,
                            "FromType": $scope.editor.FromType,
                            "IsAdvance": accountType === 2 ? 1 : 0,
                            "Status": $scope.saveMethod,
                            "AutoresponderCodes": ($scope.editor.AutoresponderCodes) ? $scope.editor.AutoresponderCodes : "",
                            "TrackingCode": ($scope.editor.TrackingCode) ? $scope.editor.TrackingCode : "",
                            "UpdatedBy": username,
                            "SessionKey": sessionKey
                        };
                    }

                    $scope.showSpinner = true;
                    //1. Check if image uploading is being selected
                    if ($scope.ResourceSelected == "image") {
                        if (resourceUploadImageFullFileName && resourceUploadImageFullFileName.length > 0) {
                            editor.ResourcePath = resourceUploadImageFullFileName;
                        }
                    }

                    if (backgroundPath && backgroundPath.length > 0 && $scope.isUploadFileDetails) {
                        $scope.manageSoloPages.uploadBackgroundFileDetailsAndEditSoloPage(editor);
                    } else {
                        $scope.manageSoloPages.editSoloPage(editor);
                    }
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
                    var resource = "";

                    $scope.editor = result.data.Details;
                    $scope.IsAdvanceAccount = (accountType == 2) ? true : false;

                    backgroundPath = result.data.Details.BackgroundPath;
                    resource = result.data.Details.ResourcePath;

                    // Show current image background in right hand side when Edit Solopage
                    if (backgroundPath.length > 0) {
                        $scope.imageBackgroundPath = backgroundPath;
                    }

                    // solo page is used by uploading video or image
                    if (resource.length > 0 && checkURL(resource)) {
                        $scope.LinkImageResource = "image";
                        $scope.isShowResourceUploadImageFile = true;
                        $scope.isShowResourceVideoLink = false;
                        // Show current image resource in right hand side when Edit Solopage
                        $scope.imageResourcePath = resource;
                    } else {
                        $scope.LinkImageResource = "video";
                        $scope.isShowResourceUploadImageFile = false;
                        $scope.isShowResourceVideoLink = true;
                    }

                    // solo page is created by using shared code
                    if ($scope.editor.UseShareCode) {
                        $scope.editor.FromType = 5;
                    }

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

        function checkURL(url) {
            return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }

        function loadAutoresponders() {
            var entity = {
                "PageIndex": 1,
                "PageCount": 1000,
                "SessionKey": sessionKey
            };

            // Load the data from the API
            $scope.showSpinner = true;
            autoResponderService.GetAllGetResponseInfoByAccount(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.autoresponders = result.data.Details.Items;
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
            },
            loadAutoresponders: function () {
                loadAutoresponders();
            },
            getBackgroundFileDetails: function () {
                $scope.getBackgroundFileDetails = function (e) {

                    $scope.backgroundFiles = [];
                    $scope.$apply(function () {
                        // STORE THE FILE OBJECT IN AN ARRAY.
                        for (var i = 0; i < e.files.length; i++) {
                            $scope.backgroundFiles.push(e.files[i]);
                            backgroundPath = e.files[i].name;
                            $scope.isUploadFileDetails = true;
                        }
                    });
                };
            },
            uploadBackgroundFileDetailsAndEditSoloPage: function (editor) {
                // NOW UPLOAD THE FILES.
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();

                for (var i in $scope.backgroundFiles) {
                    data.append("uploadedFile", $scope.backgroundFiles[i]);
                    if ($scope.backgroundFiles[i].name) {
                        data.append("SessionKey", sessionKey);
                        break;
                    }
                }

                // ADD LISTENERS.
                var objXhr = new XMLHttpRequest();
                objXhr.addEventListener("progress", updateProgress, false);
                objXhr.addEventListener("load", transferComplete, false);

                // SEND FILE DETAILS TO THE API.
                objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
                objXhr.send(data);

                // UPDATE PROGRESS BAR.
                function updateProgress(e) {
                    if (e.lengthComputable) {
                        //document.getElementById('pro').setAttribute('value', e.loaded);
                        //document.getElementById('pro').setAttribute('max', e.total);
                    }
                }

                // CONFIRMATION.
                function transferComplete(e) {
                    var result = JSON.parse(e.target.response);
                    if (result.StatusCode == 0) {
                        editor.BackgroundPath = result.Details;
                        $scope.manageSoloPages.editSoloPage(editor);
                        $scope.isUploadFileDetails = false;
                    }
                    else {
                        notificationService.displaySuccess(result.StatusMsg);
                        $scope.isUploadFileDetails = false;
                    }
                }
            },
            editSoloPage: function (editor) {
                editorService.editSoloPage(editor, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        // Save and Review (open new tab)
                        if ($scope.saveMethod == 1) {
                            var soloPageUrlBuilder = '#/solo/page/' + ID + '/' + username + '/' + sessionKey;
                            notificationService.displaySuccess('Lưu Solo Page Thành Công');
                            //$location.path('app/editor2/solo/edit/' + ID);
                            $scope.showSpinner = false;
                            $timeout(function () {
                                $window.open(soloPageUrlBuilder, '_blank');
                                $window.location.reload();
                            }, 1000);
                        }

                        // Public page
                        if ($scope.saveMethod == 2) {
                            notificationService.displaySuccess('Xuất Bản Solo Page Thành Công');
                            $scope.showSpinner = false;
                            $localStorage.manageMyPageTab = 0;
                            $location.path('/app/editor2/solo/manage');
                        }

                        // Just save because this page is already publiced
                        if ($scope.saveMethod == 3) {
                            notificationService.displaySuccess('Lưu Trang Xuất Bản Thành Công');
                            $scope.showSpinner = false;
                            $localStorage.manageMyPageTab = 0;
                            $location.path('/app/editor2/solo/manage');
                        }

                        backgroundPath = "";
                        resourceUploadImageFullFileName = "";
                    }
                    else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displayError(result.data.StatusMsg);
                        backgroundPath = "";
                        resourceUploadImageFullFileName = "";
                    }
                });
            }
        };

        //$scope.manageSoloPages.init();
        $scope.manageSoloPages.loadMyPage();
        $scope.manageSoloPages.loadTitles();
        $scope.manageSoloPages.loadSubTitles();
        $scope.manageSoloPages.loadAutoresponders();
        $scope.manageSoloPages.getBackgroundFileDetails();
    }]);

app.controller('ResourceUploadImageFile', ["$scope", "$timeout", "$localStorage", "editorService", "notificationService",
    function ($scope, $timeout, $localStorage, editorService, notificationService) {
        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {
            $scope.showSpinner = true;
            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i]);
                }
            });

            //FILL FormData WITH FILE DETAILS.
            var SessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
            var data = new FormData();

            for (var i in $scope.files) {
                data.append("uploadedFile", $scope.files[i]);
                if ($scope.files[i].name) {
                    data.append("SessionKey", SessionKey);
                    break;
                }
            }

            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            $scope.showSpinner = true;
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
            objXhr.send(data);
        };

        // UPDATE PROGRESS BAR.
        function updateProgress(e) {
            if (e.lengthComputable) {
                //document.getElementById('pro').setAttribute('value', e.loaded);
                //document.getElementById('pro').setAttribute('max', e.total);
            }
        }

        // CONFIRMATION.
        function transferComplete(e) {
            //notificationService.displaySuccess("Upload file thành công");
            var result = JSON.parse(e.target.response);
            if (result.StatusCode == 0) {
                resourceUploadImageFullFileName = result.Details;
                $scope.imageResourcePath = result.Details;
                notificationService.displaySuccess("Upload file thành công");

                $timeout(function () {
                    $scope.showSpinner = false;
                }, 1000);
            }
            else {
                notificationService.displaySuccess(result.StatusMsg);
                $scope.showSpinner = false;
            }
        }
    }]);