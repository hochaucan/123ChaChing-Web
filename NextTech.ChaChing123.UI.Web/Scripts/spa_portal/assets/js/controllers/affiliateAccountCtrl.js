'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('AffiliateCtrl', ["$scope", "$localStorage", "membershipService", "affiliateService", "notificationService",
    function ($scope, $localStorage, membershipService, affiliateService, notificationService) {
        
    }]);

app.controller('AffiliateAccountCtrl', ["$scope", "$localStorage", function ($scope, $localStorage) {
    $scope.removeImage = function () {
        $scope.noImage = true;
    };

    var fullname = ($localStorage.currentUser) ? $localStorage.currentUser.fullname : "";
    var phone = ($localStorage.currentUser) ? $localStorage.currentUser.phone : "";

    $scope.affiliateInfo = {
        fullname: fullname,
        phone: phone
    };
    if ($scope.affiliateInfo.avatar == '') {
        $scope.noImage = true;
    }
}]);

app.controller('AffiliateWalletCtrl', ["$scope", "$localStorage", "membershipService", "affiliateService", "notificationService",
    function ($scope, $localStorage, membershipService, affiliateService, notificationService) {
        var affiliate = {};
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var fullname = ($localStorage.currentUser) ? $localStorage.currentUser.fullname : "";
        var phone = ($localStorage.currentUser) ? $localStorage.currentUser.phone : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        affiliate = {
            "username": username,
            "sessionkey": sessionkey
        };

        $scope.affiliateWalletInfo = {
            FullName: fullname,
            Phone: phone,
            Amount: '0.00',
            AffiliatePending: '0',
            AffiliateApproved: '0',
            AmountPending: '0.00',
            AmountApproved: '0.00'
        };

        // Load the data from the API
        affiliateService.getWalletInfoByAccount(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 17) {
                membershipService.checkMemberAuthorization();
            }

            if (result.data && result.data.StatusCode == 0) {
                $scope.affiliateWalletInfo = {
                    FullName: fullname,
                    Phone: phone,
                    Amount: result.data.Details.Amount,
                    AffiliatePending: result.data.Details.AffiliatePending,
                    AffiliateApproved: result.data.Details.AffiliateApproved,
                    AmountPending: result.data.Details.AmountPending,
                    AmountApproved: result.data.Details.AmountApproved
                };
            } else {
                notificationService.displayError(result.data.StatusMsg);
            }
        });

    }]);

app.controller('AffiliateNotificationCtrl', ["$scope", "$localStorage", "membershipService", "affiliateService",
    function ($scope, $localStorage, membershipService, affiliateService) {
        var affiliate = {};
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        affiliate = {
            "username": username,
            "sessionkey": sessionkey
        };

        $scope.affiliateNotifications = {};

        // Load the data from the API
        affiliateService.GetAfiliateAlertByAccount(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 17) {
                membershipService.checkMemberAuthorization();
            }

            if (result.data && result.data.StatusCode == 0) {
                $scope.affiliateNotifications = result.data.Details;
            } else {
                notificationService.displayError(result.data.StatusMsg);
            }
        });

    }]);

app.controller('SummaryReportByAccountForAffiliateAccountTabCtrl', ["$scope", "$localStorage", "membershipService", "affiliateService",
    function ($scope, $localStorage, membershipService, affiliateService) {
        $scope.loadingAffiliateComissionsReportForAffiliateAccountTab = true;
        var affiliate = {};
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        affiliate = {
            "username": username,
            "sessionkey": sessionkey,
            "yearlist": "2020"
        };

        $scope.affiliateComissionsReportForAffiliateAccountTab = {};

        // Load the data from the API
        affiliateService.GetSummaryReportByAccountAccount(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 17) {
                membershipService.checkMemberAuthorization();
            }

            if (result.data && result.data.StatusCode == 0) {
                $scope.affiliateComissionsReportForAffiliateAccountTab = result.data.Details;
                $scope.loadingAffiliateComissionsReportForAffiliateAccountTab = false;
            } else {
                notificationService.displayError(result.data.StatusMsg);
            }
        });

        //$scope.affiliateComissionsReportForAffiliateAccountTab = dataCom;
        //$scope.loadingAffiliateComissionsReportForAffiliateAccountTab = false;

    }]);

