'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('AffiliateCtrl', ["$scope", "affiliateService", function ($scope, affiliateService) {
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