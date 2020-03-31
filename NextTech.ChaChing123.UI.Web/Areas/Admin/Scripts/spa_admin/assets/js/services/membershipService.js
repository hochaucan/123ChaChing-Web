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
            checkMemberAuthorization: checkMemberAuthorization,
            GetAccountInfo: GetAccountInfo,
            GetAccountList: GetAccountList,
            GetAffiliateList: GetAffiliateList,
            GetWithDrawallInfoByAccount: GetWithDrawallInfoByAccount,
            SetPasswodForAccount: SetPasswodForAccount,
            LockAccount: LockAccount,
            ChangeAccountType: ChangeAccountType
        };

        function ChangeAccountType(memberObj, completed) {
            apiService.post(baseUrl + '/ChangeAccountType/', memberObj,
                completed,
                entityFailed);
        }

        function LockAccount(memberObj, completed) {
            apiService.post(baseUrl + '/LockAccount/', memberObj,
                completed,
                entityFailed);
        }

        function SetPasswodForAccount(memberObj, completed) {
            apiService.post(baseUrl + '/SetPasswodForAccount/', memberObj,
                completed,
                entityFailed);
        }


        function GetAffiliateList(memberObj, completed) {
            apiService.post(baseUrl + '/GetAffiliateList/', memberObj,
                completed,
                entityFailed);
        }

        function GetWithDrawallInfoByAccount(memberObj, completed) {
            apiService.post(baseUrl + '/GetWithDrawallInfoByAccount/', memberObj,
                completed,
                entityFailed);
        }

        function GetAccountList(memberObj, completed) {
            apiService.post(baseUrl + '/GetAccountList/', memberObj,
                completed,
                entityFailed);
        }

        function GetAccountInfo(entity, completed) {
            apiService.post(baseUrl + '/GetAccountInfo/', entity,
                completed,
                entityFailed);
        }

        function Login(user, completed) {
            apiService.post(baseUrl + '/Login/', user,
            completed,
            entityFailed);
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

        function entityFailed(response) {
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