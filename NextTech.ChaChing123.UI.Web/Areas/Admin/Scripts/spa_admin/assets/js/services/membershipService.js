(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('membershipService', Service);

    function Service(apiService, $window, $http, $rootScope, $localStorage, notificationService) {

        //var baseUrl = 'https://api.123chaching.app/api/Admin';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin'; 

        var service = {
            Login: Login,
            LogOut: LogOut,
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
            UpdateAccountInfo: UpdateAccountInfo,
            LockAccount: LockAccount,
            LockAffialate: LockAffialate,
            ChangeAccountType: ChangeAccountType,
            ApprovetWithDrawallInfoByAccount: ApprovetWithDrawallInfoByAccount,
            ChangePassword: ChangePassword
        };

        function ChangePassword(memberObj, completed) {
            apiService.post(baseUrl + '/ChangePassword/', memberObj,
                completed,
                entityFailed);
        }

        function UpdateAccountInfo(memberObj, completed) {
            apiService.post(baseUrl + '/UpdateAccountInfo/', memberObj,
                completed,
                entityFailed);
        }

        function ApprovetWithDrawallInfoByAccount(memberObj, completed) {
            apiService.post(baseUrl + '/ApprovetWithDrawallInfoByAccount/', memberObj,
                completed,
                entityFailed);
        }


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

        function LockAffialate(memberObj, completed) {
            apiService.post(baseUrl + '/LockAffialate/', memberObj,
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

        function LogOut(user, completed) {
            apiService.post(baseUrl + '/LogOut/', user,
                completed,
                entityFailed);
        }

        function register(user, completed) {
            apiService.post(baseUrl + '/Account/register', user,
            completed,
            registrationFailed);
        }

        function saveCredentials(token, user) {
            $localStorage.currentUserAdmin = {
                username: user.username,
                token: token
            };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
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