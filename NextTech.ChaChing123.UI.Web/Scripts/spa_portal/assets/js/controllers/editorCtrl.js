'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('TabsEditorCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, membershipService, editorService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";

        $scope.master = $scope.user;
        $scope.showSpinner = false;
        $scope.isShowTitleTemplate = false;
        $scope.isShowSubTitleTemplate = false;
        $scope.isShareCodeHidden = true;
        $scope.isThankYouContentHidden = true;
        $scope.formTypeVal = 1;
        $scope.saveMethod = 1;
        $scope.buttonColor = "";
        $scope.IsAdvanceAccount = (accountType == 2) ? true : false;
        $scope.editor = {};
        $scope.titles = {};
        $scope.subtitles = {};

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
            loadTitles: function () {
                $scope.showSpinner = true;
                editorService.loadTitles({ SessionKey: sessionKey }, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.titles = result.data.Details;
                    }
                    else {
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            },
            loadSubTitles: function () {
                $scope.showSpinner = true;
                editorService.loadSubTitles({ SessionKey: sessionKey }, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.removeCredentials();
                        $location.path('/app/login/signin');
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.subtitles = result.data.Details;
                        $scope.showSpinner = false;
                    }
                    else {
                        notificationService.displayError(result.data.StatusMsg);
                        $scope.showSpinner = false;
                    }
                });
            }
        };
        $scope.manageSoloPages.init();
        $scope.manageSoloPages.loadTitles();
        $scope.manageSoloPages.loadSubTitles();

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

        $scope.$watch('formTypeVal', function (formTypeVal) {
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
        });

        $scope.clickMe1 = function () {
            $scope.saveMethod = 1;
        };

        $scope.clickMe2 = function () {
            $scope.saveMethod = 2;
        };

        $scope.getColorBackground = function (obj) {
            var buttonColor = obj.target.attributes.data.value;
            $scope.buttonColor = buttonColor;
            if (buttonColor && buttonColor.length > 0) {
                var idBuilder = buttonColor.substr(1, buttonColor.length - 1);
                angular.element('.color').removeClass("color-select");
                angular.element('#' + idBuilder + '').addClass("color-select");
            }
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
                        "CreatedBy": username,
                        "SessionKey": sessionKey
                    };

                    if ($scope.formTypeVal != 5) {
                        editor = {
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
                            "FromType": $scope.formTypeVal,
                            "IsAdvance": ($scope.editor.AutoresponderCodes != null || $scope.editor.TrackingCode != null) ? 2 : 1, // one of those are NOT equal NULL then customer is using advanced feature,
                            "Status": $scope.saveMethod,
                            "AutoresponderCodes": ($scope.editor.AutoresponderCodes) ? $scope.editor.AutoresponderCodes : "",
                            "TrackingCode": ($scope.editor.TrackingCode) ? $scope.editor.TrackingCode : "",
                            "CreatedBy": username,
                            "SessionKey": sessionKey
                        };
                    }

                    $scope.showSpinner = true;
                    editorService.createSoloPage(editor, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            backgroundPath = "";
                            resourcePath = "";
                            if ($scope.saveMethod == 1) {
                                var soloPageUrlBuilder = 'https://123chaching.app/#/solo/page/' + result.data.Details.ID + '/' + username + '/' + sessionKey;
                                notificationService.displaySuccess('Lưu Solo Page Thành Công');
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    if (result.data.Details) {
                                        soloPageUrlBuilder = result.data.Details.urlPath;
                                    }
                                    $window.open(soloPageUrlBuilder, '_blank');
                                }, 2000);
                            }
                            else {
                                notificationService.displaySuccess('Xuất Bản Solo Page Thành Công');
                                $scope.showSpinner = false;
                                $localStorage.manageMyPageTab = 0;

                                $timeout(function () {
                                    angular.element('#manageSoloPage a').trigger('click');
                                }, 1000);
                                
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

    }]);
