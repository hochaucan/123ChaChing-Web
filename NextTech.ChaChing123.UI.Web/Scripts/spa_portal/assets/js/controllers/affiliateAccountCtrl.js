'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('AffiliateAccountCtrl', ["$scope", "affiliateService", function ($scope, affiliateService) {
    $scope.removeImage = function () {
        $scope.noImage = true;
    };

    $scope.affiliateInfo = {
        firstName: 'A',
        lastName: 'NGUYỄN VĂN',
        url: 'www.example.com',
        email: 'peter@example.com',
        phone: '6,686,888Đ',
        gender: 'male',
        zipCode: '12345',
        city: 'London (UK)',
        avatar: 'assets/images/avatar-1-xl.jpg',
        twitter: '',
        github: '',
        facebook: '',
        linkedin: '',
        google: '',
        skype: 'peterclark82'
    };
    if ($scope.affiliateInfo.avatar == '') {
        $scope.noImage = true;
    }
}]);

app.controller('AffiliateGetLinkCtrl', ["$scope", "$uibModal", "affiliateService", "notificationService", function ($scope, $uibModal, affiliateService, notificationService) {
    $scope.getLink = function (size) {
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
    }
}]);

app.controller('ModalInstanceCtrl1', ["$scope", "$uibModalInstance", "items", "affiliateService", "notificationService", function ($scope, $uibModalInstance, items, affiliateService, notificationService) {
    $scope.ok = function () {
        
        var affiliate = {};
        //var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
        //var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

        affiliate = {
            "ContractNo": "123456789",
            "BeneAccountName": $scope.affiliate.BeneAccountName,
            "BeneBankName": $scope.affiliate.BeneBankName,
            "BeneAccountNo": $scope.affiliate.BeneAccountNo,
            "Remarks": $scope.affiliate.Remarks
        };

        console.log($scope.affiliate);

        // Load the data from the API
        affiliateService.add(affiliate, function (result) {
            if (result.data && result.data.StatusCode == 0) {
                notificationService.displayInfo(result.data.StatusMsg);
            } else {
                notificationService.displayError(result.data.StatusMsg);
            }
            $uibModalInstance.dismiss('cancel');
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);