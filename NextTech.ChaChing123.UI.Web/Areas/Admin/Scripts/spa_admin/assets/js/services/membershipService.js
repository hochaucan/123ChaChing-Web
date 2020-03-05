(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('membershipService', Service);

    function Service(apiService, $window, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            Login: Login,
            register: register,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn,
            GetAccountList: GetAccountList,
            checkMemberAuthorization: checkMemberAuthorization,
        };

        function GetAccountList(memberObj, completed) {
            apiService.post(baseUrl + '/GetAccountList/', memberObj,
                completed,
                loginFailed);
        }


        function Login(user, completed) {
            apiService.post(baseUrl + '/Login/', user,
            completed,
            loginFailed);
        }

        function register(user, completed) {
            apiService.post(baseUrl + '/Account/register', user,
            completed,
            registrationFailed);
        }

        function saveCredentials(user) {
            $localStorage.currentUserAdmin = {
                token: user
            };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + user;
        }

        function removeCredentials() {
            delete $localStorage.currentUserAdmin;
            $http.defaults.headers.common.Authorization = '';
        }

        function loginFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        function registrationFailed(response) {
            notificationService.displayError('Registration failed. Try again.');
        }

        function isUserLoggedIn() {
            return $localStorage.currentUserAdmin != null;   
        }

        function isAuthenticated() {
            if (!isUserLoggedIn()) {
                $window.location.reload();
            }
        }

        function checkMemberAuthorization() {
            removeCredentials();
            isAuthenticated();
        }

        return service;
    }
})();