app.controller('TabsEditorMyPageCtrl', ["$scope", "$uibModal", "$window", "$localStorage", "$timeout", "membershipService", "editorService", "notificationService",
    function ($scope, $uibModal, $window, $localStorage, $timeout, membershipService, editorService, notificationService) {
        $scope.soloPageID = 0;

        angular.element('#manageSoloPage a').click(function () {
            $scope.manageMyPages.loadMyPages();
        });

        $scope.manageMyPages = {
            loadMyPages: function () {
                $scope.master = $scope.user;
                $scope.showSpinner = false;

                var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
                var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";

                $scope.myPages = {};
                $scope.isPublicLink = true;

                var userObj = {
                    UserName: username,
                    SessionKey: sessionKey
                };

                $scope.showSpinner = true;
                editorService.getMyPages(userObj, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.myPages = result.data.Details;
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
        }

        $scope.manageMyPages.loadMyPages();

        $scope.deleteSoloPage = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalDeleteSoloPage.html',
                controller: 'ModalDeleteSoloPageCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.soloPageID = size.target.attributes.data.value;
                        return $scope.soloPageID;
                    }
                }
            });
        };
        $scope.shareSoloPageCode = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalGenerateSharedCode.html',
                controller: 'ModalGenerateSharedCodeCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.soloPageID = size.target.attributes.data.value;
                        return $scope.soloPageID;
                    }
                }
            });
        };
    }]);
app.controller('soloPageUploadFileCtrl', ["$scope", "$localStorage", "editorService", "notificationService", function ($scope, $localStorage, editorService, notificationService) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i]);
            }
        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

        //FILL FormData WITH FILE DETAILS.
        var SessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("uploadedFile", $scope.files[i]);
            console.log("Upload file " + $scope.files[i].name);
            if ($scope.files[i].name) {
                backgroundPath = $scope.files[i].name;
                data.append("SessionKey", SessionKey);
                break;
            }
        }



        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        //objXhr.open("POST", "http://localhost:1494/api/fileupload/uploadfiles/");
        objXhr.open("POST", baseUrl + "/api/LandingPage/UploadFile/");
        objXhr.send(data);

        //editorService.uploadFile(data, function (result) {
        //    if (result.data && result.data.StatusCode == 0) {
        //        notificationService.displaySuccess('Upload file thành công');
        //    } else {
        //        notificationService.displayError(result.data.StatusMsg);
        //    }
        //});
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
        console.log(e);
        var result = JSON.parse(e.target.response);
        if (result.StatusCode == 0) {
            notificationService.displaySuccess("Upload file thành công");
        }
        else {
            notificationService.displaySuccess(result.StatusMsg);
        }
    }
}]);
app.controller('soloPageUploadResourceCtrl', ["$scope", "$localStorage", "editorService", "notificationService", function ($scope, $localStorage, editorService, notificationService) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i]);
            }
        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

        //FILL FormData WITH FILE DETAILS.
        var SessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("uploadedFile", $scope.files[i]);
            console.log("Upload resource " + $scope.files[i].name);
            if ($scope.files[i].name) {
                resourcePath = $scope.files[i].name;
                data.append("SessionKey", SessionKey);
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
        console.log(e);
        var result = JSON.parse(e.target.response);
        if (result.StatusCode == 0) {
            notificationService.displaySuccess("Upload file thành công");
        }
        else {
            notificationService.displaySuccess(result.StatusMsg);
        }
    }
}]);
app.controller('ModalDeleteSoloPageCtrl', ["$scope", "$window", "$timeout", "$location", "$localStorage", "$uibModalInstance", "items", "membershipService", "editorService", "notificationService",
    function ($scope, $window, $timeout, $location, $localStorage, $uibModalInstance, items, membershipService, editorService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        $scope.ok = function () {
            var ID = items;

            var soloPageObj = {
                "ID": ID,
                "UserName": username,
                "SessionKey": sessionKey
            };

            editorService.deleteSoloPage(soloPageObj, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    notificationService.displaySuccess('Delete Solo Page Thành Công');
                    $uibModalInstance.dismiss('cancel');
                    $localStorage.manageMyPageTab = result.data.StatusCode;

                    $window.location.reload();

                    //angular.element('#manageSoloPage a').trigger('click');
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 2000);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.manageMyPages = {
            loadMyPages: function () {
                $scope.master = $scope.user;
                $scope.showSpinner = false;

                $scope.myPages = {};
                $scope.isPublicLink = true;

                var userObj = {
                    UserName: username,
                    SessionKey: sessionKey
                };

                $scope.showSpinner = true;
                editorService.getMyPages(userObj, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        $scope.myPages = result.data.Details;
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
        }
    }]);
app.controller('ModalGenerateSharedCodeCtrl', ["$scope", "$window", "$timeout", "$location", "$localStorage", "$uibModalInstance", "items", "editorService", "notificationService",
    function ($scope, $window, $timeout, $location, $localStorage, $uibModalInstance, items, editorService, notificationService) {
        $scope.editor = {};
        $scope.ok = function () {
            
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.modalSoloPageSharingCode = {
            init: function () {
                $scope.editor.soloPageShareCode = items;
            }
        };

        $scope.modalSoloPageSharingCode.init();
    }]);