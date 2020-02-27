(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('orderService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            GetOrderList: GetOrderList
        };

        function GetOrderList(memberObj, completed) {
            apiService.post(baseUrl + '/GetOrderList/', memberObj,
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