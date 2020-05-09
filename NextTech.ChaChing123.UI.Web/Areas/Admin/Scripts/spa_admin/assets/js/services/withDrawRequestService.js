(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('withDrawRequestService', Service);

    function Service(apiService, $window, $http, $rootScope, $localStorage, notificationService) {

        //var baseUrl = 'https://api.123chaching.app/api/Admin';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin'; 
        var service = {
            GetWithDrawallInfoByAccount: GetWithDrawallInfoByAccount,
            ApprovetWithDrawallInfoByAccount: ApprovetWithDrawallInfoByAccount,
            GetAllWithDrawall: GetAllWithDrawall
        };

        function GetWithDrawallInfoByAccount(memberObj, completed) {
            apiService.post(baseUrl + '/GetWithDrawallInfoByAccount/', memberObj,
                completed,
                entityFailed);
        }

        function GetAllWithDrawall(memberObj, completed) {
            apiService.post(baseUrl + '/GetAllWithDrawall/', memberObj,
                completed,
                entityFailed);
        }

        function ApprovetWithDrawallInfoByAccount(memberObj, completed) {
            apiService.post(baseUrl + '/ApprovetWithDrawallInfoByAccount/', memberObj,
                completed,
                entityFailed);
        }

        function entityFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();