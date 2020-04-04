'use strict';
/** 
  * controllers used for the dashboard
*/
app.controller('manageMyPagesCtrl', ["$scope", "$location", function ($scope, $location) {
    $scope.createSoloPage = function () {
        $location.path('/app/editor2/solo/add');
    };

    $scope.manageSoloPage = function () {
        $location.path('/app/editor2/solo/manage');
    };
}]);

app.controller('DashBoardGoToAffiliateCtrl', ["$scope", "$location", function ($scope, $location) {
    $scope.gotoAffiliate = function () {
        $location.path('#/app/affiliate');
    };
}]);

app.controller('AffiliateDashboardWalletCtrl', ["$scope", "$localStorage", "membershipService", "affiliateService", "notificationService",
    function ($scope, $localStorage, membershipService, affiliateService, notificationService) {
        var affiliate = {};
        var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        affiliate = {
            "username": username,
            "sessionkey": sessionkey
        };

        $scope.affiliateWalletInfo = {
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