//app.controller('loginCtrl', ["$scope", "$filter",
//    function ($scope, $filter) {
//        $scope.login = function () {
//            console.log("logged 1");
//        };
//    }]); 
(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .controller('UserSignUpPackageCtrl', ['$scope', '$location', '$localStorage', function ($scope, $location, $localStorage) {
            $scope.registerBasicPackage = function () {
                $location.path('/app/login/signin');
                $localStorage.currentPackage = { package: 'basic' };
                //$('.nav-tabs > .active').next('li').find('a').trigger('click');
            };

            $scope.registerAdvacedPackage = function () {
                $location.path('/app/login/signin');
                $localStorage.currentPackage = { package: 'advance' };
                //$('.nav-tabs > .active').next('li').find('a').trigger('click');
            };
        }]);
})();