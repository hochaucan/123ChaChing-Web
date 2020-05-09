'use strict';
/** 
  * controller for User Profile Example
*/

var baseUrl = 'https://api.123chaching.app';
app.controller('FunnelPreviewPublicPageCtrl', ["$scope", "$sce", "$window", "$location", "$localStorage", "$timeout", "membershipService", "editorService", "soloPageService", "funnelsService", "notificationService",
    function ($scope, $sce, $window, $location, $localStorage, $timeout, membershipService, editorService, soloPageService, funnelsService, notificationService) {
        var funnelID = 0;
        var soloID = 0;
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var funnelView = "";
        var formType = 0;
        $scope.isNextFunnel = false;
        $scope.nextFunnelPage = "";
        $scope.lead = {};
        var destinationURL = "";

        var _leadName = "";
        var _leadEmail = "";
        var _leadPhone = "";
        var _leadBody = "";
        var _soloPageName = "";

        $scope.pushToken = "";
        $scope.soloPageName = "";

        // /app/funnel/preview/58/183
        // locationURL[2] = preview OR public
        // locationURL[3] = ID

        var locationURL = $location.url().split('/');

        if (locationURL[2]) {
            funnelView = locationURL[2];
        }

        if (locationURL[3]) {
            funnelID = locationURL[3];
        }

        if (locationURL[4]) {
            soloID = locationURL[4];
        }

        $scope.formType = 1;
        $scope.soloPageDetails = {};
        var soloPageObj = {};


        soloPageObj = {
            "ID": funnelID,
            "UserName": username,
            "SessionKey": sessionKey
        };

        function formSubmit() {
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
                        //SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
                        //your code for submit
                        //notificationService.displayInfo('You are submitting the form');

                        var bodyBuilder = "";
                        _leadName = ($scope.lead.name) ? $scope.lead.name : "";
                        _leadEmail = ($scope.lead.email) ? $scope.lead.email : "";
                        _leadPhone = ($scope.lead.phone) ? $scope.lead.phone : "";
                        _soloPageName = $scope.soloPageName;

                        if (_leadName.length > 0)
                            bodyBuilder += _leadName + ', ';

                        if (_leadEmail.length > 0)
                            bodyBuilder += _leadEmail + ', ';

                        if (_leadPhone.length > 0)
                            bodyBuilder += _leadPhone;

                        var indexCommaChar = bodyBuilder.indexOf(', ');
                        var isHasCommaChar = indexCommaChar !== -1;
                        if (isHasCommaChar)
                            _leadBody = bodyBuilder.substring(0, indexCommaChar) + ' da dang ky Solo Page';

                        if (_soloPageName.length > 0)
                            _leadBody = _leadBody + ' ' + _soloPageName;

                        var leadRes = {
                            "Name": ($scope.lead.name) ? $scope.lead.name : "",
                            "Email": ($scope.lead.email) ? $scope.lead.email : "",
                            "Phone": ($scope.lead.phone) ? $scope.lead.phone : "",
                            "SoloID": soloID,
                            "FunnelID": funnelID
                        };

                        var indexOfHttps = -1;
                        destinationURL = angular.element('#refLink').val();
                        formType = angular.element('#formTypeID').val();

                        if (formType != undefined && formType == 4 && destinationURL.length > 0) {
                            indexOfHttps = destinationURL.indexOf('http') || destinationURL.indexOf('https');
                            if (indexOfHttps === -1) {
                                destinationURL = 'http://' + destinationURL;
                            }
                            $window.open(destinationURL, '_blank');
                        } else {
                            $scope.showSpinner = true;
                            // Load the data from the API
                            editorService.RegisterLeadBySoloPage(leadRes, function (result) {
                                if (result.data && result.data.StatusCode == 17) {
                                    membershipService.checkMemberAuthorization();
                                }

                                if (result.data && result.data.StatusCode == 0) {
                                    notificationService.displaySuccess('Đăng ký thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất');

                                    // push notification if lead has registrated successfully on SOLO page
                                    var pushToken = $scope.pushToken;
                                    var title = "*** Chuc mung ban! ***";
                                    var sound = "default";
                                    var body = _leadBody;

                                    // Load the data from the API
                                    if (pushToken.length > 0) {
                                        const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
                                        let data = {
                                            "to": pushToken,
                                            "title": title,
                                            "body": body,
                                            "sound": sound,
                                            "priority": 'high'
                                        };

                                        fetch(PUSH_ENDPOINT, {
                                            'mode': 'no-cors',
                                            'method': 'POST',
                                            'headers': {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        }).catch(err => console.log(err));
                                    }

                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                        if (destinationURL && destinationURL.length > 0) {
                                            $window.open(destinationURL, '_blank');
                                        }
                                    }, 1000);
                                } else {
                                    notificationService.displayError(result.data.StatusMsg);
                                    $timeout(function () {
                                        $scope.showSpinner = false;
                                    }, 2000);
                                }
                            });
                        }
                    }

                }
            };
        }

        function loadFunnelDetailsPublicPage() {
            soloPageObj = {
                "FunnalID": funnelID,
                "SoloID": soloID
            };

            funnelsService.GetFunnalDetailsPublicPage(soloPageObj, function (result) {
                //if (result.data && result.data.StatusCode === 17) {
                //    membershipService.checkMemberAuthorization();
                //}

                if (!result.data.Details) {
                    $location.path('/error/404');
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.soloPageDetails = result.data.Details.SoloObj;

                    $scope.formType = $scope.soloPageDetails.FromType;
                    $scope.Title = $scope.soloPageDetails.Title;
                    $scope.SubTitle = $scope.soloPageDetails.SubTitle;
                    $scope.ButtonName = $scope.soloPageDetails.ButtonName;
                    $scope.ButtonColor = $scope.soloPageDetails.ButtonColor;
                    $scope.pushToken = $scope.soloPageDetails.PushToken;
                    $scope.soloPageName = $scope.soloPageDetails.PageName;

                    var findWatchIndex = -1;
                    var fullResourcePath = "";
                    fullResourcePath = $scope.soloPageDetails.ResourcePath;
                    if (fullResourcePath.length > 0) {
                        var linkImage = fullResourcePath.match(/\.(jpeg|jpg|gif|png)$/) != null;
                        if (linkImage) { // Display Image
                            $scope.isShowImageSource = true;
                            $scope.ImageSource = fullResourcePath;
                        } else { // Diplay Video
                            $scope.isShowVideoSource = true;
                            findWatchIndex = fullResourcePath.indexOf('watch?v=');
                            if (findWatchIndex != -1) {
                                fullResourcePath = fullResourcePath.replace('watch?v=', 'embed/');
                            }

                            $scope.VideoSource = $sce.trustAsResourceUrl(fullResourcePath);
                        }
                    }

                    document.body.style.backgroundImage = "url('" + result.data.Details.SoloObj.BackgroundPath + "')";

                    var nextSoloID = result.data.Details.SoloObj.NextSoloID;
                    if (nextSoloID > 0) {
                        $scope.isNextFunnel = true;
                        $scope.nextFunnelPage = '#/funnel/public/' + funnelID + '/' + nextSoloID;
                    }
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function loadFunnelDetailsPreviewPage() {
            soloPageObj = {
                "FunnalID": funnelID,
                "SoloID": soloID,
                "UserName": username,
                "SessionKey": sessionKey
            };

            funnelsService.GetFunnalDetailsPreviewPage(soloPageObj, function (result) {
                //if (result.data && result.data.StatusCode == 17) {
                //    membershipService.checkMemberAuthorization();
                //}

                if (!result.data.Details) {
                    $location.path('/error/404');
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.soloPageDetails = result.data.Details.SoloObj;

                    var findWatchIndex = -1;
                    var fullResourcePath = "";
                    fullResourcePath = $scope.soloPageDetails.ResourcePath;
                    if (fullResourcePath.length > 0) {
                        var linkImage = fullResourcePath.match(/\.(jpeg|jpg|gif|png)$/) != null;
                        if (linkImage) { // Display Image
                            $scope.isShowImageSource = true;
                            $scope.ImageSource = fullResourcePath;
                        } else { // Diplay Video
                            $scope.isShowVideoSource = true;
                            findWatchIndex = fullResourcePath.indexOf('watch?v=');
                            if (findWatchIndex != -1) {
                                fullResourcePath = fullResourcePath.replace('watch?v=', 'embed/');
                            }

                            $scope.VideoSource = $sce.trustAsResourceUrl(fullResourcePath);
                        }
                    }

                    document.body.style.backgroundImage = "url('" + result.data.Details.SoloObj.BackgroundPath + "')";

                    funnelsService.GetDetailFunnalPage({ ID: funnelID, UserName: username, SessionKey: sessionKey }, function (result) {
                        if (result.data && result.data.StatusCode == 0) {
                            var soloIDList = result.data.Details.SoloIDList;
                            var soloPagesArr = soloIDList.split(',');
                            if (soloPagesArr.length > 0) {
                                var nextSoloID = getNextElement(soloID, soloPagesArr);
                                if (nextSoloID > 0) {
                                    $scope.isNextFunnel = true;
                                    $scope.nextFunnelPage = '#/funnel/preview/' + funnelID + '/' + nextSoloID;
                                }
                            }
                        }
                    });
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        function getNextElement(value, soloPagesArray) {
            var nextItem = 0;
            var index = soloPagesArray.indexOf(value);
            if (index >= 0 && index < soloPagesArray.length - 1)
                nextItem = soloPagesArray[index + 1];

            return nextItem;
        }

        $scope.funnelPreviewPublicManager = {
            init : function () {
                formSubmit();
            },
            preview: function() {
                loadFunnelDetailsPreviewPage();
            },
            public: function () {
                loadFunnelDetailsPublicPage();
            }
        };

        $scope.funnelPreviewPublicManager.init();
        if (funnelView.length > 0 && funnelView == "preview") {
            $scope.funnelPreviewPublicManager.preview();
        } else {
            $scope.funnelPreviewPublicManager.public();
        }

    }]);