(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('membershipService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            login: login,
            register: register,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn
        }

        function login(user, completed) {
            apiService.post(baseUrl + '/api/account/login', user,
            completed,
            loginFailed);
        }

        function register(user, completed) {
            apiService.post(baseUrl + '/api/Account/register', user,
            completed,
            registrationFailed);
        }

        function saveCredentials(user) {
            $localStorage.currentUser = { username: user.UserName, token: user.SessionKey };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + user.SessionKey;
        }

        function removeCredentials() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        };

        function loginFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        function registrationFailed(response) {
            notificationService.displayError('Registration failed. Try again.');
        }

        function isUserLoggedIn() {
            return $localStorage.currentUser != null;   
        }

        return service;
    }
})();