app.controller('AffiliateComissionsCtrl', ["$scope", "$window", "$location", "$localStorage", "$timeout", "affiliateService", "membershipService", "notificationService",
    function ($scope, $window, $location, $localStorage, $timeout, affiliateService, membershipService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var dateObj = new Date();
        var currentYear = dateObj.getFullYear();

        $scope.affiliateCommission = {
            KeyWord: currentYear
        };

        $scope.affiliateCommissionYear = {
            "currentYear": currentYear
        };

        var affiliate = {
            "username": username,
            "sessionkey": sessionkey,
            "yearlist": currentYear
        };

        $scope.affiliateComissionsReport = {};

        // Load the data from the API
        function loadSummaryReportByAccount(filter) {
            var keyword = "";

            if (filter !== undefined) {
                keyword = filter.KeyWord !== undefined && filter.KeyWord.length > 0 ? filter.KeyWord : currentYear;
            }

            affiliate = {
                "username": username,
                "sessionkey": sessionkey,
                "yearlist": keyword
            };


            $scope.showSpinner = false;
            affiliateService.GetSummaryReportByAccount(affiliate, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.affiliateComissionsReport = result.data.Details;

                    $scope.affiliateCommissionYear = {
                        "currentYear": keyword.length > 0 ? keyword : currentYear
                    };

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        } 

        function loadAfiliateListByAccount() {
            //2. Load GetAfiliateListByAccount from the API
            $scope.showSpinner = false;
            affiliateService.GetAfiliateListByAccount(affiliate, function (result) {
                if (result.data && result.data.StatusCode == 0) {
                    $scope.affiliateListByAccount = result.data.Details;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        function doSearching() {
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
                        var filter = {
                            "KeyWord": $scope.affiliateCommission.KeyWord
                        };

                        loadSummaryReportByAccount(filter);
                    }
                }
            };
        }

        $scope.AffilateComissionManager = {
            init: function () {
                doSearching();
                loadSummaryReportByAccount();
                loadAfiliateListByAccount();
            }
        };

        $scope.AffilateComissionManager.init();
    }]);

app.controller('RequestWithdrawalCtrl', ["$scope", "$uibModal", "affiliateService", "notificationService", function ($scope, $uibModal, affiliateService, notificationService) {
    $scope.requestWithdrawal = function (size) {
        //notificationService.displayInfo("start getting link for affiliate");
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl1',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };
}]);

app.controller('AffiliateGetLinkCtrl', ["$scope", "$uibModal", "affiliateService", "notificationService", function ($scope, $uibModal, affiliateService, notificationService) {
    $scope.getLink = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalGetLinkAffiliate.html',
            controller: 'ModalInstanceCtrl2',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }
}]);

app.controller('ModalInstanceCtrl1', ["$scope", "$timeout", "$localStorage", "$uibModalInstance", "items", "membershipService", "affiliateService", "notificationService",
    function ($scope, $timeout, $localStorage, $uibModalInstance, items, membershipService, affiliateService, notificationService) {
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        $scope.ok = function () {

        };

        $scope.showSpinner = false;
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

                    var affiliate = {};

                    affiliate = {
                        "UserName": username,
                        "BeneAccountName": $scope.affiliate.BeneAccountName,
                        "BeneBankName": $scope.affiliate.BeneBankName,
                        "BeneAccountNo": $scope.affiliate.BeneAccountNo,
                        "Amount": $scope.affiliate.Amount,
                        "Remarks": $scope.affiliate.Remarks,
                        "SessionKey": sessionkey
                    };

                    $scope.showSpinner = true;
                    // Load the data from the API
                    affiliateService.RequestWithDrawall(affiliate, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            notificationService.displaySuccess(result.data.StatusMsg);
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 2000);
                        } else {
                            notificationService.displayError(result.data.StatusMsg);
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 2000);
                        }
                        $uibModalInstance.dismiss('cancel');
                    });
                }

            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ModalInstanceCtrl2', ["$scope", "$localStorage", "$uibModalInstance", "items", "membershipService", "affiliateService", "notificationService",
    function ($scope, $localStorage, $uibModalInstance, items, membershipService, affiliateService, notificationService) {
        $scope.ok = function () {

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
                    //SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");

                    return;

                } else {
                    //SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
                    //your code for submit

                    var affiliate = {};
                    var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                    var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                    affiliate = {
                        "ContractNo": sessionkey,
                        "BeneAccountName": $scope.affiliate.BeneAccountName,
                        "BeneBankName": $scope.affiliate.BeneBankName,
                        "BeneAccountNo": $scope.affiliate.BeneAccountNo,
                        "Amount": $scope.affiliate.Amount,
                        "Remarks": $scope.affiliate.Remarks
                    };

                    // Load the data from the API
                    affiliateService.add(affiliate, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            notificationService.displaySuccess(result.data.StatusMsg);
                        } else {
                            notificationService.displayError(result.data.StatusMsg);
                        }
                        $uibModalInstance.dismiss('cancel');
                    });
                }

            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.initGetLinkAffiliate = {
            init: function () {
                var affiliateObj = {};

                affiliateObj = {
                    "affiliateUrl": "https://"
                };

                var affiliate = {};
                var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                affiliate = {
                    "username": username,
                    "sessionkey": sessionkey,
                };

                // Load the data from the API
                affiliateService.getLinkAffiliate(affiliate, function (result) {
                    if (result.data && result.data.StatusCode == 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode == 0) {
                        //notificationService.displaySuccess("Lấy link Affiliate " + result.data.StatusMsg);

                        affiliateObj = {
                            "affiliateUrl": result.data.Details
                        };

                        $scope.affiliate = affiliateObj;
                    } else {
                        notificationService.displayError(result.data.StatusMsg);
                    }
                    //$uibModalInstance.dismiss('cancel');
                });

            }
        };

        $scope.initGetLinkAffiliate.init();

    }]);

app.controller('AffiliateLinkvAccordionCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "$uibModal", "affiliatelinkService", "commonService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, $uibModal, affiliatelinkService, commonService, membershipService, notificationService) {
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        $scope.showSpinner = false;
        $scope.affiliateLinksPanes = [];

        function loadAffiliateLinks() {
            $scope.affiliateLinks = {};
            $scope.showSpinner = true;
            // Load the data from the API
            var lead = {
                "SessionKey": sessionKey
            };

            $scope.firstAccordionControl = {
                onExpand: function (expandedPaneIndex) {
                    console.log('expanded:', expandedPaneIndex);
                },
                onCollapse: function (collapsedPaneIndex) {
                    console.log('collapsed:', collapsedPaneIndex);
                }
            };

            var entity = {
                "ID": "-1",
                "SessionKey": sessionKey
            };
            // Load the data from the API
            $scope.showSpinner = true;
            affiliatelinkService.GetAllAffiliateLink(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.documents = result.data.Details.Items;

                    var groupbyItems = commonService.groupBy($scope.documents, 'AffiliateLinksID');
                    var distinctItemsByCategoryName = commonService.removeDuplicates($scope.documents, 'AffiliateLinksName');

                    angular.forEach(distinctItemsByCategoryName, function (link, index) {
                        var affiliateLinkHeader = "";
                        var affiliateLinkContent = [];
                        var affiliateLink = {};

                        var _affLinkCateID = link.AffiliateLinksID;
                        affiliateLinkHeader = link.AffiliateLinksName;
                        // group item by category id
                        if (_affLinkCateID > 0) {
                            var affiliateLinkByCategoryID = groupbyItems[_affLinkCateID];
                            angular.forEach(affiliateLinkByCategoryID, function (l, i) {
                                var content = {
                                    'affiliateLinkID': l.ID,
                                    'affiliateLinkCategoryID': l.AffiliateLinksID,
                                    'header': l.Title,
                                    'content': l.Content,
                                    'link': l.Link,
                                    'thumbnail': l.ThumbnailImage
                                };
                                affiliateLinkContent.push(content);
                            });

                            affiliateLink = {
                                header: affiliateLinkHeader,
                                content: affiliateLinkContent
                            };

                            $scope.affiliateLinksPanes.push(affiliateLink);
                        }
                    });

                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
            
        }

        $scope.changeImage = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalImagePreview.html',
                controller: 'ModalImagePreviewCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.currentTarget.attributes.data.value;
                    }
                }
            });
        };

        $scope.previewAffiliateLink = function (affiliateLinkID, thumbnailImg) {

        };

        $scope.shareAffiliateLink = function (affiliateLinkID) {

        };

        $scope.viewAffiliateLink = function (link) {
            if (link !== undefined && link.length > 0) {
                $window.open(link, '_blank');
            }
            return;
        };

        $scope.AffiliateLinkManager = {
            init: function () {
                loadAffiliateLinks();
            }
        };

        $scope.AffiliateLinkManager.init();
    }]);

app.controller('ModalImagePreviewCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, membershipService, notificationService) {
        var affiliateLinkID = "";
        var affiliateLinkImg = "";
        $scope.imgPreview = "";

        var affiliateLinkInfo = items ? items : "";
        var affiliateLinkSplit = affiliateLinkInfo.split('|');
        if (affiliateLinkSplit.length > 0) {
            affiliateLinkID = affiliateLinkSplit[0];
            affiliateLinkImg = affiliateLinkSplit[1];
        }

        if (affiliateLinkImg.length > 0) {
            $scope.imgPreview = affiliateLinkImg;
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('AffiliateLinkBannerManagerCtrl', ["$scope", "$http", "$rootScope", "$window", "$localStorage", "$timeout", "affiliatelinkBannerService", "membershipService", "notificationService",
    function ($scope, $http, $rootScope, $window, $localStorage, $timeout, affiliatelinkBannerService, membershipService, notificationService) {
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.bannerDownloadLink = "";

        function loadBanners() {
            var entity = {
                "SessionKey": sessionKey
            };
            // Load the data from the API
            $scope.showSpinner = true;
            affiliatelinkBannerService.GetBannerLink(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.bannerDownloadLink = result.data.Details;
                    
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

        $scope.AffiliateLinkBannerManager = {
            init: function () {
                loadBanners();
            }
        };

        $scope.downloadBanner = function (bannerLink) {
            if (bannerLink !== undefined && bannerLink.length > 0) {
                $window.open(bannerLink, '_blank');
            }
        };

        $scope.downloadFile = function (name) {
            $http({
                method: 'GET',
                url: 'https://123chaching.app/api/downloadresource/download',
                params: { name: name },
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                headers = headers();

                var filename = headers['x-filename'];
                var contentType = headers['content-type'];

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        $scope.AffiliateLinkBannerManager.init();
    }]);