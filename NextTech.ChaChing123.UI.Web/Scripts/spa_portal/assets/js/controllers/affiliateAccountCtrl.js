'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('AffiliateCtrl', ["$scope", "$localStorage", "affiliateService", "notificationService", function ($scope, $localStorage, affiliateService, notificationService) {
    $scope.getaffiliateComissions = function () {
        var affiliate = {};
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.loadingAffiliateSummaryReportByAccount = true;
        $scope.loadingAffiliateListByAccount = true;

        affiliate = {
            "username": username,
            "sessionkey": sessionkey,
            "yearlist": "2020"
        };

        $scope.affiliateComissionsReport = {};

        // Load the data from the API
        affiliateService.GetSummaryReportByAccount(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 0) {
                $scope.affiliateComissionsReport = result.data.Details;
                $scope.loadingAffiliateSummaryReportByAccount = false;
            } else {
                notificationService.displayError(result.data.StatusMsg);
                $scope.loadingAffiliateSummaryReportByAccount = false;
            }
        });

        //2. Load GetAfiliateListByAccount from the API
        affiliateService.GetAfiliateListByAccount(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 0) {
                $scope.affiliateListByAccount = result.data.Details;
                $scope.loadingAffiliateListByAccount = false;
            } else {
                notificationService.displayError(result.data.StatusMsg);
                $scope.loadingAffiliateListByAccount = false;
            }
        });
    };
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

app.controller('AffiliateWalletCtrl', ["$scope", "$localStorage", "affiliateService", "notificationService", function ($scope, $localStorage, affiliateService, notificationService) {
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

app.controller('AffiliateNotificationCtrl', ["$scope", "$localStorage", "affiliateService", function ($scope, $localStorage, affiliateService) {
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
        if (result.data && result.data.StatusCode == 0) {
            $scope.affiliateNotifications = result.data.Details;
        } else {
            notificationService.displayError(result.data.StatusMsg);
        }
    });

}]);

app.controller('SummaryReportByAccountForAffiliateAccountTabCtrl', ["$scope", "$localStorage", "affiliateService", function ($scope, $localStorage, affiliateService) {
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

app.controller('ModalInstanceCtrl1', ["$scope", "$timeout", "$localStorage", "$uibModalInstance", "items", "affiliateService", "notificationService", function ($scope, $timeout, $localStorage, $uibModalInstance, items, affiliateService, notificationService) {
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

                $scope.showSpinner = true;
                // Load the data from the API
                affiliateService.add(affiliate, function (result) {
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

app.controller('ModalInstanceCtrl2', ["$scope", "$localStorage", "$uibModalInstance", "items", "affiliateService", "notificationService", function ($scope, $localStorage, $uibModalInstance, items, affiliateService, notificationService) {
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