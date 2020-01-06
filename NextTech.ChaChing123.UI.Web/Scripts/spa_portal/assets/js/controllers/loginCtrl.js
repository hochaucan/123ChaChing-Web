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
        .controller('loginCtrl', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {
            $scope.initController = function() {
                console.log("logout");
                // reset login status
                AuthenticationService.Logout();
            };

            $scope.login = function() {
                console.log("logint 1");
                var username = $scope.user.username;
                var password = $scope.user.password;
                console.log($scope.user.username);
                console.log($scope.user.password);
                AuthenticationService.Login(username, password, function (result) {
                    if (result === true) {
                        $location.path('/');
                    } else {
                        $scope.user.error = 'Email/Số Điện Thoại Không Hợp Lệ';
                        //vm.loading = false;
                    }
                });
            };

            $scope.registration = function () {
                console.log("registration here");
            };
        }]);
})();