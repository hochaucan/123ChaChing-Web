(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('homeBannerService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1484/api/dashboardbanner';
        //var baseUrl = 'http://localhost:8002';
        var baseUrl = $rootScope.baseUrl.url + 'api/dashboardbanner';
        console.log('homeBannerService');
        console.log(baseUrl);

        var service = {
            getall: getall,
            getdocumentcontentbyid: getdocumentcontentbyid,
            add: add,
            update: update,
            deletecontent: deletecontent
        };

        function getall(entity, completed) {
            apiService.post(baseUrl + '/getall/', entity,
                completed,
                getEntityFailed);
        }

        function getdocumentcontentbyid(entity, completed) {
            apiService.post(baseUrl + '/getdocumentcontentbyid/', entity,
                completed,
                getEntityFailed);
        }

        function add(entity, completed) {
            apiService.post(baseUrl + '/add/', entity,
                completed,
                getEntityFailed);
        }

        function update(entity, completed) {
            apiService.post(baseUrl + '/update/', entity,
                completed,
                getEntityFailed);
        }

        function deletecontent(entity, completed) {
            apiService.post(baseUrl + '/deletecontent/', entity,
                completed,
                getEntityFailed);
        }

        function getEntityFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();