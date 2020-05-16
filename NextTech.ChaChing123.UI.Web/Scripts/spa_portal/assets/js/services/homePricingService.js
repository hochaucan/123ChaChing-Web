(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('homePricingService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {
        var baseUrl = $rootScope.baseUrl.url + 'api/dashboardpricing';

        var service = {
            getall: getall
        };

        function getall(entity, completed) {
            apiService.post(baseUrl + '/getall/', entity,
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