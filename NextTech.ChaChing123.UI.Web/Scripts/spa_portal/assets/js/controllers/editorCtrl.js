'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
//var baseUrl = 'https://api.123chaching.app';
var baseUrl = 'http://localhost:1484';

app.controller('TabsEditorCtrl', ["$scope", "$window", "$localStorage", "$timeout", "editorService", "notificationService", function ($scope, $window, $localStorage, $timeout, editorService, notificationService) {
    var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
    var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

    $scope.master = $scope.user;
    $scope.showSpinner = false;
    $scope.isShareCodeHidden = true;
    $scope.formTypeVal = 1;
    $scope.saveMethod = 1;
    $scope.buttonColor = "";
    $scope.editor = {};

    $scope.$watch('formTypeVal', function (formTypeVal) {
        $scope.isShareCodeHidden = true;
        if (formTypeVal == 5) {
            $scope.isShareCodeHidden = $scope.isShareCodeHidden ? false : true;
        }
    });

    $scope.$watch('saveMethod', function (saveMethod) {
        console.log('save method ' + saveMethod);
    });

    $scope.clickMe1 = function () {
        $scope.saveMethod = 1;
    };

    $scope.clickMe2 = function () {
        $scope.saveMethod = 2;
    };

    $scope.getColorBackground = function (obj) {
        $scope.buttonColor = obj.target.attributes.data.value;
    };

    $scope.form = {
        submit: function (form) {
            console.log('main form');
            console.log($scope.saveMethod);
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
                        "UseShareCode": $scope.editor.UseShareCode,
                        "FromType": $scope.formTypeVal,
                        "IsAdvance": ($scope.editor.AutoresponderCodes != null || $scope.editor.TrackingCode != null) ? 1 : 0, // one of those are NOT equal NULL then customer is using advanced feature,
                        "Status": $scope.saveMethod,
                        "AutoresponderCodes": $scope.editor.AutoresponderCodes,
                        "TrackingCode": $scope.editor.TrackingCode,
                        "CreatedBy": username,
                        "SessionKey": sessionKey
                    };
                }

                $scope.showSpinner = true;
                editorService.createSoloPage(editor, function (result) {
                    if (result.data && result.data.StatusCode == 0) {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 2000);
                        notificationService.displaySuccess('Tạo Solo Page Thành Công');
                        backgroundPath = "";
                        resourcePath = "";
                        //$location.path('/app/home');
                        $window.open(baseUrl + '/#/solo/page/' + 1, '_blank');
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
        objXhr.open("POST", "http://localhost:1494/api/LandingPage/UploadFile/");
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
        var result = JSON.parse(e.target.response);
        if (result.StatusCode == 0) {
            notificationService.displaySuccess("Upload file thành công");
        } else {
            notificationService.displayError(result.StatusMsg);
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
        objXhr.open("POST", "http://localhost:1494/api/LandingPage/UploadFile/");
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
         var result = JSON.parse(e.target.response);
        if (result.StatusCode == 0) {
            notificationService.displaySuccess("Upload file thành công");
        } else {
            notificationService.displayError(result.StatusMsg);
        }
    }
}]);