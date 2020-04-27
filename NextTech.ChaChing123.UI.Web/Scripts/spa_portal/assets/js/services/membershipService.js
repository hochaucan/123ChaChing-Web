(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('membershipService', Service);

    function Service(apiService, $http, $window, $rootScope, $location, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            login: login,
            register: register,
            saveCredentials: saveCredentials,
            saveUserRegistration: saveUserRegistration,
            removeCredentials: removeCredentials,
            removeUserRegistration: removeUserRegistration,
            isUserLoggedIn: isUserLoggedIn,
            isAuthenticated: isAuthenticated,
            checkMemberAuthorization: checkMemberAuthorization,
            EditAccount: EditAccount,
            GetAccountInfo: GetAccountInfo,
            SetDefautAccount: SetDefautAccount,
            RegisterForgetPassword: RegisterForgetPassword,
            ActiveAccountByForgetPassword: ActiveAccountByForgetPassword
        };

        function RegisterForgetPassword(user, completed) {
            apiService.post(baseUrl + '/api/Account/RegisterForgetPassword/', user,
                completed,
                loginFailed);
        }

        function ActiveAccountByForgetPassword(user, completed) {
            apiService.post(baseUrl + '/api/Account/ActiveAccountByForgetPassword/', user,
                completed,
                loginFailed);
        }

        function SetDefautAccount(user, completed) {
            apiService.post(baseUrl + '/api/Admin/SetDefautAccount/', user,
                completed,
                loginFailed);
        }

        function login(user, completed) {
            apiService.post(baseUrl + '/api/Account/login', user,
            completed,
            loginFailed);
        }

        function register(user, completed) {
            apiService.post(baseUrl + '/api/Account/register', user,
            completed,
            registrationFailed);
        }

        function GetAccountInfo(user, completed) {
            apiService.post(baseUrl + '/api/Account/GetAccountInfo/', user,
                completed,
                loginFailed);
        }

        function EditAccount(user, completed) {
            apiService.post(baseUrl + '/api/Account/EditAccount/', user,
                completed,
                loginFailed);
        }

        function saveCredentials(user) {
            $localStorage.currentUser = {
                username: user.UserName,
                fullname: user.FullName,
                phone: user.Phone,
                accountType: user.AccountType,
                token: user.SessionKey,
                myavatar: (user.AvartaPath) ? user.AvartaPath : '/Scripts/spa_portal/assets/images/default-user.png'
            };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + user.SessionKey;
        }

        function saveUserRegistration(user) {
            $localStorage.currentUserRegistration = {
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                accountType: user.accounttype,
                token: user.token 
            };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + user.SessionKey;
        }

        
        function removeCredentials() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }

        function removeUserRegistration() {
            delete $localStorage.currentUserRegistration;
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
            return $localStorage.currentUser != null;   
        }

        function isAuthenticated() {
            if (!isUserLoggedIn()) {
                //$location.path('app/login/signin');
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