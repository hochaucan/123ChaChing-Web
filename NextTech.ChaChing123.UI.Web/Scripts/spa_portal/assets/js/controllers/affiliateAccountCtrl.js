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

app.controller('ModalInstanceCtrl1', ["$scope", "$uibModalInstance", "items", function ($scope, $uibModalInstance, items) {
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);