'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourceUploadImageFullFileName = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('TabsEditorCtrl', ["$scope", "$rootScope", "$window", "$location", "$localStorage", "$timeout", "autoResponderService", "membershipService", "editorService", "notificationService",
    function ($scope, $rootScope, $window, $location, $localStorage, $timeout, autoResponderService, membershipService, editorService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var accountType = ($localStorage.currentUser) ? $localStorage.currentUser.accountType : "";

        $scope.master = $scope.user;
        $scope.showSpinner = false;
        $scope.isShowTitleTemplate = false;
        $scope.isShowSubTitleTemplate = false;
        $scope.isShareCodeHidden = true;
        $scope.isShowResourceUploadImageFile = false;
        $scope.isShowResourceVideoLink = true;
        $scope.LinkImageResource = "video";
        $scope.ResourceSelected = "";
        $scope.isThankYouContentHidden = true;
        $scope.formTypeVal = 1;
        $scope.saveMethod = 1;
        $scope.buttonColor = "";
        $scope.IsAdvanceAccount = accountType === 2 ? true : false;
        $scope.editor = {};
        $scope.titles = {};
        $scope.subtitles = {};
        $scope.autoresponders = {};

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

            // is Used for Share Code Purpose
            if (formTypeVal == 5) {
                $scope.isThankYouContentHidden = true;
                $scope.isShareCodeHidden = $scope.isShareCodeHidden ? false : true;
            }

            // Page Thanks
            if (formTypeVal == 4) {
                $scope.isShareCodeHidden = true;
                $scope.isThankYouContentHidden = $scope.isThankYouContentHidden ? false : true;
            }
        });

        $scope.$watch('LinkImageResource', function (LinkImageResource) {
            $scope.LinkImageResource = LinkImageResource;
        });

        $scope.ResourceUploadRadioChange = function (s) {
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
                            "ResourcePath": $scope.editor.ResourcePath,
                            "UseShareCode": "",
                            "ThankYouContent": $scope.editor.ThankYouContent,
                            "FromType": $scope.formTypeVal,
                            "IsAdvance": accountType === 2 ? 1 : 0,
                            "Status": $scope.saveMethod,
                            "AutoresponderCodes": ($scope.editor.AutoresponderCodes) ? $scope.editor.AutoresponderCodes : "",
                            "TrackingCode": ($scope.editor.TrackingCode) ? $scope.editor.TrackingCode : "",
                            "CreatedBy": username,
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
                    if (backgroundPath && backgroundPath.length > 0) {
                        $scope.manageSoloPages.uploadBackgroundFileDetailsAndCreateSoloPage(editor);
                    } else {
                        $scope.manageSoloPages.createSoloPage(editor);
                    }
                }
            }
        };

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
                        }
                    });
                };
            },
            uploadBackgroundFileDetailsAndCreateSoloPage: function (editor) {
                // NOW UPLOAD THE FILES.
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                var soloPages = editor;

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
                        $scope.manageSoloPages.createSoloPage(editor);
                        //1.2 Save solo object to database

                    }
                    else {
                        notificationService.displaySuccess(result.StatusMsg);
                    }
                }
            },
            createSoloPage: function (editor) {
                editorService.createSoloPage(editor, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        if ($scope.saveMethod == 1) {
                            var soloPageUrlBuilder = '';
                            var soloID = 0;
                            notificationService.displaySuccess('Lưu Solo Page Thành Công');
                            var urlPath = result.data.Details.urlPath;
                            var parts = urlPath.split('/');
                            soloID = parts[parts.length - 3];
                            if (soloID > 0)
                                $location.path('/app/editor2/solo/edit/' + soloID);

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

                            $location.path('/app/editor2/solo/manage');
                        }
                    }
                    else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displayError(result.data.StatusMsg);
                        backgroundPath = "";
                    }
                });
            }
        };

        $scope.manageSoloPages.init();
        $scope.manageSoloPages.loadTitles();
        $scope.manageSoloPages.loadSubTitles();
        $scope.manageSoloPages.loadAutoresponders();
        $scope.manageSoloPages.getBackgroundFileDetails();

    }]);
app.controller('soloPageUploadFileCtrl', ["$scope", "$localStorage", "editorService", "notificationService",
    function ($scope, $localStorage, editorService, notificationService) {
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
                backgroundPath = result.Details;
                notificationService.displaySuccess("Upload file thành công");
            }
            else {
                notificationService.displaySuccess(result.StatusMsg);
            }
        }
    }]);
app.controller('soloPageUploadResourceCtrl', ["$scope", "$localStorage", "editorService", "notificationService",
    function ($scope, $localStorage, editorService, notificationService) {
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
            var result = JSON.parse(e.target.response);
            if (result.StatusCode == 0) {
                resourcePath = result.Details;
                notificationService.displaySuccess("Upload file thành công");
            }
            else {
                notificationService.displaySuccess(result.StatusMsg);
            }
        }
    }]);
app.controller('ResourceUploadImageFile', ["$scope", "$timeout", "$localStorage", "editorService", "notificationService", function ($scope, $timeout, $localStorage, editorService, notificationService) {
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