(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('mailChipService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            GetMailChimpInfoByAccount: GetMailChimpInfoByAccount,
            UpdateMailChimpInfoByAccount: UpdateMailChimpInfoByAccount
        };

        function GetMailChimpInfoByAccount(orderObj, completed) {
            apiService.post(baseUrl + '/GetMailChimpInfoByAccount/', orderObj,
                completed,
                getOrderListFailed);
        }


        function UpdateMailChimpInfoByAccount(orderObj, completed) {
            apiService.post(baseUrl + '/UpdateMailChimpInfoByAccount/', orderObj,
                completed,
                getOrderListFailed);
        }

        function getOrderListFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();