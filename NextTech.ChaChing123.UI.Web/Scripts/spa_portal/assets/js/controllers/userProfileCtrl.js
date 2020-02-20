'use strict';
/** 
  * controller for Validation Form example
*/

(function () {
    'use strict';
    //var myApp = angular.module('ChaChingApp', ['angular-spinkit']);
    angular
        .module('ChaChingApp')
        .controller('UserCtrl', ['$scope', '$window', '$rootScope', '$localStorage', '$location', '$timeout', 'membershipService', 'notificationService',
            function ($scope, $window, $rootScope, $localStorage, $location, $timeout, membershipService, notificationService) {
                var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
                $scope.showSpinner = false;
                $scope.userInfo = {};

                function loadUserProfile() {
                    $scope.removeImage = function () {
                        $scope.noImage = true;
                    };

                    $scope.userInfo = {
                        firstName: 'Chi',
                        lastName: 'Nguyen Huu',
                        fullname: 'Nguyen Huu Chi',
                        username: '0933058984',
                        url: 'www.example.com',
                        email: 'peter@example.com',
                        phone: '(641)-734-4763',
                        gender: 'male',
                        zipCode: '12345',
                        city: 'London (UK)',
                        myavatar: 'assets/images/avatar-1-xl.jpg',
                        twitter: '',
                        github: '',
                        facebook: '',
                        linkedin: '',
                        google: '',
                        skype: 'peterclark82',
                        package: 'Cơ Bản',
                        refcode: '0944545356'
                    };

                    if ($scope.userInfo.avatar == '') {
                        $scope.noImage = true;
                    }

                    var userLogin = {
                        "UserName": username,
                        "SessionKey": sessionKey
                    };

                    $scope.showSpinner = true;
                    membershipService.GetAccountInfo(userLogin, function (result) {
                        $scope.userInfo = result.data.Details;
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
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

                $scope.userProfileManager = {
                    init: function () {
                        loadUserProfile();
                    },
                    edit: function () {
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
                                    var userLogin = {
                                        "FullName": $scope.userInfo.FullName,
                                        "UserName": $scope.userInfo.UserName,
                                        "SessionKey": sessionKey
                                    };

                                    $scope.showSpinner = true;
                                    membershipService.EditAccount(userLogin, function (result) {
                                        if (result.data && result.data.StatusCode == 17) {
                                            membershipService.checkMemberAuthorization();
                                        }

                                        if (result.data && result.data.StatusCode == 0) {
                                            $localStorage.currentUser.fullname = $scope.userInfo.FullName;
                                            notificationService.displaySuccess('Save Thông Tin Tài Khoản Của Tôi Thành Công');

                                            $timeout(function () {
                                                $scope.showSpinner = false;
                                                $window.location.reload();
                                            }, 2000);
                                        } else {
                                            //$scope.isLoading = false;

                                            $timeout(function () {
                                                $scope.showSpinner = false;
                                            }, 2000);

                                            notificationService.displayError(result.data.StatusMsg);
                                        }
                                    });
                                }
                            }
                        };
                    }
                };
                $scope.userProfileManager.init();
                $scope.userProfileManager.edit();
            }]);
})();

app.controller('UploadMyProfileCtrl', ["$scope", "$rootScope", "$timeout", "$localStorage", "editorService", "notificationService",
    function ($scope, $rootScope, $timeout, $localStorage, editorService, notificationService) {
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
            $scope.showSpinner = true;
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
            objXhr.open("POST", baseUrl + "/api/Account/UpdateAvatar/");
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

                $timeout(function () {
                    $scope.showSpinner = false;
                    $scope.myavatar = result.Details;
                    $localStorage.currentUser.myavatar = result.Details;
                    $scope.userData.displayUserInfo();
                }, 1000);
            }
            else {
                notificationService.displaySuccess(result.StatusMsg);
            }
        }
    }]);