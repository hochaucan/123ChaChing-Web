(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('membershipService', Service);

    function Service(apiService, $http, $rootScope, $localStorage) {

        var service = {
            login: login,
            register: register,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn
        }

        function login(user, completed) {
            apiService.post('/api/account/login', user,
            completed,
            loginFailed);
        }

        function register(user, completed) {
            apiService.post('http://localhost:1485/api/Account/register', user,
            completed,
            registrationFailed);
        }

        function saveCredentials(user) {
            $localStorage.currentUser = { username: user.username, token: user.UpdatedBy };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.obj.UpdatedBy;
        }

        function removeCredentials() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        };

        function loginFailed(response) {
            //notificationService.displayError(response.data);
            console.log(response.data);
        }

        function registrationFailed(response) {
            //notificationService.displayError('Registration failed. Try again.');
            console.log("Registration failed.Try again.");
        }

        function isUserLoggedIn() {
            return $localStorage.currentUser != null;
        }

        return service;
    }
})();